#!/usr/bin/env python3
"""Twitter Loş Tema ikonları oluştur."""

from PIL import Image, ImageDraw, ImageFont
import os

def create_icon(size, output_path):
    # Arka plan
    img = Image.new('RGBA', (size, size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)

    # Yuvarlak arka plan (#16202a)
    margin = size * 0.04
    draw.rounded_rectangle(
        [margin, margin, size - margin, size - margin],
        radius=size * 0.22,
        fill=(22, 32, 42, 255)
    )

    # Ay ikonu (beyaz daire - ay şekli)
    cx, cy = size / 2, size / 2
    r = size * 0.28

    # Tam daire (ay rengi)
    draw.ellipse(
        [cx - r, cy - r, cx + r, cy + r],
        fill=(201, 214, 224, 255)
    )

    # Gölge daire (ay şekli için)
    offset = r * 0.35
    shadow_r = r * 0.88
    draw.ellipse(
        [cx - shadow_r + offset, cy - shadow_r - offset * 0.3,
         cx + shadow_r + offset, cy + shadow_r - offset * 0.3],
        fill=(22, 32, 42, 255)
    )

    # Alt nokta / accent (mavi)
    dot_r = size * 0.1
    dot_x = cx + r * 0.45
    dot_y = cy + r * 0.7
    draw.ellipse(
        [dot_x - dot_r, dot_y - dot_r, dot_x + dot_r, dot_y + dot_r],
        fill=(29, 155, 240, 255)
    )

    img.save(output_path, 'PNG')
    print(f"  ✓ {output_path} ({size}x{size})")

# icons klasörü
os.makedirs('icons', exist_ok=True)

print("İkonlar oluşturuluyor...")
for size in [16, 48, 128]:
    create_icon(size, f'icons/icon{size}.png')

print("Tamamlandı!")
