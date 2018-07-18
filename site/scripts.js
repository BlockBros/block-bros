$(document).ready(function() {
	windowResize();
	
	$.getJSON("site/site.json").done(function(json) {
		document.title = json["website-name"] + " | " + pagename;
		$("#pagename").html(pagename);
		$("#footer").html(json["footer"]);
		
		/* Read Navigation data */
		var navigation = "<div class='nav-item separate open-navigation'><i class='fas fa-bars'></i></div>";
		for(var i = 0; i < json["navigation"].length; i++) {
			navigation = navigation + "<a href='" + json["navigation"][i][0] + "'><div class='nav-item'>" + json["navigation"][i][1] + "</div></a>";
		}
		$(".navigation").html(navigation);
		
		/* Read Side-Navigation data */
		var side_navigation = "<div class='nav-item close'><i class='fas fa-times'></i></div>";
		for(var i = 0; i < json["side-navigation"].length; i++) {
			side_navigation = side_navigation + "<a href='" + json["side-navigation"][i][0] + "'><div class='nav-item'>" + json["side-navigation"][i][1] + "</div></a>";
		}
		$(".side-navigation").html(side_navigation);
		
		/* Read Header data */
		var header_path = "<a href='" + json["home-url"] + "'><i class='fas fa-home'></i></a><span>/</span>";
		var header = page_header.split("/");
		for(var i = 0; i < header.length; i++) {
			var index = null;
			for(var j = 0; j < json["header"].length; j++) {
				if(json["header"][j][1].toLowerCase() == header[i].toLowerCase()) {
					index = j;
				}
			}
			if(index !== null) {
				header_path = header_path + "<a href='" + json["header"][index][0] + "'>" + json["header"][index][1] + "</a><span>/</span>";
			}
		}
		header_path = header_path + "<a href='#'>" + pagename + "</a>";
		$(".header").html(header_path);
		
		/* Read Footer-Links data */
		var footer_links = "";
		for(var i = 0; i < json["footer-links"].length; i++) {
			footer_links = footer_links + "<a href='" + json["footer-links"][i][0] + "'>" + json["footer-links"][i][1] + "</a>";
		}
		$(".footer-links").html(footer_links);
	});
	
	$(document).on("click", ".open-navigation", function() {
		var navigation = $(".side-navigation");
		
		navigation.fadeToggle(200);
		navigation.toggleClass("dropped");
	});
	
	$(document).on("click", ".side-navigation .close", function() {
		var navigation = $(".side-navigation");
		
		navigation.fadeOut(200);
		navigation.removeClass("dropped");
	});
	
	$(document).mouseup(function(e) {
		var container = $(".side-navigation, .open-navigation, .popup-image, .image img");
		
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