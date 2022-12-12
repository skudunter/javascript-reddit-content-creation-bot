import scraper from "./src/scraper.js";
import speak from "./src/tts.js";
//import visual from "./src/visual.js";
import colors from "colors";
import readline from "readline";
import getRandomPost from "./src/utils.js";
import fs from "fs";

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
  let text = '';
  let posts = await scraper.posts(subreddit);
  let post = getRandomPost(posts);
  let comments = await scraper.comments(subreddit, post.id);
  fs.writeFileSync("output.txt", "", function () {});
  
  fs.appendFileSync("output.txt", "title: " + post.title + "\n", (err) => {});
  text = post.title;
  fs.appendFileSync("output.txt",post.description + '\n', (err) => {});
  text += post.selftext;
  for (let i = 0; i < comments[1].data.children.length - 1; i++) {
    text += comments[1].data.children[i].data.body;
    fs.appendFileSync(
      "output.txt",
      comments[1].data.children[i].data.body + "\n",
      (err) => {}
    );
    if(i > 10){
      break;
    }
  }
  await speak(text);
  // let img = await visual.capture_post('askreddit', 'zhg9fu', 'whats_your_controversial_food_opinion');
  // await visual.close_browser();
}

