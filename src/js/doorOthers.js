// ===================== Пример кода первой двери =======================
/**
 * @class Door0
 * @augments DoorBase
 * @param {Number} number
 * @param {Function} onUnlock
 */
function Door0(number, onUnlock) {
  DoorBase.apply(this, arguments);

  var combination = [0,2,1];
  
  var buttons = [
    this.popup.querySelector('.door-riddle__button_0'),
    this.popup.querySelector('.door-riddle__button_1'),
    this.popup.querySelector('.door-riddle__button_2')
  ];

  buttons.forEach(function(b) {
    b.addEventListener('pointerdown', _onButtonPointerDown.bind(this));
    b.addEventListener('pointerup', _onButtonPointerUp.bind(this));
    b.addEventListener('pointercancel', _onButtonPointerUp.bind(this));
    b.addEventListener('pointerleave', _onButtonPointerUp.bind(this));
  }.bind(this));


  function _onButtonPointerDown(e) {
    e.target.classList.add('door-riddle__button_pressed');
    if (e.target.classList.contains('door-riddle__button_'+combination[0])) {
      combination.shift();
    }
    if (combination.length == 0) {
      this.unlock();
    }
  }

  function _onButtonPointerUp(e) {
    e.target.classList.remove('door-riddle__button_pressed');
    combination = [1,2,0];
  }
}

// Наследуемся от класса DoorBase
Door0.prototype = Object.create(DoorBase.prototype);
Door0.prototype.constructor = DoorBase;
// END ===================== Пример кода первой двери =======================

/**
 * @class Door1
 * @augments DoorBase
 * @param {Number} number
 * @param {Function} onUnlock
 */
function Door1(number, onUnlock) {
  DoorBase.apply(this, arguments);
  // ==== Напишите свой код для открытия второй двери здесь ====
  // Для примера дверь откроется просто по клику на неё
  var pad = this.popup;
  
  pad.addEventListener('pointerdown', _onPadPointerDown.bind(this));
  pad.addEventListener('pointerup', _onPadPointerUp.bind(this));
  pad.addEventListener('pointermove', _onPadPointerMove.bind(this));
  pad.addEventListener('pointercancel', _onPadPointerUp.bind(this));
  pad.addEventListener('pointerleave', _onPadPointerUp.bind(this));

  var kettlebell = this.popup.querySelector('.door-riddle__kettlebell'),
      container = this.popup.querySelector('.door-riddle__container'),
      targetPoint = this.popup.querySelector('.door-riddle__target-point'),
      support = this.popup.querySelector('.door-riddle__support');

  var pointers = [];

  var maxScale = 1.5,
      minScale = 0.5;

  var targetWeight = 5763,
      currentWeight = 1200,
      maxWeight = 10000,
      minWeight = 1;

  var maxHeight = container.offsetTop + container.offsetHeight,
      minHeight = container.offsetTop;
      
  var startPositionY = (currentWeight / maxWeight) * (maxHeight - minHeight);
  
  // Initial positioning. Depends on currentWeight.
  
  targetPoint.style.top = (targetWeight / maxWeight) * (maxHeight - minHeight) - targetPoint.offsetHeight / 2 + 'px';
  support.style.top = (currentWeight / maxWeight) * (maxHeight - minHeight) - support.offsetHeight / 2 + 'px';
  kettlebell.style.top = support.offsetTop - kettlebell.offsetHeight + 'px';
  kettlebell.style.transform = 'translateX(-50%) scale(' + getCurrentScale(currentWeight) + ')';


  function getCurrentPosition(currentWeight) {
    return (currentWeight / maxWeight) * (maxHeight - minHeight) - startPositionY + 'px';
  }

  function getCurrentScale(currentWeight) {
    return (currentWeight / maxWeight) * (maxScale - minScale) + minScale;
  }

  function getStretch(x1, x2, y1, y2) {
    return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
  }

  function updateState() {
    requestAnimationFrame(function() {
      support.style.transform = 'translateY('+getCurrentPosition(currentWeight)+')';
      kettlebell.style.transform = 'translate(-50%,'+getCurrentPosition(currentWeight)+') scale('+getCurrentScale(currentWeight)+')';
    });
  }
  
  function recognizerZoom(e) {
    var distance = 0,
      prevDistance = 0;
      
    pointers.forEach(function(p) {
      if (p.id === e.pointerId) {
        p.x = e.pageX;
        p.y = e.pageY;
      }
    });
    
    for (var i = 0; i < pointers.length - 1; i++) {
      if (i == pointers.length - 1) {
        distance += getStretch(pointers[i].x, pointers[0].x, pointers[i].y, pointers[0].y);
        prevDistance += getStretch(pointers[i].prevX, pointers[0].prevX, pointers[i].prevY, pointers[0].prevY);
      }
      else {
        distance += getStretch(pointers[i].x, pointers[i + 1].x, pointers[i].y, pointers[i + 1].y);
        prevDistance += getStretch(pointers[i].prevX, pointers[i + 1].prevX, pointers[i].prevY, pointers[i + 1].prevY);
      }
    }

    pointers.forEach(function(p) {
      if (p.id === e.pointerId) {
        p.prevX = e.pageX;
        p.prevY = e.pageY;
      }
    });
    
    if (distance > prevDistance) return 'zoomIn';
    else if (distance < prevDistance) return 'zoomOut';
  }

  function _onPadPointerDown(e) {
    pointers.push({
      id: e.pointerId,
      x: e.pageX,
      y: e.pageY,
      prevX: e.pageX,
      prevY: e.pageY
    });
  }

  function _onPadPointerMove(e) {
    var state = recognizerZoom(e);
    
    if (state === 'zoomIn') {
      if (pointers.length == 2) currentWeight += 1;
      else if (pointers.length == 3) currentWeight += 10;
      else if (pointers.length == 4) currentWeight += 50;

      if (currentWeight > maxWeight) {
        currentWeight = maxWeight;
      }
      updateState();
    }
    else if (state === 'zoomOut') {
      if (pointers.length == 2) currentWeight -= 1;
      else if (pointers.length == 3) currentWeight -= 10;
      else if (pointers.length == 4) currentWeight -= 50;

      if (currentWeight < minWeight) {
        currentWeight = minWeight;
      }
      updateState();
    }
    checkCondition.apply(this);
  }

  function _onPadPointerUp(e) {
    pointers.forEach(function(p, index) {
      if (p.id === e.pointerId) pointers.splice(index, 1);
    });
  }

  function checkCondition() {
    if (currentWeight == targetWeight) this.unlock();
  }

  // ==== END Напишите свой код для открытия второй двери здесь ====
}
Door1.prototype = Object.create(DoorBase.prototype);
Door1.prototype.constructor = DoorBase;

