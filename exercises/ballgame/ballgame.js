
var x, y, xSpeed, ySpeed;
var score = 0;

function setup() {
  createCanvas(500, 500);
  rectMode(CENTER);
  x = random(width);
  y = random(height);
  xSpeed = random(5, -5);
  ySpeed = random(5);
  // Paddle Color
  paddleColor = color(255, 205, 0);


}

 function mouseMoved() {

  console.log (value);
}

function draw() {

  x +=xSpeed;
  y +=ySpeed;
  
  if(x > width - 5 || x < 5){
    xSpeed = xSpeed * -1;
  }
  
  // top boundry
  if(y < 5){
 ySpeed = ySpeed * -1;
  }
  // paddle boundry
  if (y > height -25 && abs(mouseX-x) < width/12 && y < height - 25 + ySpeed){
    ySpeed = ySpeed * -1
    xSpeed *= 3;
    ySpeed *= 3;
    paddleColor = color(random(255),random(255),random(255));
    score ++;
  }
 
  fill(paddleColor);
  background(244, 244, 244);
  rect(mouseX, height-10, width/10, height/500);
  ellipse(x,y,10,10);
  text(score, mouseX, height-25)
}
//   x: 200,
//   y: 30,
//   speed: 0,
//   display: function() {
//     fill(00000);
//     ellipse(this.x, this.y, 24, 24);
//   },
//   move: function() {
// var value = 0;

// var ball = {
//     this.y = this.y + this.speed;
//     this.speed = this.speed + gravity;

//   },
//   bounce: function() {
//     if (this.y > height) {
//       this.speed = this.speed * .99;
//     }
//   }

// };

// var gravity = 0.1;

  // ball.display();
  // ball.move();
  // ball.bounce();
  // if (ball.mouseX.mouseY = rect.mouseX.mouseY) {
  //     console.log("touched black!");
  // }



//





