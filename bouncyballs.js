var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var ballpen = [];

var Ball = function(x, y, radius, dx, dy, color){
  this.x = x || canvas.width / 2;
  this.y = y || canvas.height / 2;
  this.radius = radius || 20;
  this.dx = dx || 10;
  this.dy = dy || 10;
  this.color = color || 'black';
  this.draw();
};

Ball.prototype.draw = function(){
  ctx.beginPath();
  ctx.lineWidth = 0;
  ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
  ctx.fillStyle = this.color;
  ctx.fill();
};

Ball.prototype.reflect = function(canvas, balls){
  if(this.x + this.dx + this.radius >= canvas.width || this.x + this.dx - this.radius < 0) this.dx *= -1;
  if(this.y + this.dy + this.radius >= canvas.height || this.y + this.dy - this.radius < 0) this.dy *= -1;
  for(var ballkey in balls){
    var ball = balls[ballkey];
    if (this != ball){
      diffRadiiSquared = Math.pow(this.radius - ball.radius, 2);
      distCentersSquared = Math.pow(this.x - ball.x, 2) + Math.pow(this.y - ball.y, 2);
      sumRadiiSquared = Math.pow(this.radius + ball.radius, 2);
      if (diffRadiiSquared <= distCentersSquared && distCentersSquared <= sumRadiiSquared){
	this.dx *= -1;
	this.dy *= -1;
      }
    }
  }
};

Ball.prototype.move = function(){
  this.x += this.dx;
  this.y += this.dy;
  this.draw();
};

var startAnimate = function(){
  var animate = function(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (var ballkey in ballpen){
      var ball = ballpen[ballkey];
      ball.reflect(canvas, ballpen);
      ball.move();
    }
    id = window.requestAnimationFrame(animate);
  };

  var id = window.requestAnimationFrame(animate);
};



var addBallButton = document.getElementById('addBallButton');
addBallButton.addEventListener('click', function(){
  var x = Math.floor(Math.random() * (canvas.width - 40)) + 20;
  var y = Math.floor(Math.random() * (canvas.height - 40)) + 20;
  var radius = Math.floor(Math.random() * 25) + 5;
  var dx = Math.floor(Math.random() * 10) + 1;
  var dy = Math.floor(Math.random() * 10) + 1;
  var color = randomColor();
  var ball = new Ball(x, y, radius, dx, dy, color);
  ballpen.push(ball);
});

var startButton = document.getElementById('startButton');
startButton.addEventListener('click', function(){
  startAnimate();
});

var randomColor = function(){
  var r = Math.random();
  if (r < 1/7){
    return "black";
  }else if (r < 2/7){
    return "red";
  }else if (r < 3/7){
    return "blue";
  }else if (r < 4/7){
    return "yellow";
  }else if (r < 5/7){
    return "green";
  }else if (r < 6/7){
    return "orange";
  }else{
    return "purple";
  }
};
