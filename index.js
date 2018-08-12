var Word = require("./Word.js");
var inquirer = require("inquirer");
var colour = require("colors");
var guesses = 10;
var wordsAlreadyPicked = [];
var currentWord;
var testWord;
var check = [];


//list of words
var wordList = ["Hershey", "Snickers", "KitKat", "Twix", "Bounty", "Cadbury", "Aero", "Toblerone", "Galaxy", "Kisses"];
//store the letters that the user guesses
var userGuess;
var userGuessArray = [];



function loadGame() {
    
    // console.log("Welcome to the Word Guess Game!");
    inquirer.prompt([
        {
            type: "input",
            message: "What is your name?",
            name: "name"
        },
        
        {
            type: "confirm",
            name: "start",
            message: "Would you like to start",
            default: true
        },
        
    ]).then(function (answer) {
        if (answer.start) {
            console.log("\r\nWelcome ".rainbow + answer.name.rainbow.bold + " to the Word Guess Game!".rainbow);
            console.log("\r\nTHEME: CHOCOLATE BAR NAMES".underline);
            console.log("\r\nRules of the Game: \r\nPick a letter from A-Z and occassionally a space for two letter words. Correct guesses will unlock the hidden letters. \r\nIncorrect guesses will cost you a guess. Game ends when all letters have been guessed or when no more guesses are available. Correct Guesses will move the you to the next round.Good Luck!".bold)
            console.log("\r\nWord To Guess:".rainbow);
            startGame();
            
        } else {
            console.log("\r\nCome back soon!");
        }
    })
    
}
function startGame() {
    currentWord = "";
    guesses = 10;
    if (wordsAlreadyPicked.length < wordList.length) {
        
        currentWord = randomWord();
        wordsAlreadyPicked.push(currentWord);
        
        // console.log(wordsAlreadyPicked, currentWord);
    } else {
        console.log("\r\nGame Over!".yellow.bold);
        continueGame();
    }
    if (currentWord) {
        testWord = new Word(currentWord);
        
        testWord.letterObjArray();
        // console.log(JSON.stringify(testWord));
        testWord.showResults();
        // console.log(testWord.showResults());
        takeGuess();
    }
    
}


//pick a random word from the wordList and store in Word constructor
function randomWord() {
    
    var random = wordList[Math.floor(Math.random() * wordList.length)];
    
    
    if (wordsAlreadyPicked.indexOf(random) === -1) {
        
        return random;
        
    } else {
        return randomWord();
    }
}

function takeGuess() {
   
    if (check.indexOf("__") === -1 && check.length !== 0) {
        // if (true){

        console.log("\r\nYOU GUESSED THE WORD!!".green);
        console.log("\r\nWord To Guess:".rainbow);
        check = [];
       // console.log( testWord.showResults());
        startGame();
    


    } else if (guesses === 0) {

        console.log("\r\nNo More Guesses Left.    ".yellow)
        continueGame();
    }

    else if (guesses > 0){
    inquirer.prompt([
        {
            type: "input",
            name: "userGuess",
            message: "\r\nGuesses Left: ".blue + guesses + "\r\nGuess a letter"
        }


    ]).then(function (guess) {
        
            
            testWord.makeGuess(guess.userGuess);
           
    
            check = testWord.showResults().split(" ");
           
            guesses--;

            takeGuess();


    })
}
}



function continueGame() {
    inquirer.prompt([
        {
            name: "continue",
            type: "confirm",
            message: "\r\nPlay Again?"
        }
    ]).then(function (response) {
        if (response.continue) {
            wordsAlreadyPicked = [];
            console.log("\r\nWord To Guess:".rainbow);
            startGame();
        } else {
            console.log("\r\nThanks for Playing!".rainbow)
        }
    })

}



loadGame();

