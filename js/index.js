function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function not(v) {
  if (v === null) return true;
  return typeof v === "undefined";
}

function getRandomColor(greyscale) {
  var c = ((1 << (greyscale ? 8 : 24)) * Math.random() | 0).toString(16);
  return "#" + (greyscale ? c + c + c : c);
}

var stageW = window.innerWidth;
var stageH = window.innerHeight;
var textSize = 200;
var canvasH = textSize + 30;

var input = document.createElement('input');
input.style.opacity = 0;
input.style.position = 'absolute';
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

var lightText = document.createElementNS(svgNS, 'filter');
lightText.id = 'lightText';
svg.appendChild(lightText);

var feDiffuseLighting = document.createElementNS(svgNS, 'feDiffuseLighting');
feDiffuseLighting.setAttribute('in', 'SourceGraphic');
feDiffuseLighting.setAttribute('result', 'light');
feDiffuseLighting.setAttribute('lighting-color', 'white');
lightText.appendChild(feDiffuseLighting);

var fePointLight = document.createElementNS(svgNS, 'fePointLight');
fePointLight.setAttribute('x', '0');
fePointLight.setAttribute('y', '0');
fePointLight.setAttribute('z', '150');
feDiffuseLighting.appendChild(fePointLight);

var feComposite = document.createElementNS(svgNS, 'feComposite');
feComposite.setAttribute('in', 'SourceGraphic');
feComposite.setAttribute('in2', 'light');
feComposite.setAttribute('operator', 'arithmetic');
feComposite.setAttribute('k1', '1');
feComposite.setAttribute('k2', '0');
feComposite.setAttribute('k3', '0');
feComposite.setAttribute('k4', '0');
lightText.appendChild(feComposite);

var shadowText = document.createElementNS(svgNS, 'filter');
shadowText.id = 'shadowText';
shadowText.setAttribute('x', '-200%');
shadowText.setAttribute('y', '-200%');
shadowText.setAttribute('width', '400%');
shadowText.setAttribute('height', '400%');
svg.appendChild(shadowText);

var feOffset = document.createElementNS(svgNS, 'feOffset');
feOffset.setAttribute('result', 'offOut');
feOffset.setAttribute('in', 'SourceGraphic');
feOffset.setAttribute('dx', '0');
feOffset.setAttribute('dy', '0');
shadowText.appendChild(feOffset);

var feColorMatrix = document.createElementNS(svgNS, 'feColorMatrix');
feColorMatrix.setAttribute('result', 'matrixOut');
feColorMatrix.setAttribute('in', 'offOut');
feColorMatrix.setAttribute('type', 'matrix');
feColorMatrix.setAttribute('values', '0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.7 0');
shadowText.appendChild(feColorMatrix);

var feGaussianBlur = document.createElementNS(svgNS, 'feGaussianBlur');
feGaussianBlur.setAttribute('result', 'blurOut');
feGaussianBlur.setAttribute('in', 'matrixOut');
feGaussianBlur.setAttribute('stdDeviation', '0');
shadowText.appendChild(feGaussianBlur);

var feBlend = document.createElementNS(svgNS, 'feBlend');
feBlend.setAttribute('in', 'SourceGraphic');
feBlend.setAttribute('in2', 'blurOut');
feBlend.setAttribute('mode', 'normal');
shadowText.appendChild(feBlend);

var group = document.createElementNS(svgNS, 'g');
group.id = 'groupText';
group.setAttribute('filter', 'url(#shadowText)');
svg.appendChild(group);

var Path = function() {
  function Path(target, type, width, height, color){
    _classCallCheck(this, Path);

    if (not(target)) {
      console.log('Path: target is missing.');
      return;
    }
    if (not(type)) type = 'polygon';
    if (not(width)) width = 10;
    if (not(height)) height = 10;
    if (not(color)) color = 'orange';

    this.path = document.createElementNS(target, 'path');

    switch (color) {
      case 'orange':
        color = '#f90';
        break;
      case 'greyscale':
        color = getRandomColor(true);
        break;
      case 'random':
        color = getRandomColor();
        break;
    }

    if (type == 'circle') {
      w1 = w2 = h1 = h2 = Math.random() * (width / 2);
      q1 = w1 * 0.06;
      q2 = w1 * 0.94;
      w = h = w1 * 2;
    } else {
      w1 = Math.random() * width;
      w2 = Math.random() * width;
      h1 = Math.random() * height;
      h2 = Math.random() * height;
      w = width;
      h = height;
      q1 = q2 = 0;
    }

    this.path.setAttribute('fill', color);
    this.path.setAttribute('d', 'M 0 ' + h1 + ' q ' + q1 + ' ' + (-q2) + ' ' + w1 + ' ' + (-h1) + ' q ' + q2 + ' ' + q1 + ' ' + (w - w1) + ' ' + h2 + ' q ' + (-q1) + ' ' + q2 + ' ' + (-w2) + ' ' + (h - h2) + ' q ' + (-q2) + ' ' + (-q1) + ' ' + (w2 - w) + ' ' + (h1 - h));

    var transition = 'all ' + (Math.random() * 500 + 500) + 'ms cubic-bezier(0.68, -0.55, 0.265, 1.55)';
    this.path.style.WebkitTransition = transition;
    this.path.style.transition = transition;
  
    return this.path;
  }

  return Path;
}();

