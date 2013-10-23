$(document).ready(function(){

	// Full screen action
	$(document).on('click', '.post-fullscreen', function() {
		console.log('fullscreen');
		$(this).parents('.modal-dialog').width('100%');
	})

	// Update vote count 
    $('.vote-link').on('ajax:success', function(evt, data, status, xhr) {
    	console.log("ajax success");
        //console.info(evt);
        $(evt.target).parents('.post-show').find('.vote-count').text(data.post.vote_count);
    });

    // Close signup nagging when button clicked
	$('#close-signup-hero').click(function(){
		$('#signup-hero').remove();
	})
})