//--------------------------------------------------------------------------
// :: Extend jQuery with a few (custom) plug-ins ::
//--------------------------------------------------------------------------
(function(jQuery) {

	/**
	Determines wheter showdebuginfo is enabled
	@member jQuery
	@return {bool} whether debug has been enabled
	*/
	jQuery.isDebugOn = function() {
		return typeof(Debug) != "undefined" && Debug.debugWindow ? true : false;
	}
	
	/**
	Cross-browser logging function. use this instead of console.log
	@member jQuery
	@param {object} inputs usually object, [object, ...]
	*/
	jQuery.log = function() {
		if (typeof(console) != "undefined" && !jQuery.browser.msie) {
			console.log.apply(console,arguments);
		}
	}
	
	jQuery.logInfo = function() {
		if (typeof(console) != "undefined" && !jQuery.browser.msie) {
			console.info.apply(console,arguments);
		}
	}
	
	jQuery.logError = function() {
		if (typeof(console) != "undefined" && !jQuery.browser.msie) {
			console.error.apply(console,arguments);
		}
	}
	
	jQuery.logWarning = function() {
		if (typeof(console) != "undefined" && !jQuery.browser.msie) {
			console.warn.apply(console,arguments);
		}
	}
	
	jQuery.msToJsDate = function(msDate) {
		var jO = new Date(((msDate - 25569) * 86400000));
		return new Date(((msDate - 25569 + (jO.getTimezoneOffset() / 1440)) * 86400000));
	};
	
	jQuery.jsToMsDate = function (jsdate) {
		var tzOffset = jsdate.getTimezoneOffset() / 1440;
		return (jsdate.getTime() / 86400000) + (25569 - tzOffset);
	};
	
	jQuery.create = function()
	{
		var tagName, attribs, children, container;

		// check for parameter syntax or sexp syntax
		if (arguments.length == 1 && jQuery.isArray(arguments[0]))
		{
			var firstArg = arguments[0];
			if(jQuery.isArray(firstArg)) {
				tagName = 	arguments[0][0];
				attribs =	arguments[0][1];
				children = 	arguments[0][2];
				container = arguments[0][3];
			} else if (firstArg instanceof $) {
				return firstArg; //EXIT HERE return single jquery element
			} else if("dom" == jQuery.type(firstArg)) { 
				return firstArg; //EXIT HERE return dom element if given
			}
		}
		else
		{
			tagName = 	arguments[0];
			attribs =	arguments[1];
			children = 	arguments[2];
			container = arguments[3];
		}

		var $element = jQuery('<' + tagName + '/>');
		if (attribs)
		{
			var filtered = {}; //remove events from the list since they are handled seperately
			for(var attr in attribs) {
				// inline event attachment
				var attrlow = attr.toLowerCase();
				var index = attrlow.indexOf("$on");
				var eventname = attrlow.substring(3);
				if (0 == index && $element[eventname]) {
					$element[eventname] = attribs[attr];
				}
				else { filtered[attr] = attribs[attr]; }
			}
			$element.attr(filtered);
		}
		if (null != children)
		{
			if (jQuery.isArray(children))
			{
				var count = children.length;
				for (var c=0; c<count; c++)
				{
					var child = children[c];
					//var type = jQuery.type(child);
					if (child instanceof Array) {
						$element.append(jQuery.create(child));
					} else if (child instanceof $ || "dom" == type) {
						$element.append(child);
					} else {
						$element.append(document.createTextNode(String(child)));
					}
				}
			} else {
				$element.html(children);
			}
		}

		// add the new element to a parent container if specified
		if(container) { jQuery(container).append($element); }
		return $element;
	};
	
	jQuery.support.maxHeight = document.createElement('div').style.maxHeight != undefined;
	
	/*! Copyright (c) 2008 Brandon Aaron (http://brandonaaron.net)
	 * Dual licensed under the MIT (http://www.opensource.org/licenses/mit-license.php) 
	 * and GPL (http://www.opensource.org/licenses/gpl-license.php) licenses.
	 *
	 * Version 2.1.2-pre
	 * 
	 * The bgiframe is chainable and applies the iframe hack to get 
	 * around zIndex issues in IE6. It will only apply itself in IE6 
	 * and adds a class to the iframe called 'bgiframe'. The iframe
	 * is appeneded as the first child of the matched element(s) 
	 * with a tabIndex and zIndex of -1.
	 * 
	 * By default the plugin will take borders, sized with pixel units,
	 * into account. If a different unit is used for the border's width,
	 * then you will need to use the top and left settings as explained below.
	 *
	 * NOTICE: This plugin has been reported to cause perfromance problems
	 * when used on elements that change properties (like width, height and
	 * opacity) a lot in IE6. Most of these problems have been caused by 
	 * the expressions used to calculate the elements width, height and 
	 * borders. Some have reported it is due to the opacity filter. All 
	 * these settings can be changed if needed as explained below.
	 *
	 * @example jQuery('div').bgiframe();
	 * @before <div><p>Paragraph</p></div>
	 * @result <div><iframe class="bgiframe".../><p>Paragraph</p></div>
	 *
	 * @param Map settings Optional settings to configure the iframe.
	 * @option String|Number top The iframe must be offset to the top
	 * 		by the width of the top border. This should be a negative 
	 *      number representing the border-top-width. If a number is 
	 * 		is used here, pixels will be assumed. Otherwise, be sure
	 *		to specify a unit. An expression could also be used. 
	 * 		By default the value is "auto" which will use an expression 
	 * 		to get the border-top-width if it is in pixels.
	 * @option String|Number left The iframe must be offset to the left
	 * 		by the width of the left border. This should be a negative 
	 *      number representing the border-left-width. If a number is 
	 * 		is used here, pixels will be assumed. Otherwise, be sure
	 *		to specify a unit. An expression could also be used. 
	 * 		By default the value is "auto" which will use an expression 
	 * 		to get the border-left-width if it is in pixels.
	 * @option String|Number width This is the width of the iframe. If
	 *		a number is used here, pixels will be assume. Otherwise, be sure
	 * 		to specify a unit. An experssion could also be used.
	 *		By default the value is "auto" which will use an experssion
	 * 		to get the offsetWidth.
	 * @option String|Number height This is the height of the iframe. If
	 *		a number is used here, pixels will be assume. Otherwise, be sure
	 * 		to specify a unit. An experssion could also be used.
	 *		By default the value is "auto" which will use an experssion
	 * 		to get the offsetHeight.
	 * @option Boolean opacity This is a boolean representing whether or not
	 * 		to use opacity. If set to true, the opacity of 0 is applied. If
	 *		set to false, the opacity filter is not applied. Default: true.
	 * @option String src This setting is provided so that one could change 
	 *		the src of the iframe to whatever they need.
	 *		Default: "javascript:false;"
	 *
	 * @name bgiframe
	 * @type jQuery
	 * @cat Plugins/bgiframe
	 * @author Brandon Aaron (brandon.aaron@gmail.com || http://brandonaaron.net)
	 */
	jQuery.fn.bgIframe = jQuery.fn.bgiframe = function(s) {
		// This is only for IE6
		if ( jQuery.browser.msie && (/6.0/).test(navigator.userAgent) ) {
			s = jQuery.extend({
				top     : 'auto', // auto == .currentStyle.borderTopWidth
				left    : 'auto', // auto == .currentStyle.borderLeftWidth
				width   : 'auto', // auto == offsetWidth
				height  : 'auto', // auto == offsetHeight
				opacity : true,
				src     : 'javascript:false;'
			}, s || {});
			var prop = function(n){return n&&n.constructor==Number?n+'px':n;},
			    html = '<iframe class="bgiframe"frameborder="0"tabindex="-1"src="'+s.src+'"'+
			               'style="display:block;position:absolute;z-index:-1;'+
				               (s.opacity !== false?'filter:Alpha(Opacity=\'0\');':'')+
						       'top:'+(s.top=='auto'?'expression(((parseInt(this.parentNode.currentStyle.borderTopWidth)||0)*-1)+\'px\')':prop(s.top))+';'+
						       'left:'+(s.left=='auto'?'expression(((parseInt(this.parentNode.currentStyle.borderLeftWidth)||0)*-1)+\'px\')':prop(s.left))+';'+
						       'width:'+(s.width=='auto'?'expression((this.parentNode.scrollWidth + (parseInt(this.parentNode.currentStyle.borderTopWidth)||0)*2)+\'px\')':prop(s.width))+';'+
						       'height:'+(s.height=='auto'?'expression((this.parentNode.scrollHeight + (parseInt(this.parentNode.currentStyle.borderLeftWidth)||0)*2)+ \'px\')':prop(s.height))+';'+
						'"/>';
			return this.each(function() {
				if ( jQuery('> iframe.bgiframe', this).length == 0 )
					this.insertBefore( document.createElement(html), this.firstChild );
			});
		}
		return this;
	};

})(jQuery);

