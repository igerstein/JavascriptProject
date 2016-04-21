var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var ballpen = [];

var Ball = function(x, y, radius, dx, dy, color){
  this.x = x || canvas.width / 2;
  this.y = y || canvas.height / 2;
  this.radius = radius || 20;
  this.dx = dx || 10;
  this.dy = dy || 10;
  this.color = color || '#FFFFFF';
  this.draw();
};

Ball.prototype.draw = function(){
  ctx.beginPath();
  ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
  ctx.fill();
  ctx.stroke();
};

Ball.prototype.setX = function(x){
  this.x = x;
};

Ball.prototype.setY = function(y){
  this.y = y;
};

Ball.prototype.reflect = function(canvas, balls){
  if(this.x + this.dx + this.radius >= canvas.width || this.x + this.dx - this.radius < 0) this.dx *= -1;
  if(this.y + this.dy + this.radius >= canvas.height || this.y + this.dy - this.radius < 0) this.dy *= -1;
  for(var ballkey in balls){
    var ball = balls[ballkey];
    var sumOfRad = this.radius + ball.radius;
    var diffOfRad = Math.abs(this.radius - ball.radius);
    var distance = Math.sqrt( ( this.x + ball.x ) * (this.x + ball.x) + (this.y + ball.y) * (this.y + ball.y));
    if(sumOfRad >= distance && diffOfRad <= distance){
      this.dy = (Math.random() + 1) * 10;
      this.dx = (Math.random() + 1) * 10;
      ball.dy = (Math.random() + 1) * 10;
      ball.dx = (Math.random() + 1) * 10;
    }
  }
};

Ball.prototype.move = function(){
  this.reflect(canvas, ballpen);
  this.x += this.dx;
  this.y += this.dy;
  this.draw();
};

var startAnimate = function(){
  var animate = function(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (var ballkey in ballpen){
      var ball = ballpen[ballkey];
      ball.move();
    }
    id = window.requestAnimationFrame(animate);
  };

  var id = window.requestAnimationFrame(animate);
};



var addBallButton = document.getElementById('addBallButton');
addBallButton.addEventListener('click', function(){
  var ball = new Ball();
  console.log('hi');
  ballpen.push(ball);
});

var startButton = document.getElementById('startButton');
startButton.addEventListener('click', function(){
  startAnimate();
});
