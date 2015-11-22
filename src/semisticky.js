(function($) {
  $.fn.semisticky = function(options) {
    return this.each(function() {
      new SemiSticky($(this), options);
    });
  };
}(jQuery));

var SemiSticky = function(element, options) {
  var _this = this;
  
  options = $.extend({
    offsetLimit: element.outerHeight(),
    scrollThreshold: 0,
    onScroll: function() {}
  }, options);
  
  this.element = element;
  this.state = 'fixed';
  this.currentOffsetAmount = 0;
  
  this.init = function() {
    var oldScrollTop = $(document).scrollTop();
    var thresholdCounter = 0;
    
    $(window).on('scroll.semisticky', function() {
      var newScrollTop = $(document).scrollTop();
      var delta = newScrollTop - oldScrollTop;
      thresholdCounter = Math.min(Math.max(thresholdCounter - delta, -options.scrollThreshold), options.scrollThreshold);
      var newOffset;

      if (Math.abs(thresholdCounter) >= options.scrollThreshold || _this.state == 'scrolling') {
        if (delta > 0 && _this.state !== 'hidden') {
          
          if (_this.currentOffsetAmount > -options.offsetLimit) {
            _this.currentOffsetAmount = Math.max(_this.currentOffsetAmount - delta, -options.offsetLimit);
            _this.element.css('top', _this.currentOffsetAmount);
            _this.state = 'scrolling';
          } else {
            _this.state = 'hidden';
            thresholdCounter = 0;
          }
          
        } else if (delta < 0 && _this.state !== 'fixed') {
          
          if (_this.currentOffsetAmount < 0) {
            _this.currentOffsetAmount = Math.min(_this.currentOffsetAmount - delta, 0);
            _this.element.css('top', _this.currentOffsetAmount);
            _this.state = 'scrolling';
          } else {
            _this.state = 'fixed';
            thresholdCounter = 0;
          }
          
        }
      }
      
      options.onScroll.call(_this, delta);
      
      oldScrollTop = newScrollTop;
    });
  };
  
  this.die = function() {
    $(window).off('scroll.semisticky');
  };
  
  this.init();
};
