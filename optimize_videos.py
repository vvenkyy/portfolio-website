#!/usr/bin/env python3
"""
Video Optimization Script for Portfolio Website
Generates 1080p, 720p, 480p, and 360p video versions with tuned bitrates and best compatibility
"""

import os
import subprocess
import sys
from pathlib import Path

def check_ffmpeg():
    """Check if ffmpeg is installed"""
    try:
        subprocess.run(['ffmpeg', '-version'], capture_output=True, check=True)
        return True
    except (subprocess.CalledProcessError, FileNotFoundError):
        return False

def optimize_video(input_path, output_path, resolution, fps=30, bitrate=None, maxrate=None, bufsize=None):
    """Optimize video with specified parameters"""
    if not os.path.exists(input_path):
        print(f"Input file not found: {input_path}")
        return False
    
    # Set bitrate and buffer size based on resolution
    if resolution == '1080p':
        bitrate = bitrate or '3500k'
        maxrate = maxrate or '4000k'
        bufsize = bufsize or '8000k'
        scale = 'scale=-2:1080'
    elif resolution == '720p':
        bitrate = bitrate or '1800k'
        maxrate = maxrate or '2200k'
        bufsize = bufsize or '4000k'
        scale = 'scale=-2:720'
    elif resolution == '480p':
        bitrate = bitrate or '900k'
        maxrate = maxrate or '1200k'
        bufsize = bufsize or '2000k'
        scale = 'scale=-2:480'
    elif resolution == '360p':
        bitrate = bitrate or '500k'
        maxrate = maxrate or '700k'
        bufsize = bufsize or '1200k'
        scale = 'scale=-2:360'
    else:
        print(f"Unknown resolution: {resolution}")
        return False

    cmd = [
        'ffmpeg',
        '-i', input_path,
        '-vf', scale,
        '-r', str(fps),
        '-b:v', bitrate,
        '-maxrate', maxrate,
        '-bufsize', bufsize,
        '-c:v', 'libx264',
        '-profile:v', 'baseline',
        '-preset', 'fast',
        '-crf', '23',
        '-c:a', 'aac',
        '-b:a', '96k',
        '-movflags', '+faststart',
        '-y',  # Overwrite output
        output_path
    ]
    
    try:
        print(f"Optimizing {input_path} to {output_path} ({resolution}, {fps}fps, {bitrate})")
        result = subprocess.run(cmd, capture_output=True, text=True, check=True)
        print(f"✓ Successfully optimized: {output_path}")
        return True
    except subprocess.CalledProcessError as e:
        print(f"✗ Error optimizing {input_path}: {e}")
        print(f"FFmpeg output: {e.stderr}")
        return False

def main():
    """Main optimization function"""
    if not check_ffmpeg():
        print("❌ FFmpeg not found. Please install FFmpeg first.")
        print("Download from: https://ffmpeg.org/download.html")
        sys.exit(1)
    
    # Video files to optimize
    videos = [
        'public/works/backdrop vid/background vid.mp4',
        'public/works/backdrop vid/poster vid.mp4',
        'public/works/backdrop vid/logo vid.mp4',
        'public/works/backdrop vid/web vid.mp4',
        'public/works/backdrop vid/app vid.mp4',
    ]
    resolutions = ['1080p', '720p', '480p', '360p']
    
    print("🎬 Starting video optimization...")
    print("=" * 50)
    
    success_count = 0
    total_count = 0
    
    for input_path in videos:
        if not os.path.exists(input_path):
            print(f"⚠️  Skipping {input_path} (not found)")
            continue
        base, ext = os.path.splitext(input_path)
        for res in resolutions:
            output_path = f"{base}_{res}{ext}"
            if optimize_video(input_path, output_path, res, fps=30):
                success_count += 1
            total_count += 1
    
    print("=" * 50)
    print(f"✅ Optimization complete: {success_count}/{total_count} videos processed successfully")
    
    if success_count == total_count:
        print("🎉 All videos optimized successfully!")
    else:
        print("⚠️  Some videos failed to optimize. Check the errors above.")

if __name__ == "__main__":
    main() 