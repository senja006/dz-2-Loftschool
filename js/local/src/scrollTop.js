var scrollTop = (function() {

	var isScroll = false;
	var $button = $('.scroll-top');

	function addEventListeners() {
		$('.scroll-top__a').on('click', documentScrollTop);
		$(document).on('scroll', controlShowButton);
	};

	function documentScrollTop() {
		if(isScroll) return false;
		isScroll = true;
		$('html, body').animate({
			scrollTop: 0,
		}, 500);
		setTimeout(function() {
			isScroll = false;
		}, 500);
		return false;
	};

	function controlShowButton() {
		var scrollTop = $(document).scrollTop();
		if(scrollTop > 100) {
			$button.addClass('is-visible').removeClass('is-hidden');
		}else{
			$button.addClass('is-hidden').removeClass('is-visible');
		}
	};

	return {
		init: function() {
			if($('.scroll-top').length) {
				addEventListeners();
			};
		},
	};

}());