#!/usr/bin/env python3
"""Generate on-brand abstract cover images for Prospertia Insights posts.
Matches the site's --dark-gradient / --brand-gradient palette. Each service
pillar gets its own visual motif so the archive doesn't read as one template
recoloured over and over:
  - Growth & strategy      -> concentric rings (joined-up systems)
  - Sales & HubSpot        -> converging flow lines (pipeline)
  - AI & transformation    -> node network (AI / connections)
  - Web & Technology       -> circuit grid (engineering / build)
"""
import math
import random
import os
import numpy as np
from PIL import Image, ImageDraw, ImageFilter

W, H = 1200, 630

def hex_to_rgb(h):
    h = h.lstrip('#')
    return tuple(int(h[i:i+2], 16) for i in (0, 2, 4))

# --dark-gradient: 145deg, #25134a 0%, #090b17 48%, #143d49 100%
DARK_STOPS = [(0.0, hex_to_rgb('25134a')), (0.48, hex_to_rgb('090b17')), (1.0, hex_to_rgb('143d49'))]
PRIMARY = hex_to_rgb('7040ff')
BLUE = hex_to_rgb('4f67f4')
CYAN = hex_to_rgb('24c7e9')

def lerp(a, b, t):
    return tuple(a[i] + (b[i] - a[i]) * t for i in range(3))

def stops_at(t, stops):
    for i in range(len(stops) - 1):
        t0, c0 = stops[i]
        t1, c1 = stops[i + 1]
        if t0 <= t <= t1:
            local = (t - t0) / (t1 - t0) if t1 > t0 else 0
            return lerp(c0, c1, local)
    return stops[-1][1]

def make_gradient(angle_deg, stops):
    angle = math.radians(angle_deg)
    dx, dy = math.cos(angle), math.sin(angle)
    xs, ys = np.meshgrid(np.linspace(0, 1, W), np.linspace(0, 1, H))
    proj = xs * dx + ys * dy
    proj -= proj.min()
    proj /= proj.max()
    lut = [stops_at(t / 255, stops) for t in range(256)]
    idx = (proj * 255).astype(np.uint8)
    lut_arr = np.array(lut)
    r = lut_arr[idx, 0].astype(np.uint8)
    g = lut_arr[idx, 1].astype(np.uint8)
    b = lut_arr[idx, 2].astype(np.uint8)
    arr = np.stack([r, g, b], axis=-1)
    return Image.fromarray(arr, 'RGB')

def draw_rings(img, cx, cy, base_r, count, color, width_start=2, width_end=1, opacity_start=90, opacity_end=0, gap=46):
    draw = ImageDraw.Draw(img, 'RGBA')
    for i in range(count):
        r = base_r + i * gap
        op = int(opacity_start + (opacity_end - opacity_start) * (i / max(count - 1, 1)))
        w = max(1, round(width_start + (width_end - width_start) * (i / max(count - 1, 1))))
        draw.ellipse([cx - r, cy - r, cx + r, cy + r], outline=(*color, op), width=w)

def draw_network(img, cx, cy, color, accent_color, count=14, spread=340, seed=0):
    """Node network motif for AI & transformation."""
    draw = ImageDraw.Draw(img, 'RGBA')
    rnd = random.Random(seed)
    pts = []
    for _ in range(count):
        ang = rnd.uniform(0, 2 * math.pi)
        r = rnd.uniform(50, spread)
        x = cx + math.cos(ang) * r
        y = cy + math.sin(ang) * r * 0.68
        pts.append((x, y))
    for i in range(len(pts)):
        for j in range(i + 1, len(pts)):
            d = math.hypot(pts[i][0] - pts[j][0], pts[i][1] - pts[j][1])
            if d < 210:
                op = int(max(8, 110 - d / 2.2))
                draw.line([pts[i], pts[j]], fill=(*color, op), width=1)
    for i, (x, y) in enumerate(pts):
        r = 6 if i % 4 == 0 else 3.5
        c = accent_color if i % 4 == 0 else color
        draw.ellipse([x - r, y - r, x + r, y + r], fill=(*c, 220))
        draw.ellipse([x - r - 4, y - r - 4, x + r + 4, y + r + 4], outline=(*c, 90), width=1)

def draw_flow(img, cx, cy, color, accent_color, seed=0):
    """Converging flow-line motif for Sales & HubSpot (pipeline)."""
    draw = ImageDraw.Draw(img, 'RGBA')
    rnd = random.Random(seed)
    lines = 8
    for i in range(lines):
        y0 = 40 + i * 72
        x0 = -60
        steps = 28
        pts = []
        for s in range(steps + 1):
            t = s / steps
            x = x0 + t * (cx - x0)
            y = y0 + (cy - y0) * (t ** 1.5)
            pts.append((x, y))
        op = max(18, 110 - i * 9)
        draw.line(pts, fill=(*color, op), width=2)
        if i % 2 == 0:
            t = rnd.uniform(0.3, 0.7)
            x = x0 + t * (cx - x0)
            y = y0 + (cy - y0) * (t ** 1.5)
            r = 4.5
            draw.ellipse([x - r, y - r, x + r, y + r], fill=(*accent_color, 210))

