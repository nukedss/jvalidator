(function($){
	$.fn.validator=function(options){
		var settings = $.extend( {  type: 'int', debug: false, pvalName: 'pval',
									email: {
										regex: /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.(?:[A-Z]{2}|com|org|net|edu|gov|mil|biz|info|mobi|name|aero|asia|jobs|museum)$/g,
										defaultVal: ""
									},
									phoneNumber: {
										regex: /(?:(?:\+?1\s*(?:[.-]\s*)?)?(?:\(\s*([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9])\s*\)|([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9]))\s*(?:[.-]\s*)?)?([2-9]1[02-9]|[2-9][02-9]1|[2-9][02-9]{2})\s*(?:[.-]\s*)?([0-9]{4})(?:\s*(?:#|x\.?|ext\.?|extension)\s*(\d+))?$/g,
										defaultVal: "555-1234"
									},
									int: {
										regex: /(\-|\+|)[0-9]+$/g,
										defaultVal: 0
									}}, options);
		
		var methods={
			validateInt: function(sender){
				//set the focusin and focusout events
				sender.focusin(function(){
					//if the value is an int then set it as a pval
					if(parseInt($(this).val()) != NaN && $(this).val() != ""){
						//If debugging is turned on.
						if(settings.debug){
							console.log("Integer found on "+$(this).attr("id"));
						}
						
						//set the previous value to the parseInt value of the current value.
						methods.setPVal($(this), parseInt($(this).val()));
					}else{	
						//otherwise pval is 0
						
						//If debugging is turned on.
						if(settings.debug){
							console.log("NonInteger found on "+$(this).attr("id"));
						}
						
						//set the previous value to 0
						methods.setPVal($(this), 0);
					}
				}).focusout(function(){
					if(parseInt($(this).val()) >= 0 || parseInt($(this).val()) < 0){
						//If debugging is turned on.
						if(settings.debug){
							console.log("Integer entered on "+$(this).attr("id") + ", "+parseInt($(this).val()));
						}
						//if it is an int then parse it and set the value to the parsed value.
						$(this).val(parseInt($(this).val()));
					}else{ 
						//If debugging is turned on.
						if(settings.debug){
							console.log("NonInteger entered on "+$(this).attr("id"));
						}
						
						//if the value is not an int then restore to the pval
						$(this).val(methods.getPVal($(this)));
					}
				});
			},
			validate: function(sender, regex, defaultVal){
				//set the focusin and focusout events
				sender.focusin(function(){
					//if the value is an int then set it as a pval
					if(regex.test(sender.val()) && $(this).val() != ""){
						//If debugging is turned on.
						if(settings.debug){
							console.log("Integer found on "+$(this).attr("id"));
						}
						
						//set the previous value to the parseInt value of the current value.
						methods.setPVal($(this), $(this).val());
					}else{	
						//If debugging is turned on.
						if(settings.debug){
							console.log("Regex invalidated "+$(this).attr("id")+" = "+sender.val());
						}
						
						//set the previous value to 0
						methods.setPVal($(this), defaultVal);
					}
				}).focusout(function(){
					if(regex.test(sender.val())){
						//If debugging is turned on.
						if(settings.debug){
							console.log("Regex validated "+sender.val());
						}
						
						methods.setPVal(defaultVal);
					}else{ 
						//If debugging is turned on.
						if(settings.debug){
							console.log("Regex Invalidated "+$(this).attr("id")+" = "+sender.val());
						}
						
						//if the value is not an int then restore to the pval
						sender.val(methods.getPVal(sender));
					}
				});
			},
			setPVal: function(sender, value){
				sender.attr(settings.pvalName, value);
			},
			getPVal: function(sender){
				return sender.attr(settings.pvalName);
			}
		};
		
		return $(this).each(function(){
			if(settings[settings.type]){
				methods.validate($(this), settings[settings.type].regex, settings[settings.type].defaultVal);
			}
			/*switch(settings.type){
				case "int":
					methods.validate($(this), settings.intRegex, settings.intDefault);
					break;
				case "email":
					methods.validate($(this), settings.emailRegex, settings.emailDefault);
					break;
			}*/
		});
	};
})(jQuery);