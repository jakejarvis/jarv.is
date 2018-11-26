var thisDomain = document.domain;
	urlPrefix = 'http://money.cnn.com';
if (thisDomain == 'moneypreview.turner.com' || thisDomain == 'money.cnn.com' || thisDomain == 'beta.money.cnn.com')
	urlPrefix = '';

var R = new String(document.referrer);


var mypath = location.pathname.slice(0,location.pathname.lastIndexOf('/'));
if(R.match('/globalforum/')){
	globalforum=1;
	if (typeof gfbranded != 'undefined'){
		if (gfbranded == 1)
			globalforum=0;
	}
	document.cookie="feature=globalforum";
}	
else{
	if(R.match(mypath))	//for multipage stories and galleries
	{
		if(document.cookie.match("feature=globalforum"))
			globalforum=1;
		else
			globalforum=0;
	}
	else
		globalforum=0;
}
//start added by Eric 10-23-07
//start added by Eric 10-23-07
function getValues() {
	var returnArray = new Array();
	var values = document.location.href;
	if (!values || values == "") {
		values = document.location;	// IE3 needs this
		}
		values = values.substring(values.indexOf('?') + 1, values.length);
	var valueset = split('&', values);
	for (var i = 0; i < valueset.length; i++) {
		var thisValue = split('=', valueset[i]);
		returnArray[thisValue[0]] = thisValue[1];
	}
	return returnArray;
}
function split(splitOn, string) {
		var values = new Array();
		var begin = 0;
		var end = 0;
		var splitLen = splitOn.length;
		var i = 0;
		while (end != string.length) {
			end = string.indexOf(splitOn, begin);
			if (end == -1)
				end = string.length;
			values[i++] = string.substring(begin, end);
			begin = end + splitLen;
		}
		values.length = i;	// for Netscape 2
		return values;
}
var values = getValues();
if (values['globalforum']) {
	globalforum=1;
	document.cookie="feature=globalforum";
}
//end added by Eric 10-23-07
//end added by Eric 10-23-07

//alert('is GF: '+globalforum);
if(globalforum==1 && (location.pathname.match('.htm$') || location.pathname.match('^/galleries/')))
{
		document.write('<link rel="stylesheet" href="/.element/ssi/css/1.0/specials/globalForum.css" type="text/css">');
		document.write("<div id='topBanner'>");
		document.write("<div id='globalBanner'>");
		document.write("<div id='banner_eyebrow'>");
		document.write("<div id='banner_eyebrow_right'>");
		document.write("<a href='http://subs.timeinc.net/CampaignHandler/FOnb?source_id=3'><span class='arrow'>&raquo;</span>&nbsp;Subscribe&nbsp;to&nbsp;Fortune</a><a href='http://subs.timeinc.net/CampaignHandler/FOnb?source_id=10'><span class='arrow'>&raquo;</span>&nbsp;Free&nbsp;Trial</a>");
		document.write("</div>");
		document.write("<a href='/'><span class='arrow'>&raquo;</span>&nbsp;CNNMoney</a>");
		document.write("<a href='/magazines/fortune/'><span class='arrow'>&raquo;</span>&nbsp;Fortune&nbsp;Magazine</a>");
		document.write("<a href='/magazines/fortune/fortuneintl/'><span class='arrow'>&raquo;</span>&nbsp;Fortune&nbsp;International</a>");
		document.write("</div>");
		document.write("<div id='banner_main'>");
		document.write("<div id='banner_right'>");
		document.write("<SCR" + "IPT LANGUAGE='JavaScript' src='http://i.l.cnn.net/money/.element/ssi/javascript/1.0/search_form.js' type='text/javascript'></script>");
		document.write("<form method='get' onsubmit='resultsPage(this);' name='searchForm' action='http://search.money.cnn.com/pages/search.jsp'><input type='hidden' name='magazine' value='web'><input type='hidden' name='source' value='money'><input type='hidden' name='query' value=''><input type='hidden' name='invocationType' value='search%2Ftop'><input type='text' id='search_box' name='QueryText' value='' size='31' maxlength='50' class='cnnSearchTxtField' style='width:186px;' onblur='fillForm2(this.value);'><input type='image' name='search' value='Search' id='search_button' SRC='http://i.l.cnn.net/money/.element/img/1.0/sections/mag/fortune/globalforum/search_button.jpg' ALT='Submit button'/></form>");
		document.write("</div>");
		document.write("<a href='/magazines/fortune/globalforum/2007'><img src='http://i.l.cnn.net/money/.element/img/1.0/sections/mag/fortune/globalforum/globalforumlogo.jpg' width='305' height='94' border=0 alt='Fortune Global Forum'/></a>");
		document.write("</div>");
		document.write("</div>");
		document.write("<div id='top_nav'>");
		document.write("<a id='navHome' href='/magazines/fortune/globalforum/2007'>Home</a>");
		document.write("<a id='navAbout' href='http://www.timeinc.net/fortune/conferences/global2007/global_home.html' target='_blank'>About The Conference</a>");
		document.write("<a id='navVideos' href='/video/globalforum/'>Videos</a>");
		document.write("<a id='navBlog' href='http://globalforum.blogs.fortune.com/'>Global Forum Blog</a>");
		document.write("<a id='navDragonBlog' href='http://chasingthedragon.blogs.fortune.com/'>Chasing the Dragon Blog</a>");
		document.write("<a id='navElephantBlog' href='http://ridingtheelephant.blogs.fortune.com/'>Riding the Elephant Blog</a>");
		document.write("<a id='navNews' href='/'>News</a>");
		document.write("<a id='navGlobal500' href='/magazines/fortune/global500/'>Fortune Global 500</a>");
		document.write("</div>");
		document.write("</div>");
}

// redirect globalforum gallery jump pages
if ( (globalforum==1)&&(location.pathname.match('jump.html')) ) {
	location.replace('/magazines/fortune/globalforum/2007/');
}

