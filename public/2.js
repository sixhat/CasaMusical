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
	// rectMode(CENTER);
	frameRate(7);
	textFont("Helvetica");
}

function draw() {
	background(255, 250, 205);
	push();
	drawNetStuff();
	pop();

	push();
	// translate(width/2,0);

	let y = 0;
	let nlines = 0;
	while (y < height) {
		let lineHeight = 10 + 100 * (1 + sin(nlines++ + frameCount / 23));
		y += lineHeight;
		let x = -width + 50 * sin(frameCount / 33);
		textSize(lineHeight * 1.3);
		let c = char(random(65, 90));

		while (x < width) {
			if (random() < dots.length / 101) {
				fill(255, 0, 0, 90);
				stroke(255, 0, 0, 90);
			} else {
				fill(0);
				stroke(0);
			}
			text(c, x, y);
			x = x + textWidth(c);
		}

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

function mousePressed() {
	let data = {
		x: mouseX / width,
		y: mouseY / height
	}
	fill('blue');
	ellipse(data.x * width, data.y * height, 60);
	// ping(data); // Para modo offline
	socket.emit('mouse', data);
	ping(data);
}

function ping(data) {
	// console.log('client: ', data);
	dots.push(data);
	while (dots.length > 100) {
		dots.shift();
	}
}
