// getBlogTypes
// returns: an array of every unique blog type label
function getBlogTypes(){
  var blogs = document.querySelectorAll(".post");
  var postTypes = [];
  for(var i = 0; i < blogs.length; i++){
    if(!postTypes.includes(blogs[i].dataset.blogType)){
      postTypes.push(blogs[i].dataset.blogType);
    }
  }
  return postTypes;
}

// getColorCodedTypes
// returns a two element two dimensional array mapping a given label to a given color
function getColorCodedTypes(){
  var colorCode = [["how-to", "poetry", "null", "review", "personal", "null", "null"], ["rgba(255, 99, 132, 0.2)","rgba(255, 159, 64, 0.2)",
  "rgba(255, 205, 86, 0.2)","rgba(75, 192, 192, 0.2)","rgba(54, 162, 235, 0.2)",
  "rgba(153, 102, 255, 0.2)","rgba(201, 203, 207, 0.2)"],["rgb(255, 99, 132)",
  "rgb(255, 159, 64)","rgb(255, 205, 86)","rgb(75, 192, 192)","rgb(54, 162, 235)",
  "rgb(153, 102, 255)","rgb(201, 203, 207)"]];
  return colorCode;
}

// filterByLabel
// given two arrays, one an array of string blog type labels, and one another array of the same length containing any elements
// this function will splice out any elements of the arrayToSplice with an index correspnding to a null label
function filterByLabel(labels, arrayToSplice){
  var label_index = 0;
  var splice_index = 0;
  while(splice_index < arrayToSplice.length && label_index < labels.length){
    if(labels[label_index].toLowerCase() == "null"){
      arrayToSplice.splice(splice_index, 1);
      console.log(arrayToSplice);
      console.log(labels);
    }
    else{
      splice_index++;
    }
    label_index++;
  }
  return arrayToSplice;
}

// getPostNumberMapping
// this function returns a map, with key string "blog type label", and value an integer that represents how many blog posts there are
function getPostNumberMapping(){
  var blogTypes = getBlogTypes();
  var postNumberMapping = new Map();
  var blogs = document.querySelectorAll(".post");
  for(var i = 0; i < blogTypes.length; i++){
    var count = 0;
    for(var j = 0; j < blogs.length; j++){
      if(blogTypes[i] == blogs[j].dataset.blogType){
        count++;
      }
    }
    postNumberMapping.set(blogTypes[i], count);
  }
  return postNumberMapping;
}
