//for the free video player to function from bcportfolio. this will be unnecessary once we are on in-page video format. -yt
var cnnSiteWideCurrDate = new Date(2007, 4, 1);
//search engine functions --BEGIN
function CNNMONEY_writeSearchFields() {
	document.write('<input type="hidden" name=Coll value="money_xml">');
	document.write('<input type="hidden" name="QuerySubmit"  value="true" />');
	document.write('<input type="hidden" name="Page"  value="1" />');
	document.write('<input type="hidden" name="QueryText" value="">');
}

function CNNMONEY_validateSearchForm( theForm )
{
	var site = 'money';
	var queryString = theForm.query.value;

	if ( theForm.sites )
	{
		if ( theForm.sites.options ) {		//	"sites" should be a select
			site = theForm.sites.options[theForm.sites.selectedIndex].value;
		} else {
			if ( theForm.sites.length )
			{
				for ( i = 0; i < theForm.sites.length; i++ )
				{
					if ( theForm.sites[i].checked ) {
						site = theForm.sites[i].value;
					}
				}
			}
			else
			{
				site = theForm.sites.value;
			}
		}
	}

	if ( !queryString ) {
		return false;
	}

	switch ( site.toLowerCase() ) {
		case "google":
			theForm.action = "http://websearch.money.cnn.com/search/search";
			theForm.query.value = queryString;
			return true;
		case "web":
			theForm.action = "http://websearch.money.cnn.com/search/search";
			theForm.query.value = queryString;
			return true;
		case "money":
			theForm.action = "http://search.money.cnn.com/pages/search/advanced.jsp";
			theForm.action = "http://search.money.cnn.com/pages/search/advanced.jsp";
			theForm.Coll.value = 'money_xml';
			theForm.QuerySubmit.value = 'true';
			theForm.Page.value = '1';
			theForm.QueryText.value = queryString;
			return true;
		default:
			return true;						//	unsupported site?
	}
}
// search engine functions -- END

// this is for opening pop-up windows
function openWindow (earl,name,widgets) 
{
	var url = earl;

	if(url.match('/quizzes/') ) {
		document.location.href = url;
	}
	else{
		popupWin = window.open (url,name,widgets);
		popupWin.opener.top.name="opener";
		popupWin.focus();
	}
}


/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */


var agt		= navigator.userAgent.toLowerCase();
var versInt	= parseInt(navigator.appVersion);
var is_aol	= (agt.indexOf("aol") != -1);


function CNN_goTo( url ) {
	window.location.href = url;
}

var cnnHasOpenPopup = 0;
function CNN_openPopup( url, name, widgets, openerUrl )
{
	var host = location.hostname;
	window.top.name = "opener";
	var popupWin = window.open( url, name, widgets );
	if(popupWin) {cnnHasOpenPopup = 1;}
	if ( popupWin && popupWin.opener ) {
		if ( openerUrl )
		{
			popupWin.opener.location = openerUrl;
		}
	}
	if ( popupWin) {
		popupWin.focus();
	}
}

// _____________________________________________________________ WebMonkey code
/*
WM_setCookie(), WM_readCookie(), WM_killCookie()
A set of functions that eases the pain of using cookies.

Source: Webmonkey Code Library
(http://www.hotwired.com/webmonkey/javascript/code_library/)

Author: Nadav Savio
*/

// This next little bit of code tests whether the user accepts cookies.
function WM_browserAcceptsCookies() {
	var WM_acceptsCookies = false;
	if ( document.cookie == '' ) {
		document.cookie = 'WM_acceptsCookies=yes'; // Try to set a cookie.
		if ( document.cookie.indexOf( 'WM_acceptsCookies=yes' ) != -1 ) {
			WM_acceptsCookies = true;
		} // If it succeeds, set variable
	} else { // there was already a cookie
		WM_acceptsCookies = true;
	}
	
	return ( WM_acceptsCookies );
}

function WM_setCookie( name, value, hours, path, domain, secure ) {
	if ( WM_browserAcceptsCookies() ) { // Don't waste your time if the browser doesn't accept cookies.
		var numHours = 0;
		var not_NN2 = ( navigator && navigator.appName
					&& (navigator.appName == 'Netscape')
					&& navigator.appVersion
					&& (parseInt(navigator.appVersion) == 2) ) ? false : true;

		if ( hours && not_NN2 ) { // NN2 cannot handle Dates, so skip this part
			if ( (typeof(hours) == 'string') && Date.parse(hours) ) { // already a Date string
				numHours = hours;
			} else if ( typeof(hours) == 'number' ) { // calculate Date from number of hours
				numHours = ( new Date((new Date()).getTime() + hours*3600000) ).toGMTString();
			}
		}
		
		document.cookie = name + '=' + escape(value) + ((numHours)?(';expires=' + numHours):'') + ((path)?';path=' + path:'') + ((domain)?';domain=' + domain:'') + ((secure && (secure == true))?'; secure':''); // Set the cookie, adding any parameters that were specified.
	}
} // WM_setCookie

function WM_readCookie( name ) {
	if ( document.cookie == '' ) { // there's no cookie, so go no further
	    return false;
	} else { // there is a cookie
	    var firstChar, lastChar;
		var theBigCookie = document.cookie;
		firstChar = theBigCookie.indexOf(name);	// find the start of 'name'
		var NN2Hack = firstChar + name.length;
		if ( (firstChar != -1) && (theBigCookie.charAt(NN2Hack) == '=') ) { // if you found the cookie
			firstChar += name.length + 1; // skip 'name' and '='
			lastChar = theBigCookie.indexOf(';', firstChar); // Find the end of the value string (i.e. the next ';').
			if (lastChar == -1) lastChar = theBigCookie.length;
			return unescape( theBigCookie.substring(firstChar, lastChar) );
		} else { // If there was no cookie of that name, return false.
			return false;
		}
	}	
} // WM_readCookie

