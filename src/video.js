import ffmpeg from "fluent-ffmpeg";
import fs from "fs";
import { numWords, wordsPerLine, numPosts } from "../index.js";
let index;
const randomMinute = Math.floor(Math.random() * 60);

async function getRandomMinute() {
  return new Promise((resolve, reject) => {
    ffmpeg()
      .input("./assets/output/input.mp4")
      .seekInput(`${randomMinute}:00`)
      .setDuration(60)
      .output("./assets/output/1.mp4")
      .on("end", () => resolve("./assets/output/1.mp4"))
      .on("error", (err) => reject(err))
      .run();
  });
}

const replaceAudio = async () => {
  return new Promise((resolve, reject) => {
    ffmpeg()
      .input("./assets/output/1.mp4")
      .input("./assets/audio/audio.mp3")
      .outputOptions([
        "-map 0:v:0",
        "-map 1:a:0",
        "-c:v copy",
        "-c:a aac",
        "-b:a 256k",
        "-strict experimental",
      ])
      .setDuration(55)
      .output("./assets/output/2.mp4")
      .on("end", () => resolve("./assets/output/2.mp4"))
      .on("error", (err) => reject(err))
      .run();
  });
};

async function setAspectRatio() {
  return new Promise((resolve, reject) => {
    ffmpeg()
      .input("./assets/output/2.mp4")
      .aspect("9:16")
      .output("./assets/output/3.mp4")
      .on("end", () => resolve("./assets/output/3.mp4"))
      .on("error", (err) => reject(err))
      .run();
  });
}

function addMultipleImagesToVideo(images, startTimes, endTimes) {
  let command = ffmpeg("./assets/output/3.mp4");
  let subCommand = [];
  for (let i = 0; i < images.length; i++) {
    command.input(`./${images[i]}`);
  }
  subCommand.push(
    `[0:v][1:v]overlay=360:30:enable='between(t,${startTimes[0]},${endTimes[0]})'[0]`
  );
  for (index = 0; index < images.length - 2; index++) {
    subCommand.push(
      `[${index}][${index + 2}:v]overlay=360:30:enable='between(t,${
        startTimes[index + 1]
      },${endTimes[index + 1]})'[${index + 1}]`
    );
  }
  if (images.length > 1) {
    subCommand.push(
      `[${index}][${index + 2}:v]overlay=360:30:enable='between(t,${
        startTimes[startTimes.length - 1]
      },${endTimes[endTimes.length - 1]})'`
    );
  }

  command
    .on("error", (err) => console.log(err.response))
    .complexFilter(subCommand)
    .outputOptions("-c:a copy")
    .output("./assets/output/video.mp4")
    .on("end", () => console.log("video editing done"))
    .run();
}

const createVideo = async () => {
  let prevEnd = 0;
  let length = 0;
  let startTimes = [];
  let endTimes = [];
  let inputImages = [];
  await getRandomMinute();
  await replaceAudio();
  await setAspectRatio();
  inputImages.push("./assets/images/title.jpg");
  startTimes.push(0);
  endTimes.push(Math.round((wordsPerLine[0] / 160) * 55));
  prevEnd = Math.round((wordsPerLine[0] / 160) * 55);

  for (let i = 0; i < wordsPerLine.length - 1; i++) {
    inputImages.push(`./assets/images/comment${i}.jpg`);
    length = Math.ceil((wordsPerLine[i + 1] / 160) * 55);
    startTimes.push(prevEnd);
    if (prevEnd + length < 55) {
      prevEnd += length;
      endTimes.push(prevEnd);
    }else{
      endTimes.push(55);
      break;
    }
  }
  console.log("images :" + inputImages);
  console.log("start :" + startTimes);
  console.log("end :" + endTimes);
  addMultipleImagesToVideo(inputImages, startTimes, endTimes);
};

export default createVideo;
