	var cnnTrackPath;
	var isCanonicalPresent = false;
	var isInternational = false;
	var isFortune = false;
	var isMoney = false;
	var isGallery = false;
	var usePath = false;
	var cnnSection = '';
	var cbSection = ''; /* What cnnSection was used for except cnnSection is used by other JS files so i can't manipulate too much */
	var cbDomain = 'cnn.com';
	

	/*
	 * Function copied from jsmd version.
	 */
	function cb_getCBSection () {
	    var pathname = location.pathname,
	        domain = location.hostname;

	    var path_array = pathname.replace(/\/\d{4}\/\d{2}\/\d{2}/g, "");
	    var path_array = pathname.replace(/\/gallery/g, "");
	    path_array = path_array.replace(/\/\d+\//g, "/").substring(1).split("/");
	    if (pathname.match(/\/galleries\/\w+.htm\w*/)) path_array = pathname.replace(/.htm\w*/, "").substring(1).split("/");
	    if (pathname.match(/\d{4}\/\d{2}\/\d{2}\/leadership\//) ||
	        pathname.match(/\d{4}\/\d{2}\/\d{2}\/leadership-post\//)) {
	        pathname = pathname.replace("leadership-post", "leadership");
	        path_array = pathname.replace(/\/\d{4}\/\d{2}\/\d{2}/g, "").substring(1).split("/")
	    } else if (pathname.match(/video\/leadership/)) path_array = pathname.replace(/\/video/g, "").substring(1).split("/");
	    if (pathname.match(/data\/stocks-we-love/)) path_array = pathname.replace("/data/stocks-we-love/", "/investing/stocks-we-love/").substring(1).split("/");
	    var mnySection = new Array;
	    var mnySectionTemp = new Array;
	    mnySection = {
	        "": ["Home", "CNNMoney"],
	        news: ["Business News", "News"],
	        galleries: ["Business News", "News"],
	        data: ["Markets", "Markets"],
	        markets: ["Investing", "Investing"],
	        media: ["Media", "Media"],
	        luxury: ["Luxury", "Luxury"],
	        investing: ["Investing", "Investing"],
	        quote: ["Markets", "Stock Quotes"],
	        technology: ["Technology", "Technology"],
	        pf: ["Personal Finance", "Personal Finance"],
	        yourhome: ["Personal Finance", "Personal Finance"],
	        autos: ["Personal Finance", "Autos"],
	        real_estate: ["Personal Finance", "Real Estate"],
	        lifestyle: ["Personal Finance", "Lifestyle"],
	        retirement: ["Personal Finance", "Retirement"],
	        "college-101": ["Personal Finance", "College"],
	        smallbusiness: ["Small Business", "Small Business"],
	        leadership: ["Personal Finance", "Fortune Management Blog"],
	        termsheet: ["Investing", "Fortune Finance Blogs"],
	        services: ["Services", "Services"]
	    }[path_array[0]];
	    if (!mnySection) mnySection = ["Other", ""];
	    mnySectionTemp = mnySection;
	    if (path_array[1]) {
	        mnySection = {
	            international: ["Business News", "International"],
	            world: ["Business News", "International"],
	            companies: ["Business News", "Companies"],
	            economy: ["Business News", "Economy"],
	            assignment_detroit: ["Business News", "Economy"],
	            fortune: ["Business News", "News"],
	            bing: ["Business News", "News"],
	            news: ["Business News", "News"],
	            markets: ["Investing", "Investing"],
	            "fear-and-greed": ["Investing", "Investing"],
	            autos: ["Personal Finance", "Autos"],
	            college: ["Personal Finance", "College"],
	            insurance: ["Personal Finance", "Insurance"],
	            retirement: ["Personal Finance", "Retirement"],
	            taxes: ["Personal Finance", "Taxes"],
	            jobs: ["Personal Finance", "Jobs"],
	            funds: ["Personal Finance", "Mutual Funds"],
	            investing: ["Investing", "Investing"],
	            moneymag: ["Personal Finance", "Personal Finance"],
	            pf: ["Personal Finance", "Personal Finance"],
	            luxury: ["Luxury", "Luxury"],
	            media: ["Media", "Media"],
	            real_estate: ["Personal Finance", "Real Estate"],
	            fsb: ["Small Business", "Small Business"],
	            smallbusiness: ["Small Business", "Small Business"],
	            smbusiness: ["Small Business", "Small Business"],
	            enterprise: ["Technology", "Enterprise"],
	            innovation: ["Technology", "Innovation"],
	            mobile: ["Technology", "Mobile"],
	            personaltech: ["Technology", "Personal Tech"],
	            security: ["Technology", "Security"],
	            social: ["Technology", "Social"],
	            startups: ["Technology", "Startups"],
	            biz2: ["Technology", "Technology"],
	            business2: ["Technology", "Technology"],
	            technology: ["Technology", "Technology"],
	            tech: ["Technology", "Technology"]
	        }[path_array[1]];
	        if (!mnySection) mnySection = mnySectionTemp;
	        mnySectionTemp = mnySection;
	        if (path_array[0] && path_array[1] != "fear-and-greed") {
	            mnySection = {
	                data: ["Markets", "Markets"]
	            }[path_array[0]];
	            if (!mnySection) mnySection = mnySectionTemp
	        }
	        mnySectionTemp = mnySection;
	        if (pathname.match("^/tools/")) mnySection = {
	            homepricedata: ["Personal Finance", "Real Estate"],
	            mortgagecalc: ["Personal Finance", "Real Estate"],
	            houseafford: ["Personal Finance", "Real Estate"],
	            saveyoung: ["Personal Finance", "Retirement"],
	            savingscalc: ["Personal Finance", "Retirement"],
	            annuities: ["Personal Finance", "Retirement"],
	            retireyoung: ["Personal Finance", "Retirement"],
	            networth_ageincome: ["Personal Finance", "Retirement"],
	            retirementneed: ["Personal Finance", "Retirement"],
	            collegecost: ["Personal Finance", "College"],
	            studentloan: ["Personal Finance", "College"],
	            taxreturncalc: ["Personal Finance", "Taxes"],
	            costofliving: ["Personal Finance", "Personal Finance"],
	            debtplanner: ["Personal Finance", "Personal Finance"],
	            networth: ["Personal Finance", "Personal Finance"],
	            prioritize: ["Personal Finance", "Personal Finance"],
	            assetallocwizard: ["Personal Finance", "Personal Finance"],
	            millionaire: ["Personal Finance", "Personal Finance"],
	            moneygrow: ["Personal Finance", "Personal Finance"]
	        }[path_array[1]]
	    }
	    if (!mnySection) mnySection = mnySectionTemp;
	    mnySectionTemp = mnySection;
	    if (path_array[2]) mnySection = {
	        bestcompanies: ["Business News", "Companies"],
	        "best-companies": ["Business News", "Companies"],
	        fortune500: ["Business News", "Companies"],
	        fortunefastestgrowing: ["Business News", "Companies"],
	        global500: ["Business News", "Companies"],
	        mostadmired: ["Business News", "Companies"],
	        "most-admired": ["Business News", "Companies"],
	        mostpowerfulwomen: ["Business News", "Companies"],
	        steve_jobs: ["Business News", "Companies"],
	        assignment_detroit: ["Business News", "Economy"],
	        crisiswallstreet: ["Business News", "Economy"],
	        fed: ["Business News", "Economy"],
	        fixing_crisis: ["Business News", "Economy"],
	        "obama-economy": ["Business News", "Economy"],
	        money101: ["Personal Finance", "Money 101"],
	        bplive: ["Personal Finance", "Real Estate"],
	        moneymag_realestate: ["Personal Finance", "Real Estate"],
	        bpretire: ["Personal Finance", "Retirement"],
	        "retirement-guide": ["Personal Finance", "Retirement"],
	        "retirement-need": ["Personal Finance", "Retirement"],
	        fortune_investing: ["Investing", "Investing"],
	        healthcare: ["Personal Finance", "Insurance"],
	        holiday_money: ["Personal Finance", "Lifestyle"],
	        jobs: ["Personal Finance", "Jobs"],
	        bestjobs: ["Personal Finance", "Jobs"],
	        companies: ["Business News", "Companies"],
	        economy: ["Business News", "Economy"],
	        international: ["Business News", "International"],
	        world: ["Business News", "International"],
	        college: ["Personal Finance", "College"],
	        insurance: ["Personal Finance", "Insurance"],
	        taxes: ["Personal Finance", "Taxes"],
	        funds: ["Personal Finance", "Mutual Funds"],
	        investing: ["Investing", "Investing"],
	        enterprise: ["Technology", "Enterprise"],
	        innovation: ["Technology", "Innovation"],
	        mobile: ["Technology", "Mobile"],
	        personaltech: ["Technology", "Personal Tech"],
	        security: ["Technology", "Security"],
	        social: ["Technology", "Social"],
	        startups: ["Technology", "Startups"]
	    }[path_array[2]];
	    if (!mnySection) mnySection = mnySectionTemp;
	    mnySectionTemp = mnySection;
	    mnySection = {
	        "tech.fortune.cnn.com": ["Technology", "Fortune Tech Blogs"],
	        "wallstreet.blogs.fortune.cnn.com": ["Technology", "Fortune Tech Blogs"],
	        "cnnmoneytech.tumblr.com": ["Technology", "Tech_Tumblr"],
	        "finance.fortune.cnn.com": ["Investing", "Fortune Finance Blogs"],
	        "stanleybing.blogs.fortune.cnn.com": ["Business News", "News"],
	        "marketsentiment.money.cnn.com": ["Markets", "Markets"],
	        "management.fortune.cnn.com": ["Personal Finance", "Fortune Management Blog"],
	        "moremoney.blogs.money.cnn.com": ["Personal Finance", "Personal Finance"],
	        "helpdesk.blogs.money.cnn.com": ["Personal Finance", "Personal Finance"],
	        "thewheeldeal.blogs.fortune.cnn.com": ["Personal Finance", "Autos"],
	        "smallbusiness.blogs.cnnmoney.cnn.com": ["Small Business",
	            "Small Business"
	        ],
	        "economy.money.cnn.com": ["Business News", "Economy"],
	        "buzz.money.cnn.com": ["Investing", "Investing"]
	    }[domain];
	    if (!mnySection) mnySection = mnySectionTemp;
	    if (pathname == "/magazines/fortune/") mnySection = ["Home", "Fortune"];
	    if (pathname == "/magazines/moneymag/") mnySection = ["Home", "Money Magazine"];
	    if (pathname == "/news/corrections/") mnySection = ["Other", ""];
	    if (pathname == "/galleries/" || pathname == "/gallery/") mnySection = ["Other", ""];
	    return mnySection
	};



	//get title
	var cnnTitle = document.title;

	/* check for international cookie
	 * Intl Edition = 'edition' || 'mexico' */
	if ((typeof getCookie == 'function' &&  getCookie('SelectedEdition') !== 'www') || (typeof cnnm_getCookie == 'function' && cnnm_getCookie('SelectedEdition') !== 'www')) 
	{
		isInternational = true;
	}
	
	//grab the content's url. 
	var cnnLinkTags = document.getElementsByTagName("head")[0].getElementsByTagName("link");
	for (var linkTagCount = 0; linkTagCount < cnnLinkTags.length; linkTagCount++) 
	{
		try 
		{
			if (cnnLinkTags[linkTagCount].getAttribute("rel") == "canonical") 
			{
				isCanonicalPresent = true;
				cnnTrackPath = cnnLinkTags[linkTagCount].getAttribute("href");
				break;
			}
		}
		catch(e){}
	}
	
	
	//if no canonical is available, the use the url in the browser
	if ( !isCanonicalPresent ) 
	{
		cnnTrackPath = window.location.href;
	}
	
	
//handle galleries
if (cnnTrackPath.match("galleries") || cnnTrackPath.match("gallery")) {
    isGallery = usePath = true;
    var metas = document.getElementsByTagName('meta');
    for (i = 0; i < metas.length; i++) {
        if (metas[i].getAttribute("name") == "title") {
            cnnTitle = metas[i].getAttribute("content");
            break;
        }
    }
    var galleryUrlMatch = /.*\//;
    cnnTrackPath = cnnTrackPath.replace("http://money.cnn.com", "");
    cnnTrackPath = cnnTrackPath.match(galleryUrlMatch)[0];
}
	
	
	var cnnMeta = cb_getCBSection();
	cnnSection = cnnMeta[1];
	
	//handle sourced fortune content
	if (typeof cnnSource != 'undefined') 
	{
		if (cnnSource=="FORT") 
		{
			isFortune = true;
		}

	    if (cnnSource == "MONEY") {
	        isMoney = true;
	    }
	}

	
	//internation homepage support
	if((cnnTrackPath == 'http://money.cnn.com/') && isInternational) 
	{
		cnnTrackPath = '/intledition';
		cnnSection = 'International Homepage';
	    usePath = true;
	}
	
	
	var cnnByline = '';
	var cnnAuthor;
	if (typeof cnnAuthor != 'undefined') {cnnByline=cnnAuthor;}
	
	
	/* Final set for definition of cbSection to cnnSection value before we use in config */
	cbSection = cnnSection;
	
	/* Strip out the domain for non-homepage pages */
	if(cnnTrackPath != "http://money.cnn.com/")
	{
		cnnTrackPath = cnnTrackPath.replace('http://money.cnn.com','');
	} else {
		cbSection = 'Homepage';
		if (isInternational) {
			cbSection = "International Homepage";
		}
	}

	/* All CNN$ pages should have CNNMoney section since our dashboard is combined with CNN this is our identifier for all our content */
	cbSection = "CNNMoney,CNNM-" + cbSection;


	if(window.location.hostname.match(/.*((ref)|(dev)|(stage)|(staging)|(train)|(preview)|(sections.money.cnn.com)|(private)|(localhost)).*/g)) {
		cbDomain = 'ref.cnn.com'
	} else if (isInternational) {
		cbDomain = 'edition.cnn.com';	
	}


	/** CONFIGURATION START **/	
	var _sf_async_config = {
		uid : 37612,
		domain : cbDomain,
		useCanonical : isCanonicalPresent, 
		title : cnnTitle,
		sections : cbSection,
		authors : cnnByline
	};
	
	//if no canonical present, then pass the path
	if (!isCanonicalPresent || usePath) 
	{
	    _sf_async_config.path = cnnTrackPath;
	}
	
	
	/** CONFIGURATION END **/
	
	(function(){
		function loadChartbeat() {
			window._sf_endpt=(new Date()).getTime();
			var e = document.createElement('script');
			e.setAttribute('language', 'javascript');
			e.setAttribute('type', 'text/javascript');
			e.setAttribute('src', '//static.chartbeat.com/js/chartbeat_video.js');
			document.body.appendChild(e);
		}
		var oldonload = window.onload;
		window.onload = (typeof window.onload != 'function') ?
		loadChartbeat : function() { oldonload(); loadChartbeat(); };
	})();