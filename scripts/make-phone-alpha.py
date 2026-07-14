"""Remove studio background (white/gray OR pure black); save transparent PNGs."""
from __future__ import annotations

import os
from collections import deque

from PIL import Image

SRC_DIR = r"C:\Users\Reisf\.grok\sessions\C%3A%5CUsers%5CReisf\019f5fc4-f606-7870-a916-1dc1103c3751\images"
OUT_DIR = r"C:\Users\Reisf\Desktop\gritsite\brand-pictures\phone-mockups"

FILES = [
    ("34.jpg", "grit-phone-01-manual-chat.png"),
    ("31.jpg", "grit-phone-02-nameplate-scan.png"),
    ("33.jpg", "grit-phone-03-fault-dark.png"),
    ("32.jpg", "grit-phone-04-manual-light.png"),
    ("35.jpg", "grit-phone-05-equipment-id.png"),
]


def chroma(r: int, g: int, b: int) -> int:
    return max(r, g, b) - min(r, g, b)


def lum(r: int, g: int, b: int) -> float:
    return 0.2126 * r + 0.7152 * g + 0.0722 * b


def color_dist(a: tuple[int, int, int], b: tuple[int, int, int]) -> float:
    return (
        (a[0] - b[0]) ** 2 + (a[1] - b[1]) ** 2 + (a[2] - b[2]) ** 2
    ) ** 0.5


def sample_edge_mode(px, w: int, h: int) -> str:
    """Detect dominant studio: dark or light."""
    dark = 0
    light = 0
    for x in range(0, w, 8):
        for y in (0, 1, 2, h - 1, h - 2):
            r, g, b = px[x, y][:3]
            L = lum(r, g, b)
            if L < 25 and chroma(r, g, b) < 20:
                dark += 1
            if L > 120 and chroma(r, g, b) < 25:
                light += 1
    for y in range(0, h, 8):
        for x in (0, 1, 2, w - 1, w - 2):
            r, g, b = px[x, y][:3]
            L = lum(r, g, b)
            if L < 25 and chroma(r, g, b) < 20:
                dark += 1
            if L > 120 and chroma(r, g, b) < 25:
                light += 1
    return "dark" if dark >= light else "light"


def is_bg_light(r: int, g: int, b: int) -> bool:
    c = chroma(r, g, b)
    L = lum(r, g, b)
    if r > 230 and g > 230 and b > 230:
        return True
    if c <= 18 and L >= 115:
        return True
    return False


def is_bg_dark(r: int, g: int, b: int) -> bool:
    """Near-black studio - stop before hand/phone chrome."""
    L = lum(r, g, b)
    c = chroma(r, g, b)
    # Pure black / very dark neutral
    if L <= 18 and c <= 18:
        return True
    if L <= 28 and c <= 12:
        return True
    # Slight blue-black studio (but not blue UI chrome on screen - only low sat)
    if L <= 32 and c <= 22 and abs(b - r) < 20:
        return True
    return False


