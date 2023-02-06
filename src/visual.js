import puppeteer from "puppeteer";
import fs from 'fs';

/**
 * Captures a post and its comments.
 * 
 * @param {String} subreddit The subreddit to capture posts from
 * @param {String} postId The t3 ID of the desired post
 * @param {String} postTitle The post's title
 * @param {number} mainCommentCount The amount of main comments to be captured
 * @param {number} subCommentCount  The amount of sub-comments to be captured
 */
async function capturePost(subreddit, postId, postTitle, mainCommentCount, subCommentCount) {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto(
    `https://www.reddit.com/r/${subreddit}/comments/${postId}/${postTitle}/`
  );
  let getComments = async () => {
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

    const fetchComments = async (mainCommentCount, subCommentCount) => {
      return await page.evaluate(async (mainCommentCount, subCommentCount) => {
        document.querySelector('header').style.display = 'none';
        let comments = [];
        let mainComments = document.querySelectorAll(`.${document.querySelector('.Comment').classList[4]}`);
        let mainCount = Math.min(mainComments.length, mainCommentCount); // mainCommentCount cannot be higher than amount of main comments in DOM
        if (mainCount == 0) return [];
        let allComments = Array.from(document.querySelectorAll('.Comment'));
        for (i = 0; i < mainCount - 1; i++) {
          let subComments = [];
          let mainComment = mainComments[i];
          let startIndex = allComments.indexOf(mainComment) + 1;
          let endIndex = allComments.indexOf(mainComments[i + 1]) - 1;
          let diff = Math.min(endIndex - startIndex, subCommentCount);
          for (let cIndex = startIndex; cIndex < startIndex + diff; cIndex++) {
            subComments.push(allComments[cIndex].parentNode.id);
          };
          comments.push({
            main: mainComment.parentNode.id,
            sub: subComments
          });
        };
        let lastMainComment = mainComments[mainCount - 1];
        let startIndex = allComments.indexOf(lastMainComment) + 1;
        let lastSubComments = [];
        let lastSubCommentCount = 0;
        for (let cIndex = startIndex; cIndex < allComments.count; cIndex++) {
          let subComment = allComments[cIndex];
          if (subComment.classList.length > 4) break;
          if (lastSubCommentCount > subCommentCount) break;
          lastSubComments.push(subComment.parentNode.id);
          lastSubCommentCount++;
        }
        comments.push({
          main: lastMainComment.parentNode.id,
          sub: lastSubComments
        });
        console.log(comments);
        return await new Promise(res => {
          res(comments);
        })
      }, mainCommentCount, subCommentCount);
    };
    let comments;
    setTimeout(async () => { comments = await fetchComments(mainCommentCount, subCommentCount) }, 5000);
    return new Promise(resolve => {
      setTimeout(async () => {
        resolve(comments)
      }, 5500);
    })
  };
  getComments().then(async comments => {
    await page.waitForTimeout(2000);
    for (let i = 0; i < comments.length; i++) {
      let comment = comments[i];
      fs.mkdir(`./assets/images/comments/${comment.main}`, err => {
        if (err) throw err;
      });
      let main = await page.$('#' + comment.main);
      await page.evaluate(id => {
        let element = document.querySelector(`#${id}`);
        element.focus();
        element.scrollIntoView();
      }, comment.main);
      await page.screenshot({
        path: `./assets/images/comments/${comment.main}/test.jpg`
      });
      await main.screenshot({
        path: `./assets/images/comments/${comment.main}/main.jpg`
      });
      fs.rm(`./assets/images/comments/${comment.main}/test.jpg`, err => {
        if (err) throw err;
      });
      for (let [index, subcomment] of comment.sub.entries()) {
        let sub = await page.$('#' + subcomment);
        await page.evaluate(id => {
          let element = document.querySelector(`#${id}`);
          element.focus();
          element.scrollIntoView();
        }, subcomment);
        await page.screenshot({
          path: `./assets/images/comments/${comment.main}/$test.jpg`
        });
        await sub.screenshot({
          path: `./assets/images/comments/${comment.main}/${index}.jpg`
        });
        fs.rm(`./assets/images/comments/${comment.main}/$test.jpg`, err => {
          if (err) throw err;
        })
      }
    };
    await browser.close();
  });
}
export default capturePost;