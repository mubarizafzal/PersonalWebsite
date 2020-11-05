function makeSVG (tag, attrs) {
  var el = document.createElementNS('http://www.w3.org/2000/svg', tag);
  for (var k in attrs)
      el.setAttribute(k, attrs[k]);
  return el;
}

var w = $("#container").innerWidth();
var h = $("#container").innerHeight();


const numPoints = 20;


var points = [[0,0],[0,h],[w,0],[w,h]];

var arrayX = new Uint32Array(numPoints);
var arrayY = new Uint32Array(numPoints);
window.crypto.getRandomValues(arrayX);
window.crypto.getRandomValues(arrayY);

for (var i = 0; i < numPoints; i++) {
  points.push([arrayX[i] % w, arrayY[i] % h]);
}


var delaunay = Delaunator.from(points);
var triangles = delaunay.triangles;

function getX(i) {
  return (points[i][0]);
}
function getY(i) {
  return (points[i][1]);
}

var canvas = document.getElementById("triangulation");

$("document").ready(function () {
  for (var i = 0; i < triangles.length; i += 3) {
    var spread = 65;
    var lightness = 160;
    var randNum1 = Math.floor(Math.random() * spread + lightness);
    var randNum2 = Math.floor(Math.random() * spread + lightness);
    var randNum3 = Math.floor(Math.random() * spread + lightness);
    var p0 = triangles[i];
    var p1 = triangles[i + 1];
    var p2 = triangles[i + 2];

    var colour = `rgb(${randNum1 },${randNum2 - 10},${randNum2 + 30})`;
    
    

    var poly = makeSVG('polygon', {points: `${getX(p0)},${getY(p0)} ${getX(p1)},${getY(p1)} ${getX(p2)},${getY(p2)}`, fill: colour});
    canvas.appendChild(poly);
  }
});
