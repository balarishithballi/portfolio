document.addEventListener('DOMContentLoaded', function () {
    // Add event listener after DOM is fully loaded
    var letsTalkButton = document.getElementById('lets-talk');
    var contactMeSection = document.getElementById('contact-me');

    if (letsTalkButton && contactMeSection) {
        letsTalkButton.addEventListener('click', function() {
            contactMeSection.scrollIntoView({ behavior: 'smooth' });
        });
    }

    // Set progress bars' widths after DOM is fully loaded
    var progressBars = document.querySelectorAll('.progress-bar');
    progressBars.forEach(function (bar) {
        var value = bar.getAttribute('data-value');
        bar.style.width = value + '%';
    });
});