function WM_killCookie( name, path, domain ) {
	var theValue = WM_readCookie( name ); // We need the value to kill the cookie
	if ( theValue ) {
		document.cookie = name + '=' + theValue + '; expires=Fri, 13-Apr-1970 00:00:00 GMT' + ((path)?';path=' + path:'') + ((domain)?';domain=' + domain:''); // set an already-expired cookie
	}
} // WM_killCookie


// ______________________________________________________________________ Apple
//Copyright 2000 by Apple Computer, Inc., All Rights Reserved.

// initialize global variables
var detectableWithVB = false;
var pluginFound = false;


function canDetectPlugins() {
	if ( detectableWithVB || (navigator.plugins && navigator.plugins.length > 0) ) {
		return true;
	}
	return false;
}

function detectFlash() {
	pluginFound = detectPlugin( 'Shockwave', 'Flash' );
	// if not found, try to detect with VisualBasic
	if ( !pluginFound && detectableWithVB ) {
		pluginFound = detectActiveXControl( 'ShockwaveFlash.ShockwaveFlash.1' );
	}
	return pluginFound;
}

function detectDirector() {
	pluginFound = detectPlugin( 'Shockwave', 'Director' );
	// if not found, try to detect with VisualBasic
	if ( !pluginFound && detectableWithVB ) {
		pluginFound = detectActiveXControl( 'SWCtl.SWCtl.1' );
	}
	return pluginFound;
}

function detectQuickTime() {
	pluginFound = detectPlugin( 'QuickTime' );
	// if not found, try to detect with VisualBasic
	if ( !pluginFound && detectableWithVB ) {
		pluginFound = detectQuickTimeActiveXControl();
	}
	return pluginFound;
}

function detectReal() {
	pluginFound = detectPlugin( 'RealPlayer' );
	// if not found, try to detect with VisualBasic
	if ( !pluginFound && detectableWithVB ) {
		pluginFound = ( detectActiveXControl('rmocx.RealPlayer G2 Control') ||
			detectActiveXControl('RealPlayer.RealPlayer(tm) ActiveX Control (32-bit)') ||
			detectActiveXControl('RealVideo.RealVideo(tm) ActiveX Control (32-bit)')
		);
	}
	return pluginFound;
}

function detectRealOne() {
	pluginFound = detectPlugin( 'RealOne Player Version Plugin' ) || detectPlugin( 'RealPlayer Version Plugin' );
	// if not found, try to detect with VisualBasic
	if ( !pluginFound && detectableWithVB ) {
		pluginFound = detectRealOneActiveXControl();
	}
	return pluginFound;
}

function detectWindowsMedia() {
	pluginFound = detectPlugin( 'Windows Media' );
	// if not found, try to detect with VisualBasic
	if ( !pluginFound && detectableWithVB ) {
		pluginFound = detectActiveXControl( 'MediaPlayer.MediaPlayer.1' );
	}
	return pluginFound;
}

function createActiveXObject(id){
  var error;
  var control = null;

  try{
    if (window.ActiveXObject){
      control = new ActiveXObject(id);
    }else if (window.GeckoActiveXObject){
      control = new GeckoActiveXObject(id);
    }
  }
  catch (error){;}
  return control;
}

function detectPlugin() {
	// allow for multiple checks in a single pass
	var daPlugins = arguments;
	// consider pluginFound to be false until proven true
	var pluginFound = false;
	// if plugins array is there and not fake
	if ( navigator.plugins && navigator.plugins.length > 0 ) {
		var pluginsArrayLength = navigator.plugins.length;
		// for each plugin...
		for ( var pluginsArrayCounter = 0; pluginsArrayCounter < pluginsArrayLength; pluginsArrayCounter++ ) {
			// loop through all desired names and check each against the current plugin name
			var numFound = 0;
			for ( var namesCounter = 0; namesCounter < daPlugins.length; namesCounter++ ) {
				// if desired plugin name is found in either plugin name or description
				if ( (navigator.plugins[pluginsArrayCounter].name.indexOf(daPlugins[namesCounter]) >= 0) ||
					(navigator.plugins[pluginsArrayCounter].description.indexOf(daPlugins[namesCounter]) >= 0) ) {
					// this name was found
					numFound++;
				}
			}
			// now that we have checked all the required names against this one plugin,
			// if the number we found matches the total number provided then we were successful
			if ( numFound == daPlugins.length ) {
				pluginFound = true;
				// if we've found the plugin, we can stop looking through at the rest of the plugins
				break;
			}
		}
	}
	return pluginFound;
} // detectPlugin


