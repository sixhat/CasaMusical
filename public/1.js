var cubos, socket;


function setup() {
	createCanvas(windowWidth, windowHeight, WEBGL);

	cubos = [];

	socket = io.connect("https://polar-journey-49397.herokuapp.com");
	socket.on("mouse", servidor);

	print("pronto");
}


function draw() {
	background(255);

	directionalLight(255, 0, 0, 1, 1, 0);
	directionalLight(0, 255, 0, -1, 1, 0);
	directionalLight(0, 0, 255, 0, -1, 0);

	for (var i = 0; i < cubos.length; i++) {
		if (frameCount % 60 === 0) cubos[i].atualizaVelocidades();
		cubos[i].anima();
		cubos[i].desenha();
	}
}


function mousePressed() {
	var novaPosicaoInterior = {
		x: mouseX / width,
		y: mouseY / height
	}

	append(cubos, new CuboRotativo(novaPosicaoInterior.x * width, novaPosicaoInterior.y * height));
	socket.emit("mouse", novaPosicaoInterior);
}


function servidor(novaPosicaoExterior) {
	append(cubos, new CuboRotativo(novaPosicaoExterior.x * width, novaPosicaoExterior.y * height));
}


class CuboRotativo {
	constructor(x_, y_) {
		this.x = x_;
		this.y = y_;
		this.z = 0;

		this.zz = int(random(-300, 300));
		this.zEmPosicao = false;

		this.t = random(10, 20);

		this.Ai = 0; // rotação interna - sobre si
		this.Ae = 0; // rotação externa
		this.atualizaVelocidades();
	}

	atualizaVelocidades() {
		this.vAi = random(0.2, 1.8); // velocidade angulo interno
		this.vAe = random(0.2, 1.8); // velocidade angulo externo
	}

	anima() {
		if (this.z < this.zz) this.z += 3;
		if (this.z > this.zz) this.z -= 3;
		if (this.z === this.zz) this.emPosicao = true;

		if (this.Ae < 360) this.Ae += this.vAe;
		else this.Ae = 0;

		if (this.Ai < 360) this.Ai += this.vAi;
		else this.Ai = 0;
	}

	desenha() {
		noStroke();
		specularMaterial(255);

		push();
		rotateX(radians(this.Ae));
		rotateY(radians(this.Ae));
		rotateZ(radians(this.Ae));

		push();
		translate(this.x - width / 2, this.y - height / 2, this.z);

		rotateX(radians(this.Ai));
		rotateY(radians(this.Ai));
		rotateZ(radians(this.Ai));

		box(this.t);
		pop();

		pop();
	}
}


function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
}