/**
 * @class Door2
 * @augments DoorBase
 * @param {Number} number
 * @param {Function} onUnlock
 */
function Door2(number, onUnlock) {
  DoorBase.apply(this, arguments);
  // ==== Напишите свой код для открытия третей двери здесь ====
  // Для примера дверь откроется просто по клику на неё

  var initialHeight = 0;
  var pointers = [];
  var carrot = this.popup.querySelector('.door-riddle__carrot');

  var blocks = [
    this.popup.querySelector('.door-riddle__block_0'),
    this.popup.querySelector('.door-riddle__block_1'),
    this.popup.querySelector('.door-riddle__block_2'),
    this.popup.querySelector('.door-riddle__block_3'),
    this.popup.querySelector('.door-riddle__rabbit')
  ];

  blocks.forEach(function(b) { 
    b.style.bottom = initialHeight + '%'; // just to reduce css file
    initialHeight += 14;
  });

  blocks.forEach(function(r) {
    r.addEventListener('pointerdown', _onBlockPointerDown.bind(this));
    r.addEventListener('pointerup', _onBlockPointerUp.bind(this));
    r.addEventListener('pointercancel', _onBlockPointerUp.bind(this));
    r.addEventListener('pointerleave', _onBlockPointerUp.bind(this));
    r.addEventListener('pointermove', _onBlockPointerMove.bind(this));
  }.bind(this));

  function _onBlockPointerDown(e) {
    
    e.target.classList.add('door-riddle__block_pressed');
    pointers.push({
      id: e.pointerId,
      x: e.pageX,
      y: e.clientY
    });
  }

  function getStartPosition(e) {
    return pointers.filter(function(p) {
      return p.id === e.pointerId;
    });
  }
  
  function _onBlockPointerMove(e) {

    var currentPositionX = e.pageX;
    var currentPositionY = e.clientY;
    var startPositionX,
        startPositionY;

    if (e.target.classList.contains('door-riddle__block_pressed')) {
      if (e.target.classList.contains('door-riddle__block')) {

        startPositionX = getStartPosition(e)[0].x;
        requestAnimationFrame(function() {
          e.target.style.transform = 'translateX(' + (currentPositionX - startPositionX) + 'px)';
        });
      }
      if (e.target.classList.contains('door-riddle__rabbit')) {

        startPositionY = getStartPosition(e)[0].y;
        requestAnimationFrame(function() {
          e.target.style.transform = 'translate(-50%,' + (currentPositionY - startPositionY) + 'px)';
        });

        if (currentPositionY > carrot.offsetTop + carrot.offsetHeight / 2) {
          this.unlock();
        }
      }
    }
  }

  function _onBlockPointerUp(e) {

    pointers.forEach(function(p, index) {
      if (p.id === e.pointerId) pointers.splice(index, 1);
    });

    if (e.target.classList.contains('door-riddle__block')) {
      requestAnimationFrame(function() {
        e.target.style.transform = 'translateX(0)';
      });
    }
    if (e.target.classList.contains('door-riddle__rabbit')) {
      requestAnimationFrame(function() {
        e.target.style.transform = 'translate(-50%,0)';
      });
    }
    e.target.classList.remove('door-riddle__block_pressed');
  }

  // ==== END Напишите свой код для открытия третей двери здесь ====
}
Door2.prototype = Object.create(DoorBase.prototype);
Door2.prototype.constructor = DoorBase;

