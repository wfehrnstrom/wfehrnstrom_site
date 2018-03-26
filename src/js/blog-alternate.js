function getHeight(postID){
  // retrieves the height of a given post
  var post = $(document).getElementByID(postID);
  return post.height();
}

$(document).ready(function(){
  // colorMap in this file will be deprecated
  var colorMap = new Map([['personal', '#2F80ED'], ['how-to','#ffb3b3'], ['review', '#b3ffb3'], ['poetry', '#ff9900']]);
  // get a list of posts
  var posts = document.querySelectorAll('.post');
  // create a variable to store the number of times the metric button has been clicked.  This helps to determine whether we should
  // fade the blog in or out
  var metricClicks = 0;
  // create a date object for a test blog
  var date = new Date('December 17, 1995 03:24:00');
  var testBlog = new Blog('BLOG BODY', date, 'personal', 0, 'Will Fehrnstrom', 'Test', 'Let there be Light');
  // /$('.blogs').append(testBlog.compose(document));
  // hide the metrics page
  hideMetrics();
  // show the page header
  headerShow($('.title').text());
  // check which banners are in view of the window
  animateAllVisibleBanners();
  // populate scrollbar according to the types of blogs
  populateScrollbar($('.post'), $('.blogs'));
  // color the banners for the page
  colorBanners();

  // on scrolling of the window
  $(window).scroll(function(){
    // reposition the scrollbar
    scrollReposition();
    // check if any new blog banners are in view
    animateAllVisibleBanners();
  });

  // select all the share buttons in the blog
  var share_buttons = document.querySelectorAll('.blog-share-button');

  // on clicking the link to any of the pages, trigger a header animation
  $('.nav-button').on('click', function(){
    resetBlogHeaderAnimation();
    animateBlogHeader();
  });

  // on hovering over any of the blog aux share buttons
  $(share_buttons).hover(function(e){
    // TODO: figure out a better way to select the post of the share button
    var post = e.currentTarget.parentElement.parentElement.parentElement;
    // get the ID for the current post
    var postID = $(post).attr('id');
    // get the share buttons for the currentPost
    var share_buttons = document.querySelectorAll(`#${postID} .share-button`);
    // animate showing the share buttons
    share_buttons.forEach(function(button){
      $(button).animate({
        opacity: 1
      }, 500);
    });
  }, function(e){
      // TODO: figure out a better way to select the post of the share button
      var post = e.currentTarget.parentElement.parentElement.parentElement;
      // get the ID for the current post
      var postID = $(post).attr('id');
      // get the share buttons for the currentPost
      var share_buttons = document.querySelectorAll(`#${postID} .share-button`);
      // animate showing the share buttons
      share_buttons.forEach(function(button){
        $(button).animate({
          opacity: 0
        }, 1000);
      });
  });

  // select the metrics button
  var metrics_button = document.querySelector('.metrics-button');

  // on hovering over the metrics button, scale it up
  $(metrics_button).hover(function(e){
    $(metrics_button).css('transform', `scale(1.3)`);
  }, function(e){
    $(metrics_button).css('transform', `scale(0.975)`);
  });

  // on clicking the metrics button
  $(metrics_button).click(function(){
    var duration = 1000;
    if(metricClicks % 2 == 0){
      var metrics_height = 100;
      window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth'
      })
      fadeBlog(0, duration);
      setTimeout(depopulateScrollbar, duration);
      setTimeout(setMetricsHeight, duration, metrics_height, '%');
      setTimeout(showMetrics, duration/3);
    }
    else{
      hideMetrics();
      fadeBlog(1);
      setTimeout(populateScrollbar, 300, $('.post'), $('.blogs'));
    }
    metricClicks++;
  });

  function resetBlogHeaderAnimation(){
    $('.title-line-vertical').css('display', 'none');
    $('.title-line-horizontal').css('display', 'none');
    //$('.title-line-vertical:first-of-type').css('margin-top', '215%');
    //$('.title-line-vertical:last-of-type').css('margin-bottom', '215%');
    $('.title-line-horizontal-bottom').css('margin-left', '100vw');
    $('.title-line-horizontal:first-of-type').width(0);
  }

  function animateBlogHeader(){
    $('#top-line').animate({
      'stroke-dashoffset': '0'
    }, 3000, 'easeOutQuad');
    var horizontal_line_offset = $('#bottom-line').css('stroke-dashoffset');
    $('#bottom-line').animate({
      'stroke-dashoffset': `${2*parseInt(horizontal_line_offset)}`
    }, 3000, 'easeOutQuad');
    var vertical_line_offset = $('#left-line').css('stroke-dashoffset');
    $('#left-line').animate({
      'stroke-dashoffset': `${2*parseInt(vertical_line_offset)}`
    }, 3000, 'easeOutQuad');
    $('#right-line').animate({
      'stroke-dashoffset': '0'
    }, 3000, 'easeOutQuad');
  }

  function headerShow(text){
    var textLength = text.length;
    var originalText = text;
    var title_text = text;
    for(var i = 0; i < textLength; i++){
      var randNum = Math.random();
      var letter;
      if(randNum < 0.5){
        letter = '0';
      }
      else {
        letter = '1';
      }
      title_text = title_text.substring(0, i) + letter + title_text.substring(i + 1, originalText.length);
    }
    $('.title').text(title_text);
    var index = 0;
    var transform = setInterval(function(){
        title_text = title_text.substring(0, index) + originalText.substring(index, index + 1) + title_text.substring(index + 1, originalText.length);
        $('.title').text(title_text);
        index++;
        if(index >= originalText.length){
          clearInterval(transform);
        }
      }, 140);
  }


  //Populate scrollbar with blog information
  // elements: a list of elements to populate the scrollbar according to.
  // section: the entire section in which the elements are contained.
  function populateScrollbar(elements, section){
    var numPosts = elements.length; // $('.posts')
    var sectionHeight = section.height(); // $('.blogs')
    var heightPercentages = [];
    for(var i = 0; i < numPosts; i++){
      var element = $(`.${elements.attr('class')}:nth-of-type(${i + 1})`);
      var elementHeight = $(element).height();
      if(elementHeight !== 0){
        // heightPercentages.push(elementHeight/sectionHeight);
        // var scrollDiv = document.createElement('div');
        // var scrollLink = document.createElement('a');
        // $('.blog-scroller').append(scrollLink);
        // $(scrollLink).addClass('scroll-link');
        // $('.scroll-link').append(scrollDiv);
        // $(scrollDiv).addClass('scroll-div');
        // $(scrollLink).height(`${heightPercentages[i] * 100}%`);
        // $(scrollLink).attr('href', `#${$(element).attr('id')}`);
        // $(scrollDiv).height('100%');
        // //var color = colorMap.get(element[0].dataset.blogType);
        // $(scrollLink).css('background-color', `${color}`);
      }
    }
  }

  function depopulateScrollbar(section){
    $('.scroll-link').remove();
  }

  function colorBanners(){
    var numPosts = $('.color-banner').length;
    console.log(numPosts);
    for(var i = 0; i < numPosts; i++){
      var postID = $(`.post:nth-of-type(${i + 1})`).attr('id');
      console.log(postID);
      var post = $(`.post:nth-of-type(${i + 1})`);
      console.log(post);
      var post_color = colorMap.get(post[0].dataset.blogType);
      $(`#${postID} .color-banner`).css('background-color', `${post_color}`);
    }
  }

  function animateAllVisibleBanners(){
    var banner_size = $('.color-banner').length;
    for(let i = 0; i < banner_size; i++){
      var banners = document.querySelectorAll('.color-banner');
      if(blogBannerInView(i) && $('.blogs').css('display') != 'none' && $(banners[i]).width() == 0){
        animateBanner(i);
      }
    }
  }

  function scrollReposition(){
    var heightFromTop = $(window).scrollTop();
    var scrollBarHeight = $('.blog-scroller').height() - $('.scroll-position').height();
    var adjustedDocHeight = $(document).height() - $(window).height();
    var percentageOfPageScrolled = heightFromTop/adjustedDocHeight;
    var percentageThatScrollerTakesUp = $('.scroll-position').height()/$('.blog-scroller').height();
    var percentageOffset = percentageOfPageScrolled - percentageThatScrollerTakesUp;
    if(percentageOffset < 0){
      percentageOffset = 0;
    }
    $('.scroll-position').css('top', `${percentageOffset * 100}%`);
  }

  function getPosition(element) {
    var xPosition = 0;
    var yPosition = 0;

    while(element) {
        xPosition += (element.offsetLeft - element.scrollLeft + element.clientLeft);
        yPosition += (element.offsetTop - element.scrollTop + element.clientTop);
        element = element.offsetParent;
    }

    return { x: xPosition, y: yPosition };
  }

  function animateBanner(i){
    var banners = document.querySelectorAll('.color-banner');
    var banner = banners[i];
    $(banner).animate({
      width: '100%'
    }, 2500, 'swing');
  }

  function blogBannerInView(index){
    var banners = document.querySelectorAll('.color-banner');
    var offsets = getPosition(banners[index]);
    var distBottomWindowPageStart = $(window).scrollTop() + $(window).height();
    if((offsets.y < distBottomWindowPageStart)){
      return true;
    }
  }

  function toggleDisplay(id){
    if(!id){
      return -1;
    }
    var currentState = $(id).css('display');
    if(currentState == 'none'){
      $(id).css('display', 'block');
      return 1;
    }
    else if(currentState == 'block'){
      $(id).css('display', 'none');
      return 0;
    }
  }

  function shouldFade(elementToFade, noFadeElements){
    if(!noFadeElements || (noFadeElements.length == 0)){
      noFadeElements = ['.metrics-button', '#metrics-expander', '.blog-scroller', '.scroll-position', '.scroll-link'];
    }
    for(var i = 0; i < noFadeElements.length; i++){
      var element = noFadeElements[i];
      if(!element.includes('#') && element.includes('.')){
        if($(elementToFade).hasClass(element.substring(1, element.length))){
          return false;
          break;
        }
      }
      else if($(elementToFade).is(element)){
        return false;
        break;
      }
    }
    return true;
  }

  function changeOpacity(elementToChange, opacityLevel, duration){
    var classList = $(elementToChange).get(0).classList;
    var currentOpacity = $(elementToChange).css('opacity');
    if(classList.contains('opacity-immutable')){
      opacityLevel = $(elementToChange).css('opacity');
    }
    if(currentOpacity > opacityLevel){
      $(elementToChange).animate({
        opacity: opacityLevel
      }, duration);
    }
    else{
      $(elementToChange).animate({
        opacity: opacityLevel
      }, duration);
    }
  }

  function fadeBlog(opacityLevel, duration){
    var duration = duration || 1000;
    var numElements = $('.blogs *').length;
    var elements = document.querySelectorAll('.blogs *');
    for(var i = 0; i < numElements; i++){
      var fadeElement = shouldFade(elements[i]);
      if(fadeElement){
        changeOpacity(elements[i], opacityLevel, duration);
      }
    }
  }

  function hideMetrics(){
    var numElements = $('.metrics *').length;
    var elements = document.querySelectorAll('.metrics *');
    for(var i = 0; i < numElements; i++){
      var query = `${elements[i].className}`;
      var classNames = query.split(' ');
      var string = '';
      classNames.forEach(function(element, i){
        classNames[i] = '.' + element;
        if((i + 1) !== classNames.length){
          string += classNames[i] + ' ';
        }
      });
      $(`.metrics ${string}`).css('display', 'none');
    }
  }

  function showMetrics(){
    $('.metrics').css('display', 'flex');
    var elements = document.querySelectorAll('.metrics *');
    for(var i = 0; i < elements.length; i++){
      if(elements[i].className.includes('flex')){
        $(elements[i]).css('display', 'flex');
      }
      else{
        $(elements[i]).css('display', 'block');
      }
      if(elements[i].className.includes('position-relative')){
        $(elements[i]).css('position', 'relative');
      }
    }
  }

  function setMetricsHeight(metricsHeight, units){
    var units = units || 'px';
    var metricsHeight = metricsHeight || 20;
    var pageHeight = $('.page').height();
    $('.metrics').height(`${metricsHeight}${units}`);
    return pageHeight;
  }

});
