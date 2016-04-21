var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

var Ball = function(x, y, radius, dx, dy, color){
  this.x = x || canvas.width / 2;
  this.y = y || canvas.height / 2;
  this.radius = radius || 20;
  this.dx = dx || 10;
  this.dy = dy || 10;
  this.color = color || '#FFFFFF';
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







var addBallButton = document.getElementById('addBallButton');
