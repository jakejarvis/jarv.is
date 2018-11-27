//CNN Money AdFuel Modules
//Deployed: 2018-11-17 10:35:17

////////////////////////////////////////////
//AA IndexExchange Wrapper 1.1
////////////////////////////////////////////

(function createAdFuelIndexExchangeWrapperModule() {
    // Added CNN Espanol filter when domestic user is detected
    'use strict';
    var MODULE_NAME = 'Index Exchange Wrapper';
    var MODULE_VERSION = 'v1.1.5';

    var scriptLoaded = false;
    var countryCode = (readCookie('CG') ? readCookie('CG').substr(0, 2) : '') || (readCookie('countryCode') ? readCookie('countryCode').substr(0, 2) : '');
    var noop = function () {};

    var scriptMap = {
        '^(.*\\.)?(www\\.)?cnn\\.com': {
            intl: '186370-96070407099023',
            dom: '186948-60896576130421'
        },
        '^(.*\\.)?edition\\.cnn\\.com': '186370-129055748395673',
        '^(.*\\.)?us\\.cnn\\.com': '186370-96070407099023',
        '^(.*\\.)?money\\.cnn\\.com': {
            intl: '186370-144448918822171',
            dom: '186948-10319041752160'
        },
        '^(.*\\.)?(cnne-test|cnnespanol)\\.cnn\\.com': {
            intl: '186370-263196174718504',
            dom: ''
        },
        '^(.*\\.)?arabic\\.cnn\\.com': '186370-164240128263733',
        '^(.*\\.)?pga\\.com': '186948-65293251488212',
        '^(.*\\.)?rydercup\\.com': '186948-65293251488212',
        '^(.*\\.)?pga-events\\.com': '186948-65293251488212',
        '^(.*\\.)?teamcoco\\.com': '186948-58699267721861',
        '^(.*\\.)?eleague\\.com': '186948-12519779424234',
        '^(.*\\.)?nba.com': '186948-120271757110262',
        '^(.*\\.)?ncaa.com': '186948-8121571303204',
        '^(.*\\.)?adultswim.com': '186948-113674687777483',
    }

    var log =  (window.console && window.console.log) ? function (/* arguments */) {
        var args = ['[AdFuelModule - ' + MODULE_NAME + ' ' + MODULE_VERSION + ']'];
        args.push.apply(args, arguments);
        window.console.log.apply(window.console, args);
    } : noop;

    function readCookie(name) {
        var lsSupport = false;
        var data = '';
        // Check for native support
        if (localStorage) {
            lsSupport = true;
        }

        // No value supplied, return value
        if (typeof value === 'undefined') {
            // Get value
            if (lsSupport) { // Native support
                data = localStorage.getItem(name);
            }
            if (!lsSupport || data === null) { // Use cookie
                data = readTheCookie(name);
            }

            // Try to parse JSON...
            try {
                data = JSON.parse(data);
            } catch(e) { }

            return data;

        }
        /**
         * Returns contents of cookie
         * @param   {String}key The key or identifier for the store
         * @returns {String}    The contents of the cookie
         */
        function readTheCookie(key) {
            if (!document.cookie) {
                // there is no cookie, so go no further
                return '';
            } else { // there is a cookie
                var ca = document.cookie.split(';');
                var nameEQ = key + '=';
                for (var i = 0; i < ca.length; i++) {
                    var c = ca[i];
                    while (c.charAt(0) === ' ') {
                        //delete spaces
                        c = c.substring(1, c.length);
                    }
                    if (c.indexOf(nameEQ) === 0) {
                        return c.substring(nameEQ.length, c.length);
                    }
                }
                return '';
            }
        }
    }

    function includeWrapper(scriptUrl) {
        if (!scriptLoaded) {
            log('Script URL: ', scriptUrl);
            // log('Initializing Module...');
            scriptLoaded = true;
            var a = document,
                b = a.createElement('script'),
                c = a.getElementsByTagName('script')[0]
            b.type = 'text/javascript';
            b.async = true;
            b.src = scriptUrl;
            c.parentNode.insertBefore(b, c);
        }
    }

    function setGeoTargeting(forceIntl) {
        // console.log('Force International: ', forceIntl ? 'yes' : 'no')
        function setGeoTarget() {
            if (countryCode !== 'US' && countryCode !== 'CA' && countryCode !== '') {
                // log('Setting IX Geo Target: EU');
                window.AdFuel.addPageLevelTarget('iom_geo', 'EU')
            }else if(forceIntl) {
                // log('Setting IX Geo Target: EU');
                window.AdFuel.addPageLevelTarget('iom_geo', 'EU')
            }else{
                // log('Setting IX Geo Target: US');
                window.AdFuel.addPageLevelTarget('iom_geo', 'US')
            }
        }
        window.googletag.cmd.push(setGeoTarget)
    }

    function registerModuleWithAdFuel() {
        // log('Registering Module...');
        var forceIntl = false;
        if (window.location.hostname.search(/^(edition|cnnespanol|arabic|cnne\-test)/) >= 0) forceIntl = true;
        // log('Setting Geo Targeting...', forceIntl);
        setGeoTargeting(forceIntl);
        window.AdFuel.registerModule(MODULE_NAME, {}) || { addMetric: function () {} };
    }

    function init() {
        var scriptUrl = null;
        Object.keys(scriptMap).forEach(function (regex) {
            var test = new RegExp(regex);
            var countryCode = readCookie('countryCode');
            var selectedEdition = readCookie('selectedEdition');
            var cnnRegex = new RegExp('/^(.*)?(edition|www|www\-m|us|us\-m|edition\-m)\.cnn\.com$/');
            var moneyRegex = new RegExp('/^(.*)?money\.cnn\.com$/');
            var espanolRegex = new RegExp('/^(.*)?(cnnespanol||cnne\-test)\.cnn\.com$/');
            if (window.location.hostname.search(test) === 0) {
                if (typeof scriptMap[regex] === 'string') {
                    scriptUrl = '//js-sec.indexww.com/ht/p/' + scriptMap[regex] + '.js';
                } else {
                    if (window.location.hostname.search(cnnRegex) &&
                        countryCode !== 'US' &&
                        countryCode !== 'CA' &&
                        countryCode !== '') {
                        scriptUrl = '//js-sec.indexww.com/ht/p/' + scriptMap[regex].intl + '.js';
                    } else if (window.location.hostname.search(espanolRegex) &&
                        countryCode !== 'US' &&
                        countryCode !== 'CA') {
                        if (countryCode === '' || countryCode === null){
                            log('Espanol detected but no country code detected.');
                            log('Defaulting to INTL');
                        }
                        scriptUrl = '//js-sec.indexww.com/ht/p/' + scriptMap[regex].intl + '.js';
                    } else if (window.location.hostname.search(moneyRegex) &&
                        selectedEdition === 'edition') {
                        scriptUrl = '//js-sec.indexww.com/ht/p/' + scriptMap[regex].intl + '.js';
                    } else {
                        scriptUrl = '//js-sec.indexww.com/ht/p/' + scriptMap[regex].dom + '.js';
                    }
                }
            }
        });
        if (scriptUrl !== null) includeWrapper(scriptUrl);
        else log('Country [' + (countryCode || 'undefined') + '] and/or Hostname [' + window.location.hostname + '] is invalid.');
        if (window.AdFuel && window.AdFuel.cmd) {
            window.AdFuel.cmd.push(registerModuleWithAdFuel);
        }else if (window.AdFuel) {
            //AdFuel loaded first
            registerModuleWithAdFuel();
        } else {
            //wait for AdFuel to load
            if (document.addEventListener) {
                document.addEventListener('AdFuelCreated', registerModuleWithAdFuel, true);
            } else if (document.attachEvent) {
                document.attachEvent('onAdFuelCreated', registerModuleWithAdFuel);
            }
        }
    }

    init();
})();

////////////////////////////////////////////
//AB Criteo 800ms 1.3
////////////////////////////////////////////

/*!
  - Fix for multiple requests
  - Addition of CNNB Ad unit to mapping
*/

(function createAdFuelCriteoModule() {

    window.Criteo = window.Criteo || {};
    window.Criteo.events = window.Criteo.events || [];

    var MODULE_NAME = 'Criteo';
    var MODULE_VERSION = 'v1.3.2';

    var metricApi;
    var objectProto = Object.prototype;
    var toString = objectProto.toString;
    var scriptLoaded = false;
    /**
     * isMobile.js v0.4.1
     *
     * A simple library to detect Apple phones and tablets,
     * Android phones and tablets, other mobile devices (like blackberry, mini-opera and windows phone),
     * and any kind of seven inch device, via user agent sniffing.
     *
     * @author: Kai Mallea (kmallea@gmail.com)
     *
     * @license: http://creativecommons.org/publicdomain/zero/1.0/
     */
    var apple_phone = /iPhone/i,
        apple_ipod = /iPod/i,
        apple_tablet = /iPad/i,
        android_phone = /(?=.*\bAndroid\b)(?=.*\bMobile\b)/i, // Match 'Android' AND 'Mobile'
        android_tablet = /Android/i,
        amazon_phone = /(?=.*\bAndroid\b)(?=.*\bSD4930UR\b)/i,
        amazon_tablet = /(?=.*\bAndroid\b)(?=.*\b(?:KFOT|KFTT|KFJWI|KFJWA|KFSOWI|KFTHWI|KFTHWA|KFAPWI|KFAPWA|KFARWI|KFASWI|KFSAWI|KFSAWA)\b)/i,
        windows_phone = /Windows Phone/i,
        windows_tablet = /(?=.*\bWindows\b)(?=.*\bARM\b)/i, // Match 'Windows' AND 'ARM'
        other_blackberry = /BlackBerry/i,
        other_blackberry_10 = /BB10/i,
        other_opera = /Opera Mini/i,
        other_chrome = /(CriOS|Chrome)(?=.*\bMobile\b)/i,
        other_firefox = /(?=.*\bFirefox\b)(?=.*\bMobile\b)/i, // Match 'Firefox' AND 'Mobile'
        seven_inch = new RegExp(
            '(?:' + // Non-capturing group
            'Nexus 7' + // Nexus 7
            '|' + // OR
            'BNTV250' + // B&N Nook Tablet 7 inch
            '|' + // OR
            'Kindle Fire' + // Kindle Fire
            '|' + // OR
            'Silk' + // Kindle Fire, Silk Accelerated
            '|' + // OR
            'GT-P1000' + // Galaxy Tab 7 inch
            ')', // End non-capturing group
            'i'); // Case-insensitive matching

    var match = function (regex, userAgent) {
        return regex.test(userAgent);
    };

    var IsMobileClass = function (userAgent) {
        var ua = userAgent || navigator.userAgent;

        // Facebook mobile app's integrated browser adds a bunch of strings that
        // match everything. Strip it out if it exists.
        var tmp = ua.split('[FBAN');
        if (typeof tmp[1] !== 'undefined') {
            ua = tmp[0];
        }

        // Twitter mobile app's integrated browser on iPad adds a "Twitter for
        // iPhone" string. Same probable happens on other tablet platforms.
        // This will confuse detection so strip it out if it exists.
        tmp = ua.split('Twitter');
        if (typeof tmp[1] !== 'undefined') {
            ua = tmp[0];
        }

        this.apple = {
            phone: match(apple_phone, ua),
            ipod: match(apple_ipod, ua),
            tablet: !match(apple_phone, ua) && match(apple_tablet, ua),
            device: match(apple_phone, ua) || match(apple_ipod, ua) || match(apple_tablet, ua)
        };
        this.amazon = {
            phone: match(amazon_phone, ua),
            tablet: !match(amazon_phone, ua) && match(amazon_tablet, ua),
            device: match(amazon_phone, ua) || match(amazon_tablet, ua)
        };
        this.android = {
            phone: match(amazon_phone, ua) || match(android_phone, ua),
            tablet: !match(amazon_phone, ua) && !match(android_phone, ua) && (match(amazon_tablet, ua) || match(android_tablet, ua)),
            device: match(amazon_phone, ua) || match(amazon_tablet, ua) || match(android_phone, ua) || match(android_tablet, ua)
        };
        this.windows = {
            phone: match(windows_phone, ua),
            tablet: match(windows_tablet, ua),
            device: match(windows_phone, ua) || match(windows_tablet, ua)
        };
        this.other = {
            blackberry: match(other_blackberry, ua),
            blackberry10: match(other_blackberry_10, ua),
            opera: match(other_opera, ua),
            firefox: match(other_firefox, ua),
            chrome: match(other_chrome, ua),
            device: match(other_blackberry, ua) || match(other_blackberry_10, ua) || match(other_opera, ua) || match(other_firefox, ua) || match(other_chrome, ua)
        };
        this.seven_inch = match(seven_inch, ua);
        this.any = this.apple.device || this.android.device || this.windows.device || this.other.device || this.seven_inch;

        // excludes 'other' devices and ipods, targeting touchscreen phones
        this.phone = this.apple.phone || this.android.phone || this.windows.phone;

        // excludes 7 inch devices, classifying as phone or tablet is left to the user
        this.tablet = this.apple.tablet || this.android.tablet || this.windows.tablet;

        if (typeof window === 'undefined') {
            return this;
        }
    };

    var instantiate = function () {
        var IM = new IsMobileClass();
        IM.Class = IsMobileClass;
        return IM;
    };

    var isMobile = instantiate();

    function isFunction(object) {
        return toString.call(object) === '[object Function]';
    }

    function isObject(object) {
        var type = typeof object;
        return type === 'function' || type === 'object' && !!object;
    }

    function getURLParam(name) {
        name = name.replace(/[\[]/, '\\\[').replace(/[\]]/, '\\\]');
        var regexS = '[\\?&]' + name + '=([^&#]*)';
        var regex = new RegExp(regexS);
        if (document.location.search) {
            var results = regex.exec(document.location.search);
            if (results) {
                return results[1];
            } else {
                return '';
            }
        } else {
            return '';
        }
    }

    var log = function () {}; //noop
    var error = function () {}; //noop

    var MaxPlacements = 8;

    var MULTISIZE_FIRST   = 'F';
    var MULTISIZE_LARGEST = 'L';
    var MULTISIZE_ALL     = 'A';

    var DESKTOP_TIMEOUT = 800;
    var MOBILE_TIMEOUT = 750;

    var MultisizeMethod = MULTISIZE_LARGEST;

    MultisizeMethod = MultisizeMethod.toUpperCase();
    if (MultisizeMethod !== MULTISIZE_FIRST && MultisizeMethod !== MULTISIZE_LARGEST && MultisizeMethod !== MULTISIZE_ALL) {
        MultisizeMethod = MULTISIZE_LARGEST;
    }

    var zones_in_slot = {};
    var slot_max_area = {};

    var RequestedCriteoAdUnits = { placements: [] };
    var CriteoZones = {
        'CNN': {
            '160x600': 1047134,
            '300x250': 1047135,
            '300x600': 1047136,
            '728x90': 1047137,
            'HP_970x90': 1128528,
            'HP_970x250': 1128527,
            'ROS_970x90': 1047140,
            'ROS_970x250': 1047139,
            '320x50': 1047138
        },
        'NBA': {
            '320x50': 1083217,
            '728x90': 1083216,
            '970x90': 1083218,
            '300x250': 1083215
        },
        'NCAA': {
            '160x600': 1083227,
            '320x50': 1083230,
            '300x250': 1083228,
            '728x90': 1083229,
            '970x90': 1083231
        },
        'PGA': {
            '728x90': 1083239,
            '300x250': 1083237,
            '970x90': 1083242,
            '300x600': 1083238,
            '970x250': 1083241,
            '320x50': 1083240
        },
        'ELEAGUE': {
            '320x50': 1083245,
            '300x250': 1083243,
            '728x90': 1083244
        },
        'CNNMoney': {
            '728x90': 1083234,
            '970x90': 1083236,
            '970x250': 1083235,
            '300x250': 1083232,
            '300x600': 1083233
        },
        'CNNBusiness': {
            '728x90': 1302537,
            '970x90': 1302538,
            '970x250': 1302534,
            '300x250': 1302539,
            '300x600': 1302535
        },
        'AS': {
            '320x50': 1083225,
            '728x90': 1083224,
            '300x250': 1083223,
            '970x90': 1083226
        },
        'TBS/shows/conan': {
            '300x250': 1083219,
            '728x90': 1083220,
            '970x90': 1083222,
            '970x250': 1083221
        },
        'MOBILE': {
            'CNN': {
                '300x250': 1090825,
                '320x50': 1090883
            },
            'NBA': {
                '300x250': 1090830,
                '320x50': 1090884
            },
            'NCAA': {
                '300x250': 1090831,
                '320x50': 1090885
            },
            'PGA': {
                '300x250': 1090832,
                '320x50': 1090886
            },
            'ELEAGUE': {
                '300x250': 1090833,
                '320x50': 1090887
            },
            'CNNMoney': {
                '300x250': 1090834,
                '320x50': 1090834
            },
            'CNNBusiness': {
                '300x250': 1302536
            },
            'AS': {
                '300x250': 1090835,
                '320x50': 1090888
            },
            'TBS/shows/conan': {
                '300x250': 1090836
            }
        }
    }

    if (isObject(window.console) && isFunction(window.console.log) && getURLParam('debug') === 'true') {
        log = function (/* arguments */) {
            var args = ['[AdFuelModule - ' + MODULE_NAME + ' ' + MODULE_VERSION + ']'];
            args.push.apply(args, arguments);
            window.console.log.apply(window.console, args);
        };
        error = function () {
            var args = ['[AdFuelModule - ' + MODULE_NAME + ' ' + MODULE_VERSION + ']'];
            args.push.apply(args, arguments);
            window.console.error.apply(window.console, args);
        };
    }

    function includeCriteoLibrary() {
        if (!scriptLoaded) {
            log('Including Criteo Library...');
            scriptLoaded = true;

            var a = document,
                b = a.createElement('script'),
                c = a.getElementsByTagName('script')[0]
            b.type = 'text/javascript';
            b.async = true;
            b.src = '//static.criteo.net/js/ld/publishertag.js';
            c.parentNode.insertBefore(b, c);
        }
    }

    function getViewport() {
        var viewportWidth;
        var viewportHeight;
        if (typeof window.innerWidth !== 'undefined') {
            viewportWidth = window.innerWidth,
            viewportHeight = window.innerHeight;
        } else if (typeof document.documentElement !== 'undefined' && typeof document.documentElement.clientWidth !== 'undefined' && document.documentElement.clientWidth !== 0) {
            viewportWidth = document.documentElement.clientWidth,
            viewportHeight = document.documentElement.clientHeight;
        } else {
            viewportWidth = document.getElementsByTagName('body')[0].clientWidth,
            viewportHeight = document.getElementsByTagName('body')[0].clientHeight;
        }
        return [viewportWidth, viewportHeight];
    }

    function preQueueCallback(asset, callback) {
        var CriteoAdUnits = { 'placements': [] };
        for (var slotIndex = 0; slotIndex < asset.length; slotIndex++) {
            var slot = asset[slotIndex];
            if (slot.rktr_slot_id !== 'page') {
                var responsiveSizes = [];
                var browser = getViewport();
                var viewportChecked = false;
                var isValid = true;
                for (var viewportId = 0; viewportId < slot.responsive.length; viewportId++) {
                    var viewport = slot.responsive[viewportId];
                    if (!viewportChecked && viewport[0][0] < browser[0] && viewport[0][1] < browser[1]) {
                        viewportChecked = true;
                        responsiveSizes = viewport[1];
                        if (viewport[1][0] === 'suppress' || responsiveSizes === 'suppress') {
                            isValid = false;
                        }
                    }
                }
                if (isValid && responsiveSizes.length > 0) {
                    log('Setting Sizes To Responsive Sizes: ', responsiveSizes);
                    slot.sizes = responsiveSizes;
                } else if (!isValid) {
                    slot.sizes = [];
                }
                var slot_sizes = slot.sizes;
                var slotid = slot.rktr_slot_id;
                var adUnit = slot.rktr_ad_id;
                zones_in_slot[slotid] = [];
                slot_max_area[slotid] = 0;
                var siteAdUnit = adUnit.split('/')[0];
                if (isValid) {
                    if (CriteoZones.hasOwnProperty(siteAdUnit)) {
                        for (var index = 0; index < slot_sizes.length; index++) {
                            var sizeArray = slot_sizes[index];
                            var width = sizeArray[0] || null;
                            var height = sizeArray[1] || null;
                            var area = width !== null ? width * height : 0;
                            var size_name = width !== null ? width + 'x' + height : sizeArray.join('x');
                            var zoneid = CriteoZones[siteAdUnit][size_name] ? CriteoZones[siteAdUnit][size_name] : (CriteoZones[siteAdUnit]['ROS_' + size_name] ? CriteoZones[siteAdUnit]['ROS_' + size_name] : null);
                            if (siteAdUnit === 'CNN' && adUnit.indexOf('homepage') > 0) zoneid = CriteoZones[siteAdUnit]['HP_' + size_name] || zoneid;
                            if (['300x250', '320x50'].indexOf(size_name) >= 0 && isMobile.any) {
                                log('Using Mobile zoneId for size: ', size_name);
                                zoneid = CriteoZones['MOBILE'][siteAdUnit][size_name] || null;
                            }
                            if (zoneid !== null) {
                                slot_max_area[slotid] = area > slot_max_area[slotid] ? area : slot_max_area[slotid];
                                var data = {'slotid' : slotid, 'zoneid' : zoneid, 'width' : width, 'height' : height, 'area' : area};
                                if (zones_in_slot[slotid].indexOf(data) === -1) {
                                    log('Pushing data...', data);
                                    zones_in_slot[slotid].push(data);
                                } else {
                                    log('Skipping... Already exists...', data);
                                }
                            }
                        }
                    }
                }

            }
        }
        var count = 0;
        for (slotid in zones_in_slot) {
            if (zones_in_slot.hasOwnProperty(slotid)) {
                var zones = zones_in_slot[slotid];
                for (var i = 0; i < zones.length; i++) {
                    var zone = zones[i];
                    if (count >= MaxPlacements) break;
                    if (MultisizeMethod === MULTISIZE_LARGEST && zone.area !== slot_max_area[zone.slotid]) continue;
                    var placement = {'slotid' : slotid, 'zoneid' : zone.zoneid }
                    var exists = false;
                    for (var placementIndex = 0; placementIndex < CriteoAdUnits.placements.length; placementIndex++) {
                        if (CriteoAdUnits.placements[placementIndex].slotid === placement.slotid && CriteoAdUnits.placements[placementIndex].zoneid === placement.zoneid)
                            exists = true;
                    }
                    for (var requestedPlacementIndex = 0; requestedPlacementIndex < RequestedCriteoAdUnits.placements.length; requestedPlacementIndex++) {
                        if (RequestedCriteoAdUnits.placements[requestedPlacementIndex].slotid === placement.slotid && RequestedCriteoAdUnits.placements[requestedPlacementIndex].zoneid === placement.zoneid) {
                            exists = true;
                        }
                    }
                    log('Requested Ad Units: ', JSON.parse(JSON.stringify(RequestedCriteoAdUnits)));
                    if (!exists) {
                        log('Placement does not yet exist.  Adding to collection.', placement);
                        CriteoAdUnits.placements.push(placement);
                        RequestedCriteoAdUnits.placements.push(placement);
                    }
                    log('Criteo Ad Units: ', JSON.parse(JSON.stringify(CriteoAdUnits)));
                    count++;
                    if (MultisizeMethod === MULTISIZE_FIRST) break;
                }
            }
        }

        function eventFunction() {
            log('Setting LineItem Ranges...');
            window.Criteo.SetLineItemRanges('0..5:0.01;5..30:0.05;30..100:1.00');
            log('Previously Requested: ', RequestedCriteoAdUnits)
            metricApi.addMetric({type: 'vendor', id: 'Criteo', data:  zones_in_slot});
            log('Requesting Ad Units...', CriteoAdUnits);
            window.Criteo.RequestBids(CriteoAdUnits, function(bids){ callback(null, bids) },
                isMobile.any ? MOBILE_TIMEOUT : DESKTOP_TIMEOUT
            );
        }
        if (CriteoAdUnits.placements.length > 0) window.googletag.cmd.push(function () {window.Criteo.events.push(eventFunction);});
        else callback();
    }

    function preDispatchCallback(asset, callback) {
        log('Setting DFP KeyValue Targeting...');
        try { window.googletag.cmd.push(function () { window.Criteo.SetDFPKeyValueTargeting(); }) } catch(e) { error(e) }
        callback();
    }

    function preRefreshCallback(asset, callback) {
        var internalCallback = preDispatchCallback.bind(null, asset, callback);
        function eventFunc() {
            log('Setting LineItem Ranges...');
            window.Criteo.SetLineItemRanges('0..3:0.01;3..8:0.05;8..20:0.50;20..30:1.00');
            log('Requesting Bids...', RequestedCriteoAdUnits);
            metricApi.addMetric({type: 'vendor', id: 'Criteo', data: zones_in_slot });
            window.Criteo.RequestBids(RequestedCriteoAdUnits, internalCallback, 800);
        }
        window.Criteo.events.push(eventFunc);
    }

    function registerModuleWithAdFuel() {
        log('Registering Module...');
        metricApi = window.AdFuel.registerModule('criteo', {
            //when dispatching or refreshing slots, set criteo targeting
            preQueueCallback: preQueueCallback,
            preDispatchCallback: preDispatchCallback,
            preRefreshCallback: preRefreshCallback
        }) || { addMetric: function () {} };
    }

    function init() {
        log('Initializing Module...');
        includeCriteoLibrary();
        if (window.AdFuel && window.AdFuel.cmd) {
            window.AdFuel.cmd.push(registerModuleWithAdFuel);
        } else if (window.AdFuel) {
            //AdFuel loaded first
            registerModuleWithAdFuel();
        } else {
            //wait for AdFuel to load
            if (document.addEventListener) {
                document.addEventListener('AdFuelCreated', registerModuleWithAdFuel, true);
            } else if (document.attachEvent) {
                document.attachEvent('onAdFuelCreated', registerModuleWithAdFuel);
            }
        }
    }

    init();

})();




