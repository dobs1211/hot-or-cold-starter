/* Step 1
Declare the global variables
*/

var secretNumber = generateRandomNumber(1, 100);
//console.log("Secret Number: "+secretNumber);

//closer you are to the random number, the color changes to neutral gray to hot red
document.body.style.backgroundColor = '#333';

//this variable will hold the historic value of the previous guess in order to display the relative feedback ("hotter or colder")
var oldGuess = 0;

//set the maximum number of guesses
var counter = 30;
$('#count').text(counter);

/* Step 2
Function Definitions
*/

//function to start a new game
function newGame() {
    document.location.reload(true);
}
//function to generate a random number
function generateRandomNumber(min, max) {
    //random number generated between min (included) and max (included);Math.floor will give you an uneven distribution.

    var randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    return randomNumber;
}
//function to count number of guesses
function showGuessCounter(counter) {
    $('#count').text(counter);
}
//function to show the number of guesses
function guessHistory(guessedNumber) {
    $('#guessList').append('<li>' + guessedNumber + '</li>');
}

//funtion to show validation of insert input
function validation(guessedNumber) {
    //check the guessed number in the console
    //console.log("Guessed Number: "+ guessedNumber);

    /*start applying validation, from the less restrictive one to the most restrictive one; each rule negates the trueth*/
    //make sure that we get a number

    //make sure that we get a number
    if (isNaN(guessedNumber)) {
        alert('You must enter a number!!');
        //reset the guess value to nothing
        $('#userGuess').val('');
        return false; // this means, stop the loop and don't do anything else
    }

    //if the number is divisible by 1 it means it is an integer (it has no decimals)
    else if (guessedNumber % 1 !== 0) {
        alert('You must enter an integer value!!');
        //reset the guess value to nothing
        $('#userGuess').val('');
        return false; // this means, stop the loop and don't do anything else
    }

    //if the guessedNumber is smaller than 1 OR the guessedNumber is bigger than 100...
    else if ((guessedNumber < 1) || (guessedNumber > 100)) {
        alert('Please guess a number between 1 to 100!!');
        //reset the guess value to nothing
        $('#userGuess').val('');
        return false; // this means, stop the loop and don't do anything else
    }
    //else the guessedNumber is valid
    else {
        guessFeedback(secretNumber, guessedNumber);
        counter--;

        //update the guess history

        guessHistory(guessedNumber);

        //update the number of guesses

        showGuessCounter(counter);

        //reset the guess value to nothing

        $('#userGuess').val('');

        //if the number of guesses is smaller than 0 it means that the game is over

        if (counter <= 0) {
            $('#feedback').text('Womp Womp..Game Over!');
            document.getElementById("userGuess").disabled = true;
            document.getElementById("guessButton").disabled = true;
            alert('The Secret number was' + secretNumber + '!Better luck next time!');
        }
    }
}
//function to provide feedback to the user

function guessFeedback(secretNumber, guessedNumber) {
    //show the absolute value of the difference between the secretNumber and guessedNumber
    var difference = Math.abs(secretNumber - guessedNumber);
    if (difference >= 50) {
        $('#feedback').text('Ice Ice Baby, super Cold!');
        //the closer you are to the random number, the color changes to from neutral gray to hot red
        document.body.style.backgroundColor = '#002cb3';
    } else if (difference >= 30 && difference <= 49) {
        $('#feedback').text('Still Shivering...Cold');
        //closer you are to the random number, the color changes to neutral gray to to hot red
        document.body.style.backgroundColor = '#3333cc';
    } else if (difference >= 20 && difference <= 29) {
        $('#feedback').text('Getting Warm');
        //the closer you are to the random number, the color changes from neutral gray to hot red
        document.body.style.backgroundColor = "#8533ff";
    } else if (difference >= 10 && difference < +19) {
        $('#feedback').text('Woah, is it me? Or is it getting Hot?!');
        //the closer you are to the random number the color changes to from netral gray to hot red
        document.body.style.backgroundColor = '#b84dff';
    } else if (difference >= 1 && difference <= 9) {
        $('#feedback').text('Hear the crackling of the fire?? Very HOT!!');
        //the closer you are to the random number, the color changes from neutral gray to hot red
        document.body.style.backgroundColor = '#fc0446';
    } else {
        $('#feedback').text('Ring the Alarm, you got the number!! Nice job!');
        //the closer you are to the random number the color changes from neutral gray to hot red
        document.body.style.backgroundColor = '#ff0404';
        document.getElementById("userGuess").disabled = true;
        document.getElementById("guessButton").disabled = true;
    }
}

//Function to provide relative feedback to the user
function relativeFeedback(secretNumber, oldGuess, newGuess) {
    var oldDiff = Math.abs(parseInt(secretNumber) - parseInt(oldGuess));
    var newDiff = Math.abs(parseInt(secretNumber) - parseInt(newGuess));
    if (newDiff > oldDiff) {
        $('#relative-feedback').text('You are colder than the last guess!');
    }
}

/* Step 3 - Using the functions */

$(document).ready(function () {
    $('.new').on('click', newGame);

    $('#guessButton').on('click', function () {


        //first get the value that user added in the input box
        var guessedNumber = $('#userGuess').val();

        //store it in the newGuess variable as well to serve the relative Feedback ("Hotter or Colder") functionality
        var newGuess = guessedNumber

        //validate all the numbers
        validation(guessedNumber);

        //only if the user added mor than one guess (there is a guess history)
        if ((oldGuess !== 0) && (guessedNumber >= 1) && (guessedNumber <= 100)) {
            //call the relative feedback function defined above
            relativeFeedback(secretNumber, oldGuess, newGuess);
        }
        //re-update the old guess with the new value (so we can have a number history) (oldGuess) to compare it with the new value
        oldGuess = newGuess;
    });
    $(document).on('keypress', function (event) {
        //on enter
        if (event.which === 13) {
            //if the page refreshes when you submit the form use "preventDefault()" to force JavaScript to handle the form submission
            event.preventDefault();

            //first get the value that user added in the input box
            var guessedNumber = $('#userGuess').val();
            //store it in the newGuess variable as well to activate the relative Feedback ("Hotter or Colder") functionality
            var newGuess = guessedNumber;

            //validate all the numbers
            validation(guessedNumber);

            //only if the user added more than one guess (there is a guess history)
            if ((oldGuess !== 0) && (guessedNumber >= 1) && (guessedNumber <= 100)) {
                //call the relative feedback function defined above
                relativeFeedback(secretNumber, oldGuess, newGuess);
            }
            //re-update the old guess with the new value (so we will have a number in the history) (oldGuess) to compare it with
            oldGuess = newGuess;
        }
    });

    /*--- Display information modal box ---*/
    $('.what').click(function () {
        $(".overlay").fadeIn(1000);

    });

    /*--- Hide information modal box ---*/
    $("a.close").click(function () {
        $(".overlay").fadeOut(1000);
    });
});
