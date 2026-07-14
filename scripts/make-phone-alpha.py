"""Remove near-white studio background; save transparent PNGs."""
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


def is_bg(r: int, g: int, b: int) -> bool:
    if r > 235 and g > 235 and b > 235:
        return True
    if r > 220 and g > 220 and b > 220 and abs(r - g) < 12 and abs(g - b) < 12:
        return True
    return False


def remove_bg_flood(img: Image.Image) -> Image.Image:
    img = img.convert("RGBA")
    w, h = img.size
    px = img.load()
    visited = [[False] * h for _ in range(w)]
    q: deque[tuple[int, int]] = deque()

    for x in range(w):
        for y in (0, h - 1):
            r, g, b, _a = px[x, y]
            if is_bg(r, g, b):
                q.append((x, y))
                visited[x][y] = True
    for y in range(h):
        for x in (0, w - 1):
            if not visited[x][y]:
                r, g, b, _a = px[x, y]
                if is_bg(r, g, b):
                    q.append((x, y))
                    visited[x][y] = True

    while q:
        x, y = q.popleft()
        r, g, b, _a = px[x, y]
        if is_bg(r, g, b):
            px[x, y] = (r, g, b, 0)
        for nx, ny in ((x + 1, y), (x - 1, y), (x, y + 1), (x, y - 1)):
            if 0 <= nx < w and 0 <= ny < h and not visited[nx][ny]:
                rr, gg, bb, _aa = px[nx, ny]
                visited[nx][ny] = True
                if is_bg(rr, gg, bb):
                    q.append((nx, ny))

    # Feather fringe near transparent edges
    for x in range(w):
        for y in range(h):
            r, g, b, a = px[x, y]
            if a == 0:
                continue
            if r > 210 and g > 210 and b > 210 and abs(r - g) < 18 and abs(g - b) < 18:
                near_t = False
                for nx, ny in ((x + 1, y), (x - 1, y), (x, y + 1), (x, y - 1)):
                    if 0 <= nx < w and 0 <= ny < h and px[nx, ny][3] == 0:
                        near_t = True
                        break
                if near_t:
                    whiteness = (r + g + b) / 3 / 255
                    na = int(max(0, min(255, (1 - (whiteness - 0.82) / 0.18) * 255)))
                    px[x, y] = (r, g, b, na)
    return img


def main() -> None:
    os.makedirs(OUT_DIR, exist_ok=True)
    for src_name, out_name in FILES:
        path = os.path.join(SRC_DIR, src_name)
        im = Image.open(path)
        out = remove_bg_flood(im)
        out_path = os.path.join(OUT_DIR, out_name)
        out.save(out_path, "PNG")
        im.convert("RGB").save(
            os.path.join(OUT_DIR, out_name.replace(".png", "-source.jpg")),
            quality=92,
        )
        print("saved", out_name, out.size)

    readme = """# GRIT phone mockups

Converted from `phonetemplate.webp` (hand + iPhone product shot).

- Brand: GRIT black-and-white industrial field UI
- Background: transparent PNG (studio white removed via flood fill)
- Source JPGs kept as `-source.jpg` for reference

| File | Concept |
|------|---------|
| grit-phone-01-manual-chat.png | Manual-backed troubleshooting chat |
| grit-phone-02-nameplate-scan.png | Nameplate scan overlay |
| grit-phone-03-fault-dark.png | Dark mode fault / VFD flow |
| grit-phone-04-manual-light.png | Light mode motor + manual steps |
| grit-phone-05-equipment-id.png | Equipment identified + confidence |

Use on marketing site over the dark grid; transparent edges composite cleanly.
"""
    with open(os.path.join(OUT_DIR, "README.md"), "w", encoding="utf-8") as f:
        f.write(readme)
    print("done")


if __name__ == "__main__":
    main()
