$(function(){

	// Full screen action /////////////////////////////////////////////////////

	$(document).on('click', '.post-fullscreen', function() {
		$(this).parents('.modal-dialog').width('100%');
	});

	// Close modal posts/show when image clicked /////////////////////////////

	$(document).on('click', '.modal-body img', function() {
		$(this).parents('.modal').modal('hide');
	});

	// Focus Username field for login modal ///////////////////////////////////

	$('#login-modal').on('shown.bs.modal', function() {
		$('#user_username').focus();
	});

	// Show tooltips //////////////////////////////////////////////////////////

	$('.vote').tooltip({
		placement: 'left'
	});

})