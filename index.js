let wordsPerLine;
let numWords;
let numPosts = 0;
import scraper from "./src/scraper.js";
import speak from "./src/tts.js";
import capturePost from "./src/visual.js";
import colors from "colors";
import readline from "readline";
import utils from "./src/utils.js";
import fs from "fs";
import createVideo from "./src/video.js";



let getSubredditNameInterface = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

console.clear();

getSubredditNameInterface.question(
  "Select which subreddit you will use:".green,
  async (subreddit) => {
    getSubredditNameInterface.close();
    await main('askreddit');
  }
);

async function main(subreddit) {
  console.clear();
  let text = "";
  numWords = 0;
  let subtext = "";
  let posts = await scraper.posts(subreddit);
  let post = utils.getRandomPost(posts);
  let comments = await scraper.comments(subreddit, post.id);
  let commentsId = [];
  wordsPerLine = [];

  fs.writeFile("output.txt", "", (err) => {});

  fs.appendFileSync("output.txt", "title: " + post.title + "\n", (err) => {});
  text = post.title;
  wordsPerLine.push(utils.countWords(post.title));
  if (post.description) {
    fs.appendFileSync("output.txt", post.description + "\n", (err) => {});
    text += post.selftext;
    wordsPerLine.push(utils.countWords(post.selftext));
  }

  for (let i = 0; i < comments[1].data.children.length - 1; i++) {
    subtext = utils.parseString(comments[1].data.children[i].data.body);
    if (subtext[subtext.length] !== ".") {
      subtext += ".";
    }
    numPosts ++;
    numWords = utils.countWords(text);
    if (numWords > 160) {
      break;
    }
    text += subtext;
    numWords = utils.countWords(text);
    wordsPerLine.push(utils.countWords(subtext));
    fs.appendFileSync("output.txt", subtext + "\n", (err) => {});
    commentsId.push(comments[1].data.children[i].data.id);
  }
  console.log('post parsing done')
  await speak(text);
  await capturePost(subreddit, post.id, post.title, commentsId.length, 0);
  setTimeout(createVideo,40000) 
}
export { wordsPerLine, numWords,numPosts };
