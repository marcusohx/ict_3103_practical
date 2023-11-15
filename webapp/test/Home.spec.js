const { chromium } = require("playwright");

(async () => {
  let browser;
  try {
    // Launch browser
    browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();

    // Navigate to your app and wait for the network to be idle
    await page.goto("http://localhost:3000", { waitUntil: "networkidle" });

    // Test with valid input
    await page.fill('input[placeholder="Enter search term"]', "validSearchTerm");
    await page.click("text=Search");
    // Replace '/result?term=validSearchTerm' with the actual URL you expect to navigate to
    await page.waitForURL(`/result?term=validSearchTerm`);

    console.log("Valid input test passed successfully");

    // Test with invalid input (e.g., SQL injection attempt)
    await page.fill('input[placeholder="Enter search term"]', "SELECT * FROM users");
    await page.click("text=Search");
    // Check if the input field is cleared and alert is shown
    await page.waitForSelector('input[placeholder="Enter search term"]:has-text("")');
    const alertMessage = await page.waitForEvent('dialog');
    if (alertMessage.message() !== "Invalid input detected.") {
      throw new Error("Invalid input alert message not correct");
    }
    await alertMessage.dismiss();

    console.log("Invalid input test passed successfully");

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
