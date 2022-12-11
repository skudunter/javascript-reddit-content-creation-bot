import fetch from "node-fetch";
export default {
  async posts(subreddit, filter = "") {
    let response = fetch(`https://www.reddit.com/r/${subreddit}/${filter}.json`);
    response = await response.json();
    return response;
  },
  async comments(subreddit, id, name) {
    let response = await fetch(`https://www.reddit.com/r/${subreddit}/comments/${id}/${name}/.json`)
    response = await response.json();
    return response;
  },
};
