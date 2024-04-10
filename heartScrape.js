const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
  const browser = await puppeteer.launch({ headless: 'new', defaultViewport: false });
  const page = await browser.newPage();
  await page.goto('https://hearttoheartspaces.com/blog/');

  // List of links
  const links = await page.evaluate(() =>
    Array.from(document.querySelectorAll('.sd-entry-title a'), (e) => e.href)
  );

  // Run through each page and scrape.
  const data = [];
  for (const link of links) {
    console.log('Navigating to:', link);
    try {
      await page.goto(link, { waitUntil: 'networkidle0' });

      // Scrape from current page
      const pageData = await page.evaluate(() => {
        const imageElement = document.querySelector('.sd-entry-thumb img');
        const titleElement = document.querySelector('div .sd-entry-wrapper.clearfix > header > h2');
        const contentElements = document.querySelectorAll('.sd-entry-content p');
        const content = Array.from(contentElements).map((e) => e.innerText);

        return {
          image: imageElement?.getAttribute('src') ?? null,
          title: titleElement?.innerText ?? null,
          content: content,
        };
      });

      data.push(pageData);
    } catch (error) {
      console.error(`Error scraping data from ${link}:`, error);
    }

    // Ensures enough time passes before moving onto the next link
    await new Promise((resolve) => setTimeout(resolve, 2000));
  }

  console.log(data);

  //Save data to a JSON file
  fs.writeFile('articles.json', JSON.stringify(data), (error) => {
    if (error) throw error;
    console.log('File saved');
  })
  await browser.close();
})();
