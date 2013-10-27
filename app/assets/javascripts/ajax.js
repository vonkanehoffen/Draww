$(function(){
	
	// Update vote count //////////////////////////////////////////////////////

	// In modal
    $(document).on('ajax:success', '.vote-link', function(evt, data, status, xhr) {
        //console.info(evt);
        $(evt.target).parents('.post-show').find('.vote-count').text(data.post.vote_count);
    });

    // On posts/index
    $(document).on('ajax:success', '.vote', function(evt, data, status, xhr) {
    	$(evt.target).text(data.post.vote_count);
    });

    // Pagination /////////////////////////////////////////////////////////////

    $(document).on('ajax:success', '.load-more a', function(evt, data, status, xhr) {
    	$(evt.target).parents('.load-more').before($(data).find('.post'));
    	$(evt.target).parents('.load-more').replaceWith($(data).find('.load-more'));
    });
    $(document).on('ajax:send', '.load-more a', function(evt, data, status, xhr) {
        $(evt.target).html('<div class="spinner-grey"></div>');
    });

    // Spinners ///////////////////////////////////////////////////////////////

    $(document).on('show.bs.modal', '.modal', function() {
    	console.log("show.bs.modal");
    	$(this).append('<div class="spinner"></div>');
    });
    $(document).on('shown.bs.modal', '.modal', function() {
    	console.log("shown.bs.modal");
    	$(this).find('.spinner').remove();
    });

})