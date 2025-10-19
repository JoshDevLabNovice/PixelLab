const topo1 = document.getElementById('topo1');
const topo2 = document.getElementById('topo2');
const topo3 = document.getElementById('topo3');

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const strong = document.getElementById('less');

document.body.style.cursor = "url('img/maze.png'), auto";
const less = new Audio('audio/less.wav');
const selection = new Audio('audio/selection.wav')
const musica = "audio/music.mp3";
const music = new Audio(musica);
music.volume = 0.6;

function golpe() {
	const hit = new Audio("audio/hit.mp3");
  hit.play();
}

/* front-end */
const punteo = document.getElementById('punteo');
const timeRes = document.getElementById('timeRes');
const boton = document.getElementById('iniciar');
const boton2 = document.getElementById('boton2');
const cubierta = document.getElementById('cubierta');
const resultado = document.getElementById('resultados')
const error = document.getElementById('error')

const particles = document.querySelectorAll('particles');

let puntaje = 0;
let errores = 0;
function puntos(topo) {

	topo.addEventListener('click', function () {
		if (topo.dataset.clicked === "false") {
			puntaje++;
			punteo.style.color = '#111111';
			navigator.vibrate(170);
			punteo.textContent = puntaje;
			topo.dataset.clicked = "true";
			topo.children[0].style.display = 'block'
			setTimeout(function() {
				topo.children[0].style.display = 'none'
			}, 800)
	}
		})
}

function movimiento(topo) {
  topo.style.animation = 'none';
  void topo.offsetWidth;
  if (window.innerWidth < 600) {
  	  topo.style.animation = 'animacion2 1s linear 1';
		} else {
  		topo.style.animation = 'animacion 1s linear 1';
	}
  topo.dataset.clicked = "false";
}


function mover1() {
	movimiento(topo1);
	timeout1 = setTimeout(mover1, Math.random() * (15000 - 2000) + 2000);
}
function mover2() {
	movimiento(topo2);
	timeout2 = setTimeout(mover2, Math.random() * (18000 - 1500) + 1500);
}
function mover3() {
	movimiento(topo3);
	timeout3 = setTimeout(mover3, Math.random() * (10000 - 2000) + 2000);
}
function mover() {
  const interval1 = setInterval(() => {
    clearInterval(interval1);
    mover1();
  }, Math.random()*(5000-1500)+1500);

  const interval2 = setInterval(() => {
    clearInterval(interval2);
    mover2();
  }, Math.random()*(6000-2000)+2000);

  const interval3 = setInterval(() => {
    clearInterval(interval3);
    mover3();
  }, Math.random()*(4000-1500)+1500);
}



puntos(topo1);
puntos(topo2);
puntos(topo3);




/* botón iniciar */

boton.addEventListener('click', function(){
	selection.play();
	boton.style.display = 'none'
	music.currentTime = 0;
	music.play();
	puntaje = 0;
	errores = 0;
	punteo.textContent = puntaje
	let tiempo = 60000;


let crono = setInterval(function() {
		timeRes.textContent = tiempo - 59940;
		if ((tiempo-59940) > 0) {
		tiempo--;
	} else {
		music.pause();
		clearInterval(crono);
		clearInterval(timeout1);
		clearInterval(timeout2);
		clearInterval(timeout3);
		cubierta.style.setProperty("display", "flex", "important");
		console.log('Soporte vibración:', 'vibrate' in navigator);
		navigator.vibrate(512);
		console.log(errores)
		resultado.textContent = puntaje;
		punteo.textContent = puntaje;
	}
}, 1000)


mover()
})

boton2.addEventListener('click', function(){
	selection.play()
	cubierta.style.setProperty("display", "none", "important");
	boton.style.display = "inline-block";
	puntaje = 0;
	punteo.textContent = puntaje;
})



document.querySelectorAll(".topo").forEach(bt => {
  bt.addEventListener("click", golpe);
});

canvas.addEventListener('click', (e) => {
  if (puntaje > 0 && timeRes.textContent != '0') {
  	puntaje--;
  	errores++;
  	punteo.textContent = puntaje;
  	less.play();
  	punteo.style.color = '#c41b1b';
  	strong.style.display = 'block'
  	error.textContent = errores;

  	setTimeout(function() {
  		strong.style.display = 'none';
  		punteo.style.color = '#111111';
  	}, 600)
  }
});
