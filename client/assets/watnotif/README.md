# WatNotif.js
WatNotif is an elegant pure JS &amp; CSS stackable notifications plugin with configurable timer, keep-on-hover and close built-in functionalities.

**[See Plugin's website](https://tepec.github.io/watnotif/)**

**[See demos](https://tepec.github.io/watnotif/examples/top-right-bubble.html)**

## COMING SOON List 

> * ~~Put at least a few demo/examples~~ [Done!]
> * ~~Add a few more themes~~ [Done!]
> * ~~Make this page prettier~~ [Done!]
> * ~~Add SASS files~~ [Done!]
> * Add note on browser compatibility
> * Create a module for notification center


## To get WatNotif, download this repository from Github OR use bower 
```
bower install watnotif
```

## 1. Include the stylesheet you want in the HTML head of the page.

**Example:**

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    
    <!-- the Notif stylesheet you choosed -->
    <link rel="stylesheet" type="text/css" href="/dist/css/<style you want>/<file you want>.min.css" />
    
    <!-- your own stylesheets -->
  </head>
  <body>
  <!-- your body -->
  </body>
</html>
```


*Note: There are different stylesheets, based on :* 

* horizontal positioning 
* vertical positioning
* animation & transition

You have to include only one of them depending on how you want to display the notifications on your website. 


## 2. Include the javascript at the end of the body.
**Example:**

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <!-- your meta, styles, favico, and so on -->
  </head>
  <body>
  <!-- your body -->
  
  <!-- the Notif plugin script -->
  <script type="text/javascript" src="/dist/js/watnotif-1.0.min.js"></script>
  </body>
</html>
```


## 3. Set the general settings for all of your notifications (duration in milliseconds) 

This is optional as there is a default value and the duration is manageable through the .display(duration) method.

If you set the duration value to less than 1 millisecond, it won't be dismissed automatically

**Example: **

```javascript
document.addEventListener('DOMContentLoaded', function() { // make sure the DOM is fully loaded before starting anything
  Notif.setWrapperOptions({ duration: 4000 });
}, false);
```


## 4. Define notifications 

**Examples: **

```javascript 
var successNotif = new Notif("Yay, this message notifies you about the success of whatever!", "success");
var errorNotif = new Notif("Oups, this is a notification you usually hope to not display.", "error");
var confirmedNotif = new Notif("Let's just confirm that whatever happened.", "confirmed");
var defaultNotif = new Notif("This message is just meant to say hi; so \"hi!\"", "default");
```


## 5. Bind the notifications to something.

```html 
<!-- in your HTML body -->
<button id="my-button">Gimme my notif</button>
```
```javascript 
// In your own javascript
var myNotif = new Notif('Hey, what about this very nice notification, with a <a href="#">link</a> and everything?', "default");
document.getElementById('my-button').addEventListener('click', function(e) {
  myNotif.display(3500);
  /* You could also chain everything if it's a one time notification, such as:
   * new Notif('This is a one time notification, so no need to keep it in a JS variable.', "confirmed").display(4000);
   */
});
```
