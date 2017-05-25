
/* Header on-scroll effects */
/* ************************ */
$(window).scroll(function() {
	if($(this).scrollTop() == 0) {
		$('.header').removeClass('header-scrolled');
	}
	else {
		$('.header').addClass('header-scrolled');
	}
});


/* Menu toggle script */
/* ****************** */
$(document).ready(function() {
	$('#menu-toggle').click(function(e) {
		e.preventDefault();
		$('.notes-container').toggleClass('notes-toggled');
		$('.sidebar-container').toggleClass('sidebar-toggled');
		$('.swipe-listener').toggleClass('swipe-toggled');
	});
});


/* Swipe/click to open and close the sidebar on small devices */
/* ********************************************************** */
$(document).ready(function() {

	var isMobile = window.matchMedia('only screen and (max-width: 800px)');

	if(isMobile.matches) {

		// add swipe on swipe-listener
		$('.swipe-listener').swipe({
			swipeStatus: function(event, phase, direction, distance, duration, fingers) {
				// swipe right
				if(phase == 'move' && direction == 'right') {
					$('.sidebar-container').addClass('sidebar-toggled');
					$('.swipe-listener').addClass('swipe-toggled');
					return false;
				}
				// swipe left
				if(phase == 'move' && direction == 'left') {
					$('.sidebar-container').removeClass('sidebar-toggled');
					$('.swipe-listener').removeClass('swipe-toggled');
					return false;
				}
			}
		});

		// add swipe on sidebar-container
		$('.sidebar-container').swipe({
			swipeStatus: function(event, phase, direction, distance, duration, fingers) {
				// swipe right
				if(phase == 'move' && direction == 'right') {
					$('.sidebar-container').addClass('sidebar-toggled');
					$('.swipe-listener').addClass('swipe-toggled');
					return false;
				}
				// swipe left
				if(phase == 'move' && direction == 'left') {
					$('.sidebar-container').removeClass('sidebar-toggled');
					$('.swipe-listener').removeClass('swipe-toggled');
					return false;
				}
			}
		});

		// add click on links in the sidebar (automatically close the sidebar when user selects a link)
		$('.sidebar-container a').on('click', function() {
			$('.sidebar-container').removeClass('sidebar-toggled');
			$('.swipe-listener').removeClass('swipe-toggled');
		});

	} // if over
});


/* Ripple effects */
/* ************** */
function setRippleEffects() {

	var parent, elem, d, x, y;

	/* Ripple (normal) */
	$('.ripple').click(function(e) {

		parent = $(this).parent();
		// create the .ripple-effect element if it does not exist
		if(parent.find('.ripple-effect').length == 0)
			parent.prepend('<span class="ripple-effect"></span>');

		elem = parent.find('.ripple-effect');
		// in case of quick double clicks, stop the previous animation
		elem.removeClass('animate');

		// set the size of .ripple-effect
		if(!elem.height() && !elem.width()) {
			// use the parent's width or height, whichever is larger, for the diameter 
			// to make a circle which can cover the entire element
			d = Math.max(parent.outerWidth(), parent.outerHeight());
			elem.css({height: d, width: d});
		}

		// get the click coordinates
		// (expression: click coordinates relative to page - parent's position relative to page - half of self height/width to make it controllable from the center)
		x = e.pageX - parent.offset().left - elem.width()/2;
		y = e.pageY - parent.offset().top - elem.height()/2;

		// set the position and add the .animate class
		elem.css({top: y + 'px', left: x + 'px'}).addClass('animate');
	});

	/* Ripple (light) */
	$('.ripple-light').click(function(e) {

		parent = $(this).parent();
		// create the .ripple-effect-light element if it does not exist
		if(parent.find('.ripple-effect-light').length == 0)
			parent.prepend('<span class="ripple-effect-light"></span>');

		elem = parent.find('.ripple-effect-light');
		// in case of quick double clicks, stop the previous animation
		elem.removeClass('animate');

		// set the size of .ripple-effect-light
		if(!elem.height() && !elem.width()) {
			// use the parent's width or height, whichever is larger, for the diameter 
			// to make a circle which can cover the entire element
			d = Math.max(parent.outerWidth(), parent.outerHeight());
			elem.css({height: d, width: d});
		}

		// get the click coordinates
		// (expression: click coordinates relative to page - parent's position relative to page - half of self height/width to make it controllable from the center)
		x = e.pageX - parent.offset().left - elem.width()/2;
		y = e.pageY - parent.offset().top - elem.height()/2;

		// set the position and add the .animate class
		elem.css({top: y + 'px', left: x + 'px'}).addClass('animate');
	});
}

