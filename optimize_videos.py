#!/usr/bin/env python3
"""
Video Optimization Script for Portfolio Website
Generates optimized video versions for different device capabilities
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

def optimize_video(input_path, output_path, resolution, fps=30, bitrate=None):
    """Optimize video with specified parameters"""
    if not os.path.exists(input_path):
        print(f"Input file not found: {input_path}")
        return False
    
    # Set bitrate based on resolution
    if bitrate is None:
        if resolution == '720p':
            bitrate = '2M'
        elif resolution == '480p':
            bitrate = '1M'
        else:
            bitrate = '4M'
    
    cmd = [
        'ffmpeg',
        '-i', input_path,
        '-vf', f'scale=-2:{resolution.replace("p", "")}',
        '-r', str(fps),
        '-b:v', bitrate,
        '-c:v', 'libx264',
        '-preset', 'fast',
        '-crf', '23',
        '-c:a', 'aac',
        '-b:a', '128k',
        '-movflags', '+faststart',
        '-y',  # Overwrite output
        output_path
    ]
    
    try:
        print(f"Optimizing {input_path} to {output_path} ({resolution}, {fps}fps)")
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
        {
            'input': 'public/works/backdrop vid/background vid.mp4',
            'outputs': [
                'public/works/backdrop vid/background vid_720p.mp4',
                'public/works/backdrop vid/background vid_480p.mp4'
            ]
        },
        {
            'input': 'public/works/backdrop vid/poster vid.mp4',
            'outputs': [
                'public/works/backdrop vid/poster vid_720p.mp4',
                'public/works/backdrop vid/poster vid_480p.mp4'
            ]
        },
        {
            'input': 'public/works/backdrop vid/logo vid.mp4',
            'outputs': [
                'public/works/backdrop vid/logo vid_720p.mp4',
                'public/works/backdrop vid/logo vid_480p.mp4'
            ]
        },
        {
            'input': 'public/works/backdrop vid/web vid.mp4',
            'outputs': [
                'public/works/backdrop vid/web vid_720p.mp4',
                'public/works/backdrop vid/web vid_480p.mp4'
            ]
        },
        {
            'input': 'public/works/backdrop vid/app vid.mp4',
            'outputs': [
                'public/works/backdrop vid/app vid_720p.mp4',
                'public/works/backdrop vid/app vid_480p.mp4'
            ]
        }
    ]
    
    print("🎬 Starting video optimization...")
    print("=" * 50)
    
    success_count = 0
    total_count = 0
    
    for video in videos:
        input_path = video['input']
        
        if not os.path.exists(input_path):
            print(f"⚠️  Skipping {input_path} (not found)")
            continue
        
        # Create 720p version
        if optimize_video(input_path, video['outputs'][0], '720p', fps=30):
            success_count += 1
        total_count += 1
        
        # Create 480p version for very low-end devices
        if optimize_video(input_path, video['outputs'][1], '480p', fps=30):
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