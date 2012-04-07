	
	var ev = (function(){
    
        var hasTouch = 'ontouchstart' in window;
        
        return {
            start: function(){ return hasTouch ? 'touchstart' : 'mousedown'; },
            move: function(){ return hasTouch ? 'touchmove' : 'mousemove'; },
            end: function(){ return hasTouch ? 'touchend' : 'mouseup'; },
            cancel: function(){ return hasTouch ? 'touchcancel' : 'mouseup'; },
            isMobile: function(){ return hasTouch; },
            pointer: function(e){ return ev.isMobile() ? event.touches[0] : event; }
        }
        
    })();