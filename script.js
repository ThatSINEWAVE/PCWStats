// JavaScript for hiding and showing header on scroll
let lastScrollTop = 0;
const header = document.getElementById('header');

window.addEventListener('scroll', () => {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    if (scrollTop > lastScrollTop) {
        // Scroll down
        header.style.top = '-70px';
    } else {
        // Scroll up
        header.style.top = '0';
    }
    lastScrollTop = scrollTop;
});
