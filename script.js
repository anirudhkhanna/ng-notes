
/* Auto resizer for note title textareas */
function textareaAutoResizer() {

	var ta = document.querySelectorAll('textarea.input-title');
	autosize(ta);
}


/* Set the back button to close any open modal */
function setBackButtonToModalClose() {

	// When any time a modal is shown
	$('.modal').on('shown.bs.modal', function() {
		var urlReplace = '#' + $(this).attr('id'); // make the hash the id of the modal shown
		history.pushState(null, null, urlReplace); // push state that hash into the url
	});

	// If a pushState has previously happened and the back button is clicked, hide any open modals
	$(window).on('popstate', function() {
		$(".modal").modal('hide');
	});
}


/* Set the Packery layout grid */
var pckry = []; // Array for Packery objects
var pckryIdx = -1; // Index for the Packery array
var pckryMaxInstances = 50; // Maximum Packery instances tolerable

function setLayout(iterations) {

	iterations = typeof iterations !== 'undefined' ? iterations : 1;

	$(document).ready(function() {

		setPackeryLayout();

		// Reset again every 500 milliseconds for the remaining iterations
		var ms = 500;
		for(var i = 1; i < iterations; i++) {
			setTimeout(setPackeryLayout, ms);
			ms = ms + 500;
		}

		// Listen to changes in textareas and set the layout
/*		$('.note-modal textarea').on('propertychange keyup keydown input click', setPackeryLayout);
		$('.note-modal [contentEditable]').on('blur keydown keyup paste copy cut mouseup', function() {
			setPackeryLayout();
			setTimeout(setPackeryLayout, 100);
			setTimeout(setPackeryLayout, 250);
			setTimeout(setPackeryLayout, 500);
		});
*/	});
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
		gutter: 10
	});

/*	(ignoring for now)

	// Add Draggabilly for drag functionality
	pckry[pckryIdx].getItemElements().forEach(function(itemElem) {
		var draggie = new Draggabilly(itemElem);
		pckry[pckryIdx].bindDraggabillyEvents(draggie);
	});

*/
}


$(document).ready(function() {

	var tooltipOptOptions = {
    	theme: ['tooltipster-borderless', 'tooltipster-borderless-customized'],
    	animation: 'grow',
    	animationDuration: [400, 0],
   		delay: 0,
   		side: 'bottom',
   		multiple: true,
   		distance: 12,
   		arrow: false
    };

	var tooltipColorsOptions = {
    	theme: ['tooltipster-noir', 'tooltipster-noir-customized'],
    	animation: 'fade',
    	animationDuration: [400, 400],
   		delay: [0, 100],
   		side: 'top',
   		multiple: true,
   		distance: 5,
   		arrow: false,
   		maxWidth: 120,
   		content: $('#colors-template'),
   		contentCloning: false,
   		interactive: true
    };

    $('.tooltip-opt').tooltipster(tooltipOptOptions);
    $('.tooltip-colors').tooltipster(tooltipColorsOptions);

    $('body').on('mouseenter', '.tooltip-opt:not(.tooltipstered)', function(){
    	$(this)
        	.tooltipster(tooltipOptOptions)
        	.tooltipster('open');
	});

});