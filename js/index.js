var stageW = window.innerWidth;
var stageH = window.innerHeight;
var textSize = 200;
var canvasH = textSize + 30;

var canvas = document.createElement('canvas');
canvas.width = stageW;
canvas.height = canvasH;
canvas.style.display = 'none';
document.body.appendChild(canvas);

var ctx = canvas.getContext("2d", {alpha: false});

var input = document.createElement('input');
input.style.opacity = 0;
input.autofocus = true;
document.body.appendChild(input);

var container = document.createElement('div');
container.className = 'container';
document.body.appendChild(container);

var text = document.createElement('h1');
text.innerHTML = 'TYPE';
text.style.fontFamily = 'Arial';
text.style.fontSize = '100px';
text.style.left = '0';
text.style.right = '0';
text.style.textAlign = 'center';
text.style.color = '#f90';
text.style.position = 'absolute';
text.style.top = '50px';
document.body.appendChild(text);

var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
var svgNS = svg.namespaceURI;
svg.setAttribute('x', '0px');
svg.setAttribute('y', '0px');
svg.setAttribute('width', stageW + 'px');
svg.setAttribute('height', stageH + 'px');
svg.setAttribute('viewBox', '0 0 ' + stageW + ' ' + stageH);
container.appendChild(svg);

function createPath (target, width, height, color) {
  var path = document.createElementNS(target, 'path'),
      p1 = Math.round(Math.random() * width),
      p2 = Math.round(Math.random() * height),
      p3 = Math.round(Math.random() * width),
      p4 = Math.round(Math.random() * height);
  path.setAttribute('fill', color);
  path.setAttribute('d', 'M ' + p1 + ' 0 L ' + width + ' ' + p2 + ' ' + p3 + ' ' + height +' 0 ' + p4 + ' Z');
  return path;
}

function findPath(x, y) { 
  var c = svg.children;
  var id = x + '-' + y;
  for (var i = 0; i < c.length; i++) {
    if (c[i].id == id) {
      return true;
    }
  }
  return false;
}

input.addEventListener('keyup', typing);

function typing(e){
  if (e.type == "keyup" && typeof si != 'undefined') clearTimeout(si); // Remove example
  var oldWidth = 0,
      newWidth = 0,
      pixels = [],
      data,
      x, y,
      shapeW = 10,
      shapeH = 10,
      offsetX = 0,
      newPath,
      transition,
      key, k = e || window.event; key = (k.keyCode || k.which),
      charStr = String.fromCharCode(key);

  if(/[a-z0-9]/i.test(charStr) || ( key == 8 || key == 46 )){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.font = textSize + "px Arial";
    ctx.fillStyle = "rgba(255,0,0,1)";
    ctx.textBaseline = "middle";
    ctx.fillText(input.value, 0, canvas.height/2);
    
    data = ctx.getImageData(0, 0, stageW, canvasH).data;
    newWidth = ctx.measureText(input.value).width;
    offsetX = stageW / 2 - newWidth / 2;
    pixels =[];

    for (var i = 0; i < data.length; i += 4) {

      if (data[i] != 0) {
        x = Math.floor((i / 4) % stageW);
        y = Math.floor(Math.floor(i/stageW)/4);

        if ((x && x%8 == 0) && (y && y%8 == 0)) {

          if (!findPath(x,y)) {
            newPath = createPath(svgNS, shapeW, shapeH, "#f90");
            svg.appendChild(newPath);
            transition = 'all ' + (Math.random() * 500 + 500) + 'ms cubic-bezier(0.68, -0.55, 0.265, 1.55)';
            newPath.id = x + '-' + y;
            newPath.style.opacity = 0;
            newPath.style.transform = 'translate(' + stageW/2 + 'px, ' + stageH/2 + 'px)';
            newPath.style.WebkitTransition = transition;
            newPath.style.transition = transition;
          } else {
            newPath = document.getElementById(x + '-' + y);
          }

          pixels.push(x + '-' + y);
          
          setTimeout(function (target, x, y){
            target.style.opacity = Math.random();
            target.style.transform = 'translate(' + (offsetX + x) + 'px, ' + (y - canvasH/2 + stageH/2) + 'px)';
          }, Math.random()*20, newPath, x, y);
          
        }
      }
    }
    if( key == 8 || key == 46 ) {
      var c = svg.children,
          remove = true,
          total = c.length
          p = 0,
          a = 0,
          translateX = '',
          translateY = '',
          delay = 0,
          time = 0;
      for(p = total-1; p >= 0; p--) {
        remove = true;
        for (a = 0; a < pixels.length; a++) {
          if (c[p].id == pixels[a]) {
            remove = false;
            break;
          }
        }
        if (remove) {
          translateX = c[p].style.transform;
          translateX = translateX.substring(translateX.indexOf('(') + 1, translateX.indexOf(','));
          translateY = c[p].style.transform;
          translateY = translateY.substring(translateY.indexOf(',') + 1, translateY.indexOf(')')).replace('px','');
          translateY = Number(translateY) + Math.random() * 100 + 100;
          delay = (total - p);
          time = 500;
          transition = 'all ' + time + 'ms ease-in ' + delay + 'ms';

          c[p].style.WebkitTransition = transition;
          c[p].style.transition = transition;
          c[p].style.opacity = 0;
          c[p].style.transform = 'translate(' + translateX + ', ' + translateY + 'px)';
          setTimeout(function(target){
            svg.removeChild(target);
          },(time+delay), c[p]);
        }
      }
    }
  }
}

window.addEventListener('click', function(){
  input.focus();
});

// Example
var myString = "Type".split(""),
    s = 0,
    si = setInterval(function(){
      if (s < myString.length) {
        var e = {keyCode: 65};
        input.value += myString[s];
        s++;
        typing(e);
      }
    }, 1000);
