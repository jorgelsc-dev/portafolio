#!/usr/bin/env node

const WS_URL = process.env.FIREFOX_BIDI_WS_URL || "ws://127.0.0.1:9222/session";

class BiDiClient {
  constructor(url) {
    this.url = url;
    this.nextId = 1;
    this.pending = new Map();
    this.socket = null;
  }

  async connect() {
    this.socket = new WebSocket(this.url);

    await new Promise((resolve, reject) => {
      const onOpen = () => {
        cleanup();
        resolve();
      };
      const onError = error => {
        cleanup();
        reject(error);
      };
      const cleanup = () => {
        this.socket.removeEventListener("open", onOpen);
        this.socket.removeEventListener("error", onError);
      };

      this.socket.addEventListener("open", onOpen, { once: true });
      this.socket.addEventListener("error", onError, { once: true });
    });

    this.socket.addEventListener("message", event => {
      const payload = JSON.parse(event.data);
      if (payload.id && this.pending.has(payload.id)) {
        const { resolve, reject } = this.pending.get(payload.id);
        this.pending.delete(payload.id);
        if (payload.type === "error" || payload.error) {
          reject(new Error(JSON.stringify(payload)));
          return;
        }
        resolve(payload);
        return;
      }

      if (process.env.DEBUG_FIREFOX_BIDI === "1") {
        console.error("event:", JSON.stringify(payload));
      }
    });
  }

  async close() {
    if (!this.socket || this.socket.readyState >= WebSocket.CLOSING) {
      return;
    }

    await new Promise(resolve => {
      this.socket.addEventListener("close", () => resolve(), { once: true });
      this.socket.close();
    });
  }

  async send(method, params = {}) {
    const id = this.nextId++;
    const message = { id, method, params };

    return await new Promise((resolve, reject) => {
      this.pending.set(id, { resolve, reject });
      this.socket.send(JSON.stringify(message));
    });
  }
}

async function withSession(client, callback) {
  let sessionId = null;
  try {
    const response = await client.send("session.new", {
      capabilities: {
        alwaysMatch: {
          acceptInsecureCerts: true,
        },
      },
    });
    sessionId = response.result.sessionId;
    return await callback(sessionId, response.result.capabilities);
  } finally {
    if (sessionId) {
      try {
        await client.send("session.end", {});
      } catch {}
    }
  }
}

async function getTopLevelContext(client) {
  const response = await client.send("browsingContext.getTree", {});
  const contexts = response.result.contexts || [];
  if (contexts.length > 0) {
    return contexts[0].context;
  }

  const created = await client.send("browsingContext.create", {
    type: "tab",
    background: false,
  });
  return created.result.context;
}

async function openUrl(client, url) {
  return await withSession(client, async () => {
    const context = await getTopLevelContext(client);
    const response = await client.send("browsingContext.navigate", {
      context,
      url,
      wait: "interactive",
    });

    return {
      context,
      navigation: response.result.navigation || null,
      url: response.result.url,
    };
  });
}

async function sessionStatus(client) {
  const response = await client.send("session.status", {});
  return response.result;
}

async function listContexts(client) {
  return await withSession(client, async () => {
    const response = await client.send("browsingContext.getTree", {});
    return response.result.contexts || [];
  });
}

async function pageInfo(client) {
  return await withSession(client, async () => {
    const context = await getTopLevelContext(client);
    const response = await client.send("script.evaluate", {
      expression: `(() => ({
        href: window.location.href,
        title: document.title,
        bodyText: (document.body?.innerText || "").replace(/\\s+/g, " ").trim().slice(0, 800)
      }))()`,
      target: { context },
      awaitPromise: true,
      resultOwnership: "none",
      userActivation: false,
    });

    return response.result;
  });
}

async function evaluate(client, expression) {
  return await withSession(client, async () => {
    const context = await getTopLevelContext(client);
    const response = await client.send("script.evaluate", {
      expression,
      target: { context },
      awaitPromise: true,
      resultOwnership: "none",
      userActivation: false,
    });

    return response.result;
  });
}

function usage() {
  console.error(
    [
      "Usage:",
      "  node scripts/firefox-bidi.mjs status",
      "  node scripts/firefox-bidi.mjs open <url>",
      "  node scripts/firefox-bidi.mjs contexts",
      "  node scripts/firefox-bidi.mjs info",
      "  node scripts/firefox-bidi.mjs eval <javascript>",
    ].join("\n")
  );
}

async function main() {
  const [, , command, ...rest] = process.argv;
  if (!command) {
    usage();
    process.exitCode = 1;
    return;
  }

  const client = new BiDiClient(WS_URL);
  await client.connect();

  try {
    switch (command) {
      case "status": {
        const result = await sessionStatus(client);
        console.log(JSON.stringify(result, null, 2));
        break;
      }
      case "open": {
        const url = rest[0];
        if (!url) {
          usage();
          process.exitCode = 1;
          return;
        }
        const result = await openUrl(client, url);
        console.log(JSON.stringify(result, null, 2));
        break;
      }
      case "contexts": {
        const result = await listContexts(client);
        console.log(JSON.stringify(result, null, 2));
        break;
      }
      case "info": {
        const result = await pageInfo(client);
        console.log(JSON.stringify(result, null, 2));
        break;
      }
      case "eval": {
        const expression = rest.join(" ");
        if (!expression) {
          usage();
          process.exitCode = 1;
          return;
        }
        const result = await evaluate(client, expression);
        console.log(JSON.stringify(result, null, 2));
        break;
      }
      default:
        usage();
        process.exitCode = 1;
    }
  } finally {
    await client.close();
  }
}

main().catch(error => {
  console.error(error.stack || String(error));
  process.exit(1);
});
