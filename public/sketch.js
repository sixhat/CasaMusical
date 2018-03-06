var socket;
// const PORT =process.env.PORT || 3000;
var dots =[];
function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  background("lemonchiffon");
  frameRate(20);
  // console.log(PORT);
  socket = io.connect('https://polar-journey-49397.herokuapp.com');
  socket.on('mouse',ping);
}
function draw(){
  background(255, 250, 205);
  noFill();
  rect(10,10,width-20,height-20);
  fill('red');
  for(let data of dots){
    ellipse(data.x*width,data.y*height,60);
  }
}

function mouseDragged(){
  let data = {
    x: mouseX/width,
    y: mouseY/height
  }
  fill('blue');
  ellipse(data.x*width,data.y*height,60);
  socket.emit('mouse',data);
}

function ping(data){
  // console.log('client: ', data);
  dots.push(data);
  while (dots.length>50){
    dots.shift();
  }
}
