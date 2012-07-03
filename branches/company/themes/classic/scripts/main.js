
function init(){
	 $(".section > a").click(function () {
	        if ($(this).hasClass("expanded")) {
	            $(this).removeClass("expanded").next().slideUp("fast");
	        }
	        else {
	            $(this).addClass("expanded").next().slideDown("fast");
	        }
	    });
	 
	 $("input[type='button'],input[type='submit']").button();
	 //alert('aa');
	 
	 //$("#radioset").buttonset();
}

jQuery(document).ready(
		function(){init();}
		);

var $tabs=null;
var tabMap=[];

String.prototype.hashCode = function(){
	var hash = 0;
	if (this.length == 0) return hash;
	for (i = 0; i < this.length; i++) {
		char = this.charCodeAt(i);
		hash = ((hash<<5)-hash)+char;
		hash = hash & hash; // Convert to 32bit integer
	}
	return hash;
}

function openNav(url,title){
	if(!$tabs) return;
	var hash = (url+title).hashCode;
	var index= jQury.inArray(hash,tabMap);
	if(index >=0){
		$tabs.tabs("select",index);
		return;
	}
	$tabs.tabs("add",url,title);
	
}

//function hashCode(str){        var h = 0, off = 0;        var len = str.length;        for(var i = 0; i < len; i++){            h = 31 * h + str.charCodeAt(off++);        }        return h;    }