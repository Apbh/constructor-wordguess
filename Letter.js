

function Letter(character) {
    this.character = character.toLowerCase();
    this.letterGuessedYet = false;
    this.validLetter = false;

    this.results = function () {

     
   
         if (this.validLetter === true && this.letterGuessedYet === false) {
            
            return "__";
        }
        else if (this.letterGuessedYet === true && this.validLetter === true) {
            return this.character;

        }
        else{
            return "__";
        }
    }
    this.checkGuess = function (userGuess) {
       
      
        
        if (userGuess.toLowerCase() === this.character) {
            
            this.validLetter = true;
            this.letterGuessedYet = true;
            
            
            
        }

        else if ( userGuess.toLowerCase() !== this.character && this.letterGuessedYet === false) {
            // console.log(userGuess);
            this.validLetter = true;
            // console.log(this.validLetter);
            this.letterGuessedYet = false;
            
        }

    }



}

// var getletter = new Letter("a");

// getletter.checkGuess("a");
// getletter.results();

//export Letter.js for word.js to use
module.exports = Letter