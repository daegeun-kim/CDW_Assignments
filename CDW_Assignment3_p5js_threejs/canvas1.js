// 2D Drawing Sketch - using p5.js instance mode
var sketch1 = function(p) {
  // All variables are scoped to this instance
  var canvasWidth = 800;
  var canvasHeight = 400;
  var gridSpacing = 40;
  var canvas;

  p.setup = function() {
    canvas = p.createCanvas(canvasWidth, canvasHeight);
    canvas.parent('canvas-container-1');
  };

  p.draw = function() {
    p.background(250);
    drawGrid();
    drawPrimitives();
  };

  function drawGrid() {
    p.stroke(200);
    p.strokeWeight(1);
    for (var x = 0; x <= p.width; x += gridSpacing) {
      p.line(x, 0, x, p.height);
    }
    for (var y = 0; y <= p.height; y += gridSpacing) {
      p.line(0, y, p.width, y);
    }
  }

  function drawPrimitives() {
    // Rectangle
    p.fill(255, 100, 100);
    p.rect(120, 80, 120, 40);
    p.rect(80, 120, 40, 160);
    p.rect(120, 280, 120, 40);

    p.fill(100, 150, 250);
    p.rect(560, 80, 40, 240)
    p.rect(600, 80, 80, 40);
    p.rect(680, 120, 40, 80);
    p.rect(600, 200, 80, 40);
    // Triangle
    p.noStroke();
    p.fill(255, 220, 80);
    p.triangle(320, 80, 320, 320, 520, 200);

    p.fill(255, 255, 255);
    p.triangle(360, 160, 360, 240, 430, 200);
  }
};

// Create the instance
var myp5_1 = new p5(sketch1, 'canvas-container-1'); 