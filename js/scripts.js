// grab header height
var $fullheight = $('.head').innerHeight();

$(document).ready(function() {
    // add header height as margin to body
    $('body').css({ 'margin-top': $fullheight });

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

        $("#switch_style").attr("href", "/css/" + id + ".css");
    });
});

$(window).scroll(function() {
    var $shrunkheight = $('.head').innerHeight();

    // shrink header on scroll
    if ($(this).scrollTop() > 80) {
        $('.head .row').addClass("shrink");
        $('body').css({ 'margin-top': $shrunkheight });
    } else{
        $('.head .row').removeClass("shrink");
        $('body').css({ 'margin-top': $fullheight });
    }
});
