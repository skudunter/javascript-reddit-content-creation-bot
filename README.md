# Reddit Scraping Bot
[![Build Status](https://travis-ci.org/joemccann/dillinger.svg?branch=master)](https://travis-ci.org/joemccann/dillinger)
## Description
A bot that scrapes Reddit posts and comments and relays them to YouTube (shorts) using text-to-speech.
Please note we have not included the pushing to youtube shorts because we dont want to violate any community guidelines

## Files
- captures.js: Gathers the visual elements (screenshots) from Reddit
- scraper.js: Collects useful data (posts, comments) from Reddit
- tts.js:Converts the text to speech using the google text to speech API

## Todo
- Setup subreddit scraping
- Capture the data visually for use with YouTube
- use text-to-speech to generate mp3 files for the data
- clip a background from a mp4 file
- figure out timings and use video editing to stitch together screenshots and sound
- upload to a youtube channel
## Usage
```sh
cd reddit-bot
npm i
```
You will need to download the google cloud console SDK,you can do that here
