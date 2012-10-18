/**
 * jValidator JQuery plugin for validating form inputs
 * 
 * @author John Gleason <nukedsoftware@gmail.com>
 * 
 * @since 18 Oct 2012
 * 
 * {@link https://github.com/nukedss/jvalidator.git}
 * {@link http://www.nukedss.com}
 */
(function($){
	$.fn.validator=function(options){
		var settings = $.extend( {  type: 'int', debug: false, pvalName: 'pval',
			email: {
				regex: /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.(?:[A-Z]{2}|com|org|net|edu|gov|mil|biz|info|mobi|name|aero|asia|jobs|museum)$/gm,
				defaultVal: ""
			},
			phoneNumber: {
				regex: /([0-9]?-?[0-9]{3})?-?[0-9]{3}-[0-9]{4}( (ext|extension) [0-9]{0,5})?/gm,
				defaultVal: "555-1234"
			},
			int: {
				regex: /(\-|\+|)[0-9]+$/gm,
				defaultVal: 0
			},
			custom: {
				regex: /.+/g,
				defaultVal: ""
			}}, options);
		
		var methods={
			validate: function(sender, regexStr, defaultVal){
				//set the focusin and focusout events
				sender.focusin(function(){
					var regex = new RegExp(regexStr);
					
					//if the value is an int then set it as a pval
					if(regex.test(sender.val()) && $(this).val() != ""){
						//If debugging is turned on.
						if(settings.debug){
							console.log("Regex Validated "+$(this).attr("id"));
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
					var regex = new RegExp(regexStr);
					
					if(settings.debug){
						console.log("regext test",(new RegExp(regexStr)), $(this).val(), (new RegExp(regexStr)).exec($(this).val()));
					}
					
					if(regex.test($(this).val())){
						//If debugging is turned on.
						if(settings.debug){
							console.log("Regex validated "+$(this).val());
						}
						
						methods.setPVal($(this).val());
					}else{ 
						//If debugging is turned on.
						if(settings.debug){
							console.log("Regex Invalidated "+$(this).attr("id")+" = "+$(this).val());
						}
						
						//if the value is not an int then restore to the pval
						sender.val(methods.getPVal($(this)));
					}
				}).focusin().focusout();
			},
			setPVal: function(sender, value){
				$(sender).attr(settings.pvalName, value);
			},
			getPVal: function(sender){
				return $(sender).attr(settings.pvalName);
			}
		};
		
		return $(this).each(function(){
			if(settings[settings.type]){
				methods.validate.apply(this, [$(this), settings[settings.type].regex, settings[settings.type].defaultVal])
				//methods.validate();
			}
		});
	};
})(jQuery);