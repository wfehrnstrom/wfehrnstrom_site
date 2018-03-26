$(document).ready(function(){
  function main(){
    $.ajax({
      url: "blog_aux.js",
      dataType: "script",
      cache: false
    }).done(function(){
      var metrics_button = document.querySelector('.metrics-button');
      var metrics_height = 100;
      var metricClicks = 0;
      var colorCode = getColorCodedTypes();
      var postNumMapping = getPostNumberMapping();
      console.log(postNumMapping);
      $(metrics_button).click(function(){
        if(metricClicks % 2 == 0){
          setTimeout(getBlogMap, 1000, colorCode, postNumMapping);
        }
        metricClicks++;
      });
    });
  }

  function setMetricsHeight(metricsHeight, units){
    var units = units || 'px';
    var metricsHeight = metricsHeight || 20;
    var pageHeight = $('.page').height();
    $('.metrics').height(`${metricsHeight}${units}`);
    return pageHeight;
  }

  function sectionHeight(){
    var num_sections = numSections();
    return (100/num_sections);
  }

  function numSections(){
    return document.querySelectorAll('.metrics-section').length;
  }

  function setPageHeight(pageHeight, units){
    var units = units || 'px';
    var oldHeight = $('.page').height();
    $('.page').height(`${pageHeight}${units}`);
    return oldHeight;
  }

  function renderSampleChart(){
    $('.post-types').width(`${graph_width}`);
     $('.post-types').height(`${graph_width/3}`);
    var ctx = document.getElementById("post-types").getContext('2d');
    var myChart = new Chart(ctx, {
      type: 'bar',
      data: {
          labels: ["Personal", "How-To", "Review", "Poetry"],
          datasets: [{
              label: 'Number of Posts',
              data: [12, 19, 3, 5, 2, 3],
              backgroundColor: [
                  'rgba(54, 162, 235, 0.2)', //how-to
                  'rgba(255, 99, 132, 0.2)', //personal
                  'rgba(54, 162, 235, 0.2)',
                  '#ff990033'
              ],
              borderColor: [
                  '#ff6384',
                  '#36a2eb',
                  '#4bc0c0',
                  '#ff9f40'
              ],
              borderWidth: 1
          }]
      },
      options: {
          scales: {
              yAxes: [{
                  ticks: {
                      beginAtZero:true
                  }
              }]
          },
          maintainAspectRatio: false,
          responsive: true
      }
    });
  }

  function getBlogMap(colorCoding, numberMapping){
    var graph_width = $('.metrics').width();
    $('.post-types').width(`${graph_width}`);
    $('.post-types').height(`${graph_width/3}`);
    console.log("LABELS: " + colorCoding[0]);
    var data = Array.from(numberMapping.values())
    console.log("DATA: " + data);
    console.log("BACKGROUND COLOR: " + colorCoding[1]);
    console.log("BORDER COLOR: " + colorCoding[2]);
    var unfilteredLabels = colorCoding[0];
    console.log("UNFILTERED LABELS: " + unfilteredLabels);
    console.log("FILTERING BG COLORS");
    var filteredBGColors = filterByLabel(unfilteredLabels, colorCoding[1]);
    console.log("FILTERING BORDER COLORS");
    var filteredBorderColors = filterByLabel(unfilteredLabels, colorCoding[2]);
    console.log("FILTERING LABELS");
    var labelsAsValue = unfilteredLabels.slice();
    var filteredLabels = filterByLabel(unfilteredLabels, labelsAsValue);
    console.log("LABELS1: " + filteredLabels);
    console.log("BACKGROUND COLOR1: " + filteredBGColors);
    console.log("BORDER COLOR1: " + filteredBorderColors);
    var ctx = document.getElementById("post-types").getContext('2d');
  //   var blogTypeMapping = new Chart(ctx, {
  //     type: 'bar',
  //     data: {
  //       label: colorCoding[0],
  //       datasets: [{
  //         data: data,
  //         backgroundColor: filteredBGColors,
  //         borderColor: filteredBorderColors,
  //         borderWidth: 1
  //       }]
  //     },
  //     options: {
  //       scales: {
  //         yAxes: [{
  //           ticks: {
  //             beginAtZero: true
  //           }
  //         }]
  //       },
  //       maintainAspectRatio: false,
  //       responsive: true
  //     }
  //   });
    }

  function renderNumberPostsChart(){

  }

  // Line Chart with each dot's height representing number of views for that blog post
  function renderPostPopularityChart(){

  }

  function resizeGraphs(){
    var charts = document.querySelectorAll('.chart-container');
    charts.forEach(function(chart){
      $(chart).width($('.page').width());
      $('.metrics-section').width($('.page').width());
    });
  }

  main();

  // event handlers
  $(window).resize(resizeGraphs);

});

//include('blog-aux.js');