def remove_bg(img: Image.Image) -> Image.Image:
    img = img.convert("RGBA")
    w, h = img.size
    px = img.load()
    mode = sample_edge_mode(px, w, h)
    is_bg = is_bg_dark if mode == "dark" else is_bg_light
    tol = 22 if mode == "dark" else 30

    visited = [[False] * h for _ in range(w)]
    q: deque[tuple[int, int]] = deque()

    def try_seed(x: int, y: int) -> None:
        if visited[x][y]:
            return
        r, g, b, _a = px[x, y]
        if is_bg(r, g, b):
            visited[x][y] = True
            q.append((x, y))

    for x in range(w):
        for y in range(min(6, h)):
            try_seed(x, y)
        for y in range(max(0, h - 6), h):
            try_seed(x, y)
    for y in range(h):
        for x in range(min(6, w)):
            try_seed(x, y)
        for x in range(max(0, w - 6), w):
            try_seed(x, y)

    while q:
        x, y = q.popleft()
        r, g, b, _a = px[x, y]
        seed = (r, g, b)
        if is_bg(r, g, b):
            px[x, y] = (r, g, b, 0)
        for nx, ny in ((x + 1, y), (x - 1, y), (x, y + 1), (x, y - 1)):
            if not (0 <= nx < w and 0 <= ny < h) or visited[nx][ny]:
                continue
            rr, gg, bb, _aa = px[nx, ny]
            if is_bg(rr, gg, bb) or (
                color_dist(seed, (rr, gg, bb)) < tol and is_bg(rr, gg, bb)
            ):
                # slightly looser: similar to seed AND still bg-ish
                if is_bg(rr, gg, bb) or (
                    mode == "dark"
                    and lum(rr, gg, bb) < 35
                    and chroma(rr, gg, bb) < 18
                    and color_dist(seed, (rr, gg, bb)) < tol + 8
                ) or (
                    mode == "light"
                    and lum(rr, gg, bb) > 110
                    and chroma(rr, gg, bb) < 22
                    and color_dist(seed, (rr, gg, bb)) < tol + 10
                ):
                    visited[nx][ny] = True
                    q.append((nx, ny))
                else:
                    visited[nx][ny] = True
            else:
                visited[nx][ny] = True

    # Second pass: any edge-adjacent pure black leftover
    if mode == "dark":
        for x in range(w):
            for y in range(h):
                r, g, b, a = px[x, y]
                if a == 0:
                    continue
                if lum(r, g, b) <= 12 and chroma(r, g, b) <= 10:
                    # only if neighbor transparent (fringe)
                    for nx, ny in ((x + 1, y), (x - 1, y), (x, y + 1), (x, y - 1)):
                        if 0 <= nx < w and 0 <= ny < h and px[nx, ny][3] == 0:
                            px[x, y] = (r, g, b, 0)
                            break

    # Feather
    for x in range(w):
        for y in range(h):
            r, g, b, a = px[x, y]
            if a == 0:
                continue
            near_t = False
            for nx, ny in ((x + 1, y), (x - 1, y), (x, y + 1), (x, y - 1)):
                if 0 <= nx < w and 0 <= ny < h and px[nx, ny][3] == 0:
                    near_t = True
                    break
            if not near_t:
                continue
            if mode == "dark" and lum(r, g, b) < 40 and chroma(r, g, b) < 20:
                na = int(max(0, min(255, lum(r, g, b) / 40 * 180)))
                px[x, y] = (r, g, b, na)
            if mode == "light" and lum(r, g, b) > 150 and chroma(r, g, b) < 20:
                L = lum(r, g, b) / 255
                na = int(max(0, min(255, (1 - (L - 0.55) / 0.45) * 200)))
                px[x, y] = (r, g, b, na)

    return img


def main() -> None:
    os.makedirs(OUT_DIR, exist_ok=True)
    for src_name, out_name in FILES:
        path = os.path.join(SRC_DIR, src_name)
        im = Image.open(path)
        out = remove_bg(im)
        out.save(os.path.join(OUT_DIR, out_name), "PNG")
        im.convert("RGB").save(
            os.path.join(OUT_DIR, out_name.replace(".png", "-source.jpg")),
            quality=92,
        )
        sample = out.load()
        t = 0
        ww, hh = out.size
        for x in range(0, ww, 5):
            for y in range(0, hh, 5):
                if sample[x, y][3] < 12:
                    t += 1
        print("saved", out_name, out.size, "transparent_samples", t)

    readme = """# GRIT phone mockups

Converted from `phonetemplate.webp` (hand + iPhone product shot).

- Brand: GRIT black-and-white industrial field UI
- Background: **transparent PNG** (studio backdrop removed)
- Source JPGs kept as `-source.jpg`

| File | Concept |
|------|---------|
| grit-phone-01-manual-chat.png | Manual-backed troubleshooting chat |
| grit-phone-02-nameplate-scan.png | Nameplate scan overlay |
| grit-phone-03-fault-dark.png | Dark mode fault / VFD flow |
| grit-phone-04-manual-light.png | Light mode motor + manual steps |
| grit-phone-05-equipment-id.png | Equipment identified + confidence |

Re-run: `py -3 scripts/make-phone-alpha.py`
"""
    with open(os.path.join(OUT_DIR, "README.md"), "w", encoding="utf-8") as f:
        f.write(readme)
    print("done")


if __name__ == "__main__":
    main()
