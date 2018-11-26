jQuery(document).ready(function($){
        $('<div id="simple-banner" class="simple-banner"></div>')
        .prependTo('body');

        var bodyPaddingLeft = $('body').css('padding-left')
        var bodyPaddingRight = $('body').css('padding-right')

        if (bodyPaddingLeft != "0px"){
        	$('head').append('<style type="text/css" media="screen">.simple-banner{margin-left:-'+bodyPaddingLeft+';padding-left:'+bodyPaddingLeft+';}</style>');
        }
        if (bodyPaddingRight != "0px"){
        	$('head').append('<style type="text/css" media="screen">.simple-banner{margin-right:-'+bodyPaddingRight+';padding-right:'+bodyPaddingRight+';}</style>');
        }
    });