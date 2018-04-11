$(document).ready(function(){

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
    console.log('IMAGE: ' + image);
    // if the aspect ratio is a valid number
    if(aspectRatio !== -1){
      // if the width is greater than or equal to the height
      if(aspectRatio >= 1){
        $(image).css('width', '100%');
      }
      $(image).css('height', '70vh');
    }
  }

  function smallestHeightInRow(row){
    let smallestHeight = -1;
    let columns = $(row).find('.columns');
    columns.each(function(){
      let image = $(this).find('img')[0];
      if($(image).height() < smallestHeight || smallestHeight === -1){
        smallestHeight = $(image).height();
      }
    });
    return smallestHeight;
  }


  // arrangeGrid('.media .grid');
  // arrangeGrid('.projects .grid');
});
