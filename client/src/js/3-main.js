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
      e.preventDefault(); // avoid to execute the actual submit of the form.

      var data = {};
      $.each($('#contact-form').serializeArray(), function() {
          data[this.name] = this.value;
      });

      $.ajax({
        type: 'POST',
        url: deploymentData.contactUrl,
        data: JSON.stringify(data),
        dataType: 'json',
        contentType: 'application/json',
        success: function(data) {
          console.log('Sent contact message.');
          $('#submit-contact').prop('disabled', true);
          $('#contact-success').removeClass('hidden');
        },
        error: function(jqXHR, textStatus, errorThrown) {
          console.log('Error sending message:', textStatus, errorThrown);
          $('#submit-contact').prop('disabled', true);
          $('#contact-error').removeClass('hidden');
        }
      });
    });
  });
})(jQuery);
