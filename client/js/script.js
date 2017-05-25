
/* Load CSS file dynamically */
/* ************************* */
function loadCSSFile(cssFileHref) {

	var cssFile = document.createElement('link');
	cssFile.setAttribute('rel', 'stylesheet');
	cssFile.setAttribute('href', cssFileHref);
	document.getElementsByTagName('head')[0].appendChild(cssFile);
}


/* Display alert toasts */
/* ******************** */
function alertToast(message, type, duration) {

	if(typeof message !== 'string')
		return;

	var defaultType = 'error';
	var defaultDuration = 3500;

	type = (typeof type === 'string') ? type : defaultType;
	duration = (typeof duration === 'number') ? duration : defaultDuration;

	new Notif(message, type).display(duration);
}


/* Return a random loading message */
/* ******************************* */
function getRandomLoadingMessage() {

	var loadingMessages = [
		'Preparing your data. Hold on tight...',
		'Hold on tight, preparing your stuff...',
		'Hold on tight, making arrangements for your work...',
		'Hold on tight, preparing your workspace...',
	];

	return loadingMessages[Math.floor(Math.random() * loadingMessages.length)];
}
