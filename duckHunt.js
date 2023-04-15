function randomValue(min, max){
    return Math.floor(Math.random()*(min-max+1))+min+'%';
}

// let right10 = Math.random() * 100 + '%';
// let bottom10 = Math.random() * 100 + '%';
// let right30 = Math.random() * 100 + '%';
// let bottom30 = Math.random() * 100 + '%';
// let right50 = Math.random() * 100 + '%';
// let bottom50 = Math.random() * 100 + '%';
// let right70 = Math.random() * 100 + '%';
// let bottom70 = Math.random() * 100 + '%';
// let right90 = Math.random() * 100 + '%';
// let bottom90 = Math.random() * 100 + '%';
// let right100 = Math.random() * 100 + '%';
// let bottom100 = Math.random() * 100 + '%';

document.documentElement.style.setProperty('--random-right-10', randomValue(0,90));
document.documentElement.style.setProperty('--random-bottom-10', randomValue(0,90));
document.documentElement.style.setProperty('--random-right-30', randomValue(0,90));
document.documentElement.style.setProperty('--random-bottom-30', randomValue(0,90));
document.documentElement.style.setProperty('--random-right-50', randomValue(0,90));
document.documentElement.style.setProperty('--random-bottom-50', randomValue(0,90));
document.documentElement.style.setProperty('--random-right-70', randomValue(0,90));
document.documentElement.style.setProperty('--random-bottom-70', randomValue(0,90));
document.documentElement.style.setProperty('--random-right-90', randomValue(0,90));
document.documentElement.style.setProperty('--random-bottom-90', randomValue(0,90));
document.documentElement.style.setProperty('--random-right-100', randomValue(0,90));
document.documentElement.style.setProperty('--random-bottom-100', randomValue(0,90));

document.getElementById("bird1").style.animation = "bird1 3s infinite";
