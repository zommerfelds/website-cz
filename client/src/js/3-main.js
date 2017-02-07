(function($) {
  "use strict";
  $(document).ready(function() {
    $('body').singlePageNav({
      currentClass : 'active'
    });

    $('.toggle-menu').click(function(){
      $('.responsive-menu').stop(true,true).slideToggle();
      return false;
    });

    $("#contact-form").submit(function(e) {
      var url = deploymentData.contactUrl;
      console.log('>>>', url);

      $.ajax({
        type: 'POST',
        url: url,
        data: $("#contact-form").serialize(),
        success: function(data) {
          console.log('yay!');
        },
        error: function(jqXHR, textStatus, errorThrown) {
          console.log('nay!');
        }
      });

      e.preventDefault(); // avoid to execute the actual submit of the form.
    });
  });
})(jQuery);
