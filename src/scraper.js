import fetch from "node-fetch";
export default {
  async posts(subreddit, filter = "") {
    let response = await fetch(`https://www.reddit.com/r/${subreddit}/${filter}.json`);
    response = await response.json();
    return response;
  },
  async comments(subreddit, id) {
    let response = await fetch(`https://www.reddit.com/r/${subreddit}/comments/${id}/anything/.json`)
    response = await response.json();
    return response;
  },
};
