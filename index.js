import scraper from "./src/scraper.js";
import speak from './src/tts.js';
import visual from './src/visual.js';

async function main() {
  speak('This is a test', 'en', '../../reddit-bot/assets/audio/test.mp3');
  let comments = await scraper.comments('AskReddit', 'zhp9r1', 'whats_a_womens_thing_men_should_absolutely_start')
  // console.log(comments[1].data.children);
  let img = await visual.capture_post('askreddit', 'zhg9fu', 'whats_your_controversial_food_opinion');
  await visual.close_browser();
}
//hello
console.log('hell world');
await main();