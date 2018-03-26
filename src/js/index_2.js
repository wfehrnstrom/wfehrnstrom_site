$(document).ready(function(){
  function maintainImageAspectRatios(){
    $('.media').each(function(){
      if($(this).height() > $(this).width()){
        this.classList.add('widthAspect');
      }
      else{
        this.classList.add('heightAspect');
      }
    });
  }

  function initializeHeaderStrokes(){
    var horizontal_path = document.querySelector("#top-line");
    var vertical_path = document.querySelector("#left-line");
    var horizontal_length = horizontal_path.getTotalLength();
    var vertical_length = vertical_path.getTotalLength();
    $('#top-line').css('stroke-dasharray', `${horizontal_length}`);
    $('#top-line').css('stroke-dashoffset', `${horizontal_length}`);
    $('#bottom-line').css('stroke-dasharray', `${horizontal_length}`);
    $('#bottom-line').css('stroke-dashoffset', `${horizontal_length}`);
    $('#left-line').css('stroke-dasharray', `${vertical_length}`);
    $('#left-line').css('stroke-dashoffset', `${vertical_length}`);
    $('#right-line').css('stroke-dasharray', `${vertical_length}`);
    $('#right-line').css('stroke-dashoffset', `${vertical_length}`);
    var main_logo_left_rect_length = document.querySelector("#left_rect_stroke").getTotalLength();
    $('#left_rect_stroke').css('stroke-dasharray', `${main_logo_left_rect_length}`);
    $('#left_rect_stroke').css('stroke-dashoffset', `${main_logo_left_rect_length}`);
  }

  function adjustCensorDivOffset(){
    var censorDiv = $('.censor-div');
    censorDiv.forEach(function(div){
        censorDiv.offset({
          top: $
        });
    });
  }

  function animateMainLogo(){
    var animationDuration = 2000;
    var delay = animationDuration;
    // Bring down the left stroke on logo
    $('#left_rect_stroke').delay(delay).animate({
      'stroke-dashoffset': '0'
    }, animationDuration);
    delay += animationDuration;
    // If we're not on mobile, move the logo up to the header bar
    if($(document).width() > 500){
      // Switch logo to absolutely positioned
      var offset = $('#logo-svg').offset();
      $('#logo-svg').css({'right': `${offset.right}`, 'top':`${offset.top}`});
      // Translate the logo to the top after it is done animating
      $('#logo-svg').delay(delay).animate({
        'right': '10px',
        'top': '10px',
        'width': `${$('#logo-svg').width()/6}`
      }, animationDuration);
      delay += animationDuration;
      $('#logo-svg').delay(delay).css('position', 'absolute');
      // Switch logo to default positioning in its new position
    }
    setTimeout(animateMenuItems, delay);
  }

  function animateMenuItems(){
    var menuText = document.querySelectorAll('.menu-bar-text');
    let delayIncrement = 750;
    let delay = 0;
    let animationDuration = delayIncrement * 2;
    var index = 0;
    $('.menu-bar-text').css('opacity', '100');
    menuText.forEach(function(element){
      let blockDiv = document.createElement('div');
      let menuItemOffset = $(element).position();
      let dimensions = {
        'width':`${$(element).width() + 10}`,
        'height':`${$(element).height()}`
      }
      $(blockDiv).addClass('censor-div');
      $(blockDiv).css({'left':`${menuItemOffset.left - 10}px`, 'top':`${menuItemOffset.top}px`, 'width':`${dimensions.width}px`, 'height':`${dimensions.height}px`});
      $(element).parent().append(blockDiv);
      $(blockDiv).delay(delay).animate({
        'width': '0'
      }, animationDuration, function(){
        transformMenuTextDivs(blockDiv, index);
        index += 1;
      });
      delay += delayIncrement;
    });
  }

  function transformMenuTextDivs(blockDiv, index){
    let menuItemColors = ['#00b0ff', '#00e676', '#f44336', '#ffea00'];
    $(blockDiv).css({'left':`${parseInt($(blockDiv).css('left')) + 10}px`, 'top':`${parseInt($(blockDiv).css('top')) + $(blockDiv).height() + 2}px`, 'height':`${$(blockDiv).height()/3}`});
    $(blockDiv).css('background-color', `${menuItemColors[index]}`);
  }

  function positionLogoOnPage(id){
    var wrapper = $(id).find('.banner-wrapper');
    $('.logo-container').css('position', 'fixed');
    $('.logo-container').css('right', '0');
    $('.logo-container').css('top', `${parseInt(wrapper.css('top')) + 10}px`);
    $('.logo-container').width(75);
    $('.logo-container').height($(wrapper.children()[0]).height());
    $('.logo-container').insertAfter(wrapper);
  }

  function menuPosition(){
    var heightBeforeButton = $('.photos').height();
    var menuHeight = $('.menu').height();
    var photosHeight = $(window).height() - menuHeight;
    //$('.photos').height(photosHeight);
  }

  function getSmallestHeight(id){
    var minHeight = 0;
    $(id).find('img').each(function(){
      if(minHeight == 0 || $(this).height() < minHeight){
        minHeight = $(this).height();
      }
    });
    return minHeight;
  }

  function standardGrid(id){
    var smallestHeight = getSmallestHeight(id);
    $(id).find('img').each(function(){
      $(this).height(smallestHeight);
      $(this).width($(this).parent().width());
    });
  }

  function bannerStyle(banner, index){
    var banner_colors = [['photo-banner', '#00c853']];
    var child = $(`${banner}:nth-of-type(${index + 1})`).children()[0];
    $(banner).height($(child).height() + 20);
    $(banner).width($(child).width() + 20);
    $(banner).css('top', parseFloat($(banner).css('top'), 10) - 10);
    for(var i = 0; i < banner_colors.length; i++){
      if($(child).hasClass(banner_colors[i][0])){
        $(banner).css('background-color', banner_colors[i][1]);
      }
    }
  }

  function arrangeGrid(id){
    var count = 0;
    $(id).find('.col').each(function(){
      var image = $(this).find('img')[0];
      var img_height = image.naturalHeight
      var img_width = image.naturalWidth;
      var ratio = img_width/img_height;
      if(ratio < 1){
        $(this).addClass(`l4`);
      }
      else if(ratio < 1.5){
        $(this).addClass(`l6`);
      }
      else{
        $(this).addClass(`l12`);
      }
    });
  }

  function sizeFooter(){
    $('.page-footer').height($('.menu').height());
  }

  function initPage(){
    // position our menu to the bottom of the page
    menuPosition();
    bannerStyle('.banner-wrapper', 0);
    //sizePageBackground();
    sizeFooter();
  }

  $(window).resize(function(){
    standardGrid('.photos > .row');
    sizeFooter();
    if($(window).width() > 570){
      $('.main-header').css('right', `${($(window).width()/12)}px`);
      $('.sub-header').css('right', `${($(window).width()/12)  + (($('.main-header').width() - $('.sub-header').width())/2)}px`);
    }
  });

  maintainImageAspectRatios();
  arrangeGrid('.photos > .row');
  standardGrid('.photos > .row');
  initializeHeaderStrokes();
  animateMainLogo();
  if($(window).width() > 570){
    $('.main-header').css('right', `${($(window).width()/12)}px`);
    $('.sub-header').css('right', `${($(window).width()/12) + (($('.main-header').width() - $('.sub-header').width())/2)}px`);
  }

  initPage();

  $('#media-link').on("click", function(){
    $('.photos').css('display', 'block');
    $('.blogs').css('display', 'none');
    $('.resume').css('display', 'none');
    $('.logo-container').addClass('hoverable');
    arrangeGrid('.photos > .row');
    standardGrid('.photos > .row');
    positionLogoOnPage('.photos');
    $('html, body').animate({scrollTop: $('.photos').offset().top}, 500);
  });

  $('#blog-link').on("click", function(){
    $('.photos').css('display', 'none');
    $('.blogs').css('display', 'block');
    $('.resume').css('display', 'none');
    $('html, body').animate({scrollTop: $('.blogs').offset().top}, 500);
  });

  $('#resume-link').on("click", function(){
    $('.photos').css('display', 'none');
    $('.blogs').css('display', 'none');
    $('.resume').css('display', 'block');
    $('html, body').animate({scrollTop: $('.resume').offset().top}, 500);
  });

  $('.menu-bar-text').hover(
      function() {
        if(!$(this).next().is(':animated')){
          $(this).next().animate({
            'width': `${$(this).width()}`
          }, 500);
        }
      }, function() {
        $(this).next().animate({
          'width': '0'
        }, 500);
      });
});
