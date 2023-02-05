import { writeFile as _writeFile } from "fs";
import { promisify } from "util";
import { TextToSpeechClient } from "@google-cloud/text-to-speech";
async function speak(text) {
  const client = new TextToSpeechClient();
  const request = {
    input: { text: text },
    voice: {
      languageCode: "en-US",
      ssmlGender: "MALE",
      voiceName: "en-US-Neural2-A",
    },
    audioConfig: { audioEncoding: "MP3" },
  };
  const [response] = await client.synthesizeSpeech(request);
  const writeFile = promisify(_writeFile);
  await writeFile("./assets/audio/output.mp3", response.audioContent, "binary");
}
export default speak;
