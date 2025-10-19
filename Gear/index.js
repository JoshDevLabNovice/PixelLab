const obj = document.getElementById('object');
const leftBotton = document.getElementById('left');
const rightBotton = document.getElementById('right');
const container = document.getElementById('container');
const strong = document.getElementById('strong');
const h3 = document.querySelector('h3');

let puntuacion
//botones
const start = document.getElementById('start');
const stop = document.getElementById('stop');

const recoleccion = "audio/recoleccion.wav";
const sonido = new Audio(recoleccion);
sonido.volume = 0.1;
const musica = "audio/gear.mp3";
const gear = new Audio(musica);
gear.volume = 0.5;
const fin = "audio/explosion.wav";
const finish = new Audio(fin);
fin.volume = 0.5;

let creacionTimeout;
document.addEventListener("DOMContentLoaded", () => {
  //imagen
  const brazo = new Image();
  brazo.src = 'img/brazo.png';
  let brazoCargado = false;

  
  brazo.onload = () => {
    brazoCargado = true;
  };

  //canvas
  var canvas = document.getElementById('canvas');
  var ctx = canvas.getContext('2d');
  let p;
  let o;
  let animacion;
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      jugando = false;       
      cancelAnimationFrame(animacion);
    } else {
      jugando = true;       
      loop();
    }
  });

  stop.addEventListener('click', function() {
    
    finalizado = false;
    puntuacion = 0;
    
    strong.innerHTML = puntuacion;
    cancelAnimationFrame(animacion);
    clearInterval(creacion);
    clearTimeout(creacionTimeout);
    gear.pause();
    gear.currentTime = 0;
    
    start.style.display = 'block';
    container.style.opacity = '0.7';
    if (creacion) clearInterval(creacion);
    if (animacion) cancelAnimationFrame(animacion);

    o = [];
  })
  

  let finalizado = false;

  document.addEventListener('keydown', function(e) {
    if(e.key == "ArrowLeft") {
      if(p.x > 0 ) {
        p.teclaIz = true;
        p.teclaDe = false;
      }
    }
    if(e.key == "ArrowRight") {
      if(p.x < 270 ) {
        p.teclaDe = true;
        p.teclaIz = false;
      } 
    }
  })
  document.addEventListener('keyup', function(e) {
    if(e.key == "ArrowLeft") {
      p.teclaIz = false;
    }
    if(e.key == "ArrowRight") {
      p.teclaDe = false;
    }
  })

  leftBotton.addEventListener('click', function() {
    p.teclaDe = false;
    p.teclaIz = true;
  });

  rightBotton.addEventListener('click', function(e) {
    if(p.x < 270) {
      p.teclaDe = true;
      p.teclaIz = false
    }
  })

  let creacion;
  start.addEventListener('click', function() {
    finalizado = false;
    h3.style.display = 'none';
    start.style.display = 'none';
    container.style.opacity = '1';

    if(gear.currentTime > 0) {
      gear.pause();
      gear.currentTime = 0;
    }
    gear.play();
    gear.loop = true;
  
    puntuacion = 0;
    strong.innerHTML = puntuacion;
    cancelAnimationFrame(animacion);
    clearInterval(creacion);
    clearTimeout(creacionTimeout);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    if (creacion) clearInterval(creacion);
    if (animacion) cancelAnimationFrame(animacion);

    o = [];
    p = new Protag();

    
    loop();
    function creacion() {
      o.push(new Elemento(Math.random() * 250, 0));
    
     
      const tiempo = parseInt(Math.random() * 1500) + 250;
      creacionTimeout = setTimeout(creacion, tiempo);
    }
    
    creacion();
  });
  

  function Protag() {
    this.x = 155;
    this.y = 270;
    this.w = 80;
    this.h = 80;
    this.color = "red";

    this.teclaIz = false;
    this.teclaDe = false;
    this.frameCounter = 0;



    this.dibujo = function() {
      ctx.drawImage(brazo, this.x, this.y, this.w, this.h);
    }

    this.movimiento = function(){ 
        if (this.teclaIz == true) {
          this.frameCounter++;  
          if(this.frameCounter % 5 === 0) { 
            this.x -= 15;                
          }
          if (this.x < 0) this.x = 0;
        }
        if (this.teclaDe == true) {
          this.frameCounter++;  
          if(this.frameCounter % 5 === 0) { 
            this.x += 15;                
          }
          if(this.x + this.w > canvas.width) {
            this.x = canvas.width - this.w;
          } 
        }      
        
    }
  }
  function Elemento() {
        this.x = parseInt(Math.random() * 300);
        this.y = 0;
        this.w = 85;
        this.h = 85;
        this.color = "#888";
        this.frameCounter = 0;
        this.pattern = null;

        this.img = new Image();
        this.img.src = 'img/engranaje.png';

        this.activo = true;
        this.v = 2;

        this.img.onload = () => {
          this.loaded = true;
        }

        this.caer = function() {
          this.frameCounter++;       
          if(this.frameCounter % 5 === 0) { 
            this.y += 20;   
          }
          if(this.y + this.h > canvas.height) {
            this.activo = false;
            gear.pause();
            gear.currentTime = 0;
            finish.play();
            start.style.display = 'block';
            container.style.opacity = '0.7';
            finalizado = true;
            }
        }
        this.dibujo = function() {
          if (this.loaded) {
            ctx.drawImage(this.img, this.x, this.y, this.w, this.h);
          } else {
            ctx.fillStyle = '#888';
            ctx.fillRect(this.x, this.y, this.w, this.h);
          }
        };
      }



  function colision() {
    if(o.length > 0) {
      o.forEach(e => {
    if (e != null && p.x < e.x+e.w && p.x+p.w > e.x
      && p.y < e.y+e.h && p.y+p.h > e.y) {
        console.log("colision");
        sonido.play();
        puntuacion++;
        strong.innerHTML = puntuacion;
        e.activo = false;
      }
    })}};
  
  function loop() {
    if(finalizado == false) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    p.dibujo();
    p.movimiento();
    colision();

    if(o.length > 0) {
      o = o.filter(e => e && e.activo);
      o.forEach(e => {
        e.caer();
        e.dibujo();
      });      
    }
    } else {
      h3.style.display = 'block';
      return console.log('juego finalizado');

    }
    
    animacion = requestAnimationFrame(loop);
  }})


