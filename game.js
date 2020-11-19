//var for storing data
var gamePattern = [];
var userPattern = [];
var buttonCol = ["red", "blue", "green", "yellow"];
var state = false; //variable for storing state of the game
var level = 0;



//driver code
$(document).keydown(function() {

    if (state === false)
    {
        state = true;
        nextSeq();
    }  
})



//functions

function checkAnswer (currentLevel) {

    let answer = compareArrays(userPattern, gamePattern);
    console.log(answer);

    if (answer)
    {
        setTimeout(nextSeq, 1000);
        userPattern = [];
    }
};

//animate pressing of tiles
function animatePress(currentCol) {

    $(`#${currentCol}`).addClass("pressed");

    setTimeout(() => {
        $(`#${currentCol}`).removeClass("pressed");
    }, 100);

}

//generates next sequence of color
function nextSeq() {
    $("#level-title").text(`Level ${level}`);
    var randomNum = Math.floor(Math.random()*4);
    var randomChosenCol = buttonCol[randomNum];
    gamePattern.push(randomChosenCol);
    console.log(gamePattern);
    $(`.${randomChosenCol}`).fadeOut(100).fadeIn(100);
    playSound(randomChosenCol);
    level++;
}

//plays sound
function playSound(name) {
    var audio = new Audio(`sounds/${name}.mp3`);
    audio.play();
}

//button behaviour
$("div.btn").on("click", function() {
    var userChosenCol = $(this).attr("id");
    userPattern.push(userChosenCol);
    console.log(userPattern);
    animatePress(userChosenCol);
    playSound(userChosenCol);
    checkAnswer(level);
});

//comparing 2 arrays
function compareArrays (arr1, arr2) {

    if (arr1.length === arr2.length)
    {
        for (var i = 0; i < arr1.length; i++)
        {
            if (arr1[i] !== arr2[i])
            {
                $("body").addClass("game-over");
                playSound("wrong");
                $("#level-title").text('Game Over! Press Any Key to Restart');
                $(document).keydown(startOver);
                return false;
            }
        }
        return true;
    }
    else
    {
        return false;
    }    
}


//start again fxn.
function startOver () {
    $("body").removeClass("game-over");
    setTimeout(() => {
        level = 0;
    userPattern = [];
    gamePattern = [];
    state = false;

    if (state === false)
    {
        state = true;
        nextSeq();
    }
        
        
    }, 400);
    
}




















