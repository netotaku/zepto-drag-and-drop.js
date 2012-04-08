

	var rect = (function(){
		
		return {
			
			mint: function(el){
			  
				return document.createElement(el)     
				
			},
			
			bounds: function(el){
			
				return el.getBoundingClientRect();
			
			},
			
			snap: function(a, b, to){
				
				// snaps a to b 
				
				var ab = rect.bounds(a);
				var bb = rect.bounds(b);
				
				var X, Y;
				
				switch(to){
			
					default:
					
					X = bb.left - a.X;
					Y = bb.top - a.Y;
					   
					$(a).css({
						'left': (X) + 'px',
						'top': (Y) + 'px'
					});
					
					break;
				   
				}
				
			},
			
			collision: function(a, b){
				
				var hit = false;
				
				var aX = rect.bounds(a).left;
				var aY = rect.bounds(a).top;
				var aWidth = rect.bounds(a).width;
				var aHeight = rect.bounds(a).height;
				
				var bX = rect.bounds(b).left;
				var bY = rect.bounds(b).top;
				var bWidth = rect.bounds(b).width;
				var bHeight = rect.bounds(b).height;

				if(!(aX > (bX + bWidth) || (aX + aWidth) < bX) && !(aY > (bY + bHeight) || (aY + aHeight) < bY)) hit = true;
				
				return hit;
				
			},
			
			overlap: function(a, b){
				
				var a = rect.bounds(a);
				var b = rect.bounds(b);
				
				return Math.abs(Math.abs((a.left - b.left))-a.width) * Math.abs(Math.abs((a.top - b.top))-a.height);                
				
			},
			
			closest: function(els, el){
				
				return els.sort(function(a, b){
						
					return rect.overlap(el, a) > rect.overlap(el, b) ? true : false;
						
				}).pop();
				
			}
			
		}
		
	})();