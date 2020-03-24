
// jQuery for the main carousel
$(document).ready(function(){
  $('.carousel').carousel();
  fullWidth: true

});


// to give carousel a time interval but unfortunately it also gave time to the other pictures! :/
// setInterval(function(){
//   $('.carousel').carousel('next');
// }, 3000);


    

// start carrousel
$('.carousel.carousel-slider').carousel({
  fullWidth: true,
  indicators: false
});


// move next carousel
$('.moveNextCarousel').click(function(e){
  e.preventDefault();
  e.stopPropagation();
  $('.carousel').carousel('next');
});

// move prev carousel
$('.movePrevCarousel').click(function(e){
  e.preventDefault();
  e.stopPropagation();
  $('.carousel').carousel('prev');
});


