//jQuery is required to run this code
$(document).ready(function() {

  $(function(){
    $('.main-logo').css('display', 'none');
    $('.main-logo').fadeIn(3000);
  });

  $('.blog-logo-link').hover(function(){
    $('.nav-link:first-of-type').css('color', '#2F80ED');
  }, function(){
    $('.nav-link:first-of-type').css('color', '');
  });

  $('.about-me-logo-link').hover(function(){
    $('.nav-link:last-of-type').css('color', '#F2C94C');
  }, function(){
    $('.nav-link:last-of-type').css('color', '');
  });

  $('.resume-logo-link').hover(function(){
    $('.nav-link:nth-of-type(3)').css('color', '#27AE60');

  }, function(){
    $('.nav-link:nth-of-type(3)').css('color', '');
  });

  $('.media-logo-link').hover(function(){
    $('.nav-link:nth-of-type(2)').css('color', '#6F6F6F');
  }, function(){
    $('.nav-link:nth-of-type(2)').css('color', '');
  });

});
