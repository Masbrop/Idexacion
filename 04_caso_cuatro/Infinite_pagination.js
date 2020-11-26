// This template excecs an inifinite scroll and then click over each element gets by a selector
// Este template ejecuta un infinite scroll y luego hace click sobre los elementos según cierto selector
var selector = "#more-jobs";

var f = function(){

	var size_a = document.body.scrollHeight;

	window.scrollBy(0, document.body.scrollHeight);

	setTimeout(function(){
		var size_b = document.body.scrollHeight;
		if(size_a != size_b) f();
		else g()
	}, 90);



}

var g = function(){


	all_elems = document.querySelectorAll(selector);
	[].forEach.call(all_elems, function(elemento){
		elemento.click();
	});
	setTimeout(function(){
		all_elems = document.querySelectorAll(selector);
		if(all_elems.length > 0) g();
	}, 90);
}



f();