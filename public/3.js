// TODO: Objectivo manipular pixels de vídeo de forma a que distorçam com a posição do rato.

var socket;
// const PORT =process.env.PORT || 3000;
var dots = [];
var _v;
var _scale;
var _pp;

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

	noStroke();
}

function draw() {
	background(255, 250, 205);

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
	strokeWeight(8);
	for (let i = 1; i < dots.length; i++) {
		data = dots[i];
		pdata = dots[i - 1];
		fill(255, 0, 0, i / 2);
		line(data.x * width, data.y * height,
			pdata.x * width, pdata.y * height,
		);
		// ellipse(data.x * width, data.y * height, 30);
	}
	if ((frameCount % 3) === 1 && dots.length > 0) {
		dots.shift();
	}
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
	while (dots.length > 100) {
		dots.shift();
	}
}
