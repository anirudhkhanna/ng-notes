
/* Flexible resizer for textareas */
function flexibleTextarea(selector) {

	/* Run flexibleArea.js jQuery plugin */
	$(function() {
		$(selector).flexible();	// Actual call to library
	});
}


/* Bind autofocus on 'shown.bs.modal' event a note-modal of given id */
function modalTextareaAutoFocus(modalId) {

	$(document).on('shown.bs.modal', modalId, function () {
		
		// focus to adjust size:
		$( modalId + ' textarea.input-content' ).focus();
		$( modalId + ' textarea.input-title' ).focus();

		// then blur too:
		$( modalId + ' textarea.input-title').blur();
	});
}


/* Run flexible resizer for textareas */
//flexibleTextarea('.note-modal textarea.input-title');
//flexibleTextarea('.note-modal textarea.input-content');

