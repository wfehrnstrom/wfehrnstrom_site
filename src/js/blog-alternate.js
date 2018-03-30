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
  var blog_animated = false;
  $('.nav-button').on('click', function(){
    //resetBlogHeaderAnimation();
    console.log(blog_animated);
    animateBlogHeader(blog_animated);
    blog_animated = true;
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

  function animateBlogHeader(beenAnimated){
    let animationDuration = 3000;
    // if we have not animated this header before, animate it
    // checks the stroke offset of the top line on the svg logo to see if it has no offset
    // if it doesn't, then we've already animated this
    if(parseInt($('#top-line').css('stroke-dashoffset')) !== 0 && !beenAnimated){
      $('#top-line').animate({
        'stroke-dashoffset': '0'
      }, animationDuration, function(){
        $('#top-line').css('stroke-dashoffset', '0');
      });
      var horizontal_line_offset = $('#bottom-line').css('stroke-dashoffset');
      $('#bottom-line').animate({
        'stroke-dashoffset': `${document.querySelector('#bottom-line').getTotalLength() + parseInt(horizontal_line_offset)}`
      }, animationDuration, function(){
        $('#bottom-line').css('stroke-dashoffset', `${document.querySelector('#bottom-line').getTotalLength() + parseInt(horizontal_line_offset)}`);
      });
      var vertical_line_offset = $('#left-line').css('stroke-dashoffset');
      $('#left-line').animate({
        'stroke-dashoffset': `${document.querySelector('#left-line').getTotalLength() + parseInt(vertical_line_offset)}`
      }, animationDuration, function(){
        $('#left-line').css('stroke-dashoffset', `${document.querySelector('#left-line').getTotalLength() + parseInt(vertical_line_offset)}`);
      });
      $('#right-line').animate({
        'stroke-dashoffset': '0'
      }, animationDuration, function(){
        $('#right-line').css('stroke-dashoffset', '0');
      });
      setTimeout(finishBlogHeaderAnimation, animationDuration, horizontal_line_offset, vertical_line_offset);
    }
  }

  function finishBlogHeaderAnimation(horizontal_line_offset, vertical_line_offset){
    // get the new accurate length of the bottom and left strokes by taking the total lengths and subtracting from them the change in offset from beginning to now
    let bottomLength = document.querySelector('#bottom-line').getTotalLength() - Math.abs(horizontal_line_offset - parseInt($('#bottom-line').css('stroke-dashoffset')));
    let leftLength = document.querySelector('#left-line').getTotalLength() - Math.abs(vertical_line_offset - parseInt($('#left-line').css('stroke-dashoffset')));
    $('#top-line').css('stroke-dashoffset', '0');
    $('#bottom-line').css('stroke-dashoffset', `${bottomLength + parseInt($('#bottom-line').css('stroke-dashoffset'))}`);
    $('#left-line').css('stroke-dashoffset', `${leftLength + parseInt($('#left-line').css('stroke-dashoffset'))}`);
    $('#right-line').css('stroke-dashoffset', '0');
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
    }, 2500);
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

  function revealPostHeader(post){
    let header = $(post).find('.blog-header-2');
    if(header.height() == 0){
      $(header).animate({
        'height': '100%',
        'opacity': '100'
      }, 1000);
    }
  }

  function revealPost(post){
    let postContent = $(post).find('.blog-content');
    if(postContent){
      $(postContent).animate({
        'height':'100%',
        'opacity':'100'
      }, 1000);
    }
  }

  function hidePost(post){
    let postContent = $(post).find('.blog-content');
    if(postContent){
      $(postContent).animate({
        'height':'0',
        'opacity':'0'
      }, 1000);
    }
  }

});
