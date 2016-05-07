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