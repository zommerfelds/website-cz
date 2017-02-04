(function($) {
	"use strict";
    $('body').singlePageNav({
        currentClass : 'active'
    });

    $('.toggle-menu').click(function(){
        $('.responsive-menu').stop(true,true).slideToggle();
        return false;
    });
})(jQuery);
