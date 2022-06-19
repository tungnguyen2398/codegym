let height = 6;
let width = 5;

let row = 0;
let col = 0;

let gameOver = false;
let keys = [
  "Q",
  "W",
  "E",
  "R",
  "T",
  "Y",
  "U",
  "I",
  "O",
  "P",
  "A",
  "S",
  "D",
  "F",
  "G",
  "H",
  "J",
  "K",
  "L",
  "ENTER",
  "Z",
  "X",
  "C",
  "V",
  "B",
  "N",
  "M",
  "«",
];

let guessChance = 6;


let keyboard = document.getElementById("keyboard");

keyboard.classList.add("keyboard-row");
let words = dictionary.concat(word);

// chọn từ random
function randomWord() {
  let random = Math.floor(Math.random() * words.length);
  return words[random];
}

let lowerCaseWordRandom = randomWord();
let wordGuess = lowerCaseWordRandom.toUpperCase();
let wordInArray = wordGuess.split("");

console.log(wordGuess); // string
// console.log(wordInArray); // array

window.onload = function () {
  generateSquare();
};

let generateSquare = () => {
  // tạo ô
  for (let r = 0; r < height; r++) {
    for (let c = 0; c < width; c++) {
      let tile = document.createElement("span"); // tạo thẻ span
      tile.id = r + "-" + c; // set giá trị id cho tile bằng r và c
      tile.classList.add("tile"); // tạo class tile
      tile.innerText = ""; // set giá trị bằng rỗng
      document.getElementById("board").appendChild(tile); // thêm thẻ con tile vào thẻ có id board
    }
  }
};

keys.forEach((key) => {
  let buttonElement = document.createElement("button");
  buttonElement.textContent = key;

  if (key === "ENTER") {
    buttonElement.setAttribute("id", "enter");
  } else if (key === "«") {
    buttonElement.setAttribute("id", "backspace");
  } else {
    buttonElement.setAttribute("id", key);
  }

  if (key === "ENTER") {
    buttonElement.classList.add("enter-key-tile");
  } else {
    buttonElement.classList.add("key-tile");
  }

  buttonElement.addEventListener("click", () => clickCheck(key));
  keyboard.appendChild(buttonElement);
});

let clickCheck = (letter) => {
  if (letter === "ENTER") {
    checkRow();
    return;
  }

  if (letter === "«") {
    deleteLetter();
    return;
  }

  if (col < width && row < height) {
    addLetter(letter);
    return;
  }
};

let addLetter = (letter) => {
  let tile = document.getElementById(row + "-" + col);
  tile.textContent = letter;
  tile.classList.add("white");
  tile.dataset.state = "avaiable";
  col += 1;
};

let deleteLetter = () => {
  if (col > 0) {
    col -= 1;
    let currTile = document.getElementById(row + "-" + col);
    currTile.textContent = "";
  }
};

let checkRow = () => {

  let guess = ''

  for (let c = 0; c < width; c++) {
    let currTile = document.getElementById(row.toString() + '-' + c.toString());
    let letter = currTile.innerText;
    guess += letter;
}

  guess = guess.toLowerCase()

    if (col < width) {
        alert("Not Enough Letters");
        return
      }
 
   if (!words.includes(guess)) {
        alert('Not in Word List!!');
        return;
    }
  
  if (col == width) { 
    update();
    row += 1;
    col = 0;      
    console.log(guess)
    guess = ''
    guessChance -= 1;         

    if (guessChance == 0 && row == 6) {
      alert("you lose!");
    }
  }
};

let update = () => {

  let correct = 0;
  
  for (let c = 0; c < width; c++) {
    let currTile = document.getElementById(row.toString() + "-" + c.toString());
    let letter = currTile.innerText;

    if (wordGuess[c] == letter) {
      currTile.classList.add("correct");
      correct += 1;
    } else if (wordGuess.includes(letter)) {
      currTile.classList.add("Wrong-position");
    } else {
      currTile.classList.add("wrong");
    }
  }

  if (correct == width) {
    alert("You Win!!");
    row = 7;
    return;
  }

};
