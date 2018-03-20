// TODO: Objectivo manipular pixels de vídeo de forma a que distorçam com a posição do rato.

class Shape {
	constructor(x, y) {
		this.x = x
		this.y = y
		this.y0 = y
		this.size = random(10, 30)
		this.ttl = 2 * (height - this.y) / this.size
	}
	draw() {
		// noStroke();
		let ny = 1.2 * height

		if (this.y < ny) {
			let bri = map(this.y - this.y0, 0, ny - this.y, 80, 20) + random(20)
			fill(random(30), map(this.y, 0, ny, 100, 0), bri)
			rect(this.x, this.y, this.size, this.size / 2)
			this.x += random(-0.2 * this.size, 0.2 * this.size)
			this.y += this.size / 2
		}
	}
}

var socket
// const PORT =process.env.PORT || 3000;
var dots = []

function setup() {
	// let size = min(window.innerWidth, window.innerHeight);
	// createCanvas(size, size);
	createCanvas(window.innerWidth, window.innerHeight)
	background(50)
	// console.log(PORT);
	socket = io.connect('https://polar-journey-49397.herokuapp.com')
	socket.on('mouse', ping)
	colorMode(HSB, 360, 100, 100, 100)
	frameRate(20)
	pixelDensity(1)
	rectMode(CENTER)
	textFont('Helvetica')

	// noStroke();
}

function draw() {
	// background(50);

	drawNetStuff()

	if (dots.length > 1000) {
		dots.shift()
	}
}

function drawNetStuff() {
	push()
	for (let sh of dots) {
		sh.draw()
	}
	pop()
}

function mouseDragged() {
	let data = {
		x: mouseX / width,
		y: mouseY / height
	}
	socket.emit('mouse', data);
	ping(data);
}

function ping(data) {
	// console.log('client: ', data);
	dots.push(new Shape(width * data.x, height * data.y))
	while (dots.length > 1000) {
		dots.shift()
	}
}
