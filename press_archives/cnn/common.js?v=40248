jQuery.noConflict();

var common = new (function() {
	var self = this;
	this.serializer = new Serializer();
	//this.serializer.allowEncoding(true);

	//Helpers provided thru jQuery
	this.isIE6 = (jQuery.browser.msie && jQuery.browser.version == 6.0) ? 1 : 0;
	this.quirksMode = (jQuery.browser.msie && !jQuery.support.boxModel) ? true : false;
	this.commonGen = jQuery("#commonGen");//footer iframe
	this.urlPrefix = (urlPre) ? urlPre : "";//global var
	this.urlPre = this.urlPrefix;
	
	/**
	 * Environment
	 */
	this._getEnv = function(){
		if (location.href.indexOf("localhost") > -1){
			return "LOCAL";
		} else if (location.href.indexOf("dev3") > -1){
			return "DEV";
		} else if (location.href.indexOf("money.qai") > -1) {
			return "QAI";	
		} else {
			return "PROD";
		}
	};
	
	/** 
	 * Domain
	 */
	this.cnnGetDomain = function(){
		if ("QAI" == this._getEnv()){
			return 	"//money.qai.cnn.com/";
		} else {
			return "//money.cnn.com/";	
		}
	};
	
	this.getHostName = function(){
		var protocol = window.location.protocol;
		var slashes = protocol.concat("//");
		var host = slashes.concat(window.location.hostname) + "/";
		if(host.indexOf("localhost") > -1){
			host += "cnnmoney/classic/"; 
		}
		else if(host.indexOf("dev.local") > -1){
			host += "cnnmoney/"; 
		}
		
		return host;
	};
	this.wsodGetDomain = function(){
		if ("DEV" == this._getEnv()){
			return "//dev3.dev.local:8080/";
		} else if ("QAI" == this._getEnv()){
			return 	"//markets.money.qai.cnn.com/";
		} else {
			return "//markets.money.cnn.com/";	
		}
	};
	
	/**
	 * Storage manager utils
	 */
	this.initStorageManager = function(){};
	this.saveToStorageManager = function(args){};
	
	/**
	 * Checks where this site is running, returns boolean
	 */
	this.isRunningAtCNN = function(){
		try {
			if (location.href.indexOf(this.cnnDomain) > -1) {
				return true;
			} else {
				return false;
			}
		} catch(e){
			return true;
		}
	};
	
	/**
	 * Adds loading spinner 
	 *
	 * @param container {String} ID of the element you wish to attach spinner to
	 */
	this.showLoading = function(container) {
		if (jQuery("#loading_"+container).length > 0){ 
			this.hideLoading(container);
		}
		var height = jQuery("#"+container).height();
		var width = jQuery("#"+container).width();
		var elPos = jQuery("#"+container).offset();
		var topPosOfImg = (parseInt(height / 2 - 16)); //center loading gif
		var leftPos = (parseInt(width / 2 - 16)); //centered
		var indicator = jQuery('<div />').attr({id:'loading_' +container, 'className':'wsod_loadingIndicator'}).css({top:elPos.top+'px',left:elPos.left+'px',height:height+'px',width:width+'px'}).appendTo("body");	
		//attach spinning icon to DOM
		jQuery('<img src="'+this.urlPre+'images/loading.gif" />').attr({id:'loadingIcon'}).css({position:"absolute",top:topPosOfImg+'px',left:leftPos+'px'}).appendTo(indicator);
	};
	
	/**
	 * Removes loading icon and smoke layer from DOM
	 *
	 * @param container {String} ID of the element you wish to remove spinner from
	 */
	this.hideLoading = function(container) {
		jQuery("#loading_"+container).remove();
	};
	
	/**
	 * Initialize symbol search
	 *
	 * @param inputID {String} ID of the text input element 
	 * @param config {Object} unique configuration for the search
	 */
	this.initSymbolSearch = function(inputID,config){
		if (!inputID) { inputID = "symb"; }
		wsod_js.search.init(inputID,config);
	};
	
	/**
	 * Swaps CSS classes on pipe navigation used everywhere
	 *
	 * @param $anchorEl {jQuery} jQuery object of item clicked -- assumes using common wsod_invisiTabs
	 */
	this.swapPipeNavCSS = function($anchorEl,className){
		if (!className){ className = "active"; }
		$anchorEl.parent().siblings().children("a").removeClass(className);
		$anchorEl.addClass(className);
	};
	
	/**
	 * Wrapper to "lazy load" assets
	 *
	 * @param data {Object} The asset(s) to load
	 */
	this.loadAssets = function(data){
		jQuery.xLazyLoader(jQuery.extend(data, {
			success: data.success,
			error: data.error
			})
		);
	};
	
	/**
	 *  Attaches event to Currency Conversion form
	 *
	 */
	this.initCurrencyConverter = function(){
		
		var $ccAmount = jQuery("#wsod_ccAmountValue");
		var $ccCurrFrom = jQuery("#wsod_ccBaseCurrency select");
		var $ccCurrTo = jQuery("#wsod_ccQuoteCurrency select");

		jQuery("#wsod_ccAmountValue, #wsod_ccBaseCurrency select, #wsod_ccQuoteCurrency select").bind("change",function(){
			//enforce numbers only
			var num = self.toNumber($ccAmount.val());
			//set number back.
			$ccAmount.val(num);
			_getConversion({
				amount:	num,
				base:	$ccCurrFrom.val(),
				quote:	$ccCurrTo.val()
			});
		});
		
		$ccAmount.keypress(function(){

			window.clearTimeout(self.currencyTimer);
			
			self.currencyTimer = window.setTimeout(
				function(){
					//enforce numbers only
					var num = self.toNumber($ccAmount.val());
					//set number back.
					$ccAmount.val(num);
					//keep track
					self.ccAmountValue = num;
					//go
					_getConversion({
						amount:	num,
						base:	$ccCurrFrom.val(),
						quote:	$ccCurrTo.val()
					});
				}
			,300);
		});
		
		
		function _getConversion(args){
			var container = "wsod_ccResult";			
			if (this.request) { this.request.abort(); this.request = null; }
			this.request = jQuery.ajax({
				dataType: "html",
				type: "POST",
				url: self.urlPrefix+"common/modules/iframe/currencyConverter.asp",
				data:{
					convert:1,
					amount:args.amount,
					base:args.base,
					quote:args.quote
				},
				success: function(resultText){
					//insert conversion result
					jQuery("#wsod_ccResult").fadeOut(150).html(resultText).fadeIn(150);
				},
				error:function(){
					
				}
			});
		}
		
	};
	
	/**
	 *  Enforce number
	 *
	 * 	@param str {String} a value 
	 */
	this.toNumber = function(str) {
		// get rid of any user inputted commas or dollar signs or anything else that snuck past isNaN
		// if null values, replace with 0s
		var newNum = (String(str).replace(/\s/g,'') == '') ? 0 : parseFloat(String(str).replace(/[^0-9.]/g,""));
		return newNum;
	};
	
	/**
	 *  Shows absolutely positioned help box
	 *
	 * 	@param el {DOM Element} this
	 * 	@param obj {Object} Object of values {title:"",body:""}
	 */
	this.showHelp = function(el, obj) {
		//remove help if already shown
		if (jQuery("#wsod_helpBubble").length){
			common.hideHelp();
		}
		
		var bubbleCloseTitle = '<div><a href="javascript:void(0);" onclick="common.hideHelp();" class="wsod_helpBubbleClose"><img src="//i.cdn.turner.com/money/.element/img/3.0/data/icon_removeX.png" alt="close" /></a></div>';
		var $bubble = jQuery("<div />").attr("id", "wsod_helpBubble");
	    var $bubbleArr = jQuery("<div />").addClass("wsod_helpBubbleArrow").html("&nbsp;");
	    var $bubbleBody = jQuery("<div />").addClass("wsod_helpBubbleBody");
	    var $bubbleTitle = jQuery("<div />").addClass("wsod_helpBubbleTitle").html(unescape(obj.title) + bubbleCloseTitle);
	    var $bubbleText = jQuery("<div />").html(unescape(obj.body));
		
	    $bubble.append($bubbleArr);
	    $bubbleBody.append($bubbleTitle).append($bubbleText).appendTo($bubble);
	    $bubble.appendTo("body");
		
	    var t = parseInt(jQuery(el).offset().top + 30);
	    var l = parseInt(jQuery(el).offset().left - 10);
	    
	    if(jQuery(el).children("img").length){
			t += 5;
		}
	    
	    $bubble.css({top:t, left:l});
	};
	
	/**
	 *  Hides absolutely positioned help box
	 *
	 * 	@param el {DOM Element} this
	 */
	this.hideHelp = function(el) {
	    jQuery("#wsod_helpBubble").remove();
	};
	
	//Toggles the border color of the outer element of the buttons
	this.initButtonHover = function(){
		if (this.quirksMode) { //IE6+ gets javascript kick for button hover
			jQuery(".wsod_button").hover(
				function(){
					jQuery(this).addClass("hovered");
				},
				function(){
					jQuery(this).removeClass("hovered");
				}
			);
		}
	}
	
	/**
	 *  Manipulates querystring on URL
	 *
	 * 	@param key {type?} description
	 * 	@param value {type?} description
	 */
	this.updateQueryString = function(key, value){
		
		var currQueryString = location.search;
	
		//Query string exists, so alter it
		if(location.search){
			
			//Query string exists and key|value pair exists, so change it
			if(currQueryString.indexOf(key) != -1){
				
				currQueryString = currQueryString.replace('?', '');
				var keyValueArray = currQueryString.split('&');
				var newQueryStringArray = ['?'];
				
				for(var i = 0, iLen = keyValueArray.length; i < iLen; i++){
					
					if(keyValueArray[i].indexOf(key) == -1){
						newQueryStringArray.push(keyValueArray[i], '&');
					}
				}
				
				location.search = [newQueryStringArray.join(''), key, '=', value].join('');
			}
			//Query string exists but key|value doesn't exist, so create it
			else{
				location.search += ['&', key, '=', value].join('');
			}
		}
		//No query string exists, so create one
		else{
			location.href += ['?', key, '=', value].join('');
		}
	};
	
	this.yieldSwapper = function(obj){
		var sectionTitle = obj.innerHTML;
		
		jQuery("div.wsod_yieldCurveEg").removeClass("wsod_active");
		jQuery(obj).addClass("wsod_active");
		
		jQuery("div#wsod_yieldText div").hide();
		jQuery("div#"+sectionTitle).show();
	}
	
	/**
	 * Creates drop shadow beneath a menu 
	 *
	 * @param container {String} Id of container to apply shadow to
	 */
	this.createDropShadow = function(container,x,y,extraClassName,showOnLeft){
		var $shadowContainer = jQuery("#"+container);
	    var height = $shadowContainer.height();
	    var width = $shadowContainer.outerWidth();
	    var extraCSS = (extraClassName) ? " " + extraClassName : "";
	    $shadowContainer.after('<div class="WSODHoverShadowContainer' +extraCSS+ '"></div>');
	   	var $shadow = $shadowContainer.next();
	    
	    var numLayers = 4;
	    for (var i = 0; i < numLayers; i++) {
	        var $el = jQuery('<div class="WSODHoverShadowLayer"></div>');
	        //jQuery make 'opacity' to fit both firefox and IE
	        $el.css({
	            opacity: 0.055 * i,
	            top: (numLayers - i) + 'px',
	            left: (numLayers - i) + 'px'
	        });
	        $shadow.append($el);
	    }
	    
	    if (showOnLeft){
	    	y -= numLayers;
	    }
	    
	    //adjust, position, and show.
	    $shadow
	    	.children('div')
	    	.width(width + 2)
	    	.height(height + 4)
	    	.end()
	    	.css({top:x,left:y})
	    	.show()
	    ;
	};
	
	/**
	 *  Default event for all symbol search "Go" buttons
	 *
	 */
	this.selectSymbolResult = function(evt,el,$closestInput){
		
		var $btn = jQuery(el);
		
		if (jQuery("#wsod_symbolSearchErrorMsg").length > 0){
			jQuery("#wsod_symbolSearchErrorMsg").remove();
		}
				
		if ($closestInput.length < 1){
			//return;
		}

		var results = $btn.data('results');//either -1 or an array of results
		
		var defaultValues = ["Symbol","Add Ticker","Add another company"];
		
		var msg;
		if (results === -1 || !results || (results && results.length < 1)){
			var val = $closestInput.val();
			if (val == "" || jQuery.inArray(val,defaultValues)){
				msg = "ENTER A TICKER AND TRY AGAIN.";
			} else {
				msg = "THAT TICKER IS NOT VALID. PLEASE TRY AGAIN.";
			}
			
			//create a containing div
			var $div = jQuery("<div>").attr("id","wsod_symbolSearchErrorMsg").addClass("wsod_symbolSearch").appendTo('body');
			//create this to attach <tr>'s
			var $tbody = jQuery("<tbody>");
			//create results table, append tbody
			var $resultTable = jQuery("<table>").append($tbody);
			var $tr = jQuery("<tr>").addClass("resultType last").appendTo($tbody);
			jQuery("<td colspan='3'>"+msg+"</td>").appendTo($tr);
			
			//append to div
			$div.append($resultTable);
	
			// Position the div
			var offset = $closestInput.offset(),
				top = offset.top + $closestInput.outerHeight(),
				width = $closestInput.outerWidth();
			$div.css({
				top: parseFloat(top),
				minWidth: parseFloat(width-2)
			});
	
			// Set the left position after we figure out the total width we're dealing with
			$div.css('left',offset.left);
			
		} else if (results && results.length > 0) {
			if (results[0] && results[0][0]){
				//go!
				wsod_js.search.goToResult(evt,$closestInput,results[0][0]);
			}
		}
	
	};
	
	/**
	 *  Attach a listener to buttons adjacent to symbol search fields
	 * 
	 * @param selector {String} a selector for jQuery to parse - has default
	 */
	this.symbolSearchButtonListener = function(selector){
		var self = this;
		//give button next to symbol search this generic class "wsod_buttonSymbolSearchForm"
		var $button = jQuery("form.wsod_symbLookupForm").find("div.wsod_buttonSymbolSearchForm").find("a");
		//check one other place
		if ($button.length < 1){
			$button = jQuery("form").find("div.wsod_buttonSymbolSearchForm").find("a");
		}
		
		if ($button.length > 0){
			//find nearest input
			var $form = $button.parents("form.wsod_symbLookupForm");
			//check one other place
			if ($form.length < 1){
				$form = $button.parents("form");
			}
			var $closestInput = $form.find("input.wsod_symSearchBox");
			
			//save it on the input
			$closestInput.data("closestButton",$button);
			
			//attach click
			$button.bind("click",function(e){
				self.selectSymbolResult(e,this,$closestInput);
			});
		}
	};
	
	/**
	 *
	 */
	this.customizeMarketTracker = function(el){
		var $container = jQuery(el).parents("#marketTracker");
		cnnMarketTracker.customize(el,$container);
	};
	
})();

