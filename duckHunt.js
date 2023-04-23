window.innerWidth = screen.availWidth;
window.innerHeight = screen.availHeight;

let ducks = [];
let deadDucks = [];
let activeRound = 0;
let score = 0;
let bullets = 0;
let mouseX;
let mouseY;
let tIdDog;
let nextRound = true;
let remainingHealth = 1259;
let chanceOfAmongUs= 0;
let randomSky= Math.floor(Math.random() * 3) + 1;

const gameName = document.getElementById('gameName')
const splashScreen = document.getElementById('splashScreen');
const foreground = document.getElementById('foreground');
const scoreBoard = document.getElementById('scoreBoard');
const bulletDisplay = document.getElementById('bulletDisplay');
const dog = document.getElementById('dog');
const round = document.getElementById('round');
const bigDuck = document.getElementById('bigDuck')
const healthBar = document.getElementById('healthBar');
const health = document.getElementById('health');
const gameOver = document.getElementById('gameOver');
const restart = document.getElementById('restart');
const kaboomBaby = document.getElementById('kaboomBaby');
const mushroomCloud = document.getElementById('mushroomCloud');
const amongUsImage = document.getElementById('amongUs')

const pew = document.getElementById("pewSound");
const nuke = document.getElementById("nuke");
const explosion = document.getElementById("explosion");
const frosty = document.getElementById("frostySound")
const youDied = document.getElementById('youDied');
const bossMusic = document.getElementById('bossMusic');
const ost = document.getElementById('ost');
const volumeThreshold = 1;