def draw_circuit(img, color, accent_color, seed=0):
    """Circuit-grid motif for Web & Technology."""
    draw = ImageDraw.Draw(img, 'RGBA')
    rnd = random.Random(seed)
    step = 84
    for x in range(140, W - 60, step):
        for y in range(80, H - 50, step):
            if rnd.random() < 0.6:
                dx = rnd.choice([-1, 1]) * step * 0.55
                dy = rnd.choice([-1, 1]) * step * 0.45
                draw.line([(x, y), (x + dx, y)], fill=(*color, 75), width=2)
                draw.line([(x + dx, y), (x + dx, y + dy)], fill=(*color, 75), width=2)
                r = 3
                draw.ellipse([x - r, y - r, x + r, y + r], fill=(*accent_color, 170))
                draw.ellipse([x + dx - r, y + dy - r, x + dx + r, y + dy + r], fill=(*color, 150))

def draw_dot_grid(img, color, step=34, r=1, opacity=26):
    draw = ImageDraw.Draw(img, 'RGBA')
    for x in range(0, W, step):
        for y in range(0, H, step):
            draw.ellipse([x - r, y - r, x + r, y + r], fill=(*color, opacity))

def draw_glow(img, cx, cy, radius, color, max_opacity=140):
    glow = Image.new('RGBA', (W, H), (0, 0, 0, 0))
    gd = ImageDraw.Draw(glow)
    gd.ellipse([cx - radius, cy - radius, cx + radius, cy + radius], fill=(*color, max_opacity))
    glow = glow.filter(ImageFilter.GaussianBlur(radius // 2))
    img.alpha_composite(glow)

def make_cover(slug, angle, ring_center, ring_color, accent_color, seed_lines=None, motif='rings', seed=0):
    seed_lines = seed_lines or []
    base = make_gradient(angle, DARK_STOPS).convert('RGBA')
    draw_glow(base, *ring_center, 340, accent_color, max_opacity=100)
    draw_dot_grid(base, (255, 255, 255))

    if motif == 'rings':
        draw_rings(base, *ring_center, 60, 6, ring_color, width_start=2.4, width_end=1, opacity_start=130, opacity_end=0, gap=58)
        draw = ImageDraw.Draw(base, 'RGBA')
        cx, cy = ring_center
        for ang in seed_lines:
            rad = math.radians(ang)
            x2 = cx + math.cos(rad) * 640
            y2 = cy + math.sin(rad) * 640
            draw.line([cx, cy, x2, y2], fill=(*accent_color, 46), width=2)
    elif motif == 'network':
        draw_network(base, *ring_center, ring_color, accent_color, seed=seed)
    elif motif == 'flow':
        draw_flow(base, *ring_center, ring_color, accent_color, seed=seed)
    elif motif == 'circuit':
        draw_circuit(base, ring_color, accent_color, seed=seed)

    # small brand mark: a diamond outline, echoing the logo silhouette, top-left
    draw = ImageDraw.Draw(base, 'RGBA')
    m = 64
    mx, my = 72, 72
    draw.polygon([(mx, my - m/2.4), (mx + m/3.4, my), (mx, my + m/2.4), (mx - m/3.4, my)], outline=(255, 255, 255, 200), width=3)
    draw.polygon([(mx, my - m/4.2), (mx + m/6, my), (mx, my + m/4.2), (mx - m/6, my)], outline=(*accent_color, 230), width=3)

    base = base.convert('RGB')
    out = f'public/insights/{slug}.png'
    base.save(out, 'PNG', optimize=True)
    print('wrote', out)

os.makedirs('public/insights', exist_ok=True)

# Growth & strategy -> rings
make_cover('growth-exposes-gaps', angle=125, ring_center=(860, 300), ring_color=PRIMARY, accent_color=CYAN, seed_lines=[20, 160, 250], motif='rings')

# Sales & HubSpot -> converging flow lines (pipeline)
make_cover('getting-more-from-hubspot', angle=200, ring_center=(900, 340), ring_color=CYAN, accent_color=PRIMARY, motif='flow', seed=3)

# AI & transformation -> node network
make_cover('practical-ai-plan', angle=60, ring_center=(830, 300), ring_color=BLUE, accent_color=CYAN, motif='network', seed=11)

# Web & Technology -> circuit grid (template for the next queued post in this pillar)
make_cover('web-technology-template', angle=155, ring_center=(600, 315), ring_color=CYAN, accent_color=PRIMARY, motif='circuit', seed=5)
