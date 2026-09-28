"""Build walkthrough.gif for Street Eats (Unit 2).

Each frame is a headless-Chrome screenshot of the running app, framed with a
mock browser bar showing the real URL and a caption strip describing the step.
Terminal frames are rendered from captured command output.
"""
import subprocess, sys, os
from PIL import Image, ImageDraw, ImageFont

OUT = sys.argv[1]
SHOTS = os.path.dirname(os.path.abspath(__file__))
W, CONTENT_H, BAR_H, CAP_H = 900, 563, 48, 40
CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"

def font(size, mono=False):
    paths = (["/System/Library/Fonts/Menlo.ttc"] if mono else
             ["/System/Library/Fonts/Supplemental/Arial.ttf", "/System/Library/Fonts/Helvetica.ttc"])
    for p in paths:
        if os.path.exists(p):
            return ImageFont.truetype(p, size)
    return ImageFont.load_default()

def shoot(url, name, scale=1.0):
    """scale < 1 zooms the page out so more of it fits in one frame."""
    path = os.path.join(SHOTS, name + ".png")
    subprocess.run([CHROME, "--headless", "--disable-gpu", "--hide-scrollbars",
                    f"--screenshot={path}",
                    f"--window-size={round(W / scale)},{round(CONTENT_H / scale)}",
                    f"--force-device-scale-factor={scale}",
                    "--virtual-time-budget=4000", url],
                   check=True, capture_output=True)
    return Image.open(path).convert("RGB").resize((W, CONTENT_H))

def terminal(lines, title, caption):
    """Render captured command output as a full terminal window frame."""
    img = Image.new("RGB", (W, BAR_H + CONTENT_H + CAP_H), (24, 26, 34))
    d = ImageDraw.Draw(img)
    d.rectangle([0, 0, W, BAR_H], fill=(45, 48, 58))
    for i, c in enumerate([(255, 95, 86), (255, 189, 46), (39, 201, 63)]):
        d.ellipse([16 + i * 20, 18, 28 + i * 20, 30], fill=c)
    d.text((W // 2, BAR_H // 2), title, font=font(14), fill=(190, 194, 204), anchor="mm")
    f = font(14, mono=True)
    # Menlo has no emoji glyphs, so swap the seed script's markers for ASCII.
    marks = {"🎉": "**", "✅": " +", "⚠️": " !"}
    y = BAR_H + 22
    for line in lines[:32]:
        color = (120, 220, 140) if line.startswith(("✅", "🎉")) else (222, 226, 232)
        for emoji, ascii_mark in marks.items():
            line = line.replace(emoji, ascii_mark)
        d.text((24, y), line, font=f, fill=color)
        y += 20
    d.rectangle([0, BAR_H + CONTENT_H, W, BAR_H + CONTENT_H + CAP_H], fill=(30, 34, 44))
    d.text((W // 2, BAR_H + CONTENT_H + CAP_H // 2), caption,
           font=font(15), fill=(240, 242, 245), anchor="mm")
    return img

def frame(content, url, caption):
    img = Image.new("RGB", (W, BAR_H + CONTENT_H + CAP_H), (255, 255, 255))
    d = ImageDraw.Draw(img)
    d.rectangle([0, 0, W, BAR_H], fill=(222, 225, 230))
    for i, c in enumerate([(255, 95, 86), (255, 189, 46), (39, 201, 63)]):
        d.ellipse([16 + i * 20, 18, 28 + i * 20, 30], fill=c)
    d.rounded_rectangle([84, 10, W - 18, BAR_H - 10], radius=14, fill=(255, 255, 255))
    d.text((100, BAR_H // 2), url, font=font(15), fill=(50, 54, 62), anchor="lm")
    img.paste(content, (0, BAR_H))
    d.rectangle([0, BAR_H + CONTENT_H, W, BAR_H + CONTENT_H + CAP_H], fill=(30, 34, 44))
    d.text((W // 2, BAR_H + CONTENT_H + CAP_H // 2), caption,
           font=font(15), fill=(240, 242, 245), anchor="mm")
    return img

BASE = "http://localhost:3001"
reset_out = open(os.path.join(SHOTS, "reset.txt")).read().splitlines()
psql_out = open(os.path.join(SHOTS, "psql.txt")).read().splitlines()

frames = [
    terminal(reset_out, "server — npm run reset",
             "The server creates and seeds the foods table in PostgreSQL"),
    terminal(psql_out, "psql — SELECT * FROM foods",
             "psql confirms the rows live in the database, not in a static file"),
    frame(shoot(BASE + "/", "home", scale=0.62), "localhost:3001",
          "Home page — every card is rendered from a database query"),
    frame(shoot(BASE + "/foods/tacos-al-pastor", "tacos"), "localhost:3001/foods/tacos-al-pastor",
          "Detail page: /foods/tacos-al-pastor"),
    frame(shoot(BASE + "/foods/griot", "griot"), "localhost:3001/foods/griot",
          "Detail page: /foods/griot"),
    frame(shoot(BASE + "/foods/doubles", "doubles"), "localhost:3001/foods/doubles",
          "Detail page: /foods/doubles"),
    frame(shoot(BASE + "/foods/pizza", "notfound"), "localhost:3001/foods/pizza",
          "A dish that isn't in the table gets a real 404"),
]

frames[0].save(OUT, save_all=True, append_images=frames[1:],
               duration=[3200, 3200, 2800, 2800, 2600, 2600, 2600], loop=0, optimize=True)
print("wrote", OUT, os.path.getsize(OUT) // 1024, "KB")
