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
- Setup algorithm for length of words < 186
- Setup parseing to include comments on comments.
- clip a background from a mp4 file as long as the mp3 file.
- Gradually add text to the mp4 file insync with the sound.
- upload to a youtube channel
## Usage
```sh
cd reddit-bot
npm i
```
You will need to download the google cloud console SDK,you can do that here
