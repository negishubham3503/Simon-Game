var gamePattern = [];
var userClickedPattern = [];
var buttonColors = ['red', 'blue', 'green', 'yellow'];
var randomChosenColor;
var level = 0, started = 0, count = 0;

$(document).keypress(function(){
    if (started == 0){
        $("#level-title").text("Level" + level);
        nextSequence();
    }
    started = started + 1;
});

$('.btn').click(function(){
    var userChosenColor = $(this).attr('id');
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length - 1);
});

function nextSequence(){
    userClickedPattern = [];
    level = level + 1; 
    $("#level-title").text("Level " + level);
    var randomChosenColor = buttonColors[Math.round(Math.random() * 3)];
    gamePattern.push(randomChosenColor);
    $('#' + randomChosenColor).animate({opacity : 0}, "fast");
    $('#' + randomChosenColor).animate({opacity : 100}, "fast");
    playSound(randomChosenColor);
}

function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColor){
    $('#' + currentColor).addClass('pressed');
    setTimeout(function(){
        $('#' + currentColor).removeClass('pressed');
    }, 100);
}

function checkAnswer(currentLevel){
    if (gamePattern[currentLevel] == userClickedPattern[currentLevel]){
        if (currentLevel == level - 1){
            setTimeout(nextSequence, 1000);
        }
    }
    else{
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200);
        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}

function startOver(){
    level = 0;
    started = 0;
    gamePattern = [];
}