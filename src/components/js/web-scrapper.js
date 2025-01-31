import puppeteer from "puppeteer";

const getQuotes = async () => {
  // Start a Puppeteer session with:
  // - a visible browser (`headless: false` - easier to debug because you'll see the browser in action)
  // - no default viewport (`defaultViewport: null` - website page will in full width and height)
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
  });

  // Open a new page
  const page = await browser.newPage();

  // On this new page:
  // - open the "http://quotes.toscrape.com/" website
  // - wait until the dom content is loaded (HTML is ready)
  await page.goto("http://quotes.toscrape.com/", {
    waitUntil: "domcontentloaded",
  });

  // Get page data
  const quotes = await page.evaluate(() => {
    const quoteElements = document.querySelectorAll(".quote");
    let arr = Array.from(quoteElements).map(el => {
      const text = el.querySelector(".text").innerText;
      const author = el.querySelector(".author").innerText;
      return { text, author };
    });
  });

  // Display the quotes
  console.log(quotes);

  // Close the browser
//   await browser.close();
};

// Start the scraping
getQuotes();