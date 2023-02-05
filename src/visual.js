import puppeteer from "puppeteer";

async function capturePost(subreddit, postId, postTitle,numComments) {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto(
    `https://www.reddit.com/r/${subreddit}/comments/${postId}/${postTitle}/`
  );

  const title = await page.$(
    `#t3_${postId} > div > div:nth-child(3) > div > div > h1`
  );

  let { x, y, width, height } = await title.boundingBox();
  await page.screenshot({
    clip: {
      x,
      y,
      width,
      height,
    },
    path: "./assets/images/title.jpg",
  });

  let comments = await page.$$(`.${await page.$('.Comment').classList[4]}`);

  for (let i = 0; i < numComments; i++) {
    // let element = await page.$(
    //   `#t1_${comments[i]} > div:nth-child(2) > div:nth-child(4) > div:nth-child(3) > div > p`
    // );
    element = comments[i]
    let { x, y, width, height } = await element.boundingBox();
    setTimeout(async () => {
      await page.screenshot({
        clip: {
          x,
          y,
          width,
          height,
        },
        path: `./assets/images/${i}.jpg`,
      });
    }, 1000 * i);
  }
  await browser.close();
}
export default capturePost;

// await capture_post(
//   "askreddit",
//   "10udqhv",
//   "what_film_made_you_say_holy_shit_there_is_still",
//   []
// );
