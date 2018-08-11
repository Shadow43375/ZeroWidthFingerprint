function zeroPad(num) {
  return '00000000'.slice(num.length) + num
}

function textToBinary(plainText) {
  return plainText.split('').map(function(character) {
    return zeroPad(character.charCodeAt(0).toString(2))
  }).join(' ')
}

function binaryToSpaces(binary) {
  return binary.split('').map(function(binaryCharacter) {
    let bit = parseInt(binaryCharacter, 10)
    if(bit === 1) {
      return '​' // zero-width space
    }
    else if(bit === 0) {
      return '‌' // zero-width non-joiner
    }
    else {
      return '‍' // zero-width joiner
    }
  }).join('﻿') // zero-width no-break space
}

function zeroWidthToBinary(cipherText) {
  return cipherText.split('﻿').map(function(spaceCharacter){
    if(spaceCharacter === '​') {
      return "1"
    }
    else if(spaceCharacter === '‌') {
      return "0"
    }
    else {
      return " "
    }
  }).join('')
}

function binaryToText(binary) {
  return binary.split(" ").map(function(binaryCharacter){
    return String.fromCharCode(parseInt(binaryCharacter, 2));
  }).join('')
}

function isolateHiddenText() {

}

modeToggle = document.getElementById('modeToggle')
state = modeToggle.value;
enterButton = document.getElementById('enterButton')
textInput = document.getElementById('textInput');
distractionTextInput = document.getElementById('distractionTextInput')
console.log(distractionTextInput);
cipherTextOutput = document.getElementById('cipherTextOutput')
plainTextOutput = document.getElementById('plainTextOutput')


modeToggle.addEventListener('click', function(){
  cipherTextOutput.value = ""
  distractionTextInput.value = ""
  textInput.value = ""
  if(state==="encode") {
    textInput.placeholder = "info to be deciphered"
    distractionTextInput.placeholder = "uncovered info"
    cipherTextOutput.style.visibility = "hidden";
    state = "decode";
  }
  else if(state ==="decode") {
    textInput.placeholder = "info to be hidden"
    distractionTextInput.placeholder = "distraction text"
    cipherTextOutput.style.visibility = "visible";
    state = "encode";
  }
  console.log(state);
})

enterButton.addEventListener('click', function(){
  if(state==="encode") {
    let plainText =   textInput.value
    let distractionText = distractionTextInput.value
    textInput.value = ""
    distractionTextInput.value = ""
    let binary = textToBinary(plainText);
    let cipherText = binaryToSpaces(binary);
    cipherTextOutput.value = cipherText + distractionText;
  }
  else if(state==="decode") {
    let cipherText = textInput.value
    let re = /[\u200C\uFEFF\u200B\u200D]/gi;
    cipherText = cipherText.match(re).join('');
    textInput.value = "";
    distractionTextInput.value = binaryToText(zeroWidthToBinary(cipherText));
  }

})