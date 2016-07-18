(function() {
	for (var i = 0; i < 360; i += 22.5) {
		var useElement = document.createElementNS('http://www.w3.org/2000/svg', 'use');

		useElement.setAttributeNS('http://www.w3.org/1999/xlink', 'href', '#petal');
		useElement.setAttribute('fill', 'hsla(' + i + ', 62%, 80%, .35)');
		useElement.setAttribute('transform', 'rotate(' + i + ' 50 50)');

		document.querySelector('.svg-lotus').appendChild(useElement);
	}
})();
