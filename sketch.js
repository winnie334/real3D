var blockSize = 30;
var position = [0, 0];
var angles = [0, 0];
var scaleNumberThing = 1;
var madeChange = true;

function setup() {
  createCanvas(600, 600, WEBGL);
  noStroke();
}

function getHeight(x, y) {
  return noise(x / 10, y / 10) * 200;
}

function draw() {
  update();
  if (!madeChange) madeChange = keyIsDown(37) || keyIsDown(38) || keyIsDown(39) || keyIsDown(40);
  if (madeChange) {
    background(160, 255, 255);
    translateAndStuff();
    directionalLight(255, 255, 255, 0.8, -0.7, 0.3);
    drawTerrain();
    madeChange = false;
  }
}

function update() {
  if (!mouseIsPressed) return;
  position[1] -= 0.3;
  madeChange = true;
}

function translateAndStuff() {
  scale(scaleNumberThing);
  angles[0] += keyIsDown(38) ? 0.03 : (keyIsDown(40) ? -0.03 : 0);
  angles[1] += keyIsDown(37) ? -0.03 : (keyIsDown(39) ? 0.03 : 0);
  rotateX(angles[0]);
  rotateY(angles[1]);
  rotateX(1)
  translate(-220 - position[0] * blockSize, -200 - position[1] * blockSize, -108);
}

function drawTerrain() {
  for (var x = 1 + Math.floor(position[0]); x < 15 + Math.floor(position[0]); x++) {
    for (var y = 1 + Math.floor(position[1]); y < 20 + Math.floor(position[1]); y++) {
      push();
      var height = getHeight(x, y);
      if (height < 60) ambientMaterial(height / 3, 70 + height / 3, 200);
      else if (height < 130) ambientMaterial(7, 122, height /2);
      else if (height < 160) ambientMaterial(170, 170, 170);
      else ambientMaterial(255 - height / 15, 255, 255);
      translate(x * blockSize, y * blockSize, height / 2);
      box(blockSize, blockSize, height);
      pop();
    }
  }
}

function mouseWheel(event) {
  scaleNumberThing *= (event.delta < 0 ? 1.1 : 0.9);
  madeChange = true;
}