document.getElementById("scrollToFAQ").addEventListener("click", function(i) {
    i.preventDefault();
    
    document.getElementById("faq-section").scrollIntoView({
        behavior: "smooth"
    });
});



document.getElementById("scrollToLearn").addEventListener("click", function(i) {
    i.preventDefault();
    
    document.getElementById("learn-section").scrollIntoView({
        behavior: "smooth"
    });
});
