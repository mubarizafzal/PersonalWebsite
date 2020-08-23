var canvas = document.getElementById('container');
var ctx = canvas.getContext('2d');

var w = canvas.offsetWidth;
var h = canvas.offsetHeight;

var points = [[0,0],[0,h],[w,0],[w,h]];

var arrayX = new Uint32Array(100);
var arrayY = new Uint32Array(100);
window.crypto.getRandomValues(arrayX);
window.crypto.getRandomValues(arrayY);

for (var i = 0; i < 100; i++) {
  points.push([arrayX[i] % w, arrayY[i] % h]);
}


var delaunay = Delaunator.from(points);

canvas.width = w;
canvas.height = h;

function getX(i) {
    return (points[i][0]);
}
function getY(i) {
    return (points[i][1]);
}

function frame() {
    requestAnimationFrame(frame);
    draw();
}
frame();

function draw() {
  
    var triangles = delaunay.triangles;

    ctx.beginPath();
    for (var i = 0; i < triangles.length; i += 3) {
        var p0 = triangles[i];
        var p1 = triangles[i + 1];
        var p2 = triangles[i + 2];
        ctx.moveTo(getX(p0), getY(p0));
        ctx.lineTo(getX(p1), getY(p1));
        ctx.lineTo(getX(p2), getY(p2));
        ctx.closePath();
    }
    ctx.strokeStyle = 'rgb(26, 144, 199)';
    ctx.lineWidth = 1;
    ctx.stroke();
}
