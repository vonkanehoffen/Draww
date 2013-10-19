$(document).ready(function(){
	// Full screen action
	$(document).on('click', '.post-fullscreen', function() {
		console.log('fullscreen');
		$(this).parents('.modal-dialog').width('100%');
	})

    $('.vote-link').on('ajax:success', function(evt, data, status, xhr) {
        // console.info(evt);
        $(evt.target).parents('.post').find('.vote-count').text(data.post.vote_count);
    });
})