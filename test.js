const canvas = document.getElementById('myCanvas');
canvas.width = 1000;
canvas.height = 1000;
const ctx = canvas.getContext('2d');

const ducks = [];
const duckImg = new Image();
duckImg.src = 'images/flyingDuck.gif';

let mouseX;
let mouseY;

const backgroundImage = new Image();
backgroundImage.src = 'images/background.png';


class Duck {
    constructor(x, y, w) {
        this.x = x;
        this.y = y;
        this.gooseWidth = w;
        this.dirx = Math.random() * 8 - 4;
        this.diry = Math.random() * 8 - 4;
    }

    move() {
        this.x += this.dirx;
        this.y += this.diry;
    }
    clickMe(){
        return (dist(mouseX, mouseY, this.x, this.y)< this.gooseWidth);
    }
    checkEdges() {
        if (this.x > canvas.width || this.x < 0) {
            this.dirx = -this.dirx;
        }
        if (this.y > canvas.height || this.y < 0) {
            this.diry = -this.diry;
        }
    }
    display() {
        // ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
        ctx.drawImage(duckImg, this.x, this.y, this.gooseWidth, this.gooseWidth);
    }
}

function dist(x1, y1, x2, y2) {
    let dx = x2 - x1;
    let dy = y2 - y1;
    return Math.sqrt(dx * dx + dy * dy);
}

function drawDucks() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < ducks.length; i++) {
        ducks[i].move();
        ducks[i].checkEdges();
        ducks[i].display();
    }
}

for (let i = 0; i < 20; i++) {
    ducks.push(new Duck(500, 500, Math.random() * 65 + 10));
}

canvas.addEventListener("mousedown", function (event) {
    mouseX = event.clientX - canvas.offsetLeft;
    mouseY = event.clientY - canvas.offsetTop;
    for (var i = ducks.length - 1; i > -1; i--) {
        if (ducks[i].clickMe()) {
            ducks.splice(i, 1);
            break;
        }
    }
});

setInterval(drawDucks, 10);