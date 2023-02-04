import ffmpeg from "fluent-ffmpeg";

const replaceAudio = async (videoFile, audioFile, outputFile) => {
  return new Promise((resolve, reject) => {
    ffmpeg()
      .input(videoFile)
      .input(audioFile)
      .outputOptions([
        "-map 0:v:0",
        "-map 1:a:0",
        "-c:v copy",
        "-c:a aac",
        "-b:a 256k",
        "-strict experimental",
      ])
      .output(outputFile)
      .on("end", () => resolve(outputFile))
      .on("error", (err) => reject(err))
      .run();
    });
};
export default replaceAudio;
