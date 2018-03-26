const LOGO_DIR = "../../res/logos/";
const IMG_LOCATION = '../../res/media/images/';
var global_year = 0;

$(document).ready(function(){
  // fetch images
  const PAGE_IMAGES = [new ImageWrapper(IMG_LOCATION + 'sample.jpg', new Date(), 'background-img'), new ImageWrapper(IMG_LOCATION + 'sonoma.jpg', new Date(), 'background-img')];

  initImages();

  function composeNode(node){
    if(node.dataset.displayable == "true" && node.dataset.type !== ""){
      var container = document.createElement("div");
      container.className = 'node-symbol-container';
      var image = document.createElement("img");
      image.className = "node-symbol";
      svgName = node.dataset.type;
      image.src = LOGO_DIR + svgName + '.svg';
      container.append(image);
      node.prepend(container);
    }
  }

  function initImages(){
    $('.page').css('display', 'none');
    for(var i = 1; i < 11; i++){
      var img = new ImageWrapper(IMG_LOCATION + 'photo_' + i + '.jpg', new Date(), 'background-img');
      $('.start').append(img.compose(document, $('.start').width(), $('.start').height()));
    }
    $('.page').css('display', 'block');
  }

  function rotateImage(index){
    var adjustedIndex = (index) % ($('.background-img').length);
    var newIndex = (index + 1) % ($('.background-img').length);
    if($('.background-img').length > 0){
      $(`.background-img:nth-of-type(${adjustedIndex + 1})`).css('opacity', '0');
      $(`.background-img:nth-of-type(${newIndex + 1})`).css('opacity', '1');
    }
  }

  $(window).scroll(function(){
    var middleWindowToTop = $(window).scrollTop() + ($(window).height()/2);
    var year = 'undefined';
    $('.timeline-section .node').each(function(i){
      const DIST_FROM_TOP_TO_NODE_START = this.offsetTop + $(this).height();
      var DIST_FROM_TOP_TO_NEXT_NODE = 0;
      var nextNode = null;
      // reset counter to 1999 if we are close to the top
      if(i == 0){
        var node = $(`.timeline-section .node:nth-of-type(${i + 1})`)[0];
        var yearCounter = $('.year-counter:first-of-type')[0];
        if(yearCounter.offsetTop < node.offsetTop){
          year = 1999;
          return false;
        }
      }
      if(i < ($('.timeline-section .node').length - 1)){
        nextNode = $(`.timeline-section .node:nth-of-type(${i + 2})`)[0];
        DIST_FROM_TOP_TO_NEXT_NODE = nextNode.offsetTop + $(nextNode).height();
        if(middleWindowToTop > DIST_FROM_TOP_TO_NODE_START && middleWindowToTop < DIST_FROM_TOP_TO_NEXT_NODE){
          const NODE_SEPARATION = DIST_FROM_TOP_TO_NEXT_NODE - DIST_FROM_TOP_TO_NODE_START;
          const DIST_FROM_FIRST_NODE = middleWindowToTop - DIST_FROM_TOP_TO_NODE_START;
          const PERCENTAGE_TRAVELED = DIST_FROM_FIRST_NODE / NODE_SEPARATION;
          year = Math.round(new Number(this.dataset.startYear) + (PERCENTAGE_TRAVELED * (new Number(nextNode.dataset.startYear) - new Number(this.dataset.startYear))));
          return false;
        }
      }
    });
    if(year !== 'undefined'){
      $('.year-counter').text(year);
    }
  });



  $('.node').each(function(){
    composeNode(this);
  });

  var index = 1;

  setInterval(function(){
    rotateImage(index);
    index++;
  }, 5000);
});
