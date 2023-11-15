const { chromium } = require("playwright");

(async () => {
  let browser;
  try {
    // Launch browser
    browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();

    // Navigate to your app and wait for the network to be idle
    await page.goto("http://localhost:3000", { waitUntil: "networkidle" });

    // Wait for the search term input element to be loaded
    await page.waitForSelector('input[placeholder="Enter search term"]', {
      state: "visible",
    });

    // Test with valid input
    await page.fill('input[placeholder="Enter search term"]', "validSearchTerm");
    await page.click("text=Search");
    // Check for some condition that indicates successful submission
    // Adjust the below line according to your app's behavior
    await page.waitForSelector('input[placeholder="Enter search term"]:has-text("")');

    console.log("Valid input test passed successfully");


  } catch (error) {
    console.error("Test failed:", error.message);
    process.exit(1);
  } finally {
    // Close browser if it was opened
    if (browser) {
      await browser.close();
    }
  }
})();
