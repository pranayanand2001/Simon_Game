var gamePattern = [];

var userClickedPattern = [];

var buttonColours = ["red", "blue", "green", "yellow"];

var started = false;

var level = 0;

function checkAnswer(currentLevel) {
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log("success")

        if(gamePattern.length == userClickedPattern.length) {

            setTimeout(function() {
                newSequence();
            }, 1000);
        }
    }
    else {
        
        var gameOver = new Audio('sounds/wrong.mp3');
        gameOver.play();
        $('body').addClass("game-over");

        setTimeout(function() {
            $('body').removeClass("game-over")}, 200);
       
        $("h1").text("Game Over, Press Any Key to Restart");

        startOver();
    }
}

$(document).keypress(function() {
    if(!started) {
    started = true;
    $("h1").text("Level " + level);
    newSequence();
    }
});

$(".btn").click(function() {
    var userChosenColour = $(this).attr("id");

    userClickedPattern.push(userChosenColour);

    console.log(userClickedPattern);

    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length-1);
});

function newSequence() {
    userClickedPattern = [];

    level++;
    $("h1").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChoosenColour = buttonColours[randomNumber];  
    gamePattern.push(randomChoosenColour);
    
    $("#" + randomChoosenColour).fadeOut(100).fadeIn(100).fadeIn(100);
    playSound(randomChoosenColour);
}   

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();

}

function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed", 100)
    setTimeout(function() {
        $("#" + currentColour).removeClass("pressed")}, 100);
}

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}