var validationForm = {
	// для работы необходимы следующие библиотеки: Jquery.inputmask, Jquery.h5Validate
	// функция validationForm.formIsSend(form) вызывает сообщение об отпраке формы, в качестве параметра передается текущая форма

	params: {
		classInputPhone: 'input__phone',
		classInputLetters: 'input__letters',
		classInputNumbers: 'input__numbers',
		classInputEmail: 'input__email',
		classTextareaLimit: 'textarea__limit',
		maxLengthTextarea: 200,
	},

	init: function() {
		if($('form').length && !$('html').hasClass('ie-9') && !$('html').hasClass('ie-8')) {
			this.addNewMask();
			this.addMaskPhone();
			this.addMaskLetters();
			this.addMaskNumbers();
			this.addSupportHtml5Attribute();
			this.onHandler();
		}
	},

	onHandler: function() {
		$('.form-validation').on('submit', this.formSubmit.bind(this));
		$('.' + this.params.classInputEmail).on('keyup', this.validationEmail);
		$('input').on('focus', this.eventOnHoverOrCheckedInput);
		$('input[type="radio"], input[type="checkbox"]').on('change', this.eventOnHoverOrCheckedInput.bind(this));
		$('.' + this.params.classTextareaLimit).on('keypress', this.checkNumCharInTextarea.bind(this));
		$('.input__file').on('change', this.addTextInPlaceValue);
	},

	addNewMask: function() {
		$.extend($.inputmask.defaults.definitions, {
	        'a': {
	            'validator': "[А-Яа-яA-Za-z ]",
	            'cardinality': 1,
	            'prevalidator': null
	        }
	    });
	},

	addMaskPhone: function() {
		$('.' + this.params.classInputPhone).inputmask({
	        'mask': "+7 999 999 99 99",
	        'showMaskOnHover': false,
	        'placeholder': '',
	        'oncomplete': function() {
	        	$(this).removeClass('error');
	        },
	        'onincomplete': function() {
	        	$(this).addClass('error');
	        },
	    });
	},

	addMaskLetters: function() {
		$('.' + this.params.classInputLetters).inputmask({
	        'mask': "a",
	        'repeat': 100,
	        'placeholder': '',
	    });
	},

	addMaskNumbers: function() {
		$('.' + this.params.classInputNumbers).inputmask({
	        'mask': '9',
	        'repeat': 4,
	        'placeholder': '',
	    });
	},

	validationEmail: function() {
		var value = $(this).val();
		var filter = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    	if (filter.test(value)) {
	        $(this).removeClass('error');
	    }
	    else {
	        $(this).addClass('error');
	    }
	},

	addSupportHtml5Attribute: function() {
		$('.form-validation').h5Validate();
	},

	formSubmit: function(ev) {
		var $thisForm = $(ev.target);
		$thisForm.find('.value').each(function() {
    		if($(this).hasClass('placeholder')) {
    			$(this).addClass('error');
    		}else{
    			$(this).removeClass('error');
    		}
    	});
    	if($thisForm.find('.error').length || $thisForm.find('.ui-state-error').length) {
    		this.hideInfoMaxLengthInTextarea($thisForm);
    		this.formIsError($thisForm);
    		return false;
    	}
    	this.hideInfoMaxLengthInTextarea($thisForm);
    	// следующие две строки удалить в продакшене ////////////////////////////////
    	// this.formIsSend($thisForm);
    	// return false;
	},

	formIsSend: function(form) {
		form.find('.form__info-succes').addClass('is-visible');
	},

	formIsError: function(form) {
		var $thisForm = form;
		$thisForm.find('.form__info-error').addClass('is-visible');
		this.startCheckFormForRemoveInfoError($thisForm);
	},

	startCheckFormForRemoveInfoError: function(form) {
		var $thisForm = form;
		if($thisForm.find('.form__info-error').hasClass('is-visible')) {
				var interval = setInterval(function() {
				if(!$thisForm.find('.error').length && !$thisForm.find('.ui-state-error').length) {
					$thisForm.find('.form__info-error').removeClass('is-visible');
					clearInterval(interval);
				}
				if(!$thisForm.parents('.popup').hasClass('is-visible')) {
					clearInterval(interval);
				}
			}, 100);
		}
	},

	clearForm: function(form) {
		var $form = form;
		if($form.find('.form__info-succes').hasClass('is-visible')) {
			this.hideBlockInfo($form);
		}
	},

	hideInfoSuccess: function(form) {
		$('.form__info-succes').removeClass('is-visible');
	},

	checkNumCharInTextarea: function(ev) {
		var $textarea = $(ev.target);
		var $form = $textarea.parents('form');
		var maxLength = this.params.maxLengthTextarea;
		var textareaValue = $textarea.val();
		var currentLengt = textareaValue.length;
		if(currentLengt > maxLength) {
			textareaValue = textareaValue.substr(0, maxLength);
			$textarea.val(textareaValue);
			this.showInfoMaxLengthInTextarea($form);
		}else{
			this.hideInfoMaxLengthInTextarea($form);
		}
	},

	showInfoMaxLengthInTextarea: function(form) {
		var $form = form;
		var $textarea = $form.find('.' + this.params.classTextareaLimit);
		this.hideBlockInfo();
		$form.find('.form__info-textarea').addClass('is-visible');
		$textarea.addClass('max-length');
	},

	hideBlockInfo: function(form) {
		var $infoIsVisible = $('.form__info').find('.is-visible');
		$infoIsVisible.removeClass('is-visible');
	},

	hideInfoMaxLengthInTextarea: function(form) {
		var $textarea = $('.' + this.params.classTextareaLimit);
		$('.form__info-textarea').removeClass('is-visible');
		$textarea.removeClass('max-length');
	},

	eventOnHoverOrCheckedInput: function() {
		validationEmail.hideInfoMaxLengthInTextarea();
		validationEmail.hideBlockInfo();
		validationForm.startCheckModified($(this));
	},

	startCheckModified: function(input) {
		var $input = input;
		var interval = setInterval(function() {
			$input.change();
		}, 100);
		$input.on('blur', function() {
			clearInterval(interval);
		});
	},

	addTextInPlaceValue: function() {
		var thisValue = $(this).val();
		var arr = thisValue.split('\\');
		var nameFile = arr[arr.length - 1];
	    $(this).parents('.wrap-input-file').find('.input__file-value').text(nameFile);
	},
};