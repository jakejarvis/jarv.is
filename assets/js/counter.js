(function () {
  // don't continue if there isn't a span#meta-hits element on this page
  var wrapper = document.getElementById("meta-hits");

  if (wrapper) {
    wrapper.style.display = "inline-block";

    // deduce a consistent identifier for this page, no matter the URL
    var canonical = document.createElement("a");
    canonical.href = document.querySelector("link[rel='canonical']").href;

    // strip beginning and ending forward slash
    var slug = canonical.pathname.slice(1, -1);

    // this will return an error from the API anyways
    if (!slug || slug === "/") return;

    fetch("/api/hits?slug=" + slug)
      .then((response) => response.json())
      .then((data) => {
        // finally inject the hits and hide the loading spinner
        var spinner = document.getElementById("hit-spinner");
        var counter = document.getElementById("hit-counter");

        spinner.style.display = "none";
        wrapper.title = data.pretty_hits + " " + data.pretty_unit;
        counter.appendChild(document.createTextNode(data.pretty_hits));
      })
      .catch((error) => {});
  }
})();
