(function( $ ) {
	'use strict';
	var methods = {};

	methods.clicked = false;
	methods.opening = false;

	methods.close_bumpdown = function( $bumpdown ) {
		if ( ! $bumpdown.is( ':visible' ) ) {
			return;
		}//end if

		$bumpdown.slideUp( 'fast' );
	};

	methods.open_bumpdown = function( $bumpdown ) {
		if ( $bumpdown.is( ':visible' ) ) {
			return;
		}//end if

		methods.opening = true;

		$bumpdown.slideDown( 'fast', function() {
			methods.opening = false;
		});
	};

	$.fn.bumpdown = function() {
		return this.each( function() {
			var $el = $( this );
			var the_id = $el.attr( 'id' );
			var $trigger_source = $el.find( '.target' );

			$el.addClass( 'bumpdown-trigger' );

			// get the first block-level parent
			var $parent = $el.parents().filter( function() {
				return 'block' === $( this ).css( 'display' );
			}).first();

			if ( ! $trigger_source.length ) {
				$trigger_source = $el;
			}//end if

			if ( ! the_id ) {
				$.error( 'bumpdowns need an id' );
			}//end if

			var bumpdown_selector = '[data-trigger="' + the_id + '"]';

			var $bumpdown = $( bumpdown_selector );

			$bumpdown.addClass( 'bumpdown' );

			var source = {};

			source.offset = $trigger_source.offset();
			source.width = $trigger_source.outerWidth();
			source.halfway = ( source.offset.left - $parent.offset().left ) + Math.round( source.width / 2 ) - 16;

			$bumpdown.prepend( '<a class="bumpdown-close" title="Close"><i class="goicon icon-x"></i></a>' );
			$bumpdown.prepend( '<span class="bumpdown-arrow" style="left: ' + source.halfway + 'px;"></span>' );

			$( document ).on( 'click', bumpdown_selector, function() {
				if ( $bumpdown.is( ':visible' ) && ! methods.opening ) {
					methods.clicked = true;
				}//end if
			});

			$( document ).on( 'click', function() {
				if ( ! methods.clicked && ! methods.opening && $bumpdown.is( ':visible' ) ) {
					methods.close_bumpdown( $bumpdown );
				}//end if

				methods.clicked = false;
			});

			$el.on( 'mouseover', function() {
				$el.doTimeout( the_id, 300, function() {
					if ( ! $bumpdown.is( ':visible' ) ) {
						methods.open_bumpdown( $bumpdown );
					}//end if
				});
			});

			$el.on( 'click', function( e ) {
				e.preventDefault();

				if ( ! $bumpdown.is( ':visible' ) ) {
					e.stopPropagation();
					methods.open_bumpdown( $bumpdown );
				}//end if
			});

			$bumpdown.find( '.bumpdown-close' ).on( 'click', function( e ) {
				e.preventDefault();
				e.stopPropagation();

				methods.close_bumpdown( $bumpdown );
			});
		});
	};
}( jQuery ));
