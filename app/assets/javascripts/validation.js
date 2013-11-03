$(function(){

	// Login & Signup form field validation ///////////////////////////////////

	$.validator.setDefaults({
	    highlight: function(element) {
	        $(element).closest('.form-group').addClass('has-error');
	    },
	    unhighlight: function(element) {
	        $(element).closest('.form-group').removeClass('has-error');
	    },
	    errorElement: 'span',
	    errorClass: 'help-block',
	    errorPlacement: function(error, element) {
	        if(element.parent('.input-group').length) {
	            error.insertAfter(element.parent());
	        } else {
	            error.insertAfter(element);
	        }
	    }
	});

	$('form#new_user').validate({
		rules: {
			'user[username]': "required",
			'user[password]': {
				minlength: 8
			},
			'user[password_confirmation]': {
				minlength: 8,
				equalTo: '#user_password'
			}
		},
		messages: {
			'user[password_confirmation]': {
				equalTo: 'Please enter the same password again.'
			}
		}
	});
	
})