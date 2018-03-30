$(document).ready(function(){

  function initializeHeaderStrokes(){
    // get horizontal and vertical lengths of blog subpage header
    var horizontal_path = document.querySelector("#top-line");
    var vertical_path = document.querySelector("#left-line");
    var horizontal_length = horizontal_path.getTotalLength();
    var vertical_length = vertical_path.getTotalLength();
    // set both the offset of dashes and their length to the path length, pushing them off the svg axes
    $('#top-line').css('stroke-dasharray', `${horizontal_length}`);
    $('#top-line').css('stroke-dashoffset', `${horizontal_length}`);
    $('#bottom-line').css('stroke-dasharray', `${horizontal_length}`);
    $('#bottom-line').css('stroke-dashoffset', `${horizontal_length}`);
    $('#left-line').css('stroke-dasharray', `${vertical_length}`);
    $('#left-line').css('stroke-dashoffset', `${vertical_length}`);
    $('#right-line').css('stroke-dasharray', `${vertical_length}`);
    $('#right-line').css('stroke-dashoffset', `${vertical_length}`);
    // initialize the left stroke on the main logo as well
    var main_logo_left_rect_length = document.querySelector("#left_rect_stroke").getTotalLength();
    $('#left_rect_stroke').css('stroke-dasharray', `${main_logo_left_rect_length}`);
    $('#left_rect_stroke').css('stroke-dashoffset', `${main_logo_left_rect_length}`);
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
      $('.background-col').css('justify-content', 'space-around');
      // Translate the logo to the top after it is done animating
      $('#logo-svg').delay(delay).animate({
        'right': '10px',
        'top': '10px',
        'width': `${$('#logo-svg').width()/3}`
      }, animationDuration);
      delay += animationDuration;
      $('#logo-svg').delay(delay).css('position', 'absolute');
    }
    setTimeout(animateMenuItems, delay);
    setTimeout(enablePageLinks, delay);
    setTimeout(function(){
      $('.background-main-text').css('visibility', 'visible');
      $('.background-divider').height($('.background-col').height());
      $('.background-divider').css('display', 'inline-block');
    }, delay);
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
        // enable menu-item hovering for each menu item as soon as the transition is done
        enableHover(element);
        index += 1;
      });
      delay += delayIncrement;
    });
  }

  function enableHover(menuText){
    $(menuText).on('mouseenter', function(){
      $(this).next().stop(true).animate({
        'width': `${$(this).width()}`
      }, 500);
    });
    $(menuText).on('mouseleave', function(){
      $(this).next().delay(250).animate({
        'width': '0'
      }, 500);
    });
  }

  function transformMenuTextDivs(blockDiv, index){
    // perhaps make underline effect all the same color
    let menuItemColors = ['#00b0ff', '#00e676', '#f44336', '#ffea00'];
    $(blockDiv).prev('.menu-bar-text').css('padding-bottom', '0');
    $(blockDiv).css('position', 'static');
    $(blockDiv).css({'left':`${parseInt($(blockDiv).css('left')) + 10}px`, 'top':`${parseInt($(blockDiv).css('top')) + $(blockDiv).height() + 2}px`, 'height':`${$(blockDiv).height()/3}`});
    $(blockDiv).css('background-color', `${menuItemColors[index]}`);
  }

  function showPage(pageClass){
    var pages = $('.page-section');
    console.log(pages);
    pages.each(function(){
      if($(this).hasClass(pageClass)){
        console.log(pageClass);
        $(this).css('display', 'block');
      }
      else{
        $(this).css('display', 'none');
      }
    });
  }

  function enablePageLink(pageClass){
    console.log('PAGE CLASS: ' + `.${pageClass}`);
    if($(`#${pageClass}-link`) !== null){
      $(`#${pageClass}-link`).on("click", function(){
        showPage(pageClass);
        $('html, body').animate({scrollTop: $(`.${pageClass}`).offset().top}, 500);
      });
    }
  }

  function enablePageLinks(){
    $('.nav-button').each(function(){
      let lastDashIndex = $(this).attr('id').lastIndexOf('-');
      let pageName = $(this).attr('id').substring(0, lastDashIndex);
      enablePageLink(pageName);
    });
  }

  function disablePageLink(pageClass){
    if($(`#${pageClass}-link`) !== null){
      $(`#${pageClass}-link`).off("click");
    }
  }

  function arrangeGrid(id){
    var count = 0;
    $(id).find('.col').each(function(){
      var image = $(this).find('img')[0];
      if(image){
        var img_height = image.naturalHeight;
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
      }
    });
  }

  function getAspectRatio(image){
    if(image){
      var img_height = image.naturalHeight;
      var img_width = image.naturalWidth;
      var ratio = img_width/img_height;
      return ratio;
    }
    return -1;
  }

  function styleBasedOnAspect(image){
    let aspectRatio = getAspectRatio(image);
    // if the aspect ratio is a valid number
    if(aspectRatio !== -1){
      // if the width is greater than or equal to the height
      if(aspectRatio >= 1){
        $(image).css('width', '100%');
      }
      $(image).css('height', '70vh');
    }
  }

  function arrangeGrid(){
    let media = $('.media .grid').find('.col');
    media.each(function(){
      let image = $(this).find('img')[0];
      styleBasedOnAspect(image);
    });
  }

  function initializeMaterialBox(){
    var gridElements = document.querySelectorAll('.grid .grid-item .materialboxed');
    var options = {
      'onCloseEnd': arrangeGrid
    };
    gridElements.forEach(function(el){
      var instance = M.Materialbox.init(el, options);
    });
  }

  function initPage(){
    initializeMaterialBox();
    initializeHeaderStrokes();
    animateMainLogo();
  }

  initPage();
});
