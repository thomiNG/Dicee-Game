var firstRunDone = false;
var levelCounter = 1;
var randomButtonColorOrder = [];
var selectedButtonColorOrder = [];
var resetGame = false;
var counterClicks = 1;

startGameWithKey();

function startGameWithKey() {
  // press any key button to start
  $("body").keydown(function () {
    // change h1 html content
    // $("h1").html("Level " + levelCounter);
    // random button should trigger tone and animation
    randomButtonInteractionKey();
    removeKeydownEventListener();
  });
}
// create tone when pressing the button
$("button").on("click", function () {
  if (firstRunDone === true) {
    var buttonPressedBackgroundColor = this.style.backgroundColor;
    buttonAnimation(this);
    createTone(buttonPressedBackgroundColor);
    selectedButtonColorOrder.push(buttonPressedBackgroundColor);

    if (
      randomButtonColorOrder[counterClicks - 1] !==
      selectedButtonColorOrder[counterClicks - 1]
    ) {
      wrongAnswerReaction();
    }
    counterClicks++;
    if (resetGame === false) {
      if (randomButtonColorOrder.length < counterClicks) {
        counterClicks = 1;
        // $("h1").html("Level " + levelCounter++);
        setTimeout(randomButtonInteractionKey, 800);
        selectedButtonColorOrder.length = 0;
      }
    } else {
      resetGame = false;
      counterClicks = 1;
    }
  }
});

// random button should be triggered with new image and tone
function randomButtonInteractionKey() {
  // random number 0 - 3
  var randomNumber = Math.floor(Math.random() * 4);
  var activeButton = document.querySelectorAll("button")[randomNumber];
  buttonAnimation(activeButton);
  var buttonKeyBackgroundColor = activeButton.style.backgroundColor;

  $("h1").html("Level " + levelCounter++);

  randomButtonColorOrder.push(buttonKeyBackgroundColor);
  createTone(buttonKeyBackgroundColor);
}

// create tone when buttons are triggered
function createTone(buttonBackgroundColor) {
  // check which button was pressed by comparing the background color
  switch (buttonBackgroundColor) {
    case "green":
      var greenTone = new Audio("sounds/green.mp3");
      greenTone.play();
      break;
    case "red":
      var redTone = new Audio("sounds/red.mp3");
      redTone.play();
      break;
    case "yellow":
      var yellowTone = new Audio("sounds/yellow.mp3");
      yellowTone.play();
      break;
    case "blue":
      var blueTone = new Audio("sounds/blue.mp3");
      blueTone.play();
      break;
    default:
      console.log(buttonBackgroundColor + " selected");
      break;
  }
}

// button animation with delay time of 500ms when button is triggered
function buttonAnimation(activeButton) {
  activeButton.classList.add("pressed");
  setTimeout(function () {
    activeButton.classList.remove("pressed");
  }, 500);
}

function wrongAnswerReaction() {
  var wrongTone = new Audio("sounds/wrong.mp3");
  wrongTone.play();
  randomButtonColorOrder.length = 0;
  selectedButtonColorOrder.length = 0;
  resetGame = true;
  levelCounter = 1;
  $("h1").html("Game Over! Press Any Key to Restart");
  $("body").addClass("wrong-answer");
  setTimeout(function () {
    $("body").removeClass("wrong-answer");
  }, 500);
  startGameWithKey();
}

//remove keydown event listener after first call
function removeKeydownEventListener() {
  $("body").off("keydown");
  firstRunDone = true;
}
