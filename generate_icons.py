#!/usr/bin/env python3
"""
Dim Theme for X — İkon üretici
Gereksinim: pip install pillow
Üretilen boyutlar: 16, 32, 48, 128
"""

import os
import sys

try:
    from PIL import Image, ImageDraw
except ImportError:
    print("Hata: Pillow kütüphanesi bulunamadı.")
    print("Kurmak için: pip install pillow")
    sys.exit(1)


# -----------------------------------------------------------------------
# Renk sabitleri
# -----------------------------------------------------------------------
BG_COLOR     = (22, 32, 42, 255)    # #16202a
MOON_COLOR   = (201, 214, 224, 255) # açık gri (ay)
ACCENT_COLOR = (29, 155, 240, 255)  # #1d9bf0 (mavi nokta)


def create_icon(size: int, output_path: str) -> None:
    """Verilen boyutta tek ikon oluştur ve kaydet."""
    img  = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)

    # --- Yuvarlak arka plan ---
    margin = max(1, int(size * 0.04))
    draw.rounded_rectangle(
        [margin, margin, size - margin, size - margin],
        radius=int(size * 0.22),
        fill=BG_COLOR,
    )

    # --- Ay gövdesi (tam daire) ---
    cx, cy = size / 2, size / 2
    r = size * 0.28
    draw.ellipse([cx - r, cy - r, cx + r, cy + r], fill=MOON_COLOR)

    # --- Ay ısırığı (gölge daire BG renginde, sağ üste kaydırılmış) ---
    off_x  =  r * 0.38
    off_y  = -r * 0.20
    sr     =  r * 0.82
    draw.ellipse(
        [
            cx - sr + off_x, cy - sr + off_y,
            cx + sr + off_x, cy + sr + off_y,
        ],
        fill=BG_COLOR,
    )

    # --- Küçük accent nokta (mavi) ---
    dot_r = size * 0.09
    dot_x = cx + r * 0.50
    dot_y = cy + r * 0.72
    draw.ellipse(
        [dot_x - dot_r, dot_y - dot_r, dot_x + dot_r, dot_y + dot_r],
        fill=ACCENT_COLOR,
    )

    img.save(output_path, "PNG")
    print(f"  ✓ {output_path}  ({size}×{size})")


def main() -> None:
    os.makedirs("icons", exist_ok=True)
    print("İkonlar oluşturuluyor...\n")

    sizes = [16, 32, 48, 128]
    for size in sizes:
        create_icon(size, f"icons/icon{size}.png")

    print("\nTamamlandı!")

if __name__ == "__main__":
    main()
