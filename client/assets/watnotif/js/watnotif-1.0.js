/*!
Script WatNotif.js
Author: Rémi Carles
Creation: 2015/07/10
Last Modified: 2017/03/20
Version: 1.0
Dependency : watnotif.<horizontalPosition>-<verticalPosition>-<FX>.css
Comment: Simplified the use (no need to configure position or style here, just embed a dedicated CSS file)
*/
'use-strict';

/* Constructor call */
var Notif = function(message, type) { 
    this.message = message || " ",
    this.type = type || "default"; // Can be: "default, "confirmed", "success", "error";
    Notif.prototype.hasBeenInit = Notif.prototype.hasBeenInit ? true : this.init();
    return this;
};

/* Parameters with setter function */
Notif.setWrapperOptions = function set(params) { // Note: is useful only before the wrapper is actually appended to the document body.
    Notif.prototype.duration = params.duration || 2500;
};

/* Returns the notifications container; if it doesn't exist, it creates & appends it to the document body. */
Notif.prototype.getWrapper = function getWrapper() {
    var wrapperElem;
    if(!!document.getElementById('watnotif-wrapper')) 
        wrapperElem = document.getElementById('watnotif-wrapper');
    else {
        wrapperElem    = document.createElement('div');
        wrapperElem.id = 'watnotif-wrapper';
        document.body.appendChild(wrapperElem);
    }
    return wrapperElem;
};

/* Creates en returns a notification DOM Element. */
Notif.prototype.getBase = function getBase(classes, msg) {
    var baseElem = document.createElement('div');
    var closeBtn = document.createElement('button');
    var msgElem  = document.createElement('p');
    (function(btn) { // Setting up the close button DOM Element.
        btn.setAttribute('type', 'button'); 
        btn.className = 'close-notif'; 
        btn.innerHTML = '&times;'; 
    })(closeBtn);
    (function(p) { // Setting up the message container DOM Element.
        p.className = 'msg'; 
        p.innerHTML = msg 
    })(msgElem);
    (function(el) { // Setting up the whole notification Element. 
        el.setAttribute('data-role', 'notification'); 
        el.className = 'notif ' + classes + ' inactive'; 
        el.appendChild(closeBtn);
        el.appendChild(msgElem);
    })(baseElem);
    return baseElem;
};

/* Initializing the mechanisms */
Notif.prototype.init = function init() {
    if(!this.hasBeenInit) { // Only once
        /* Handles the click on any notification to close it */
        this.getWrapper().onclick = function(e) { 
            var checkPath = function(target) {
                var node = target.parentNode;
                checkLoop: while(node != document.body) {
                    if(node.getAttribute('data-role') && node.getAttribute('data-role') == 'notification')
                        return node;
                    else 
                        node = node.parentNode;
                }
                return null;
            },
            elem = e.target.getAttribute('data-role') && e.target.getAttribute('data-role') == 'notification' ? e.target : checkPath(e.target);
            if(elem) {
                elem.className += " inactive going-out";
                setTimeout(function() { 
                    if(elem.parentNode == Notif.prototype.getWrapper())
                        Notif.prototype.getWrapper().removeChild(elem); 
                }, 300);
                e.stopPropagation();
            }
            else 
                return true;
        };
        return Notif.prototype.hasBeenInit = true;
    }
}

/* Displays the notification and binds the click and timer */
Notif.prototype.display = function display(duration) {
    var notifElem = this.getWrapper().insertBefore(this.getBase(this.type, this.message), this.getWrapper().firstChild); 
    var duration  = duration || this.duration;
    
    setTimeout(function() { // a very short timeout that ensures first CSS transistions handling by web browsers
        notifElem.className = notifElem.className.replace('inactive', '');
    }, 10);
    if(typeof duration !== 'undefined' && duration > 0) {
        var timer = new Notif.prototype.Timer(function() { notifElem.click(); }, duration);
        notifElem.addEventListener('mouseenter', function(e) {
            timer.pause();
            e.stopPropagation();
        });
        notifElem.addEventListener('mouseleave', function(e) {
            timer.resume();
            e.stopPropagation();
        });
    }
    return this;
}

/* Timer utility for auto-close after a determined amount of time */
Notif.prototype.Timer = function Timer(callback, duration) {
    var timerId, start, remaining = duration;
    this.pause = function() {
        window.clearTimeout(timerId);
        remaining -= new Date() - start;
    };
    this.resume = function() {
        start = new Date();
        window.clearTimeout(timerId);
        timerId = window.setTimeout(callback, remaining);
    };
    this.resume();
}