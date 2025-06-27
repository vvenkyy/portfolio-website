import os
from PIL import Image, ImageDraw
import random

# Config
LOGOS_DIR = os.path.join('public', 'works', 'logo vid')
OUTPUT_PATH = os.path.join('public', 'works', 'logo vid', 'logo_collage.png')
COLUMNS = 4
LOGO_WIDTH = 220  # px, final square size
GAP_X = 32  # px horizontal gap
GAP_Y = 40  # px vertical gap
REPEAT = 6  # how many times to repeat the pattern vertically
STAGGER_X = 60  # max px to offset columns for energy
CORNER_RADIUS = 32  # px for rounded corners

# Check if directory exists
if not os.path.exists(LOGOS_DIR):
    print(f"Directory does not exist: {LOGOS_DIR}")
    exit(1)

# Collect logo files
logo_files = [
    f for f in os.listdir(LOGOS_DIR)
    if f.lower().endswith(('.png', '.jpg', '.jpeg'))
]
if not logo_files:
    print(f"No images found in {LOGOS_DIR}")
    exit(1)

# Randomize order
random.shuffle(logo_files)

# Helper: crop center square
def crop_center_square(img):
    w, h = img.size
    min_side = min(w, h)
    left = (w - min_side) // 2
    top = (h - min_side) // 2
    right = left + min_side
    bottom = top + min_side
    return img.crop((left, top, right, bottom))

# Helper: add rounded corners
def add_rounded_corners(img, radius):
    mask = Image.new('L', (img.size[0], img.size[1]), 0)
    draw = ImageDraw.Draw(mask)
    draw.rounded_rectangle([(0, 0), img.size], radius=radius, fill=255)
    img.putalpha(mask)
    return img

# Load, crop, resize, and round logos
logos = []
for fname in logo_files:
    path = os.path.join(LOGOS_DIR, fname)
    try:
        img = Image.open(path).convert('RGBA')
        img = crop_center_square(img)
        img = img.resize((LOGO_WIDTH, LOGO_WIDTH), Image.LANCZOS)
        img = add_rounded_corners(img, CORNER_RADIUS)
        logos.append(img)
    except Exception as e:
        print(f"Error loading {fname}: {e}")

if not logos:
    print("No valid images to process.")
    exit(1)

# Prepare a single pattern (one set of all logos)
rows = (len(logos) + COLUMNS - 1) // COLUMNS
pattern_height = rows * LOGO_WIDTH + (rows - 1) * GAP_Y
pattern_width = COLUMNS * LOGO_WIDTH + (COLUMNS - 1) * GAP_X + STAGGER_X

# Create the full collage (repeat the pattern vertically)
img_width = pattern_width
img_height = pattern_height * REPEAT
collage = Image.new('RGBA', (img_width, img_height), (0, 0, 0, 0))

for repeat in range(REPEAT):
    y = repeat * pattern_height
    for r in range(rows):
        # Stagger every other row for energy
        x_offset = (r % 2) * STAGGER_X
        x = x_offset
        row_imgs = logos[r*COLUMNS:(r+1)*COLUMNS]
        for img in row_imgs:
            collage.paste(img, (x, y), img)
            x += LOGO_WIDTH + GAP_X
        y += LOGO_WIDTH + GAP_Y

collage.save(OUTPUT_PATH)
print(f"Saved logo collage to {OUTPUT_PATH}") 