/**
 * Сундук
 * @class Box
 * @augments DoorBase
 * @param {Number} number
 * @param {Function} onUnlock
 */
function Box(number, onUnlock) {
  DoorBase.apply(this, arguments);
  // ==== Напишите свой код для открытия сундука здесь ====
  // Для примера сундук откроется просто по клику на него
  
  var pad = this.popup.querySelector('.door-riddle__safelock-disk'),
      safelock = this.popup.querySelector('.door-riddle__safelock-disk'),
      sweat = this.popup.querySelector('.bonus'), //bonus
      alarm = this.popup.querySelector('.alert'); //for iOS
      
  var pointers = [],
      degrees = 0,
      direction;
      
  var combination = {
    numbers: [115, 322, 217, 72],
    direction: 1
  };
  
  pad.addEventListener('pointerdown', _onPadPointerDown.bind(this));
  pad.addEventListener('pointerup', _onPadPointerUp.bind(this));
  pad.addEventListener('pointermove', _onPadPointerMove.bind(this));
  pad.addEventListener('pointercancel', _onPadPointerUp.bind(this));
  pad.addEventListener('pointerleave', _onPadPointerUp.bind(this));
  
  function getAngle(p2x, p1x, p2y, p1y) {
    var angle = Math.atan2(p2y - p1y, p2x - p1x)*180/Math.PI;
    return (angle < 0) ? angle+=360 : angle;
  }
  
  function _onPadPointerDown(e) {
    pointers.push({
      id: e.pointerId,
      x: e.pageX,
      y: e.pageY,
      prevX: e.pageX,
      prevY: e.pageY
    });
  }
  
  function _onPadPointerMove(e) {
    if (pointers.length > 1) {
      pointers.forEach(function(p) {
        if (p.id === e.pointerId) {
          p.x = e.pageX;
          p.y = e.pageY;
        }
      });
      
      var alpha  = 0,
          prevAlpha = 0;
          
      var p1x = pointers[0].x,
          p2x = pointers[1].x,
          p1y = pointers[0].y,
          p2y = pointers[1].y;
          
      var prev1x = pointers[0].prevX,
          prev2x = pointers[1].prevX,
          prev1y = pointers[0].prevY,
          prev2y = pointers[1].prevY;
      
      alpha = getAngle(p2x, p1x, p2y, p1y);
      prevAlpha = getAngle(prev2x, prev1x, prev2y, prev1y);
      
      if (alpha > prevAlpha) {
        degrees += 1;
        direction = 1; //clockwise
        if (degrees > 360) degrees = 0; // 
        safelock.style.transform = 'rotate('+degrees+'deg)';
      }
      else if (alpha < prevAlpha) {
        degrees -= 1;
        direction = -1; //contraclockwise
        if (degrees < 0) degrees += 360; 
        safelock.style.transform = 'rotate('+degrees+'deg)';
      }
      
      if (Math.abs(degrees - combination.numbers[0]) < 1 && combination.direction == direction) {
        if ('navigator' in window) {
          window.navigator.vibrate(20);
        }
        else {
          alarm.style.opacity = 1;
          setTimeout(function() {
            alarm.style.opacity = 0;
          }, 200);
        }
        combination.numbers.shift();
        combination.direction *= -1;
      }
      if (Math.abs(degrees - combination.numbers[0]) < 1 && combination.direction !== direction) {
        combination.numbers = [115, 322, 217, 72];
        combination.direction = 1;
      }
      
      if (combination.numbers.length == 1) {
        requestAnimationFrame(function() {
          sweat.style.transform = 'translateX(0)';
        });
      }
      
      if (combination.numbers.length == 0) {
          this.unlock();
      }
      
      pointers.forEach(function(p) {
        if (p.id === e.pointerId) {
          p.prevX = e.pageX;
          p.prevY = e.pageY;
        }
      });
    }
  }
  
  function _onPadPointerUp(e) {
    pointers.forEach(function(p, index) {
      if (p.id === e.pointerId) pointers.splice(index, 1);
    });
  }
  // ==== END Напишите свой код для открытия сундука здесь ====

  this.showCongratulations = function() {
    alert('Поздравляю! Игра пройдена!');
  };
}
Box.prototype = Object.create(DoorBase.prototype);
Box.prototype.constructor = DoorBase;
