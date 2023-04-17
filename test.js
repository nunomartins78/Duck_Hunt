const canvas = document.getElementById('myCanvas');
window.innerWidth = screen.availWidth;
window.innerHeight = screen.availHeight;
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext('2d');

const ducks = [];
const duckImg = new Image();
duckImg.src = 'images/brown_duck.gif';

let mouseX;
let mouseY;

const backgroundImage = new Image();
backgroundImage.src = 'images/background-old.png';


class Duck {
    constructor(x, y, w) {
        this.x = x;
        this.y = y;
        this.previousX = x;
        this.previousY = y;
        this.gooseWidth = w;
        const angle = Math.random() * 2 * Math.PI;
        const speed = 3; // adjust this to change the speed of the ducks
        this.dirx = speed * Math.cos(angle);
        this.diry = speed * Math.sin(angle);

        this.duckDiv = document.createElement('div');
        this.duckDiv.className = 'duck';
        document.body.appendChild(this.duckDiv);

        // Set the initial position of the duck using CSS
        this.duckDiv.style.position = 'absolute';
        this.duckDiv.style.left = x + 'px';
        this.duckDiv.style.top = y + 'px';
        this.duckDiv.style.width = w + 'px';
        this.duckDiv.style.height = w + 'px';

        this.duckImg = document.createElement('img');
        this.duckImg.src = 'images/brown_duck.gif';

        duckAnimation(this.duckImg, this.x, this.y, this.previousX, this.previousY);
        this.duckImg.style.width = this.gooseWidth + 'px';
        this.duckImg.style.height = this.gooseWidth + 'px';

        this.duckDiv.appendChild(this.duckImg);

    }

    move() {
        this.previousX = this.x;
        this.previousY = this.y;
        this.x += this.dirx;
        this.y += this.diry;

        this.duckDiv.style.left = this.x + 'px';
        this.duckDiv.style.top = this.y + 'px';
        duckAnimation(this.duckImg, this.x, this.y, this.previousX, this.previousY);
    }

    falling(){
        this.diry = this.diry;
        this.y = this.diry;
    }

    clickMe(){
        return (dist(mouseX, mouseY, this.x + this.gooseWidth/2, this.y+ this.gooseWidth/2)< this.gooseWidth/2);
    }
    checkEdges() {
        if (this.x > 1850 || this.x < 0) {
            this.dirx = -this.dirx;
        }
        if (this.y > 950|| this.y < 0) {
            this.diry = -this.diry;
        }
    }
    display() {
        // ctx.drawImage(duckImg, this.x, this.y, this.gooseWidth, this.gooseWidth);
    }
}

function duckAnimation(img, x, y, previousX, previousY) {
    if(previousX > x) {
        // img.src = 'images/background-old.png';
        img.style.transform = 'scaleX(-1)';
    } else
        img.style.transform = 'scaleX(1)';
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
        // ducks[i].display();
    }
}

for (let i = 0; i < 20; i++) {
    ducks.push(new Duck(900, 525, 100));
}

addEventListener("mousedown", function (event) {
    mouseX = event.clientX - canvas.offsetLeft;
    mouseY = event.clientY - canvas.offsetTop;
    console.log(mouseX + " & " + mouseY);
    for (var i = ducks.length - 1; i > -1; i--) {
        if (ducks[i].clickMe()) {
            ducks[i].duckDiv.id = 'dead';
            //ducks.splice(i, 1);
            let deadDucks = document.getElementById("dead");
            //deadDucks.remove();
            ducks[i].falling();
            break;
        }
    }
});

setInterval(drawDucks, 10);