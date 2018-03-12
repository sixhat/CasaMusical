// TODO: Objectivo manipular pixels de vídeo de forma a que distorçam com a posição do rato.

var socket;
// const PORT =process.env.PORT || 3000;
var dots = [];
var _v;
var _scale;
var _pp;
var bg=0;

function setup() {
	let size = 0.99 * min(window.innerWidth, window.innerHeight);
	createCanvas(size, size);
	background("lemonchiffon");
	// console.log(PORT);
	socket = io.connect('https://polar-journey-49397.herokuapp.com');
	socket.on('mouse', ping);
	colorMode(RGB, 255, 255, 255, 100);

	pixelDensity(1);
	rectMode(CENTER);
	frameRate(20);
	textFont("Helvetica");
bg=color(255, 250, 205);
	noStroke();
}

function draw() {
	background(bg);

	push();
	drawNetStuff();
	pop();

	push();
	translate(width/2,0);

	let y = 0;
	let nlines = 0;
	while (y < height) {
		let lineHeight = 5 + 40 * (1 + sin(nlines++ + frameCount / 23));
		y += lineHeight;
		let x = width/3 * sin((frameCount+y) / 33);
		fill(255,255,random(255),80);
		ellipse(x,y, 2*lineHeight, lineHeight);

		x = width/3 * sin((frameCount+y) / 13);
		fill(255,255,random(255),80);
		ellipse(x,y, 2*lineHeight, lineHeight);

		x = width/3 * sin((frameCount+y) / 51);
		fill(255,255,random(255),80);
		ellipse(x,y, 2*lineHeight, lineHeight/2);


	}
	pop();







}

function drawNetStuff() {
	bg = color(
		dots.length%255
	)

}

function mouseDragged() {
	let data = {
		x: mouseX / width,
		y: mouseY / height
	}
	fill('blue');
	ellipse(data.x * width, data.y * height, 60);
	// ping(data); // Para modo offline
	socket.emit('mouse', data);
}

function ping(data) {
	// console.log('client: ', data);
	dots.push(data);
	while (dots.length > 1000) {
		dots.shift();
	}
}
