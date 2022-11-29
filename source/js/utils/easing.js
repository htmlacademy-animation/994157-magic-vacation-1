// принимает функцию расчёта времени и возвращает преобразованный вариант
function makeEaseOut(timing) {
  return function (timeFraction) {
    return 1 - timing(1 - timeFraction);
  };
}

function makeEaseInOut(timing) {
  return function (timeFraction) {
    if (timeFraction < 0.5) {
      return timing(2 * timeFraction) / 2;
    } else {
      return (2 - timing(2 * (1 - timeFraction))) / 2;
    }
  };
}

function easeLinear(x) {
  return x;
}


function easeInCubic(x) {
  return x * x * x;
}


function easeOutCubic(x) {
  return 1 - Math.pow(1 - x, 3);
}


function easeInExpo(x) {
  if (x === 0) {
    return 0;
  } else {
    return Math.pow(2, 10 * x - 10);
  }
}


function easeOutExpo(x) {
  if (x === 1) {
    return 1;
  } else {
    return 1 - Math.pow(2, -10 * x);
  }
}


function easeInElastic(x) {
  const c4 = (2 * Math.PI) / 3;

  if (x === 0) {
    return 0;
  } else if (x === 1) {
    return 1;
  } else {
    return Math.pow(2, 10 * x - 10) * Math.sin((x * 10 - 10.75) * c4);
  }
}


function easeOutElastic(x) {
  const c4 = (2 * Math.PI) / 3;

  if (x === 0) {
    return 0;
  } else if (x === 1) {
    return 1;
  } else {
    return Math.pow(2, -10 * x) * Math.sin((x * 10 - 0.75) * c4) + 1;
  }
}

function easeInQuad(x) {
  return 1 - Math.sin(Math.acos(x));
}

function easeInOutBack(x) {
  const c1 = 1.70158;
  const c2 = c1 * 1.525;

  return x < 0.5
    ? (Math.pow(2 * x, 2) * ((c2 + 1) * 2 * x - c2)) / 2
    : (Math.pow(2 * x - 2, 2) * ((c2 + 1) * (x * 2 - 2) + c2) + 2) / 2;
}

const easeOutQuad = makeEaseOut(easeInQuad);
const easeInOutQuad = makeEaseInOut(easeInQuad);


const _ = Object.freeze({
  easeLinear,
  easeInCubic,
  easeOutCubic,
  easeInExpo,
  easeOutExpo,
  easeInElastic,
  easeOutElastic,
  easeInQuad,
  easeOutQuad,
  easeInOutQuad,
  easeInOutBack
});


export default _;

// Squash and stretch in 3d
// scale.x = scale.z = 1 / Math.sqrt(scale.y)
