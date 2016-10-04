var BRICKCOUNT, BRICKHEIGHT, BRICKWIDTH, HEIGHT, NCOLS, NROWS, PADDING, WHOLEBRICKCOUNT, WIDTH, backcolor, ballcolor, ballr, bricks, buff, canvasMaxX, canvasMinX, changecols, changerows, circle, clear, ctx, draw, drawbricks, dx, dy, getbricks, init, initbricks, intervalId, leftDown, onKeyDown, onKeyUp, onMouseMove, paddlecolor, paddleh, paddlew, paddlex, rect, rightDown, rowcolors, showscore, start, x, y;
x = 45;
y = 250;
dx = 1.5;
dy = -4;
ctx = null;
buff = null;
WIDTH = null;
HEIGHT = null;
paddlex = null;
paddleh = 10;
paddlew = 75;
rightDown = false;
leftDown = false;
canvasMinX = 0;
canvasMaxX = 0;
intervalId = 0;
bricks = null;
NROWS = 6;
NCOLS = 5;
BRICKWIDTH = null;
BRICKHEIGHT = 15;
PADDING = 1;
BRICKCOUNT = 0;
WHOLEBRICKCOUNT = 0;
ballr = 10;
rowcolors = ["#FF1C0A", "#FFFD0A", "#00A308", "#0008DB", "#EB0093"];
paddlecolor = "#FFFFFF";
ballcolor = "#FFFFFF";
backcolor = "#000000";
init = function() {
  WIDTH = $("#canvas").width();
  HEIGHT = $("#canvas").height();
  paddlex = WIDTH / 2;
  BRICKWIDTH = (WIDTH / NCOLS) - 1;
  canvasMinX = $("#canvas").offset().left;
  canvasMaxX = canvasMinX + WIDTH;
  intervalId = setInterval(draw, 10);
  return ctx = $('#canvas')[0].getContext('2d');
};
circle = function(x, y, r) {
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2, true);
  ctx.closePath();
  ctx.fill();
};
rect = function(x, y, w, h) {
  ctx.beginPath();
  ctx.rect(x, y, w, h);
  ctx.closePath();
  ctx.fill();
};
clear = function() {
  ctx.clearRect(0, 0, WIDTH, HEIGHT);
  rect(0, 0, WIDTH, HEIGHT);
};
onKeyDown = function(evt) {
  if (evt.keyCode === 39) {
    rightDown = true;
  } else if (evt.keyCode === 37) {
    leftDown = true;
  }
};
onKeyUp = function(evt) {
  if (evt.keyCode === 39) {
    rightDown = false;
  } else if (evt.keyCode === 37) {
    leftDown = false;
  }
};
$(document).keydown(onKeyDown);
$(document).keyup(onKeyUp);
onMouseMove = function(evt) {
  if (evt.pageX > canvasMinX && evt.pageX < canvasMaxX) {
    paddlex = Math.max(evt.pageX - canvasMinX - (paddlew / 2), 0);
  }
};
$(document).mousemove(onMouseMove);
initbricks = function() {
  var i, j, _i, _j, _len, _len2, _ref;
  bricks = new Array(NROWS);
  for (_i = 0, _len = bricks.length; _i < _len; _i++) {
    i = bricks[_i];
    bricks[_i] = new Array(NCOLS);
    _ref = bricks[_i];
    for (_j = 0, _len2 = _ref.length; _j < _len2; _j++) {
      j = _ref[_j];
      bricks[_i][_j] = 1;
    }
  }
};
drawbricks = function() {
  var i, j, _i, _j, _len, _len2, _ref;
  for (_i = 0, _len = bricks.length; _i < _len; _i++) {
    i = bricks[_i];
    ctx.fillStyle = rowcolors[_i];
    _ref = bricks[_i];
    for (_j = 0, _len2 = _ref.length; _j < _len2; _j++) {
      j = _ref[_j];
      if (bricks[_i][_j] === 1) {
        rect((_j * (BRICKWIDTH + PADDING)) + PADDING, (_i * (BRICKHEIGHT + PADDING)) + PADDING, BRICKWIDTH, BRICKHEIGHT);
      }
    }
  }
};
getbricks = function() {
  var i, j, _i, _j, _len, _len2, _ref;
  BRICKCOUNT = 0;
  WHOLEBRICKCOUNT = 0;
  for (_i = 0, _len = bricks.length; _i < _len; _i++) {
    i = bricks[_i];
    _ref = bricks[_i];
    for (_j = 0, _len2 = _ref.length; _j < _len2; _j++) {
      j = _ref[_j];
      BRICKCOUNT++;
      if (bricks[_i][_j] === 1) {
        WHOLEBRICKCOUNT++;
      }
    }
  }
  return [BRICKCOUNT, WHOLEBRICKCOUNT];
};
showscore = function() {
  var xcord, ycord;
  getbricks();
  xcord = WHOLEBRICKCOUNT > 9 ? x - 5.5 : x - 2.5;
  ycord = y + 4;
  ctx.fillStyle = "black";
  ctx.font = "8pt Impact";
  return ctx.fillText(WHOLEBRICKCOUNT, xcord, ycord);
};
draw = function() {
  var col, colwidth, row, rowheight;
  ctx.fillStyle = backcolor;
  clear();
  ctx.fillStyle = ballcolor;
  circle(x, y, ballr);
  if (rightDown) {
    paddlex += 5;
  } else if (leftDown) {
    paddlex -= 5;
  }
  ctx.fillStyle = paddlecolor;
  rect(paddlex, HEIGHT - paddleh, paddlew, paddleh);
  drawbricks();
  rowheight = BRICKHEIGHT + PADDING;
  colwidth = BRICKWIDTH + PADDING;
  row = Math.floor(y / rowheight);
  col = Math.floor(x / colwidth);
  if (y < NROWS * rowheight && row >= 0 && col >= 0 && bricks[row][col] === 1) {
    dy = -dy;
    bricks[row][col] = 0;
  }
  if (x + dx + ballr > WIDTH || x + dx - ballr < 0) {
    dx = -dx;
  }
  if (y + dy - ballr < 0) {
    dy = -dy;
  } else if (y + dy + ballr > HEIGHT - paddleh) {
    if (x > paddlex && x < paddlex + paddlew) {
      dx = 8 * ((x - (paddlex + paddlew / 2)) / paddlew);
      dy = -dy;
    } else if (y + dy + ballr > HEIGHT) {
      clearInterval(intervalId);
    }
  }
  showscore();
  x += dx;
  y += dy;
};
start = function() {
  x = 45;
  y = 250;
  dx = 1.5;
  dy = -4;
  init();
  initbricks();
};
changerows = function() {
  NROWS = parseInt($("#nrows").val());
  return $("#rowcount").text(NROWS);
};
changecols = function() {
  NCOLS = parseInt($("#ncols").val());
  return $("#colcount").text(NCOLS);
};
$(document).ready(function() {
  $("#canvas").dblclick(function(event) {
    return start();
  });
  $("#init").click(function(event) {
    return start();
  });
  $("#nrows").change(function(event) {
    return changerows();
  });
  $("#ncols").change(function(event) {
    return changecols();
  });
  changerows();
  changecols();
});