// Here we write out the VBScript block for MSIE Windows
if ( (navigator.userAgent.indexOf('MSIE') != -1) && (navigator.userAgent.indexOf('Win') != -1) ) {
	document.writeln( '<script language="VBscript">' );

	document.writeln( '\'do a one-time test for a version of VBScript that can handle this code' );
	document.writeln( 'detectableWithVB = False' );
	document.writeln( 'If ScriptEngineMajorVersion >= 2 then' );
	document.writeln( '  detectableWithVB = True' );
	document.writeln( 'End If' );

	document.writeln( '\'this next function will detect most plugins' );
	document.writeln( 'Function detectActiveXControl( activeXControlName )' );
	document.writeln( '  on error resume next' );
	document.writeln( '  detectActiveXControl = False' );
	document.writeln( '  If detectableWithVB Then' );
	document.writeln( '     detectActiveXControl = IsObject( CreateObject( activeXControlName ) )' );
	document.writeln( '  End If' );
	document.writeln( 'End Function' );

	document.writeln( '\'and the following function handles QuickTime' );
	document.writeln( 'Function detectQuickTimeActiveXControl()' );
	document.writeln( '  on error resume next' );
	document.writeln( '  detectQuickTimeActiveXControl = False' );
	document.writeln( '  If detectableWithVB Then' );
	document.writeln( '    detectQuickTimeActiveXControl = False' );
	document.writeln( '    hasQuickTimeChecker = false' );
	document.writeln( '    Set hasQuickTimeChecker = CreateObject( "QuickTimeCheckObject.QuickTimeCheck.1" )' );
	document.writeln( '    If IsObject( hasQuickTimeChecker ) Then' );
	document.writeln( '      If hasQuickTimeChecker.IsQuickTimeAvailable( 0 ) Then ' );
	document.writeln( '        detectQuickTimeActiveXControl = True' );
	document.writeln( '      End If' );
	document.writeln( '    End If' );
	document.writeln( '  End If' );
	document.writeln( 'End Function' );

	document.writeln( '\'and the following function handles RealOne' );
	document.writeln( 'Function detectRealOneActiveXControl()' );
	document.writeln( '  on error resume next' );
	document.writeln( '  detectRealOneActiveXControl = False' );
	document.writeln( '  If detectableWithVB Then' );
	document.writeln( '    detectRealOneActiveXControl = False' );
	document.writeln( '    hasRealOneVersionPlugin = false' );
	document.writeln( '    Set hasRealOneVersionPlugin = CreateObject( "IERPCtl.IERPCtl.1" )' );
	document.writeln( '    If IsObject( hasRealOneVersionPlugin ) Then' );
	document.writeln( '      If hasRealOneVersionPlugin.RealPlayerVersion Then ' );
	document.writeln( '        detectRealOneActiveXControl = True' );
	document.writeln( '      End If' );
	document.writeln( '    End If' );
	document.writeln( '  End If' );
	document.writeln( 'End Function' );

	document.writeln( '<\/scr' + 'ipt>' );
}


// _____________________________________________________ Pipeline

function cnnDetectCNNPipeLine() 
{
	if( detectPlugin( 'CNN Pipeline') ) { return 1;}
	if((window.ActiveXObject && navigator.userAgent.indexOf('Windows') != -1) || window.GeckoActiveXObject) 
	{
		if(createActiveXObject('PipelineLauncherX.PipelineLauncherCom.1') || createActiveXObject('CNNPipelineLauncherX.PipelineLauncherCom.1')){ return 2;}
	}
return 0;
}

var CNN_Player_Pref;
var CNN_Stream_Name;
var CNN_req_Premium_Auth;
var cnnHasCNNPL = cnnDetectCNNPipeLine();
		
if(!document.getElementById('cnnPipelineLauncher')) {

	if(cnnHasCNNPL==2) {
		document.write('<OBJECT ID="cnnPipelineLauncher" height="0" width="0" CLASSID="CLSID:BB815F16-1FF7-4DF1-87EE-68381DC3FDC2"></OBJECT>');
	}
	else if(cnnHasCNNPL == 1) {
	
		document.write('<embed type="application/x-vnd-cnn-pipeline" width="0" id="cnnPipelineLauncher" height="0" hidden="true">');
		if(document.getElementById) { var cnnFFTest = document.getElementById('cnnPipelineLauncher');}

	}

}

function cnnLaunchFreePlayer(mode, arg, expiration) {

	var playerURL    = '/cnn/video/player/player.html';
	var detectURL    = '/cnn/video/player/detect.exclude.html';
	var predetectURL = '/cnn/video/player/predetect.exclude.html';
	var noplugURL    = '/cnn/video/player/pages/detection/noplugin.html';
	var expireURL    = '/cnn/video/player/player.html';
	var openURL      = detectURL;
	var cnnVideoArgs = '';
	var dl_arg = '';
	var dl_mode = '';
	
	//var usePipeLinePlayer = cnnDetectCNNPipeLine();
	var usePipeLinePlayer = 0;

	if (detectWindowsMedia()) {
		var cnnPassedDetection = new String( WM_readCookie( 'cnnVidPlug' ) ).toLowerCase();
		if ( cnnPassedDetection == "activex" || cnnPassedDetection == "native" ) {
			openURL = playerURL;
		}
	}
	else {
		openURL = noplugURL;
	}

	switch ( mode )	{

		case 'play':

			var cnnExpireDate = new Date( new Date().getTime() - 24*60*60*1000 );
			var dateStringRegExp = /^(\d{4})\/(\d{2})\/(\d{2})$/;
			var dateStringArray = dateStringRegExp.exec( expiration );
						
			if ( dateStringArray && expiration)
			{
				cnnExpireDate = new Date( dateStringArray[1], dateStringArray[2] - 1, dateStringArray[3] );
			} else {
				cnnExpireDate = cnnSiteWideCurrDate;
			}
					
			if ( cnnExpireDate.getTime() < cnnSiteWideCurrDate.getTime() )
			{
				if ( cnnPassedDetection == "activex" || cnnPassedDetection == "native" )
				{
						openURL = expireURL;
				}
				else {
						openURL = detectURL;
				}				
				cnnVideoArgs = 'url=/cnn/video/player/static/404&source=money';
				CNN_req_Premium_Auth = true;

			}
			else
			{
				cnnVideoArgs = 'url=' + arg + '&source=money';
			}
			dl_mode = 'vod';
			dl_arg = '&video=' + arg + '&source=money';
			break;
		
		case 'browse':
			cnnVideoArgs = 'section=' + arg + '&source=money';
			break;
			
		case 'live':
			cnnVideoArgs = 'url=/cnn/video/player/static/404&source=money';
			CNN_req_Premium_Auth = true;
			dl_mode = 'live';
			dl_arg = '&stream=' + arg + '&source=money';
			break;

		default:
			cnnVideoArgs = 'section=/ALL&source=money';
			break;
			
	}
	
	if(((window.location.hostname.indexOf('search.cnn.com')>-1)||(window.location.hostname.indexOf('audience.cnn.com')>-1)) && (openURL.indexOf('http://')==-1) ) {
		openURL='http://www.cnn.com'+openURL;
	}	
	
	if (CNN_req_Premium_Auth) {
		top.location.href = "/cnn/pr/pipeline/download.html?mode=" + dl_mode + dl_arg;
	}else { 
		CNN_openPopup('http://www.cnn.com'+openURL+'?'+cnnVideoArgs, 'CNNVideoPlayer', 'scrollbars=no,resizable=no,width=770,height=570');
	}
}


