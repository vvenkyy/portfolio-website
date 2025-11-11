import os
import subprocess
from pathlib import Path

VIDEO_DIRS = [
    "public/works/backdrop vid",
    "public/works/logo vid",
    "public/works/web vid",
    "public/works/app developement",
    "public/works/websites"
]
POSTER_SUFFIX = '_poster.jpg'

def convert_video(input_path, output_path):
    cmd = [
        "ffmpeg", "-y", "-i", str(input_path),
        "-c:v", "libvpx-vp9", "-b:v", "1M", "-an", str(output_path)
    ]
    subprocess.run(cmd, check=True)

def generate_poster(input_path, poster_path):
    cmd = [
        "ffmpeg", "-y", "-i", str(input_path),
        "-ss", "00:00:01.000", "-vframes", "1", str(poster_path)
    ]
    subprocess.run(cmd, check=True)

def main():
    for dir in VIDEO_DIRS:
        p = Path(dir)
        if not p.exists():
            continue
        for file in p.glob('*.mp4'):
            webm_path = file.with_suffix('.webm')
            poster_path = file.with_name(file.stem + POSTER_SUFFIX)
            if not webm_path.exists():
                print(f'Converting {file} to {webm_path}')
                convert_video(file, webm_path)
            if not poster_path.exists():
                print(f'Generating poster for {file} at {poster_path}')
                generate_poster(file, poster_path)

if __name__ == '__main__':
    main() 