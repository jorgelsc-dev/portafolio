#!/usr/bin/env python3

from __future__ import annotations

import re
import subprocess
import tempfile
from pathlib import Path
import sys


def escape_latex(text: str) -> str:
    replacements = {
        "\\": r"\textbackslash{}",
        "&": r"\&",
        "%": r"\%",
        "$": r"\$",
        "#": r"\#",
        "_": r"\_",
        "{": r"\{",
        "}": r"\}",
        "~": r"\textasciitilde{}",
        "^": r"\textasciicircum{}",
    }
    return "".join(replacements.get(ch, ch) for ch in text)


def inline_md_to_latex(text: str) -> str:
    parts: list[str] = []
    last = 0
    for match in re.finditer(r"\*\*(.+?)\*\*", text):
        parts.append(escape_latex(text[last : match.start()]))
        parts.append(r"\textbf{" + escape_latex(match.group(1)) + "}")
        last = match.end()
    parts.append(escape_latex(text[last:]))
    return "".join(parts)


def md_to_latex(md: str) -> str:
    body: list[str] = []
    in_enum = False

    lines = md.splitlines()
    for raw in lines:
        line = raw.rstrip("\n")
        stripped = line.strip()

        heading = re.match(r"^#\s+(.+)$", stripped)
        item = re.match(r"^\d+\.\s+(.+)$", stripped)

        if heading:
            if in_enum:
                body.append(r"\end{enumerate}")
                in_enum = False
            body.append(r"\section*{" + inline_md_to_latex(heading.group(1)) + "}")
            continue

        if item:
            if not in_enum:
                body.append(r"\begin{enumerate}")
                in_enum = True
            body.append(r"\item " + inline_md_to_latex(item.group(1)))
            continue

        if in_enum:
            body.append(r"\end{enumerate}")
            in_enum = False

        if stripped == "":
            body.append("")
            continue

        content = inline_md_to_latex(stripped)
        if line.endswith("  "):
            body.append(content + r"\\")
        else:
            body.append(content)

    if in_enum:
        body.append(r"\end{enumerate}")

    template = r"""\documentclass[12pt]{article}
\usepackage[a4paper,margin=2.5cm]{geometry}
\usepackage{fontspec}
\setmainfont{Noto Serif}
\usepackage{enumitem}
\setlist{nosep}
\usepackage{parskip}
\begin{document}
%BODY%
\end{document}
"""
    return template.replace("%BODY%", "\n".join(body))


def build_pdf(md_path: Path, pdf_path: Path) -> None:
    source = md_path.read_text(encoding="utf-8")
    tex = md_to_latex(source)

    with tempfile.TemporaryDirectory(prefix="mdpdf_") as tmp:
        tmpdir = Path(tmp)
        tex_path = tmpdir / "doc.tex"
        tex_path.write_text(tex, encoding="utf-8")

        cmd = [
            "lualatex",
            "-interaction=nonstopmode",
            "-halt-on-error",
            "doc.tex",
        ]
        proc = subprocess.run(
            cmd,
            cwd=tmpdir,
            capture_output=True,
            text=True,
        )
        if proc.returncode != 0:
            raise RuntimeError(
                "lualatex failed:\n"
                + proc.stdout[-4000:]
                + "\n"
                + proc.stderr[-4000:]
            )

        built = tmpdir / "doc.pdf"
        pdf_path.write_bytes(built.read_bytes())


def main() -> int:
    if len(sys.argv) != 3:
        print("Usage: python3 scripts/md_to_pdf.py <input.md> <output.pdf>")
        return 1

    md_path = Path(sys.argv[1]).resolve()
    pdf_path = Path(sys.argv[2]).resolve()
    build_pdf(md_path, pdf_path)
    print(str(pdf_path))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
