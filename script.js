const track = document.querySelector('.slides-track');
const slides = Array.from(track.children);
const nextButton = document.querySelector('.next');
const prevButton = document.querySelector('.prev');

let currentIndex = 1; // Start on the first "real" slide
let isTransitioning = false;

const updateSlides = (useTransition = true) => {
    if (useTransition) {
        track.style.transition = 'transform 0.5s ease-in-out';
    } else {
        track.style.transition = 'none';
    }

    const slideWidth = slides[1].getBoundingClientRect().width;
    const offset = (track.clientWidth - slideWidth) / 2;
    
    track.style.transform = `translateX(${offset - (currentIndex * slideWidth)}px)`;
};

const moveToNext = () => {
    if (isTransitioning) return;
    isTransitioning = true;
    currentIndex++;
    updateSlides(true);
};

const moveToPrev = () => {
    if (isTransitioning) return;
    isTransitioning = true;
    currentIndex--;
    updateSlides(true);
};

// This event listener is the key to a seamless jump
track.addEventListener('transitionend', () => {
    // If we've transitioned to the last clone (a copy of the first slide)
    if (currentIndex === slides.length - 1) {
        currentIndex = 1; // Jump back to the first real slide
        updateSlides(false); // Do it instantly, without transition
    }

    // If we've transitioned to the first clone (a copy of the last slide)
    if (currentIndex === 0) {
        currentIndex = slides.length - 2; // Jump back to the last real slide
        updateSlides(false); // Do it instantly, without transition
    }

    // The transition is over, so we can allow the next click
    isTransitioning = false;
});

nextButton.addEventListener('click', moveToNext);
prevButton.addEventListener('click', moveToPrev);

// Initial and resize setup
const setupCarousel = () => {
    updateSlides(false);
};

window.addEventListener('load', setupCarousel);
window.addEventListener('resize', setupCarousel);