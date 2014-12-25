var card = (function() {

	var $cardImgLi = $('.card__img-list-li');
	var $cardImgUl = $('.card__img-list-ul');
	var $buttonNext = $('.card__img-list-next');
	var $buttonPrev = $('.card__img-list-prev');
	var $cardImgLiIsVisible = null;
	var numMove = 252;
	var allNumMove = 0;
	var timeBlockMovePhoto = $cardImgLi.length * 100 + 600;
	var blockMovePhoto = false;
	var $mainPhoto = $('.card__img-main').find('img');

	function addEventListeners() {
		$('.card__img-list-next').on('click', controlShowNextPhoto);
		$('.card__img-list-prev').on('click', controlShowPrevPhoto);
		$('.card__img-list-a').on('click', setMainPhoto);
	};

	function showFirstFoto() {
		$('.card__img-list-a').first().click();
	};

	function addHelpClass() {
		for(var i = 0; i < 3; i++) {
			$cardImgLi.eq(i).addClass('is-visible');
		}
		$cardImgLiIsVisible = $cardImgUl.find('.is-visible');
	};

	function controlShowNextPhoto() {
		if(blockMovePhoto) return false;
		addBlockMovePhoto();
		$cardImgLiIsVisible = $cardImgUl.find('.is-visible');
		showNextPhoto();
		checkVisibleButtonNav();
		return false;
	};

	function addBlockMovePhoto() {
		blockMovePhoto = true;
		setTimeout(function() {
			blockMovePhoto = false;
		}, timeBlockMovePhoto);
	};

	function showNextPhoto() {
		if(!$cardImgLiIsVisible.last().next().length) return;
		allNumMove = allNumMove - numMove;
		var $currentCardImgLi = $cardImgLiIsVisible.first();
		var counter = 0;
		var interval = setInterval(function() {
			if($currentCardImgLi.hasClass('is-visible')) {
				$currentCardImgLi.removeClass('is-visible');
			}else{
				if(counter < 3) {
					$currentCardImgLi.addClass('is-visible');
					counter++;
				}
			}
			$currentCardImgLi.css({
				'transform': 'translateX(' + allNumMove + 'px)',
				'-webkit-transform': 'translateX(' + allNumMove + 'px)'
			});
			if($currentCardImgLi.next().length) {
				$currentCardImgLi = $currentCardImgLi.next();
			}else{
				clearInterval(interval);
				checkVisibleButtonNav();
			}
		}, 100);
	};

	function controlShowPrevPhoto() {
		if(blockMovePhoto) return false;
		addBlockMovePhoto();
		$cardImgLiIsVisible = $cardImgUl.find('.is-visible');
		showPrevPhoto();
		// checkVisibleButtonNav();
		return false;
	};

	function showPrevPhoto() {
		if(!$cardImgLiIsVisible.first().prev().length) return;
		allNumMove = allNumMove + numMove;
		var $currentCardImgLi = $cardImgLiIsVisible.last();
		var counter = 0;
		var interval = setInterval(function() {
			if($currentCardImgLi.hasClass('is-visible')) {
				$currentCardImgLi.removeClass('is-visible');
			}else{
				if(counter < 3) {
					$currentCardImgLi.addClass('is-visible');
					counter++;
				}
			}
			$currentCardImgLi.css({
				'transform': 'translateX(' + allNumMove + 'px)',
				'-webkit-transform': 'translateX(' + allNumMove + 'px)'
			});
			if($currentCardImgLi.prev().length) {
				$currentCardImgLi = $currentCardImgLi.prev();
			}else{
				clearInterval(interval);
				checkVisibleButtonNav();
			}
		}, 100);
	};

	function setMainPhoto() {
		var newPhotoSrc = $(this).data('main-photo');
		$mainPhoto.attr('src', newPhotoSrc);
		return false;
	};

	function checkVisibleButtonNav() {
		$cardImgLiIsVisible = $cardImgUl.find('.is-visible');
		if(!$cardImgLiIsVisible.last().next().length) {
			$buttonNext.removeClass('is-visible').addClass('is-hidden');
		}else{
			$buttonNext.removeClass('is-hidden').addClass('is-visible');
		}
		if(!$cardImgLiIsVisible.first().prev().length) {
			$buttonPrev.removeClass('is-visible').addClass('is-hidden');
		}else{
			$buttonPrev.removeClass('is-hidden').addClass('is-visible');
		}
	};

	return {
		init: function() {
			if($('.card').length) {
				addHelpClass();
				checkVisibleButtonNav();
				addEventListeners();
				showFirstFoto();
			};
		},
	};

}());