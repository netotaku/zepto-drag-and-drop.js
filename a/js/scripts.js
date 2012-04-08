$(function(){
		
			// set dragables
			$('.letters li').each(function(){
			
				drag.set(this, {
					start: function(){
                        // add actions here to fire when drag starts
                    },
                    move: function(hits){
						
						var di = drop.items();
						for(var i = 0; i < di.length; i++) $(di[i]).attr('style', '');
						
                        if(hits.length) {
                            $(hits).css('background', '#f90');    
                            $(rect.closest(hits, this)).css('background', 'red');                                                    
                        }
                    },
                    drop: function(hits){
                        if(hits.length) {
                            // snap dragable to droppable
							rect.snap(this, rect.closest(hits, this));
                        } else {
							// or set this to return to original position
							drag.reset(this);	
						}
                    }				
					
				});
			
			});
			
			// set dropables
			$('.solution li').each(function(){
				drop.set(this);
			});
		
		});