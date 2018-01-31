// $(document).ready(function(){
//    alert("js is here");
// });
// 'use strict';
$(document).ready(function(){
	$(".checkbox-box").click(function(){
	    	$("#search-bar").val($(this).text());
	    	$(".suggestion").each(function(){
	        	$(this).css("display","none"); 
	        });
	});
    $("#search-bar").keypress(function(e){
    	var s = String.fromCharCode(e.which);
        var str = $(this).val() + s;
        $(".suggestion").each(function(){
        	if($(this).text().toLowerCase().lastIndexOf(str.toLowerCase(), 0) === 0){
        		$(this).css("display","block");
        	}
        	else $(this).css("display","none"); 
        });
    });
    $(".suggestion").click(function(){
    	$("#search-bar").val($(this).text());
    	$(".suggestion").each(function(){
        	$(this).css("display","none"); 
        });
    });
    $('body').click(function(evt){    
   		if(evt.target.id != "search-bar")
      	{
      		$("#searchSuggestions").css("display","none"); 
      	}
      	else{
      		$("#searchSuggestions").css("display","inline-block"); 
      	}
    });
    $(".suggestion").hover(function(){
	    $(this).css("background", "rgb(245,245,245)");
	}, function(){
	    $(this).css("background", "white");
	});
    $(".sort-button").click(function(){
    	$("#sortParameter").attr('value', $(this).attr('name'));	
    });
    $(".url-input").attr('value', window.location.href);
    $("#search-go-button").hover(function(){
	    $(this).css("opacity", "0.6");
	    }, function(){
	    $(this).css("opacity", "1");
	});
	$("#search-bar").hover(function(){
	    $(this).css("background", "rgba(210,210,210,0.8)");
	    }, function(){
	    $(this).css("background", "rgba(150,150,150,0.6)");
	});
	$(".card-div").hover(function(){
	    $(this).css("box-shadow", "1px 5px 18px #888888");
	    }, function(){
	    $(this).css("box-shadow", "1px 5px 18px #FFFFFF");
	});
	$(".sort-button").hover(
		function(){
		try {
			if($(this).css('background-color') == "rgb(255, 255, 255)"){
		    	$(this).css("background-color", "rgb(150, 150, 150)");
	    	}
		    else{
		    	// alert("if nahi chala " + $(this).css("background-color"));
		    		
		    }
		}
		catch(err) {
    		alert(err.message);
		}
		    
		},
		function(){
			// alert("out!");
			if($(this).css('background-color') == "rgb(150, 150, 150)"){
		    	$(this).css("background-color", "rgb(255, 255, 255)");

	    	}
		} 
	);
	$(".sort-button").click(
		function(){
			$(".sort-button").css("background-color", "rgb(255, 255, 255)");
			$(this).css("background-color", "rgb(151, 151, 151)");			
		} 
	);
	$("#submit-button").hover(function(){
	    $(this).css("background-color", "rgb(125, 125, 125)");
	    }, function(){
	    $(this).css("background-color", "rgb(255,255,255)");
	});
	$(".description-div").hover(function(){
	    $(this).parents(".card-div").find(".description-box").css("display", "block");
	    // $(this).parents(".card-div").css("background-color", "green");
	    // $(this).css("background-color", "green");
	    }, function(){
	    $(this).parents(".card-div").find(".description-box").css("display", "none");
	    // $(this).parents(".card-div").css("background-color", "white");
	    // $(this).css("background-color", "white");
	});
	$("#page-button").hover(function(){
	    $(this).css("background-color", "rgb(125, 125, 125)");
	    // $(this).css("color", "black");
	    }, function(){
	    $(this).css("background-color", "black");
	    // $(this).css("color", "white");
	});
	$("#page-button2").hover(function(){
	    $(this).css("background-color", "rgb(125, 125, 125)");
	    // $(this).css("color", "black");
	    }, function(){
	    $(this).css("background-color", "black");
	    // $(this).css("color", "white");
	});
	$(".contact-now-button").click(function(){
		$(this).children(".contact-now-span").css("display","none");
		$(this).children(".seller-contact-number").css("display","block");
	})
});