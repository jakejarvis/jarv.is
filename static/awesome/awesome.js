jQuery(document).ready(function($) {
  $.get('synonyms.txt', function(data) {
    var synonyms = data.split("\n");
    var line = Math.floor(synonyms.length * Math.random());
    $('span#synonym').html(synonyms[line]);
  });
});