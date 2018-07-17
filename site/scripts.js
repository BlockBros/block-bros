$(document).ready(function() {
	windowResize();
	
	var json = getJson();
	$("#footer").html(json["footer"]);
	
	$(document).on("click", ".open-navigation", function() {
		var navigation = $(".side-navigation");
		
		navigation.fadeToggle(200);
		navigation.toggleClass("dropped");
	});
	
	$(".side-navigation .close").click(function() {
		var navigation = $(".side-navigation");
		
		navigation.fadeOut(200);
		navigation.removeClass("dropped");
	});
	
	$(document).mouseup(function(e) {
		var container = $(".side-navigation, .open-navigation, .popup-image, img");
		
		if(!container.is(e.target) && container.has(e.target).length == 0) {
			var navigation = $(".side-navigation");
			
			navigation.fadeOut(200);
			navigation.removeClass("dropped");
			
			$(".popup-wrapper").fadeOut(100);
		}
	});
	
	$(document).on("click", ".image img", function() {
		$(".popup-image img").attr("src", $(this).attr("src"));
		setTimeout(function() {
			$(".popup-wrapper").fadeIn(100);
			windowResize();
		}, 100);
	});
	
	$(document).on("click", ".popup-close", function() {
		$(".popup-wrapper").fadeOut(100);
	});
	
	$(".image img").attr("title", "Click to resize");
	
	$(window).resize(function() {
		windowResize();
	});
});

function windowResize() {
	var resize_v = $(".popup-image img").height() > $(".popup-image").height();
	var resize_h = $(".popup-image img").width() > $(".popup-image").width();
	
	if(resize_v) {
		$(".popup-image img").css("width", "auto");
		$(".popup-image img").css("height", getHeight($(".popup-image")));
	} else if(resize_h) {
		$(".popup-image img").css("width", "100%");
		$(".popup-image img").css("height", "100%");
	}
}

function getHeight(obj) {
	var elem = $(".popup-wrapper");
	var invisible = !elem.is(":visible");
	
	if(invisible) {
		elem.show();
	}
	var objHeight = obj.height();
	if(invisible) {
		elem.hide();
	}
	
	return objHeight;
}

function getJson() {
	var request = $.ajax({
		"url": "site/site.json",
		"dataType": "json"
	});
	
	request.done(function(data) {
		return data;
	});
	
	request.fail(function(jqXHR, textStatus) {
		console.log(jqXHR + "|| " + textStatus);
	});
}