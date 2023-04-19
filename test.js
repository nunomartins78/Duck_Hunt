window.innerWidth = screen.availWidth;
window.innerHeight = screen.availHeight;

// const canvas = document.getElementById('myCanvas');
// canvas.width = window.innerWidth;
// canvas.height = window.innerHeight;
// const ctx = canvas.getContext('2d');

const pew = document.getElementById("pewSound");
const dies = document.getElementById("dieSound");
const nuke = document.getElementById("nuke");
const explosion = document.getElementById("explosion");
const volumeThreshold = 1;

let activeRound = 0;

const ducks = [];
const deadDucks = [];

const duckImg = new Image();
duckImg.src = 'images/brown_duck.gif';
const blueDuckImg = new Image();
blueDuckImg.src = 'images/blue_duck.gif';
const redDuckImg = new Image();
redDuckImg.src = 'images/red_duck.gif';
const solidForeground = new Image();
solidForeground.src = 'images/newForeground.png'
const foreground = document.getElementById('foreground');
let score = 0;
let bullets = 0;
const scoreBoard = document.getElementById('scoreBoard');
scoreBoard.innerText = score;
const bulletDisplay = document.getElementById('bulletDisplay');
bulletDisplay.innerText = bullets;
const kaboomBaby = document.getElementById('kaboomBaby');
const dog = document.getElementById('dog');


let randomSky= Math.floor(Math.random() * 3) + 1;
switch (randomSky) {
    case 1:
        document.body.style.backgroundImage = "url('images/sky_day.png')";
        break;
    case 2:
        document.body.style.backgroundImage = "url('images/sky_afternoon.png')";
        break;
    case 3:
        document.body.style.backgroundImage = "url('images/sky_night.png')";
        break;
    default:
        // handle unexpected case
        break;
}

let mouseX;
let mouseY;

class Duck {
    constructor(x, y, w, colour) {
        this.x = x;
        this.y = y;
        this.colour = colour;
        this.previousX = x;
        this.previousY = y;
        this.gooseWidth = w;
        const angle = Math.random() * 2 * Math.PI;

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

        switch (this.colour){
            case "red":
                this.duckImg.src = 'images/red_duck.gif';
                this.speed = 3;
                break;
            case "blue":
                this.duckImg.src = 'images/blue_duck.gif';
                this.speed = 2;
                break;
            case "brown":
                this.duckImg.src = 'images/brown_duck.gif';
                this.speed = 1;
                break;
        }

        this.dirx = this.speed * Math.cos(angle);
        this.diry = this.speed * Math.sin(angle);

        this.duckDies = document.createElement("audio");
        this.duckDies.src = "images/dies.mp3";
        this.duckImg.style.width = this.gooseWidth + 'px';
        this.duckImg.style.height = this.gooseWidth + 'px';

        duckAnimation(this.duckImg, this.x, this.y, this.previousX, this.previousY);


        this.duckDiv.appendChild(this.duckImg);
        this.duckDiv.appendChild(this.duckDies);
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
        this.duckImg.style.width = '65%';
        this.duckImg.style.height = '100%';
        this.diry = -5;
        this.y += -this.diry;
        // this.duckImg.src = 'images/brown_duck_falling.gif';
        this.duckDiv.style.top = this.y + 'px';

    }

