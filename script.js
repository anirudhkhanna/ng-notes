
/* Flexible resizer for textareas */
function flexibleTextarea(selector) {

	/* Run flexibleArea.js jQuery plugin */
	$(function() {
		$(selector).flexible();	// Actual call to library
	});
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


/* Run flexible resizer for textareas */
//flexibleTextarea('.note-modal textarea.input-title');
//flexibleTextarea('.note-modal textarea.input-content');

//$(document).ready(function (){alert($('.note-opt button').css('color'));})