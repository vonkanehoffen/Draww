$(document).ready(function(){

	// Full screen action /////////////////////////////////////////////////////

	$(document).on('click', '.post-fullscreen', function() {
		console.log('fullscreen');
		$(this).parents('.modal-dialog').width('100%');
	})

	// Update vote count //////////////////////////////////////////////////////

	// In modal
    $(document).on('ajax:success', '.vote-link', function(evt, data, status, xhr) {
        //console.info(evt);
        $(evt.target).parents('.post-show').find('.vote-count').text(data.post.vote_count);
    });

    // On posts/index
    $(document).on('ajax:success', '.vote', function(evt, data, status, xhr) {
    	$(evt.target).text(data.post.vote_count);
    })

    // Close signup nagging when button clicked ///////////////////////////////

	$('#close-signup-hero').click(function(){
		$('#signup-hero').remove();
	})

	// Focus Username field for login modal ///////////////////////////////////

	$('#login-modal').on('shown.bs.modal', function() {
		$('#user_username').focus();
	})

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
	$('#user_password').focusout(function() {
		$('#user_password_confirmation').removeClass('hidden').focus();
	});

})