restart.style.background = "url('images/start.png')";
scoreBoard.innerText = score;
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
        this.gooseWidth = w;
        this.tIdBird = 0;
        this.duckDiv = document.createElement('div');
        this.duckImg = document.createElement('div');
        this.duckDies = document.createElement("audio");
        const angle = Math.random() * 2 * Math.PI;

        this.duckDiv.className = 'duck';
        this.duckDiv.style.position = 'absolute';
        this.duckDiv.style.left = x + 'px';
        this.duckDiv.style.top = y + 'px';
        this.duckDiv.style.width = w + 'px';
        this.duckDiv.style.height = w + 'px';
        this.duckImg.style.background =  "url('images/pixelArt.png')";
        this.duckImg.style.backgroundSize = '800% 700%';
        this.duckImg.style.width = this.gooseWidth + 'px';
        this.duckImg.style.height = this.gooseWidth + 'px';
        duckFlying.call(this);
        this.dirx = this.speed * Math.cos(angle);
        this.diry = this.speed * Math.sin(angle);
        this.duckDies.src = "sound/dies.mp3";

        document.body.appendChild(this.duckDiv);
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
        duckOrientation(this.duckImg, this.x, this.y, this.previousX);
    }
    falling(){
        this.diry = -5;
        this.y += -this.diry;
        this.duckDiv.style.top = this.y + 'px';
    }
    clickMe(){
        console.log('Checking if click occurred on duck image...');
        return (dist(mouseX, mouseY, this.x + this.gooseWidth/2, this.y+ this.gooseWidth/2)< this.gooseWidth/2);
    }
    checkEdges() {
        if (this.x > 1810 || this.x < 0) {
            this.dirx = -this.dirx;
        }
        if (this.y > 710|| this.y < 0) {
            this.diry = -this.diry;
        }
    }
    checkGround() {
        if (this.y > 710|| this.y < 0) {
            this.duckDiv.remove();
        }
    }
}
function dist(x1, y1, x2, y2) {
    let dx = x2 - x1;
    let dy = y2 - y1;
    return Math.sqrt(dx * dx + dy * dy);
}
function createDucks (duckNumber, colour){
    for (let i = 0; i < duckNumber; i++) {
        ducks.push(new Duck(950, 710, 100, colour));
    }
}
function duckOrientation(img, x, y, previousX) {
    if(previousX > x) {
        img.style.transform = 'scaleX(-1)';
    } else
        img.style.transform = 'scaleX(1)';
}
function duckFlying() {
    switch (this.colour) {
        case "red":
            clearInterval(this.tIdBird);
            this.speed = 5;
            this.tIdBird = animation(0, 548, this.tIdBird, this.duckImg, 150, 92, 0);
            break;
        case "blue":
            clearInterval(this.tIdBird);
            this.speed = 4;
            this.tIdBird = animation(0, 438, this.tIdBird, this.duckImg, 150, 92, 0);
            break;
        case "brown":
            clearInterval(this.tIdBird);
            this.speed = 3;
            this.tIdBird = animation(0, 330, this.tIdBird, this.duckImg, 150, 93, 0);
            break;
    }
}
function shotDucks(i) {
    amongUs();
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
function fallingDucks(duck) {
    switch (duck.colour) {
        case "red":
            clearInterval(duck.tIdBird);
            this.tIdBird = animation(350, 558, duck, duck.duckImg, 540, 83, 350);
            break;
        case "blue":
            clearInterval(duck.tIdBird);
            this.tIdBird = animation(350, 448, duck, duck.duckImg, 540, 83, 350);
            break;
        case "brown":
            clearInterval(duck.tIdBird);
            duck.tIdBird = animation(350, 338, duck, duck.duckImg, 540, 83, 350);
            break;
    };
}
function nukeTheBurbs() {
    for (let i = 0; i <= ducks.length;) {
        shotDucks(i);
        setTimeout(function (duckImg, duckDies, ducks) {
            fallingDucks(ducks);
            pew.volume = 1;
            duckDies.volume = 0.05;
            duckDies.play();
        }, 550, ducks[i].duckImg, ducks[i].duckDies, ducks[i]);
        deadDucks.push(ducks[i]);
        ducks.splice(i, 1);
    }
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
    bossMusic.play()
    foreground.style.pointerEvents = 'none';
    round.style.display = 'none';
    bullets = 10;
    bulletDisplay.style.backgroundImage = "url('images/10bullets.png')";
    bulletDisplay.style.width = '226px';
    healthBar.style.display = 'block';
    health.style.display = 'block';
    bigDuck.style.display = 'block';
    bigDuck.style.animation = 'boss 30s forwards';
    bulletCount();
}
function newGame(){
    youDied.pause();
    youDied.currentTime = 0;
    score = 0;
    scoreBoard.innerText = score;
    splashScreen.style.display = "none";
    gameName.style.display = 'none';
    bigDuck.style.display = 'none'
    bigDuck.style.zIndex = '0';
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
    ost.src = "sound/nextRound.mp3";
    ost.loop = false;
    ost.play();
    resetDog();
    setTimeout(round1,8000);
}
function amongUs(){
    chanceOfAmongUs = Math.random()*100;
    if (chanceOfAmongUs >=95){
        amongUsImage.style.display = 'block';
        frosty.play();
        setTimeout(function() {
            document.getElementById('amongUs').style.display = 'none';
        }, 1000);
    }
}
function audioVolume() {
    pew.volume = 1;
}
function triggerNuke() {
    mushroomCloud.style.display = "block";
    kaboomBaby.style.display = "block";
    nuke.play();
    dog.style.display = "none"
    setTimeout(function () {
        kaboomBaby.style.display = "none";
        explosion.play();
    }, 1500);
    foreground.style.backgroundImage = "url('images/deadForeground.png')";
    nukeTheBurbs();
    return;
}
function bigDuckHitRegistration() {
    remainingHealth = remainingHealth - 20;
    health.style.width = remainingHealth + 'px';
    bigDuck.style.backgroundImage = "url('images/stabby_duck_mad.png')";
    setTimeout(function () {
        bigDuck.style.backgroundImage = "url('images/stabby_duck.png')";

    }, 500);
    pew.play();
}
function newRound() {
    round.style.display = 'block';
    ost.src = "sound/nextRound.mp3";
    ost.play();
    resetDog();
}
function endRoundCheck(){
    if (!nextRound) {
        return;
    }
    if (ducks.length <= 0){
        nextRound = false;
        switch (activeRound){
            case 1:
                document.body.style.backgroundImage = "url('images/sky_day.png')";
                round.style.background = "url('images/round2.png')";
                newRound();
                setTimeout(round2,8000);
                break;
            case 2:
                document.body.style.backgroundImage = "url('images/sky_afternoon.png')";
                round.style.background = "url('images/round3.png')";
                newRound();
                setTimeout(round3,8000);
                break;
            case 3:
                document.body.style.backgroundImage = "url('images/sky_afternoon.png')";
                round.style.background = "url('images/round4.png')";
                newRound();
                setTimeout(round4,8000);
                break;
            case 4:
                document.body.style.backgroundImage = "url('images/sky_night.png')";
                round.style.background = "url('images/round5.png')";
                newRound();
                setTimeout(round5,8000);
                break;
            case 5:
                document.body.style.backgroundImage = "url('images/sky_night.png')";
                round.style.background = "url('images/finalRound.png')";
                newRound();
                setTimeout(finalRound,8000);
                break;
        }
    } else if (bullets===0){
        ost.src = "sound/gameOver.mp3";
        ost.play();
        gameOver.style.backgroundImage = "url('images/gameOver.png')";
        gameOver.style.display = "block";
        restart.style.backgroundImage = "url('images/restart.png')";
        restart.style.display = "block";
        restart.style.animation = "fadeIn 2s forwards";
    } else {
        console.log("continue");
    }
}

window.onload = function() {
    ost.src = "sound/intro.mp3";
    ost.loop = true;
    ost.play();
}
document.addEventListener("mousedown", function (event) {
    if (event.target === bulletDisplay) {triggerNuke();}
    if (event.target === bigDuck) {
        if (bullets===0){return;}
        bigDuckHitRegistration();
    }
    if (event.target === restart) {return;}
    mouseX = event.clientX ;
    mouseY = event.clientY;
    if (bullets!==0){bullets--;}
    bulletCount();
    console.log(mouseX + " & " + mouseY);
    if (bigDuck.style.display === 'block' && bullets <= '0') {return;}
    pew.volume = 1;
    pew.play();
    let tempDucks = ducks.length;
    for (let i = ducks.length - 1; i > -1; i--) {
        console.log('check');
        if (ducks[i].clickMe()) {
            shotDucks(i);
            setTimeout(function (duckImg, duckDies, duck) {
                fallingDucks(duck);
                duckDies.volume = 0.05;
                duckDies.play();
                pew.volume = 1;
            }, 550, ducks[i].duckImg, ducks[i].duckDies, ducks[i]);
            deadDucks.push(ducks[i]);
            ducks.splice(i, 1);
            dogDucks();
        }
    }
    if (tempDucks === ducks.length) {dogLaugh();}
    endRoundCheck();
});

pew.addEventListener("timeupdate", function() {
    if (pew.volume < volumeThreshold) {
        pew.volume = 1;
    }
});
restart.addEventListener("mousedown", function(event){
    if (event.target === restart) {
        restart.style.display = 'none';
        gameOver.style.display = 'none';
        newGame();
    }
})
dog.addEventListener('animationend', () => {
    if(dog.style.animationName === 'dogMove') {
        clearInterval(tIdDog);
        ost.src = "sound/dogBark.mp3";
        ost.play();
        tIdDog = animation(10,210, tIdDog, dog, 213,205,205);

        setTimeout(function () {
            dog.style.animation = 'dogJump 2s forwards';

        }, 450)
        setTimeout(function () {
            dog.style.zIndex = "1";
            dog.style.display = "none";
            round.style.display = 'none';
            clearInterval(tIdDog);
        }, 1000)
        return;
    }
    dog.style.display = "none";
    clearInterval(tIdDog);
});
bigDuck.addEventListener('animationend', () => {
    bigDuck.style.zIndex = '3';
    bigDuck.style.top = '220px';
    ost.src = "sound/slash.mp3";
    ost.play();
    kaboomBaby.style.backgroundImage = "url('images/slash.gif')";
    kaboomBaby.style.display = 'block';
    setTimeout(function() {
        kaboomBaby.style.backgroundImage = "url('images/flash.gif')";
        foreground.style.pointerEvents = 'all';
        kaboomBaby.style.display = 'none';
        gameOver.style.backgroundImage = "url('images/you_died.gif')";
        gameOver.style.display = "block";
        healthBar.style.display = 'none';
        health.style.display = 'none';
        remainingHealth = 1259;
        health.style.width = remainingHealth + 'px';
        setTimeout(function() {
            restart.style.backgroundImage = "url('images/restart.png')";
            restart.style.display = "block";
        }, 3000);
        bossMusic.pause();
        bossMusic.currentTime = 0;
        youDied.play();
    }, 4500);
});

function bulletCount() {
    const bulletImages = bulletDisplay.getElementsByTagName('img');
    while (bulletImages.length > 0) {
        bulletDisplay.removeChild(bulletImages[0]);
    }
    for (let i = 0; i < bullets; i++) {
        const bulletImg = document.createElement('img');
        bulletImg.src = 'images/bullet.png';
        bulletDisplay.appendChild(bulletImg);
    }
}
function resetDog() {
    clearInterval(tIdDog);
    tIdDog = animation(10,3, tIdDog, dog, 813,205,205);
    dog.style.display = "block";
    dog.style.zIndex = "3";
    dog.style.animation = 'dogMove 7s forwards';
}
function dogLaugh() {
    ost.src = "sound/dogLaugh.mp3";
    ost.play();
    clearInterval(tIdDog);
    tIdDog = animation(600,210, tIdDog, dog, 800,205,600);
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
function animation(positionY, positionX, intervalId, target, maxPosition, incrementalPosition, resetPosition) {
    let position = positionY;
    intervalId = setInterval ( () => {
        target.style.backgroundPosition =
            `-${position}px -${positionX}px`;
        if (position < maxPosition) {
            position = position + incrementalPosition;
        } else {
            position = resetPosition;
        }
    }, 200);
    return intervalId;
}

setInterval(drawDucks, 10);
setInterval(audioVolume, 10);