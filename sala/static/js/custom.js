$(document).ready(function(){

  $('.scrollspy').scrollSpy({
    scrollOffset: 265
  });

  $('.slider').slider({
    indicators: false,
    interval: 2000,
    height: 600
  });

//  $('.button-collapse').sideNav();
  $('.carousel').carousel();
  $('.collapsible').collapsible();
  $('.modal').modal();
  $('.tooltipped').tooltip({delay: 50});

  $('select').material_select();

});
