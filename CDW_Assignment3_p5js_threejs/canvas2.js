let x = 25;
let y = 200;
let dx = 5;
let dy = 0;
let direction = 1;

function setup() {
  let cnv = createCanvas(800, 400);
  cnv.parent('canvas-container-2');
  // Create the canvas
  // createCanvas(800, 400);

  // Set the color mode to hue-saturation-brightness (HSB)
  colorMode(HSB);

  // Set the text size
  textSize(20);

  // No animation to start
  noLoop();
}

function draw() {
  // Clear the background
  background(0);

  // Draw a circle, with hue determined by frameCount
  fill(x / 3, 90, 90);
  circle(x, y, 50);

  // Move the object
  x += dx;
  y += dy;

  // Wrap around the canvas edges
  if (x > width + 25) {
    x = -25;
  } else if (x < -25) {
    x = width + 25;
  }
  if (y > height + 25) {
    y = -25;
  } else if (y < -25) {
    y = height + 25;
  }

  describe('circle moving in a random direction');
}

function mousePressed() {
  // Only respond if mouse is inside the canvas
  if (
    mouseX >= 0 && mouseX <= width &&
    mouseY >= 0 && mouseY <= height
  ) {
    if (isLooping()) {
      // If already moving, just change direction
      let angle = Math.random() * TWO_PI;
      let speed = 5;
      dx = speed * Math.cos(angle);
      dy = speed * Math.sin(angle);
    } else {
      // If stopped, set random direction and start
      let angle = Math.random() * TWO_PI;
      let speed = 5;
      dx = speed * Math.cos(angle);
      dy = speed * Math.sin(angle);
      loop();
    }
  }
}

function keyPressed() {
  // Draw one frame
  redraw();
}