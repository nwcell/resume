# ======================================================
# STARTUP
# ======================================================
$(document).ready ->
	hideMenuTargets()

# ======================================================
# EVENT LISTENERS
# ======================================================
# Menu Links
$("#menu1 span").hover((event) ->
	$target = $(event.target)
	pointer($target)
	showNextMenuTarget($target)
)
$("#menu1 span").click((event) ->
	$target = $(event.target)
	showNextMenuTarget($target)
)

# Main Title
$("header h1").hover(() -> hideMenuTargets())
$("header h1").click(() -> hideMenuTargets())

# ======================================================
# MENU TOOLS
# ======================================================
# Hide menu targets
hideMenuTargets = () -> $("#menu2").children().hide()

# Display Menu Target
showNextMenuTarget = (parent) ->
	hideMenuTargets()
	$("#menu2").children().eq(parent.index()).show()
	true

toggleMain = () ->
	$("#floater").toggle()
	$("#main").toggle()
	true

# ======================================================
# Interface
# ======================================================
# Cursor Manipulation
pointer = (target) -> target.css('cursor','pointer')