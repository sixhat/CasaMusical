var socket;
function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  background("lemonchiffon");
  socket = io.connect('http://10.72.3.212:3000');
  socket.on('mouse',ping);
}
function draw(){
  background(255, 250, 205,5);
  noFill();
  rect(10,10,width-20,height-20);
}

function mousePressed(){
  let data = {
    x: mouseX/width,
    y: mouseY/height
  }
  socket.emit('mouse',data);
}

function ping(data){
  console.log('client: ', data);
  fill('red');
  ellipse(data.x*width,data.y*height,60);
}
