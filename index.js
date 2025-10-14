const button = document.getElementById('startButton');
const start = document.getElementById('start');
const games = document.getElementById('games');
const info = document.getElementById('info');
const h2 = document.querySelector('.start');
const h3 = document.getElementById('carge');
const sonido = new Audio('PixelLabContent/audio/power.wav');


button.addEventListener('click', function() {

	sonido.play();

	start.style.backgroundColor = '#222';
	h3.style.display = 'block';
	setTimeout(function() {
		start.style.backgroundColor = '#111';
		h3.style.top = '20px'
	}, 500);
	setTimeout(function() {
		start.style.backgroundColor = '#000';
		h3.style.top = '0';
	}, 1000);
	h2.style.display = 'none';
	button.style.display = 'none';
	setTimeout(function() {
		start.style.display = 'none';
		games.style.display = 'flex';
		info.style.display = 'flex';
}, 1500)
	
});