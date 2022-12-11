import fetch from "node-fetch";
import fs from "fs";

// URL of the askreddit subreddit
const url = "https://www.reddit.com/r/askreddit.json";

// Function to scrape the text from the subreddit
async function scrape() {
  try {
    // Make a GET request to the URL
    const res = await fetch(url);

    // Convert the response to JSON
    const data = await res.json();

    // Get the list of posts from the JSON data
    const posts = data.data.children;

    // Initialize an empty string to store the text
    let text = "";

    // Loop through the posts and append the text to the string
    for (let i = 0; i < posts.length; i++) {
      text += posts[i].data.title + "\n";
      text += posts[i].data.selftext + "\n";
    }

    // Write the text to a file
    fs.writeFileSync("askreddit.txt", text);
    console.log("Text successfully saved to file!");
  } catch (err) {
    console.error(err);
  }
}

// Call the function to start scraping
scrape();
