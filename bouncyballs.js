var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');






var Ball = function(x, y, radius){
  this.x = x;
  this.y = y;
  this.radius = radius;
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
