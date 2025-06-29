const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Video optimization settings for better performance
const optimizationSettings = {
  // Low quality for mobile/performance mode
  low: {
    resolution: '1280x720',
    bitrate: '800k',
    framerate: '24',
    codec: 'libx264',
    preset: 'fast',
    crf: '28'
  },
  // Medium quality for standard devices
  medium: {
    resolution: '1920x1080',
    bitrate: '1500k',
    framerate: '30',
    codec: 'libx264',
    preset: 'medium',
    crf: '23'
  },
  // High quality for high-end devices
  high: {
    resolution: '1920x1080',
    bitrate: '2500k',
    framerate: '30',
    codec: 'libx264',
    preset: 'slow',
    crf: '18'
  }
};

// WebM optimization for better compression
const webmSettings = {
  low: {
    resolution: '1280x720',
    bitrate: '600k',
    framerate: '24',
    codec: 'libvpx-vp9',
    crf: '32'
  },
  medium: {
    resolution: '1920x1080',
    bitrate: '1200k',
    framerate: '30',
    codec: 'libvpx-vp9',
    crf: '25'
  },
  high: {
    resolution: '1920x1080',
    bitrate: '2000k',
    framerate: '30',
    codec: 'libvpx-vp9',
    crf: '20'
  }
};

function optimizeVideo(inputPath, outputPath, quality = 'medium', format = 'mp4') {
  const settings = format === 'webm' ? webmSettings[quality] : optimizationSettings[quality];
  
  let command;
  
  if (format === 'webm') {
    command = `ffmpeg -i "${inputPath}" -c:v ${settings.codec} -b:v ${settings.bitrate} -crf ${settings.crf} -vf "scale=${settings.resolution}:force_original_aspect_ratio=decrease,pad=${settings.resolution}:(ow-iw)/2:(oh-ih)/2" -r ${settings.framerate} -c:a aac -b:a 128k -movflags +faststart -y "${outputPath}"`;
  } else {
    command = `ffmpeg -i "${inputPath}" -c:v ${settings.codec} -preset ${settings.preset} -crf ${settings.crf} -b:v ${settings.bitrate} -vf "scale=${settings.resolution}:force_original_aspect_ratio=decrease,pad=${settings.resolution}:(ow-iw)/2:(oh-ih)/2" -r ${settings.framerate} -c:a aac -b:a 128k -movflags +faststart -y "${outputPath}"`;
  }
  
  try {
    console.log(`Optimizing ${inputPath} to ${outputPath} (${quality} quality, ${format} format)`);
    execSync(command, { stdio: 'inherit' });
    console.log(`✅ Optimized: ${outputPath}`);
  } catch (error) {
    console.error(`❌ Failed to optimize ${inputPath}:`, error.message);
  }
}

function createOptimizedVersions(inputPath, outputDir) {
  const filename = path.basename(inputPath, path.extname(inputPath));
  
  // Create optimized versions for different qualities
  const qualities = ['low', 'medium', 'high'];
  const formats = ['mp4', 'webm'];
  
  qualities.forEach(quality => {
    formats.forEach(format => {
      const outputPath = path.join(outputDir, `${filename}-${quality}.${format}`);
      optimizeVideo(inputPath, outputPath, quality, format);
    });
  });
}

function processDirectory(dirPath) {
  const videoExtensions = ['.mp4', '.mov', '.avi', '.mkv', '.webm'];
  
  if (!fs.existsSync(dirPath)) {
    console.log(`Directory not found: ${dirPath}`);
    return;
  }
  
  const items = fs.readdirSync(dirPath);
  
  items.forEach(item => {
    const fullPath = path.join(dirPath, item);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      // Create optimized subdirectory
      const optimizedDir = path.join(dirPath, 'optimized', item);
      if (!fs.existsSync(optimizedDir)) {
        fs.mkdirSync(optimizedDir, { recursive: true });
      }
      processDirectory(fullPath);
    } else if (videoExtensions.includes(path.extname(item).toLowerCase())) {
      // Create optimized directory for videos
      const optimizedDir = path.join(dirPath, 'optimized');
      if (!fs.existsSync(optimizedDir)) {
        fs.mkdirSync(optimizedDir, { recursive: true });
      }
      
      createOptimizedVersions(fullPath, optimizedDir);
    }
  });
}

// Main execution
const publicDir = path.join(__dirname, '..', 'public');
const worksDir = path.join(publicDir, 'works');

console.log('🎬 Starting video optimization...');
console.log('📁 Processing directory:', worksDir);

if (fs.existsSync(worksDir)) {
  processDirectory(worksDir);
  console.log('✅ Video optimization completed!');
} else {
  console.log('❌ Works directory not found');
} 