////////////////////////////////////////////
//AC A9 800ms 1.4
////////////////////////////////////////////

/* Amazon A9 AdFuel Module - Version 1.4.3
    - 1.4.0: Fix - Multiple requests
    - 1.4.1: Enhancement - Mobile slotName toggle
    - 1.4.2: Fix - Mobile slotName toggle on refreshed targeting
    - 1.4.3: Enhancement - Unified Video API
 */


(function createA9AdFuelModule() {

    'use strict';
    // Promise Polyfill
    //eslint-disable-next-line
    !function(e,n){"object"==typeof exports&&"undefined"!=typeof module?n():"function"==typeof define&&define.amd?define(n):n()}(0,function(){"use strict";function e(){}function n(e){if(!(this instanceof n))throw new TypeError("Promises must be constructed via new");if("function"!=typeof e)throw new TypeError("not a function");this._state=0,this._handled=!1,this._value=undefined,this._deferreds=[],f(e,this)}function t(e,t){for(;3===e._state;)e=e._value;0!==e._state?(e._handled=!0,n._immediateFn(function(){var n=1===e._state?t.onFulfilled:t.onRejected;if(null!==n){var i;try{i=n(e._value)}catch(f){return void r(t.promise,f)}o(t.promise,i)}else(1===e._state?o:r)(t.promise,e._value)})):e._deferreds.push(t)}function o(e,t){try{if(t===e)throw new TypeError("A promise cannot be resolved with itself.");if(t&&("object"==typeof t||"function"==typeof t)){var o=t.then;if(t instanceof n)return e._state=3,e._value=t,void i(e);if("function"==typeof o)return void f(function(e,n){return function(){e.apply(n,arguments)}}(o,t),e)}e._state=1,e._value=t,i(e)}catch(u){r(e,u)}}function r(e,n){e._state=2,e._value=n,i(e)}function i(e){2===e._state&&0===e._deferreds.length&&n._immediateFn(function(){e._handled||n._unhandledRejectionFn(e._value)});for(var o=0,r=e._deferreds.length;r>o;o++)t(e,e._deferreds[o]);e._deferreds=null}function f(e,n){var t=!1;try{e(function(e){t||(t=!0,o(n,e))},function(e){t||(t=!0,r(n,e))})}catch(i){if(t)return;t=!0,r(n,i)}}var u=setTimeout;n.prototype["catch"]=function(e){return this.then(null,e)},n.prototype.then=function(n,o){var r=new this.constructor(e);return t(this,new function(e,n,t){this.onFulfilled="function"==typeof e?e:null,this.onRejected="function"==typeof n?n:null,this.promise=t}(n,o,r)),r},n.prototype["finally"]=function(e){var n=this.constructor;return this.then(function(t){return n.resolve(e()).then(function(){return t})},function(t){return n.resolve(e()).then(function(){return n.reject(t)})})},n.all=function(e){return new n(function(n,t){function o(e,f){try{if(f&&("object"==typeof f||"function"==typeof f)){var u=f.then;if("function"==typeof u)return void u.call(f,function(n){o(e,n)},t)}r[e]=f,0==--i&&n(r)}catch(c){t(c)}}if(!e||"undefined"==typeof e.length)throw new TypeError("Promise.all accepts an array");var r=Array.prototype.slice.call(e);if(0===r.length)return n([]);for(var i=r.length,f=0;r.length>f;f++)o(f,r[f])})},n.resolve=function(e){return e&&"object"==typeof e&&e.constructor===n?e:new n(function(n){n(e)})},n.reject=function(e){return new n(function(n,t){t(e)})},n.race=function(e){return new n(function(n,t){for(var o=0,r=e.length;r>o;o++)e[o].then(n,t)})},n._immediateFn="function"==typeof setImmediate&&function(e){setImmediate(e)}||function(e){u(e,0)},n._unhandledRejectionFn=function(e){void 0!==console&&console&&console.warn("Possible Unhandled Promise Rejection:",e)};var c=function(){if("undefined"!=typeof self)return self;if("undefined"!=typeof window)return window;if(void 0!==c)return c;throw Error("unable to locate global object")}();c.Promise||(c.Promise=n)});
    // Object.assign Polyfill
    //eslint-disable-next-line
    "function"!=typeof Object.assign&&Object.defineProperty(Object,"assign",{value:function(e,t){"use strict";if(null==e)throw new TypeError("Cannot convert undefined or null to object");for(var n=Object(e),r=1;r<arguments.length;r++){var o=arguments[r];if(null!=o)for(var c in o)Object.prototype.hasOwnProperty.call(o,c)&&(n[c]=o[c])}return n},writable:!0,configurable:!0});

    var objectProto = Object.prototype;
    var toString = objectProto.toString;
    var noop = function () {};

    var MODULE_NAME = 'Amazon A9';
    var MODULE_VERSION = 'v1.4.2';

    var metricApi = {
        metrics: {},
        addMetric: noop,
        getMetricById: noop,
        getMetricsByType: noop,
        getMetricTypes: noop
    };

    var blocked = false;

    /**
     * isMobile.js v0.4.1
     *
     * A simple library to detect Apple phones and tablets,
     * Android phones and tablets, other mobile devices (like blackberry, mini-opera and windows phone),
     * and any kind of seven inch device, via user agent sniffing.
     *
     * @author: Kai Mallea (kmallea@gmail.com)
     *
     * @license: http://creativecommons.org/publicdomain/zero/1.0/
     */
    var apple_phone = /iPhone/i,
        apple_ipod = /iPod/i,
        apple_tablet = /iPad/i,
        android_phone = /(?=.*\bAndroid\b)(?=.*\bMobile\b)/i, // Match 'Android' AND 'Mobile'
        android_tablet = /Android/i,
        amazon_phone = /(?=.*\bAndroid\b)(?=.*\bSD4930UR\b)/i,
        amazon_tablet = /(?=.*\bAndroid\b)(?=.*\b(?:KFOT|KFTT|KFJWI|KFJWA|KFSOWI|KFTHWI|KFTHWA|KFAPWI|KFAPWA|KFARWI|KFASWI|KFSAWI|KFSAWA)\b)/i,
        windows_phone = /Windows Phone/i,
        windows_tablet = /(?=.*\bWindows\b)(?=.*\bARM\b)/i, // Match 'Windows' AND 'ARM'
        other_blackberry = /BlackBerry/i,
        other_blackberry_10 = /BB10/i,
        other_opera = /Opera Mini/i,
        other_chrome = /(CriOS|Chrome)(?=.*\bMobile\b)/i,
        other_firefox = /(?=.*\bFirefox\b)(?=.*\bMobile\b)/i, // Match 'Firefox' AND 'Mobile'
        seven_inch = new RegExp(
            '(?:' + // Non-capturing group
            'Nexus 7' + // Nexus 7
            '|' + // OR
            'BNTV250' + // B&N Nook Tablet 7 inch
            '|' + // OR
            'Kindle Fire' + // Kindle Fire
            '|' + // OR
            'Silk' + // Kindle Fire, Silk Accelerated
            '|' + // OR
            'GT-P1000' + // Galaxy Tab 7 inch
            ')', // End non-capturing group
            'i'); // Case-insensitive matching

    var match = function (regex, userAgent) {
        return regex.test(userAgent);
    };

    var IsMobileClass = function (userAgent) {
        var ua = userAgent || navigator.userAgent;

        // Facebook mobile app's integrated browser adds a bunch of strings that
        // match everything. Strip it out if it exists.
        var tmp = ua.split('[FBAN');
        if (typeof tmp[1] !== 'undefined') {
            ua = tmp[0];
        }

        // Twitter mobile app's integrated browser on iPad adds a "Twitter for
        // iPhone" string. Same probable happens on other tablet platforms.
        // This will confuse detection so strip it out if it exists.
        tmp = ua.split('Twitter');
        if (typeof tmp[1] !== 'undefined') {
            ua = tmp[0];
        }

        this.apple = {
            phone: match(apple_phone, ua),
            ipod: match(apple_ipod, ua),
            tablet: !match(apple_phone, ua) && match(apple_tablet, ua),
            device: match(apple_phone, ua) || match(apple_ipod, ua) || match(apple_tablet, ua)
        };
        this.amazon = {
            phone: match(amazon_phone, ua),
            tablet: !match(amazon_phone, ua) && match(amazon_tablet, ua),
            device: match(amazon_phone, ua) || match(amazon_tablet, ua)
        };
        this.android = {
            phone: match(amazon_phone, ua) || match(android_phone, ua),
            tablet: !match(amazon_phone, ua) && !match(android_phone, ua) && (match(amazon_tablet, ua) || match(android_tablet, ua)),
            device: match(amazon_phone, ua) || match(amazon_tablet, ua) || match(android_phone, ua) || match(android_tablet, ua)
        };
        this.windows = {
            phone: match(windows_phone, ua),
            tablet: match(windows_tablet, ua),
            device: match(windows_phone, ua) || match(windows_tablet, ua)
        };
        this.other = {
            blackberry: match(other_blackberry, ua),
            blackberry10: match(other_blackberry_10, ua),
            opera: match(other_opera, ua),
            firefox: match(other_firefox, ua),
            chrome: match(other_chrome, ua),
            device: match(other_blackberry, ua) || match(other_blackberry_10, ua) || match(other_opera, ua) || match(other_firefox, ua) || match(other_chrome, ua)
        };
        this.seven_inch = match(seven_inch, ua);
        this.any = this.apple.device || this.android.device || this.windows.device || this.other.device || this.seven_inch;

        // excludes 'other' devices and ipods, targeting touchscreen phones
        this.phone = this.apple.phone || this.android.phone || this.windows.phone;

        // excludes 7 inch devices, classifying as phone or tablet is left to the user
        this.tablet = this.apple.tablet || this.android.tablet || this.windows.tablet;

        if (typeof window === 'undefined') {
            return this;
        }
    };

    var instantiate = function () {
        var IM = new IsMobileClass();
        IM.Class = IsMobileClass;
        return IM;
    };

    var isMobile = instantiate();

    function isFunction(object) {
        return toString.call(object) === '[object Function]';
    }

    function isObject(object) {
        var type = typeof object;
        return type === 'function' || type === 'object' && !!object;
    }

    function getURLParam(name) {
        name = name.replace(/[\[]/, '\\\[').replace(/[\]]/, '\\\]');
        var regexS = '[\\?&]' + name + '=([^&#]*)';
        var regex = new RegExp(regexS);
        if (document.location.search) {
            var results = regex.exec(document.location.search);
            if (results) {
                return results[1];
            } else {
                return '';
            }
        } else {
            return '';
        }
    }

    function readCookie(name) {

        var lsSupport = false;
        var data = null;
        // Check for native support
        if (localStorage) {
            lsSupport = true;
        }

        // No value supplied, return value
        if (typeof value === 'undefined') {
            // Get value
            if (lsSupport) { // Native support
                data = localStorage.getItem(name);
            }
            if (!lsSupport || data === null) { // Use cookie
                data = readTheCookie(name);
            }

            // Try to parse JSON...
            try {
                data = JSON.parse(data);
            } catch(e) {
            }

            return data;

        }

        function readTheCookie(key) {
            if (!document.cookie) {
                // there is no cookie, so go no further
                return null;
            } else { // there is a cookie
                var ca = document.cookie.split(';');
                var nameEQ = key + '=';
                for (var i = 0; i < ca.length; i++) {
                    var c = ca[i];
                    while (c.charAt(0) === ' ') {
                        //delete spaces
                        c = c.substring(1, c.length);
                    }
                    if (c.indexOf(nameEQ) === 0) {
                        return c.substring(nameEQ.length, c.length);
                    }
                }
                return null;
            }
        }

    }

    function getViewport() {
        var viewportWidth;
        var viewportHeight;
        if (typeof window.innerWidth !== 'undefined') {
            viewportWidth = window.innerWidth,
            viewportHeight = window.innerHeight;
        } else if (typeof document.documentElement !== 'undefined' && typeof document.documentElement.clientWidth !== 'undefined' && document.documentElement.clientWidth !== 0) {
            viewportWidth = document.documentElement.clientWidth,
            viewportHeight = document.documentElement.clientHeight;
        } else {
            viewportWidth = document.getElementsByTagName('body')[0].clientWidth,
            viewportHeight = document.getElementsByTagName('body')[0].clientHeight;
        }
        return [viewportWidth, viewportHeight];
    }

    var log = noop;
    var logTime = noop;
    var logTimeEnd = noop;

    if (isObject(window.console) && isFunction(window.console.log) && getURLParam('debug') === 'true') {
        log = function (/* arguments */) {
            var args = ['[AdFuelModule - ' + MODULE_NAME + ' ' + MODULE_VERSION + ']'];
            args.push.apply(args, arguments);
            window.console.log.apply(window.console, args);
        };
        logTime = function (/* arguments */) {
            var args = ['[AdFuelModule - ' + MODULE_NAME + ' ' + MODULE_VERSION + ' TIMER] '];
            args.push.apply(args, arguments);
            var timeKey = args.join('');
            window.console.time(timeKey);
        };
        logTimeEnd = function (/* arguments */) {
            var args = ['[AdFuelModule - ' + MODULE_NAME + ' ' + MODULE_VERSION + ' TIMER] '];
            args.push.apply(args, arguments);
            var timeKey = args.join('');
            window.console.timeEnd(timeKey);
        };
    }

    var logger = { log: log, logTime: logTime, logTimeEnd: logTimeEnd };

    var countryCode = (readCookie('CG') ? readCookie('CG').substr(0, 2) : '') || readCookie('countryCode');
    var selectedEdition = readCookie('SelectedEdition') ? readCookie('SelectedEdition') : 'www';
    var parser = document.createElement('a');
    parser.href = document.location.href;

    var hostname = parser.hostname;
    var pathname = parser.pathname;

    var a9bids;
    var bidSlots = [];
    var defaultDisplayTimeout = 750;
    var defaultDisplayRefreshTimeout = 750;
    var defaultMobileDisplayTimeout = 750;
    var defaultMobileDisplayRefreshTimeout = 750;
    var defaultVideoTimeout = 500;
    var defaultVideoRefreshTimeout = 1000;
    var timerEnded = false;

    function getTargetingData(timeout) {
        logger.logTime('getTargetingData');
        timeout = timeout || defaultVideoTimeout;
        var timeoutOverride = getURLParam('mdt');
        if (timeoutOverride) {
            timeout = timeoutOverride;
            logger.log('Overriding Max Duration Time: ', timeout);
        }
        var wrappedFunction = function wrappedFunction(resolve) {
            logger.log('Getting A9 Video targeting...');
            var innerFunction = function(bids) {
                clearTimeout(window.targetingTimeoutId);
                var targetBid = {};
                bids.forEach(function(bid){
                    if (bid.slotID.indexOf('aps-') >= 0) {
                        targetBid = bid;
                    }
                })
                var result = {
                    'amznbid': targetBid.amznbid || '',
                    'amzniid': targetBid.amzniid || '',
                };
                logger.log('Returning A9 Targeting: ', result);
                if (!timerEnded){
                    logger.logTimeEnd('getTargetingData');
                    timerEnded = true;
                }
                return result;
            }
            window.A9VideoAPI._targetingPromise.then(function(bids) { resolve(innerFunction(bids)) });
        };
        var timeoutFunction = function timeoutFunction(resolve, reject) {
            window.targetingTimeoutId = setTimeout(function() {
                logger.log('getTargetingData timed out after ' + timeout + 'ms.');
                clearTimeout(window.targetingTimeoutId);
                if (!timerEnded){
                    logger.logTimeEnd('getTargetingData');
                    timerEnded = true;
                }
                reject('getTargetingData timed out after ' + timeout + 'ms.');
            }, timeout);
        };
        var wrappedCallback = new Promise(wrappedFunction);
        var timeoutCallback = new Promise(timeoutFunction);

        // Returns a race between the timeout and the passed in promise
        return Promise.race([wrappedCallback, timeoutCallback]);
    }

    function getPreRollTargetingData(timeout) {
        logger.logTime('getPreRollTargetingData');
        timeout = timeout || defaultVideoTimeout;
        var timeoutOverride = getURLParam('mdt');
        if (timeoutOverride) {
            timeout = timeoutOverride;
            logger.log('Overriding Max Duration Time: ', timeout);
        }
        var wrappedFunction = function wrappedFunction(resolve) {
            logger.log('Getting A9 Video PreRoll targeting...');
            var innerFunction = function(bids) {
                clearTimeout(window.preRollTargetingTimeoutId);
                var targetBid = {};
                bids.forEach(function(bid){
                    if (bid.slotID.indexOf('aps-') >= 0) {
                        targetBid = bid;
                    }
                })
                var result = {
                    'amznbid': targetBid.amznbid || '',
                    'amzniid': targetBid.amzniid || '',
                };
                logger.log('Returning A9 PreRoll Targeting: ', result);
                if (!timerEnded){
                    logger.logTimeEnd('getPreRollTargetingData');
                    timerEnded = true;
                }
                return result;
            }
            window.A9VideoAPI._preRollTargetingPromise.then(function(bids) { resolve(innerFunction(bids)) });
        };
        var timeoutFunction = function timeoutFunction(resolve, reject) {
            window.preRollTargetingTimeoutId = setTimeout(function() {
                logger.log('getPreRollTargetingData timed out after ' + timeout + 'ms.');
                clearTimeout(window.preRollTargetingTimeoutId);
                if (!timerEnded){
                    logger.logTimeEnd('getPreRollTargetingData');
                    timerEnded = true;
                }
                reject('getPreRollTargetingData timed out after ' + timeout + 'ms.');
            }, timeout);
        };
        var wrappedCallback = new Promise(wrappedFunction);
        var timeoutCallback = new Promise(timeoutFunction);

        // Returns a race between the timeout and the passed in promise
        return Promise.race([wrappedCallback, timeoutCallback]);
    }

    function getMidRollTargetingData(timeout) {
        logger.logTime('getMidRollTargetingData');
        timeout = timeout || defaultVideoRefreshTimeout;
        var slotName = isMobile.phone ? 'aps-midroll-mobile' : 'aps-midroll';
        var timeoutOverride = getURLParam('mdt');
        var slotNameOverride = getURLParam('slotname');
        if (timeoutOverride) {
            timeout = timeoutOverride;
            logger.log('Overriding Max Duration Time: ', timeout);
        }
        if (slotNameOverride) {
            slotName = slotNameOverride;
            logger.log('Overriding Slot Name: ', slotName);
        }
        var wrappedFunction = function wrappedFunction(resolve) {
            window.A9VideoAPI._midRollTargetingPromise = new Promise(function(resolve) {
                window.apstag.fetchBids({
                    slots: [{
                        slotID: slotName,
                        mediaType: 'video',
                    }],
                    timeout: timeout
                }, resolve);
            });
            var innerFunction = function innerFunction(bids) {
                clearTimeout(window.midRollTargetingTimeoutId);
                var targetBid = {};
                bids.forEach(function(bid) {
                    if (bid.slotID === slotName) {
                        targetBid = bid;
                    }
                })
                var result = {
                    'amznbid': targetBid.amznbid || '',
                    'amzniid': targetBid.amzniid || '',
                };
                logger.log('Returning A9 MidRoll Targeting: ', result);
                if (!timerEnded){
                    logger.logTimeEnd('getMidRollTargetingData');
                    timerEnded = true;
                }
                resolve(result);
            }
            logger.log('Getting A9 Video MidRoll targeting...');
            window.A9VideoAPI._midRollTargetingPromise.then(innerFunction);
        };
        var timeoutFunction = function timeoutFunction(resolve, reject) {
            window.midRollTargetingTimeoutId = setTimeout(function() {
                logger.log('getMidRollTargetingData timed out after ' + timeout + 'ms.');
                clearTimeout(window.midRollTargetingTimeoutId);
                if (!timerEnded){
                    logger.logTimeEnd('getMidRollTargetingData');
                    timerEnded = true;
                }
                reject('getMidRollTargetingData timed out after ' + timeout + 'ms.');
            }, timeout);
        };
        var wrappedCallback = new Promise(wrappedFunction);
        var timeoutCallback = new Promise(timeoutFunction);

        // Returns a race between the timeout and the passed in promise
        return Promise.race([wrappedCallback, timeoutCallback]);
    }

    function getRefreshedTargetingData(slotName, timeout) {
        logger.logTime('getRefreshedTargetingData');
        timeout = timeout || defaultVideoRefreshTimeout;
        slotName = slotName + (isMobile.phone && slotName.indexOf('-mobile') < 1 ? '-mobile' : '') || isMobile.phone ? 'aps-midroll-mobile' : 'aps-midroll';
        var timeoutOverride = getURLParam('mdt');
        var slotNameOverride = getURLParam('slotname');
        if (timeoutOverride) {
            timeout = timeoutOverride;
            logger.log('Overriding Max Duration Time: ', timeout);
        }
        if (slotNameOverride) {
            slotName = slotNameOverride;
            logger.log('Overriding Slot Name: ', slotName);
        }
        var wrappedFunction = function wrappedFunction(resolve) {
            window.A9VideoAPI._refreshedTargetingPromise = new Promise(function(resolve) {
                window.apstag.fetchBids({
                    slots: [{
                        slotID: slotName,
                        mediaType: 'video',
                    }],
                    timeout: timeout
                }, resolve);
            });
            var innerFunction = function innerFunction(bids) {
                clearTimeout(window.refreshedTargetingTimeoutId);
                var targetBid = {};
                bids.forEach(function(bid) {
                    if (bid.slotID === slotName) {
                        targetBid = bid;
                    }
                })
                var result = {
                    'amznbid': targetBid.amznbid || '',
                    'amzniid': targetBid.amzniid || '',
                };
                logger.log('Returning Refreshed A9 Targeting: ', result);
                if (!timerEnded){
                    logger.logTimeEnd('getRefreshedTargetingData');
                    timerEnded = true;
                }
                resolve(result);
            }
            logger.log('Refreshing A9 Video targeting...');
            window.A9VideoAPI._refreshedTargetingPromise.then(innerFunction);
        };
        var timeoutFunction = function timeoutFunction(resolve, reject) {
            window.refreshedTargetingTimeoutId = setTimeout(function() {
                logger.log('getRefreshedTargetingData timed out after ' + timeout + 'ms.');
                clearTimeout(window.targetingTimeoutId);
                if (!timerEnded){
                    logger.logTimeEnd('getRefreshedTargetingData');
                    timerEnded = true;
                }
                reject('getRefreshedTargetingData timed out after ' + timeout + 'ms.');
            }, timeout);
        };
        var wrappedCallback = new Promise(wrappedFunction);
        var timeoutCallback = new Promise(timeoutFunction);

        // Returns a race between the timeout and the passed in promise
        return Promise.race([wrappedCallback, timeoutCallback]);
    }

    function getRefreshedPreRollTargetingData(timeout) {
        logger.logTime('getRefreshedPreRollTargetingData');
        timeout = timeout || defaultVideoRefreshTimeout;
        var slotName = isMobile.phone ? 'aps-preroll-mobile' : 'aps-preroll';
        var timeoutOverride = getURLParam('mdt');
        var slotNameOverride = getURLParam('slotname');
        if (timeoutOverride) {
            timeout = timeoutOverride;
            logger.log('Overriding Max Duration Time: ', timeout);
        }
        if (slotNameOverride) {
            slotName = slotNameOverride;
            logger.log('Overriding Slot Name: ', slotName);
        }
        var wrappedFunction = function wrappedFunction(resolve) {
            window.A9VideoAPI._refreshedPreRollTargetingPromise = new Promise(function(resolve) {
                window.apstag.fetchBids({
                    slots: [{
                        slotID: slotName,
                        mediaType: 'video',
                    }],
                    timeout: timeout
                }, resolve);
            });
            var innerFunction = function innerFunction(bids) {
                clearTimeout(window.refreshedPreRollTargetingTimeoutId);
                var targetBid = {};
                bids.forEach(function(bid) {
                    if (bid.slotID === slotName) {
                        targetBid = bid;
                    }
                })
                var result = {
                    'amznbid': targetBid.amznbid || '',
                    'amzniid': targetBid.amzniid || '',
                };
                logger.log('Returning Refreshed A9 PreRoll Targeting: ', result);
                if (!timerEnded){
                    logger.logTimeEnd('getRefreshedPreRollTargetingData');
                    timerEnded = true;
                }
                resolve(result);
            }
            logger.log('Refreshing A9 Video PreRoll targeting...');
            window.A9VideoAPI._refreshedPreRollTargetingPromise.then(innerFunction);
        };
        var timeoutFunction = function timeoutFunction(resolve, reject) {
            window.refreshedPreRollTargetingTimeoutId = setTimeout(function() {
                logger.log('getRefreshedPreRollTargetingData timed out after ' + timeout + 'ms.');
                clearTimeout(window.refreshedPreRollTargetingTimeoutId);
                if (!timerEnded){
                    logger.logTimeEnd('getRefreshedPreRollTargetingData');
                    timerEnded = true;
                }
                reject('getRefreshedPreRollTargetingData timed out after ' + timeout + 'ms.');
            }, timeout);
        };
        var wrappedCallback = new Promise(wrappedFunction);
        var timeoutCallback = new Promise(timeoutFunction);

        // Returns a race between the timeout and the passed in promise
        return Promise.race([wrappedCallback, timeoutCallback]);
    }

    function getRefreshedMidRollTargetingData(timeout) {
        logger.logTime('getRefreshedMidRollTargetingData');
        timeout = timeout || defaultVideoRefreshTimeout;
        var slotName = isMobile.phone ? 'aps-midroll-mobile' : 'aps-midroll';
        var timeoutOverride = getURLParam('mdt');
        var slotNameOverride = getURLParam('slotname');
        if (timeoutOverride) {
            timeout = timeoutOverride;
            logger.log('Overriding Max Duration Time: ', timeout);
        }
        if (slotNameOverride) {
            slotName = slotNameOverride;
            logger.log('Overriding Slot Name: ', slotName);
        }
        var wrappedFunction = function wrappedFunction(resolve) {
            window.A9VideoAPI._targetingPromise = new Promise(function(resolve) {
                window.apstag.fetchBids({
                    slots: [{
                        slotID: slotName,
                        mediaType: 'video',
                    }],
                    timeout: timeout
                }, resolve);
            });
            var innerFunction = function innerFunction(bids) {
                clearTimeout(window.refreshedMidRollTargetingTimeoutId);
                var targetBid = {};
                bids.forEach(function(bid) {
                    if (bid.slotID === slotName) {
                        targetBid = bid;
                    }
                })
                var result = {
                    'amznbid': targetBid.amznbid || '',
                    'amzniid': targetBid.amzniid || '',
                };
                logger.log('Returning Refreshed A9 MidRoll Targeting: ', result);
                if (!timerEnded){
                    logger.logTimeEnd('getRefreshedMidRollTargetingData');
                    timerEnded = true;
                }
                resolve(result);
            }
            logger.log('Refreshing A9 Video MidRoll targeting...');
            window.A9VideoAPI._targetingPromise.then(innerFunction);
        };
        var timeoutFunction = function timeoutFunction(resolve, reject) {
            window.refreshedMidRollTargetingTimeoutId = setTimeout(function() {
                logger.log('getRefreshedMidRollTargetingData timed out after ' + timeout + 'ms.');
                clearTimeout(window.refreshedMidRollTargetingTimeoutId);
                if (!timerEnded){
                    logger.logTimeEnd('getRefreshedMidRollTargetingData');
                    timerEnded = true;
                }
                reject('getRefreshedMidRollTargetingData timed out after ' + timeout + 'ms.');
            }, timeout);
        };
        var wrappedCallback = new Promise(wrappedFunction);
        var timeoutCallback = new Promise(timeoutFunction);

        // Returns a race between the timeout and the passed in promise
        return Promise.race([wrappedCallback, timeoutCallback]);
    }

    function keyGPTSlots(slots) {
        return slots.reduce(function (o, slot) {
            var slotId = slot.getSlotElementId();
            o[slotId] = slot;
            return o;
        }, {});
    }

    function handleA9Bids(bids, gptSlots, done) {
        log('Handling A9 Bids:', bids, gptSlots);
        logTime('Handling A9 Bids');
        window.googletag.cmd.push(function () {
            function getURLParam(name) {
                name = name.replace(/[\[]/, '\\\[').replace(/[\]]/, '\\\]');
                var regexS = '[\\?&]' + name + '=([^&#]*)';
                var regex = new RegExp(regexS);
                if (document.location.search) {
                    var results = regex.exec(document.location.search);
                    if (results) {
                        return results[1];
                    } else {
                        return '';
                    }
                } else {
                    return '';
                }
            }
            var slots = keyGPTSlots(gptSlots);
            bids.forEach(function (bid) {
                var gptSlot = slots[bid.slotID] || null;
                if (gptSlot !== null) {
                    var targets = {};
                    window.apstag.targetingKeys('display').forEach(function (key) {
                        if (getURLParam('debug') === 'true') {
                            console.log('[AdFuelModule - Amazon A9] Setting A9 Targeting: ', {key: key, value: bid[key]});
                        }
                        targets[key] = bid[key];
                        gptSlot.setTargeting(key, bid[key]);
                    });
                    metricApi.addMetric({
                        type: 'vendor',
                        id: 'Amazon A9',
                        data: {targeting: targets}
                    });
                }
            })
            window.googletag.pubads().addEventListener('slotRenderEnded', function (e) {
                var gptSlots = keyGPTSlots(window.googletag.pubads().getSlots());
                var gptSlot = gptSlots[e.slot.getSlotElementId()];
                window.apstag.targetingKeys('display').forEach(function (key) {
                    gptSlot.setTargeting(key, '');
                });
            });
        });
        logTimeEnd('Handling A9 Bids');
        done();
    }

    function preQueueCallback(asset, done) {
        logTime('A9 Slot Building');
        // Only sizes in this array will be sent in the request to Amazon.
        var validSizes = [ '160x600', '300x250', '300x600', '320x50', '728x90', '970x90', '970x250' ];
        // Any slot id with any of the following slot types will be excluded from the request to A9.
        var invalidMappings = [ '_ns_', '_nfs_' ];
        // Any slot with any of the following ad unit segments in the slot ad unit will be excluded from the request to A9.
        var invalidAdUnitSegments = [ 'super-ad-zone', 'super_ad_zone' ];
        var browser = getViewport();
        log('Browser Dimensions: ', browser);
        for (var x = 0; x < asset.length; x++) {
            if (asset[x].rktr_slot_id !== 'page') {
                var slotId = asset[x].originalElementId || asset[x].rktr_slot_id;
                var pieces = slotId.split('_');
                pieces.splice(0, 1);
                slotId = pieces.join('_')
                log('Checking slot and sizes for validity: ', slotId);
                var responsiveSizes = [];
                var isValid = true;
                var viewportChecked = false;
                for (var viewportId = 0; viewportId < asset[x].responsive.length; viewportId++) {
                    var viewport = asset[x].responsive[viewportId];
                    if (!viewportChecked) log('Checking For Responsive Viewport: ', viewport[0].join('x'));
                    if (!viewportChecked && viewport[0][0] < browser[0] && viewport[0][1] < browser[1]) {
                        log('Match found.');
                        viewportChecked = true;
                        responsiveSizes = viewport[1];
                        if (viewport[1][0] === 'suppress' || responsiveSizes === 'suppress') {
                            log('Slot is responsive and being suppressed.  Filtering slot.');
                            isValid = false;
                        }
                    }
                }
                if (responsiveSizes.length > 0 && isValid) {
                    log('Slot is responsive and not being suppressed.  Using responsive sizes: ', responsiveSizes);
                    asset[x].sizes = responsiveSizes;
                }
                if (isValid) {
                    for (var y = 0; y < asset[x].sizes.length; y++) {
                        var size = asset[x].sizes[y].join('x')
                        if (validSizes.indexOf(size) < 0) {
                            log('Filtering out Invalid Size: ', size);
                            asset[x].sizes.splice(y, 1)
                            y = y - 1;
                        }
                    }
                    if (asset[x].sizes.length === 0) {
                        log('No Valid Sizes: ', asset[x].sizes);
                        isValid = false;
                    }
                    for (var invalidMapping in invalidMappings) {
                        if (asset[x].rktr_slot_id.indexOf(invalidMappings[invalidMapping]) >= 0) {
                            log('Filtering out invalid slot type: ', invalidMappings[invalidMapping], asset[x]);
                            isValid = false;
                        }
                    }
                    for (var invalidAdUnitSegment in invalidAdUnitSegments) {
                        if (asset[x].rktr_ad_id.indexOf(invalidAdUnitSegments[invalidAdUnitSegment]) >= 0) {
                            log('Filtering out invalid ad unit segment: ', invalidAdUnitSegments[invalidAdUnitSegment], asset[x]);
                            isValid = false;
                        }
                    }
                    if (isValid) {
                        log('Valid Slot: ', asset[x]);
                        var obj = {slotID: asset[x].rktr_slot_id, sizes: asset[x].sizes};
                        bidSlots.push(obj);
                    }
                }
            }
        }
        logTimeEnd('A9 Slot Building');
        function processBids(bids) {
            a9bids = bids;
            bidSlots = [];
            done();
        }
        if (bidSlots.length > 0) {
            var a9Slots = JSON.parse(JSON.stringify(bidSlots));
            window.apstag.fetchBids({
                slots: a9Slots,
                timeout: isMobile.any ? defaultMobileDisplayTimeout : defaultDisplayTimeout
            }, processBids);
            bidSlots.length = 0;
        }else{
            log('No valid slots.');
        }
    }

    function preDispatchCallback(asset, done) {
        window.googletag.cmd.push(function () {
            var gptSlots = window.googletag.pubads().getSlots();
            if (a9bids) handleA9Bids(a9bids, gptSlots, done);
            if (!a9bids) {
                log('No Bids.');
                done();
            }
        });
    }

    function preRefreshCallback(asset, done) {
        a9bids = null;
        logTime('Refreshing A9 Bids');
        window.apstag.fetchBids({
            slots: bidSlots,
            timeout: isMobile.any ? defaultMobileDisplayRefreshTimeout : defaultDisplayRefreshTimeout
        }, function (bids) {
            a9bids = bids;
            logTimeEnd('Refreshing A9 Bids');
            var gptSlots = window.googletag.pubads().getSlots();
            handleA9Bids(a9bids, gptSlots, done)
        });
    }

    function registerModuleWithAdFuel() {
        if (!blocked) {
            log('Registering ' + MODULE_NAME + ' module with AdFuel');
            window.AdFuel.setOptions({
                queueCallbackTimeoutInMilliseconds: 800,
                dispatchCallbackTimeoutInMilliseconds: 800,
                refreshCallbackTimeoutInMilliseconds: 800
            });
            metricApi = window.AdFuel.registerModule(MODULE_NAME, {
                preQueueCallback: preQueueCallback,
                preDispatchCallback: preDispatchCallback,
                preRefreshCallback: preRefreshCallback
            }) || metricApi;
        }
    }

    function configureA9Library() {
        var pubId = '3159';
        window.AdFuelVideoAPI = window.AdFuelVideoAPI || {};
        window.AdFuelVideoAPI.A9 = window.A9VideoAPI = {
            getTargetingData: getTargetingData,
            getPreRollTargetingData: getPreRollTargetingData,
            getMidRollTargetingData: getMidRollTargetingData,
            getRefreshedTargetingData: getRefreshedTargetingData,
            getRefreshedPreRollTargetingData: getRefreshedPreRollTargetingData,
            getRefreshedMidRollTargetingData: getRefreshedMidRollTargetingData
        };
        log('Defaulting to Domestic PubId.');
        log('Country Code: ', countryCode);
        log('Hostname: ', hostname);
        log('Pathname: ', pathname);
        log('Selected Edition: ', selectedEdition);
        if (hostname.search(/^(.*)?(edition|arabic)\./) >= 0) {
            log('Full international site. Using International PubId.');
            pubId = '3288';
        }else if (hostname.search(/^(.*)?money/) >= 0 && pathname === '/' && selectedEdition === 'edition') {
            log('International CNN Money Homepage. Using International PubId.');
            pubId = '3288';
        }else if (countryCode === '' || countryCode === null) {
            if (hostname.search(/^(.*)?(cnnespanol|cnne\-test)\./) >= 0) {
                log('No country code. Using International PubId.');
                pubId = '3288';
            }
        }else if (countryCode !== 'US' && countryCode !== 'CA') {
            if (hostname.search(/^(.*)?(money|cnnespanol|cnne\-test|www\.cnn)\./) >= 0) {
                log('International country code. Using International PubId.');
                pubId = '3288';
            }
        }
        !function (a9, a, p, s, t, A, g) {
            if(a[a9])return;function q(c, r) {a[a9]._Q.push([c, r])}a[a9] = {init:function () {q('i', arguments)}, fetchBids:function () {q('f', arguments)}, _Q:[]};A = p.createElement(s);A.async = !0;A.src = t;g = p.getElementsByTagName(s)[0];g.parentNode.insertBefore(A, g)
        }('apstag', window, document, 'script', '//c.amazon-adsystem.com/aax2/apstag.js');
        log('Final Pub ID: ', pubId);
        var bidTimeout = 800;
        var timeoutOverride = getURLParam('mdt');
        if (timeoutOverride) {
            bidTimeout = timeoutOverride;
            logger.log('Overriding Max Duration Time: ', bidTimeout);
        }
        var slotName = isMobile.phone ? 'aps-preroll-mobile' : 'aps-preroll';
        var slotNameOverride = getURLParam('slotname');
        if (slotNameOverride) {
            slotName = slotNameOverride;
            logger.log('Overriding Slot Name: ', slotName);
        }
        window.apstag.init({
            pubID: pubId,
            adServer: 'googletag',
            videoAdServer: 'freeWheel',
            bidTimeout: bidTimeout,
        });
        window.A9VideoAPI._preRollTargetingPromise = window.A9VideoAPI._targetingPromise = new Promise(function(resolve){
            window.apstag.fetchBids({
                slots: [
                    {
                        slotID: slotName,
                        mediaType: 'video',
                    },
                ],
            }, resolve);
        });
    }

    function init() {
        configureA9Library();
        if (window.AdFuel && window.AdFuel.cmd) {
            //AdFuel loaded first
            window.AdFuel.cmd.push(registerModuleWithAdFuel);
        }else if (window.AdFuel) {
            registerModuleWithAdFuel();
        } else {
            //wait for AdFuel to load
            if (document.addEventListener) {
                document.addEventListener('AdFuelCreated', registerModuleWithAdFuel, true);
            } else if (document.attachEvent) {
                document.attachEvent('onAdFuelCreated', registerModuleWithAdFuel);
            }
        }
    }

    log('Initializing ' + MODULE_NAME + ' Module...');
    init();

})();


