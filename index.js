const c = document.createElement('canvas');
c.width = c.height = 200;
c.style.outline = '1px solid';
const ctx = c.getContext('2d');
ctx.font = "12px Arial";
document.body.appendChild(c);


const {Architect, Trainer} = require('synaptic');

let dots = [];
let myNetwork = new Architect.Perceptron(1, 3, 1);
// let trainer = new Trainer(myNetwork);
let debugdots = [];

function dot(x, y, r = 5) {
    ctx.beginPath();
    ctx.arc(x, 200 - y, r, 0, Math.PI * 2);
    ctx.fill();
}

function draw() {
    ctx.clearRect(0, 0, 200, 200);
    dots.forEach(({
        input, output
    }) => dot(input[0] * 200, 200 - output[0] * 200));
    debugdots.forEach(([x, y]) => dot(x * 200, 200 - y * 200, 2));
    ctx.fillText(dots.length, 5, 10);
}

function update() {
    requestAnimationFrame(update);
    draw();
}

update();

c.onclick = function(event) {
    let x = event.pageX - event.target.offsetLeft;
    let y = event.pageY - event.target.offsetTop;
    dots.push({
        input: [x / 200],
        output: [y / 200]
    });
}

function debug() {
    for (let i = 0; i < 200; i += 10) {
        debugdots.push([i / 200, myNetwork.activate([i / 200])])
    }
}

function train() {
    for (var i = 0; i < 20000; i++) {
        dots.forEach(d => {
            myNetwork.activate(d.input);
            myNetwork.propagate(.12, d.output);
        });
    }
    console.log('--trained');
}

document.getElementById('train').onclick = () => train();
document.getElementById('clear').onclick = () => {
    dots = [];
    debugdots = [];
}
document.getElementById('debug').onclick = () => debug();
