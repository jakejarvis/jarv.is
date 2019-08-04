let newHeaders = {
  "Content-Security-Policy": "default-src 'self'; script-src 'self' 'unsafe-inline' stats.jarv.is comments.jarv.is buttons.github.io platform.twitter.com cdn.syndication.twimg.com; style-src 'self' 'unsafe-inline' comments.jarv.is platform.twitter.com; img-src 'self' data: https:; font-src 'self' comments.jarv.is; object-src 'self'; media-src 'self'; base-uri 'self' stats.jarv.is; form-action 'self' platform.twitter.com syndication.twitter.com; frame-src 'self' www.youtube.com www.youtube-nocookie.com platform.twitter.com syndication.twitter.com codepen.io; frame-ancestors 'self'; worker-src 'none'; connect-src 'self' jarvis.report-uri.com stats.jarv.is comments.jarv.is api.github.com syndication.twitter.com; upgrade-insecure-requests; report-uri https://jarvis.report-uri.com/r/d/csp/enforce; report-to default",
  "Report-To": "{\"group\":\"default\",\"max_age\":604800,\"endpoints\":[{\"url\":\"https://jarvis.report-uri.com/a/d/g\"}]}",
  "NEL": "{\"report_to\":\"default\",\"max_age\":604800}",
//  "Strict-Transport-Security" : "max-age=1000",
  "X-XSS-Protection": "1; mode=block; report=https://jarvis.report-uri.com/r/d/xss/enforce",
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
  event.respondWith(addHeaders(event.request))
})

async function addHeaders(req) {
  let response = await fetch(req)
  let responseHeaders = new Headers(response.headers)

  Object.keys(newHeaders).map(function(name, index) {
    responseHeaders.set(name, newHeaders[name])
  })

  removeHeaders.forEach(function(name){
    responseHeaders.delete(name)
  })

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: responseHeaders
  })
}
