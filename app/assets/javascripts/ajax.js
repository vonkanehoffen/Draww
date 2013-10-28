$(function(){
	
	// Update vote count //////////////////////////////////////////////////////

	// In modal
    $(document).on('ajax:complete', '.vote-link', function(evt, xhr, status) {
        console.log("evt: evt", evt, "xhr", xhr, "status", status);
        var vote_count = $(evt.target).parents('.post-show').find('.vote-count');
        if(status == 'success') {
            vote_count.text(xhr.responseJSON.post.vote_count);
        } else {
            if(xhr.status == 401) {
                vote_count.popover('show'); 
            }
            vote_count.html(vote_count.data('old-count'));
        }
    });

    $(document).on('ajax:send', '.vote-link', function(evt, data, status, xhr) {
        var vote_count = $(evt.target).parents('.post-show').find('.vote-count');
        vote_count.data('old-count', vote_count.html());
        vote_count.html('<div class="spinner"></div>');
    });

    // On posts/index
    $(document).on('ajax:success', '.vote', function(evt, data, status, xhr) {
    	$(evt.target).text(data.post.vote_count);
    });
    $(document).on('ajax:send', '.vote', function(evt, data, status, xhr) {
        $(evt.target).html('<div class="spinner"></div>');
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