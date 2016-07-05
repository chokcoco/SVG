(function(window, undefined) {

	function setColor(){
		var lis = $('li'),
			length = lis.length,
			i = 0;

		for(; i<length; i++){
			var elem = lis.eq(i),
				color = elem.text().split('#')[1];

			elem.find('div').css('background-color','#'+color);
		}
	}

	setColor();
})(window);
