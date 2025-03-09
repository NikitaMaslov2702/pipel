// import domtoimage from 'dom-to-image';

let grid = document.querySelector('#grid');
let colors = document.querySelectorAll('.color');
let pixels = [];
let resolution = 8;
let isDrawing = false;
let curColor = 'rgb(0, 0, 0)';
let colorString = ''
let loadColors = []

let button = document.querySelector('#start-btn')
let logo = document.querySelector('.logo')

let editor = document.getElementById('editor-screen')

document.cookie.split('; ').forEach((cookie) => {
    if (cookie.includes('colors=')) {
        loadColors = cookie.replace('colors=', '').split('')
}})

grid.style.gridTemplateRows = 'repeat('+ +resolution + ',' + ((75/resolution).toString()) + 'vh)';
grid.style.gridTemplateColumns = 'repeat('+ +resolution + ',' + ((75/resolution).toString()) + 'vh)';

colors.forEach((color) => {
    color.addEventListener('click', () => {
        curColor = window.getComputedStyle(color).backgroundColor.toString()
    })
})

for (let i=0; i < resolution**2; i++) {
    let newPixel = document.createElement('div')
    newPixel.addEventListener('mousedown', () => {colorPixel(newPixel)})
    newPixel.addEventListener('mouseover', () => {if (isDrawing) {colorPixel(newPixel)}})
    newPixel.classList.add('pixel')
    if (document.cookie.includes('colors=')) {
    newPixel.style.backgroundColor = window.getComputedStyle(colors[loadColors[i]]).backgroundColor
    }
    else {
        newPixel.style.backgroundColor = window.getComputedStyle(colors[8]).backgroundColor
    }
    grid.appendChild(newPixel)
    pixels.push(newPixel)
};

document.addEventListener('mousedown', () => {
    isDrawing = true;
});
document.addEventListener('mouseup', () => {
    isDrawing = false;
});

function colorPixel(pixel) {
    anime({
        targets: pixel,
        backgroundColor: curColor,
        duration: 100,
        easing: 'easeInOutQuad'
    })
}

function setCookie() {
    colorString = ''
    pixels.forEach((pixel) => {
    thisColor = window.getComputedStyle(pixel).backgroundColor.toString()
    colors.forEach((color, index) => {
        colorValue = window.getComputedStyle(color).backgroundColor.toString()
        if (colorValue == thisColor) {
            colorString += index.toString()
    }})})
    document.cookie = 'colors='+colorString+';max-age:' + +(1000*60*60*24)
}

setInterval(setCookie, 1000)

editor.style.display = 'none'

logo.addEventListener('click', function() {
    anime({
        targets: logo,
        rotate: [
            {value: 15},
            {value: -15}
        ],
        duration: 500,
        direction: 'alternate',
        easing: 'easeInOutQuad',
    });
})

button.addEventListener('mouseover', function() {
    anime({
        targets: button,
        scale: 1.1,
        duration: 250,
        easing: 'easeOutQuad',
    });
})

button.addEventListener('mouseout', function() {
    anime({
        targets: button,
        scale: 1,
        duration: 250,
        easing: 'easeOutQuad',
    });
})

button.addEventListener('click', function() {
    anime({
        targets: button,
        scale: 1,
        duration: 100,
        easing: 'easeInQuad',
        direction: 'alternate',
    }).finished.then(
        editor.style.display = 'flex'
    );
})
