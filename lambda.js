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
    response.headers['Content-Security-Policy'] = [{
      key: 'Content-Security-Policy',
      value: "default-src 'self'; script-src 'self' stats.jarv.is 'sha256-TLAu2p9kt4LHt+sWwE0cvqq1Ok5LoGzRPrw7+mzhX00='; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self'; frame-src 'self'; connect-src 'self' jarvis.report-uri.com stats.jarv.is; upgrade-insecure-requests; report-uri https://jarvis.report-uri.com/r/d/csp/enforce"
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
      value: "max-age=0, report-uri=https://jarvis.report-uri.com/r/d/ct/reportOnly"
    }];

    delete response.headers['Last-Modified'];
    delete response.headers['Expires'];

    // Return modified response
    callback(null, response);
};