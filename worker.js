/**
 * Cloudflare Worker to add security headers and remove S3 headers.
 * https://jarv.is/notes/security-headers-cloudflare-workers/
 */

let addHeaders = {
  "Content-Security-Policy": "default-src 'self'; script-src 'self' 'unsafe-inline' stats.jarv.is comments.jarv.is buttons.github.io platform.twitter.com cdn.syndication.twimg.com; style-src 'self' 'unsafe-inline' comments.jarv.is platform.twitter.com; img-src 'self' data: https:; font-src 'self' comments.jarv.is; object-src 'self'; media-src 'self'; base-uri 'self'; form-action 'self' platform.twitter.com syndication.twitter.com; frame-src 'self' www.youtube.com www.youtube-nocookie.com platform.twitter.com syndication.twitter.com buttons.github.io codepen.io; frame-ancestors 'self'; worker-src 'none'; connect-src 'self' csp.jarv.is jarvis.report-uri.com stats.jarv.is comments.jarv.is api.github.com syndication.twitter.com; upgrade-insecure-requests; report-uri https://csp.jarv.is/r/d/csp/enforce; report-to default",
  "Report-To": "{\"group\":\"default\",\"max_age\":604800,\"endpoints\":[{\"url\":\"https://csp.jarv.is/a/d/g\"}]}",
  "NEL": "{\"report_to\":\"default\",\"max_age\":604800}",
//  "Strict-Transport-Security" : "max-age=1000",
  "X-XSS-Protection": "1; mode=block; report=https://csp.jarv.is/r/d/xss/enforce",
  "X-Frame-Options": "SAMEORIGIN",
  "X-Content-Type-Options": "nosniff",
  "Referrer-Policy": "same-origin",
  "X-DNS-Prefetch-Control": "off",
  "X-UA-Compatible": "IE=edge",
  "X-Permitted-Cross-Domain-Policies": "none",
  "Feature-Policy": "accelerometer 'none'; camera 'none'; geolocation 'none'; gyroscope 'none'; magnetometer 'none'; microphone 'none'; sync-xhr 'none'; payment 'none'; usb 'none'; vr 'none'"
}

let removeHeaders = [
  "Last-Modified",
  "Expires",
  "Public-Key-Pins",
  "X-Powered-By",
  "x-amz-request-id",
  "x-amz-id-2",
  "x-amz-bucket",
  "x-amz-bucket-region",
  "x-amz-error-code",
  "x-amz-error-message",
  "x-amz-error-detail-key",
  "x-amz-version-id"
]

addEventListener("fetch", event => {
  event.respondWith(fetchAndApply(event.request))
})

async function fetchAndApply(request) {
  // Ignore POST and PUT HTTP requests.
  // https://github.com/cloudflare/worker-examples/blob/master/examples/security/ingore-post-and-put.js
  if (request.method === 'POST' || request.method === 'PUT') {
    return new Response('Sorry, that method isn\'t allowed here.',
        { status: 403, statusText: 'Forbidden' })
  }

  // Fetch the original page from the origin
  let response = await fetch(request)

  // Make response headers mutable
  response = new Response(response.body, response)

  // Set each header in addHeaders
  Object.keys(addHeaders).map(function(name, index) {
    response.headers.set(name, addHeaders[name])
  })

  // Delete each header in removeHeaders
  removeHeaders.forEach(function(name){
    response.headers.delete(name)
  })

  // Return the new mutated page
  return response
}
