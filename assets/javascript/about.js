/* ==========================================
   WHO WE WORK WITH CAROUSEL
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    const track = document.querySelector(".carousel-track");

    if (!track) return;

    const cards = Array.from(track.children);
    const prevBtn = document.querySelector(".carousel-btn.prev");
    const nextBtn = document.querySelector(".carousel-btn.next");

    let cardsVisible = getCardsVisible();
    let currentIndex = 0;

    function getCardsVisible() {

        if (window.innerWidth <= 768) return 1;
        if (window.innerWidth <= 1100) return 2;

        return 3;

    }

    function updateCarousel() {

        cardsVisible = getCardsVisible();

        const cardWidth = cards[0].offsetWidth;
        const gap = 32;

        track.style.transform =
            `translateX(-${currentIndex * (cardWidth + gap)}px)`;

    }

    function nextSlide() {

        const maxIndex = cards.length - cardsVisible;

        if (currentIndex >= maxIndex) {

            currentIndex = 0;

        } else {

            currentIndex++;

        }

        updateCarousel();

    }

    function previousSlide() {

        const maxIndex = cards.length - cardsVisible;

        if (currentIndex <= 0) {

            currentIndex = maxIndex;

        } else {

            currentIndex--;

        }

        updateCarousel();

    }

    nextBtn.addEventListener("click", nextSlide);

    prevBtn.addEventListener("click", previousSlide);

    window.addEventListener("resize", updateCarousel);

    /* ==========================================
       AUTOPLAY
    ========================================== */

    let autoplay = setInterval(nextSlide, 5000);

    track.addEventListener("mouseenter", () => {

        clearInterval(autoplay);

    });

    track.addEventListener("mouseleave", () => {

        autoplay = setInterval(nextSlide, 5000);

    });

    /* ==========================================
       TOUCH SUPPORT
    ========================================== */

    let touchStartX = 0;
    let touchEndX = 0;

    track.addEventListener("touchstart", e => {

        touchStartX = e.changedTouches[0].screenX;

    });

    track.addEventListener("touchend", e => {

        touchEndX = e.changedTouches[0].screenX;

        if (touchStartX - touchEndX > 50) {

            nextSlide();

        }

        if (touchEndX - touchStartX > 50) {

            previousSlide();

        }

    });

    updateCarousel();

});