/**
 * Order Fulfillment Driver
 * Automates the purchase process on Meesho.
 */

const { chromium } = require('playwright-extra');
const stealth = require('playwright-stealth')();
const path = require('path');
const fs = require('fs');

chromium.use(stealth);

async function fulfillOrder(orderData) {
  console.log(`[Fulfillment] Processing order for: ${orderData.name}`);
  
  const sessionPath = path.join(__dirname, 'meesho_session.json');
  const launchOptions = { headless: false }; // Visible for confirmation
  const contextOptions = {};

  if (fs.existsSync(sessionPath)) {
    contextOptions.storageState = sessionPath;
  }

  const browser = await chromium.launch(launchOptions);
  const context = await browser.newContext(contextOptions);
  const page = await context.newPage();

  try {
    console.log(`[Fulfillment] Navigating to product: ${orderData.items[0].url}`);
    await page.goto(orderData.items[0].url, { waitUntil: 'networkidle' });
    
    // 2. Select Size (if needed)
    const sizes = await page.$$('button[class*="SizeButton"]');
    if (sizes.length > 0) {
      await sizes[0].click();
    }
    
    // 3. Buy Now
    await page.click('button:has-text("Buy Now")');
    
    // 4. Handle Login (Wait for user if needed)
    console.log('[Fulfillment] Waiting for manual login/OTP if required...');
    await page.waitForSelector('input[placeholder*="Phone"]', { timeout: 5000 }).catch(() => null);
    
    // Here we would ideally pause or ask for OTP
    // For this implementation, we assume the session is saved or user handles OTP
    
    // 5. Enter Delivery Address
    console.log(`[Fulfillment] Entering address for ${orderData.customerName}`);
    // Selectors would be filled here based on the browser scouting
    
  } catch (error) {
    console.error(`[Fulfillment] Error: ${error.message}`);
  } finally {
    // Keep browser open for confirmation in this automated-assisted mode
    // await browser.close();
  }
}

// Example usage
/*
fulfillOrder({
  id: 'ORD-123',
  productUrl: 'https://www.meesho.com/p/...',
  customerName: 'John Doe',
  address: '123 Main St, New York'
});
*/
