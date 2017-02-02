
/* Auto resizer for note title textareas */
function textareaAutoResizer() {

	var ta = document.querySelectorAll('textarea.input-title');
	autosize(ta);
}

/* Bind autofocus on 'shown.bs.modal' event a note-modal of given id */
function modalTextareaAutoFocus(modalId, isEditMode) {

	// Bind on shown.bs.modal event
	$(document).on('shown.bs.modal', modalId, function () {
		
		/* focus on title to adjust size: */
 		$( modalId ).find(' textarea.input-title' ).focus();

		/* then blur too: */
		$( modalId ).find(' textarea.input-title' ).blur();

		/* if isEditMode, then finally on focus content: */
 		if(isEditMode === true) {
	 		$( modalId ).find(' textarea.input-content' ).focus();

	 		// Re-run the function with isEditMode = false after some milliseconds, 
	 		// to refresh the bindings and thus, not to unnecessarily focus on content 
	 		// the next time this modal opens
	 		isEditMode = false;
	 		setTimeout(modalTextareaAutoFocus(modalId, isEditMode), 1500);
	 	}
	});
}


/* Set the back button to close any open modal */
function setBackButtonToModalClose() {

	// When any time a modal is shown
	$(".modal").on("shown.bs.modal", function() {
		var urlReplace = "#" + $(this).attr('id'); // make the hash the id of the modal shown
		history.pushState(null, null, urlReplace); // push state that hash into the url
	});

	// If a pushState has previously happened and the back button is clicked, hide any open modals
	$(window).on('popstate', function() {
		$(".modal").modal('hide');
	});
}


/* Set Packery Layout Grid */
var pckry = []; // Array for Packery objects
var pckryIdx = -1; // Index for the Packery instances array
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
		$('.note-modal textarea').on('propertychange keyup keydown input click', setPackeryLayout);
		$('.note-modal [contentEditable]').on('blur keydown keyup paste copy cut mouseup', function() {
			setPackeryLayout();
			setTimeout(setPackeryLayout, 100);
			setTimeout(setPackeryLayout, 250);
			setTimeout(setPackeryLayout, 500);
		});

	});
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

	// Set up the Packery grid
	pckryIdx++;
	pckry[pckryIdx] = new Packery('.notes-container', {
		itemSelector: '.note',
		gutter: 10
	});

	// Add draggabilly
/*	pckry[pckryIdx].getItemElements().forEach(function(itemElem) {
		var draggie = new Draggabilly(itemElem);
		pckry[pckryIdx].bindDraggabillyEvents(draggie);
	});
*/
}

function initLayout() {

	document.onreadystatechange = function() {
		if(document.readyState === 'complete') {
			setLayout(1);
		}
	}
}