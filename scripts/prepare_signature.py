#!/usr/bin/env python3

from __future__ import annotations

import argparse
from pathlib import Path

from PIL import Image, ImageEnhance, ImageFilter, ImageOps


def clean_signature(input_path: Path, output_path: Path, upscale: int = 4) -> None:
    img = Image.open(input_path).convert("RGBA")
    img = img.resize((img.width * upscale, img.height * upscale), Image.Resampling.LANCZOS)

    gray = ImageOps.grayscale(img)
    gray = ImageOps.autocontrast(gray, cutoff=2)
    gray = ImageEnhance.Contrast(gray).enhance(2.8)
    gray = gray.filter(ImageFilter.MedianFilter(size=3))

    alpha = gray.point(lambda p: 0 if p > 215 else min(255, int((215 - p) * 3.2)))
    alpha = alpha.filter(ImageFilter.GaussianBlur(radius=0.5))
    alpha = alpha.point(lambda p: 0 if p < 12 else p)

    black = Image.new("RGBA", gray.size, (0, 0, 0, 255))
    black.putalpha(alpha)

    bbox = alpha.getbbox()
    if bbox:
        pad = 12
        left = max(0, bbox[0] - pad)
        top = max(0, bbox[1] - pad)
        right = min(black.width, bbox[2] + pad)
        bottom = min(black.height, bbox[3] + pad)
        black = black.crop((left, top, right, bottom))

    output_path.parent.mkdir(parents=True, exist_ok=True)
    black.save(output_path, format="PNG")


def main() -> int:
    parser = argparse.ArgumentParser(description="Clean and upscale a handwritten signature.")
    parser.add_argument("input_image")
    parser.add_argument("output_image")
    parser.add_argument("--upscale", type=int, default=4)
    args = parser.parse_args()

    in_path = Path(args.input_image).resolve()
    out_path = Path(args.output_image).resolve()
    clean_signature(in_path, out_path, args.upscale)
    print(str(out_path))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())

