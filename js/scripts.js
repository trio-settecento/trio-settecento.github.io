$(document).ready(function() {
    // Back to top link
    $('.backtotop').click(function () {
        $('body,html').animate({
            scrollTop: 0
        }, 500);
        return false;
    });

    // Responsive Menu
    $(".toggle_link").click(function () {
        $("#menu").toggleClass("active");
    });

    $(".parent a").attr("aria-haspopup", "true");
    $(".parent a").click(function () {
        $(this).parent().toggleClass("open");
    });

    // Search
    $('a[href="#search"]').click(function(){
        $('#search').addClass('open');
        $('#search input').focus();
        $('body').addClass('overflow');
    });

    $('#search, #search button.close').on('click keyup', function(event) {
        if (event.target == this || event.target.className == 'close' || event.keyCode == 27) {
            $(this).removeClass('open');
            $('body').removeClass('overflow');
        }
    });

    // Style Switch
    $(".switch span").click(function(){
        var id = $(this).attr("id");

        // adjust link here
        $("#switch_style").attr("href", "/css/" + id + ".css");
    });

    if($('.articles').find('div.wrapper').length != 0){
        $('.switch').hide();
    }else{
        $('.switch').show();
    }

    var headHeight = $('.head').innerHeight(),
        mainMenuHeight = $('.head .main_menu').innerHeight(),
        mainMenuFromTop = headHeight - mainMenuHeight;
    $(window).scroll(function() {
        if ($(this).scrollTop() >= mainMenuFromTop) {
            $('.head .main_menu').css('position', 'fixed');
            $('body').css({ 'margin-top': mainMenuHeight });
        } else{
            $('.head .main_menu').css('position', 'static');
            $('body').css({ 'margin-top': '' });
        }
    });
});

// lightbox stuff
$( function(){
    var activityIndicatorOn = function() {
        $( '<div id="imagelightbox-loading"><div></div></div>' ).appendTo( 'body' );
    },
    activityIndicatorOff = function() {
        $( '#imagelightbox-loading' ).remove();
    },

    // OVERLAY
    overlayOn = function() {
        $( '<div id="imagelightbox-overlay"></div>' ).appendTo( 'body' );
    },
    overlayOff = function() {
        $( '#imagelightbox-overlay' ).remove();
    },

    // CLOSE BUTTON
    closeButtonOn = function( instance ) {
        $( '<button type="button" id="imagelightbox-close" title="Close"><i class="fa fa-times-circle"></i></button>' ).appendTo( 'body' ).on( 'click touchend', function(){ $( this ).remove(); instance.quitImageLightbox(); return false; });
    },
    closeButtonOff = function() {
        $( '#imagelightbox-close' ).remove();
    },

    // CAPTION
    captionOn = function() {
        var description = $( 'a[href="' + $( '#imagelightbox' ).attr( 'src' ) + '"] img' ).attr( 'alt' );
        if( description.length > 0 )
            $( '<div id="imagelightbox-caption">' + description + '</div>' ).appendTo( 'body' );
    },
    captionOff = function() {
        $( '#imagelightbox-caption' ).remove();
    },

    // NAVIGATION
    navigationOn = function( instance, selector ) {
        var images = $( selector );
        if( images.length ) {
            var nav = $( '<div id="imagelightbox-nav"></div>' );
            for( var i = 0; i < images.length; i++ )
                nav.append( '<button type="button"></button>' );
                nav.appendTo( 'body' );
                nav.on( 'click touchend', function(){ return false; });
                var navItems = nav.find( 'button' );
                navItems.on( 'click touchend', function(){
                    var $this = $( this );
                    if( images.eq( $this.index() ).attr( 'href' ) != $( '#imagelightbox' ).attr( 'src' ) )
                        instance.switchImageLightbox( $this.index() );
                        navItems.removeClass( 'active' );
                        navItems.eq( $this.index() ).addClass( 'active' );
                        return false;
                })
                .on( 'touchend', function(){ return false; });
        }
    },
    navigationUpdate = function( selector ) {
        var items = $( '#imagelightbox-nav button' );
        items.removeClass( 'active' );
        items.eq( $( selector ).filter( '[href="' + $( '#imagelightbox' ).attr( 'src' ) + '"]' ).index( selector ) ).addClass( 'active' );
    },
    navigationOff = function() {
        $( '#imagelightbox-nav' ).remove();
    },

    // ARROWS
    arrowsOn = function( instance, selector ) {
        var $arrows = $( '<button type="button" class="imagelightbox-arrow imagelightbox-arrow-left"></button><button type="button" class="imagelightbox-arrow imagelightbox-arrow-right"></button>' );
        $arrows.appendTo( 'body' );
        $arrows.on( 'click touchend', function( e )	{
            e.preventDefault();
            var $this	= $( this ),
                $target	= $( selector + '[href="' + $( '#imagelightbox' ).attr( 'src' ) + '"]' ),
                index	= $target.index( selector );

            if( $this.hasClass( 'imagelightbox-arrow-left' ) ) {
                index = index - 1;
                if( !$( selector ).eq( index ).length )
                    index = $( selector ).length;
            }
            else {
                index = index + 1;
                if( !$( selector ).eq( index ).length )
                    index = 0;
            }
            instance.switchImageLightbox( index );
            return false;
        });
    },
	arrowsOff = function() {
        $( '.imagelightbox-arrow' ).remove();
    };

    //	ALL COMBINED
    var selectorF = 'a[data-imagelightbox="f"]';
    var instanceF = $( selectorF ).imageLightbox( {
        onStart:		function() { overlayOn(); closeButtonOn( instanceF ); arrowsOn( instanceF, selectorF ); },
        onEnd:			function() { overlayOff(); captionOff(); closeButtonOff(); arrowsOff(); activityIndicatorOff(); },
        onLoadStart: 	function() { captionOff(); activityIndicatorOn(); },
        onLoadEnd:	 	function() { captionOn(); activityIndicatorOff(); $( '.imagelightbox-arrow' ).css( 'display', 'block' ); }
    });
});
