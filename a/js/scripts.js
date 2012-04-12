
	
	var util = (function(){
		
		var debug = $('<div />').appendTo('body').css({
		
			'position': 'absolute',
			'top': '0px',
			'right': '0px',
			'padding': '10px'
		
		});
		
		var api = 'http://api.wordnik.com/v4/words.json/randomWord?';
		
		var uri_defaults = {
			api_key: 'ab4a7b80a68c400feeb3e0df9340fb4a3461436f5049107c6',
			callback: '?'
		}
	
		return {
		
			uri: function(c){
								
				var params = $.extend(c, uri_defaults);   
				var o = '';
			 
				for(param in params) o += param + '=' + params[param] + '&';
					 
				return api + o.slice(0, -1);			
			
			},
			
			trace: function(str){
			
				debug.html(str);
			
			}
		
		}
	
	
	})();
	
	
	
	$(function(){

		$.getJSON(util.uri({
			maxLength: 10,
			minLength: 4    
		}), function(data){
			
			util.trace(data.word);
			
		});
	
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