////////////////////////////////////////////
//AD Prebid for Money 1.1
////////////////////////////////////////////

(function createPrebidAdFuelModule() {
  'use strict';
  var MODULE_NAME = 'Prebid';
  var MODULE_VERSION = 'v1.0.17';

  window.googletag = window.googletag || {};
  window.googletag.cmd = window.googletag.cmd || [];

  // BEGIN isMobile.js
  /**
   * @author: Kai Mallea (kmallea@gmail.com)
   * @license: http://creativecommons.org/publicdomain/zero/1.0/
   */
  var applePhone = /iPhone/i;
  var appleIpod = /iPod/i;
  var appleTablet = /iPad/i;
  var androidPhone = /(?=.*\bAndroid\b)(?=.*\bMobile\b)/i; // Match 'Android' AND 'Mobile'
  var androidTablet = /Android/i;
  var amazonPhone = /(?=.*\bAndroid\b)(?=.*\bSD4930UR\b)/i;
  var amazonTablet = /(?=.*\bAndroid\b)(?=.*\b(?:KFOT|KFTT|KFJWI|KFJWA|KFSOWI|KFTHWI|KFTHWA|KFAPWI|KFAPWA|KFARWI|KFASWI|KFSAWI|KFSAWA)\b)/i;
  var windowsPhone = /Windows Phone/i;
  var windowsTablet = /(?=.*\bWindows\b)(?=.*\bARM\b)/i; // Match 'Windows' AND 'ARM'
  var otherBlackberry = /BlackBerry/i;
  var otherBlackberry10 = /BB10/i;
  var otherOpera = /Opera Mini/i;
  var otherChrome = /(CriOS|Chrome)(?=.*\bMobile\b)/i;
  var otherFirefox = /(?=.*\bFirefox\b)(?=.*\bMobile\b)/i; // Match 'Firefox' AND 'Mobile'
  var sevenInch = new RegExp(
    '(?:' + // Non-capturing group
              'Nexus 7' + // Nexus 7
              '|' + // OR
              'BNTV250' + // B&N Nook Tablet 7 inch
              '|' + // OR
              'Kindle Fire' + // Kindle Fire
              '|' + // OR
              'Silk' + // Kindle Fire, Silk Accelerated
              '|' + // OR
              'GT-P1000' + // Galaxy Tab 7 inch
              ')', // End non-capturing group
    'i'); // Case-insensitive matching

  var match = function match(regex, userAgent) {
    return regex.test(userAgent);
  };

  var IsMobileClass = function IsMobileClass(userAgent) {
    var ua = userAgent || navigator.userAgent;

    // Facebook mobile app's integrated browser adds a bunch of strings that
    // match everything. Strip it out if it exists.
    var tmp = ua.split('[FBAN');
    if (typeof tmp[1] !== 'undefined') {
      ua = tmp[0];
    }

    // Twitter mobile app's integrated browser on iPad adds a "Twitter for
    // iPhone" string. Same probable happens on other tablet platforms.
    // This will confuse detection so strip it out if it exists.
    tmp = ua.split('Twitter');
    if (typeof tmp[1] !== 'undefined') {
      ua = tmp[0];
    }

    this.apple = {
      phone: match(applePhone, ua),
      ipod: match(appleIpod, ua),
      tablet: !match(applePhone, ua) && match(appleTablet, ua),
      device: match(applePhone, ua) || match(appleIpod, ua) || match(appleTablet, ua)
    };
    this.amazon = {
      phone: match(amazonPhone, ua),
      tablet: !match(amazonPhone, ua) && match(amazonTablet, ua),
      device: match(amazonPhone, ua) || match(amazonTablet, ua)
    };
    this.android = {
      phone: match(amazonPhone, ua) || match(androidPhone, ua),
      tablet: !match(amazonPhone, ua) && !match(androidPhone, ua) && (match(amazonTablet, ua) || match(androidTablet, ua)),
      device: match(amazonPhone, ua) || match(amazonTablet, ua) || match(androidPhone, ua) || match(androidTablet, ua)
    };
    this.windows = {
      phone: match(windowsPhone, ua),
      tablet: match(windowsTablet, ua),
      device: match(windowsPhone, ua) || match(windowsTablet, ua)
    };
    this.other = {
      blackberry: match(otherBlackberry, ua),
      blackberry10: match(otherBlackberry10, ua),
      opera: match(otherOpera, ua),
      firefox: match(otherFirefox, ua),
      chrome: match(otherChrome, ua),
      device: match(otherBlackberry, ua) || match(otherBlackberry10, ua) || match(otherOpera, ua) || match(otherFirefox, ua) || match(otherChrome, ua)
    };
    this.seven_inch = match(sevenInch, ua);
    this.any = this.apple.device || this.android.device || this.windows.device || this.other.device || this.seven_inch;

    // excludes 'other' devices and ipods, targeting touchscreen phones
    this.phone = this.apple.phone || this.android.phone || this.windows.phone;

    // excludes 7 inch devices, classifying as phone or tablet is left to the user
    this.tablet = this.apple.tablet || this.android.tablet || this.windows.tablet;

    if (typeof window === 'undefined') {
      return this;
    }
  };

  var instantiate = function instantiate() {
    var IM = new IsMobileClass();
    IM.Class = IsMobileClass;
    return IM;
  };

  var isMobile = instantiate();
  // END isMobile.js

  var objectProto = Object.prototype;
  var toString = objectProto.toString;
  var noop = function noop() {};

  var metricApi = {
    metrics: {},
    addMetric: noop,
    getMetricById: noop,
    getMetricsByType: noop,
    getMetricTypes: noop
  };

  function isFunction(object) {
    return toString.call(object) === '[object Function]';
  }

  function isObject(object) {
    var type = typeof object;
    return type === 'function' || type === 'object' && !!object;
  }

  function getURLParam(name) {
    var paramName = name.replace(/[\[]/, '\\\[').replace(/[\]]/, '\\\]');
    var regexS = '[\\?&]' + paramName + '=([^&#]*)';
    var regex = new RegExp(regexS);
    if (document.location.search) {
      var results = regex.exec(document.location.search);
      if (results) {
        return results[1];
      }
      return '';
    }
    return '';
  }

  function readCookie(name) {
    var lsSupport = false;
    var data = null;
    // Check for native support
    if (localStorage) {
      lsSupport = true;
    }

    // No value supplied, return value
    if (typeof value === 'undefined') {
      // Get value
      if (lsSupport) { // Native support
        data = localStorage.getItem(name);
      }
      if (!lsSupport || data === null) { // Use cookie
        data = readTheCookie(name);
      }

      // Try to parse JSON...
      try {
        data = JSON.parse(data);
      } catch (e) {
        // Do Nothing
      }
    }
    return data;
    function readTheCookie(key) {
      if (!document.cookie) {
        // there is no cookie, so go no further
        return null;
      }  // there is a cookie
      var ca = document.cookie.split(';');
      var nameEQ = key + '=';
      for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) === ' ') {
          // delete spaces
          c = c.substring(1, c.length);
        }
        if (c.indexOf(nameEQ) === 0) {
          return c.substring(nameEQ.length, c.length);
        }
      }
      return null;
    }
  }

  function getViewport() {
    var viewportWidth;
    var viewportHeight;
    if (typeof window.innerWidth !== 'undefined') {
      viewportWidth = window.innerWidth;
      viewportHeight = window.innerHeight;
    } else if (typeof document.documentElement !== 'undefined' && typeof document.documentElement.clientWidth !== 'undefined' && document.documentElement.clientWidth !== 0) {
      viewportWidth = document.documentElement.clientWidth;
      viewportHeight = document.documentElement.clientHeight;
    } else {
      viewportWidth = document.getElementsByTagName('body')[0].clientWidth;
      viewportHeight = document.getElementsByTagName('body')[0].clientHeight;
    }
    return [viewportWidth, viewportHeight];
  }

  var log = noop;
  var logTime = noop;
  var logTimeEnd = noop;

  if (isObject(window.console) && isFunction(window.console.log) && getURLParam('debug') === 'true') {
    log = function logFunction(/* arguments */) {
      var args = ['[AdFuelModule - ' + MODULE_NAME + ' ' + MODULE_VERSION + ']'];
      args.push.apply(args, arguments);
      window.console.log.apply(window.console, args);
    };
    logTime = function logTimeFunction(/* arguments */) {
      var args = ['[AdFuelModule - ' + MODULE_NAME + ' ' + MODULE_VERSION + ' TIMER] '];
      args.push.apply(args, arguments);
      var timeKey = args.join('');
      window.console.time(timeKey);
    };
    logTimeEnd = function logTimeEndFunction(/* arguments */) {
      var args = ['[AdFuelModule - ' + MODULE_NAME + ' ' + MODULE_VERSION + ' TIMER] '];
      args.push.apply(args, arguments);
      var timeKey = args.join('');
      window.console.timeEnd(timeKey);
    };
  }

  var countryCode = (readCookie('CG') ? readCookie('CG').substr(0, 2) : '') || readCookie('countryCode');
  var selectedEdition = readCookie('SelectedEdition') ? readCookie('SelectedEdition') : 'www';
  var parser = document.createElement('a');
  parser.href = document.location.href;

  var hostname = parser.hostname;
  var pathname = parser.pathname;

  var isIntl = false;

  if (hostname.search(/^(.*)?(edition|arabic)\./) >= 0) {
    log('Full international site.');
    isIntl = true;
  } else if (hostname.search(/^(.*)?money/) >= 0 && pathname === '/' && selectedEdition === 'edition') {
    log('International CNN Money Homepage. Using International PubId.');
    isIntl = true;
  } else if (countryCode === '' || countryCode === null) {
    if (hostname.search(/^(.*)?(cnnespanol|cnne\-test)\./) >= 0) {
      log('No country code. Using International PubId.');
      isIntl = true;
    }
  } else if (countryCode !== 'US' && countryCode !== 'CA') {
    if (hostname.search(/^(.*)?(money|cnnespanol|cnne\-test|www\.cnn)\./) >= 0) {
      log('International country code. Using International PubId.');
      isIntl = true;
    }
  }

  var PREBID_TIMEOUT = 750;

  var DOMESTIC_BIDDERS = ['rubicon', 'appnexus'];
  var INTL_BIDDERS = ['appnexus', 'pangaea', 'rubicon'];

  var DOMESTIC_ACCOUNT_IDS = {
    rubicon: '11078',
    appnexus: '7745'
  };

  var INTL_ACCOUNT_IDS = {
    rubicon: '11016',
    appnexus: '8353',
    pangaea: '8613'
  };

  var RUBICON_ACCOUNT_ID = isIntl ? INTL_ACCOUNT_IDS.rubicon : DOMESTIC_ACCOUNT_IDS.rubicon;
  var APPNEXUS_ACCOUNT_ID = isIntl ? INTL_ACCOUNT_IDS.appnexus : DOMESTIC_ACCOUNT_IDS.appnexus;
  var PANGAEA_ACCOUNT_ID = INTL_ACCOUNT_IDS.pangaea;

  var RUBICON_DOM_DESKTOP_SITE_ID = 26788;
  var RUBICON_INTL_DESKTOP_SITE_ID = 78598;

  var RUBICON_DOM_MOBILE_SITE_ID = 60764;
  var RUBICON_INTL_MOBILE_SITE_ID = 78600;

  var RUBICON_SIZE_MAPPING = {
    '728x90': 2,
    '160x600': 9,
    '300x600': 10,
    '300x250': 15,
    '320x50': 43,
    '970x90': 55,
    '970x250': 57
  };

  var RUBICON_DOM_DESKTOP_HP_ZONE_MAPPING = {
    'atf': 108112,
    'btf': 149880
  };

  var RUBICON_DOM_DESKTOP_ROS_ZONE_MAPPING = {
    'atf': 149876,
    'btf': 149878
  };

  var RUBICON_DOM_MOBILE_ZONE_MAPPING = {
    'atf': 289858,
    'btf': 289858
  };

  var RUBICON_INTL_DESKTOP_HP_ZONE_MAPPING = {
    'atf': 369880,
    'btf': 455720
  };

  var RUBICON_INTL_DESKTOP_ROS_ZONE_MAPPING = {
    'atf': 455740,
    'btf': 455710
  };

  var RUBICON_INTL_MOBILE_ZONE_MAPPING = {
    'atf': 369882,
    'btf': 369882
  };

  function preQueueCallback(asset, done) {
    logTime('Prebid AdUnit Building');
    // Only sizes in this array will be sent in the request to Amazon.
    var validSizes = [ '160x600', '300x250', '300x600', '320x50', '728x90', '970x90', '970x250' ];
    // Only slot id with any of the following slot types will be included in the request to A9.
    // var invalidMappings = [ '_ns_', '_nfs_' ];
    var validMappings = [ '_bnr_', '_rect_', '_sky_' ];
    // Any slot with any of the following ad unit segments in the slot ad unit will be excluded from the request to A9.
    var invalidAdUnitSegments = [ 'super-ad-zone', 'super_ad_zone' ];
    var browser = getViewport();
    log('Browser Dimensions: ', browser);
    var adUnits = [];
    log('Asset: ', asset);
    for (var x = 1; x < asset.length; x++) {
      var invCodeArray = asset[x].rktr_ad_id.split('/');
      var invCode = invCodeArray[0].toLowerCase() + (invCodeArray[1] ? '_' + invCodeArray[1].toLowerCase() : '');
      var adUnitMock = {
        code: '',               // Div Id
        mediaTypes: {
          banner: {           // Always banner
            sizes: []      // Array of sizes
          }
        },
        bids: []                // Array of bid mocks
      };
      var bidMocks = {
        rubicon: {
          bidder: 'rubicon',                          // Fastlane (US and EU) and AppNexus (EU ONLY)
          params: {
            accountId: RUBICON_ACCOUNT_ID,          // Toggle based on location
            siteId: 26792,                          // Get From Mapping
            zoneId: 231942,                         // Get From Mapping
            position: 'btf'                        // Parse from Div Id
            // sizes: [2, 57],                         // Optional - Get From Mapping
            // keywords: [],                           // Optional - Get From External Source
            // inventory: [],                          // Optional - Get From External Source
            // visitor: { "search": ["iphone"]},       // Optional - Get From External Source
            // userId: '',                             // Optional - Get From External Source
            // floor: 0.50                             // Optional
          }
        },
        appnexus: {
          bidder: 'appnexus',
          params: {
            // placementId: asset.rktr_ad_id,          // Optional
            // allowSmallerSizes: false,               // Optional
            // keywords: { genre: ['rock', 'pop'] },   // Optional - Get From External Source
            invCode: invCode,                          // Top 3 Ad Unit levels
            member: APPNEXUS_ACCOUNT_ID               // Supplied from AppNexus
            // reserve: 0.90                           // Optional (Sets floor price)
          }
        },
        pangaea: {
          bidder: 'pangaea',
          params: {
            // placementId: asset.rktr_ad_id,          // Optional
            // allowSmallerSizes: false,               // Optional
            // keywords: { genre: ['rock', 'pop'] },   // Optional - Get From External Source
            invCode: invCode,                          // Top 3 Ad Unit levels
            member: PANGAEA_ACCOUNT_ID                 // Supplied from AppNexus
            // reserve: 0.90                           // Optional (Sets floor price)
          }
        }
      };
      log('Checking slot and sizes for validity: ', asset[x].rktr_slot_id || 'N/A');
      var responsiveSizes = [];
      var isValid = true;
      var viewportChecked = false;
      for (var viewportId = 0; viewportId < asset[x].responsive.length; viewportId++) {
        var viewport = asset[x].responsive[viewportId];
        if (!viewportChecked) log('Checking For Responsive Viewport: ', viewport[0].join('x'));
        if (!viewportChecked && viewport[0][0] < browser[0] && viewport[0][1] < browser[1]) {
          log('Match found.');
          viewportChecked = true;
          responsiveSizes = viewport[1];
          if (viewport[1][0] === 'suppress' || responsiveSizes === 'suppress') {
            log('Slot is responsive and being suppressed.  Filtering slot.');
            isValid = false;
          }
        }
      }
      if (responsiveSizes.length > 0 && isValid) {
        log('Slot is responsive and not being suppressed.  Using responsive sizes: ', responsiveSizes);
        asset[x].sizes = responsiveSizes;
      }
      log('Is Valid: ', isValid);
      if (isValid) {
        for (var y = 0; y < asset[x].sizes.length; y++) {
          var size = asset[x].sizes[y].join('x');
          if (validSizes.indexOf(size) < 0) {
            log('Filtering out Invalid Size: ', size);
            asset[x].sizes.splice(y, 1);
            y = y - 1;
          }
        }
        if (asset[x].sizes.length === 0) {
          log('No Valid Sizes: ', asset[x].sizes);
          isValid = false;
        }
        // for (var invalidMapping in invalidMappings) {
        //   if (asset[x].rktr_slot_id.indexOf(invalidMappings[invalidMapping]) >= 0) {
        //     log('Filtering out invalid slot type: ', invalidMappings[invalidMapping], asset[x]);
        //     isValid = false;
        //   }
        // }
        log('Filtering for valid slot type: ', asset[x]);
        for (var validMapping in validMappings) {
          if (asset[x].rktr_slot_id.indexOf(validMappings[validMapping]) >= 0) {
            log('Valid slot type: ', validMappings[validMapping], asset[x]);
            isValid = true;
            break;
          }
          else {
            isValid = false;
          }
        }
        for (var invalidAdUnitSegment in invalidAdUnitSegments) {
          if (asset[x].rktr_ad_id.indexOf(invalidAdUnitSegments[invalidAdUnitSegment]) >= 0) {
            log('Filtering out invalid ad unit segment: ', invalidAdUnitSegments[invalidAdUnitSegment], asset[x]);
            isValid = false;
          }
        }
        log('Is Still Valid: ', isValid);
        if (isValid) {
          log('Yep... It\'s really still valid.');
          var sizeMapArray = [];
          log('Sizes: ', asset[x].sizes, asset[x].sizes.length);

          for (var sIndex = 0; sIndex < asset[x].sizes.length; sIndex++) {
            sizeMapArray.push(RUBICON_SIZE_MAPPING[asset[x].sizes[sIndex].join('x')]);
          }

          var posValue = '';
          var position = 'atf';

          var slotTargets = asset[x].targeting || [];
          log('slotTargets: ', slotTargets);

          for (var tIndex = 0; tIndex < slotTargets.length; tIndex++) {
            var target = slotTargets[tIndex];
            log('target: ', target);
            if (target[0] === 'pos') {
              log('yep... it\'s pos.');
              if (Array.isArray(target[1])) {
                log('yep... it\'s an array.');
                log('Setting POS for ' + asset[x].rktr_slot_id, target[1][0]);
                posValue = target[1][0];
                position = target[1][0].split('_')[1];
              } else {
                log('nope... not an array.');
                log('Setting POS for ' + asset[x].rktr_slot_id, target[1]);
                posValue = target[1];
                position = target[1].split('_')[1];
              }
            }
          }
          log('pos: ', posValue);
          log('position: ', position);

          var isHomepage = asset[x].rktr_ad_id.indexOf('/homepage') >= 0;
          log('Is Homepage: ', isHomepage);

          adUnitMock.code = asset[x].originalElementId || asset[x].rktr_slot_id;
          adUnitMock.mediaTypes.banner.sizes = asset[x].sizes;

          log('Starting AdUnitMock: ', JSON.parse(JSON.stringify(adUnitMock)));
          log('isIntl: ', isIntl);
          if (isIntl) {
            for (var ibIndex = 0; ibIndex < INTL_BIDDERS.length; ibIndex++) {
              log('ibIndex: ', ibIndex);
              var intlBidder = INTL_BIDDERS[ibIndex];
              log('bidder: ', intlBidder);
              var intlBidMock = bidMocks[intlBidder];
              switch (intlBidder) {
              case 'appnexus':
                intlBidMock.params.invCode = invCode + '_' + posValue;
                break;
              case 'pangaea':
                intlBidMock.params.invCode = invCode + '_' + posValue;
                break;
              case 'rubicon':
              intlBidMock.params.siteId = isMobile.any ? RUBICON_INTL_MOBILE_SITE_ID : RUBICON_INTL_DESKTOP_SITE_ID;
                if (isMobile.any) {
                  intlBidMock.params.zoneId = RUBICON_INTL_MOBILE_ZONE_MAPPING[position];
                } else {
                  intlBidMock.params.zoneId = isHomepage ? RUBICON_INTL_DESKTOP_HP_ZONE_MAPPING[position] : RUBICON_INTL_DESKTOP_ROS_ZONE_MAPPING[position];
                }
                intlBidMock.params.position = position;
                // intlBidMock.params.sizes = sizeMapArray;
                break;
              default:
                break;
              }
              log('Intl Bid Mock: ', intlBidMock);
              adUnitMock.bids.push(intlBidMock);
            }
          } else {
            log('domestic bidders: ', DOMESTIC_BIDDERS, DOMESTIC_BIDDERS.length);
            for (var dbIndex = 0; dbIndex < DOMESTIC_BIDDERS.length; dbIndex++) {
              log('dbIndex: ', dbIndex);
              var domBidder = DOMESTIC_BIDDERS[dbIndex];
              log('bidder: ', domBidder);
              var domBidMock = bidMocks[domBidder];
              log('starting bidMock: ', JSON.parse(JSON.stringify(domBidMock)));
              switch (domBidder) {
              case 'appnexus':
                domBidMock.params.invCode = invCode + '_' + posValue;
                break;
              case 'rubicon':
                domBidMock.params.siteId = isMobile.any ? RUBICON_DOM_MOBILE_SITE_ID : RUBICON_DOM_DESKTOP_SITE_ID;
                if (isMobile.any) {
                  domBidMock.params.zoneId = RUBICON_DOM_MOBILE_ZONE_MAPPING[position];
                } else {
                  domBidMock.params.zoneId = isHomepage ? RUBICON_DOM_DESKTOP_HP_ZONE_MAPPING[position] : RUBICON_DOM_DESKTOP_ROS_ZONE_MAPPING[position];
                }
                domBidMock.params.position = position;
                // domBidMock.params.sizes = sizeMapArray;
                break;
              default:
                break;
              }
              log('ending bidMock: ', JSON.parse(JSON.stringify(domBidMock)));
              adUnitMock.bids.push(domBidMock);
            }
          }
          log('Ending AdUnitMock: ', JSON.parse(JSON.stringify(adUnitMock)));
          adUnits.push(adUnitMock);
        }
      }
    }
    logTimeEnd('Prebid AdUnit Building');
    log('Final Ad Units: ', adUnits);
    var callbackExecuted = false;
    function pbQueueFunction() {
      log('Adding Ad Units...');
      window.pbjs.addAdUnits(adUnits);
      log('Aliasing Bidder for Pangaea...');
      window.pbjs.aliasBidder('appnexus', 'pangaea');
      log('Requesting Bids...');
      logTime('Requesting Bids...');
      function bidsBackHandlerFunc(bids) {
        log('Bids: ', bids);
        logTimeEnd('Requesting Bids...');
        clearTimeout(window.fallbackTimeout);
        if (!callbackExecuted) {
          callbackExecuted = true;
          done();
        }
      }
      window.pbjs.requestBids({
        bidsBackHandler: bidsBackHandlerFunc
      });
      window.fallbackTimeout = setTimeout(function timeoutFunc() {
        clearTimeout(window.fallbackTimeout);
        if (!callbackExecuted) {
          log('Timed out...');
          callbackExecuted = true;
          done();
        }
      }, PREBID_TIMEOUT);
    }
    if (adUnits.length > 0) {
      window.pbjs.que.push(pbQueueFunction);
    }
  }

  function preDispatchCallback(asset, done) {
    function innerFunc() {
      if (asset[0].rktr_slot_id.indexOf('_mod_') <= 0) {
        log('Page Slots: ', Object.keys(window.AdFuel.pageSlots));
        window.pbjs.setTargetingForGPTAsync();
      }
      done();
    }
    window.googletag.cmd.push(innerFunc);
  }

  function setGeoTargeting() {
    log('Setting GeoTargeting... ', countryCode);
    function setGeoTarget() {
      log('Setting Prebid Geo Target: ', isIntl ? 'EU' : 'US');
      window.AdFuel.addPageLevelTarget('hbg', isIntl ? 'EU' : 'US');
    }
    window.googletag.cmd.push(setGeoTarget);
  }

  function registerModuleWithAdFuel() {
    log('Registering ' + MODULE_NAME + ' module with AdFuel');
    window.AdFuel.setOptions({
      queueCallbackTimeoutInMilliseconds: 800
    });
    metricApi = window.AdFuel.registerModule(MODULE_NAME, {
      preQueueCallback: preQueueCallback,
      preDispatchCallback: preDispatchCallback
    }) || metricApi;
  }

  function configurePrebidLibrary() {
    window.pbjs = window.pbjs || {};
    window.pbjs.que = window.pbjs.que || [];
    var priceBuckets = {
      buckets: [{
        'precision': 2,
        'min': 0,
        'max': 5,
        'increment': 0.01
      }, {
        'precision': 2,
        'min': 5,
        'max': 30,
        'increment': 0.05
      }, {
        'precision': 2,
        'min': 30,
        'max': 50,
        'increment': 1.00
      }]
    };
    var innerFunc = function innerFunc() {
      window.pbjs.setConfig({
        consentManagement: {
          cmpApi: 'iab',
          timeout: 100,
          allowAuctionWithoutConsent: false
        },
        priceGranularity: priceBuckets,
        enableSendAllBids: true,
        bidderTimeout: PREBID_TIMEOUT
      });
      log('Prebid Config: ', {
        consentManagement: {
          cmpApi: 'iab',
          timeout: 100,
          allowAuctionWithoutConsent: false
        },
        priceGranularity: priceBuckets,
        enableSendAllBids: sendAllBids,
        bidderTimeout: PREBID_TIMEOUT
      });
      if (!isIntl) {
        window.pbjs.bidderSettings = {
          rubicon: {
            alwaysUseBid: true,
            adserverTargeting: [{
              key: 'hb_db_rubicon',
              val: function valFunc(bidResponse) {
                var keyvalue;
                if (bidResponse.adserverTargeting && bidResponse.adserverTargeting.rpfl_11078) {
                  keyvalue = bidResponse.adserverTargeting.rpfl_11078;
                } else if (bidResponse.rubiconTargeting && bidResponse.rubiconTargeting.rpfl_11078) {
                  keyvalue = bidResponse.rubiconTargeting.rpfl_11078;
                } else {
                  return keyvalue;
                }
                var dealTier = keyvalue.substring(keyvalue.indexOf('_') + 1);
                return dealTier;
              }
            }]
          }
        };
      }
      setGeoTargeting();
    };
    window.pbjs.que.push(innerFunc);
    if (!document.getElementById('PrebidScript')){
      var a = document;
      var b = a.createElement('script');
      var c = a.getElementsByTagName('script')[0];
      b.type = 'text/javascript';
      b.id = "PrebidScript";
      b.src = '//i.cdn.turner.com/ads/adfuel/modules/prebid-1.23.0.js';
      c.parentNode.insertBefore(b, c);
    }
    var timeoutOverride = getURLParam('mdt');
    if (timeoutOverride) {
      PREBID_TIMEOUT = timeoutOverride;
      log('Overriding Max Duration Time: ', PREBID_TIMEOUT);
    }
  }

  function init() {
    configurePrebidLibrary();
    if (window.AdFuel && window.AdFuel.cmd) {
      // AdFuel loaded first
      window.AdFuel.cmd.push(registerModuleWithAdFuel);
    } else if (window.AdFuel) {
      registerModuleWithAdFuel();
    } else {
      // wait for AdFuel to load
      if (document.addEventListener) {
        document.addEventListener('AdFuelCreated', registerModuleWithAdFuel, true);
      }
      if (document.attachEvent) {
        document.attachEvent('onAdFuelCreated', registerModuleWithAdFuel);
      }
    }
  }

  log('Initializing ' + MODULE_NAME + ' Module...');
  init();
})();


