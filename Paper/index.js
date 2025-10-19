document.addEventListener('DOMContentLoaded', function() {
	const piedra = document.getElementById('piedra')
	const papel = document.getElementById('papel')
	const tijera = document.getElementById('tijera')
	const h4 = document.getElementById('h4')
	const results = document.getElementById('resultados')
	const imgRes =  document.getElementById('imgRes');
	const imgBot =  document.getElementById('imgBot');
	const bt = document.getElementById('bt')
	const sonido = new Audio('audio/coin.wav');
	const sorteo = new Audio('audio/roulette.wav');
	let imgEl;
	let urlBot;

	function jugar(eleccion) {
		h4.style.display = 'none'
		let elegido = eleccion;
		let numero = parseInt(Math.random()*3) + 1

		let op
		switch(numero) {
			case 1: op = piedra
					urlBot = "img/piedra100x.png"
			break;
			case 2: op = papel
					urlBot = "img/papel.png"
			break;
			case 3: op = tijera
					urlBot = "img/tijera1000x.png"
			break;
		}
		if (elegido == piedra) {
			if (op == piedra) {
		h4.innerText = "Ha habido un empate"
		return 
			} else {
			if (op == papel) {
				h4.innerText = "Perdiste"
			} else if (op == tijera) {
				h4.innerText = "Ganaste"

			}
		}
		} else if (elegido == papel) {
			if (op == papel) {
			h4.innerText = "Ha habido un empate"
			} else {
			if (op == tijera) {
				h4.innerText = "Perdiste"
			} else if (op == piedra) {
				h4.innerText = "Ganaste"

			}
		}
		}	else if (elegido == tijera) {
			if (op == tijera) {
			h4.innerText = "Ha habido un empate"
			} else {
			if (op == piedra) {
				h4.innerText = "Perdiste"
			} else if (op == papel) {
				h4.innerText = "Ganaste"

			}
		}
		}

		setTimeout(function() {

		imgRes.src = "img/piedra100x.png"
		imgBot.src = "img/tijera1000x.png"
		sorteo.loop = true;
		sorteo.play();
		setTimeout(function() {
			imgRes.src = "img/papel.png"
			imgBot.src = "img/piedra100x.png"
		}, 250)
		setTimeout(function() {
			imgRes.src = "img/tijera1000x.png"
			imgBot.src = "img/papel.png"
		}, 500)
		setTimeout(function() {
			imgRes.src = "img/piedra100x.png"
			imgBot.src = "img/tijera1000x.png"
		}, 750)
		setTimeout(function() {
			imgRes.src = "img/papel.png"
			imgBot.src = "img/piedra100x.png"
		}, 1000)
		setTimeout(function() {
			imgRes.src = "img/tijera1000x.png"
			imgBot.src = "img/papel.png"
		}, 1250)
		setTimeout(function() {
			imgRes.src = "img/piedra100x.png"
			imgBot.src = "img/tijera1000x.png"
		}, 1500)
		setTimeout(function() {
			imgRes.src = "img/papel.png"
			imgBot.src = "img/piedra100x.png"
		}, 1750)
		setTimeout(function() {
			imgRes.src = "img/tijera1000x.png"
			imgBot.src = "img/papel.png"
		}, 2000)

		setTimeout(function() {
			imgRes.src = imgEl
			imgBot.src = urlBot;
			navigator.vibrate(512);
			h4.style.display = 'block'
			bt.style.display = 'block'
			sorteo.pause();
			sorteo.currentTime = 0;
		}, 2250)
		results.style.display = "flex";
	}, 750)
	}

	piedra.addEventListener('click', function() {
		jugar(piedra)
		imgEl = "img/piedra100x.png"
		sonido.play();
	})
	papel.addEventListener('click', function() {
		jugar(papel)
		sonido.play();
		imgEl = "img/papel.png"
	})
	tijera.addEventListener('click', function() {
		jugar(tijera)
		sonido.play();
		imgEl = "img/tijera1000x.png"
	})
	bt.addEventListener('click', function() {
		sonido.play();
		results.style.display = "none"
		bt.style.display = 'none';
})
})

