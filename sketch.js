let dotNum = 2;
let speed = 0.01;
let ticker = 0;

let numSlider, speedSlider;
let connectBox;

let codeLink;


function setup() {
  createCanvas(windowWidth, windowHeight);

  numSlider = createSlider(2, 30, 2, 1);
  numSlider.position(width / 10, height - height / 10);
  numSlider.style("width", width - width / 5 + "px");
  // console.log(numSlider);

  speedSlider = createSlider(0, PI / 15, PI / 120, 0);
  speedSlider.position(width / 10, height - height / 20);
  speedSlider.style("width", width - width / 5 + "px");

  connectBox = createCheckbox("Draw Connections", false);
  connectBox.position(width / 10, height / 10);

  codeLink = createElement('a', "<a href=\"https://editor.p5js.org/PotatoProgramming/sketches/r9TRHbx7T\">See the Code</a>");
  codeLink.position(width - width/10, height/10);
}

function draw() {
  resizeCanvas(windowWidth, windowHeight);
  numSlider.position(width / 10, height - height / 10);
  numSlider.style("width", width - width / 5 + "px");
  speedSlider.position(width / 10, height - height / 20);
  speedSlider.style("width", width - width / 5 + "px");
  connectBox.position(width / 10, height / 10);
  codeLink.position(width - width/10, height/10);

  background(220);
  dotNum = numSlider.value();
  speed = speedSlider.value();


  drawTrig(dotNum, ticker, connectBox.checked());
  ticker += speed;
}


function drawTrig(num, timestep, drawConnections = false) {

  let amplitude = 1;

  if (width <= height) {
    amplitude = width / 3;
  } else {
    amplitude = height / 3;
  }

  let offsetBase = PI / num;

  push();
  translate(width / 2, height / 2);

  for (let i = 0; i < num; i++) {
    let offset = offsetBase * i;
    let x = cos(offset) * amplitude;
    let y = sin(offset) * amplitude;

    strokeWeight(0.5);
    stroke(50);
    line(-x, -y, x, y);
  }

  let points = [];
  for (let i = 0; i < num; i++) {
    let offset = offsetBase * i;
    let mag = sin(offset + timestep) * amplitude;
    let pos = p5.Vector.fromAngle(offset).mult(mag);
    points.push(pos);
  }

  if (drawConnections === true) {
    for (let i = 0; i < num; i++) {

      stroke(19, 40, 158);
      strokeWeight(1.5);
      if (i < num - 1) {
        line(points[i].x, points[i].y, points[i + 1].x, points[i + 1].y);
      } else {
        line(points[i].x, points[i].y, points[0].x, points[0].y);
      }

    }
  }

  for (let i = 0; i < num; i++) {
    let offset = offsetBase * i;

    noStroke();
    let r = map(offset, 0, PI, 0, 255);
    let g = map(offset, 0, PI, 255, 0);
    let b = map(offset, 0, PI, 100, 225);
    fill(r, g, b);
    circle(points[i].x, points[i].y, 20);
  }

  pop();

}