////////////////////////////////////////////
//Amazon-Video 1.0
////////////////////////////////////////////

/*! Amazon Video Module
  - Initial Implementation
*/
window.AmazonDirectMatchBuy = (function CreateAmazonModule() {

    var arrayProto = Array.prototype;
    var objectProto = Object.prototype;

    var hasOwnProperty = objectProto.hasOwnProperty;
    var slice = arrayProto.slice;
    var toString = objectProto.toString;

    function hasOwn(object, key) {
        return object != null && hasOwnProperty.call(object, key);
    }

    function isFunction(object) {
        return toString.call(object) === '[object Function]';
    }

    function isObject(object) {
        var type = typeof object;
        return type === 'function' || type === 'object' && !!object;
    }

    function once(fn) {
        return function() {
            if (fn) {
                fn.apply(this, arguments);
                fn = null;
            }
        };
    }

    function getURLParam(name) {
        name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
        var regexS = "[\\?&]" + name + "=([^&#]*)";
        var regex = new RegExp(regexS);
        if (document.location.search) {
            var results = regex.exec(document.location.search);
            if (results) {
                return results[1];
            } else {
                return "";
            }
        } else {
            return "";
        }
    }

    var log = function() {}; //noop

    if (isObject(window.console) && isFunction(window.console.log) && getURLParam("debug") == "true") {
        log = function( /* arguments */ ) {
            var args = ['[AdFuelModule - Amazon Video]'];
            args.push.apply(args, arguments);
            window.console.log.apply(window.console, args);
        };
    }

    function readCookie(name) {
        
        var lsSupport = false;
        var data = null;
        // Check for native support
        if (localStorage) {
            lsSupport = true;
        }

        // No value supplied, return value
        if (typeof value === "undefined") {
            // Get value
            if (lsSupport) { // Native support
                data = localStorage.getItem(name);
            }
            if (!lsSupport || data === null) { // Use cookie
                data = readTheCookie(name);
            }

            // Try to parse JSON...
            try {
                data = JSON.parse(data);
            }
            catch(e) {
                data = data;
            }

            return data;

        }
        /**
         * Returns contents of cookie
         * @param  key       The key or identifier for the store
         */
        function readTheCookie(key) {
            if (!document.cookie) {
                // there is no cookie, so go no further
                return '';
            } else { // there is a cookie
                var ca = document.cookie.split(';');
                var nameEQ = name + "=";
                for (var i = 0; i < ca.length; i++) {
                    var c = ca[i];
                    while (c.charAt(0) == ' ') {
                        //delete spaces
                        c = c.substring(1, c.length);
                    }
                    if (c.indexOf(nameEQ) === 0) {
                        return c.substring(nameEQ.length, c.length);
                    }
                }
                return '';
            }
        }

    };
    var countryCode = (readCookie('CG') ? readCookie('CG').substr(0, 2) : '') || readCookie("countryCode");
    log("Country Code: ", countryCode);
    var hostname = window.location.hostname.toLowerCase();    
    var amznkey = '3159';
    if (countryCode == '' || countryCode == null){
        if (hostname.search(/^(edition|arabic|cnnespanol|cnne\-test)\./) >= 0){
            amznkey = '3288';
        }
    }else if (countryCode !== 'US' && countryCode !== 'CA'){
        if (hostname.search(/^(money|edition|arabic|cnnespanol|cnne\-test|www\.cnn)\./) >= 0){
            amznkey = '3288';
        }
    }

    var timeoutForGetAdsCallback = 1000; //1 second
    var initialized = false;

    function isAmazonApiAvailable() {
        return !!window.amznads;
    }

    function getTargetingData() {
        var data = {};

        if (isAmazonApiAvailable()) {
            data = window.amznads.getTargeting();
            if (!isObject(data)) {
                data = {};
            }
        }

        return data;
    }

    var keyMap = (function() {
        var map = {};

        function has(id) {
            return id in map;
        }

        function addKey(id, key) {
            if (!has(id)) {
                map[id] = [];
            }

            map[id].push(key);
        }

        function getKeys(id) {
            return has(id) ? slice.call(map[id]) : [];
        }

        function clearKeys(id) {
            if (has(id)) {
                map[id].length = 0;
                return true;
            }
            return false;
        }

        return ({
            has: has,
            clearKeys: clearKeys,
            getKeys: getKeys,
            addKey: addKey
        });
    }());

    function clearPreviousKeyValuePairs(player) {
        var playerId = player.getId();

        if (keyMap.has(playerId)) {
            var keys = keyMap.getKeys(playerId);
            if (keys.length) {
                log('clearing previous ad key-values: ' + keys.join(', '));

                for (var i = 0, endi = keys.length; i < endi; ++i) {
                    player.setAdKeyValue(keys[i], null);
                }

                keyMap.clearKeys(playerId);
            }
        }
    }

    function setAdKeyValue(player, key, value) {
        log('setting ad key-value: ' + key + ' = "' + value + '"');

        keyMap.addKey(player.getId(), key);
        player.setAdKeyValue(key, value);
    }

    function handleTargetingData(player) {
        var targeting = getTargetingData();

        // Clear previous key-value pairs.
        clearPreviousKeyValuePairs(player);

        // Set new key-value pairs.
        for (var key in targeting) {
            if (!hasOwn(targeting, key)) continue;

            var val = targeting[key];

            if (val instanceof Array) {
                // val = val.join(',');
                for (var i = 0, endi = val.length; i < endi; ++i) {
                    setAdKeyValue(player, val[i], "1");
                }
            } else {
                setAdKeyValue(player, key, val);
            }
        }
    }

    //this is only called by the CVP object
    function setAdKeyValuePairs(player) {
        if (player.getPlayerType() !== CVP.FLASH) return;

        log('setAdKeyValuePairs', player);
        handleTargetingData(player);
    }

    function refreshTargets(callback) {
        //remove amznslots

        if (!isAmazonApiAvailable()) {
            return (callback ? callback() : true);
        }

        var callbackWrapper = once(function() {
            //amazon has refreshed, update AdFuel targeting
            var targeting = window.amznads.getTargeting();
            return (callback ? callback() : true);
        });

        try {
            window.amznads.getAdsCallback(amznkey, callbackWrapper, timeoutForGetAdsCallback);
        } catch (e) {
            log('Exception thrown while requesting Amazon ads:', e);
            // manually execute callback if it hasn't run
            callbackWrapper();
        }
    }

    /* allows optional configuration:
      
        amznkey: Turner's Amazon key (default is '3159')
        timeout: duration in milliseconds for Amazon to call GetAdsCallback (default is 2000)
    */
    function init(config) {
        log('initializing', config);
        if (config) {
            //allow overrides
            amznkey = config.amznkey || amznkey;
            timeoutForGetAdsCallback = config.timeout || timeoutForGetAdsCallback;
        }
        initialized = true;
    }

    function requireInit(fn) {
        return function() {
            if (!initialized) {
                log('ERROR: init() must be called first!');
                return;
            }

            fn.apply(this, arguments);
        };
    }

    return ({
        requestAdRefresh: requireInit(refreshTargets),
        getTargetingData: requireInit(getTargetingData),
        setAdKeyValuePairs: requireInit(setAdKeyValuePairs),
        isAmazonApiAvailable: isAmazonApiAvailable,
        init: init
    });

}());
(function(callback) {
    var a = document,
        b = a.createElement("script"),
        c = a.getElementsByTagName("script")[0],
        d = /^(complete|loaded)$/,
        e = false;
    b.type = "text/javascript";
    b.async = true;
    b.src = (document.location.protocol === 'https:' ? 'https:' : 'http:') + '//c.amazon-adsystem.com/aax2/amzn_ads.js';
    b.onload = b.onreadystatechange = function() {
        if (!e && !(('readyState' in b) && d.test(b.readyState))) {
            b.onload = b.onreadystatechange = null;
            e = true;
            callback();
        }
    };
    if (window.amznads) {
        callback();
    } else {
        c.parentNode.insertBefore(b, c);
    }
})(function() {
    window.AmazonDirectMatchBuy.init();
});

