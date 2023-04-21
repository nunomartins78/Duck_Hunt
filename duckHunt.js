window.innerWidth = screen.availWidth;
window.innerHeight = screen.availHeight;


const pew = document.getElementById("pewSound");
const dies = document.getElementById("dieSound");
const nuke = document.getElementById("nuke");
const explosion = document.getElementById("explosion");
const volumeThreshold = 1;

let activeRound = 0;

let ducks = [];
let deadDucks = [];
let nextRound = true;
let tIdDog;
const foreground = document.getElementById('foreground');
let score = 0;
let bullets = 0;
const scoreBoard = document.getElementById('scoreBoard');
scoreBoard.innerText = score;
const bulletDisplay = document.getElementById('bulletDisplay');

const kaboomBaby = document.getElementById('kaboomBaby');
const mushroomCloud = document.getElementById('mushroomCloud');
const splashScreen = document.getElementById('splashScreen');
const dog = document.getElementById('dog');
const round = document.getElementById('round');
const gameOver = document.getElementById('gameOver');
gameOver.style.background = "url('images/gameOver.png')";
const restart = document.getElementById('restart');
restart.style.background = "url('images/start.png')";

let mouseX;
let mouseY;

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
class Duck {
    constructor(x, y, w, colour) {
        this.x = x;
        this.y = y;
        this.colour = colour;
        this.previousX = x;
        this.previousY = y;
        this.gooseWidth = w;
        this.tIdBird = 0;
        const angle = Math.random() * 2 * Math.PI;

        this.duckDiv = document.createElement('div');
        this.duckDiv.className = 'duck';
        this.duckDiv.style.position = 'absolute';
        this.duckDiv.style.left = x + 'px';
        this.duckDiv.style.top = y + 'px';
        this.duckDiv.style.width = w + 'px';
        this.duckDiv.style.height = w + 'px';

        this.duckImg = document.createElement('div');
        this.duckImg.style.background =  "url('images/pixelArt.png')";
        this.duckImg.style.backgroundSize = '800% 700%';
        this.duckImg.style.width = this.gooseWidth + 'px';
        this.duckImg.style.height = this.gooseWidth + 'px';
        switch (this.colour){
            case "red":
                clearInterval(this.tIdBird);
                this.speed = 5;
                redBirdFlyingLoop.call(this);
                break;
            case "blue":
                clearInterval(this.tIdBird);
                this.speed = 4;
                blueBirdFlyingLoop.call(this);
                break;
            case "brown":
                clearInterval(this.tIdBird);
                this.speed = 3;
                brownBirdFlyingLoop.call(this);
                break;
        }
        this.dirx = this.speed * Math.cos(angle);
        this.diry = this.speed * Math.sin(angle);

        this.duckDies = document.createElement("audio");
        this.duckDies.src = "sound/dies.mp3";

        document.body.appendChild(this.duckDiv);
        this.duckDiv.appendChild(this.duckImg);
        this.duckDiv.appendChild(this.duckDies);
        //duckOrientation(this.duckImg, this.x, this.y, this.previousX);
    }
    move() {
        this.previousX = this.x;
        this.previousY = this.y;
        this.x += this.dirx;
        this.y += this.diry;
        this.duckDiv.style.left = this.x + 'px';
        this.duckDiv.style.top = this.y + 'px';
        duckOrientation(this.duckImg, this.x, this.y, this.previousX);
    }
    falling(){
        this.diry = -5;
        this.y += -this.diry;
        this.duckDiv.style.top = this.y + 'px';
    }
    clickMe(){
        return (dist(mouseX, mouseY, this.x + this.gooseWidth/2, this.y+ this.gooseWidth/2)< this.gooseWidth/2);
    }
    checkEdges() {
        if (this.x > 1810 || this.x < 0) {
            this.dirx = -this.dirx;
        }
        if (this.y > 780|| this.y < 0) {
            this.diry = -this.diry;
        }
    }
    checkGround() {
        if (this.y > 780|| this.y < 0) {
            this.duckDiv.remove();
        }
    }
}

