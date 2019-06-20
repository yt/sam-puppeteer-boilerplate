const chromium = require('chrome-aws-lambda');
const puppeteer = require('puppeteer-core');

const helper = require('/opt/helper.js');

exports.lambdaHandler = async (event, context) => {
    let result = null;
    let browser = null;

    try {
        browser = await puppeteer.launch({
            args: chromium.args,
            defaultViewport: chromium.defaultViewport,
            executablePath: await chromium.executablePath,
            headless: chromium.headless,
        });
        let page = await browser.newPage();
        
        await page.goto(event.link);

        helper.someFunction();
        
        result = await page.title();
    } catch (error) {
        console.log(error);
        result = error;
    } finally {
        if (browser !== null) {
            await browser.close();
        }
    }
    return context.succeed(result);
};