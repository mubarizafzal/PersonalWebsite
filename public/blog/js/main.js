
var w = $("#container").innerWidth();
var h = $("#container").innerHeight();


const numPoints = 50;


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

$("document").ready(function () {
  for (var i = 0; i < triangles.length; i += 3) {
    var p0 = triangles[i];
    var p1 = triangles[i + 1];
    var p2 = triangles[i + 2];
    var newTriangle = $(`<polygon points='${getX(p0)},${getY(p0)} ${getX(p1)},${getY(p1)} ${getX(p2)},${getY(p2)}'></polygon>`);
    $("#container").append(newTriangle);
  }
});

$("#container").append("<p>why</p>");
