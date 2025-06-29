const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Video optimization script
// This script will create optimized versions of videos for better performance

const videoExtensions = ['.mp4', '.mov', '.avi', '.mkv'];
const inputDir = path.join(__dirname, '../public/works');
const outputDir = path.join(__dirname, '../public/works/optimized');

// Create output directory if it doesn't exist
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Video quality presets
const presets = {
  low: {
    resolution: '1280x720',
    bitrate: '800k',
    fps: '30',
    crf: '28'
  },
  medium: {
    resolution: '1920x1080',
    bitrate: '1500k',
    fps: '30',
    crf: '23'
  },
  high: {
    resolution: '1920x1080',
    bitrate: '2500k',
    fps: '30',
    crf: '20'
  }
};

function findVideos(dir) {
  const videos = [];
  
  function scanDirectory(currentDir) {
    const items = fs.readdirSync(currentDir);
    
    for (const item of items) {
      const fullPath = path.join(currentDir, item);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory()) {
        scanDirectory(fullPath);
      } else if (videoExtensions.includes(path.extname(item).toLowerCase())) {
        videos.push(fullPath);
      }
    }
  }
  
  scanDirectory(dir);
  return videos;
}

function optimizeVideo(inputPath, quality = 'medium') {
  const preset = presets[quality];
  const relativePath = path.relative(inputDir, inputPath);
  const outputPath = path.join(outputDir, relativePath);
  const outputDirPath = path.dirname(outputPath);
  
  // Create output directory structure
  if (!fs.existsSync(outputDirPath)) {
    fs.mkdirSync(outputDirPath, { recursive: true });
  }
  
  // Skip if output already exists
  if (fs.existsSync(outputPath)) {
    console.log(`Skipping ${relativePath} - already optimized`);
    return;
  }
  
  const ffmpegCommand = [
    'ffmpeg',
    '-i', `"${inputPath}"`,
    '-c:v', 'libx264',
    '-preset', 'medium',
    '-crf', preset.crf,
    '-b:v', preset.bitrate,
    '-maxrate', preset.bitrate,
    '-bufsize', `${parseInt(preset.bitrate) * 2}k`,
    '-vf', `scale=${preset.resolution}:force_original_aspect_ratio=decrease`,
    '-r', preset.fps,
    '-c:a', 'aac',
    '-b:a', '128k',
    '-movflags', '+faststart',
    '-y',
    `"${outputPath}"`
  ].join(' ');
  
  try {
    console.log(`Optimizing ${relativePath}...`);
    execSync(ffmpegCommand, { stdio: 'inherit' });
    console.log(`✓ Optimized ${relativePath}`);
  } catch (error) {
    console.error(`✗ Failed to optimize ${relativePath}:`, error.message);
  }
}

function main() {
  console.log('🎬 Starting video optimization...');
  
  const videos = findVideos(inputDir);
  console.log(`Found ${videos.length} videos to optimize`);
  
  for (const video of videos) {
    // Determine quality based on video location
    let quality = 'medium';
    
    if (video.includes('backdrop vid')) {
      quality = 'low'; // Background videos can be lower quality
    } else if (video.includes('enhanced')) {
      quality = 'medium'; // Enhanced videos keep medium quality
    } else if (video.includes('MAIN VID') || video.includes('enhanced')) {
      quality = 'high'; // Main videos get high quality
    }
    
    optimizeVideo(video, quality);
  }
  
  console.log('✅ Video optimization complete!');
  console.log(`Optimized videos saved to: ${outputDir}`);
}

// Run the script
if (require.main === module) {
  main();
}

module.exports = { optimizeVideo, findVideos }; 