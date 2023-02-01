import ffmpeg from 'fluent-ffmpeg';

const joinFiles = async (audioFile, videoFile, outputFile) => {
  return new Promise((resolve, reject) => {
    ffmpeg()
      .input(audioFile)
      .input(videoFile)
      .output(outputFile)
      .on('end', () => resolve(outputFile))
      .on('error', (err) => reject(err))
      .run();
  });
};

joinFiles('./assets/audio/output.mp3', './assets/output/output.mp4', './assets/output/output.mp4')
  .then(console.log)
  .catch(console.error);