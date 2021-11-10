const puppeteer = require("puppeteer");

const login = async (browser, loginUrl, loginData) => {
  const page = await browser.newPage();
  await page.goto(loginUrl);
  await page.waitForTimeout(10000);
  await page.keyboard.type(loginData.email);
  await page.keyboard.press("Tab");
  await page.keyboard.type(loginData.password);
  await page.waitForTimeout(1000);
  await page.keyboard.press("Enter");
  await page.waitForTimeout(10000);
  console.log(new Date().toISOString(),' --- logged in');
  return;
};

const generatePDF = async (browser, urlDescriptor, requestToWaitFor) => {
  const page = await browser.newPage();

  for (
    let index = urlDescriptor.startPage;
    index <= urlDescriptor.endPage; 
    index++
  ) {
    if (index === urlDescriptor.startPage) {
      await page.goto(
        urlDescriptor.base.replace(urlDescriptor.pageIndicator, index)
      );
      console.log(new Date().toISOString(),' --- opened page with book');
    } else {
      page.$$eval(
        "i.svg-icon-arrow.svg-icon-arrow_right.pointer.footer-page-navigation",
        (buttons) => buttons.forEach((button) => button.click())
      );
      console.log(new Date().toISOString(),' --- clicked next page');
    }

    await page.waitForRequest(
      (request) =>
        request.url().startsWith(requestToWaitFor.urlStartsWith) &&
        request.method() === requestToWaitFor.method,
      { timeout: 20000 }
    );
    const pdfConfig = {
      path: `page-${index}.pdf`, // Saves pdf to disk.
      format: "A4",
      printBackground: true,
    };
    await page.emulateMediaType("print");
    const pdf = await page.pdf(pdfConfig); // Return the pdf buffer. Useful for saving the file not to disk.
    console.log(new Date().toISOString(),' --- downloaded pdf');
  }
};

(async () => {
  const loginUrl = "https://app.edubase.ch/#promo?popup=login";
  const loginData = {
    email: "changethat",
    password: "changethat",
  };
  const urlDescriptor = {
    base: "changethat/${page}", // example "https://app.edubase.ch/#doc/58775/${page}";
    pageIndicator: "${page}",
    startPage: 1, // start page
    endPage: 68, // end page
  };
  const requestToWaitForBeforeGeneratingPDF = {
    urlStartsWith: "https://reader.edubase.ch/lookup/srv/d4.2/statistics/info",
    method: "GET",
  };

  const browser = await puppeteer.launch({ headless: true }); // Puppeteer can only generate pdf in headless mode.
  await login(browser, loginUrl, loginData);
  await generatePDF(
    browser,
    urlDescriptor,
    requestToWaitForBeforeGeneratingPDF
  );
  await browser.close();
})();
