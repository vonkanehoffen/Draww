$(function(){

	// Full screen action /////////////////////////////////////////////////////

	$(document).on('click', '.post-fullscreen', function() {
		console.log('fullscreen');
		$(this).parents('.modal-dialog').width('100%');
	})

    // Close signup nagging when button clicked ///////////////////////////////

	$('#close-signup-hero').click(function(){
		$('#signup-hero').remove();
	})

	// Focus Username field for login modal ///////////////////////////////////

	$('#login-modal').on('shown.bs.modal', function() {
		$('#user_username').focus();
	})

	// Show tooltips //////////////////////////////////////////////////////////

	$('.vote').tooltip({
		placement: 'left'
	});

})