function duckOrientation(img, x, y, previousX) {
    if(previousX > x) {
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
    for (let i = 0; i < ducks.length; i++) {
        ducks[i].move();
        ducks[i].checkEdges();
    }
    for (let i = 0; i < deadDucks.length; i++) {
        setTimeout(function() {
            deadDucks[i].falling();
        }, 500);

        deadDucks[i].checkGround();
    }
}

function round1 (){
    nextRound = true;
    round.style.display = 'none';
    createDucks(5, "brown");
    bullets = 7;
    bulletDisplay.style.backgroundImage = "url('images/7bullets.png')";
    bulletDisplay.style.width = '160px';
    bulletCount();
    activeRound = 1;
}

function round2 (){
    nextRound = true;
    round.style.display = 'none';
    createDucks(5, "brown");
    createDucks(2, "blue");
    bullets = 8;
    bulletDisplay.style.backgroundImage = "url('images/8bullets.png')";
    bulletDisplay.style.width = '182px';
    bulletCount();
    activeRound = 2;
}

function round3 (){
    nextRound = true;
    round.style.display = 'none';
    createDucks(5, "brown");
    createDucks(2, "blue");
    createDucks(1, "red");
    bullets = 8;
    bulletDisplay.style.backgroundImage = "url('images/8bullets.png')";
    bulletDisplay.style.width = '182px';
    bulletCount();
    activeRound = 3;
}

function round4 (){
    nextRound = true;
    round.style.display = 'none';
    createDucks(4, "brown");
    createDucks(3, "blue");
    createDucks(2, "red");
    bullets = 9;
    bulletDisplay.style.backgroundImage = "url('images/9bullets.png')";
    bulletDisplay.style.width = '204px';
    bulletCount();
    activeRound = 4;
}

function round5 (){
    nextRound = true;
    round.style.display = 'none';
    createDucks(2, "brown");
    createDucks(5, "blue");
    createDucks(3, "red");
    bullets = 10;
    bulletDisplay.style.backgroundImage = "url('images/10bullets.png')";
    bulletDisplay.style.width = '226px';
    bulletCount();
    activeRound = 5;
}

function finalRound(){
    /* BOSS */
    round.style.display = 'none';
    bullets = 10;
    bulletDisplay.style.backgroundImage = "url('images/10bullets.png')";
    bulletDisplay.style.width = '226px';
    bulletCount();

    console.log("END")

}
function newGame(){
    score = 0;
    scoreBoard.innerText = score;
    splashScreen.style.display = "none";
    activeRound = 0;
    for (let i = ducks.length - 1; i > -1; i--){
        ducks[i].duckDiv.remove();
    }
    score = 0;
    ducks = [];
    deadDucks = [];
    gameOver.style.display = "none";
    restart.style.display = "none";
    document.body.style.backgroundImage = "url('images/sky_day.png')";
    round.style.background = "url('images/round1.png')";
    round.style.display = 'block';
    resetDog();
    setTimeout(round1,7000);
}

function createDucks (duckNumber, colour){
    for (let i = 0; i < duckNumber; i++) {
        ducks.push(new Duck(950, 730, 100, colour));
    }
}

document.addEventListener("mousedown", function (event) {
    if (event.target === bulletDisplay) {
        mushroomCloud.style.display = "block";
        kaboomBaby.style.display = "block";
        nuke.play();
        dog.style.display = "none"
        setTimeout(function () {
            kaboomBaby.style.display="none";
            explosion.play();
        }, 1500);
        foreground.style.backgroundImage = "url('images/deadForeground.png')";
        nukeTheBurbs();
        return;
    }

    mouseX = event.clientX ;
    mouseY = event.clientY;
    if (bullets!==0){
        bullets--;
    }
    bulletCount();
    console.log(mouseX + " & " + mouseY);
    pew.volume = 1;
    pew.play();
    let tempDucks = ducks.length;
    for (let i = ducks.length - 1; i > -1; i--) {
        if (ducks[i].clickMe()) {
            shotDucks(i);
            setTimeout(function (duckImg, duckDies, duck) {
                switch (duck.colour){
                    case "red":
                        clearInterval(duck.tIdBird);
                        redBirdFallingLoop.call(duck);
                        break;
                    case "blue":
                        clearInterval(duck.tIdBird);
                        blueBirdFallingLoop.call(duck);
                        break;
                    case "brown":
                        clearInterval(duck.tIdBird);
                        brownBirdFallingLoop.call(duck);
                        break;
                };
                pew.volume = 1;
                duckDies.volume = 0.05;
                duckDies.play();
            }, 550, ducks[i].duckImg, ducks[i].duckDies, ducks[i]);
            deadDucks.push(ducks[i]);
            ducks.splice(i, 1);
            dogDucks();
        } else if (tempDucks === ducks.length) {
            dogLaugh();
        }
    }
    endRoundCheck();
});

function endRoundCheck(){
    if (!nextRound) {
        return;
    }
    if (ducks.length <= 0){
        nextRound = false;
        switch (activeRound){
            case 1:
                document.body.style.backgroundImage = "url('images/sky_day.png')";
                resetDog();
                round.style.display = 'block';
                round.style.background = "url('images/round2.png')";
                setTimeout(round2,7000);
                break;
            case 2:
                round.style.background = "url('images/round3.png')";
                resetDog();
                round.style.display = 'block';
                document.body.style.backgroundImage = "url('images/sky_afternoon.png')";
                setTimeout(round3,7000);
                break;
            case 3:
                round.style.background = "url('images/round4.png')";
                resetDog();
                round.style.display = 'block';
                document.body.style.backgroundImage = "url('images/sky_afternoon.png')";
                setTimeout(round4,7000);
                break;
            case 4:
                round.style.background = "url('images/round5.png')";
                resetDog();
                round.style.display = 'block';
                document.body.style.backgroundImage = "url('images/sky_night.png')";
                setTimeout(round5,7000);
                break;
            case 5:
                round.style.display = 'block';
                round.style.background = "url('images/finalRound.png')";
                document.body.style.backgroundImage = "url('images/sky_night.png')";
                setTimeout(finalRound,7000);
                break;
        }
    } else if (bullets===0){
        gameOver.style.display = "block";
        restart.style.backgroundImage = "url('images/restart.png')";
        restart.style.display = "block";
        restart.style.animation = "fadeIn 2s forwards";
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

function shotDucks(i) {
    switch (ducks[i].colour) {
        case "brown":
            clearInterval(ducks[i].tIdBird);
            ducks[i].duckImg.style.backgroundPosition = '-690px -338px';
            score += 100;
            break;
        case "blue":
            clearInterval(ducks[i].tIdBird);
            ducks[i].duckImg.style.backgroundPosition = '-690px -438px';
            score += 300;
            break;
        case "red":
            clearInterval(ducks[i].tIdBird);
            ducks[i].duckImg.style.backgroundPosition = '-690px -558px';
            score += 500;
            break;
    }
    scoreBoard.innerText = score;
    ducks[i].duckDiv.id = 'dead';
}

restart.addEventListener("mousedown", function(event){
    if (event.target === restart) {
        restart.style.display = 'none';
        gameOver.style.display = 'none';
        newGame();
    }
})


function nukeTheBurbs() {
    for (let i = 0; i <= ducks.length;) {
        shotDucks(i);
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
    clearInterval(tIdDog);
    dogJumpLoop();

    setTimeout(function () {
        dog.style.animation = 'dogJump 2s forwards';

    }, 450)
    setTimeout(function () {
        dog.style.zIndex = "1";
        dog.style.display = "none";
        clearInterval(tIdDog);
    }, 550)
});

function resetDog() {
    clearInterval(tIdDog);
    dogWalkLoop();
    dog.style.display = "block";
    dog.style.zIndex = "3";
    dog.style.animation = 'dogMove 7s forwards';
}
function dogLaugh() {
    clearInterval(tIdDog);
    dogLaughLoop();
    dog.style.display = "block";
    dog.style.animation = 'dogLaugh 3s forwards';
}

function dogDucks() {
    clearInterval(tIdDog);
    document.getElementById("dog").style.backgroundPosition =
        `-1080px -3px`;
    dog.style.display = "block";
    dog.style.animation = 'dogDucks 3s forwards';
}

function dogWalkLoop() {
    let position = 10;
    tIdDog = setInterval ( () => {
            document.getElementById("dog").style.backgroundPosition =
                `-${position}px -3px`;
            if (position < 813)
            { position = position + 205;}
            else
            { position = 205;}
        }, 200);
}
function dogJumpLoop() {
    let position = 10;
    tIdDog = setInterval ( () => {
        document.getElementById("dog").style.backgroundPosition =
            `-${position}px -210px`;
        if (position < 213) {
            position = position + 205;
        } else {
            position = 205;
        }
    }, 220);
}
function dogLaughLoop() {
    let position = 600;
    tIdDog = setInterval ( () => {
        document.getElementById("dog").style.backgroundPosition =
            `-${position}px -210px`;
        if (position < 800) {
            position = position + 205;
        } else {
            position = 600;
        }
    }, 220);
}

function brownBirdFlyingLoop() {
    let position = 0;
    this.tIdBird = setInterval(() => {
        this.duckImg.style.backgroundPosition =
            `-${position}px -330px`;
        if (position < 150) {
            position = position + 93;
        } else {
            position = 0;
        }
    }, 220);
}
function blueBirdFlyingLoop() {
    let position = 0;
    this.tIdBird= setInterval ( () => {
        this.duckImg.style.backgroundPosition =
            `-${position}px -438px`;
        if (position < 150) {
            position = position + 92;
        } else {
            position = 0;
        }
    }, 220);
}

function redBirdFlyingLoop() {
    let position = 0;
    this.tIdBird = setInterval ( () => {
        this.duckImg.style.backgroundPosition =
            `-${position}px -548px`;
        if (position < 150) {
            position = position + 92;
        } else {
            position = 0;
        }
    }, 220);
}

function brownBirdFallingLoop() {
    let position = 350;
    this.tIdBird = setInterval(() => {
        this.duckImg.style.backgroundPosition =
            `-${position}px -338px`;
        if (position < 540) {
            position = position + 83;
        } else {
            position = 350;
        }
    }, 175);
}
function blueBirdFallingLoop() {
    let position = 350;
    this.tIdBird = setInterval(() => {
        this.duckImg.style.backgroundPosition =
            `-${position}px -448px`;
        if (position < 540) {
            position = position + 83;
        } else {
            position = 350;
        }
    }, 175);
}
function redBirdFallingLoop() {
    let position = 350;
    this.tIdBird = setInterval(() => {
        this.duckImg.style.backgroundPosition =
            `-${position}px -558px`;
        if (position < 540) {
            position = position + 83;
        } else {
            position = 350;
        }
    }, 175);
}

function bulletCount() {

    let displayWidth = 93;
    const bulletImages = bulletDisplay.getElementsByTagName('img');
    while (bulletImages.length > 0) {
        bulletDisplay.removeChild(bulletImages[0]);
    }
    for (let i = 0; i < bullets; i++) {
        const bulletImg = document.createElement('img');
        bulletImg.src = 'images/bullet.png';
        bulletDisplay.appendChild(bulletImg);
        // displayWidth += 10;
        // bulletDisplay.style.width = `${displayWidth}px`
    }

}

setInterval(drawDucks, 10);
setInterval(audioVolume, 10);

