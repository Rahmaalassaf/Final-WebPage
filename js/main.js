function resize() {
  if ($(window).width() < 768) {
    $(".navbar").addClass("fixed-top");
    $(".navbar").addClass("top-navbar");
  } else {
    $(".navbar").removeClass("fixed-top");
    $(".navbar").removeClass("top-navbar");
  }
}

$(document).ready(function () {
  $(window).resize(resize);
  resize();
});
