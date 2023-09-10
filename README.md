# Reddit Scraping And Content Creation Bot
[![Build Status](https://travis-ci.org/joemccann/dillinger.svg?branch=master)](https://travis-ci.org/joemccann/dillinger)
## Description
A bot that scrapes Reddit posts and comments and relays them to YouTube (shorts) using text-to-speech.
Please note we have not included the pushing to youtube shorts because we dont want to violate any community guidelines.
I got the inspiration for this project from 

## Usage
```
cd reddit-bot
npm i
npm start
```
You will need to download the google cloud console SDK to create a application.json file that you need to use the tts google api.   
The project uses ffmpeg to do the video and audio editing,you will need to download ffmpeg.   
You will also need to set the ffmpeg binary as a default path variable.   
You will also need to add your reddit password and username to visual.js to allow reddit to sreenshot NSFW posts.


## Files
- visual.js: Gathers the visual elements (screenshots) from Reddit
- scraper.js: Collects useful data (posts, comments) from Reddit
- video.js: Creates the video from the screenshots,mp4 video and mp3 auido file using ffmpeg.
- utils.js: provides utility functions for this project.
- tts.js:Converts the text to speech using the google text to speech API
 ## NOTE
 This is my first project of this scale,the aim for this project was not monetary gain but to challenge myself and learn to code better.
 (The code is also quite verbose and ineffiecient at places)
 Enjoy!!
 (Sometimes it just does not work,sorry)

