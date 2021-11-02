var gui = document.createElement('div');
gui.style.background = '#666';
gui.style.position = 'fixed';
gui.style.top = 0;
gui.style.right = 0;
gui.style.width = '100px';
gui.style.padding = '10px';
document.body.appendChild(gui);

var selects = [
  {
    'name': 'color',
    'options': [
      {
        'name': 'orange',
        'value': 'orange'
      },
      {
        'name': 'random',
        'value': 'random'
      },
      {
        'name': 'greyscale',
        'value': 'greyscale'
      }
    ],
    'func': function(){
      var c = group.children, p, col = '#f90';
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
    }
  },
  {
    'name': 'from',
    'options': [
      {
        'name': 'center',
        'value': 'center'
      },
      {
        'name': 'border',
        'value': 'border'
      }
    ],
    'func': function(){
      from = this.value;
      input.focus();
    }
  },
  {
    'name': 'type',
    'options': [
      {
        'name': 'polygon',
        'value': 'polygon'
      },
      {
        'name': 'circle',
        'value': 'circle'
      },
      {
        'name': 'square',
        'value': 'square'
      }
    ],
    'func': function(){
      var c = group.children, p, w, h, w1, w2, h1, h2, q1, q2;
      type = this.value;
      for (p = 0; p < c.length; p++) {
        if (type == 'circle') {
          w1 = w2 = h1 = h2 = Math.random() * (c[p].width / 2);
          q1 = w1 * 0.06;
          q2 = w1 * 0.94;
          w = h = w1 * 2;
        } else if(type == 'square') {
          w1 = w2 = h1 = h2 = 5;
          w = h = 10;
          q1 = q2 = 10;
        } 
        else {
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
    }
  },
  {
    'name': 'dropShadow',
    'options': [
      {
        'name': 'dropShadow',
        'value': true
      },
      {
        'name': 'off',
        'value': false
      }
    ],
    'func': function(){
      dropShadow = this.value;
      if (dropShadow == 'false') {
        group.removeAttribute('filter');
      } else {
        group.setAttribute('filter', 'url(#shadowText)');
      }
      input.focus();
    }
  },
  {
    'name': 'light',
    'options': [
      {
        'name': 'light',
        'value': true
      },
      {
        'name': 'off',
        'value': false
      }
    ],
    'func': function(){
      var c = group.children;
      light = this.value;
      for (p = 0; p < c.length; p++) {
        if (light == 'false') {
          c[p].removeAttribute('filter');
        } else {
          c[p].setAttribute('filter', 'url(#lightText)');
        }
      }
      input.focus();
    }
  },
  {
    'name': 'spotlight',
    'options': [
      {
        'name': 'spotlight',
        'value': true
      },
      {
        'name': 'off',
        'value': false
      }
    ],
    'func': function(){
      div.style.display = (this.value == 'false') ? 'none' : 'block';
      input.focus();
    }
  }
];

var select, option, i, o;

for (i = 0; i < selects.length; i++) {

  select = document.createElement('select');
  select.style.width = '100%';
  gui.appendChild(select);

  for (o = 0; o < selects[i].options.length; o++) {
    option = document.createElement('option');
    option.value = selects[i].options[o].value;
    option.innerHTML = selects[i].options[o].name;
    select.appendChild(option);
  }

  select.addEventListener('change', selects[i].func);

  if (i != selects.length - 1) {
    gui.appendChild(document.createElement('br'));
    gui.appendChild(document.createElement('br'));
  }

}
