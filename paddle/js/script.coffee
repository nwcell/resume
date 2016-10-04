x = 45
y = 250
dx = 1.5
dy = -4
ctx = null
buff = null
WIDTH = null
HEIGHT = null
paddlex = null
paddleh = 10
paddlew = 75
rightDown = false
leftDown = false
canvasMinX = 0
canvasMaxX = 0
intervalId = 0
bricks = null
NROWS = 6
NCOLS = 5
BRICKWIDTH = null
BRICKHEIGHT = 15
PADDING = 1
BRICKCOUNT = 0
WHOLEBRICKCOUNT = 0

ballr = 10
rowcolors = ["#FF1C0A", "#FFFD0A", "#00A308", "#0008DB", "#EB0093"]
paddlecolor = "#FFFFFF"
ballcolor = "#FFFFFF"
backcolor = "#000000"

init = () ->
	WIDTH = $("#canvas").width()
	HEIGHT = $("#canvas").height()
	paddlex = WIDTH / 2
	BRICKWIDTH = (WIDTH/NCOLS) - 1
	canvasMinX = $("#canvas").offset().left
	canvasMaxX = canvasMinX + WIDTH
	intervalId = setInterval(draw, 10)

	# Canvas Buffer
	ctx = $('#canvas')[0].getContext('2d')
	
circle = (x,y,r) ->
	ctx.beginPath()
	ctx.arc(x, y, r, 0, Math.PI*2, true)
	ctx.closePath()
	ctx.fill()
	return

rect = (x,y,w,h) ->
	ctx.beginPath()
	ctx.rect(x,y,w,h)
	ctx.closePath()
	ctx.fill()
	return

clear = () ->
	ctx.clearRect(0, 0, WIDTH, HEIGHT)
	rect(0,0,WIDTH,HEIGHT)
	return

onKeyDown = (evt) ->
	if evt.keyCode is 39
		rightDown = true
	else if evt.keyCode is 37
		leftDown = true
	return

onKeyUp = (evt) ->
	if evt.keyCode is 39
		rightDown = false
	else if evt.keyCode is 37
		leftDown = false
	return

$(document).keydown(onKeyDown)
$(document).keyup(onKeyUp)

onMouseMove = (evt) ->
	if evt.pageX > canvasMinX and evt.pageX < canvasMaxX
		paddlex = Math.max(evt.pageX - canvasMinX - (paddlew/2), 0)
	return

$(document).mousemove(onMouseMove);

initbricks = () ->
	bricks = new Array(NROWS)
	for i in bricks
		bricks[_i] = new Array(NCOLS)
		for j in bricks[_i]
			bricks[_i][_j] = 1
	return

drawbricks = () ->
	for i in bricks
		ctx.fillStyle = rowcolors[_i]
		for j in bricks[_i]
			if bricks[_i][_j] is 1
				rect((_j * (BRICKWIDTH + PADDING)) + PADDING,
				(_i * (BRICKHEIGHT + PADDING)) + PADDING,
				BRICKWIDTH, BRICKHEIGHT)
	return

getbricks = () ->
	BRICKCOUNT = 0
	WHOLEBRICKCOUNT = 0
	for i in bricks
		for j in bricks[_i]
			BRICKCOUNT++
			if bricks[_i][_j] is 1
				WHOLEBRICKCOUNT++
	[BRICKCOUNT, WHOLEBRICKCOUNT]

showscore = () ->
	getbricks()
	xcord = if WHOLEBRICKCOUNT > 9 then x - 5.5 else x - 2.5
	ycord = y + 4
	ctx.fillStyle = "black"
	ctx.font="8pt Impact"
	ctx.fillText(WHOLEBRICKCOUNT, xcord, ycord)

draw = () ->
	ctx.fillStyle = backcolor;
	clear();
	ctx.fillStyle = ballcolor;
	circle(x, y, ballr);

	if rightDown
		paddlex += 5
	else if leftDown
		paddlex -= 5
	ctx.fillStyle = paddlecolor
	rect(paddlex, HEIGHT-paddleh, paddlew, paddleh)

	drawbricks();

	# want to learn about real collision detection? go read
	# http://www.metanetsoftware.com/technique/tutorialA.html
	rowheight = BRICKHEIGHT + PADDING
	colwidth = BRICKWIDTH + PADDING
	row = Math.floor(y/rowheight)
	col = Math.floor(x/colwidth)
	# reverse the ball and mark the brick as broken
	if y < NROWS * rowheight and row >= 0 and col >= 0 and bricks[row][col] is 1
		dy = -dy
		bricks[row][col] = 0

	if x + dx + ballr > WIDTH or x + dx - ballr < 0
		dx = -dx

	if y + dy - ballr < 0
		dy = -dy
	else if y + dy + ballr > HEIGHT - paddleh
		if x > paddlex and x < paddlex + paddlew
			# move the ball differently based on where it hit the paddle
			dx = 8 * ((x-(paddlex+paddlew/2))/paddlew)
			dy = -dy
		else if y + dy + ballr > HEIGHT
			clearInterval(intervalId)

	showscore()
	x += dx
	y += dy

	# draw from buffer
	return

start = () ->
	x = 45
	y = 250
	dx = 1.5
	dy = -4
	init()
	initbricks()
	return

changerows = () ->
	NROWS = parseInt($("#nrows").val())
	$("#rowcount").text(NROWS)

changecols = () ->
	NCOLS = parseInt($("#ncols").val())
	$("#colcount").text(NCOLS)

$(document).ready ->
	# Event Listeners
	$("#canvas").dblclick((event) -> start())
	$("#init").click((event) -> start())
	$("#nrows").change((event) -> changerows())
	$("#ncols").change((event) -> changecols())
	changerows()
	changecols()
	return

