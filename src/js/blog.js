$(document).ready(function(){

  var nav_banner_hidden = true;

  //Load Post content
  var request = new XMLHttpRequest();
  var postcontent = document.getElementById('test');
  request.onreadystatechange = function(){
    if(request.readyState == 4){
      if(request.status == 200){
        postcontent.innerHTML = request.responseText;
      }
      else{
        console.log('An error occurred during your request: ' +  request.status + ' ' + request.statusText);
      }
    }
  }

  request.open('Get', 'http://127.0.0.1:8080/blog1.txt');
  request.send();

  $('.toggle-bar').on("click", function(){
    //If we're hiding the nav banner
    var nav_banner_width = $(window).width();
    var nav_banner_height = 80;
    if(!nav_banner_hidden){
      nav_banner_height = 10;
      $('.nav-banner').height( 0);
      $('.nav-banner ul').height( 0);
      $('.nav-item').height( 0);
      $('.nav-item-text').css('opacity', 0);
      nav_banner_hidden = true;
    // otherwise, we're showing the banner
    }else{
      var nav_item_height = 80;
      var nav_item_colors = ['#4286f4', '#fc647b', '#65dd5a', '#f2f224', '#2dc7ff'];

      $('.nav-item').each(function(n){
        $(this).css('background-color', nav_item_colors[n % nav_item_colors.length]);
      });

      if($('.nav-item').length !== 0){
        var blog_nav_element_width = nav_banner_width/$('.nav-item').length;
        if(blog_nav_element_width < nav_item_height){
          blog_nav_element_width = nav_item_height;
          var num_rows = Math.ceil(($('.nav-item').length * blog_nav_element_width)/nav_banner_width);
          nav_banner_height = (80 * num_rows);
          var num_items_in_row = Math.floor(nav_banner_width/blog_nav_element_width);
          var overflow = nav_banner_width - (num_items_in_row*blog_nav_element_width);
          if(overflow > 0){
            blog_nav_element_width += overflow/num_items_in_row;
          }
        }
        $('.nav-item').width(blog_nav_element_width);
        $('.nav-item').height(nav_item_height);
        $('.nav-item-text').css('opacity', 1);
      }
      $('.nav-banner').height(nav_banner_height);
      nav_banner_hidden = false;
    }
  });

  $(window).resize(function(){
    if(!nav_banner_hidden){
      var nav_banner_width = $(window).width();
      if($('.nav-item').length !== 0){
        var nav_banner_height = 0;
        var nav_item_height = 80;
        var blog_nav_element_width = nav_banner_width/$('.nav-item').length;
        if(blog_nav_element_width < nav_item_height){
          blog_nav_element_width = nav_item_height;
          var num_rows = Math.ceil(($('.nav-item').length * blog_nav_element_width)/nav_banner_width);
          nav_banner_height = (80 * num_rows);

          var num_items_in_row = Math.floor(nav_banner_width/blog_nav_element_width);
          var overflow = nav_banner_width - (num_items_in_row*blog_nav_element_width);
          if(overflow > 0){
            blog_nav_element_width += overflow/num_items_in_row;
          }
        }
        else{
          nav_banner_height = 80;
        }
        $('.nav-item').width(blog_nav_element_width);
        $('.nav-banner').height(nav_banner_height);
      }
    }
  });
});
