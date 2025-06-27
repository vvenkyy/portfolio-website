import os
from PIL import Image, ImageEnhance
import random

# Config
POSTERS_DIR = os.path.join('portfolio-website', 'public', 'works', 'posters', 'general posters')
OUTPUT_PATH = os.path.join('portfolio-website', 'public', 'works', 'works backdrop', 'poster_grid.png')
COLUMNS = 4
POSTER_WIDTH = 400  # px, resize for uniformity
GAP_X = 40  # px horizontal gap between columns
GAP_Y = 48  # larger vertical gap between posters in a column
COL_Y_JITTER = 120  # max px to randomly offset each column's starting Y
SATURATED_COUNT = 25  # increased number of posters to keep saturated

# Collect poster files
poster_files = [
    f for f in os.listdir(POSTERS_DIR)
    if f.lower().endswith(('.png', '.jpg', '.jpeg'))
]
poster_files.sort()  # for consistency

# Load and resize posters
posters = []
for fname in poster_files:
    path = os.path.join(POSTERS_DIR, fname)
    try:
        img = Image.open(path).convert('RGBA')
        w_percent = POSTER_WIDTH / img.width
        h_size = int(img.height * w_percent)
        img = img.resize((POSTER_WIDTH, h_size), Image.LANCZOS)
        posters.append(img)
    except Exception as e:
        print(f"Error loading {fname}: {e}")

# Randomly select which posters will be saturated
indices = list(range(len(posters)))
random.shuffle(indices)
saturated_indices = set(indices[:SATURATED_COUNT])

# Apply saturation: grayscale for most, color for a few
for i, img in enumerate(posters):
    if i not in saturated_indices:
        # Convert to grayscale but keep alpha
        gray = img.convert('L')
        img_gray = Image.merge('RGBA', [gray, gray, gray, img.split()[-1]])
        posters[i] = img_gray

# Distribute posters into columns (snake order for more editorial look)
columns = [[] for _ in range(COLUMNS)]
for idx, img in enumerate(posters):
    col = idx % COLUMNS
    columns[col].append(img)

# Calculate Y offsets for each column
col_y_offsets = [random.randint(0, COL_Y_JITTER) for _ in range(COLUMNS)]

# Calculate total height needed (max of all columns' heights + jitter)
col_heights = []
for col_imgs, y0 in zip(columns, col_y_offsets):
    h = y0 + sum(img.height for img in col_imgs) + GAP_Y * (len(col_imgs) - 1)
    col_heights.append(h)
img_height = max(col_heights) + 100
img_width = COLUMNS * POSTER_WIDTH + (COLUMNS + 1) * GAP_X

# Create transparent background
out = Image.new('RGBA', (img_width, img_height), (0, 0, 0, 0))

# Paste posters column by column
for col_idx, (col_imgs, y0) in enumerate(zip(columns, col_y_offsets)):
    x = GAP_X + col_idx * (POSTER_WIDTH + GAP_X)
    y = y0
    for img in col_imgs:
        out.paste(img, (x, y), img)
        y += img.height + GAP_Y  # add larger gap

# Save
out.save(OUTPUT_PATH)
print(f"Saved grid image to {OUTPUT_PATH}") 