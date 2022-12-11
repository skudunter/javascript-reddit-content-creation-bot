import scraper from "./src/scraper.js";
import speak from "./src/tts.js";
//import visual from "./src/visual.js";
import colors from "colors";
import readline from "readline";
import { read } from "fs";
import getRandomPost from './src/utils.js'
import fs from "fs";

let getSubredditNameInterface = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

console.clear();
console.log('please use responsibly'.bold);
console.log('');
console.log("(╯°□°）╯︵ ┻━┻".rainbow);
console.log('');

getSubredditNameInterface.question(
  "Select which subreddit you will use:".yellow,
  async(subreddit) => {
      await main(subreddit);
  }
);

async function main(subreddit) {
  console.clear();
  let posts  = await scraper.posts(subreddit);
  let post =  getRandomPost(posts);
  let comments = await scraper.comments(
    subreddit,
    post.id
  );
  fs.writeFileSync('output.txt', '', function(){console.log('done')})

  fs.appendFileSync("output.txt",'title: '+post.title+'\n', (err) => {
    if (err) console.log(err);
    else {
      console.log("title written successfully\n");
    }
  });

  for (let i = 0; i < comments[1].data.children.length-1; i++) {
    fs.appendFileSync("output.txt",comments[1].data.children[i].data.body+'\n', (err) => {
      if (err) console.log(err);
      else {
        console.log("File written successfully\n");
      }
    });
  }
  // let img = await visual.capture_post('askreddit', 'zhg9fu', 'whats_your_controversial_food_opinion');
  // await visual.close_browser();
}

