/*let speech = new SpeechSynthesisUtterance();

let voices = [];

let voiceSelect = document.querySelector("select");

window.speechSynthesis.onvoiceschanged = () => {
    voices = window.speechSynthesis.getVoices();
    speech.voice = voices[0];

    voices.forEach((voice, i) => (voiceSelect.options[i] = new Option(voice.name, i)));
};

voiceSelect.addEventListener("change", () => {
    speech.voice = voices[voiceSelect.value];
});





document.querySelector("button").addEventListener("click", () => {
    speech.text = document.querySelector("textarea").value;
    window.speechSynthesis.speak(speech);
});*/

let speech = new SpeechSynthesisUtterance();
let voices = [];
let voiceSelect = document.querySelector("select");

function populateVoiceList() {
    voices = window.speechSynthesis.getVoices();
    
    voiceSelect.innerHTML = ''; // Limpa o select

    voices.forEach((voice, i) => {
        let option = document.createElement('option');
        option.textContent = `${voice.name} (${voice.lang})`;
        option.value = i;
        voiceSelect.appendChild(option);
    });

    // Seleciona a primeira voz como padrão
    if (voices.length > 0) {
        speech.voice = voices[0];
    }
}

// Carrega as vozes
populateVoiceList();

// Ouve o evento voiceschanged para garantir que as vozes sejam carregadas
if (typeof speechSynthesis !== 'undefined' && speechSynthesis.onvoiceschanged !== undefined) {
    speechSynthesis.onvoiceschanged = populateVoiceList;
}

voiceSelect.addEventListener("change", () => {
    speech.voice = voices[voiceSelect.value];
});

document.querySelector("button").addEventListener("click", () => {
    speech.text = document.querySelector("textarea").value;
    window.speechSynthesis.speak(speech);
});


