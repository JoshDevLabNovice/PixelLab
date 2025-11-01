const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const start = document.getElementById('start');
const container = document.getElementById('container');
const strong = document.getElementById('strong');
let puntaje;
let snake;
let apple;
let part;
let body = []
let shouldGrow = false;
let finished = false;
//audios
const song = new Audio("audio/snakeSong.wav")
const eat = new Audio("audio/eat.wav");
const lose = new Audio("audio/lose.wav");
eat.volume = 0.2;

const textureImg = new Image();
textureImg.src = 'img/body.png';

let texturePattern = null;

textureImg.onload = function() {
    texturePattern = ctx.createPattern(textureImg, 'repeat');
};

const head = new Image();
head.src = 'img/snake.png';

let headSnake = null;

const appleImg = new Image();
appleImg.src = 'img/apple.png';

let appleTexture = null;

textureImg.onload = function() {
    appleTexture = ctx.createPattern(appleImg, 'repeat');
};

textureImg.onload = function() {
    headSnake = ctx.createPattern(head, 'repeat');
};
window.onload = function() {
    start.addEventListener('click', function() {
    song.loop = true;
    song.play();
    container.style.opacity = '1';
    start.style.display = 'none';
    puntaje = 0;
    body = []
    finished = false;
    shouldGrow = false;
    snake  = new Snake();
    body.unshift(snake);
    apple = new Apple();
    
    console.log(body)
    loop();
})}

function Snake() {
    this.x = 35;
    this.y = 35;
    this.w = 35;
    this.h = 35;
    this.color = 'green';
    this.intervalR = null;
    this.intervalL = null;
    this.intervalU = null;
    this.intervalD = null;
    this.direction = null;

    this.draw = function() {
    if (textureImg.complete) {
        if (this.direction == null || this.direction == 'right') drawRotatedImage(head, this.x, this.y, this.w, this.h, 0);
        else if (this.direction == 'down') drawRotatedImage(head, this.x, this.y, this.w, this.h, 90);
        else if (this.direction == 'left') drawRotatedImage(head, this.x, this.y, this.w, this.h, 180);
        else if (this.direction == 'up') drawRotatedImage(head, this.x, this.y, this.w, this.h, 270);
    } else {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.w, this.h);
    }
}
    this.motionR =  function() {
        if (this.x < (canvas.width - this.w) && this.direction !== 'left') {
            if (this.intervalL) {
            clearInterval(this.intervalL);
            this.intervalL = null;
        }
            if (this.intervalU) {
            clearInterval(this.intervalU);
            this.intervalU = null;
        }
            if (this.intervalD) {
            clearInterval(this.intervalD);
            this.intervalD = null;
        }
            updateBody();
            this.direction = 'right';
            this.x = this.x + 35;
        } else {
        finished = true;
        song.pause();
        song.currentTime = 0;
        lose.play();
        container.style.opacity = 0.8;
        start.style.display = 'block';
        clearInterval(this.intervalR);
        this.intervalR = null;
    }
        
    }
    this.motionL =  function() {
        if (this.x > 0 && this.direction !== 'right') {
            if (this.intervalR) {
            clearInterval(this.intervalR);
            this.intervalR = null;
        }
            if (this.intervalU) {
            clearInterval(this.intervalU);
            this.intervalU = null;
        }
            if (this.intervalD) {
            clearInterval(this.intervalD);
            this.intervalD = null;
        }
            updateBody();
            this.direction = 'left';
            this.x = this.x - 35;
        } else {
        finished = true;
        song.pause();
        song.currentTime = 0;
        lose.play();
        container.style.opacity = 0.8;
        start.style.display = 'block';
        clearInterval(this.intervalL);
        this.intervalL = null;
        
    }}
    this.motionU =  function() {
        if (this.y > 0 && this.direction !== 'down') {
            if (this.intervalL) {
            clearInterval(this.intervalL);
            this.intervalL = null;
        }
            if (this.intervalR) {
            clearInterval(this.intervalR);
            this.intervalR = null;
        }
            if (this.intervalD) {
            clearInterval(this.intervalD);
            this.intervalD = null;
        }
            updateBody();
            this.direction = 'up';
            this.y = this.y - 35;
        } else {
        finished = true;
        song.pause();
        song.currentTime = 0;
        lose.play();
        container.style.opacity = 0.8;
        start.style.display = 'block';
        clearInterval(this.intervalU);
        this.intervalU = null;
    }
    }
    this.motionD =  function() {
        if (this.y < (canvas.height - this.h) && this.direction !== 'up') {
           if (this.intervalL) {
            clearInterval(this.intervalL);
            this.intervalL = null;
        }
            if (this.intervalU) {
            clearInterval(this.intervalU);
            this.intervalU = null;
        }
            if (this.intervalR) {
            clearInterval(this.intervalR);
            this.intervalR = null;
        }
            updateBody();
            this.direction = 'down';
            this.y = this.y + 35;
        } else {
        finished = true;
        song.pause();
        song.currentTime = 0;
        lose.play();
        container.style.opacity = 0.8;
        start.style.display = 'block';
        clearInterval(this.intervalD);
        this.intervalD = null;
        
    }
    }
}