function cnnLaunchWebPlayer(mode, arg, expiration) {

	var playerURL    = '/cnn/pr/video/portable/player.html';
	var openURL      = playerURL;
	var cnnVideoArgs = '';

	switch ( mode )	{

		case 'play':
			cnnVideoArgs = 'mode=vod&video=' + arg + '&source=money';
			break;
		
		case 'browse':
			cnnVideoArgs = 'mode=browse&section=' + arg + '&sectionDir=' + arg.toLowerCase() + '&source=money';
			break;
			
		case 'live':
			cnnVideoArgs = 'mode=live&stream=' + arg + '&source=money';
			break;

		default:
			cnnVideoArgs = 'section=/ALL&source=money';
			break;
			
	}

	cnnVideoArgs += '&source=pop/';
	
	CNN_openPopup('http://www.cnn.com' + openURL+'?'+cnnVideoArgs, 'CNNWebPlayer', 'scrollbars=no,resizable=no,width=804,height=604');

}

function cnnLaunchPipelineApp(mode, arg, expiration) {
	
	var pipelineLaunchObj = document.getElementById('cnnPipelineLauncher');
	var launchFree = false;
	
	if(!pipelineLaunchObj) { launchFree = true; }
	if(pipelineLaunchObj && pipelineLaunchObj.CanLaunch("web")!=true) {
		launchFree = true;
	}
	
	if(launchFree) {
		
		cnnLaunchFreePlayer(mode, arg, expiration);
	
	}
	else {
	
		if(WM_readCookie('CNN_Stream_Name')) {
			CNN_Stream_Name = WM_readCookie('CNN_Stream_Name');
		}
		else {
			CNN_Stream_Name = '';
		}
		
		switch ( mode )	{
			
			case 'play':
				var cmd = '<commands><command name="playVOD">http://premium.cnn.com/pr'+arg+'/video.ws.asx</command></commands>';
				pipelineLaunchObj.Launch(cmd,'');
				break;
		
			case 'browse':
				pipelineLaunchObj.Launch('<commands><command name="changeMode">MaxMode</command><command name="changeTab">BrowseVideo</command></commands>','');
				break;
			
			case 'live':
				pipelineLaunchObj.Launch('<commands><command name="changeMode">MaxMode</command><command name="playLive">pipeline_' + arg + CNN_Stream_Name + '</command></commands>','');
				break;

			default:
				pipelineLaunchObj.Launch('<commands><command name="changeMode">MaxMode</command><command name="changeTab">BrowseVideo</command></commands>','');
				break;
		
		}

	}
	
}
/* cnn live video popup
===================================================================== */
var cnnVidServer = '';
function cnnLiveVideo( strWhich ) {
	if(!strWhich) {
		strWhich = '1';
	}
	var strVidLoc = cnnVidServer + 'http://www.cnn.com/video/live/live.html?stream=stream' + strWhich;
	
	javascript:CNN_openPopup(strVidLoc,'liveplayer','toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=no,resizable=yes,width=672,height=540')
}
/* end cnn live video popup
===================================================================== */

