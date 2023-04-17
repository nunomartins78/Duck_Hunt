const burb = document.getElementById('bird3')

function burbMove() {
    let direction = Math.floor(Math.random() * 4) + 1;
    switch (direction) {
        case 0:
           // burb.style.top = "30%"
            console.log("top")
            break;
        case 1:
            burb.style.right = "5%"
            console.log("right")
            break;
        case 2:
            burb.style.bottom = "5%"
            console.log("bottom")
            break;
        case 3:
            burb.style.left = "5%"
            console.log("left")
            break;
    }
}

setTimeout(burbMove, 500);
setTimeout(burbMove, 1000);
setTimeout(burbMove, 1500);
setTimeout(burbMove, 2000);
setTimeout(burbMove, 2500);