/*
 * jQuery Color Animations
 * Copyright 2007 John Resig
 * Released under the MIT and GPL licenses.
 */

(function(jQuery){

	// We override the animation for all of these color styles
	jQuery.each(['backgroundColor', 'borderBottomColor', 'borderLeftColor', 'borderRightColor', 'borderTopColor', 'color', 'outlineColor'], function(i,attr){
		jQuery.fx.step[attr] = function(fx){
			if ( fx.state == 0 ) {
				fx.start = getColor( fx.elem, attr );
				fx.end = getRGB( fx.end );
			}

			fx.elem.style[attr] = "rgb(" + [
				Math.max(Math.min( parseInt((fx.pos * (fx.end[0] - fx.start[0])) + fx.start[0]), 255), 0),
				Math.max(Math.min( parseInt((fx.pos * (fx.end[1] - fx.start[1])) + fx.start[1]), 255), 0),
				Math.max(Math.min( parseInt((fx.pos * (fx.end[2] - fx.start[2])) + fx.start[2]), 255), 0)
			].join(",") + ")";
		}
	});

	// Color Conversion functions from highlightFade
	// By Blair Mitchelmore
	// http://jquery.offput.ca/highlightFade/

	// Parse strings looking for color tuples [255,255,255]
	function getRGB(color) {
		var result;

		// Check if we're already dealing with an array of colors
		if ( color && color.constructor == Array && color.length == 3 )
			return color;

		// Look for rgb(num,num,num)
		if (result = /rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/.exec(color))
			return [parseInt(result[1]), parseInt(result[2]), parseInt(result[3])];

		// Look for rgb(num%,num%,num%)
		if (result = /rgb\(\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*\)/.exec(color))
			return [parseFloat(result[1])*2.55, parseFloat(result[2])*2.55, parseFloat(result[3])*2.55];

		// Look for #a0b1c2
		if (result = /#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/.exec(color))
			return [parseInt(result[1],16), parseInt(result[2],16), parseInt(result[3],16)];

		// Look for #fff
		if (result = /#([a-fA-F0-9])([a-fA-F0-9])([a-fA-F0-9])/.exec(color))
			return [parseInt(result[1]+result[1],16), parseInt(result[2]+result[2],16), parseInt(result[3]+result[3],16)];

		// Otherwise, we're most likely dealing with a named color
		return colors[jQuery.trim(color).toLowerCase()];
	}
	
	function getColor(elem, attr) {
		var color;

		do {
			color = jQuery.curCSS(elem, attr);

			// Keep going until we find an element that has color, or we hit the body
			if ( color != '' && color != 'transparent' || jQuery.nodeName(elem, "body") )
				break; 

			attr = "backgroundColor";
		} while ( elem = elem.parentNode );

		return getRGB(color);
	};
	
	// Some named colors to work with
	// From Interface by Stefan Petre
	// http://interface.eyecon.ro/

	var colors = {
		aqua:[0,255,255],
		azure:[240,255,255],
		beige:[245,245,220],
		black:[0,0,0],
		blue:[0,0,255],
		brown:[165,42,42],
		cyan:[0,255,255],
		darkblue:[0,0,139],
		darkcyan:[0,139,139],
		darkgrey:[169,169,169],
		darkgreen:[0,100,0],
		darkkhaki:[189,183,107],
		darkmagenta:[139,0,139],
		darkolivegreen:[85,107,47],
		darkorange:[255,140,0],
		darkorchid:[153,50,204],
		darkred:[139,0,0],
		darksalmon:[233,150,122],
		darkviolet:[148,0,211],
		fuchsia:[255,0,255],
		gold:[255,215,0],
		green:[0,128,0],
		indigo:[75,0,130],
		khaki:[240,230,140],
		lightblue:[173,216,230],
		lightcyan:[224,255,255],
		lightgreen:[144,238,144],
		lightgrey:[211,211,211],
		lightpink:[255,182,193],
		lightyellow:[255,255,224],
		lime:[0,255,0],
		magenta:[255,0,255],
		maroon:[128,0,0],
		navy:[0,0,128],
		olive:[128,128,0],
		orange:[255,165,0],
		pink:[255,192,203],
		purple:[128,0,128],
		violet:[128,0,128],
		red:[255,0,0],
		silver:[192,192,192],
		white:[255,255,255],
		yellow:[255,255,0]
	};
	
})(jQuery);

/*
 * xLazyLoader 1.3 - Plugin for jQuery
 * 
 * Load js, css and images asynchron and get different callbacks
 *
 * Dual licensed under the MIT (http://www.opensource.org/licenses/mit-license.php)
 * and GPL (http://www.opensource.org/licenses/gpl-license.php) licenses.
 *
 * Depends:
 *   jquery.js
 *
 *  Copyright (c) 2008 Oleg Slobodskoi (ajaxsoft.de)
 */

;(function(jQuery){

    jQuery.xLazyLoader =  function ( method, options ) {
        if ( typeof method == 'object' ) {
            options = method;
            method = 'init';
        };
        new xLazyLoader()[method](options);
    };
    
    jQuery.xLazyLoader.defaults = {
        js: [], css: [], img: [],
        name: null,
        timeout: 20000,
        //success callback for all files
        success: function(){}, 
        //error callback - by load errors / timeout
        error: function(){},
        //complete callbck - by success or errors
        complete: function(){},
        //success callback for each file
        each: function(){} 
    };

    var head = document.getElementsByTagName("head")[0];
    
    function xLazyLoader ()
    {

        var self = this,
            s,
            loaded = [],
            errors = [],
            tTimeout,
            cssTimeout,
            toLoad,
            files = []
        ;
        
        this.init = function ( options )
        {
        	if ( !options ) return;
        	
        	s = jQuery.extend({}, jQuery.xLazyLoader.defaults, options);
        	toLoad = {js: s.js, css: s.css, img: s.img};
        	
            jQuery.each(toLoad, function( type, f ){
                if ( typeof f == 'string' )        
                    f = f.split(',');
                files = files.concat(f);    
            });

            if ( !files.length ) {
                dispatchCallbacks('error');
                return;    
            };

            if (s.timeout) {
                tTimeout = setTimeout(function(){
                    var handled = loaded.concat(errors);
                    /* search for unhandled files */
                    jQuery.each(files, function(i, file){
                        jQuery.inArray(file, handled) == -1 && errors.push(file);        
                    });
                    dispatchCallbacks('error');            
                }, s.timeout);
            };


            jQuery.each(toLoad, function(type, urls){
                if ( jQuery.isArray(urls) )
                    jQuery.each( urls, function(i, url){
                        load(type, url);
                    });
                else if (typeof urls == 'string')
                    load(type, urls);
            });
            


        };

        this.js = function ( src, callback, name )
        {
            var $script = jQuery('script[src*="'+src+'"]');
            if ( $script.length ) {
                $script.attr('pending') ? $script.bind('scriptload',callback) : callback();
                return;
            };
            
            var s = document.createElement('script');
            s.setAttribute("type","text/javascript");
            s.setAttribute("src", src);
            s.setAttribute('id', name);
            s.setAttribute('pending', 1);
            // Mozilla only
            s.onerror = addError;
            
            
            jQuery(s).bind('scriptload',function(){
                jQuery(this).removeAttr('pending');
                callback();
                 //unbind load event
                 //timeout because of pending callbacks
                setTimeout(function(){
                    jQuery(s).unbind('scriptload');
                },10);
            });
            
            // jQuery doesn't handling onload event special for script tag,
			var done = false;
			s.onload = s.onreadystatechange = function() {
				if ( !done && ( !this.readyState || /loaded|complete/.test(this.readyState) ) ) {
					done = true;
					// Handle memory leak in IE
					s.onload = s.onreadystatechange = null;
                    jQuery(s).trigger('scriptload'); 
				};
			};
            head.appendChild(s);
        
        };

        this.css = function ( href, callback, name )
        {

            if ( jQuery('link[href*="'+href+'"]').length ) {
                callback();
                return;
            };
            

            var link = jQuery('<link rel="stylesheet" type="text/css" media="all" href="'+href+'" id="'+name+'"></link>')[0];
            if ( jQuery.browser.msie ) {
                link.onreadystatechange = function () {
                    /loaded|complete/.test(link.readyState) && callback();
                };
            } else if ( jQuery.browser.opera ) {
                link.onload = callback;
            } else {
                /* 
                 * Mozilla, Safari, Chrome 
                 * unfortunately it is inpossible to check if the stylesheet is really loaded or it is "HTTP/1.0 400 Bad Request"
                 * the only way to do this is to check if some special properties  were set, so there is no error callback for stylesheets -
                 * it fires alway success
                 * 
                 * There is also no access to sheet properties by crossdomain stylesheets, 
                 * so we fire callback immediately
                 */
                
                var hostname = location.hostname.replace('www.',''),
                    hrefHostname = /http:/.test(href) ? /^(\w+:)?\/\/([^\/?#]+)/.exec( href )[2] : hostname;
                hostname != hrefHostname && jQuery.browser.mozilla ?  
                    callback()
                    :  
                    //stylesheet is from the same domain or it is not firefox
                    (function(){
                        try {
                            link.sheet.cssRules;
                        } catch (e) {
                            cssTimeout = setTimeout(arguments.callee, 20);
                            return;
                        };
                        callback();
                    })();
            };
    
                    
            head.appendChild(link);
        };
        
        this.img = function ( src, callback )
        {
            var img = new Image();
            img.onload = callback;
            img.onerror = addError;
            img.src = src;
        };
        
        /* It works only for css */
        this.disable = function ( name )
        {    
            jQuery('#lazy-loaded-'+name, head).attr('disabled', 'disabled');
        };

        /* It works only for css */
        this.enable = function ( name )
        {    
            jQuery('#lazy-loaded-'+name, head).removeAttr('disabled');
        };
        
        /*
         * By removing js tag, script ist still living in browser memory,
         * css will be really destroyed
         */
        this.destroy = function ( name )
        {
            jQuery('#lazy-loaded-'+name, head).remove();    
        };
        
        function load ( type, url ) {
            self[type](url, function(status) { 
                status == 'error' ? errors.push(url) : loaded.push(url) && s.each(url);
                checkProgress();
            }, 'lazy-loaded-'+ (s.name ? s.name : new Date().getTime()) );
        };
        
        function dispatchCallbacks ( status ) {
            s.complete(status, loaded, errors);
            s[status]( status=='error' ? errors : loaded);
            clearTimeout(tTimeout);
            clearTimeout(cssTimeout);
        };
        
        function checkProgress () {
            if (loaded.length == files.length) dispatchCallbacks('success')
            else if (loaded.length+errors.length == files.length) dispatchCallbacks('error');
        };
        
        function addError () {
            errors.push(this.src);    
            checkProgress();
        };

    };



})(jQuery);

/**
 * On focus and on blur events for symbol search boxes
 *
 * usage:
 * 		jQuery(input).search();
 */
jQuery.fn.search = function() {
	return this.focus(function() {
		if( this.value == this.defaultValue ) {
			this.value = "";
		}
	}).blur(function() {
		if( !this.value.length ) {
			this.value = this.defaultValue;
			//clear nearest button's stored result
			var $btn = jQuery(this).data("closestButton") || [];
			if ($btn.length){
				$btn.data('results',-1);//clear
			}
		}
	});
};

//http://www.appelsiini.net/projects/lazyload
/* Convenience methods in jQuery namespace.           */
/* Use as  jQuery.belowthefold(element, {threshold : 100, container : window}) */

jQuery.belowthefold = function(element, settings) {
    if (settings.container === undefined || settings.container === window) {
        var fold = jQuery(window).height() + jQuery(window).scrollTop();
    }
    else {
        var fold = jQuery(settings.container).offset().top + jQuery(settings.container).height();
    }
    return fold <= jQuery(element).offset().top - settings.threshold;
};

jQuery.rightoffold = function(element, settings) {
    if (settings.container === undefined || settings.container === window) {
        var fold = jQuery(window).width() + jQuery(window).scrollLeft();
    }
    else {
        var fold = jQuery(settings.container).offset().left + jQuery(settings.container).width();
    }
    return fold <= jQuery(element).offset().left - settings.threshold;
};

/* Custom selectors for your convenience.   */
/* Use as jQuery("img:below-the-fold").something() */

jQuery.extend(jQuery.expr[':'], {
    "below-the-fold" : "jQuery.belowthefold(a, {threshold : 0, container: window})",
    "above-the-fold" : "!jQuery.belowthefold(a, {threshold : 0, container: window})",
    "right-of-fold"  : "jQuery.rightoffold(a, {threshold : 0, container: window})",
    "left-of-fold"   : "!jQuery.rightoffold(a, {threshold : 0, container: window})"
});

/**
 * Cookie plugin
 *
 * Copyright (c) 2006 Klaus Hartl (stilbuero.de)
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 *
 */

/**
 * Create a cookie with the given name and value and other optional parameters.
 *
 * @example $.cookie('the_cookie', 'the_value');
 * @desc Set the value of a cookie.
 * @example $.cookie('the_cookie', 'the_value', { expires: 7, path: '/', domain: 'jquery.com', secure: true });
 * @desc Create a cookie with all available options.
 * @example $.cookie('the_cookie', 'the_value');
 * @desc Create a session cookie.
 * @example $.cookie('the_cookie', null);
 * @desc Delete a cookie by passing null as value. Keep in mind that you have to use the same path and domain
 *       used when the cookie was set.
 *
 * @param String name The name of the cookie.
 * @param String value The value of the cookie.
 * @param Object options An object literal containing key/value pairs to provide optional cookie attributes.
 * @option Number|Date expires Either an integer specifying the expiration date from now on in days or a Date object.
 *                             If a negative value is specified (e.g. a date in the past), the cookie will be deleted.
 *                             If set to null or omitted, the cookie will be a session cookie and will not be retained
 *                             when the the browser exits.
 * @option String path The value of the path atribute of the cookie (default: path of page that created the cookie).
 * @option String domain The value of the domain attribute of the cookie (default: domain of page that created the cookie).
 * @option Boolean secure If true, the secure attribute of the cookie will be set and the cookie transmission will
 *                        require a secure protocol (like HTTPS).
 * @type undefined
 *
 * @name $.cookie
 * @cat Plugins/Cookie
 * @author Klaus Hartl/klaus.hartl@stilbuero.de
 */

/**
 * Get the value of a cookie with the given name.
 *
 * @example $.cookie('the_cookie');
 * @desc Get the value of a cookie.
 *
 * @param String name The name of the cookie.
 * @return The value of the cookie.
 * @type String
 *
 * @name $.cookie
 * @cat Plugins/Cookie
 * @author Klaus Hartl/klaus.hartl@stilbuero.de
 */
jQuery.cookie = function(name, value, options) {
    if (typeof value != 'undefined') { // name and value given, set cookie
        options = options || {};
        if (value === null) {
            value = '';
            options = jQuery.extend({}, options); // clone object since it's unexpected behavior if the expired property were changed
            options.expires = -1;
        }
        var expires = '';
        if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) {
            var date;
            if (typeof options.expires == 'number') {
                date = new Date();
                date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
            } else {
                date = options.expires;
            }
            expires = '; expires=' + date.toUTCString(); // use expires attribute, max-age is not supported by IE
        }
        // NOTE Needed to parenthesize options.path and options.domain
        // in the following expressions, otherwise they evaluate to undefined
        // in the packed version for some reason...
        var path = options.path ? '; path=' + (options.path) : '';
        var domain = options.domain ? '; domain=' + (options.domain) : '';
        var secure = options.secure ? '; secure' : '';
        document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join('');
    } else { // only name given, get cookie
        var cookieValue = null;
        if (document.cookie && document.cookie != '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = jQuery.trim(cookies[i]);
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) == (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
};

/*
  PHP style date() plugin
  Call in exactly the same way as you do the "date" command in PHP
  e.g. s = jQuery.PHPDate("l, jS F Y", dtDate);

  License:
  PHPDate 1.0 jQuery Plugin

  Copyright (c) 2008 Jon Combe (http://joncom.be)

  Permission is hereby granted, free of charge, to any person
  obtaining a copy of this software and associated documentation
  files (the "Software"), to deal in the Software without
  restriction, including without limitation the rights to use,
  copy, modify, merge, publish, distribute, sublicense, and/or sell
  copies of the Software, and to permit persons to whom the
  Software is furnished to do so, subject to the following
  conditions:

  The above copyright notice and this permission notice shall be
  included in all copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
  EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
  OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
  NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
  HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
  WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
  FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
  OTHER DEALINGS IN THE SOFTWARE.
  
  http://joncom.be/code/jquery-phpdate/
*/

(function($) {
  var aDays = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
  var aMonths = ["January","February","March","April","May","June","July","August","September","October","November","December"];

  // main function
  $.PHPDate = function(sString, dtDate) {
    var sElement = "";
    var sOutput = "";

    // we can cheat with "r"...
    sString = sString.replace(/r/g, "D, j M Y H;i:s O");

    // loop through string
    for (var i = 0; i < sString.length; i++) {
      sElement = sString.charAt(i);
      switch (sElement) {
      	case "x": sElement = "ET";break;/*MH - added this to allow hard-coding of "ET" in format string */
        case "a": sElement = AMPM(dtDate.getHours()); break;
        case "c":
          sElement = (dtDate.getFullYear() + "-" +
                      AddLeadingZero(dtDate.getMonth()) + "-" +
                      AddLeadingZero(dtDate.getDate()) + "T" +
                      AddLeadingZero(dtDate.getHours()) + ":" +
                      AddLeadingZero(dtDate.getMinutes()) + ":" +
                      AddLeadingZero(dtDate.getSeconds()));
          var sTemp = dtDate.toString().split(" ")[5];
          if (sTemp.indexOf("-") > -1) {
            sElement += sTemp.substr(sTemp.indexOf("-"));
          } else if (sTemp.indexOf("+") > -1) {
            sElement += sTemp.substr(sTemp.indexOf("+"));
          } else {
            sElement += "+0000";
          }
          break;
        case "d": sElement = AddLeadingZero(dtDate.getDate()); break;
        case "g": sElement = TwelveHourClock(dtDate.getHours()); break;
        case "h": sElement = AddLeadingZero(TwelveHourClock(dtDate.getHours())); break;
        case "i": sElement = AddLeadingZero(dtDate.getMinutes()); break;
        case "j": sElement = dtDate.getDate(); break;
        case "l": sElement = aDays[dtDate.getDay()]; break;
        case "m": sElement = AddLeadingZero(dtDate.getMonth() + 1); break;
        case "n": sElement = dtDate.getMonth() + 1; break;
        case "o": (new Date(FirstMonday(dtDate.getFullYear())) > dtDate) ? sElement = (dtDate.getFullYear() - 1) : sElement = dtDate.getFullYear(); break;
        case "s": sElement = AddLeadingZero(dtDate.getSeconds()); break;
        case "t":
          var dtTemp = new Date(dtDate.valueOf());
          dtTemp.setMonth(dtTemp.getMonth() + 1)
          dtTemp.setDate(0);
          sElement = dtTemp.getDate();
          break;
        case "u": sElement = dtDate.getMilliseconds(); break;
        case "w": sElement = dtDate.getDay(); break;
        case "y": sElement = dtDate.getFullYear().toString().substr(2, 2); break;
        case "z":
          var dtFirst = new Date(dtDate.getFullYear(), 0, 1, 0, 0, 0, 0);
          var dtLast = new Date(dtDate.getFullYear(), dtDate.getMonth(), dtDate.getDate(), 0, 0, 0, 0);
          sElement = Math.round((dtLast.valueOf() - dtFirst.valueOf()) / 1000 / 60 / 60/ 24);
          break;
        case "A": sElement = AMPM(dtDate.getHours()).toUpperCase(); break;
        case "B":
          sElement = Math.floor(((dtDate.getHours() * 60 * 60 * 1000) +
          (dtDate.getMinutes() * 60 * 1000) +
          (dtDate.getSeconds() * 1000) +
          (dtDate.getMilliseconds())) / 86400);
          break;
        case "D": sElement = aDays[dtDate.getDay()].substr(0, 3); break;
        case "F": sElement = aMonths[dtDate.getMonth()]; break;
        case "G": sElement = dtDate.getHours(); break;
        case "H": sElement = AddLeadingZero(dtDate.getHours()); break;
        case "I":
          var dtTempFirst = new Date(dtDate.getFullYear(), 0, 1);
          var dtTempLast = new Date(dtDate.getFullYear(), dtDate.getMonth(), dtDate.getDate());
          var iDaysDiff = (dtTempLast.valueOf() - dtTempFirst.valueOf()) / 1000 / 60 / 60 / 24;
          (iDaysDiff == Math.round(iDaysDiff)) ? sElement = 0 : sElement = 1;
          break;
        case "L": ((new Date(dtDate.getFullYear(), 2, 0)).getDate() == 29) ? sElement = 1 : sElement = 0; break;
        case "M": sElement = aMonths[dtDate.getMonth()].substr(0, 3); break;
        case "N": (dtDate.getDay() == 0) ? sElement = 7 : sElement = dtDate.getDay(); break;
        case "O":
          var sTemp = dtDate.toString().split(" ")[5];
          if (sTemp.indexOf("-") > -1) {
            sElement = sTemp.substr(sTemp.indexOf("-"));
          } else if (sTemp.indexOf("+") > -1) {
            sElement = sTemp.substr(sTemp.indexOf("+"));
          } else {
            sElement = "+0000";
          }
          break;
        case "P":
          var sTemp = dtDate.toString().split(" ")[5];
          if (sTemp.indexOf("-") > -1) {
            var aTemp = sTemp.substr(sTemp.indexOf("-") + 1).split("");
            sElement = ("-" + aTemp[0] + aTemp[1] + ":" + aTemp[2] + aTemp[3]);
          } else if (sTemp.indexOf("+") > -1) {
            var aTemp = sTemp.substr(sTemp.indexOf("+") + 1).split("");
            sElement = ("+" + aTemp[0] + aTemp[1] + ":" + aTemp[2] + aTemp[3]);
          } else {
            sElement = "+00:00";
          }
          break;
        case "S": sElement = DateSuffix(dtDate.getDate()); break;
        case "T":
          sElement = dtDate.toString().split(" ")[5];
          if (sElement.indexOf("+") > -1) {
            sElement = sElement.substr(0, sElement.indexOf("+"));
          } else if (sElement.indexOf("-") > -1) {
            sElement = sElement.substr(0, sElement.indexOf("-"));
          }
          break;
        case "U": sElement = Math.floor(dtDate.getTime() / 1000); break;
        case "W":
          var dtTempFirst = new Date(FirstMonday(dtDate.getFullYear()));
          var dtTempLast = new Date(dtDate.getFullYear(), dtDate.getMonth(), dtDate.getDate());
          sElement = Math.ceil(Math.round((dtTempLast.valueOf() - dtTempFirst.valueOf()) / 1000 / 60 / 60/ 24) / 7);
          break;
        case "Y": sElement = dtDate.getFullYear(); break;
        case "Z":
          (dtDate.getTimezoneOffset() < 0) ? sElement = Math.abs(dtDate.getTimezoneOffset() * 60) : sElement = (0 - (dtDate.getTimezoneOffset() * 60));
          break;
      }
      sOutput += sElement.toString();
      }
    return sOutput;
  }

  // add leading zero
  function AddLeadingZero(iValue) {
    if (iValue < 10) {
      iValue = ("0" + iValue);
    }
    return iValue;
  }

  // Ante meridiem and Post meridiem
  function AMPM(iHours) {
    if (iHours > 11) {
      return "pm";
    } else {
      return "am";
    }
  }

  // date suffix
  function DateSuffix(iDay) {
    var sSuffix = "th";
    switch (parseInt(iDay)) {
      case 1:
      case 21:
      case 31:
        sSuffix = "st";
        break;
      case 2:
      case 22:
        sSuffix = "nd";
        break;
      case 3:
      case 23:
        sSuffix = "rd";
    }
    return sSuffix;
  }

  // find the first Monday in a given year (for ISO 8601 dates)
  function FirstMonday(iYear) {
    var dtTemp = new Date(iYear, 0, 1);
    while (dtTemp.getDay() != 1) {
      dtTemp.setDate(dtTemp.getDate() + 1);
    }
    return dtTemp.valueOf();
  }

  // 12-Hour clock
  function TwelveHourClock(iHours) {
    if (iHours == 0) {
      iHours = 24;
    } else if (iHours > 12) {
      iHours -= 12;
    }
    return iHours;
  }
})(jQuery);