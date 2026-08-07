#!/usr/bin/env python3

from __future__ import annotations

import argparse
from pathlib import Path
import re
import sys

import cairo


PAGE_WIDTH = 595.0   # A4 in points
PAGE_HEIGHT = 842.0
MARGIN = 56.0
CONTENT_WIDTH = PAGE_WIDTH - (MARGIN * 2)


def strip_md_inline(text: str) -> str:
    text = text.replace("**", "")
    return text.strip()


def wrap_text(ctx: cairo.Context, text: str, max_width: float) -> list[str]:
    if not text:
        return [""]

    words = text.split()
    if not words:
        return [""]

    lines: list[str] = []
    current = words[0]

    for word in words[1:]:
        candidate = f"{current} {word}"
        ext = ctx.text_extents(candidate)
        width = ext.x_advance
        if width <= max_width:
            current = candidate
        else:
            lines.append(current)
            current = word

    lines.append(current)
    return lines


def parse_markdown(md: str) -> list[tuple[str, str]]:
    blocks: list[tuple[str, str]] = []
    for raw_line in md.splitlines():
        line = raw_line.rstrip("\n")
        stripped = line.strip()

        if stripped == "":
            blocks.append(("spacer", ""))
            continue

        heading = re.match(r"^#\s+(.+)$", stripped)
        if heading:
            blocks.append(("heading", strip_md_inline(heading.group(1))))
            continue

        blocks.append(("body", strip_md_inline(stripped)))
    return blocks


def set_style(ctx: cairo.Context, kind: str) -> tuple[float, float]:
    if kind == "heading":
        ctx.select_font_face("Noto Serif", cairo.FONT_SLANT_NORMAL, cairo.FONT_WEIGHT_BOLD)
        size = 16.0
        line_height = 23.0
        return size, line_height

    ctx.select_font_face("Noto Serif", cairo.FONT_SLANT_NORMAL, cairo.FONT_WEIGHT_NORMAL)
    size = 12.0
    line_height = 18.0
    return size, line_height


def render(md_path: Path, pdf_path: Path, signature_path: Path | None = None) -> None:
    blocks = parse_markdown(md_path.read_text(encoding="utf-8"))

    surface = cairo.PDFSurface(str(pdf_path), PAGE_WIDTH, PAGE_HEIGHT)
    ctx = cairo.Context(surface)
    ctx.set_source_rgb(0, 0, 0)

    signature_surface = None
    signature_w = 0.0
    signature_h = 0.0
    if signature_path and signature_path.exists():
        signature_surface = cairo.ImageSurface.create_from_png(str(signature_path))
        sw = signature_surface.get_width()
        sh = signature_surface.get_height()
        target_w = 130.0
        scale = target_w / sw
        signature_w = sw * scale
        signature_h = sh * scale

    y = MARGIN

    def new_page() -> None:
        nonlocal y
        surface.show_page()
        ctx.set_source_rgb(0, 0, 0)
        y = MARGIN

    for kind, text in blocks:
        if kind == "spacer":
            y += 10
            if y > PAGE_HEIGHT - MARGIN:
                new_page()
            continue

        font_size, line_height = set_style(ctx, kind)
        ctx.set_font_size(font_size)

        if kind == "body" and text.startswith("Подпись:"):
            prefix = "Подпись:"
            suffix = text[len(prefix) :].strip()
            required_h = max(line_height, signature_h + 8.0) if signature_surface else line_height
            if y + required_h > PAGE_HEIGHT - MARGIN:
                new_page()
                _, line_height = set_style(ctx, kind)
                ctx.set_font_size(font_size)

            ctx.move_to(MARGIN, y)
            ctx.show_text(prefix)

            x_after_prefix = MARGIN + ctx.text_extents(prefix + " ").x_advance
            x_after_sig = x_after_prefix

            if signature_surface:
                ctx.save()
                ctx.translate(x_after_prefix, y - signature_h + 4.0)
                ctx.scale(signature_w / signature_surface.get_width(), signature_h / signature_surface.get_height())
                ctx.set_source_surface(signature_surface, 0, 0)
                ctx.paint()
                ctx.restore()
                x_after_sig = x_after_prefix + signature_w + 10.0

            if suffix:
                ctx.move_to(x_after_sig, y)
                ctx.show_text(suffix)

            y += required_h
            continue

        lines = wrap_text(ctx, text, CONTENT_WIDTH)

        for line in lines:
            if y + line_height > PAGE_HEIGHT - MARGIN:
                new_page()
                _, line_height = set_style(ctx, kind)
                ctx.set_font_size(font_size)

            ctx.move_to(MARGIN, y)
            ctx.show_text(line)
            y += line_height

    surface.finish()


def main() -> int:
    parser = argparse.ArgumentParser(description="Convert simple markdown to PDF with optional signature image.")
    parser.add_argument("input_md")
    parser.add_argument("output_pdf")
    parser.add_argument("--signature", dest="signature", default=None)
    args = parser.parse_args()

    md_path = Path(args.input_md).resolve()
    pdf_path = Path(args.output_pdf).resolve()
    signature_path = Path(args.signature).resolve() if args.signature else None
    render(md_path, pdf_path, signature_path)
    print(str(pdf_path))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
