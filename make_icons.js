// 폰트 비의존 아이콘 생성: 종(temple bell) + 염주(prayer beads) 링
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const OUT = path.join(__dirname, 'assets');
fs.mkdirSync(OUT, { recursive: true });

const defs = `
  <defs>
    <radialGradient id="bg" cx="50%" cy="36%" r="80%">
      <stop offset="0%" stop-color="#3c2a18"/>
      <stop offset="100%" stop-color="#150e07"/>
    </radialGradient>
    <linearGradient id="gold" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#f6d88f"/>
      <stop offset="55%" stop-color="#e0b35e"/>
      <stop offset="100%" stop-color="#c1902c"/>
    </linearGradient>
  </defs>`;

function beads() {
  const cx = 512, cy = 512, R = 300, n = 24, r = 13;
  let s = '';
  for (let i = 0; i < n; i++) {
    const a = (i / n) * Math.PI * 2 - Math.PI / 2;
    const x = (cx + R * Math.cos(a)).toFixed(1);
    const y = (cy + R * Math.sin(a)).toFixed(1);
    s += `<circle cx="${x}" cy="${y}" r="${r}" fill="url(#gold)"/>`;
  }
  return s;
}

const bell = `
  <g fill="url(#gold)">
    <circle cx="512" cy="415" r="20"/>
    <path d="M512 432 C586 432 640 492 640 580 L654 686 C654 700 642 710 628 710 L396 710 C382 710 370 700 370 686 L384 580 C384 492 438 432 512 432 Z"/>
    <circle cx="512" cy="742" r="26"/>
  </g>`;

const logo = beads() + bell;

function svg({ bg = false, scale = 1, size = 1024 }) {
  const inner = bg
    ? `<rect width="1024" height="1024" fill="url(#bg)"/>` + logo
    : logo;
  const tx = (size - 1024 * scale) / 2;
  return `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">${defs}<g transform="translate(${tx} ${tx}) scale(${scale})">${inner}</g></svg>`;
}

function bgOnly(size) {
  return `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">${defs}<rect width="${size}" height="${size}" fill="url(#bg)"/></svg>`;
}

async function render(svgStr, file) {
  await sharp(Buffer.from(svgStr)).png().toFile(path.join(OUT, file));
  console.log('wrote', file);
}

(async () => {
  // 어댑티브 아이콘: 전경(로고만, 투명) + 배경(그라데이션)
  await render(svg({ bg: false, scale: 1, size: 1024 }), 'icon-foreground.png');
  await render(bgOnly(1024), 'icon-background.png');
  // 단일 아이콘(배경+로고)
  await render(svg({ bg: true, scale: 1, size: 1024 }), 'icon-only.png');
  // 스플래시(배경 + 가운데 로고)
  const splash = `<svg width="2732" height="2732" viewBox="0 0 2732 2732" xmlns="http://www.w3.org/2000/svg">${defs}<rect width="2732" height="2732" fill="url(#bg)"/><g transform="translate(854 854) scale(1)">${logo}</g></svg>`;
  await render(splash, 'splash.png');
  await render(splash, 'splash-dark.png');
  console.log('ALL ICONS DONE');
})();
