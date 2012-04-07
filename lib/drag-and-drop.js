
    
    var drop = (function(){
    
        var droppables = [];
        
        return {
        
            apply: function(el){
                
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
                
                // $(drop.items()[i]).css('background', '#666');
                
            }
            
            return hits;
            
        }
        
        /////
        
        $(window).bind(ev.move(), function(e){

            if(draggable){
                
                $(draggable).css({
                   
                   top: (ev.pointer(e).pageY + draggable.deltaY) + 'px',
                   left: (ev.pointer(e).pageX + draggable.deltaX) + 'px'
                    
                });
                
                if(draggable.c.move) draggable.c.move.call(draggable, hitTest(draggable));

            }

            return false;                
             
        });
                 
        return {
        
            items: function(){
                
                return draggables;
                
            },
        
            apply: function(el, c){
                
                draggables.push(el);
                               
                return $(el).bind(ev.start(), function(e){
                    
                    this.c = c || {};
                    
                    arrange(this);
                    
                    draggable = this;
                    
                    this.deltaX = rect.bounds(this).left - ev.pointer(e).pageX;
                    this.deltaY = rect.bounds(this).top - ev.pointer(e).pageY;
                    
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