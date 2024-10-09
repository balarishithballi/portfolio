document.addEventListener('DOMContentLoaded', function () {
    // Add event listener after DOM is fully loaded
    var letsTalkButton = document.getElementById('lets-talk');
    var contactMeSection = document.getElementById('contact-me');

    if (letsTalkButton && contactMeSection) {
        letsTalkButton.addEventListener('click', function() {
            contactMeSection.scrollIntoView({ behavior: 'smooth' });
        });
    }
    function openDocument() {
    // Replace 'path/to/your/cv.pdf' with the actual path to your CV file
    const cvUrl = 'blog/infiltr8.pdf';
    window.open(cvUrl, '_blank'); // Open the PDF in a new tab/window
}


    // Set progress bars' widths after DOM is fully loaded
    var progressBars = document.querySelectorAll('.progress-bar');
    progressBars.forEach(function (bar) {
        var value = bar.getAttribute('data-value');
        bar.style.width = value + '%';
    });
});
