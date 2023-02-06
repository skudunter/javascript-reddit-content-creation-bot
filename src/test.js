import puppeteer from 'puppeteer';

puppeteer.launch().then(async browser => {
    const page = await browser.newPage();

    let boxes2 = [];

    const getData = async () => {
        return await page.evaluate(async () => {
            return await new Promise(resolve => {
                resolve([1, 2, 3]);
            })
        })
    }

    boxes2 = await getData();
    console.log(boxes2)

    await browser.close();
});