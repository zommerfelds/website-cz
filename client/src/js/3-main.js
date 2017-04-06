(function($) {
  "use strict";

  function makeAlert(alertClass, message) {
    return $(
      '<div class="alert ' + alertClass + ' alert-dismissable fade in"> \
        <a class="close" href="#" data-dismiss="alert" aria-label="close">&times;</a> \
        <p>' + message + '</p> \
      </div>');
  }

  function contactResponse() {
    $('#submit-contact').prop('disabled', false);
    $('#submit-contact').prop('value', 'Send Message');
    $('#contact-response')[0].scrollIntoView();
  }

  $(document).ready(function() {
    $('body').singlePageNav({
      currentClass: 'active',
      offset: '30',
      filter: '.smooth'  // only 'smooth' class will be used
    });

    $('.toggle-menu').click(function(){
      $('.responsive-menu').stop(true,true).slideToggle();
      return false;
    });

    $('#contact-form').submit(function(e) {
      e.preventDefault(); // avoid to execute the actual submit of the form.

      if (grecaptcha.getResponse() === "") {
        $('#contact-recaptcha-alert').append(makeAlert('alert-danger', 'Please accept reCAPTCHA.'));
        return;
      }

      $('#submit-contact').prop('disabled', true);
      $('#submit-contact').prop('value', 'Sending...');

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
          $('#contact-response').append(makeAlert('alert-success', 'Message sent.'));
          grecaptcha.reset();
          contactResponse();
        },
        error: function(jqXHR, textStatus, errorThrown) {
          console.log('Error sending message:', textStatus, errorThrown);
          $('#contact-response').append(makeAlert('alert-danger', 'Error sending message. Please try again later.'));
          contactResponse();
        }
      });
    });
  });
})(jQuery);
