// Draww JS v3

var uploader = {

	img: false,			// Imported image

	// Initialise uploader //////////////////////////////////////////////////////////////

	init: function() {
    	paper.setup('uploader-pjs');
	    uploader.ctrl.build();
	    
	    // Mouse tool Handlers

	    var tool = new paper.Tool();

	    tool.onMouseDown = function(evt) {
	    	uploader.img.lastCenter = uploader.img.position;
		}
	    tool.onMouseDrag = function(evt) {
			var moveHit = uploader.img.hitTest(evt.point);
			if(moveHit) {
				uploader.ctrl.move(evt); 
			}
		}
		$('#uploader-rotate').click(function(){
			uploader.ctrl.rotate();
		})
		$('#uploader-pjs').hover(function(){
			uploader.ctrl.show();
		}, function(){
			uploader.ctrl.hide();
		});
		$('#uploader-save').click(function(){
			uploader.ctrl.prepareSave();
		})

		// Drag & Drop Handlers

	    $('#drop-area .target, .new-post a.inner').bind('dragover', function() {
	    	$(this).addClass('over');
	    });
	    $('#drop-area .target, .new-post a.inner').bind('dragleave dragexit', function() {
	    	$(this).removeClass('over');
	    });
	    $('#drop-area .target, #uploader-pjs').bind("drop", uploader.drop);

	    console.log('Uploader initialised');
	},

	// Handle Image Drop ////////////////////////////////////////////////////////////////

	drop: function(event) {
		event.preventDefault();
        console.info(event);
        var file = event.originalEvent.dataTransfer.files[0];
        var reader = new FileReader();

        reader.onload = function(event) {
            var img = document.createElement('img');
            img.onload = function () {
                uploader.initImage(img);
                paper.view.draw();
            }
            img.src = event.target.result;
        };
        reader.readAsDataURL(file);
        console.log("uploader.drop",event);
	},

	// Init and scale image after drop //////////////////////////////////////////////////

    initImage: function(img) {
        $('#drop-area').hide();
        $('#uploader').show();
        var view_width = $('#uploader').width();
    	console.log('resizing canvas to #uploader width: ', view_width);
    	paper.view.viewSize = [view_width, view_width];
        uploader.img = new paper.Raster(img);
        img = uploader.img;

       	uploader.img.ratio = img.size.height / img.size.width;
        img.position = paper.view.center;
        uploader.img.lastCenter = img.position;

        if(img.size.width > img.size.height) {
        	uploader.img.orientation = 'landscape';
				var s = paper.view.size.height/img.size.height;
				img.scale(s);
				img.currentScale = s;

        } else {
        	uploader.img.orientation = 'portrait';
				var s = paper.view.size.width/img.size.width;
				img.scale(s);
				img.currentScale = s;

        }
        uploader.defineMoveLimits();
        uploader.ctrl.build();
	},

	defineMoveLimits: function() {
		// for ctrl.move
		var img = uploader.img,
			iw = img.size.width*img.currentScale,
			ih = img.size.height*img.currentScale,
			vw = paper.view.size.width,
			vh = paper.view.size.height;

		img.left_limit = (img.orientation == "landscape") ? iw/2 : ih/2;
		img.right_limit = vw - img.left_limit;
		img.top_limit = (img.orientation == "landscape") ? ih/2 : iw/2;
		img.bottom_limit = vh - img.top_limit;		
	},

	// Image position controls //////////////////////////////////////////////////////////

	ctrl: {

		x_arrow: false,
		y_arrow: false,

		build: function() {
			uploader.ctrl.x_arrow = paper.project.importSVG(document.getElementById('x_arrow_svg'));
    		uploader.ctrl.y_arrow = paper.project.importSVG(document.getElementById('y_arrow_svg'));
    		uploader.ctrl.x_arrow.visible = false;
			uploader.ctrl.y_arrow.visible = false;
    		uploader.ctrl.x_arrow.position = paper.view.center;
			uploader.ctrl.y_arrow.position = paper.view.center;
		},

		show: function() {
			if(uploader.img.orientation == 'landscape') {
				uploader.ctrl.x_arrow.visible = true;
			} else {
				uploader.ctrl.y_arrow.visible = true;
			}
		},

		hide: function() {
			uploader.ctrl.x_arrow.visible = false;
			uploader.ctrl.y_arrow.visible = false;
		},

		move: function(evt) {
			var img = uploader.img;
			if(img.orientation == 'portrait') {

				var new_y = (evt.point.y - evt.downPoint.y)+img.lastCenter.y;
				if(new_y > img.bottom_limit && new_y < img.top_limit) {
					img.position = [ img.position.x, new_y ];
				}

			} else {

				var new_x = (evt.point.x - evt.downPoint.x)+img.lastCenter.x;
				if(new_x > img.right_limit && new_x < img.left_limit) {
					img.position = [ new_x, img.position.y ];
				}
			}

		},

		rotate: function() {
			uploader.img.position = paper.view.center;
			uploader.img.rotate(90, paper.view.center);
			if(uploader.img.orientation == 'portrait') {
				// ...it's now landscape so:
				uploader.img.orientation = 'landscape';
			} else {
				uploader.img.orientation = 'portrait';
			}
			paper.view.draw();
			uploader.defineMoveLimits();
		},

		// Saving ///////////////////////////////////////////////////////////////////////

		prepareSave: function() {
			console.log("prepareSave", paper.view.size);
			var wo = paper.view.size.width;
			var ho = paper.view.size.height;
			var xo = uploader.img.size.width;
			$('#uploader').hide();
			$('#uploader-saving').width(wo).height(ho).addClass('spinner-grey');
			$('#uploader-saving').show();
			uploader.ctrl.hide();
			uploader.img.position = [
				uploader.img.position.x / paper.view.size.width * 960,
				uploader.img.position.y / paper.view.size.height * 960
			];
			uploader.img.scale(960/paper.view.size.width);
			paper.view.viewSize = [960,960];
			var image_data = document.getElementById("uploader-pjs").toDataURL("image/jpeg", 0.9);
			$('#post_image_data').val(image_data);
		}
	}
}

// Init & Attach main event handlers /////////////////////////////////////////////////////////

$(document).ready(function(){
	console.log("draww3 loaded");
	$(window).bind("dragenter dragover dragleave dragexit drop", function(event) {
        event.preventDefault();
    });

    // Initialise uploader when the modal loads
	$('#new-post-modal').on('shown.bs.modal', function() {
		if($('#uploader-pjs').length) {
			uploader.init();
		}		
	});
	
	// Show new post modal on drop into new post icon tile
	$('.new-post a.inner').bind('drop', function(evt) {
		event.preventDefault();
		$(this).removeClass('over');
		console.log("direct drop");
		// $('#new-post-modal').modal({'show': true, 'remote': $(this).attr('href')});
		$('#new-post-modal').modal('show');
		uploader.drop(evt);
	});

	// // Init uploader on drop inside new post modal
	// $('#new-post-modal').on('shown.bs.modal', function() {
	// 	console.log("normal uploader init");
	// });

});
