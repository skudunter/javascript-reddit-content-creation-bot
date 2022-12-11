import puppeteer from 'puppeteer';
const browser = await puppeteer.launch({ headless: false });

export default {
    async capture_post(subreddit, id, name) {
        let page = await browser.newPage();
        await page.goto(`https://www.reddit.com/r/${subreddit}/comments/${id}/${name}`);
        await page.waitForSelector(`#USER_DROPDOWN_ID`);
        let post = await page.$(`#t3_${id}`);

        await page.evaluate(id => {
            let formatPost = id => {
                document.querySelector('#USER_DROPDOWN_ID').click();
                let question = document.querySelector(`#t3_${id}`);
                let options = question.children[0].children[4];
                for (i = 1; i < options.children[0].childElementCount; i++) {
                    options.children[0].children[i].style.display = 'none';
                };
                document.querySelector('[role=switch]').click();
                options.children[3].style.display = 'none';
                question.children[0].children[1].children[1].style.display = 'none';
            };
            formatPost(id)
        }, id);
        let base64 = await post.screenshot({ encoding: 'base64' });
        return base64;
    },
    async capture_comment() {

    },
    async close_browser() {
        await browser.close();
    }
}