////////////////////////////////////////////
//Beemray 1.0
////////////////////////////////////////////

(function createBeemrayAdFuelModule() {
  var MODULE_NAME = 'Beemray';
  var MODULE_VERSION = 'v1.0.1';
  var CUSTOMER_ID = 'cnn';
  var API_KEY = '39a34d8d-dd1d-4fbf-aa96-fdc5f0329451';

  var objectProto = Object.prototype;
  var toString = objectProto.toString;
  var scriptLoaded = false;

  function isFunction(object) {
    return toString.call(object) === '[object Function]';
  }

  function isObject(object) {
    var type = typeof object;
    return type === 'function' || type === 'object' && !!object;
  }

  function getURLParam(name) {
    var nameParam = name.replace(/[\[]/, '\\\[').replace(/[\]]/, '\\\]');
    var regexS = '[\\?&]' + nameParam + '=([^&#]*)';
    var regex = new RegExp(regexS);
    if (document.location.search) {
      var results = regex.exec(document.location.search);
      if (results) {
        return results[1];
      }
      return '';
    }
    return '';
  }

  function readCookie(name) {
    var lsSupport = false;
    var data = null;
    // Check for native support
    if (localStorage) {
      lsSupport = true;
    }

    // No value supplied, return value
    if (typeof value === 'undefined') {
      // Get value
      if (lsSupport) { // Native support
        data = localStorage.getItem(name);
      }
      if (!lsSupport || data === null) { // Use cookie
        data = readTheCookie(name);
      }

      // Try to parse JSON...
      try {
        data = JSON.parse(data);
      } catch (e) {
        // Do nothing
      }
    }
    return data;

    function readTheCookie(key) {
      if (!document.cookie) {
        // there is no cookie, so go no further
        return null;
      }  // there is a cookie
      var ca = document.cookie.split(';');
      var nameEQ = key + '=';
      for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) === ' ') {
          // delete spaces
          c = c.substring(1, c.length);
        }
        if (c.indexOf(nameEQ) === 0) {
          return c.substring(nameEQ.length, c.length);
        }
      }
      return null;
    }
  }

  var log = function noop() {}; // noop
  // var error = function() {}; //noop

  if (isObject(window.console) && isFunction(window.console.log) && getURLParam('debug') === 'true') {
    log = function _logFunc(/* arguments */) {
      var args = ['[AdFuelModule - ' + MODULE_NAME + ' ' + MODULE_VERSION + ']'];
      args.push.apply(args, arguments);
      window.console.log.apply(window.console, args);
    };
  }

  function includeBeemrayModule() {
    if (!scriptLoaded) {
      log('Including Beemray Library...');
      scriptLoaded = true;
      var source = 'https://' + CUSTOMER_ID + '.sdk.beemray.com/content/websdk/' + API_KEY + '?source=' + window.btoa(window.location.href);
      log('Script source: ', source);
      var script = document.createElement('script');
      script.src = source;
      document.head.appendChild(script);
    }
  }

  function preQueueCallback(asset, callback) {
    window.googletag.cmd.push(function _beemrayPreQueue() {
      var eventTitle = 'dfpEvent';
      var endPointUrl = '/rest/event/web/plain';
      var event = window.beemray.EventApi.create(eventTitle, endPointUrl);
      var timeout = 1000;
      var eventFunc = function _eventFunc(response) {
        log('Response: ', response);
        if (response === null) {
          callback();
          return log('Request Timeout or no Results.');
        }
        var targetIds = [];
        for (var i = 0; i < response.list.length; i++) {
          log('Adding Page-Level Target ID: ', response.list[i].id);
          targetIds.push(response.list[i].id);
        }
        for (var z = 0; z < response.stand.userPlaceInfo.state.length; z++) {
          log('Adding Page-Level State Name: ', response.stand.userPlaceInfo.state[z]);
          targetIds.push(response.stand.userPlaceInfo.state[z]);
        }
        log('Setting Beemray Page-Level Targets: ', targetIds);
        window.googletag.pubads().setTargeting('beemray', targetIds);
        callback();
        return null;
      };
      log('Sending Beemray WebAPI event...');
      event.send(eventFunc, timeout);
    });
  }

  function registerModuleWithAdFuel() {
    log('Registering Module...');
    window.AdFuel.registerModule('beemray', {
      preQueueCallback: preQueueCallback
    });
  }

  function init() {
    var countryCode = (readCookie('CG') ? readCookie('CG').substr(0, 2) : '') || readCookie('countryCode');
    var selectedEdition = readCookie('SelectedEdition') ? readCookie('SelectedEdition') : 'www';
    var parser = document.createElement('a');
    parser.href = document.location.href;

    var hostname = parser.hostname;

    if (hostname.search(/^(edition|arabic|cnnespanol|money).*\.cnn\.com$/) !== -1 || hostname === 'localhost') {
      if (hostname.search(/^(money).*\.cnn\.com$/) !== -1 && selectedEdition !== 'edition') {
        log('Disabling Beemray due to selected edition restrictions: ', selectedEdition);
        return;
      }
      if (hostname.search(/^(us|www|edition).*\.cnn\.com$/) !== -1 && (countryCode === 'US' || countryCode === 'CA')) {
        log('Disabling Beemray due to countryCode restrictions: ', countryCode);
        return;
      }
      log('Initializing Module...');
      includeBeemrayModule();
      if (window.AdFuel && window.AdFuel.cmd) {
        window.AdFuel.cmd.push(registerModuleWithAdFuel);
      } else if (window.AdFuel) {
        // AdFuel loaded first
        registerModuleWithAdFuel();
      } else {
        // wait for AdFuel to load
        if (document.addEventListener) {
          document.addEventListener('AdFuelCreated', registerModuleWithAdFuel, true);
        }
        if (document.attachEvent) {
          document.attachEvent('onAdFuelCreated', registerModuleWithAdFuel);
        }
      }
    } else {
      log('Disabling Beemray due to hostname restrictions: ', hostname);
    }
  }

  init();
})();




