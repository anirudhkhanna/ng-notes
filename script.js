
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
		gutter: 12
	});

/*	(ignoring for now)
	// Add Draggabilly for drag functionality
	pckry[pckryIdx].getItemElements().forEach(function(itemElem) {
		var draggie = new Draggabilly(itemElem);
		pckry[pckryIdx].bindDraggabillyEvents(draggie);
	});

*/
}


/* Set tooltips */
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

$(document).ready(function() {

    $('.tooltip-opt').tooltipster(tooltipOptOptions);

    $('body').on('mouseenter', '.tooltip-opt:not(.tooltipstered)', function(){
    	$(this)
        	.tooltipster(tooltipOptOptions)
        	.tooltipster('open');
	});
});






/* Set speech-related functions */
var resbox;
var final_transcript = '';
var recognizing = false;
var ignore_onend;
var start_timestamp;


if (!('webkitSpeechRecognition' in window)) {

 	$(document).ready(function(){
	
	  $('.modal .speech-input').removeClass('opt-icon-mic');
	  $('.modal .speech-input').addClass('opt-icon-mic-slash');
	  $('.modal .speech-input').addClass('opt-icon-lg-disabled');
	  $('.modal .speech-input').attr('title', 'Speech input is not supported in your browser.');
      $('.modal .speech-input').tooltipster('destroy');
	  $('.modal .speech-input').tooltipster(tooltipOptOptions);
	});
} 
else {
  var recognition = new webkitSpeechRecognition();
  recognition.continuous = true;
  recognition.interimResults = true;
  
  recognition.onstart = function() {
      recognizing = true;
	  $('.modal .speech-input').removeClass('opt-icon-mic');
	  $('.modal .speech-input').removeClass('opt-icon-mic-slash');
	  $('.modal .speech-input').addClass('opt-icon-mic-active');
  };
  
  recognition.onerror = function(event) {
    if (event.error == 'no-speech') {
	  $('.modal .speech-input').removeClass('opt-icon-mic-slash');
	  $('.modal .speech-input').removeClass('opt-icon-mic-active');
	  $('.modal .speech-input').addClass('opt-icon-mic');

	  alert('No speech was detected');
  //    showInfo('info_no_speech');
      ignore_onend = true;
    }
    if (event.error == 'audio-capture') {
	  $('.modal .speech-input').removeClass('opt-icon-mic-slash');
	  $('.modal .speech-input').removeClass('opt-icon-mic-active');
	  $('.modal .speech-input').addClass('opt-icon-mic');
//      showInfo('info_no_microphone');
      ignore_onend = true;
    }
    if (event.error == 'not-allowed') {
      if (event.timeStamp - start_timestamp < 100) {
      	alert('Mic is blocked');
  //      showInfo('info_blocked');
      } else {
  //     showInfo('info_denied');
      }
      ignore_onend = true;
    }
  };
  
  recognition.onend = function() {
    recognizing = false;
    if (ignore_onend) {
      return;
    }
	
	  $('.modal .speech-input').removeClass('opt-icon-mic-active');
	  $('.modal .speech-input').addClass('opt-icon-mic');
    
    if (!final_transcript) {
     // showInfo('info_start');
	    return;
    }
    //showInfo('');
    if (window.getSelection) {
      window.getSelection().removeAllRanges();
      var range = document.createRange();
      range.selectNode(document.getElementById('final_span'));
      window.getSelection().addRange(range);
    }
  };
  
  recognition.onresult = function(event) {
    var interim_transcript = '';

	final_transcript = '';
	
	console.log(event.results.length);
	console.log(event.results);
    for (var i = event.resultIndex; i < event.results.length; ++i) {
      if (event.results[i].isFinal) {
        final_transcript += event.results[i][0].transcript;
      }/* else {
        interim_transcript += event.results[i][0].transcript;
      }*/
    }
    
    //final_transcript = capitalize(final_transcript);
    //final_span.innerHTML = linebreak(final_transcript);

    $(resbox).append(final_transcript);
//	setEndOfContenteditable(resbox);

/*    setTimeout(function() {
    	$(resbox).focus();
	}, 0);
*/




    //interim_span.innerHTML = linebreak(interim_transcript);
     // if (final_transcript || interim_transcript) {
     // showButtons('inline-block');
     //}
  };
}
// else over


function startDictation(event, editbox) {

	resbox = editbox;
//	$(resbox).append('HERE');
/*    setTimeout(function() {
    	$(resbox).focus();
	}, 0);

*/    

	setEndOfContenteditable(resbox);

	//resbox.css('display', 'none');

  if (recognizing) {
    recognition.stop();
    return;
  }

  final_transcript = '';
//  recognition.lang = select_dialect.value;
  recognition.start();
  ignore_onend = false;
//  final_span.innerHTML = '';
//  interim_span.innerHTML = '';
	$('.modal .speech-input').removeClass('opt-icon-mic');
	$('.modal .speech-input').addClass('opt-icon-mic-slash');
//  showInfo('info_allow');
//  showButtons('none');
  start_timestamp = event.timeStamp;
}




function setEndOfContenteditable(editbox)
{
	$(editbox).attr('id', 'resbox');
	contentEditableElement = document.getElementById('resbox');


    var range,selection;
    if(document.createRange)//Firefox, Chrome, Opera, Safari, IE 9+
    {
        range = document.createRange();//Create a range (a range is a like the selection but invisible)
        range.selectNodeContents(contentEditableElement);//Select the entire contents of the element with the range
        range.collapse(false);//collapse the range to the end point. false means collapse to end rather than the start
        selection = window.getSelection();//get the selection object (allows you to change selection)
        selection.removeAllRanges();//remove any selections already made
        selection.addRange(range);//make the range you have just created the visible selection
    }
    else if(document.selection)//IE 8 and lower
    { 
        range = document.body.createTextRange();//Create a range (a range is a like the selection but invisible)
        range.moveToElementText(contentEditableElement);//Select the entire contents of the element with the range
        range.collapse(false);//collapse the range to the end point. false means collapse to end rather than the start
        range.select();//Select the range (make it the visible selection
    }
}



/* Header on-scroll effects */
$(window).scroll(function() {
    if ($(this).scrollTop() == 0) {
        $('.header').removeClass('header-scrolled');
        $('.brand a').removeClass('brand-scrolled');
    }
    else {
        $('.header').addClass('header-scrolled');
        $('.brand a').addClass('brand-scrolled');
    }
});

/*$(document).ready(function() {

	$("[data-toggle=popover]").popover({
		placement: 'top',
    	html: true, 
		content: function() {
        	  		return $('#popover-content').html();
    			}
	});



	$(".pophover").popover({ trigger: "manual" , html: true, animation:false})
    .on("mouseenter", function () {
        var _this = this;
        $(this).popover("show");
        $(".popover").on("mouseleave", function () {
            $(_this).popover('hide');
        });
    }).on("mouseleave", function () {
        var _this = this;
        setTimeout(function () {
            if (!$(".popover:hover").length) {
                $(_this).popover("hide");
            }
        }, 300);
	});
});*/


