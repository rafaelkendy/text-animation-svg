var gui = document.createElement('div');
gui.style.background = '#666';
gui.style.position = 'fixed';
gui.style.top = 0;
gui.style.right = 0;
gui.style.width = '100px';
gui.style.padding = '10px';
document.body.appendChild(gui);

var option, label, i;

var colorSelect = document.createElement('select');
colorSelect.style.width = '100%';
gui.appendChild(colorSelect);

var colors = ['orange', 'random', 'greyscale'];
for (i = 0; i < colors.length; i++) {
  option = document.createElement('option');
  option.value = colors[i];
  option.innerHTML = colors[i];
  colorSelect.appendChild(option);
}

colorSelect.addEventListener('change', function(){
  var c = svg.children, p, col = '#f90';
  color = this.value;
  for (p = 0; p < c.length; p++) {
    if (this.value == 'random') {
      col = getRandomColor();
    }
    if (this.value == 'greyscale') {
      col = getRandomColor(true);
    }
    c[p].setAttribute('fill', col);
  }
  input.focus();
});

gui.appendChild(document.createElement('br'));
gui.appendChild(document.createElement('br'));

var fromSelect = document.createElement('select');
fromSelect.style.width = '100%';
gui.appendChild(fromSelect);

var froms = ['center', 'border'];
for (i = 0; i < froms.length; i++) {
  option = document.createElement('option');
  option.value = froms[i];
  option.innerHTML = froms[i];
  fromSelect.appendChild(option);
}

fromSelect.addEventListener('change', function(){
  from = this.value;
  input.focus();
});

gui.appendChild(document.createElement('br'));
gui.appendChild(document.createElement('br'));

var typeSelect = document.createElement('select');
typeSelect.style.width = '100%';
gui.appendChild(typeSelect);

var types = ['polygon', 'circle'];
for (i = 0; i < types.length; i++) {
  option = document.createElement('option');
  option.value = types[i];
  option.innerHTML = types[i];
  typeSelect.appendChild(option);
}

typeSelect.addEventListener('change', function(){
  var c = svg.children, p, w, h, w1, w2, h1, h2, q1, q2;
  type = this.value;
  for (p = 0; p < c.length; p++) {
    if (type == 'circle') {
      w1 = w2 = h1 = h2 = Math.random() * (c[p].width / 2);
      q1 = w1 * 0.06;
      q2 = w1 * 0.94;
      w = h = w1 * 2;
    } else {
      w1 = Math.random() * c[p].width;
      w2 = Math.random() * c[p].width;
      h1 = Math.random() * c[p].height;
      h2 = Math.random() * c[p].height;
      w = c[p].width;
      h = c[p].height;
      q1 = q2 = 0;
    }
    c[p].setAttribute('d', 'M 0 ' + h1 + ' q ' + q1 + ' ' + (-q2) + ' ' + w1 + ' ' + (-h1) + ' q ' + q2 + ' ' + q1 + ' ' + (w - w1) + ' ' + h2 + ' q ' + (-q1) + ' ' + q2 + ' ' + (-w2) + ' ' + (h - h2) + ' q ' + (-q2) + ' ' + (-q1) + ' ' + (w2 - w) + ' ' + (h1 - h));
  }
  input.focus();
});
