var buttonColors = ["green", "red", "yellow", "blue"];
let gamePattern = [];
var userClickedPattern = [];

var isStarted = false;

var level = 0;


function AnimatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function(){
         $("#" + currentColor).removeClass("pressed");
    }, 100);
}

function PlayAudio(color){
    var audio = new Audio("sounds/" + color + ".mp3");
    audio.play();
}

function nextSequence() {
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);

    var randomNumber = Math.floor(Math.random()*4);
    var randomColor = buttonColors[randomNumber];
    gamePattern.push(randomColor);

    $("." + randomColor).fadeOut(100).fadeIn(100);

    PlayAudio(randomColor);
}

function CheckAnswer(currentLevel) {
    if(userClickedPattern[currentLevel] == gamePattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length){
            setTimeout(function() {
                nextSequence();
            }, 1000);
        }
    } else {
        var audio = new Audio("sounds/wrong.mp3");
        audio.play();

        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");            
        }, 200);

        $("h1").text("Game Over. Press 'A' Key to Restart");
        StartOver();
    }
    
}


$(".btn").on('click', function() {
    if(!isStarted) return false;
    var userChosenColor = this.id;
    userClickedPattern.push(userChosenColor);
    PlayAudio(userChosenColor);
    AnimatePress(userChosenColor);
    CheckAnswer(userClickedPattern.lastIndexOf(userChosenColor));
});

$(document).keypress(function(event) {
    if(!isStarted && event.key === "a"){
        nextSequence();
        isStarted = true;
    }
});

function StartOver(){
    level = 0;
    gamePattern = [];
    isStarted  = false;
}