function loop() {
    if(!finished) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    apple.draw();
 
    body.forEach(e => {
        e.draw()
    })
        body.slice(1).forEach((parts) => {
        if (snake.x < parts.x + parts.w &&
        snake.x + snake.w > parts.x &&
        snake.y < parts.y + parts.h &&
        snake.y + snake.h > parts.y) {
            console.log(parts)
            console.log('canibalimso')
            finished = true;
            song.pause();
            song.currentTime = 0;
            if(snake.intervalD != null) clearInterval(snake.intervalD);
            if(snake.intervalU != null) clearInterval(snake.intervalU);
            if(snake.intervalL != null) clearInterval(snake.intervalL);
            if(snake.intervalR != null) clearInterval(snake.intervalR);
            lose.play();
            container.style.opacity = 0.8;
            start.style.display = 'block';

        }
    })
    collision();
    requestAnimationFrame(loop);
    } else {
        console.log('finished');
    }
    
}


//movimiento

window.addEventListener('keydown', function(e) {
    event.preventDefault();
       if (
        (e.key === "ArrowRight" && snake.direction === 'left') ||
        (e.key === "ArrowLeft" && snake.direction === 'right') ||
        (e.key === "ArrowUp" && snake.direction === 'down') ||
        (e.key === "ArrowDown" && snake.direction === 'up')
    ) {
        return; // no cambiar dirección
    }
    clearInterval(snake.intervalR);
    clearInterval(snake.intervalL);
    clearInterval(snake.intervalU);
    clearInterval(snake.intervalD);
    snake.intervalR = null;
    snake.intervalL = null;
    snake.intervalU = null;
    snake.intervalD = null;

    if (e.key === "ArrowRight") {
        if (snake.intervalR === null && finished == false) {
            snake.intervalR = setInterval(() => snake.motionR(), 300);
        }
}


    if (e.key === "ArrowLeft") {
        if (snake.intervalL === null && finished == false) {
            snake.intervalL = setInterval(() => snake.motionL(), 300);
        }
    }

    if (e.key === "ArrowUp") {
        if (snake.intervalU === null && finished == false) {
                snake.intervalU = setInterval(() => snake.motionU(), 300);
            }
    }
    if (e.key === "ArrowDown") {
        if (snake.intervalD === null && finished == false) {
                snake.intervalD = setInterval(() => snake.motionD(), 300);
            }
    }
})


function move(direction) {
    const e = { key: '' };

    switch (direction) {
        case 'up':    e.key = 'ArrowUp'; break;
        case 'down':  e.key = 'ArrowDown'; break;
        case 'left':  e.key = 'ArrowLeft'; break;
        case 'right': e.key = 'ArrowRight'; break;
    }

    window.dispatchEvent(new KeyboardEvent('keydown', e));
}

// manzana

function isOnSnake(x, y) {
    return body.some(segment => segment.x === x && segment.y === y);
}

function Apple() {
    this.w = 35;
    this.h = 35;
    this.color = 'red';
      this.place = function() {
        do {
            this.x = parseInt(Math.random() * 10) * 35;
            this.y = parseInt(Math.random() * 10) * 35;
        } while (isOnSnake(this.x, this.y));
    };

    this.place();
    this.draw = function() {
    if (appleImg.complete) {
        ctx.drawImage(appleImg, this.x, this.y, this.w, this.h);
    } else {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.w, this.h);
    }
}

}

function collision() {
    if(snake.x < apple.x + apple.w && snake.x+snake.w > apple.x
        && snake.y < apple.y + apple.h && snake.y + snake.h > apple.y) {
            console.log("colision")
            puntaje++;
            eat.play();
            shouldGrow = true;
            console.log(body)
            console.log("Puntaje: " + puntaje);
            strong.innerText = puntaje;
            apple.place();
        }
};

function Part() {
    this.x = 0;
    this.y = 0;
    this.w = 35;
    this.h = 35;
    this.color = 'green';

    this.draw = function() {
    if (textureImg.complete) {
        ctx.drawImage(textureImg, this.x, this.y, this.w, this.h);
    } else {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.w, this.h);
    }
}

}

function updateBody() {
            if (finished) return;

        for (let i = body.length - 1; i > 0; i--) {
        body[i].x = body[i - 1].x;
        body[i].y = body[i - 1].y;
    }
    if (shouldGrow) {
    let last = body[body.length - 1];
    let newPart = new Part();
    newPart.x = last.x;
    newPart.y = last.y;
    body.push(newPart);
    shouldGrow = false;
}
    if (body.length === 100) {
            finished = true;
            song.pause();
            song.currentTime = 0;
            start.style.display = 'block';
            return alert("¡Ganaste! La serpiente llenó todo el tablero.");
        }
}

function drawRotatedImage(img, x, y, w, h, angleDegrees) {
    const angleRadians = angleDegrees * Math.PI / 180;

    ctx.save();
    ctx.translate(x + w / 2, y + h / 2);
    ctx.rotate(angleRadians);
    ctx.drawImage(img, -w / 2, -h / 2, w, h);
    ctx.restore();
}
