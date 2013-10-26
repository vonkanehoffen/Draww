$(document).ready(function(){

	// Full screen action
	$(document).on('click', '.post-fullscreen', function() {
		console.log('fullscreen');
		$(this).parents('.modal-dialog').width('100%');
	})

	// Update vote count 
    $(document).on('ajax:success', '.vote-link', function(evt, data, status, xhr) {
        //console.info(evt);
        $(evt.target).parents('.post-show').find('.vote-count').text(data.post.vote_count);
    });

    // Close signup nagging when button clicked
	$('#close-signup-hero').click(function(){
		$('#signup-hero').remove();
	})

	// Focus Username field for login modal
	$('#login-modal').on('shown.bs.modal', function() {
		$('#user_username').focus();
	})
})