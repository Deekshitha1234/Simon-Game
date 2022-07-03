var buttonColors=["red","blue","green","yellow"];

var gamePattern=[];

var userClickedPattern=[];

$(".btn").on("click",function(){
  var userChosencolor=$(this).attr("id");
  userClickedPattern.push(userChosencolor);
  playSound(userChosencolor);
  animatePress(userChosencolor);
  checkAnswer(userClickedPattern.length-1);
});


var started=false;
var level=0;

$(document).keypress(function(){
  if(!started){
      $("#level-title").text("Level "+level);
      nextSequence();
      started=true;
  }
});

function nextSequence(){

  level++;

  $("#level-title").text("Level "+level);

  var randomNumber=Math.floor(Math.random()*4);
  var randomChosencolor=buttonColors[randomNumber];
  gamePattern.push(randomChosencolor);
  $( "#" + randomChosencolor).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosencolor);

}
function playSound(name){
  var audio = new Audio("./sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColor){
   $("#"+currentColor).addClass("pressed");
   setTimeout(function(){
    $("#"+currentColor).removeClass("pressed");
  },100);
}

function checkAnswer(nextLevel)
{
  if(userClickedPattern[nextLevel]===gamePattern[nextLevel])
  {
    console.log("success");
  if(userClickedPattern.length===gamePattern.length){
    setTimeout(function(){
      nextSequence();
    },1000);
  }
 }
  else{
    console.log("wrong");
    var audio = new Audio("./sounds/wrong.mp3");
    audio.play();
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    },200);
    $("#level-title").text("Game Over, Press Any Key to Restart");
    startOver();
  }
}
function startOver() {

  //3. Inside this function, you'll need to reset the values of level, gamePattern and started variables.
  level = 0;
  gamePattern = [];
  started = false;
  userClickedPattern = [];
}