////////////////////////////////////////////
//GUID 1.1
////////////////////////////////////////////

/*!
 GUID AdFuel Module - Version 1.1
 - CSD-1129: Protocol-less url for GUID cookie
 !*/

//todo: may be privatized
window.cnnad_haveCookie = function(name) {
    return document.cookie && (document.cookie.indexOf("; " + name + "=") >= 0 || document.cookie.indexOf(name + "=") == 0);
};

//todo: may be privatized
window.cnnad_readCookie = function(name) {
    if (document.cookie) {
        var ca = document.cookie.split(';');
        var nameEQ = name + "=";
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1, c.length); //delete spaces
            }
            if (c.indexOf(nameEQ) == 0) {
                return c.substring(nameEQ.length, c.length);
            }
        }
        return null;
    }
};

//used by freewheel helper
window.turner_getGuid = function() {
    return window.cnnad_readCookie("ug");
};

(function cnnad_ugsync() {

    var objectProto = Object.prototype;
    var toString = objectProto.toString;

    function isFunction(object) {
        return toString.call(object) === '[object Function]';
    }

    function isObject(object) {
        var type = typeof object;
        return type === 'function' || type === 'object' && !!object;
    }

    function getURLParam(name) {
        name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
        var regexS = "[\\?&]" + name + "=([^&#]*)";
        var regex = new RegExp(regexS);
        if (document.location.search) {
            var results = regex.exec(document.location.search);
            if (results) {
                return results[1];
            } else {
                return "";
            }
        } else {
            return "";
        }
    }

    var log = function() {}; //noop

    if (isObject(window.console) && isFunction(window.console.log) && getURLParam("debug") == "true") {
        log = function( /* arguments */ ) {
            var args = ['[AdFuelModule - Guid]'];
            args.push.apply(args, arguments);
            window.console.log.apply(window.console, args);
        };
    }

    function processCookie() {

        function registerModuleWithAdFuel() {
            //todo: remove AdFuel.readCookie("ug") once everyone is on new ais.js
            var guid = window.turner_getGuid();

            log('setting guid targeting', {
                guid: guid
            });

            window.AdFuel.addPageLevelTarget('guid', guid);
        }

        if (window.AdFuel) {
            //AdFuel loaded first
            registerModuleWithAdFuel();
        } else {
            //wait for AdFuel to load
            if (document.addEventListener) {
                document.addEventListener('AdFuelCreated', registerModuleWithAdFuel, true);
            } else if (document.attachEvent) {
                document.attachEvent('onAdFuelCreated', registerModuleWithAdFuel);
            }
        }
    };

    if (window.cnnad_haveCookie('ugs')) {
        processCookie();
    } else {
        //execute script to set cookie
        var guid_url = "//www.ugdturner.com/xd.sjs";

        var a = document,
            b = a.createElement("script"),
            c = a.getElementsByTagName("script")[0],
            d = /^(complete|loaded)$/,
            e = false;

        b.type = "text/javascript";
        b.async = true;
        b.src = guid_url;

        b.onload = b.onreadystatechange = function() {
            if (!e && !(('readyState' in b) && d.test(b.readyState))) {
                b.onload = b.onreadystatechange = null;
                e = true;
                processCookie();
            }
        };

        c.parentNode.insertBefore(b, c);
    }

})();

