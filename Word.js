var Letter = require("./Letter.js")


var Word = function (gameword) {
    //new word for the game from list of words
    this.gameword = gameword;
    this.previousResult = "";
    this.letterArr = [];




    //Splits word to guess and pushes letter objects into variable
    this.letterObjArray = function () {
        var splitWord = this.gameword.split("");
        // console.log(splitWord);




        for (var i = 0; i < splitWord.length; i++) {
            var getletter = new Letter(splitWord[i]);


            this.letterArr.push(getletter);
        }

    }


    //checks to see if userGuess matches any of the letter objects in array

    this.makeGuess = function (userGuess) {
        var letters = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];

        if (letters.indexOf(userGuess) === -1){
            console.log("\r\nPlease Enter A Valid Letter Between A-Z.".green)
        } else{
        // console.log(userGuess);
        for (var i = 0; i < this.letterArr.length; i++) {
            this.letterArr[i].checkGuess(userGuess);
        }
    }


    }

    //print out word with either the correct character showing or an _

    this.showResults = function () {
        var returnWord = "";

        for (var i = 0; i < this.letterArr.length; i++) {

            returnWord += this.letterArr[i].results() + " ";

        }
        console.log(returnWord);

        

        if (returnWord === this.previousResult) {
            console.log("\r\nIncorrect Guess!".red);
        }

        this.previousResult = returnWord;

        return returnWord;


    }

}



module.exports = Word;