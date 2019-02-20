'use strict';
exports.handler = (event, context, callback) => {
    // Get contents of response
    const response = event.Records[0].cf.response;

    response.headers['Strict-Transport-Security'] = [{
      key: 'Strict-Transport-Security',
      value: "max-age=31536000; includeSubdomains"
    }];
    response.headers['X-Frame-Options'] = [{
      key: 'X-Frame-Options',
      value: "SAMEORIGIN"
    }];
    response.headers['X-Content-Type-Options'] = [{
      key: 'X-Content-Type-Options',
      value: "nosniff"
    }];
    response.headers['Referrer-Policy'] = [{
      key: 'Referrer-Policy',
      value: "same-origin"
    }];
    response.headers['X-XSS-Protection'] = [{
      key: 'X-XSS-Protection',
      value: "1; mode=block; report=https://jarvis.report-uri.com/r/d/xss/enforce"
    }];
//    response.headers['Accept-Ranges'] = [{
//      key: 'Accept-Ranges',
//      value: "bytes"
//    }];
    response.headers['Content-Security-Policy'] = [{
      key: 'Content-Security-Policy',
      value: "default-src 'none'; script-src 'self' stats.jarv.is 'sha256-TLAu2p9kt4LHt+sWwE0cvqq1Ok5LoGzRPrw7+mzhX00='; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self'; object-src 'none'; media-src 'self'; base-uri 'none'; form-action 'self'; frame-src 'self'; frame-ancestors 'self'; worker-src 'none'; connect-src 'self' jarvis.report-uri.com stats.jarv.is; upgrade-insecure-requests; report-uri https://jarvis.report-uri.com/r/d/csp/enforce; report-to default"
    }];
    response.headers['Report-To'] = [{
      key: 'Report-To',
      value: "{\"group\":\"default\",\"max_age\":31536000,\"endpoints\":[{\"url\":\"https://jarvis.report-uri.com/a/d/g\"}],\"include_subdomains\":true}"
    }];
    response.headers['X-DNS-Prefetch-Control'] = [{
      key: 'X-DNS-Prefetch-Control',
      value: "off"
    }];
    response.headers['X-UA-Compatible'] = [{
      key: 'X-UA-Compatible',
      value: "IE=edge"
    }];
    response.headers['Expect-CT'] = [{
      key: 'Expect-CT',
      value: "max-age=86400, enforce, report-uri=\"https://jarvis.report-uri.com/r/d/ct/enforce\""
    }];
    response.headers['X-Permitted-Cross-Domain-Policies'] = [{
      key: 'X-Permitted-Cross-Domain-Policies',
      value: "none"
    }];
    response.headers['Feature-Policy'] = [{
      key: 'Feature-Policy',
      value: "accelerometer 'none'; camera 'none'; geolocation 'none'; gyroscope 'none'; magnetometer 'none'; microphone 'none'; sync-xhr 'none'; payment 'none'; usb 'none'; vr 'none'"
    }];

    delete response.headers['Last-Modified'];
    delete response.headers['Expires'];

    // Return modified response
    callback(null, response);
};