var Canvas = function(){
  function Canvas(width, height) {
    _classCallCheck(this, Canvas);

    if (not(width)) width = window.innerWidth;
    if (not(height)) height = window.innerHeight;

    this.canvas = document.createElement('canvas');
    this.canvas.width = width;
    this.canvas.height = height;
    this.canvas.style.display = 'none';
    document.body.appendChild(this.canvas);

    this.ctx = this.canvas.getContext("2d", {alpha: false});
  }

  Canvas.prototype.clear = function clear() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  };

  Canvas.prototype.text = function text(string, textSize, font, color, x, y, baseline) {
    this.clear();
    if (not(string)) {
      console.log('Canvas.text: string is missing.');
      return;
    }
    if (not(textSize)) textSize = 100;
    if (not(font)) font = 'Arial';
    if (not(color)) color = '#f00';
    if (not(x)) x = 0;
    if (not(y)) y = this.canvas.height / 2;
    if (not(baseline)) baseline = 'middle';
    this.ctx.font = textSize + "px " + font;
    this.ctx.fillStyle = color;
    this.ctx.textBaseline = baseline;
    this.ctx.fillText(string, x, y);

    this.text.width = this.ctx.measureText(string).width;
  };

  Canvas.prototype.getData = function getData(){
    return this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height).data;
  };

  return Canvas;
}();

function findPath(x, y) {
  var c = group.children;
  var id = x + '-' + y;
  for (var i = 0; i < c.length; i++) {
    if (c[i].id == id) {
      return true;
    }
  }
  return false;
}

function movePath(target, x, y){
  target.style.opacity = Math.random();
  target.style.transform = 'translate(' + x + 'px, ' + y + 'px)';
}

function removePath(target){
  group.removeChild(target);
}

input.addEventListener('keyup', typing);

var canvas = new Canvas(stageW, canvasH);

var color = 'orange',
    from = 'center',
    type = 'polygon',
    dropShadow = 'true',
    light = 'true',
    spotlight = 'true';

function typing(e){
  if (e.type == "keyup" && typeof si != 'undefined') clearTimeout(si); // Remove example
  var oldWidth = 0,
      newWidth = 0,
      pixels = [],
      data,
      x, y,
      shapeW = 10,
      shapeH = 10,
      startX = stageW/2,
      startY = stageH/2,
      offsetX = 0,
      newPath,
      transition,
      key, k = e || window.event; key = (k.keyCode || k.which),
      charStr = String.fromCharCode(key);

  if(/[a-z0-9]/i.test(charStr) || ( key == 8 || key == 46 )){
    canvas.text(input.value, textSize);
    
    data = canvas.getData();
    newWidth = canvas.text.width;
    offsetX = stageW / 2 - newWidth / 2;
    pixels =[];

    for (var i = 0; i < data.length; i += 4) {

      if (data[i] !== 0) {
        x = Math.floor((i / 4) % stageW);
        y = Math.floor(Math.floor(i/stageW)/4);

        if ((x && x%8 === 0) && (y && y%8 === 0)) {

          if (!findPath(x,y)) {
            newPath = new Path(svgNS, type, shapeW, shapeH, color);
            group.appendChild(newPath);
            if (from == 'border') {
              switch (Math.floor(Math.random() * 2)) {
                case 1:
                  startX = Math.round(Math.random()) * stageW;
                  startY = Math.random() * stageH;
                  break;
                case 2:
                  startX = Math.random() * stageW;
                  startY = Math.round(Math.random()) * stageH;
                  break;
              }
            }
            newPath.id = x + '-' + y;
            newPath.width = shapeW;
            newPath.height = shapeH;
            newPath.style.opacity = 0;
            newPath.style.transform = 'translate(' + startX + 'px, ' + startY + 'px)';
            if (light == 'true') newPath.setAttribute('filter', 'url(#lightText)');

          } else {
            newPath = document.getElementById(x + '-' + y);
          }

          pixels.push(x + '-' + y);
          
          setTimeout(movePath, Math.random()*20, newPath, (offsetX + x), (y - canvasH/2 + stageH/2));
          
        }
      }
    }
    if( key == 8 || key == 46 ) {
      var c = group.children,
          remove = true,
          total = c.length,
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
          setTimeout(removePath,(time+delay), c[p]);
        }
      }
    }
  }
}

var div = document.createElement('div');
div.style.position = 'fixed';
div.style.top = div.style.right = div.style.bottom = div.style.left = 0;
div.style.background = 'radial-gradient(circle at ' + (stageW / 2) + 'px ' + (stageH / 2) + 'px, rgba(255,255,255,0), rgba(0,0,0,1))';
document.body.appendChild(div);

window.addEventListener('click', function(e){
  var guiSelects = gui.getElementsByTagName('select');
  for (var g = 0; g < guiSelects.length; g++) {
    if (e.target == guiSelects[g]) {
      return false;
    }
  }
  input.focus();
});

window.addEventListener('mousemove', function(e){
  var dx = -(e.clientX - stageW/2) * 10 / (stageW / 2);
  var dy = -(e.clientY - stageH/2) * 10 / (stageH / 2);
  fePointLight.setAttribute('x', e.clientX - stageW / 2);
  fePointLight.setAttribute('y', e.clientY - stageH /2);
  feOffset.setAttribute('dx', dx);
  feOffset.setAttribute('dy', dy);
  feGaussianBlur.setAttribute('stdDeviation', Math.max(Math.abs(dx),Math.abs(dy)));
  div.style.background = 'radial-gradient(circle at ' + e.clientX + 'px ' + e.clientY + 'px, rgba(255,255,255,0), rgba(0,0,0,1))';
});

// Example
var myString = "Typo".split(""),
    s = 0, e,
    si = setInterval(function(){
      if (s < myString.length) {
        e = {keyCode: 65};
        input.value += myString[s];
        s++;
        typing(e);
      } else {
        e = {keyCode: 8};
        input.value = 'Typ';
        s--;
        myString[s] = 'e';
        typing(e);
      }
      if (input.value == 'Type') {
        clearInterval(si);
      }
    }, 1200);
