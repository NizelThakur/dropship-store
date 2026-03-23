/**
 * Meesho Scraper
 * Uses Playwright to extract trending fashion products from Meesho.
 * Applies a 20% dropship margin for the storefront.
 */

const { chromium } = require('playwright-extra');
const stealth = require('puppeteer-extra-plugin-stealth')();
const fs = require('fs');
const path = require('path');

chromium.use(stealth);

async function scrapeMeesho(categoryUrl) {
  const sessionPath = path.join(__dirname, 'meesho_session.json');
  const launchOptions = { headless: true };
  const contextOptions = {
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36'
  };

  if (fs.existsSync(sessionPath)) {
    console.log('[Scraper] Using saved session state.');
    contextOptions.storageState = sessionPath;
  }

  const browser = await chromium.launch(launchOptions);
  const context = await browser.newContext(contextOptions);
  const page = await context.newPage();

  console.log(`[Scraper] Navigating to: ${categoryUrl}`);
  
  try {
    await page.goto(categoryUrl, { waitUntil: 'networkidle', timeout: 60000 });
    
    // Diagnostic
    const title = await page.title();
    console.log(`[Scraper] Page Title: ${title}`);
    await page.screenshot({ path: path.join(__dirname, 'debug_meesho.png') });
    console.log(`[Scraper] Debug screenshot saved to ${path.join(__dirname, 'debug_meesho.png')}`);

    const content = await page.content();
    console.log(`[Scraper] Content snippet: ${content.substring(0, 500)}`);
    await page.evaluate(async () => {
      await new Promise((resolve) => {
        let totalHeight = 0;
        let distance = 100;
        let timer = setInterval(() => {
          let scrollHeight = document.body.scrollHeight;
          window.scrollBy(0, distance);
          totalHeight += distance;
          if (totalHeight >= scrollHeight || totalHeight > 5000) {
            clearInterval(timer);
            resolve();
          }
        }, 100);
      });
    });

    const products = await page.evaluate(() => {
      const items = [];
      // More generic selectors for Meesho product cards
      const cards = document.querySelectorAll('div[class*="ProductList__GridCol"], a[href*="/p/"]');
      
      console.log(`Found ${cards.length} potential cards`);

      cards.forEach(card => {
        let titleNode = card.querySelector('p[class*="ProductTitle"]');
        if (!titleNode) titleNode = card.querySelector('p');
        
        let priceNode = card.querySelector('h5[class*="Price"]');
        if (!priceNode) priceNode = card.querySelector('h5') || card.querySelector('p[class*="Price"]');
        
        let imgNode = card.querySelector('img');
        let linkNode = card.tagName === 'A' ? card : card.querySelector('a[href*="/p/"]');

        const title = titleNode?.innerText;
        const priceText = priceNode?.innerText;
        const image = imgNode?.src;
        const url = linkNode?.href;
        
        if (title && priceText && image && url) {
          const meeshoPrice = parseInt(priceText.replace(/[^0-9]/g, '')) || 0;
          const sellingPrice = Math.round(meeshoPrice * 1.20);
          
          items.push({
            id: url.split('/').pop().split('?')[0],
            name: title,
            meeshoPrice,
            price: sellingPrice,
            image,
            url
          });
        }
      });
      return items;
    });

    console.log(`[Scraper] Found ${products.length} products.`);
    
    // Save to data directory
    const dataPath = path.join(__dirname, '../src/data/products.json');
    if (!fs.existsSync(path.dirname(dataPath))) {
      fs.mkdirSync(path.dirname(dataPath), { recursive: true });
    }
    
    fs.writeFileSync(dataPath, JSON.stringify(products, null, 2));
    console.log(`[Scraper] Data saved to ${dataPath}`);

  } catch (error) {
    console.error(`[Scraper] Error: ${error.message}`);
  } finally {
    await browser.close();
  }
}

// Example usage: Trending Search
const trendingUrl = 'https://www.meesho.com/search?q=trending%20fashion%20western';
scrapeMeesho(trendingUrl);
