document.getElementById('lets-talk').addEventListener('click', function() {
    document.getElementById('contact-me').scrollIntoView({ behavior: 'smooth' });
});
document.addEventListener('DOMContentLoaded', function () {
  var progressBars = document.querySelectorAll('.progress-bar');
  progressBars.forEach(function (bar) {
      var value = bar.getAttribute('data-value');
      bar.style.width = value + '%';
  });
});

