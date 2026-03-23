/**
 * Session Capture tool
 * Opens a browser for the user to log in and solve challenges.
 * Saves the authenticated session to be used by the scraper.
 */

const { chromium } = require('playwright-extra');
const stealth = require('puppeteer-extra-plugin-stealth')();
const path = require('path');

chromium.use(stealth);

async function captureSession() {
  console.log('[Session] Opening browser for manual login...');
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto('https://www.meesho.com/');
  
  console.log('--------------------------------------------------');
  console.log('ACTION REQUIRED:');
  console.log('1. Log in to your Meesho account in the browser.');
  console.log('2. Solve any CAPTCHAs if they appear.');
  console.log('3. Once you see the homepage, leave the browser open.');
  console.log('4. The script will save your session automatically after 60 seconds.');
  console.log('--------------------------------------------------');

  await new Promise(resolve => setTimeout(resolve, 60000));

  const sessionPath = path.join(__dirname, 'meesho_session.json');
  await context.storageState({ path: sessionPath });
  
  console.log(`[Session] Authentication state saved to ${sessionPath}`);
  await browser.close();
}

captureSession();
