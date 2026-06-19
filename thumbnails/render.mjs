import puppeteer from 'puppeteer';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const browser = await puppeteer.launch({
  headless: 'new',
  args: ['--no-sandbox', '--disable-setuid-sandbox', '--force-color-profile=srgb'],
});

const page = await browser.newPage();
await page.setViewport({ width: 1280, height: 720, deviceScaleFactor: 2 });

const fileUrl = 'file://' + path.join(__dirname, 'thumb.html');
await page.goto(fileUrl, { waitUntil: 'networkidle0' });

// ensure web fonts are loaded
await page.evaluateHandle('document.fonts.ready');
await new Promise((r) => setTimeout(r, 600));

await page.screenshot({
  path: path.join(__dirname, 'claude-free-part2-thumbnail.png'),
  type: 'png',
  clip: { x: 0, y: 0, width: 1280, height: 720 },
});

await browser.close();
console.log('Thumbnail rendered: claude-free-part2-thumbnail.png');
