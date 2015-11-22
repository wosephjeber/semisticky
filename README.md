#Semi-Sticky Navigation
A simple jQuery plugin to create a semi-sticky navigation bar. I really need to figure out a better term for this interaction. You can [check out a demo here](http://wosephjeber.github.io/semisticky)

##Usage

```javascript
// Initiate plugin on the nav element using default options
$('nav').semisticky();

// Initiate plugin with all the options
$('nav').semisticky(function() {
  offsetLimit: 40,
  scrollThreshold: 20,
  onScroll: function(delta) {
    ...
  }
});
```

##Options

Option | Type | Description | Default
-------|------|-------------|--------
offsetLimit | integer | The height (in pixels) of how much the navigation should be hidden while scrolling down. | Defaults to `element.outerHeight()`
scrollThreshold | integer | The amount that must be scrolled before interaction starts | 0
onScroll | function | Callback function that executes after each scroll event. `this` refers to the SemiSticky object, and the delta (the change in scroll position) is passed as the only argument. | Empty function
