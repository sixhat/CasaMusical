var socket;
// const PORT =process.env.PORT || 3000;
function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  background("lemonchiffon");
  console.log(PORT);
  socket = io.connect('https://polar-journey-49397.herokuapp.com');
  socket.on('mouse',ping);
}
function draw(){
  background(255, 250, 205, 5);
  noFill();
  rect(10,10,width-20,height-20);
}

function mouseDragged(){
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
