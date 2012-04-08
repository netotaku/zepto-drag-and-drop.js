
    
    var drop = (function(){
    
        var droppables = [];
        
        return {
        
            set: function(el){
                
                droppables.push(el);
                
                return el;
                
            },
            
            items: function(){
                
                return droppables;
            }
            
        }
        
    })();
    
    ////////////////////////////////////////////////////
    
    var drag = (function(){

        // var styleSheet = {};
        var draggables = [];
        var draggable;
        var hits;
        
        function arrange(el){
        
            for(var i = 0; i < draggables.length; i++){
                
                $(draggables[i]).css({'z-index': '0'});
                
            }
            
            $(el).css({'z-index': '1'});
            
        }
        
        function hitTest(el){
            
            var hits = [];
        
            for(var i = 0; i < drop.items().length; i++){
                
                if(rect.collision(drop.items()[i], el)) hits.push(drop.items()[i]);
                
            }
            
            return hits;
            
        }
		        
        /////
        
        $(window).bind(ev.move(), function(e){

            if(draggable){
                
                $(draggable).css({
                   
                   top: (ev.pointer(e).pageY - draggable.deltaY) + 'px',
                   left: (ev.pointer(e).pageX - draggable.deltaX) + 'px'
                    
                });
                
                if(draggable.c.move) draggable.c.move.call(draggable, hitTest(draggable));

            }

            return false;                
             
        });
                 
        return {
        
            items: function(){
                
                return draggables;
                
            },
        
			reset: function(el){
		
				$(el).attr('style', '');
				el.deltaX = el.deltaY = null;
			
			},
		
            set: function(el, c){
                
                draggables.push(el);
                    
                return $(el).bind(ev.start(), function(e){
	            
					this.c = c || {};
				
                    arrange(this);
                    
                    draggable = this;
                    
		$(this).css({ 'position':'relative' });
			
			this.X = this.X || rect.bounds(this).left;
			this.Y = this.Y || rect.bounds(this).top;
					
			this.deltaX = this.deltaX || (ev.pointer(e).pageX+this.X) - this.X;
			this.deltaY = this.deltaY || (ev.pointer(e).pageY+this.Y) - this.Y;
						
			if(this.c.start) this.c.start.call(this);
			    
			return false;
	    
                }).bind(ev.end(), function(e){
                    
                    draggable = false;
                    
                    if(this.c.drop) this.c.drop.call(this, hitTest(this));
                    
                    return false;
                    
                });
                
            }
        
        };
        
    })();