
export default function readText(text, options) {
    if ('speechSynthesis' in window) {
        console.log('speechSynthesis is available');
        const msg = new SpeechSynthesisUtterance();
        const voices = window.speechSynthesis.getVoices();
        msg.voice = voices[2];
        msg.volume = 1; // From 0 to 1
        msg.rate = 1; // From 0.1 to 10
        msg.pitch = 1; // From 0 to 2
        msg.lang = 'en';
        msg.text = text;
        return window.speechSynthesis.speak(msg);
    } else {
        alert("Sorry, your browser doesn't support text to speech!");
    }
};
