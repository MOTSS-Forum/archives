/*
jRumble v1.3 - http://jackrugile.com/jrumble
by Jack Rugile - http://jackrugile.com

MIT License
-----------------------------------------------------------------------------
Copyright (c) 2012 Jack Rugile, http://jackrugile.com
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/
// var angle = 0;
// var r = 3;
// var ratio = 0;
// var beginb=0;
// var begins=0;
// var sign = 1;
// var theta = 2 ;
// var step1 = 0.005*sign;
// var step2 = 0.04*sign;

(function($){
	var angle = 0;
	var	beginb = 0,
		begins = 0;
	$.fn.jrumble = function(options){
		
		/*========================================================*/
		/* Options
		/*========================================================*/
		var defaults = {
			x: 2,
			y: 2,
			rotation: 1,
			speed: 15,
			opacity: false,
			opacityMin: .5,
			//angle : 0,
			r : 3,
			ratio : 4,
			sign1 : 1,
			sign2 : 1,
			theta : 2 ,
			step1 : 0.005,
			step2 : 0.04,
			angle : 'angle',
			beginb : 'beginb',
			begins : 'begins'
		},
		
		opt = $.extend(defaults, options);	
				
		return this.each(function(){
								  
			/*========================================================*/
			/* Variables
			/*========================================================*/
			var $this = $(this),				
				x = opt.x*2,
				y = opt.y*2,
				rot = opt.rotation*2,
				speed = (opt.speed === 0) ? 1 : opt.speed,			
				opac = opt.opacity,
				opacm = opt.opacityMin,
				inline,
				interval;
			

			/*========================================================*/
			/* Rumble Function
			/*========================================================*/		
			var rumbler = function(){				
				 //var rx = Math.floor(Math.random() * (x+1)) -x/2,
				 //	ry = Math.floor(Math.random() * (y+1)) -y/2;
				var 	rrot = Math.floor(Math.random() * (rot+1)) -rot/2,
				 	ropac = opac ? Math.random() + opacm : 1;
				
				
				/*========================================================*/
				/* Ensure Movement From Original Position
				/*========================================================*/				
				//rx = (rx === 0 && x !== 0) ? ((Math.random() < .5) ? 1 : -1) : rx;
				//ry = (ry === 0 && y !== 0) ? ((Math.random() < .5) ? 1 : -1) : ry;	
				
				// opt.sign = Math.random()>0.999? 1:-1;
				var step1 = opt.step1*opt.sign1,
				step2 = opt.step2*(opt.sign2);
				r = opt.r;
				
				//console.log(opt.angle + " = "+opt.angle+" + "+"opt.theta");
				//alert(opt.angle + "="+opt.angle+"+"+opt.theta.toString())+";";
				eval(opt.angle + " = "+opt.angle+" + "+"opt.theta"+";");
				// angle = angle + opt.theta;
				
				//console.log(opt.beginb + "="+opt.beginb+"+"+"step1"+";");
				eval(opt.beginb + "="+opt.beginb+"+"+"step1"+";");
				eval(opt.begins + "="+opt.begins+"+"+"step2"+";");
				//beginb = beginb+ step1 ;
				//begins = begins + step2;
				
				var twoPI = Math.PI*2;
				//console.log("if("+opt.beginb+"+"+"step1"+">"+"twoPI"+") {"+"opt.sign1"+"=-"+"opt.sign1;};");
				eval("if("+opt.beginb+"+"+"step1>twoPI) {opt.sign1=-opt.sign1;};");
				//console.log("if("+opt.beginb+"+"+"step1"+"<0){"+"opt.sign1"+"=-"+"opt.sign1;};");
				eval("if("+opt.beginb+"+"+"step1"+"<0){"+"opt.sign1"+"=-"+"opt.sign1;};");
				//if (beginb+step1>Math.PI*2) {opt.sign1=-opt.sign1;};
				//if (beginb+step1<0) {opt.sign1=-opt.sign1;};

				eval("if("+opt.begins+"+"+"step2"+">"+"twoPI"+") {"+"opt.sign2=-"+"opt.sign2"+";};");
				eval("if("+opt.begins+"+"+"step1"+"<0){"+"opt.sign2"+"=-"+"opt.sign2"+";};");
				//if (begins+step2>Math.PI*2) {opt.sign2=-opt.sign2;};
				//if (begins+step2<0) {opt.sign2=-opt.sign2;};
				//var rr = r;
				//var rr = r*((beginb));
				 eval("var rr=r*(Math.cos("+opt.beginb+"));");
				 // var rr = r*(Math.cos(beginb));
				
				// console.log("r=%lf",r);
				// console.log("rr=%lf",rr);
				// console.log("beginb=%lf",beginb);
				// console.log("begins=%lf",begins);
				
				eval("var cx = rr/opt.ratio * (Math.sin("+opt.begins+"));");
				eval("var cy = rr/opt.ratio * (Math.cos("+opt.begins+"));");
				//var cx = rr/opt.ratio * (Math.sin(begins));
				//var cy = rr/opt.ratio * (Math.cos(begins));
				
				eval("var rx = cx+rr*Math.cos("+opt.angle +"*Math.PI/180);");
				eval("var ry = cx+rr*Math.sin("+opt.angle +"*Math.PI/180);");
				//var rx = cx+rr*Math.cos(angle *Math.PI/180);	
				//var ry = cy+rr*Math.sin(angle *Math.PI/180);	

				/*========================================================*/
				/* Check Inline
				/*========================================================*/
				if($this.css('display') === 'inline'){
					inline = true;
					$this.css('display', 'inline-block');
				}
				

				/*========================================================*/
				/* Rumble Element
				/*========================================================*/			
				$this.css({
					'position':'absolute',
					'left':rx+'em',
					'top':ry+'em',
					'-ms-filter':'progid:DXImageTransform.Microsoft.Alpha(Opacity='+ropac*100+')',
					'filter':'alpha(opacity='+ropac*100+')',					
					'-moz-opacity':ropac,					
					'-khtml-opacity':ropac,					
					'opacity':ropac,
					
					'-webkit-transform':'rotate('+rrot+'deg)', 
					'-moz-transform':'rotate('+rrot+'deg)', 
					'-ms-transform':'rotate('+rrot+'deg)',
					'-o-transform':'rotate('+rrot+'deg)', 
					'transform':'rotate('+rrot+'deg)',
					
					// 'transition-property':'all',
					//'transition-duration':du+'s',
					
					// '-moz-transition-timeing-function':'cubic-bezier(.7,0,.3,1)',
					// '-webkit-transition-timeing-function':'cubic-bezier(.7,0,.3,1)',
					// '-o-transition-timeing-function':'cubic-bezier(.7,0,.3,1)',
					// '-ms-transition-timeing-function':'cubic-bezier(.7,0,.3,1)',
					// 'transition-timeing-function':'cubic-bezier(.7,0,.3,1)'

				});
			};
			
			/*========================================================*/
			/* Rumble CSS Reset
			/*========================================================*/
			var reset = {
				'left':0,
				'top':0,
				'-ms-filter':'progid:DXImageTransform.Microsoft.Alpha(Opacity=100)',
				'filter':'alpha(opacity=100)',					
				'-moz-opacity':1,					
				'-khtml-opacity':1,					
				'opacity':1,
				'-webkit-transform':'rotate(0deg)',
				'-moz-transform':'rotate(0deg)',
				'-ms-transform':'rotate(0deg)',
				'-o-transform':'rotate(0deg)',
				'transform':'rotate(0deg)'
			};
			
			/*========================================================*/
			/* Rumble Start/Stop Trigger
			/*========================================================*/
			$this.bind({
				'startRumble': function(e){
					eval(opt.angle+"=0;");
					eval(opt.beginb+"=0;");
					eval(opt.begins+"=0;");
					//console.log(opt.angle+"=0;");
					//alert(opt.angle+"=0;");
					//$this.css(reset);
					e.stopPropagation();
					clearInterval(interval);
					interval = setInterval(rumbler, speed)
				},
				'stopRumble': function(e){
					e.stopPropagation();
					clearInterval(interval);
					if(inline){
						$this.css('display', 'inline');
					}
					$this.css(reset);
				}
			});		
			
		});// End return this.each
	};// End $.fn.jrumble
})(jQuery);