$(document).ready(function() {
	setRippleEffects();
});


/* Return current date in specific format as a string */
/* ************************************************** */
function getCurrentDate() {

	var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
	var d = new Date();

	return months[d.getMonth()] + ' ' + d.getDate() + ', ' + d.getFullYear();
}


/* Reverse comparator function for comparing timestamps of notes while sorting */
/* *************************************************************************** */
function reverseCompareTimestamps(note1, note2) {

	if(note1.timestamp > note2.timestamp)
		return -1;
	if(note1.timestamp < note2.timestamp)
		return 1;
	return 0;
}


/* Auto resizer for note title textareas */
/* ************************************* */
function textareaAutoResizer() {

	var ta = document.querySelectorAll('textarea.input-title');
	autosize(ta);
}


/* Set the back button to close any open modal */
/* ******************************************* */
function setBackButtonToModalClose() {

	// When any time a modal is shown
	$('.modal').on('shown.bs.modal', function() {

	/*	var urlReplace = '#' + $(this).attr('id'); // make the hash the id of the modal shown
		history.pushState(null, null, urlReplace); // push state that hash into the url

		// (this is not working with UI-Router because it changes the url)
	*/
	//	history.pushState(null, null, ''); // push state a blank (this is also not working now)
		history.pushState(null, null, window.location.hash); // push state the current hash
	});

	// If a pushState has previously happened and the back button is clicked, hide any open modals
	$(window).on('popstate', function() {
		$('.modal').modal('hide');
	});
}


/* Set the Packery layout grid */
/* *************************** */
var pckry = []; // Array for Packery objects
var pckryIdx = -1; // Index for the Packery array
var pckryMaxInstances = 50; // Maximum Packery instances tolerable

function setLayout(iterations) {

	iterations = (typeof iterations !== 'undefined') ? iterations : 1;

	$(document).ready(function() {

		setPackeryLayout();

		// Reset again every 500 milliseconds for the remaining iterations
		var ms = 500;
		for(var i = 1; i < iterations; i++) {
			setTimeout(setPackeryLayout, ms);
			ms = ms + 500;
		}
	});
}

function initLayout() {

	document.onreadystatechange = function() {
		if(document.readyState === 'complete') {
			setLayout(1);
		}
	}
}

function setPackeryLayout() {

	// Destroy the previous Packery instance(s) when too many have been created
	if(pckryIdx + 1 >= pckryMaxInstances) {
		for(var i = 0; i <= pckryIdx; i++) {
			if(pckry[i] !== null && typeof pckry[i] === 'object') {
				pckry[i].destroy(); // destroy the Packery instance
				pckry[i] = null; // reset the array element
			}
		}
		pckryIdx = -1; // reset the Packery index to -1
	}

	// Set up the Packery grid instance
	pckryIdx++;
	pckry[pckryIdx] = new Packery('.notes-container', {
		itemSelector: '.note',
		gutter: 12
	});

	// Add Draggabilly for drag functionality
/*
	(ignoring for now)
	pckry[pckryIdx].getItemElements().forEach(function(itemElem) {
		var draggie = new Draggabilly(itemElem);
		pckry[pckryIdx].bindDraggabillyEvents(draggie);
	});
*/
}


/* Set the tooltips */
/* **************** */
var optTooltipOptions = {
	theme: ['tooltipster-borderless', 'tooltipster-borderless-customized'],
	animation: 'grow',
	animationDuration: [400, 0],
	delay: 0,
	side: 'bottom',
	distance: 12,
	arrow: false
};

$(document).ready(function() {

	$('.opt-tooltip').tooltipster(optTooltipOptions);

	$('body').on('mouseenter', '.opt-tooltip:not(.tooltipstered)', function() {
		$(this)
			.tooltipster(optTooltipOptions)
			.tooltipster('open');
	});
});


/* Set the speech-related functions */
/* ******************************** */
var targetbox;
var final_transcript = '';
var recognizing = false;
var ignore_onend;
var start_timestamp;

