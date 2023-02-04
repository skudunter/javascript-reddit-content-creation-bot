import scraper from "./src/scraper.js";
import speak from "./src/tts.js";
import visual from "./src/visual.js";
import colors from "colors";
import readline from "readline";
import utils from "./src/utils.js";
import fs from "fs";
import replaceAudio from "./src/video.js";

let getSubredditNameInterface = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

console.clear();
console.log("please use responsibly".bold);
console.log("");
console.log("(╯°□°）╯︵ ┻━┻".rainbow);
console.log("");

getSubredditNameInterface.question(
  "Select which subreddit you will use:".yellow,
  async (subreddit) => {
    getSubredditNameInterface.close();
    await main(subreddit);
    console.log("written to file succesfully".green);
  }
);

async function main(subreddit) {
  console.clear();
  let text = "";
  let numWords = 0;
  let subtext = "";
  let posts = await scraper.posts(subreddit);
  let post = utils.getRandomPost(posts);
  let comments = await scraper.comments(subreddit, post.id);

  fs.appendFileSync("output.txt", "title: " + post.title + "\n", (err) => {});
  text = post.title;

  if (post.description) {
    fs.appendFileSync("output.txt", post.description + "\n", (err) => {});
    text += post.selftext;
  }
  numWords = utils.countWords(text);
  for (let i = 0; i < comments[1].data.children.length - 1; i++) {
    subtext = utils.parseString(comments[1].data.children[i].data.body);
    if (subtext[subtext.length] !== ".") {
      subtext += ".";
    }
    text += subtext;
    numWords = utils.countWords(text);
    fs.appendFileSync("output.txt", subtext + "\n", (err) => {});
    if (numWords > 183) {
      break;
    }
  }
  //await speak(text);
  await visual.capture_post(subreddit, post.id, post.title);
  await visual.close_browser();
}
