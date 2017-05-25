
/* Flip forms */
/* ********** */
$(document).ready(function() {

	// Checking for CSS 3D transformation support
	$.support.css3d = supportsCSS3D();

	var formContainer = $('.forms-container');

	// Listening for clicks on the flip buttons
	$('.flip').click(function(e) {
		// Flipping the forms
		formContainer.toggleClass('flipped');

		// If there is no CSS3 3D support, simply hide the signin form (exposing the register form)
		if(!$.support.css3d)
			$('#signin-form').toggle();

		e.preventDefault();
	});

	// Function to check for 3D CSS3 transformations support
	function supportsCSS3D() {
		var props = ['perspectiveProperty', 'WebkitPerspective', 'MozPerspective'];

		testDom = document.createElement('a');
		for(var i = 0; i < props.length; i++)
			if(props[i] in testDom.style)
				return true;

		return false;
	}
});


/* Add smooth scroll to scrolling links */
/* ************************************ */
$(document).ready(function() {

	$('.scroll').click(function(e) {

		// Prevent default anchor click behaviour
		e.preventDefault();

		// Store hash
		var hash = this.hash;

		// Using jQuery animate() method to add smooth page scroll
		$('html, body').animate({scrollTop: $(hash).offset().top}, 700);
	});
});