function cnnVideo(mode, vid, expiration) {
	var sectionArray = new Array("world", "us", "international", "spanish", "politics", "showbiz", "offbeat", "tech", "living", "education", "health", "sports", "weather");
	var oldVideo = false;
	var cnnVideo = false;
	var videoUrl = "";
	
	var pattern1=/\/(\d{4})\/(\d{2})\/(\d{2})\//;
	if(pattern1.test(vid)) {
		var arr = vid.match(pattern1);
		var videoDate = arr[1] + arr[2] + arr[3];
		if(videoDate < "20090303") { oldVideo = true; }
	}
	
	for (i=0; i<sectionArray.length; i++){
		var pattern2 = new RegExp("^/video/" + sectionArray[i] + "/");
		if(pattern2.test(vid)) { cnnVideo = true; }
	}
	
	if(vid.search(/^\/video\/business\//) > -1 && oldVideo == true) { cnnVideo = true; }
	
	if(vid.search(/\/globalforum\//) > -1) { videoUrl = 'http://money.cnn.com/video/globalforum/' + vid; }
	else if(cnnVideo) { videoUrl = 'http://www.cnn.com/video/#' + vid; }
	else { videoUrl = 'http://money.cnn.com/' + vid; }
	
	if(mode == 'live') { cnnLiveVideo(vid); }
	else if(top.location == self.location) { location.href = videoUrl; }
	else { window.open(videoUrl, 'vid_win'); } 
}

// _________________________________________________________________________
function _img_nocache(url, options) {
	var dt = new Date;
	var ts = dt.getTime();
	document.write('<img src="'+url+'?nocache='+ts+'" '+options+'>');
} 
function showBCchart(which) {
	var dt = new Date;
	var ts = dt.getTime();
	var chart = "http://money.cnn.com/.element/ssi/data/1.0/" + which + ".gif?nocache=" + ts;
	document.chartimage.src = chart;
}
// _________________________________________________________________________
// choose Magazine offer to display
function writeLinkX(name,subsUrl,freeUrl)
{document.write('<a href="http://subs.timeinc.net/CampaignHandler/'+subsUrl+'" class="cnnSubBiz">Subscribe to '+name+'</a> <span class="cnnSubBizDiv">|</span> <a href="http://subs.timeinc.net/CampaignHandler/'+freeUrl+'" class="cnnSubBiz" target="_blank">Free Trial</a>');}

function bookmarksite(title,url){
	if (window.sidebar) { // firefox
		window.sidebar.addPanel(title, url, "");
	} else if (window.opera && window.print) { // opera
		var elem = document.createElement('a');
		elem.setAttribute('href',url);
		elem.setAttribute('title',title);
		elem.setAttribute('rel','sidebar');
		elem.click();
	} else if (document.all) {// ie
		window.external.AddFavorite(url, title);
	} else {
		alert('Sorry, your browser does not support this functionality.');
	}
}

var thisBrowser=navigator.appName;
function writeLink(name,subsUrl,freeUrl) {
	if (name=='FSB') {
		document.write('<li><a href="https://w1.buysub.com/servlet/OrdersGateway?cds_mag_code=YCY">Subscribe to FSB</a></li>');
	} else {
		document.write('<li><a href="http://subs.timeinc.net/CampaignHandler/'+subsUrl+'">Subscribe to '+name+'</a></li>');
	}
	if (location.pathname.match('.htm$')) { //stories only
		if ((window.external) && (thisBrowser=="Microsoft Internet Explorer")) { 
			document.write('<li><a href="javascript:history.go(0);" onclick="this.style.behavior=\'url(#default#homepage)\';this.setHomePage(\'http://money.cnn.com\');">Make CNNMoney my Homepage</a></li>');
		} else {
			document.write('<li><a href="http://money.cnn.com/services/bridge/sethomepage.html">Make CNNMoney my Homepage</a></li>');
		}
		document.write('<li><a href="javascript:bookmarksite(\'CNNMoney.com\',\'http://money.cnn.com\');">Add to Favorites</a></li>');
	} else { // nonstories
		if (name!='FSB') {
			document.write('<li><a href="http://subs.timeinc.net/CampaignHandler/'+freeUrl+'">Free Trial</a></li>');
		}
		document.write('<li><a href="http://money.cnn.com/services/bridge/contact.us.html">Magazine Customer Service</a></li>');
	}
}


var sectionType='';
function chooseMag()
{
	var randomnumber=Math.floor(Math.random()*2)
	if ((location.pathname == '/magazines/fortune/')||(location.pathname == '/magazines/fortune/index.html'))
		writeLink('Fortune','FOnb?source_id=3','FOnb?source_id=10');
	else
	if ((location.pathname.match('/magazines/fortune/')) && (!(location.pathname.match('fortune_archive')) && (sectionType!='archive') ))
		writeLink('Fortune','FOnb?source_id=2','FOnb?source_id=9');
	else
	if (location.pathname.match('fortune'))
		writeLink('Fortune','FOnb?source_id=1','FOnb?source_id=8');
	else
	if ((location.pathname == '/magazines/moneymag/')||(location.pathname == '/magazines/moneymag/index.html'))
		writeLink('Money','MOnb?source_id=3','MOnb?source_id=7');
	else
	if ((location.pathname.match('/magazines/moneymag/')) && (!(location.pathname.match('moneymag_archive')) && (sectionType!='archive') ))
		writeLink('Money','MOnb?source_id=2','MOnb?source_id=6');
	else
	if (location.pathname.match('moneymag'))
		writeLink('Money','MOnb?source_id=12','MOnb?source_id=11');
	else
	if ((location.pathname == '/magazines/fsb/') || (location.pathname == '/magazines/fsb/index.html'))
		writeLink('FSB','','');
		//document.write('<li><a href="https://w1.buysub.com/servlet/OrdersGateway?cds_mag_code=YCY">Subscribe to FSB</a></li>');
	else
	if ( (location.pathname.match('fsb')) && (location.pathname.match('toc.html')) )
		writeLink('FSB','','');
		//document.write('<li><a href="https://w1.buysub.com/servlet/OrdersGateway?cds_mag_code=YCY">Subscribe to FSB</a></li>');
	else
	if ((location.pathname == '/magazines/business2/')||(location.pathname == '/magazines/business2/index.html'))
		writeLink('Fortune','FOnb?source_id=16','FOnb?source_id=18');
	else
	if ((location.pathname.match('/magazines/business2/')) && (!(location.pathname.match('business2_archive')) && (sectionType!='archive') ))
		writeLink('Fortune','FOnb?source_id=15','FOnb?source_id=17');
	else
	if (location.pathname.match('business2')||location.pathname.match('biz2'))
		writeLink('Fortune','FOnb?source_id=1','FOnb?source_id=8');
	else
	if (randomnumber==0)
		if((location.pathname == '/')||(location.pathname == '/index.html'))
			writeLink('Fortune','FOnb?source_id=4','FOnb?source_id=11');
		else
		if(location.pathname == '/services/bridge/contact.us.html')
			writeLink('Fortune','FOnb?source_id=12','FOnb?source_id=13');
		else
		if(location.pathname.match('/services/newsletters/'))
			writeLink('Fortune','FOnb?source_id=46','FOnb?source_id=50');
		else
			writeLink('Fortune','FOnb?source_id=46','FOnb?source_id=8');
	else
	if (randomnumber==1) //adding rand 3 to balance out ratio to get money or fortune. test case by consumer mkting
		if((location.pathname == '/')||(location.pathname == '/index.html'))
			writeLink('Money','MOnb?source_id=15','MOnb?source_id=8');
		else
		if(location.pathname == '/services/bridge/contact.us.html')
			writeLink('Money','MOnb?source_id=10','MOnb?source_id=9');
		else
			writeLink('Money','MOnb?source_id=1','MOnb?source_id=5');
}
function chooseMagOFIE()
{
	var ofieurl = 'fo_336x165_specialofie_0408.js';
	var randomnumber=Math.floor(Math.random()*2)
	// fortune content
	if (location.pathname.match('fortune'))
		if (location.pathname.match('.htm$'))
			ofieurl = 'fo_336x225_foapofie_0408.js';
		else
		if (location.pathname.match('toc.html'))
			ofieurl = 'fo_336x165_fotocofie_0408.js';
		else
		if (location.pathname.match('popups')||location.pathname.match('/galleries'))
			ofieurl = 'fo_336x165_gallofie_0408.js';
		else
		if (location.pathname.match('/magazines/fortune')&&(typeof sectionType == 'undefined' || sectionType!='archive'))
			ofieurl = 'fo_336x165_rankofie_0408.js';		
		else
			ofieurl = 'fo_336x165_specialofie_0408.js';
	else
	// moneymag homepage
	if ((location.pathname == '/magazines/moneymag/')||(location.pathname == '/magazines/moneymag/index.html'))
		ofieurl = 'mo_336x165_molandingpg_0908.js';
	else
	// moneymag content
	if (location.pathname.match('moneymag'))
		if (location.pathname.match('.htm$'))
			ofieurl = 'mo_336x216_moartpg_0908.js';
		else
			if (location.pathname.match('popups'))
				ofieurl = 'mo_336x216_moartpg_0908.js';
			else
				ofieurl = 'mo_336x216_moartpg_0908.js';
	else
	// b2 homepage
	if ((location.pathname == '/magazines/business2/')||(location.pathname == '/magazines/business2/index.html'))
		ofieurl = 'fo_336x165_b20hpofie_0408.js';
	else
	// b2 content
	if (location.pathname.match('business2')||location.pathname.match('biz2'))
		if (location.pathname.match('.htm$'))
			ofieurl = 'fo_336x225_b20apofie_0408.js';
		else
		if (location.pathname.match('popups')||location.pathname.match('/galleries'))
			ofieurl = 'fo_336x165_gallofie_0408.js';
		else
		if (location.pathname.match('/magazines/business2')&&(typeof sectionType == 'undefined' || sectionType!='archive'))
			ofieurl = 'fo_336x165_rankofie_0408.js';		
		else
			ofieurl = 'fo_336x165_specialofie_0408.js';
	else
	// fsb homepage
	if ((location.pathname == '/magazines/fsb/')||(location.pathname == '/magazines/fsb/index.html'))
		ofieurl = 'fo_336x165_fsbhpofie_0408.js';
	else
	// fsb content
	if (location.pathname.match('fsb'))
		if (location.pathname.match('.htm$'))
			ofieurl = 'fo_336x225_fsbapofie_0408.js';
		else
		if (location.pathname.match('toc.html'))
			ofieurl = 'fo_336x165_fsbtocofie_0408.js';
		else
		if (location.pathname.match('popups')||location.pathname.match('/galleries'))
			ofieurl = 'fo_336x165_gallofie_0408.js';
		else
		if (location.pathname.match('/magazines/fsb')&&(typeof sectionType == 'undefined' || sectionType!='archive'))
			ofieurl = 'fo_336x165_rankofie_0408.js';		
		else
			ofieurl = 'fo_336x165_specialofie_0408.js';
	else
	// cnnmoney content
	if (randomnumber==0)
		if ((location.pathname == '/')||(location.pathname == '/index.html'))
			ofieurl = 'fo_336x165_cnnhpofie_0408.js';
		else
		if (location.pathname.match('/services/newsletters/'))
			ofieurl = 'fo_336x165_cnnofie_0408.js';
		else
		if (location.pathname.match('.htm$'))
			ofieurl = 'fo_336x225_cnnapofie_0408.js';
		else
		if (location.pathname.match('popups')||location.pathname.match('/galleries'))
			ofieurl = 'fo_336x165_gallofie_0408.js';
		else
			ofieurl = 'fo_336x165_specialofie_0408.js';
	else
	if (randomnumber==1)
		if ((location.pathname == '/')||(location.pathname == '/index.html'))
			ofieurl = 'mo_336x165_cnnmoneyhp_0908.js';
		else
		if (location.pathname.match('.htm$'))
			ofieurl = 'mo_336x216_moartpg_0908.js';
		else
		if (location.pathname.match('popups')||location.pathname.match('/galleries'))
			ofieurl = 'mo_336x216_moartpg_0908.js';
		else
			ofieurl = 'mo_336x216_moartpg_0908.js';

	document.write('<script type=\"text/javascript\" src=\'https://i.cdn.turner.com/money/.element/ssi/sections/mag/'+ ofieurl + '\'><\/script>');
}
function writeFortCMLinkBanner(subsUrl)
	{document.write('<div id="subsLink1"><a href="http://subs.timeinc.net/CampaignHandler/'+subsUrl+'" target="_blank">Subscribe to Fortune Magazine</a></div><div id="subsLink2"><a href="http://subs.timeinc.net/CampaignHandler/fogift?source_id=8&iid=FOB9FH7" target="_blank">Give the Gift of Fortune</a></div>');}
function writeFortCMLinkFooter(subsUrl)
	{document.write('<a href="http://subs.timeinc.net/CampaignHandler/'+subsUrl+'" target="_blank">Subscribe to Fortune</a>');}

function chooseFortEKeyBanner() {
	var randomnumber=Math.floor(Math.random()*2)	//was used for consumer mkting test
	if ((location.pathname == '/magazines/fortune/')||(location.pathname == '/magazines/fortune/index.html')) {
		writeFortCMLinkBanner('FOnb?source_id=27');
	} else {
		writeFortCMLinkBanner('FOnb?source_id=30');
	} 
}


function writeFortCoverLink()
	{if ((location.pathname == '/magazines/fortune/')||(location.pathname == '/magazines/fortune/index.html')) {
		document.write('<a href="https://subs.timeinc.net/CampaignHandler/FOnb?source_id=27"> <img src="https://i.cdn.turner.com/money/.element/img/2.0/fortune/fortune_cover_gradient.gif" alt="Subscribe" width="80" height="72" border="0" class="bannerCover"></a>');
	} else {
		document.write('<a href="https://subs.timeinc.net/CampaignHandler/FOnb?source_id=30"> <img src="https://i.cdn.turner.com/money/.element/img/2.0/fortune/fortune_cover_gradient.gif" alt="Subscribe" width="80" height="72" border="0" class="bannerCover"></a>');
	} 
	}
	
function chooseFortEKeyFooter()
{
	var randomnumber=Math.floor(Math.random()*2)
	if ((location.pathname == '/magazines/fortune/')||(location.pathname == '/magazines/fortune/index.html')) {
		writeFortCMLinkFooter('FOnb?source_id=34');
	} else if ((location.pathname == '/magazines/fortune/investing/')||(location.pathname == '/magazines/fortune/investingindex.html')) {
		writeFortCMLinkFooter('FOnb?source_id=33');
	} else if ((location.pathname == '/magazines/fortune/tech/')||(location.pathname == '/magazines/fortune/tech/index.html')) {
		writeFortCMLinkFooter('FOnb?source_id=31');
	} else if ((location.pathname == '/magazines/fortune/fortune500/')||(location.pathname == '/magazines/fortune/fortune500/index.html')) {
		writeFortCMLinkFooter('FOnb?source_id=35');
	} else if ((location.pathname == '/magazines/fortune/management/')||(location.pathname == '/magazines/fortune/management/index.html')) {
		writeFortCMLinkFooter('FOnb?source_id=32');
	} else if ((location.pathname == '/magazines/fortune/rankings/')||(location.pathname == '/magazines/fortune/rankings/index.html')) {
		writeFortCMLinkFooter('foab?source_id=33');
	} else if ( (location.hostname.search(/\.blogs(\..+)?\.cnn\.com$/) != -1)||(location.pathname.match('/magazines/fortune/columnists')) ) {
		writeFortCMLinkFooter('FOnb?source_id=36');
	} else if (location.pathname.match('/galleries')) {
		writeFortCMLinkFooter('FOnb?source_id=54');
	} else if (location.pathname.match('/video/ft')) {
		writeFortCMLinkFooter('FOnb?source_id=37');
	} else if (location.pathname.match('.htm$')) {
		writeFortCMLinkFooter('FOnb?source_id=38');
	} else if (location.pathname.match('/magazines/fortune/fortune_archive/')) {
		writeFortCMLinkFooter('FOnb?source_id=51');
	} else if (location.pathname.match(/(\..+)?\/\d{4}\//)) {
		writeFortCMLinkFooter('foab?source_id=33');
	} else {
	// from old site
		writeFortCMLinkFooter('FOnb?source_id=2');
	} 
}
// _________________________________________________________________________
//biz2 email send form
function openWindowEmail (mailx) {
	var recipient = mailx;
	var refer = top.location.href;
	var url = '/popups/2005/biz2/email/emailsend.html?send_to=' + recipient + '&article=' + refer;
	var name = '440x520';
	var widgets = 'toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=no,resizable=yes,width=440,height=520';
	popupWin = window.open (url,name,widgets);
	popupWin.opener.top.name='opener';
	popupWin.focus();
}
// end
// _________________________________________________________________________
// function necessary for dynamic quote lookup in banners
function formatResult(query, selectionValue, symbol, companyName, countryCode)
    {
        selectionValue.setValue(symbol);
        //Eliminate Country from query text.
        if (query.indexOf(':') == 2)
        {
            if (query.length > 3)
            {
    	        query = query.substring(3);
    	    }
    	    else
    	    {
        	    query = '';
        	}
        }
        
        var scRegExp = new RegExp('\\b(' + query + ')(.*)\\b', 'i'); //Find part to bold

        if (symbol.match(scRegExp))
        {
	        symbol = symbol.replace(scRegExp, '<span style="font-weight:bold">$1</span>$2');
	    }
        else
        {
	        companyName = companyName.replace(scRegExp, '<span style="font-weight:bold">$1</span>$2');
	    }

        var aMarkup = ['<table border="0" cellspacing="0" cellpadding="0" class="resulttable"><tr><td class="col1">',
               symbol,
               '</td><td class="col2">',   
               companyName,   
               '</td></tr></table>'];   
        return (aMarkup.join(''));
    }
//CSI functions
var cnnCSIs = new Array();
var cnnUseDelayedCSI = 0;
var localUserAgent = navigator.userAgent.toLowerCase();
if((localUserAgent.indexOf('msie')>-1) && (localUserAgent.indexOf('mac')>-1)){cnnUseDelayedCSI = 1;}

function cnnAddCSI(id,source,args,breakCache)
{
	if(id!='contextualLinks'){
		if(!args) { args='';}
		breakCache = ( !breakCache && ( source.charAt( 0 ) == '/' ) ) ? false : true;
		if(cnnUseDelayedCSI)
		{
			var newCSI = new Object();
			newCSI.src = source;
			newCSI.id  = id;
			newCSI.args = args;
			newCSI.breakCache = breakCache;
			cnnCSIs[cnnCSIs.length]=newCSI;
		}
		else
		{
			var today = new Date();
			var currTime = today.getTime();
			var iframeArgs = ( breakCache ) ? '&time='+currTime : '';
			if(args)
			{
				iframeArgs=iframeArgs+'&'+args;
			}
			var iframeHtmlSrc='<iframe src="'+source+'?domId='+id+iframeArgs+'" name="iframe'+id+'" id="iframe'+id+'" width="0" height="0" align="right" style="visibility:hidden"></iframe>';
			document.write(iframeHtmlSrc);
		}
	}
}

function cnnUpdateCSI(html, id)
{
	var htmlContainerObj = document.getElementById( id ) || document.all[ id ];
	if(htmlContainerObj)
	{
		htmlContainerObj.innerHTML = html;
	}
	//force a refresh of the content area
	var htmlContentArea = 0;//document.body;
	if(htmlContentArea)
	{
		var previousTopVal = htmlContentArea.style.top || '0px';
		htmlContentArea.style.top = '1px';
		htmlContentArea.style.top = previousTopVal;
	}
}

function cnnHandleCSIs()
{

	if(document.getElementById) { var cnnFFTest = document.getElementById('cnnPipelineLauncher'); }

	if(document.body && document.body.innerHTML && cnnUseDelayedCSI)
	{
		var iframeOwner = document.getElementById( 'csiIframe' ) || document.all[ 'csiIframe' ];
		var iframeHtmlSrc = '';
		
		for(var incCounter=0;incCounter<cnnCSIs.length;incCounter++)
		{
			var src = cnnCSIs[incCounter].src;
			var id = cnnCSIs[incCounter].id;
			var today = new Date();
			var breakCache = cnnCSIs[incCounter].breakCache;
			var currTime = today.getTime();
			var args = ( breakCache ) ? '&time='+currTime : '';
			if(cnnCSIs[incCounter].args)
			{
				args=args+'&'+cnnCSIs[incCounter].args;
			}
			
			iframeHtmlSrc+='<iframe src="'+src+'?domId='+id+args+'" name="iframe'+id+'" id="iframe'+id+'" width="0" height="0" align="right"></iframe>';
		}
		if(iframeOwner)
		{
			iframeOwner.innerHTML=iframeHtmlSrc;
		
		}
	}
}
 


//returns source of content based on URL parsing
var cnnm_sourcing  = {

	sourceTypes : {
					cnnmoney : 'CNN',
					fortune : 'FORT',
					moneymag : 'MONEY'
				},
				
	getURLSource : function (URL) {
	
		source = this.sourceTypes.cnnmoney // FORTUNE, MONEYMAG, CNNMONEY
		
		//get host string if it exists
		var linkHost = URL.split('http://');
		if(linkHost.length > 1) {
			linkHost = linkHost[1].split("/");
			linkHost = linkHost[0];
		}
		
		// Check for mag brand/source 
	    if(URL.indexOf('.fortune')!=-1 || URL.indexOf('magazines/fortune')!=-1) {
	    	source = this.sourceTypes.fortune; 
	    }
	    if(URL.indexOf('.moneymag' )!=-1 || URL.indexOf('magazines/moneymag' )!=-1) {
	    	source = this.sourceTypes.moneymag; 
	    }
	    
		//Check for blogs    
		switch (linkHost) {
			case ('features.blogs.fortune.cnn.com'):
			case ('finance.fortune.cnn.com'):
			case ('management.fortune.cnn.com'):
			case ('postcards.blogs.fortune.cnn.com'):
			case ('tech.fortune.cnn.com'):
			case ('techland.blogs.fortune.cnn.com'):
			case ('thewheeldeal.blogs.fortune.cnn.com'):
			case ('stanleybing.blogs.fortune.cnn.com'):
				source = this.sourceTypes.fortune;
				break; 
			case ('moremoney.blogs.money.cnn.com'):
			case ('readerschoice.blogs.money.cnn.com'):
			case ('helpdesk.blogs.money.cnn.com'):
				source = this.sourceTypes.moneymag;
				break; 
			case ('cnnmoneytest.wordpress.com'):
			case ('cnnmoneytalkback.blogs.cnnmoney.cnn.com'):
			case ('smallbusiness.blogs.cnnmoney.cnn.com'):
			default:			
		}

	
	    return source;
	}
 
}



var cnnEnableCL = true;

//ipad/html5 check
var ipadCheck = navigator.userAgent.indexOf('iPad') !== -1; 

//domain fix
var cnnDocDomain = '';
if(location.hostname.indexOf('cnn.com')>0) {cnnDocDomain='cnn.com';}
if(location.hostname.indexOf('turner.com')>0) {if(document.layers){cnnDocDomain='turner.com:'+location.port;}else{cnnDocDomain='turner.com';}}
if(cnnDocDomain) {document.domain = cnnDocDomain;}
