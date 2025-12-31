/**
 * 生成 PWA 图标（使用纯代码绘制）
 */

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const ICONS_DIR = path.join(__dirname, '../public/icons');

// 需要生成的图标尺寸
const SIZES = [32, 72, 96, 120, 128, 144, 152, 180, 192, 384, 512];
const MASKABLE_SIZES = [192, 512];

// 创建 SVG 图标
function createIconSVG(size) {
  const padding = size * 0.15;
  const innerSize = size - padding * 2;
  const center = size / 2;
  const scale = innerSize / 22; // 原始 viewBox 是 -11 到 11

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#3b82f6"/>
      <stop offset="50%" style="stop-color:#6366f1"/>
      <stop offset="100%" style="stop-color:#8b5cf6"/>
    </linearGradient>
  </defs>
  <rect width="${size}" height="${size}" rx="${size * 0.2}" fill="url(#bg)"/>
  <g transform="translate(${center}, ${center}) scale(${scale})" stroke="#fff" fill="none" stroke-width="1.2">
    <circle r="2.2" fill="#fff" stroke="none"/>
    <ellipse rx="9" ry="3.5"/>
    <ellipse rx="9" ry="3.5" transform="rotate(60)"/>
    <ellipse rx="9" ry="3.5" transform="rotate(120)"/>
  </g>
</svg>`;
}

// 创建 maskable 图标 SVG（更大的安全区域）
function createMaskableIconSVG(size) {
  const padding = size * 0.2; // 20% 安全区域
  const innerSize = size - padding * 2;
  const center = size / 2;
  const scale = innerSize / 28; // 稍微缩小图标

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
  <rect width="${size}" height="${size}" fill="#09090b"/>
  <defs>
    <linearGradient id="iconBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#3b82f6"/>
      <stop offset="50%" style="stop-color:#6366f1"/>
      <stop offset="100%" style="stop-color:#8b5cf6"/>
    </linearGradient>
  </defs>
  <circle cx="${center}" cy="${center}" r="${innerSize / 2}" fill="url(#iconBg)"/>
  <g transform="translate(${center}, ${center}) scale(${scale})" stroke="#fff" fill="none" stroke-width="1.2">
    <circle r="2.2" fill="#fff" stroke="none"/>
    <ellipse rx="9" ry="3.5"/>
    <ellipse rx="9" ry="3.5" transform="rotate(60)"/>
    <ellipse rx="9" ry="3.5" transform="rotate(120)"/>
  </g>
</svg>`;
}

async function generateIcons() {
  // 确保目录存在
  if (!fs.existsSync(ICONS_DIR)) {
    fs.mkdirSync(ICONS_DIR, { recursive: true });
  }

  console.log('🎨 开始生成 PWA 图标...\n');

  // 生成普通图标
  for (const size of SIZES) {
    const svg = createIconSVG(size);
    const outputPath = path.join(ICONS_DIR, `icon-${size}.png`);

    await sharp(Buffer.from(svg))
      .png()
      .toFile(outputPath);

    console.log(`  ✓ icon-${size}.png`);
  }

  // 生成 maskable 图标
  for (const size of MASKABLE_SIZES) {
    const svg = createMaskableIconSVG(size);
    const outputPath = path.join(ICONS_DIR, `maskable-${size}.png`);

    await sharp(Buffer.from(svg))
      .png()
      .toFile(outputPath);

    console.log(`  ✓ maskable-${size}.png`);
  }

  // 生成 favicon（32x32 png，之后需要转换为 ico）
  const faviconSvg = createIconSVG(32);
  const faviconPath = path.join(__dirname, '../public/favicon.png');
  await sharp(Buffer.from(faviconSvg))
    .png()
    .toFile(faviconPath);
  console.log('  ✓ favicon.png');

  // 复制为 favicon.ico（实际上是 png，但大多数浏览器支持）
  fs.copyFileSync(faviconPath, path.join(__dirname, '../public/favicon.ico'));
  console.log('  ✓ favicon.ico');

  console.log('\n✅ 图标生成完成！');
}

generateIcons().catch(console.error);
