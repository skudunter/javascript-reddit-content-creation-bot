import tts from 'gtts';
const speak = (text, lang, filename) => {
    let gtts = new tts(text, lang);
    gtts.save(`../assets/audio/${filename}`, err => {
        if (err) throw err;
    });
}
export default speak;