//ready.
jQuery(document).ready(function(){
	
	common.cnnDomain = common.cnnGetDomain();
	common.runatCNN = common.isRunningAtCNN();
	common.initSymbolSearch(); //the symbol search box on every page (within CNN header)
	common.initButtonHover(); //IE kick
	
	//hide help bubbles when moving on
	jQuery(document.body).click(function(evt){
		var clicked = jQuery(evt.target);
		if (
			clicked.is("div.wsod_buttonSymbolSearchForm > a") || 
			clicked.is("div.eventIcon") || 
			clicked.is("a.wsod_bubbleIcon") || 
			clicked.parents().is("a.wsod_bubbleIcon") || 
			clicked.parents().is("div.wsod_helpBubbleBody")
			){
			//don't hide if click is help icon or click is inside the blue bubble
		} else {
			if (jQuery("#wsod_helpBubble").length > 0){
				common.hideHelp();
			}
			
			//hide symbol search error
			if (jQuery("#wsod_symbolSearchErrorMsg").length > 0){
				jQuery("#wsod_symbolSearchErrorMsg").remove();
			}
		}
	});
	
	common.symbolSearchButtonListener();
    
    //** DEBUGGING! */
    //console.info("WSOD common loaded");
	
});

//--------------------------------------------------------------------------
// :: XSS class ::
//--------------------------------------------------------------------------
var xss_class = function(){}
xss_class.prototype.filter = function(str){
	str = str.replace(/<\/?script>/gi, '');
	str = str.replace(/"/g, '&quot');
	str = str.replace(/'/g, '&#39;');
	str = str.replace(/</g, '&lt;');
	str = str.replace(/>/g, '&gt;');
	return str;
}
var xss = new xss_class();

//--------------------------------------------------------------------------
// :: WSOD obj ::
//--------------------------------------------------------------------------
if (!wsod_js){
	var wsod_js = {};
}

//in event "symbol.search.js" isn't included in page, define these empty here.
wsod_js.search = {};
wsod_js.search.init = function(){};
wsod_js.cookieOptions = { domain:"cnn.com", expires:365, path:"/" };

/**
 * Not a plugin, just global ajax settings
 */
jQuery.ajaxSetup({
	data: {"..requester..":"ContentBuffer"},
  	cache: false
});


/**
 * CNN IS HOSTING THIS....
 
jQuery.fn.cnnShowOverlay = function() {
	
	//if overlay doesn't exist, add it to DOM
	if (!jQuery('#profile_overlaybg').length){
		jQuery("<div />").attr("id","profile_overlaybg").appendTo("body");	
	}

	var vp_height =  window.innerHeight ? window.innerHeight : jQuery(window).height();
	var vp_width =  jQuery(window).width(); 
	var html_height = Math.max(
		document.documentElement["clientHeight"], document.body["scrollHeight"], document.documentElement["scrollHeight"], document.body["offsetHeight"], document.documentElement["offsetHeight"] );
	var html_width = Math.max(
		document.documentElement["clientWidth"], document.body["scrollWidth"], document.documentElement["scrollWidth"], document.body["offsetWidth"], document.documentElement["offsetWidth"] );
	if( jQuery('#profile_overlaybg').css('display') == 'none') 
	{
		var overlay_height = (html_height > vp_height) ? html_height : vp_height;
		var overlay_width = (html_width > vp_width) ? html_width : vp_width;
		jQuery('#profile_overlaybg').css('width',overlay_width).css('height',overlay_height).show();
	}

	jQuery(window).resize( function() { 
		//cnnResizeOverlay(); 
		if( jQuery('#profile_overlaybg').css('display') == 'block' )
		{
			var vp_height =  window.innerHeight ? window.innerHeight : jQuery(window).height();
			var vp_width =  jQuery(window).width(); 
			var html_height = Math.max(
				document.documentElement["clientHeight"], document.body["scrollHeight"], document.documentElement["scrollHeight"], document.body["offsetHeight"], document.documentElement["offsetHeight"] );
			var html_width = Math.max(
				document.documentElement["clientWidth"], document.body["scrollWidth"], document.documentElement["scrollWidth"], document.body["offsetWidth"], document.documentElement["offsetWidth"] );
			var overlay_height = (html_height > vp_height) ? html_height : vp_height;
			var overlay_width = (html_width > vp_width) ? html_width : vp_width;
			jQuery('#profile_overlaybg').css('width',overlay_width).css('height',overlay_height).show();
			var form = jQuery('.showOverlay');
			form.css({
				'left' : vp_width/2 - (form.width() / 2),  // half width - half element width
				'top' : vp_height/2 - (form.height() / 2) // similar
			}).show();
		}
	} );

	//center 
	jQuery(this).css({
	    'left' : vp_width/2 - (jQuery(this).width() / 2),  // half width - half element width
    	'top' : vp_height/2 - (jQuery(this).height() / 2) // similar
	}).addClass('showOverlay');
};

*/

//logging
(function() {
	var log = function () {};
	if (!window["console"]) {
		window.console = {};
	};
	
	var logFns = {
		log: log,
		warn: log,
		error: log,
		info: log
	};
	
	for (var i in logFns) {
		if (!window.console[i]) {
			window.console[i] = logFns[i];
		}
	}
	
})();