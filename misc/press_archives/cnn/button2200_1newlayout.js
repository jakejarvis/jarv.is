/* added 4/20/09 by YT to strip out story query string. fixes paginated stories' print */
/* changed line 12 & 13 to clean url before assigning to clickURL */
function cleanClickURL(locationHref) {
	var url=new String(document.location.href);
	var query=document.location.search;
	url=url.replace(query, '');
	return url;
}

/*Copyright 2000-2001 Clickability Inc. */
document.write('<script language="JavaScript"> \n');
document.write('window.onerror=function(){clickURL=cleanClickURL(document.location.href);return true;} \n');
document.write('if(!self.clickURL) clickURL=cleanClickURL(parent.location.href); \n');
document.write('<\/script> \n');

var cvsVersion="$Revision: 1.65 $";
var version=cvsVersion.replace(/\s+\S$/,"").replace(/\S+\s*/,"");
var partnerID=2200;
var custom=1;
var popWin="width=780,height=480,resizable=1,scrollbars=1";
var commonLoc="&fb=Y&url="+escape(getClickURL())+"&title="+escape(getClickTitle())+"&random="+Math.random()+"&partnerID="+partnerID+"&expire="+escape(getClickExpire());


var btn=new Image();
var clickRan=Math.random();
var clickFac = 20;
if(clickFac==0)clickFac=1;
if(clickRan>(1-(1/clickFac))){
    btn.src="http://imp.clickability.com/"+clickRan+"&"+escape(getClickTitle())+"&"+escape(getClickURL())+"?1"+"1"+"1"+"1"+"0"+"0"+"0000|"+"5010"+"|"+"4010"+"|"+"3001"+"|"+"2200"+"|"+"2200"+"|"+"1"+"|"+version+"|20";
}
/****************Don't Change Below****************/
var IMG="http://m.a.cnn.net/money/images/clickability/";
var stT, etT, ptT, mpT, altST, altET, altPT, altMP, textWrap, iCol, tCol;
var spons, sponLoc, sponIntro, sponCol, sponTagTop, sponTagBot, sponFunc;
var bLay=new Array(), sponLay=new Array();

/*Functions*/
function ST () {
	window.open('http://cnnfn.savethis.clickability.com/st/saveThisApp?clickMap=saveThis'+commonLoc,'click',popWin);
}

function STMouseOver () {
	window.status='SAVE THIS';
	return true;
}

function STMouseOut () {
	window.status='';
	return true;
}

function ET () {
	window.open('http://cnnfn.emailthis.clickability.com/et/emailThis?clickMap=create'+commonLoc,'click',popWin);
}

function ETMouseOver () {
	window.status='EMAIL THIS';
	return true;
}

function ETMouseOut () {
	window.status='';
	return true;
}

function PT () {
	window.open('http://cnnfn.printthis.clickability.com/pt/printThis?clickMap=printThis'+commonLoc,'click',popWin);
}

function PTMouseOver () {
	window.status='PRINT THIS';
	return true;
}

function PTMouseOut () {
	window.status='';
	return true;
}

function MP () {
	window.open('http://money.cnn.com/javascript/clickability/mp/etmp.html','click',popWin);
}

function MPMouseOver () {
	window.status='MOST POPULAR';
	return true;
}

function MPMouseOut () {
	window.status='';
	return true;
}

