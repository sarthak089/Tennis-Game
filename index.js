var canvas;
var canvasContext;
var ballx = 300;
var speedx = 15;
var bally = 300;
var speedy = 4;
var paddle1Y = 250;
var paddle2Y = 250;
var player1score = 0;
var player2score = 0;

const PADDLE_HEIGHT = 100;
function calculateMousePos(evt) {
  var rect = canvas.getBoundingClientRect();
  var root = document.documentElement;
  var mouseX = evt.clientX - rect.left - root.scrollLeft;
  var mouseY = evt.clientY - rect.top - root.scrollTop;
  return {
    x: mouseX,
    y: mouseY,
  };
}
function ballReset() {
  if (player1score>=11 || player2score>=11){
    player1score=0;
    player2score=0;
  }
  speedx = -speedx;
  ballx = canvas.width / 2;
  bally = canvas.height / 2;
}
window.onload = function () {
  canvas = document.getElementById("gameCanvas");
  canvasContext = canvas.getContext("2d");
  setInterval(moveEverything, 50);

  canvas.addEventListener("mousemove", function (evt) {
    var mousePos = calculateMousePos(evt);
    paddle1Y = mousePos.y - PADDLE_HEIGHT / 2;
  });
};
function paddle2movement() {
  var paddle2Ycenter = paddle2Y + PADDLE_HEIGHT / 2;
  if (paddle2Ycenter < bally - 35) {
    paddle2Y += 7;
  } else if (paddle2Ycenter > bally + 35) {
    paddle2Y -= 7;
  }
}

function moveEverything() {
  paddle2movement();
  ballx = ballx + speedx;
  bally = bally + speedy;
  if (ballx > canvas.width) {
    if (bally > paddle2Y && bally < paddle2Y + PADDLE_HEIGHT) {
      speedx = -speedx;
      var deltaY = bally - (paddle1Y + PADDLE_HEIGHT/2);
      speedy = deltaY*0.05
    } else {
      ballReset();
      player1score++;
    }
  }
  if (ballx < 0) {
    if (bally > paddle1Y && bally < paddle1Y + PADDLE_HEIGHT) {
      speedx = -speedx;
      var deltaY = bally - (paddle2Y + PADDLE_HEIGHT/2);
      speedy = deltaY*0.05

    } else {
      ballReset();
      player2score++;
    }
  }
  if (bally > canvas.height) {
    speedy = -speedy;
  }
  if (bally < 0) {
    speedy = -speedy;
  }

  canvasContext.fillStyle = "black";
  canvasContext.fillRect(0, 0, canvas.width, canvas.height);
  if(player1score==11 || player2score==11)
  {
    if(player1score==11){
      canvasContext.fillStyle = "white";
      canvasContext.fillText("Player 1 wins", 270,300);}
    if(player2score==11){
      canvasContext.fillStyle = "white";
      canvasContext.fillText("Player 2 wins", 270,300);}
      return;
  }
  canvasContext.fillStyle = "white";
  canvasContext.fillRect(0, paddle1Y, 10, PADDLE_HEIGHT);
  canvasContext.fillStyle = "white";
  canvasContext.fillRect(canvas.width - 10, paddle2Y, 10, PADDLE_HEIGHT);
  
  canvasContext.fillStyle = "white";
  canvasContext.beginPath();
  canvasContext.arc(ballx, bally, 10, 0, Math.PI * 2, true);
  canvasContext.fill();
  canvasContext.fillText("Player 1", 130, 10);
  canvasContext.fillText("Player 2", 430, 10);
  canvasContext.fillText(player1score, 150, 20);
  canvasContext.fillText(player2score, 450, 20);
}