////////////////////////////////////////////
//Integral Ad Science 1.2
////////////////////////////////////////////

/*!
    Integral Ad Science AdFuel Module - Version 1.2
!*/
(function createAdFuelModule() {

    'use strict';

    var objectProto = Object.prototype;
    var toString = objectProto.toString;
    var noop = function () {};

    var MODULE_NAME = 'Integral Ad Science';
    var MODULE_VERSION = 'v1.2.1';

    function isFunction(object) {
        return toString.call(object) === '[object Function]';
    }

    function isObject(object) {
        var type = typeof object;
        return type === 'function' || type === 'object' && !!object;
    }

    function getURLParam(name) {
        name = name.replace(/[\[]/, '\\\[').replace(/[\]]/, '\\\]');
        var regexS = '[\\?&]' + name + '=([^&#]*)';
        var regex = new RegExp(regexS);
        if (document.location.search) {
            var results = regex.exec(document.location.search);
            if (results) {
                return results[1];
            } else {
                return '';
            }
        } else {
            return '';
        }
    }

    function readCookie(name) {
        if (!document.cookie) {
            // there is no cookie, so go no further
            return null;
        } else { // there is a cookie
            var ca = document.cookie.split(';');
            var nameEQ = name + '=';
            for (var i = 0; i < ca.length; i++) {
                var c = ca[i];
                while (c.charAt(0) === ' ') {
                    //delete spaces
                    c = c.substring(1, c.length);
                }
                if (c.indexOf(nameEQ) === 0) {
                    return c.substring(nameEQ.length, c.length);
                }
            }
            return null;
        }
    }

    var log = noop;
    var warnLog = noop;

    if (isObject(window.console) && isFunction(window.console.log) && getURLParam('debug') === 'true') {
        log = function (/* arguments */) {
            var args = ['[AdFuelModule - ' + MODULE_NAME + ' ' + MODULE_VERSION + ']'];
            args.push.apply(args, arguments);
            window.console.log.apply(window.console, args);
        };
        warnLog = function (/* arguments */) {
            var args = ['[AdFuelModule - ' + MODULE_NAME + ' ' + MODULE_VERSION + ']'];
            args.push.apply(args, arguments);
            window.console.warn.apply(window.console, args);
        };
    }
    var iasActive = false;
    var countryCode = readCookie('countryCode') ? readCookie('countryCode') : readCookie('CG') ? readCookie('CG').substr(0, 2) : '';
    var selectedEdition = readCookie('SelectedEdition') ? readCookie('SelectedEdition') : 'www';

    window.__iasPET = window.__iasPET || {};
    window.__iasPET.queue = window.__iasPET.queue || [];

    function iasDataHandler(adSlots) {
        log('IAS Data Handler...');
        log({adSlots: adSlots});
        window.__iasPET.setTargetingForGPT();
    }

    function preQueueCallback(asset, done) {
        var pubId = '928108';
        if(window.location.hostname.search(/^(.*)?money\.cnn/) >= 0 && selectedEdition === 'edition') {
            log('CNN$ International... using INTL Pub ID.')
            pubId = '925660';
        }else if (countryCode !== 'US' && countryCode !== 'CA' && countryCode !== '') {
            log('International based on countryCode... using INTL Pub ID.')
            pubId = '925660';
        }else if (window.location.hostname.search(/^(.*)?(edition|arabic|cnnespanol|cnne\-test)\./) >= 0) {
            log('International based on domain... using INTL Pub ID.')
            pubId = '925660';
        }
        log('Setting iasPET.pubId: ', pubId);
        window.__iasPET.pubId = pubId; // Set IAS publisher ID before pushing to the queue
        log('Building slots for IAS...');
        var adSlots = [];
        for (var x = 1; x < asset.length; x++) {
            if (asset[x].sizes.length === 0){ asset[x].sizes.push(["1","1"]); }
            log('Pushing Slot: ', {
                adSlotId: asset[x].rktr_slot_id,
                size: asset[x].sizes,
                adUnitPath: '/8663477/' + asset[x].rktr_ad_id
            });
            adSlots.push({
                adSlotId: asset[x].rktr_slot_id,
                size: asset[x].sizes,
                adUnitPath: '/8663477/' + asset[x].rktr_ad_id
            });
        }
        window.__iasPET.queue.push({
            adSlots: adSlots,
            dataHandler: iasDataHandler
        });
        setTimeout(function () {
            done();
        }, 900);
    }

    function preDispatchCallback(asset, done) {
        setTimeout(function () {
            log('Adding IAS Targeting to slots...');
            try{
                window.__iasPET.setTargetingForGPT();
            }catch(err) {
                warnLog('Could not set IAS targeting: ', err);
            }
            done();
        }, 900);
    }

    function registerModuleWithAdFuel() {
        if (iasActive) {
            log('Registering ' + MODULE_NAME + ' module with AdFuel');
            window.AdFuel.setOptions({
                queueCallbackTimeoutInMilliseconds: 1000,
                dispatchCallbackTimeoutInMilliseconds: 1000
            });
            window.AdFuel.registerModule(MODULE_NAME, {
                preQueueCallback: preQueueCallback,
                preDispatchCallback: preDispatchCallback
            });
        }
    }

    function addIASJavascript() {
        log('Adding IAS script to head...');
        var iasTag = document.createElement('script');
        iasTag.async = true;
        iasTag.src = '//cdn.adsafeprotected.com/iasPET.1.js';
        var targetNode = document.getElementsByTagName('head')[0];
        targetNode.insertBefore(iasTag, targetNode.firstChild);
        iasActive = true;
    }

    function init() {
        addIASJavascript();
        if (window.AdFuel && window.AdFuel.cmd) {
            //AdFuel loaded first
            window.AdFuel.cmd.push(registerModuleWithAdFuel);
        }else if (window.AdFuel) {
            registerModuleWithAdFuel();
        } else {
            //wait for AdFuel to load
            if (document.addEventListener) {
                document.addEventListener('AdFuelCreated', registerModuleWithAdFuel, true);
            } else if (document.attachEvent) {
                document.attachEvent('onAdFuelCreated', registerModuleWithAdFuel);
            }
        }
    }

    log('Initializing ' + MODULE_NAME + ' Module...');
    init();

})();


////////////////////////////////////////////
//Krux 1.2
////////////////////////////////////////////

/*
   <arguments>
        {
            "controlTag" : {
                "isRequired": false,
                "isBoolean": false,
                "defaultValue": ""
            }
        }
   </arguments>
*/
/*!
    Krux AdFuel Module - Version 1.2.2
    - PII Filtering
    - Fix for AdFuel-1.1.x
!*/
(function createKruxModule() {

    var re = /(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})/i;

    var MODULE_NAME = 'Krux';
    var MODULE_VERSION = '1.2.2';

    window.Krux || ((window.Krux = function () {window.Krux.q.push(arguments);}).q = []);
    (function () {
        function retrieve(n) {
            var k = 'kx' + '' + n, ls = (function () {
                try {
                    return window.localStorage;
                } catch(e) {
                    return null;
                }
            })();
            if (ls) {
                return ls[k] || '';
            } else if (navigator.cookieEnabled) {
                var m = document.cookie.match(k + '=([^;]*)');
                return (m && unescape(m[1])) || '';
            } else {
                return '';
            }
        }
        window.Krux.user = retrieve('user');
        window.Krux.segments = retrieve('segs') ? retrieve('segs').split(',') : [];
    })();


    window.krux_getDESegments = function () {
        var segmentString = '&kxid=';
        if (window.Krux.user) {
            segmentString += window.Krux.user;
        }
        segmentString += '&kxseg=' + window.kvs.join(',');
        return segmentString;
    };

    window.krux_getFWSegments = function () {
        return 'kxseg=' + window.Krux.segments.join(',kxseg=');
    };

    window.krux_getUser = function () {
        return window.Krux.user;
    };

    window.krux_getFWKeyValues = function (prefix, limit) {
        var segPrefix = prefix || '_fwu:386123:';
        var segLimit = limit || 35;
        var fwKVP = {};
        for (var x = 0; x < window.Krux.segments.length; x++) {
            if (x < segLimit) fwKVP[segPrefix + window.Krux.segments[x]] = 1;
        }
        return fwKVP;
    };

    function piiIsPresentInQueryString() {
        if (document.location.search) {
            var dirtyResults = document.location.search.search(re) + 1;
            var cleanResults;
            try{
                cleanResults = decodeURIComponent(document.location.search).search(re) + 1;
            }catch(err) {
                cleanResults = dirtyResults;
            }
            return dirtyResults || cleanResults;
        } else {
            return false;
        }
    }

    function piiIsPresentInHash() {
        if (document.location.hash) {
            var dirtyResults = document.location.hash.search(re) + 1;
            var cleanResults;
            try{
                cleanResults = decodeURIComponent(document.location.hash).search(re) + 1;
            }catch(err) {
                cleanResults = dirtyResults;
            }
            return dirtyResults || cleanResults;
        } else {
            return false;
        }
    }

    function piiIsPresentInReferrer() {
        if (document.referrer) {
            var dirtyResults = document.referrer.search(re) + 1;
            var cleanResults;
            try{
                cleanResults = decodeURIComponent(document.location.referrer).search(re) + 1;
            }catch(err) {
                cleanResults = dirtyResults;
            }
            return dirtyResults || cleanResults;
        } else {
            return false;
        }
    }

    window.Krux.setControlTag = function (controlTagId) {

        var objectProto = Object.prototype;
        var toString = objectProto.toString;

        function isFunction(object) {
            return toString.call(object) === '[object Function]';
        }

        function isObject(object) {
            var type = typeof object;
            return type === 'function' || type === 'object' && !!object;
        }

        function getURLParam(name) {
            name = name.replace(/[\[]/, '\\\[').replace(/[\]]/, '\\\]');
            var regexS = '[\\?&]' + name + '=([^&#]*)';
            var regex = new RegExp(regexS);
            if (document.location.search) {
                var results = regex.exec(document.location.search);
                if (results) {
                    return results[1];
                } else {
                    return '';
                }
            } else {
                return '';
            }
        }

        var log = function () {}; //noop

        if (isObject(window.console) && isFunction(window.console.log) && getURLParam('debug') === 'true') {
            log = function (/* arguments */) {
                var args = ['[AdFuelModule - ' + MODULE_NAME + ' ' + MODULE_VERSION + ']'];
                args.push.apply(args, arguments);
                window.console.log.apply(window.console, args);
            };
        }

        function processCookie() {

            var noop = function () {return false;};
            var metricApi = { addMetric: noop, getMetricById: noop, getMetricsByType: noop, getMetricTypes: noop };

            function registerModuleWithAdFuel() {
                var kuid = window.Krux.user;
                var ksg = window.Krux.segments.filter(function (segment, index) {
                    return index < 35;
                });

                log('setting krux targeting', {kuid: kuid, ksg: ksg});
                metricApi = window.AdFuel.registerModule('Krux', {}) || metricApi;
                window.AdFuel.addPageLevelTarget('kuid', kuid);
                window.AdFuel.addPageLevelTarget('ksg', ksg);
                metricApi.addMetric({type: 'modules', id: 'Krux', data: { targeting: { kuid: kuid, ksg: ksg } } });
            }

            if (window.AdFuel) {
                //AdFuel loaded first
                registerModuleWithAdFuel();
            } else {
                //wait for AdFuel to load
                if (document.addEventListener) {
                    document.addEventListener('AdFuelCreated', registerModuleWithAdFuel, true);
                } else if (document.attachEvent) {
                    document.attachEvent('onAdFuelCreated', registerModuleWithAdFuel);
                }
            }
        }

        //execute script to set cookie
        var a = document,
            b = a.createElement('script'),
            c = a.getElementsByTagName('script')[0],
            d = /^(complete|loaded)$/,
            e = false;

        b.type = 'text/javascript';
        b.async = true;

        var m, src = (m = a.location.href.match(/\bkxsrc=([^&]+)/)) && decodeURIComponent(m[1]);
        b.src = /^https?:\/\/([^\/]+\.)?krxd\.net(:\d{1,5})?\//i.test(src) ? src : src === 'disable' ? '' :
            (a.location.protocol === 'https:' ? 'https:' : 'http:') + '//cdn.krxd.net/controltag?confid=' + controlTagId;

        b.onload = b.onreadystatechange = function () {
            if (!e && !(('readyState' in b) && d.test(b.readyState))) {
                b.onload = b.onreadystatechange = null;
                e = true;
                processCookie();
            }
        };

        if (!piiIsPresentInHash() && !piiIsPresentInQueryString() && !piiIsPresentInReferrer()) {
            c.parentNode.insertBefore(b, c);
        }
    };

    //eslint-disable-next-line
    if ('IWzCuclz') {
        //set based on site
        var controlTag = window.location.hostname.toLowerCase().match(/^edition\.cnn\.com/) ? 'ITb_9Zup' : 'IWzCuclz';
        window.Krux.setControlTag(controlTag);
    }
})();


