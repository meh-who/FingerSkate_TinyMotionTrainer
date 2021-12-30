let obstacles;
let randint;
let score;
let lost;
let next;
let timer;
let spread;
let slider;
let houses =[];
let houseimg = [];


let serial;
let portName = 'COM5'; 
let inData;

const serviceUuid = "19b10010-e8f2-537e-4f6c-d104768a1214";
const characteristicsUUID = {
  counter:"19b10013-e8f2-537e-4f6c-d104768a1214"
}
let counterCharacteristic;
let ledCharacteristic;
let myBLE;
let gestureValue = 2;

const GESTURES = ["Jump", "Move", "Still"];

//------------------ visual ---------------------
function preload() {
  gif = loadImage('images/skateboard.gif');
  img = loadImage('images/cone.png');
  img2 = loadImage('images/street.png');
  myFont = loadFont('Minecraft.ttf');
  
  for (var i = 0; i < 12; i++) {
    houseimg[i] = loadImage("images/house-" + i + ".png");
  }
}

function setup() {
  myBLE = new p5ble();
  // Create a 'Connect and Start Notifications' button
  const connectButton = createButton('Connect and Start Notifications')
  connectButton.mousePressed(connectAndStartNotify);
  
  portSetup();
  
  createCanvas(windowWidth, windowHeight);
  textFont(myFont);
  textSize(48)
  slider = createSlider(15, 30, 18, 1)
  slider.position(width - slider.width, 0)
  resetSketch()
}

function draw() {
  next += 1
  timer += 1
  
  drawBg()
  text("SCORE: "+ score, 30, 90)
  text("JUMP WITH YOUR FINGER SKATE BOARD!", width - 1500, 90)
  
  if (next == randint) {
    obstacles.push(new Obstacle())
    score += 1
    next = 0
    spread = slider.value()
    randint = int(random(40, width/5))
  }
  
  for (let o of obstacles) {
    if (o.x < 0) {
      if (obstacles.length > 5) {
        obstacles.shift() // remove obstacles[0]
      }
    }
    o.move();
    // if (gestureValue < 2){
    //   o.move();
    // }
    o.show();
    if (player.hits(o)) {
      console.log("GAME OVER!")
      noStroke()
      rect(width/2 - 150, height/2 - 80, 400, 80)
      text("GAME OVER!", width/2 - 100, height/2 - 20)
      lost = true;
      noLoop();
    }
  }
  if (gestureValue == 0){
    player.jump();
  }
  player.show();
  player.move();
}

function keyPressed() {
  player.jump();
  if (key == ' ') {
    if (lost) {
      resetSketch();
    }
  }
}

function resetSketch() {
  console.log("Restarting game")
  score = 0;
  lost = false;
  obstacles = []
  houses = []
  next = 0;
  timer = 0;
  player = new Player();
  street = new Street();
  randint = int(random(50, 150));
  loop();
}

function drawBg(){
  let from = color(200, 230, 255);
  let to = color(250, 250, 200);
  colorMode(RGB); 
  background(lerpColor(from, to, timer/60/15));
  street.show();
  street.move();
  
  
  if (timer<600){
    if (timer%60==0) {
    houses.push(new House())
    }
  }else if(timer%40==0){
    houses.push(new House())
  }
  
  for (let h of houses) {  
    if (h.x < 0) {
      if (houses.length > 20) {
        houses.shift() // remove obstacles[0]
      }
    }
    h.move();
    h.show();
  }
}

