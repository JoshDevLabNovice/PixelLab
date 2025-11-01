
const casillas = document.querySelectorAll('.casilla')
const button = document.getElementById('button')
const background = document.getElementById('fondo')
const h3 = document.getElementById('h3')
const selection = new Audio('audio/select.wav');
const finished = new Audio('audio/finish.wav');
const roulette = new Audio('audio/roulette.wav');
roulette.loop = true;
/* posibles valores de victoria*/
const victoria = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[2, 4, 6]
	]
const h4 = document.getElementById('h4')
/* casillas para usar */
const c1 = document.getElementById('c1')
const c2 = document.getElementById('c2')
const c3 = document.getElementById('c3')
const c4 = document.getElementById('c4')
const c5 = document.getElementById('c5')
const c6 = document.getElementById('c6')
const c7 = document.getElementById('c7')
const c8 = document.getElementById('c8')
const c9 = document.getElementById('c9')

let eventos = [c1, c2, c3, c4, c5, c6, c7, c8, c9]
let	valores = [
				c1.innerHTML, c2.innerHTML, c3.innerHTML,
				c4.innerHTML, c5.innerHTML, c6.innerHTML,
				c7.innerHTML, c8.innerHTML, c9.innerHTML
				]


// botones para elegir personaje

const pX = document.getElementById('pX')
const pO = document.getElementById('pO')
const ventana1 = document.getElementById('ventana1')
const eleccion = document.getElementById('eleccion')
let isX = null

pX.addEventListener('click', function () {
	selection.play();
	ventana1.style.display = 'none'
	ventana2.style.display = 'flex'
	isX = true
})

pO.addEventListener('click', function () {
	selection.play();
	ventana1.style.display = 'none'
	ventana2.style.display = 'flex'
	isX = false
})

//botones para elegir modo
const amigo = document.getElementById('1v1');
const robot = document.getElementById('1vCPU');
const ventana2 = document.getElementById('ventana2')

amigo.addEventListener('click', function () {
	selection.play();
	ventana2.style.display = 'none';
	sinBot()
})

let array = []
let gameEnd = false
robot.addEventListener('click', function () {
	selection.play();
	ventana2.style.display = 'none';
	conBot()
})
function sinBot() {
	numeracion = 0
/* asignación de eventos, ganador y turno */
	function evento(casilla) {
		casilla.addEventListener('click', jugador)
	}
		
			/* evalua si hay un ganador o no */
	function evaluar() {
			valores = [
				c1.innerHTML, c2.innerHTML, c3.innerHTML,
				c4.innerHTML, c5.innerHTML, c6.innerHTML,				
				c7.innerHTML, c8.innerHTML, c9.innerHTML
				]


			for (let combinacion of victoria) {
	  			const [a, b, c] = combinacion;
	  			if (valores[a] && valores[a] === valores[b] && valores[a] === valores[c]) {
	  				finished.play();
	    		h4.innerHTML = `${valores[a]} ¡Felicidades!`

	    		casillas.forEach(casilla => {
				    casilla.style.backgroundColor = "#8132";
				});

	    		eventos.forEach(e => {
	    			e.removeEventListener('click', jugador)
	    			return
	    		})
	  			}
			}
				if (casillas[0].innerHTML != "" && casillas[1].innerHTML != "" && casillas[2].innerHTML != "" && casillas[3].innerHTML != "" && casillas[4].innerHTML != "" && casillas[5].innerHTML != "" && casillas[6].innerHTML != "" && casillas[7].innerHTML != "" && casillas[8].innerHTML != "" && h4.innerHTML == '') {
				background.style.backgroundColor = "#8132"
				h3.innerHTML = '<img src="img/x.png" style="margin: 0;"> Empate <img src="img/o.png" style="margin: 0;">';
				navigator.vibrate(700);
				finished.play();
			}

	}


		/* evalua a qué jugador le toca */
	function jugador() {
			if (isX) {
				if (numeracion % 2 == 0) {
					this.innerHTML = '<img src="img/x.png" style="margin: 0;">'
				} else {
					this.innerHTML = '<img src="img/o.png" style="margin: 0;">'
				}
			} else if (isX == false) {
				if (numeracion % 2 == 0) {
					this.innerHTML = '<img src="img/o.png" style="margin: 0;">'
				} else {
					this.innerHTML = '<img src="img/x.png" style="margin: 0;">'
				}
			}
			numeracion++
			evaluar()
			this.removeEventListener('click', jugador)

		}

	button.addEventListener('click', function() {
			eventos.forEach(elemento => {
		  	elemento.innerHTML = ''
		  	elemento.style.backgroundColor = '';
		  	})
	    	numeracion = 0

	    	eventos.forEach(e => {
			e.addEventListener('click', jugador);
		});

		h4.innerHTML = '';
		h3.innerText = 'El ganador es:'
		background.style.backgroundColor = 'transparent'
		ventana2.style.display = 'flex'
		location.reload()
				})
	evento(c1)
	evento(c2)
	evento(c3)
	evento(c4)
	evento(c5)
	evento(c6)
	evento(c7)
	evento(c8)
	evento(c9)
}