////////////////////////////////////////////
//PII Filter
////////////////////////////////////////////

/*!
    PII Filter AdFuel Module - Version 1.0
    - Compatible with AdFuel 1.x and AdFuel 2.x
    - Initial Implementation
!*/
(function createAdFuelModule() {

    var MODULE_NAME = "PII Filter";
    var re = /(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})/i;

    function piiIsPresentInQueryString() {
        var regex = new RegExp(re);
        if (document.location.search) {
            var dirtyResults = document.location.search.search(re) + 1;
            var cleanResults;
            try{
                cleanResults = decodeURIComponent(document.location.search).search(re) + 1;
            }catch(err){
                cleanResults = dirtyResults;
            }
            var results = { dirty: dirtyResults, clean: cleanResults };
            return dirtyResults || cleanResults;
        } else {
            return false;
        }
    }

    function piiIsPresentInHash() {
        var regex = new RegExp(re);
        if (document.location.hash) {
            var dirtyResults = document.location.hash.search(re) + 1;
            var cleanResults;
            try{
                cleanResults = decodeURIComponent(document.location.hash).search(re) + 1;
            }catch(err){
                cleanResults = dirtyResults;
            }
            var results = { dirty: dirtyResults, clean: cleanResults };
            return dirtyResults || cleanResults;
        } else {
            return false;
        }
    }

    function piiIsPresentInReferrer() {
        var regex = new RegExp(re);
        if (document.referrer){
            var dirtyResults = document.referrer.search(re) + 1;
            var cleanResults;
            try{
                cleanResults = decodeURIComponent(document.location.referrer).search(re) + 1;
            }catch(err){
                cleanResults = dirtyResults;
            }
            var results = { dirty: dirtyResults, clean: cleanResults };
            return dirtyResults || cleanResults;
        } else {
            return false;
        }
    }

    function filterDFPRequest(){
        if (piiIsPresentInQueryString() || piiIsPresentInHash() || piiIsPresentInReferrer()){
            console.log("[AdFuelModule - PII Filter] Filtering DFP Request due to PII in query string.");
            var AdFuelMethods = Object.getOwnPropertyNames(window.AdFuel);
            for (var x = 0; x < AdFuelMethods.length; x++){
                window.AdFuel[AdFuelMethods[x]] = function(){};
            }
            window.googletag = null;
        }
    }

    function init() {
        if (window.AdFuel) {
            //AdFuel loaded first
            filterDFPRequest();
        } else {
            //wait for AdFuel to load
            if (document.addEventListener) {
                document.addEventListener("AdFuelCreated", filterDFPRequest, true);
            } else if (document.attachEvent) {
                document.attachEvent('onAdFuelCreated', filterDFPRequest);
            }
        }
    }

    init();

})();


////////////////////////////////////////////
//Proximic 2.3
////////////////////////////////////////////

/*!
 Proximic AdFuel Module - Version 2.3.3
 - Removal of Proximic script after results are returned
 - Method to re-call Proximic for dynamic page loads
 - Clearing of Proximic data prior to re-calling Proximic
 - Addition of module on Explore Parts Unknown pages
    - /watch url
    - Any AdUnit with 'leaf'
 !*/
(function createProximicModule() {
    var loop_count = 0;
    var iteration_time = 50;
    var timeout = 2000;
    var location_url = document.location.href;
    if (window.location.hostname.toLowerCase().match(/^train\.next\.cnn\.com/)) {
        location_url.replace('train.next.', 'www');
    }
    var script_url = '//segment-data-us-east.zqtk.net/turner-47fcf6?url=' + encodeURIComponent(location_url);
    // var script_url = "//segment-data-us-east.zqtk.net/turner-47fcf6?url=" + encodeURIComponent('http://www.cnn.com/2016/02/17/entertainment/prince-passport-photo-feat/index.html');
    var segmentData = '';
    var objectProto = Object.prototype;
    var toString = objectProto.toString;
    var scriptAdded = false;
    function isFunction(object) {
        return toString.call(object) === '[object Function]';
    }

    function isObject(object) {
        var type = typeof object;
        return type === 'function' || type === 'object' && !!object;
    }

    function getURLParam(name) {
        name = name.replace(/[\[]/, '\\\[').replace(/[\]]/, '\\\]');
        var regexS = '[\\?&]' + name + '=([^&#]*)';
        var regex = new RegExp(regexS);
        if (document.location.search) {
            var results = regex.exec(document.location.search);
            if (results) {
                return results[1];
            } else {
                return '';
            }
        } else {
            return '';
        }
    }

    var log = function () {}; //noop

    if (isObject(window.console) && isFunction(window.console.log) && getURLParam('debug') === 'true') {
        log = function (/* arguments */) {
            var args = ['[AdFuelModule - Proximic/comScore]'];
            args.push.apply(args, arguments);
            window.console.log.apply(window.console, args);
        };
    }

    // sample response from js and format can be easily changed:
    window.gotSegmentData = function (data) {
        if (data.data) {
            log('Segment Data: ', data.data);
            segmentData = data.data;
            window.proximicData = data.data;
        } else if (data.errors) {
            log('Proximic returned with errors: ', data.errors);
            window.proximicData = data.errors;
            segmentData = data.errors;
        }
    };

    function recallProximic(url) {
        segmentData = '';
        window.proximicData = [];
        window.AdFuel.removePageLevelTarget('pconid');
        var location_url = url || document.location.href;
        if (window.location.hostname.toLowerCase().match(/^train\.next\.cnn\.com/)) {
            location_url.replace('train.next.', 'www');
        }
        script_url = '//segment-data-us-east.zqtk.net/turner-47fcf6?url=' + encodeURIComponent(location_url);
        delete document.getElementById('proximic-script');
        scriptAdded = false;
        addProximicScriptToHead();
        loop_count = 0;
        wait_for_data();
    }

    window.recallProximic = recallProximic;

    function addProximicScriptToHead() {
        if (!scriptAdded) {
            var prox = document.createElement('script');
            prox.id = 'proximic-script'
            prox.type = 'text/javascript';
            prox.async = true;
            prox.src = (document.location.protocol === 'https:' ? 'https:' : 'http:') + script_url;
            var node = document.getElementsByTagName('script')[0];
            node.parentNode.appendChild(prox);
            log('Added Proximic script to head of page.', script_url);
            scriptAdded = true;
        }
    }

    function call_dfp(dataForDFP, callback) {
        if (dataForDFP !== '' && typeof dataForDFP !== 'undefined') {
            log('Setting data for DFP', dataForDFP);
            window.AdFuel.addPageLevelTarget('pconid', dataForDFP);
            window.AdFuel.removePageLevelTarget('prx_to', '1');
            window.AdFuel.addPageLevelTarget('prx_to', '0');
            if(callback) callback();
        }
    }

    function checkEligibility(queue, callback) {
        var rktrAdId, x, money = true, epu = false;
        try {
            if (
                document.location.hostname.indexOf('money') >= 0 &&
                (!window.CNNMONEY ||
                    !window.CNNMONEY.adTargets ||
                    !window.CNNMONEY.adTargets.c_type || ['article', 'video', 'gallery'].indexOf(window.CNNMONEY.adTargets.c_type) < 0
                )
            ) {
                money = false;
            }
            for (x = 1; x < queue.length; x++) {
                rktrAdId = queue[x].rktr_ad_id.toLowerCase();
                epu = (document.location.hostname.indexOf('explorepartsunknown.com') >= 0 && rktrAdId.search(/(leaf)/) > 0);
                log('Is this page for ExplorePartsUnknown: ', epu);
                log('Should Proximic Be Included: ', (rktrAdId.search(/^cnn\/(homepage|(.+\/landing))/) < 0 && rktrAdId.search(/^cnni\/(homepage|(.+\/(landing|main)))/) < 0 && money) || epu);
                if ((rktrAdId.search(/^cnn\/(homepage|(.+\/landing))/) < 0 && rktrAdId.search(/^cnni\/(homepage|(.+\/(landing|main)))/) < 0 && money) || epu) {
                    log('Adding Proximic based on ad unit specifications: ', rktrAdId)
                    addProximicScriptToHead();
                    wait_for_data(callback);
                    break;
                }else{
                    log('Filtering Proximic based on ad unit specifications: ', rktrAdId)
                }
            }
        } catch (err) {
            log('Error parsing Proximic data: ', err.message || 'Unknown');
        }

    }

    function wait_for_data(callback) {
        log('Waiting for data...');
        setTimeout(function () {
            loop_count++;
            log('SegmentData: ', segmentData);
            if (window.proximicData !== '' && typeof window.proximicData !== 'undefined') {
                /* Call DFP with data */
                log('Proximic Data found!');
                call_dfp(window.proximicData, callback);
            } else if (loop_count * iteration_time < timeout) {
                wait_for_data(callback);
            } else {
                log('Proximic Timeout Occurred!');
                /* Timeout occurred, call DFP without data */
                window.AdFuel.addPageLevelTarget('prx_to', '1');
                if (callback) callback();
            }
        }, iteration_time);
    }

    function registerModuleWithAdFuel() {
        window.AdFuel.registerModule('Proximic', {
            postQueueCallback: checkEligibility
        });
        window.AdFuel.addPageLevelTarget('prx_to', '1');
        if (document.location.hostname.indexOf('explorepartsunknown.com') >= 0 && document.location.pathname === '/watch') {
            log('On https://explorepartsunknown.com/watch...');
            addProximicScriptToHead();
        }

    }

    function init() {
        if (window.AdFuel) {
            //AdFuel loaded first
            registerModuleWithAdFuel();
        } else {
            //wait for AdFuel to load
            if (document.addEventListener) {
                document.addEventListener('AdFuelCreated', registerModuleWithAdFuel, true);
            } else if (document.attachEvent) {
                document.attachEvent('onAdFuelCreated', registerModuleWithAdFuel);
            }
        }
    }

    init();

})();

////////////////////////////////////////////
//Sourcepoint Metrics 2.0
////////////////////////////////////////////

/*!
 SP Metrics AdFuel Module - Version 2.0
 - Compatible with AdFuel 2.x
 - Initial Implementation
 !*/
var addFunctionOnWindowLoad = function(callback){
    if(window.addEventListener){
        window.addEventListener('load',callback,false);
    }else{
        window.attachEvent('onload',callback);
    }
}

addFunctionOnWindowLoad(function () {

    var noop = function() {};

    var MODULE_NAME = "SP Metrics";

    function isFunction(object) {
        return toString.call(object) === '[object Function]';
    }

    function isObject(object) {
        var type = typeof object;
        return type === 'function' || type === 'object' && !!object;
    }

    function getURLParam(name) {
        name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
        var regexS = "[\\?&]" + name + "=([^&#]*)";
        var regex = new RegExp(regexS);
        if (document.location.search) {
            var results = regex.exec(document.location.search);
            if (results) {
                return results[1];
            } else {
                return "";
            }
        } else {
            return "";
        }
    }

    var log = noop;
    var errLog = noop;
    var warnLog = noop;
    var logTime = noop;
    var logTimeEnd = noop;

    if (isObject(window.console) && isFunction(window.console.log) && getURLParam("debug") == "true") {
        log = function( /* arguments */ ) {
            var args = ['[AdFuelModule - ' + MODULE_NAME + ']'];
            args.push.apply(args, arguments);
            window.console.log.apply(window.console, args);
        };
        warnLog = function(/* arguments */) {
            var args = ['[AdFuelModule - ' + MODULE_NAME + ' WARNING]']
        };
        errLog = function( /* arguments */ ) {
            var args = ['[AdFuelModule - ' + MODULE_NAME + ' ERROR]'];
            args.push.apply(args, arguments);
            window.console.error.apply(window.console, args);
        };
        logTime = function( /* arguments */ ) {
            var args = ['[AdFuelModule - ' + MODULE_NAME + ' TIMER] '];
            args.push.apply(args, arguments);
            var timeKey = args.join('');
            window.console.time(timeKey);
        };
        logTimeEnd = function( /* arguments */ ) {
            var args = ['[AdFuelModule - ' + MODULE_NAME + ' TIMER] '];
            args.push.apply(args, arguments);
            var timeKey = args.join('');
            window.console.timeEnd(timeKey);
        };
    }

    function init() {
        var fetchUrl = 'https://d1osssr1rvrv5b.cloudfront.net/imm.js';
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.onreadystatechange = function() {
            if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
                var el = document.createElement('html');
                el.innerHTML = xmlHttp.responseText;
                var details = el.getElementsByTagName('script')[0]; // Live NodeList of your anchor elements
                var script = document.createElement('script');
                script.src = details.src;
                script.async = details.async;
                script.type = details.type;
                for (dsVal in details.dataset) {
                    script.dataset[dsVal] = details.dataset[dsVal];
                }
                document.body.appendChild(script);
            }
        };
        xmlHttp.open("GET", fetchUrl, true); // true for asynchronous
        xmlHttp.send(null);
    }

    log("Initializing " + MODULE_NAME + " Module...");
    init();

});


////////////////////////////////////////////
//Transaction ID 2.0
////////////////////////////////////////////

/*!
 TransactionID AdFuel Module - Version 2.0
 - Implementation of MetricAPI returned from AdFuel when registering module
 !*/
(function createTransactionIDModule() {
    var noop = function(){return false;};
    var metricApi = { addMetric: noop, getMetricById: noop, getMetricsByType: noop, getMetricTypes: noop };

    window.cnnad_transactionID = null;

    //referenced by registries
    window.cnnad_getTransactionID = function () {
        if (!window.cnnad_transactionID) {
            window.cnnad_transactionID = Math.round((new Date()).getTime() / 1000) + '' + Math.floor(Math.random() * 9007199254740992);
        }
        return window.cnnad_transactionID;
    };

    window.turner_getTransactionId = window.cnnad_getTransactionID;

    window.turner_getTransactionId();


    function init() {

        var objectProto = Object.prototype;
        var toString = objectProto.toString;

        function isFunction(object) {
            return toString.call(object) === '[object Function]';
        }

        function isObject(object) {
            var type = typeof object;
            return type === 'function' || type === 'object' && !!object;
        }

        function getURLParam(name) {
            name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
            var regexS = "[\\?&]" + name + "=([^&#]*)";
            var regex = new RegExp(regexS);
            if (document.location.search) {
                var results = regex.exec(document.location.search);
                if (results) {
                    return results[1];
                } else {
                    return "";
                }
            } else {
                return "";
            }
        }

        var log = function () {
        }; //noop

        if (isObject(window.console) && isFunction(window.console.log) && getURLParam("debug") == "true") {
            log = function (/* arguments */) {
                var args = ['[AdFuelModule - TransactionId]'];
                args.push.apply(args, arguments);
                window.console.log.apply(window.console, args);
            };
        }

        function registerModuleWithAdfuel() {
            var transId = window.turner_getTransactionId();
            metricApi = AdFuel.registerModule('Transaction Id', {});
            metricApi.addMetric({type: 'modules', id: 'Transaction Id', data: { targeting: { transId: transId } } } );
            window.AdFuel.addPageLevelTarget('transId', transId);
        }

        if (window.AdFuel) {
            //AdFuel loaded first
            registerModuleWithAdfuel();
        } else {
            //wait for AdFuel to load
            if (document.addEventListener) {
                document.addEventListener('AdFuelCreated', registerModuleWithAdfuel, true);
            } else if (document.attachEvent) {
                document.attachEvent('onAdFuelCreated', registerModuleWithAdfuel);
            }
        }
    }

    init();
})();

