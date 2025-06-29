const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Image optimization script
// This script will create optimized versions of images for better performance

const imageExtensions = ['.jpg', '.jpeg', '.png', '.bmp', '.tiff', '.webp'];
const inputDir = path.join(__dirname, '../public/works');
const outputDir = path.join(__dirname, '../public/works/optimized');

// Create output directory if it doesn't exist
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Image quality presets
const presets = {
  low: {
    quality: 60,
    maxWidth: 800,
    maxHeight: 600,
    format: 'webp'
  },
  medium: {
    quality: 75,
    maxWidth: 1200,
    maxHeight: 900,
    format: 'webp'
  },
  high: {
    quality: 85,
    maxWidth: 1920,
    maxHeight: 1440,
    format: 'webp'
  }
};

function findImages(dir) {
  const images = [];
  
  function scanDirectory(currentDir) {
    const items = fs.readdirSync(currentDir);
    
    for (const item of items) {
      const fullPath = path.join(currentDir, item);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory()) {
        scanDirectory(fullPath);
      } else if (imageExtensions.includes(path.extname(item).toLowerCase())) {
        images.push(fullPath);
      }
    }
  }
  
  scanDirectory(dir);
  return images;
}

function optimizeImage(inputPath, quality = 'medium') {
  const preset = presets[quality];
  const relativePath = path.relative(inputDir, inputPath);
  const outputPath = path.join(outputDir, relativePath.replace(/\.[^/.]+$/, `.${preset.format}`));
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
  
  const magickCommand = [
    'magick',
    `"${inputPath}"`,
    '-resize', `${preset.maxWidth}x${preset.maxHeight}>`,
    '-quality', preset.quality,
    '-strip',
    '-interlace', 'Plane',
    `"${outputPath}"`
  ].join(' ');
  
  try {
    console.log(`Optimizing ${relativePath}...`);
    execSync(magickCommand, { stdio: 'inherit' });
    console.log(`✓ Optimized ${relativePath}`);
  } catch (error) {
    console.error(`✗ Failed to optimize ${relativePath}:`, error.message);
    // Fallback to ImageMagick without magick command
    try {
      const convertCommand = [
        'convert',
        `"${inputPath}"`,
        '-resize', `${preset.maxWidth}x${preset.maxHeight}>`,
        '-quality', preset.quality,
        '-strip',
        '-interlace', 'Plane',
        `"${outputPath}"`
      ].join(' ');
      
      execSync(convertCommand, { stdio: 'inherit' });
      console.log(`✓ Optimized ${relativePath} (fallback)`);
    } catch (fallbackError) {
      console.error(`✗ Failed to optimize ${relativePath} with fallback:`, fallbackError.message);
    }
  }
}

function createResponsiveImages(inputPath, quality = 'medium') {
  const preset = presets[quality];
  const relativePath = path.relative(inputDir, inputPath);
  const baseName = path.basename(relativePath, path.extname(relativePath));
  const outputDirPath = path.dirname(path.join(outputDir, relativePath));
  
  // Create multiple sizes for responsive images
  const sizes = [
    { suffix: 'xs', width: 400, height: 300 },
    { suffix: 'sm', width: 600, height: 450 },
    { suffix: 'md', width: 800, height: 600 },
    { suffix: 'lg', width: 1200, height: 900 },
    { suffix: 'xl', width: 1600, height: 1200 }
  ];
  
  for (const size of sizes) {
    const outputPath = path.join(outputDirPath, `${baseName}-${size.suffix}.${preset.format}`);
    
    if (fs.existsSync(outputPath)) {
      continue;
    }
    
    const magickCommand = [
      'magick',
      `"${inputPath}"`,
      '-resize', `${size.width}x${size.height}>`,
      '-quality', preset.quality,
      '-strip',
      '-interlace', 'Plane',
      `"${outputPath}"`
    ].join(' ');
    
    try {
      execSync(magickCommand, { stdio: 'inherit' });
      console.log(`✓ Created ${baseName}-${size.suffix}.${preset.format}`);
    } catch (error) {
      console.error(`✗ Failed to create ${baseName}-${size.suffix}.${preset.format}:`, error.message);
    }
  }
}

function main() {
  console.log('🖼️ Starting image optimization...');
  
  const images = findImages(inputDir);
  console.log(`Found ${images.length} images to optimize`);
  
  for (const image of images) {
    // Determine quality based on image location and size
    let quality = 'medium';
    
    if (image.includes('MYLOGO')) {
      quality = 'high'; // Logo images need high quality
    } else if (image.includes('posters') || image.includes('general posters')) {
      quality = 'medium'; // Poster images can be medium quality
    } else if (image.includes('screenshots') || image.includes('app vid')) {
      quality = 'low'; // Screenshots can be lower quality
    }
    
    optimizeImage(image, quality);
    
    // Create responsive versions for important images
    if (image.includes('MYLOGO') || image.includes('posters')) {
      createResponsiveImages(image, quality);
    }
  }
  
  console.log('✅ Image optimization complete!');
  console.log(`Optimized images saved to: ${outputDir}`);
}

// Run the script
if (require.main === module) {
  main();
}

module.exports = { optimizeImage, findImages, createResponsiveImages }; 