let track;
let container;
let slides;
let totalSlides;
let currentSlide = 0;
let intervalId;

function moveToSlide(index) {
    if (!track || !container) return; 
    
    if (index >= totalSlides) {
        index = 0;
    } else if (index < 0) {
        index = totalSlides - 1;
    }
    currentSlide = index;
    
    const scrollPosition = container.offsetWidth * currentSlide;
    track.scroll({
        left: scrollPosition,
        behavior: 'smooth'
    });
    updateDots();
}

function changeSlide(direction) {
    stopAutoPlay();
    moveToSlide(currentSlide + direction);
    startAutoPlay();
}

function initializeDots() {
    const dotsContainer = document.getElementById('slideshow-dots');
    if (!dotsContainer) return;

    dotsContainer.innerHTML = '';
    for (let i = 0; i < totalSlides; i++) {
        const dot = document.createElement('button');
        // Minimal initial classes; updateDots handles the colors
        dot.classList.add('w-3', 'h-3', 'rounded-full', 'transition', 'duration-200'); 
        dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
        dot.onclick = () => {
            stopAutoPlay();
            moveToSlide(i);
            startAutoPlay();
        };
        dotsContainer.appendChild(dot);
    }
    updateDots();
}

function updateDots() {
    const dotsContainer = document.getElementById('slideshow-dots');
    if (!dotsContainer) return;
    const dots = dotsContainer.children;
    for (let i = 0; i < dots.length; i++) {
        if (i === currentSlide) {
            dots[i].classList.add('bg-black');
            dots[i].classList.remove('bg-white/50');
        } else {
            dots[i].classList.remove('bg-black');
            dots[i].classList.add('bg-white/50');
        }
    }
}

function startAutoPlay() {
    stopAutoPlay();
    intervalId = setInterval(() => {
        moveToSlide(currentSlide + 1);
    }, 5000);
}

function stopAutoPlay() {
    if (intervalId) {
        clearInterval(intervalId);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    track = document.getElementById('slides-track');
    container = document.getElementById('slideshow-container');

    if (!track || !container) {
        console.error("Slideshow elements not found. Check IDs and HTML placement.");
        return; 
    }

    slides = track.children;
    totalSlides = slides.length;
    
    initializeDots();
    startAutoPlay();
    
    window.addEventListener('resize', () => {
        moveToSlide(currentSlide); 
    });
});