const canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext("2d");

let point = 0;

// ball parameters
let radius = 10;
let x = canvas.width / 2;
let y = canvas.height - 20;
let Dx = 2;
let Dy = -2;

// paddle parameters
let paddleHeight = 10;
let paddleWidth = 100;
let paddleX = (canvas.width - paddleWidth) / 2;
let paddleY = canvas.height - paddleHeight;
let paddleSpeed = 10;

function draw () {
  // clear canvas to redraw
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // draw the ball and the bouncing effect
  drawBall();
  ballBouncing();

  // draw paddle and paddle's movement
  drawPaddle();
  paddleMove();

  // detect collision of the ball and paddle
  ballPaddleCollision();

  //request animation recursion call
  requestAnimationFrame( draw );

  // game functionalities
  $('.restart').on('click', function(){
    restart();
  })
  gameOver();
}
draw();

function restart(){
  x = canvas.width / 2;
  y = canvas.height - 20;
  Dx = 2;
  Dy = -2;
  paddleX = (canvas.width - paddleWidth) / 2;
  paddleY = canvas.height - paddleHeight;
  point = 0;
  score();
}
function gameOver(){
  if ( y > canvas.height ) {
    alert('game over');
    restart();
  }
}
function score(){
  document.getElementById('score').innerHTML = `${point}`
}
function drawBall(){
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  ctx.fill();
  ctx.closePath();
}
function ballBouncing(){
  x += Dx;
  y += Dy;
  if ( x + radius + Dx > canvas.width || x - radius + Dx < 0 ) {
    Dx = -Dx;
  }
  if ( y - radius + Dy < 0 ) {
    Dy = -Dy;
  }
}
function drawPaddle () {
  ctx.beginPath();
  ctx.fillRect(paddleX, paddleY, paddleWidth, paddleHeight);
  ctx.closePath();
}
function paddleMove(){
  document.onkeydown = function(e) {
    switch (e.keyCode) {
      case 37:
        paddleX -= paddleSpeed;
        if ( paddleX <= 0 ) {
          paddleX = 0;
        }
        break;
      case 39:
        paddleX += paddleSpeed;
        if ( paddleX + paddleWidth >= canvas.width ) {
          paddleX = canvas.width - paddleWidth;
        }
        break;
    }
  };
}
function ballPaddleCollision(){
  if ( x > paddleX - radius && x < paddleX + paddleWidth/2 && y + radius === canvas.height - paddleHeight ) {
    Dy = -Dy;
    Dx = -Dx - 1;
    point++;
    score();
  }
  if ( x >= paddleX + paddleWidth/2 && x < paddleX + paddleWidth && y + radius === canvas.height - paddleHeight ) {
    Dy = -Dy;
    Dx++;
    point++;
    score();
  }
}