function drawBtn(type,text) {
	if(type=='h' || type =='H') type='h';
	if(type=='v' || type =='V') type='v';
	var i=bLay.length;
	sponLay[i]=sponTagBot;
	bLay[i]="";

	//start no wrap button
	if (!textWrap) {
		var sIconImg=IMG+iCol+"/"+type+"-s-icon-l.gif";
		var sTextImg=IMG+tCol+"/"+type+"-s-text-l.gif";
		var eIconImg=IMG+iCol+"/"+type+"-e-icon-l.gif";
		var eTextImg=IMG+tCol+"/"+type+"-e-text-l.gif"; 
		var pIconImg=IMG+iCol+"/"+type+"-p-icon-l.gif";
		var pTextImg=IMG+tCol+"/"+type+"-p-text-l.gif";
		var mpIconImg=IMG+iCol+"/"+type+"-mp-icon-l.gif";
		var mpTextImg=IMG+tCol+"/"+type+"-mp-text-l.gif";
		if (type=='h') {
			var iconHeight=18,sIconWidth=34,eIconWidth=30,pIconWidth=31,sTextWidth=50,eTextWidth=56,pTextWidth=55,mpIconWidth=30,mpTextWidth=77;
		}
		else {
			var iconHeight=23,sIconWidth=35,eIconWidth=35,pIconWidth=35,sTextWidth=55,eTextWidth=55,pTextWidth=55,mpIconWidth=35,mpTextWidth=77;
		}
	
	}
	//end no wrap button
	
	//start wrap button
	if (textWrap) {
		var sIconImg=IMG+iCol+"/"+type+"-s-icon-s.gif";
		var sTextImg=IMG+tCol+"/"+type+"-s-text-s.gif";
		var eIconImg=IMG+iCol+"/"+type+"-e-icon-s.gif";
		var eTextImg=IMG+tCol+"/"+type+"-e-text-s.gif"; 
		var pIconImg=IMG+iCol+"/"+type+"-p-icon-s.gif";
		var pTextImg=IMG+tCol+"/"+type+"-p-text-s.gif";
		var mpIconImg=IMG+iCol+"/"+type+"-mp-icon-s.gif";
		var mpTextImg=IMG+tCol+"/"+type+"-mp-text-s.gif";
		if (type=='h') {
			var iconHeight=24,sIconWidth=35,eIconWidth=30,pIconWidth=32,sTextWidth=30,eTextWidth=34,pTextWidth=31,mpIconWidth=31,mpTextWidth=53;
		}
		else {
			var iconHeight=32,sIconWidth=35,eIconWidth=35,pIconWidth=35,sTextWidth=32,eTextWidth=32,pTextWidth=32,mpIconWidth=35,mpTextWidth=50;
		}
	}
	//end wrap button
	
	//start sponsor top
	if (spons) {
		if (type=='h') {
			if (sponLoc=="top") {
				document.write('<table><tr><td align="right"><table><tr><td><font size="1" face="Arial,Helvetica" color="#000000">'+sponIntro+'</font> </td><td>');
				eval(sponTagTop);
				document.write('</td></tr></table></td></tr><tr><td>');	
			}
			else {
				document.write('<table><tr><td>');	
			}
		}
	}
	//end sponsor top
	
	if (type=='h') document.write('<nobr>');
	
		
	//start SAVE THIS
	if (stT) {
		if (type=='v') bLay[i]+="<div>";
		bLay[i]+="<A HREF=\"#\" ONCLICK=\"return(ST());\" onMouseOver=\"return(STMouseOver());\" onMouseOut=\"return(STMouseOut());\">";
		bLay[i]+="<IMG src=\""+sIconImg+"\" width=\""+sIconWidth+"\" height=\""+iconHeight+"\" border=\"0\" alt=\""+altST+"\" title=\""+altST+"\">";
		if (text) bLay[i]+="<IMG src=\""+sTextImg+"\" width=\""+sTextWidth+"\" height=\""+iconHeight+"\" border=\"0\" alt=\""+altST+"\" title=\""+altST+"\">";
		if (type=='h') bLay[i]+="</a>&nbsp;&nbsp;";
		if (type=='v') bLay[i]+="</a></div>";
	}
	//end SAVE THIS
	
	//start EMAIL THIS
	if (etT) {
		if (type=='v') bLay[i]+="<div>";
		bLay[i]+="<A HREF=\"#\" ONCLICK=\"return(ET());\" onMouseOver=\"return(ETMouseOver());\" onMouseOut=\"return(ETMouseOut());\">";
		bLay[i]+="<IMG src=\""+eIconImg+"\" width=\""+eIconWidth+"\" height=\""+iconHeight+"\" border=\"0\" alt=\""+altET+"\" title=\""+altET+"\">";
		if (text) bLay[i]+="<IMG src=\""+eTextImg+"\" width=\""+eTextWidth+"\" height=\""+iconHeight+"\" border=\"0\" alt=\""+altET+"\" title=\""+altET+"\">";
		if (type=='h') bLay[i]+="</a>&nbsp;&nbsp;";
		if (type=='v') bLay[i]+="</a></div>";		
	}
	//end EMAIL THIS
	
	//start PRINT THIS
	if (ptT) {
		if (type=='v') bLay[i]+="<div>";
		bLay[i]+="<A HREF=\"#\" ONCLICK=\"return(PT());\" onMouseOver=\"return(PTMouseOver());\" onMouseOut=\"return(PTMouseOut());\">";
		bLay[i]+="<IMG src=\""+pIconImg+"\" width=\""+pIconWidth+"\" height=\""+iconHeight+"\" border=\"0\" alt=\""+altPT+"\" title=\""+altPT+"\">";
		if (text) bLay[i]+="<IMG src=\""+pTextImg+"\" width=\""+pTextWidth+"\" height=\""+iconHeight+"\" border=\"0\" alt=\""+altPT+"\" title=\""+altPT+"\">";
		if (type=='h') bLay[i]+="</a>&nbsp;&nbsp;";
		if (type=='v') bLay[i]+="</a></div>";
	}
	//end PRINT THIS
	
	//start MOST POPULAR
	if (mpT) {
		if (type=='v') bLay[i]+="<div>";
		bLay[i]+="<A HREF=\"#\" ONCLICK=\"return(MP());\" onMouseOver=\"return(MPMouseOver());\" onMouseOut=\"return(MPMouseOut());\">";
		bLay[i]+="<IMG src=\""+mpIconImg+"\" width=\""+mpIconWidth+"\" height=\""+iconHeight+"\" border=\"0\" alt=\""+altMP+"\" title=\""+altMP+"\">";
		if (text) bLay[i]+="<IMG src=\""+mpTextImg+"\" width=\""+mpTextWidth+"\" height=\""+iconHeight+"\" border=\"0\" alt=\""+altMP+"\" title=\""+altMP+"\">";
		if (type=='h') bLay[i]+="</a>&nbsp;&nbsp;";
		if (type=='v') bLay[i]+="</a></div>";
	}
	//end MOST POPULAR
	
	document.write(bLay[i]);
	if (type=='h') document.write('</nobr>');
	
	//start spons bottom
	if (spons) {
		if (sponLoc=="top") {
			document.write('</td></tr></table>');	
		}
		else if (type=='h') {
			document.write('</td><td valign="top">');
			if (sponIntro && sponIntro != ' ') document.write('<font size="1" face="Arial,Helvetica" color="#000000">'+sponIntro+'</font><br>');
			eval(sponTagTop);
			document.write('</td></tr></table>');	
		}
		else {
			document.write('<div><table><tr><td> ');
			if (sponIntro && sponIntro != ' ') document.write('<font size="1" face="Arial,Helvetica" color="#000000">'+sponIntro+'</font><br> ');
			eval(sponTagTop);
			document.write('</td></tr></table></div>');
		}
	}
	//end spons bottom
}
function initBtn() {
	var a=initBtn.arguments;
	stT=a[0]; etT=a[1]; ptT=a[2]; mpT=a[3]
	textWrap=a[4]; iCol=a[5]; tCol=a[6];
}
function initSponsor() {
	var a=initSponsor.arguments;
	spons=a[0]; sponLoc=a[1]; sponIntro=a[2]; sponCol=a[3]; sponTagTop=a[4]; sponTagBot=a[5]; sponFunc=a[6];
}
function initAlt(save,email,print,mostpopular) {
	altST = (save) ? "Save a link to this article and return to it at www.savethis.com":"";
	altET = (email) ? "Email a link to this article":"";
	altPT = (print) ? "Printer-friendly version of this article":"";
	altMP = (mostpopular) ? "View a list of the most popular articles on our site":"";
}
function btnDone() {
	for (i=0;i<sponLay.length;i++) {
		if (sponLay[i]) eval(sponLay[i]);
	}
}
function getClickURL() {
	if (self.clickURL) return clickURL;
	return document.location.href;
}
function getClickTitle() {
	if (self.clickTitle) return clickTitle;
	return document.title;
}
function getClickExpire() {
	if (self.clickExpire) return clickExpire; 
	return "";
}

window.onresize = function () {
    for (var i=0; i<document.links.length; i++) {
        document.links[i].onclick = document.links[i].onclick;
    }
}

//Init param
if (!custom) {
	initBtn(1,1,1,1,0,'000099','000099');
	initSponsor(0,'right','Sponsored by','000000',' ',' ',' ');
	initAlt(1,1,1,1);
	eval(sponFunc);
	drawBtn('H',1);
}