function conBot() {
	let numeracion = 0;
		if (numeracion % 2 == 0) {
	function eventoAñadido(casilla) {
		casilla.addEventListener('click', jugar)
	}


	function jugar() {
		
		if (isX) {
			if (this.innerHTML == "") {
				this.innerHTML = '<img src="img/x.png">'
				verificacion()
				numeracion++;
				ganador()
				evaluar()
				}
			} 
		else if (isX == false) {
			if (this.innerHTML == "") {
				this.innerHTML = '<img src="img/o.png">'
				verificacion()
				numeracion++;
				ganador()
				evaluar()
				}
			}

		if(!gameEnd) {
			eleccion.style.display = 'flex';
		roulette.play();
		setTimeout(function() {
			eleccion.style.display = 'none';
			roulette.pause();
			roulette.currentTime = 0;
		}, 2000)
	}
	}

	function evaluar() {
		if (numeracion % 2 !== 0 && gameEnd == false) {
			
			bot()
			ganador()
			}
	}

	function ganador() {
		let jugadas = [c1.innerHTML, c2.innerHTML, c3.innerHTML,
						c4.innerHTML, c5.innerHTML, c6.innerHTML,
						c7.innerHTML, c8.innerHTML, c9.innerHTML];

		for (let posibilidades of victoria) {
			const [op1, op2, op3] = posibilidades;
			if (jugadas[op1] == jugadas[op2] && jugadas[op1] == jugadas[op3] && jugadas[op1] != "")  {
				finished.play();
				gameEnd = true
				background.style.backgroundColor = '#8132'
				navigator.vibrate(700);
				h4.innerHTML = `${jugadas[op1]} Felicidades!`
				h3.innerHTML = "El ganador es: "
				casillas.forEach(e => {
					e.removeEventListener('click', jugar)
				})
				return;
			}
		}
	}

	casillas.forEach(e => {
		eventoAñadido(e)
	})
	}
		function bot() {
			if (gameEnd) return
				else {
			let x = parseInt(Math.random() * 9)
			if (gameEnd === false && casillas[x].innerHTML == "") {
				if (isX) {
					casillas[x].innerHTML = '<img src="img/o.png">';
				} else if (isX == false) {
					casillas[x].innerHTML = '<img src="img/x.png">';
				}
				numeracion++
				verificacion()
				
			} else {
				if (casillas[0].innerHTML != "" && casillas[1].innerHTML != "" && casillas[2].innerHTML != "" && casillas[3].innerHTML != "" && casillas[4].innerHTML != "" && casillas[5].innerHTML != "" && casillas[6].innerHTML != "" && casillas[7].innerHTML != "" && casillas[8].innerHTML != "") {
				console.log("juego terminado")
				} else {
				bot();
			}
			}
		}
		}

	function verificacion() {
		array.pop(-1)
		array.pop(-1)
		array.pop(-1)
		array.pop(-1)
		array.pop(-1)
		array.pop(-1)
		array.pop(-1)
		array.pop(-1)
		array.pop(-1)
		casillas.forEach(casilla => {
			array.push(casilla.innerHTML)
		})
		if (casillas[0].innerHTML != "" && casillas[1].innerHTML != "" && casillas[2].innerHTML != "" && casillas[3].innerHTML != "" && casillas[4].innerHTML != "" && casillas[5].innerHTML != "" && casillas[6].innerHTML != "" && casillas[7].innerHTML != "" && casillas[8].innerHTML != "") {
				gameEnd = true
				
				background.style.backgroundColor = '#8132'
				h3.innerHTML = '<img src="img/x.png" style="margin: 0;"> Empate <img src="img/o.png" style="margin: 0;">'
				navigator.vibrate(700);
			}
		
	}


	button.addEventListener('click', function() {
		casillas.forEach(casilla => {
			casilla.innerHTML = "";
			numeracion = 0
			array = []
			background.style.backgroundColor = 'transparent'
			casillas.forEach(e => {
		eventoAñadido(e)
	})
			ventana2.style.display = 'flex'
			h3.innerText = 'El ganador es:'
			navigator.vibrate(700);
			h4.innerText = ''
			gameEnd = false
			location.reload()
		})
	})

}