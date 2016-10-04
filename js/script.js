(function() {
  var hideMenuTargets, pointer, showNextMenuTarget, toggleMain, parlei;
  parlei = false;
  $(document).ready(function() {
    return hideMenuTargets();
  });
  $("#menu1 span").hover(function(event) {
    var $target;
    $target = $(event.target);
    pointer($target);
    return showNextMenuTarget($target);
  });
  $("#menu1 span").click(function(event) {
    var $target;
    $target = $(event.target);
    return showNextMenuTarget($target);
  });
  $("header h1").hover(function() {
    return hideMenuTargets();
  });
  $("header h1").click(function() {
    if (parlei === true) toggleMain();
	return hideMenuTargets();
  });
  hideMenuTargets = function() {
    return $("#menu2").children().hide();
  };
  showNextMenuTarget = function(parent) {
    hideMenuTargets();
    $("#menu2").children().eq(parent.index()).show();
    return true;
  };
  toggleMain = function() {
    $("#floater").toggle();
    $("#main").toggle();
    return true;
  };
  pointer = function(target) {
    return target.css('cursor', 'pointer');
  };
  // cheap/ugly code for parlei
  $("#parlei").hover(function() {
	pointer($(event.target));
  });
  $("#parlei").click(function() {
	return toggleMain();
	parlei = ($("#main").css('display') === 'none') ? false : true;
  });
}).call(this);
