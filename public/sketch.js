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
  colorMode(RGB,255,255,255,100);
}
function draw(){
  background(255, 250, 205);
  noFill();
  stroke(0);
  rect(10,10,width-20,height-20);
  noStroke();
  for(let i=0; i<dots.length; i++){
    data=dots[i];
    fill(255,0,0,i);
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
  // ping(data); // Para modo offline
  socket.emit('mouse',data);
}

function ping(data){
  // console.log('client: ', data);
  dots.push(data);
  while (dots.length>100){
    dots.shift();
  }
}
