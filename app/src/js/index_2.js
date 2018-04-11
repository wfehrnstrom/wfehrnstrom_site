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
    // if animations have not been disabled
    if(!$("#start-animation-switch input[type=checkbox]").is(':checked')){
      // Bring down the left stroke on logo
      $('#left_rect_stroke').delay(500).animate({
        'stroke-dashoffset': '0'
      }, 500);
    }
    else{
      $('#left_rect_stroke').css('stroke-dashoffset', '0');
    }
    // If we're not on mobile, move the logo up to the header bar
    if($(document).width() > 500){
      $('#logo-svg').css({
        'width': `${$('#logo-svg').width()/3}`
      });
      $('#logo-svg').css('position', 'absolute');
    }
    animateMenuItems();
    enablePageLinks();
    $('.background-main-text').css('visibility', 'visible');
    $('.background-divider').height($('.background-col').height());
    $('.background-divider').css('display', 'inline-block');
  }

  function animateMenuItems(){
    var menuText = document.querySelectorAll('.menu-bar-text');
    var delayIncrement;
    if(!$("#start-animation-switch input[type=checkbox]").is(':checked')){
      delayIncrement = 750;
    }
    else{
      delayIncrement = 0;
      $('.menu').css('animation', 'none');
      $('.menu').css('background-color', '#FFFFFF');
    }
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
    pages.each(function(){
      if($(this).hasClass(pageClass)){
        $(this).css('display', 'block');
      }
      else{
        $(this).css('display', 'none');
      }
    });
  }

  function enablePageLink(pageClass){
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

  function sizeGridPhotos(id){
    $(id).find('.col').each(function(){
      var image = $(this).find('img')[0];
      if(image){
        var img_height = image.naturalHeight;
        var img_width = image.naturalWidth;
        var ratio = img_width/img_height;
        if(ratio < 1){
          $(this).addClass(`m4`);
        }
        else if(ratio < 1.5){
          $(this).addClass(`m6`);
        }
        else{
          $(this).addClass(`m12`);
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

  function styleBasedOnAspect(image, height = '70vh'){
    let aspectRatio = getAspectRatio(image);
    // if the aspect ratio is a valid number
    if(aspectRatio !== -1){
      // if the width is greater than or equal to the height
      if(aspectRatio >= 1){
        $(image).css('width', '100%');
      }
      $(image).css('height', height);
    }
  }

  function arrangeGrid(grid, height){
    let gridItems = $(grid).find('.col');
    gridItems.each(function(){
      let image = $(this).find('img')[0];
      styleBasedOnAspect(image, height);
    });
  }

  function arrangeAllGrids(){
    let gridItems = $('.grid').find('.col');
    gridItems.each(function(){
      let image = $(this).find('img')[0];
      styleBasedOnAspect(image);
    });
  }

  function initializeMaterialBox(){
    var gridElements = document.querySelectorAll('.grid .grid-item .materialboxed');
    gridElements.forEach(function(el){
      let parentGrid = $(el).closest('.grid')
      var height = '70vh';
      if(parentGrid.closest('.projects').length !== 0){
        height = '30vh';
      }
      var options = {
        'onCloseEnd': function(){arrangeGrid($(el).closest('.grid'), height);}
      };
      var instance = M.Materialbox.init(el, options);
    });
  }

  function startCallbacks(){
    // settings configuration callback
    $('.settings-icon').click(function(){
      if($('.settings-panel').css('opacity') === '0'){
        $('.settings-panel').animate({
          'opacity': '100'
        }, 500);
      }
      else{
        $('.settings-panel').animate({
          'opacity': '0'
        }, 500);
      }
    });
    // return button click callback
    $('.scroll-up').click(function(){
      $('html, body').animate({
        scrollTop: $('#main-menu').offset().top
      }, 1000);
    });
    // glitch effect random timing
    $('#no-filter').mouseover(function(){
      let randomTime = Math.random() * (0.5 - 0.3) + 0.3;
      $('#blue-filter, #magenta-filter').css('animation-duration', `${randomTime}s`);
    });
  }

  function configureSettings(){
    $("#start-animation-switch input[type=checkbox]").prop('checked', false);
  }

  function initPage(){
    // Initialize Firebase
    var config = {
      apiKey: 'AIzaSyB-HwYKQL8bZUgmpkwt2OOTFwWS4K9XymE',
      authDomain: 'website-ba0ae.firebaseapp.com',
      databaseURL: 'https://website-ba0ae.firebaseio.com',
      projectId: 'website-ba0ae',
      storageBucket: 'website-ba0ae.appspot.com',
      messagingSenderId: '1033996135819'
    };
    firebase.initializeApp(config);
    AOS.init();
    $('.parallax').init();
    configureSettings();
    initializeMaterialBox();
    initializeHeaderStrokes();
    animateMainLogo();
    startCallbacks();
    arrangeGrid('.media .grid', '70vh');
    arrangeGrid('.projects .grid', '30vh');
  }

  initPage();
});
