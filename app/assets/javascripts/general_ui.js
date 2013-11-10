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

	// Make Back button close modal ///////////////////////////////////////////

	var current_modal = '';

	$(document).on('shown.bs.modal', '.modal', function() {
		current_modal = $(this).attr('id');
		window.location.hash = '#show-'+current_modal;
	});
	$(document).on('hidden.bs.modal', '.modal', function() {
		removeHash();
		window.location.hash = current_modal = '';
	});
	$(window).on('hashchange', function(e) {
		if(window.location.hash != '#show-'+current_modal) {
			console.log("closing: "+window.location.hash);
			$('#'+current_modal).modal('hide');
		}
		e.preventDefault();
	});
})

// Helpers ////////////////////////////////////////////////////////////////////

// See: http://stackoverflow.com/questions/1397329/how-to-remove-the-hash-from-window-location-with-javascript-without-page-refresh
function removeHash () { 
    var scrollV, scrollH, loc = window.location;
    if ("pushState" in history)
        history.pushState("", document.title, loc.pathname + loc.search);
    else {
        // Prevent scrolling by storing the page's current scroll offset
        scrollV = document.body.scrollTop;
        scrollH = document.body.scrollLeft;

        loc.hash = "";

        // Restore the scroll offset, should be flicker free
        document.body.scrollTop = scrollV;
        document.body.scrollLeft = scrollH;
    }
}