if(!('webkitSpeechRecognition' in window)) {

	$(document).ready(function() {
		$('.modal .speech-input').removeClass('icon-mic');
		$('.modal .speech-input').addClass('icon-mic-slash');
		$('.modal .speech-input').addClass('opt-icon-lg-disabled');
		$('.modal .speech-input').attr('title', 'Speech input is not supported in your browser.');
		$('.modal .speech-input').tooltipster('destroy');
		$('.modal .speech-input').tooltipster(optTooltipOptions);
	});

}
else {

	var recognition = new webkitSpeechRecognition();
	recognition.continuous = true;
	recognition.interimResults = true;

	recognition.onstart = function() {
		recognizing = true;
		$('.modal .speech-input').removeClass('icon-mic');
		$('.modal .speech-input').removeClass('icon-mic-slash');
		$('.modal .speech-input').addClass('icon-mic-active');
	};

	recognition.onerror = function(event) {
		if(event.error == 'no-speech') {
			$('.modal .speech-input').removeClass('icon-mic-slash');
			$('.modal .speech-input').removeClass('icon-mic-active');
			$('.modal .speech-input').addClass('icon-mic');

			alert('No speech was detected. You may need to adjust your microphone settings.');
			ignore_onend = true;
		}
		if(event.error == 'audio-capture') {
			$('.modal .speech-input').removeClass('icon-mic-slash');
			$('.modal .speech-input').removeClass('icon-mic-active');
			$('.modal .speech-input').addClass('icon-mic');

			alert('No microphone was found. Ensure that a microphone is installed and the microphone settings are configured correctly.');
			ignore_onend = true;
		}
		if(event.error == 'not-allowed') {
			if(event.timeStamp - start_timestamp < 100) {
				alert('Permission to use microphone is blocked.');
			}
			else {
				alert('Permission to use microphone was denied.');
			}
			ignore_onend = true;
		}
	};

	recognition.onend = function() {
		recognizing = false;

		if(ignore_onend) {
			return;
		}

		$('.modal .speech-input').removeClass('icon-mic-active');
		$('.modal .speech-input').addClass('icon-mic');

		if(!final_transcript) {
			return;
		}

	/*	
		if(window.getSelection) {
			window.getSelection().removeAllRanges();
			var range = document.createRange();
			range.selectNode(document.getElementById('final_span'));
			window.getSelection().addRange(range);
		}
	*/
	};

	recognition.onresult = function(event) {
		var interim_transcript = '';
		final_transcript = '';

		for(var i = event.resultIndex; i < event.results.length; ++i) {
			if(event.results[i].isFinal) {
				final_transcript += event.results[i][0].transcript;
			}
		/*	else {
				interim_transcript += event.results[i][0].transcript;
			}
		*/
		}

/*		final_transcript = capitalize(final_transcript);
		final_transcript = linebreak(final_transcript);
*/
		$(targetbox).append(final_transcript);
	};

} // else is over

function startDictation(event, editbox) {

	targetbox = editbox;

	setEndOfContenteditable(targetbox);	// set focus at the end

	if(recognizing) {
		recognition.stop();
		return;
	}

	final_transcript = '';
	recognition.start();
	ignore_onend = false;

	$('.modal .speech-input').removeClass('icon-mic');
	$('.modal .speech-input').addClass('icon-mic-slash');

	start_timestamp = event.timeStamp;
}

function setEndOfContenteditable(editbox) {	// function to set focus at the end of contenteditable box

	$(editbox).attr('id', 'edit-box');
	contentEditableElement = document.getElementById('edit-box');

	var range, selection;
	if(document.createRange) {	// Firefox, Chrome, Opera, Safari, IE 9+
		range = document.createRange(); // create a range (a range is a like the selection, but invisible)
		range.selectNodeContents(contentEditableElement); // select the entire contents of the element with the range
		range.collapse(false); // collapse the range to the end point. false means collapse to end rather than the start
		selection = window.getSelection(); // get the selection object (allows you to change selection)
		selection.removeAllRanges(); // remove any selections already made
		selection.addRange(range); // make the range you have just created the visible selection
	}
	else if(document.selection) // IE 8 and lower
	{
		range = document.body.createTextRange(); // create a range (a range is a like the selection, but invisible)
		range.moveToElementText(contentEditableElement); // select the entire contents of the element with the range
		range.collapse(false); // collapse the range to the end point. false means collapse to end rather than the start
		range.select(); // select the range (make it the visible selection)
	}
}
