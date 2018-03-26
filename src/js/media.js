$(document).ready(function(){
  // CONSTANT HEIGHTS
  const MEDIA_ROW_HEIGHT = 300;
  const MAX_MEDIA_ITEM_WIDTH_WITHOUT_OVERFLOW = MEDIA_ROW_HEIGHT;
  const NAV_HEADER_HEIGHT = 150;
  const VID_LOCATION = '../../res/media/videos/';
  const IMG_LOCATION = '../../res/media/images/';
  const STATIC_LOCATION = '../../res/media/videos/static/'
  const IMG_LOCATION = '../../res/media/images/';


  // Get the number of rows of media based on the number of elements passed, which have a fixed width
  function mediaNumRows(numElements, mediaItemWidth=$('.list-item').width()){
    var pageWidth = $('.page').width();
    var numMediaRows = Math.ceil((numElements * mediaItemWidth)/pageWidth);
    return numMediaRows;
  }

  // Get the number of rows expected for a given height based on the constant height of a single row
  function numRowsForHeight(height){
    return Math.floor(height/MEDIA_ROW_HEIGHT);
  }

  // Get the total height of the media section, calculated by multiplying the number of rows and the height of a media row
  function mediaNavHeight(){
    var numMediaRows = mediaNumRows();
    var mediaSectionHeight = numMediaRows * MEDIA_ROW_HEIGHT;
    return mediaSectionHeight;
  }

  // Get the number of items in a given row by using the constant MEDIA_ITEM_WIDTH
  function numItemsInMediaRow(){
    var pageWidth = $('.page').width();
    var numItems = Math.floor(pageWidth/MAX_MEDIA_ITEM_WIDTH_WITHOUT_OVERFLOW);
    return numItems;
  }

  // get the total extra space in a given row after subtracting the width of the row's elements
  function rowOverflow(){
    var width = $('.nav-banner').width();
    var numItems = numItemsInMediaRow();
    var overflow = 0;
    if(numItems > 0){
      overflow = width - (numItems * MAX_MEDIA_ITEM_WIDTH_WITHOUT_OVERFLOW);
    }
    return overflow;
  }

  // get the extra space per row item
  function mediaItemWidthOverflow(){
    var numItems = numItemsInMediaRow();
    var overflow = rowOverflow();
    var overflowPerItem = 0;
    if(numItems > 0){
      overflowPerItem = overflow/numItems;
    }
    return overflowPerItem;
  }

  // get the extra space of the media section divided by the number of rows
  function mediaItemHeightOverflow(){
    var containerHeight = $('.nav-banner').height();
    var numRows = numRowsForHeight(containerHeight);
    var totalRowHeight = numRows * MEDIA_ROW_HEIGHT;
    if(numRows > 0){
      return (containerHeight - totalRowHeight)/numRows;
    }
    return 0;
  }

  // get the [extra width space per item , and extra height space per item]
  function overflowPerItem(){
    return [(mediaItemWidthOverflow()), mediaItemHeightOverflow()];
  }

  // remove a list item from the media list.  If there are no more list items, load the central page
  function removeGIF(index){
    $('.list-item:first-of-type').css('display', 'none');
    $('.list-item:first-of-type').remove();
    if($('.list-item').length == 0){
      loadPage();
    }
  }

  // remove all the page's loading gif's
  function removeLoadingGifs(){
    var length = $('.loading-gif').length + 1;
    for(var i = 1; i < length; i++){
      setTimeout(removeGIF, i * (Math.random() * 600), i);
    }
  }

  // Insert a random loading gif into each of the loading elements on the media page
  function populateGifs(){
    var files = [];
    // grab gif files.
    // TODO: Make server side
    for(var i = 1; i < 9; i++){
      files.push(STATIC_LOCATION + i.toString() + ".gif");
    }
    var numElements = $('.list-item').length;
    if(numElements == 0){
      numElements = 1;
    }
    for(var i = 0; i < numElements; i++){
      insertLoadingGifIntoList(files, $(`.list-item:nth-of-type(${i + 1})`));
    }
  }

  // insert a single loading gif onto each list item
  function insertLoadingGifIntoList(fileArray, elementToAppendTo){
    var loadingImageElement = document.createElement("img");
    loadingImageElement.className = "loading-gif";
    var choice = fileArray[Math.floor(Math.random() * 8)];
    loadingImageElement.src = choice;
    elementToAppendTo.append(loadingImageElement);
  }

  // fill up the media section with the images contained in the images array
  // images: an array of ImageWrapper elements
  // fill: boolean indicating whether the height of an element should extend to fill extra space in the y-direction
  function populateMediaByContent(images, fill){
    var numElements = images.length;
    var overflowForEachItem = overflowPerItem();
    var width = 0;
    var height = 0;
    if(fill){
      height = MEDIA_ROW_HEIGHT + overflowForEachItem[1];
    }
    else{
      height = MEDIA_ROW_HEIGHT;
    }
    width = MAX_MEDIA_ITEM_WIDTH_WITHOUT_OVERFLOW + overflowForEachItem[0];
    for(var i = 0; i < numElements; i++){
      var mediaElement = document.createElement("li");
      mediaElement.className = "list-item";
      if(images.length > 0){
        mediaElement.append(images[i].compose(document, width, height));
      }
      $('.media-list').append(mediaElement);
    }
    $('.list-item').width(width);
    $('.list-item').height(height);
  }

  // populate the media section with elements based on a given height parameter, where at least one element will be inserted.
  // The number of list-items inserted depends on the default height and width of a list element
  function populateMediaByHeight(height){
    var numElements = numItemsInMediaRow() * numRowsForHeight(height);
    if(numElements == 0){
      numElements = 1;
    }
    var overflowForEachItem = overflowPerItem();
    var width = MAX_MEDIA_ITEM_WIDTH_WITHOUT_OVERFLOW + overflowForEachItem[0];
    var height = MEDIA_ROW_HEIGHT + overflowForEachItem[1];
    for(var i = 0; i < numElements; i++){
      var mediaElement = document.createElement("li");
      mediaElement.className = "list-item";
      $('.media-list').append(mediaElement);
    }
    $('.list-item').width(width);
    $('.list-item').height(height);
  }

  // JS to execute in order to bring the page to a fully loaded state
  function loadPage(){
    transitionOut();
    $('.nav-header').css('background-color', 'white');
    var images = [new ImageWrapper(IMG_LOCATION + 'sample.jpg', new Date()), new ImageWrapper(IMG_LOCATION + 'sample.jpg', new Date()), new ImageWrapper(IMG_LOCATION + 'sample.jpg', new Date()),
    new ImageWrapper(IMG_LOCATION + 'sample.jpg', new Date())];
    populateMediaByContent(images, true);
  }

  // transition from start button to a fully loaded page
  function transition(){
    $('.nav-header').height(0);
    $('.nav-banner').height('100%');
    console.log("HEIGHT 100%");
    populateMediaByHeight($('.nav-banner').height());
    populateGifs();
    setTimeout(removeLoadingGifs, 1000);
  }

  // set properties necessary to end transition
  function transitionOut(){
    console.log("BEFORE 90%: " + $('.nav-banner').height());
    $('.nav-banner').height(.9 * 421);
    console.log("AFTER 90%: " + $('.nav-banner').height());
    $('.nav-header').height(.1 * $('.page').height());
    $('.nav-banner').css('background-color', 'red');
  }

  // hide the start button and transition to a loaded page when the start button is clicked
  $('.start-button').click(function(){
    $('.start-button').css('display', 'none');
    transition();
  });

  // set both nav-banner and nav-header to zero at the start, since we only want to display the start-button and raw page
  $('.nav-banner').height(0);
  $('.nav-header').height(0);
});