    clickMe(){
        return (dist(mouseX, mouseY, this.x + this.gooseWidth/2, this.y+ this.gooseWidth/2)< this.gooseWidth/2);
    }
    checkEdges() {
        if (this.x > 1810 || this.x < 0) {
            this.dirx = -this.dirx;
        }
        if (this.y > 820|| this.y < 0) {
            this.diry = -this.diry;
        }
    }
    checkGround() {
        if (this.y > 820|| this.y < 0) {
            this.duckDiv.remove();
            // deadDucks.splice(0,1);

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
    // ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < ducks.length; i++) {
        ducks[i].move();
        ducks[i].checkEdges();
        // ducks[i].display();
    }
    for (let i = 0; i < deadDucks.length; i++) {
        // deadDucks[i].falling();
        setTimeout(function() {
            deadDucks[i].falling();
        }, 500);

        deadDucks[i].checkGround();
    }
}

function round1 (){
    createDucks(5, "brown");
    bullets = 7;
    bulletDisplay.innerText = bullets;
    activeRound = 1;
}

function round2 (){
    createDucks(5, "brown");
    createDucks(2, "blue");
    bullets = 8;
    bulletDisplay.innerText = bullets;
    activeRound = 2;
}

function round3 (){
    createDucks(5, "brown");
    createDucks(2, "blue");
    createDucks(1, "red");
    bullets = 8;
    bulletDisplay.innerText = bullets;
    activeRound = 3;
}

function round4 (){
    createDucks(4, "brown");
    createDucks(3, "blue");
    createDucks(2, "red");
    bullets = 9;
    bulletDisplay.innerText = bullets;
    activeRound = 4;
}

function round5 (){
    createDucks(2, "brown");
    createDucks(5, "blue");
    createDucks(3, "red");
    bullets = 10;
    bulletDisplay.innerText = bullets;
    activeRound = 5;
}

function finalRound(){
    /* BOSS */

}
function newGame(){
    round1();
}


function createDucks (duckNumber, colour){
    for (let i = 0; i < duckNumber; i++) {
        ducks.push(new Duck(900, 800, 100, colour));
    }
}

document.addEventListener("mousedown", function (event) {
    // mouseX = event.clientX - canvas.offsetLeft;
    // mouseY = event.clientY - canvas.offsetTop;
    // if (event.target.closest("#foreground")) return;
    if (event.target === bulletDisplay) {
        kaboomBaby.style.display="block";
        nuke.play();
        setTimeout(function () {
            kaboomBaby.style.display="none";
            explosion.play();
        }, 1500);
        foreground.style.backgroundImage = "url('images/deadForeground.png')";
        nukeTheBurbs();
        return; // Excludes the excluded div from the event listener
    }

    mouseX = event.clientX ;
    mouseY = event.clientY;
    if (bullets!==0){
        bullets--;
    }
    bulletDisplay.innerText = bullets;
    console.log(mouseX + " & " + mouseY);
    pew.volume = 1;
    pew.play();
    for (let i = ducks.length - 1; i > -1; i--) {
        if (ducks[i].clickMe()) {
            colouredDucks(i);
            setTimeout(function (duckImg, duckDies, duck) {
                switch (duck.colour){
                    case "red":
                        duckImg.src = 'images/red_duck_falling.gif';
                        break;
                    case "blue":
                        duckImg.src = 'images/blue_duck_falling.gif';
                        break;
                    case "brown":
                        duckImg.src = 'images/brown_duck_falling.gif';
                        break;
                };
                pew.volume = 1;
                duckDies.volume = 0.05;
                duckDies.play();
            }, 550, ducks[i].duckImg, ducks[i].duckDies, ducks[i]);
            deadDucks.push(ducks[i]);
            ducks.splice(i, 1);
        }
    }
    endRoundCheck();
});

function endRoundCheck(){
    if (ducks.length <= 0){
        switch (activeRound){
            case 1:
                round2();
                break;
            case 2:
                round3();
                break;
            case 3:
                round4();
                break;
            case 4:
                round5();
                break;
            case 5:
                finalRound();
                break;
        }
    } else if (bullets===0){
        console.log('GAME OVER!');
    } else {
        console.log("continue");
    }
}



pew.addEventListener("timeupdate", function() {
    if (pew.volume < volumeThreshold) {
        pew.volume = 1;
    }
});

function audioVolume() {
    pew.volume = 1;
}

function colouredDucks(i) {
    switch (ducks[i].colour) {
        case "brown":
            ducks[i].duckImg.src = 'images/brown_duck_shot.gif';
            score += 100;
            break;
        case "blue":
            ducks[i].duckImg.src = 'images/blue_duck_shot.png';
            score += 300;
            break;
        case "red":
            ducks[i].duckImg.src = 'images/red_duck_shot.png';
            score += 500;
            break;
    }
    scoreBoard.innerText = score;
    ducks[i].duckDiv.id = 'dead';
}

function nukeTheBurbs() {
    for (let i = 0; i <= ducks.length;) {
        colouredDucks(i);
        setTimeout(function (duckImg, duckDies, ducks) {
            switch (ducks.colour) {
                case "red":
                    duckImg.src = 'images/red_duck_falling.gif';
                    break;
                case "blue":
                    duckImg.src = 'images/blue_duck_falling.gif';
                    break;
                case "brown":
                    duckImg.src = 'images/brown_duck_falling.gif';
                    break;
            };
            pew.volume = 1;
            duckDies.volume = 0.05;
            duckDies.play();
        }, 550, ducks[i].duckImg, ducks[i].duckDies, ducks[i]);
        deadDucks.push(ducks[i]);
        ducks.splice(i, 1);
    }
}

dog.addEventListener('animationend', () => {
    // Add the dogJump animation to the element
    dog.style.animationDelay = '2s';
    dog.style.animation = 'dogJump 5s forwards';
    /*change Z index*/
});


newGame();

setInterval(drawDucks, audioVolume, 10);