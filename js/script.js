document.addEventListener("DOMContentLoaded", () => {
    const track = document.querySelector(".carousel-track");
    const prevBtn = document.querySelector(".prev-btn");
    const nextBtn = document.querySelector(".next-btn");
    const items = document.querySelectorAll(".carousel-item");

    let index = 0; // Start at the first item (index 0)
    const totalItems = items.length;

    function updateCarousel() {
        const itemWidth = items[0].clientWidth;
        const offset = -index * itemWidth;

        // Apply the transform to the track
        track.style.transform = `translateX(${offset}px)`;
        track.style.transition = "transform 0.5s ease-in-out";

        // Update opacity and scale for all items
        items.forEach((item, i) => {
            item.style.opacity = i === index ? "1" : "0.5";
            item.style.transform = i === index ? "scale(1.1)" : "scale(0.9)";
        });
    }

    // Next Button Click
    nextBtn.addEventListener("click", () => {
        index = (index + 1) % totalItems; // Move to the next item, loop back to the first if at the end
        updateCarousel();
    });

    // Previous Button Click
    prevBtn.addEventListener("click", () => {
        index = (index - 1 + totalItems) % totalItems; // Move to the previous item, loop back to the last if at the beginning
        updateCarousel();
    });

    // Lightbox Functionality
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightbox-img");
    const lightboxDescription = document.getElementById("lightbox-description");
    const closeBtn = document.querySelector(".close-btn");

    items.forEach(item => {
        item.addEventListener("click", (e) => {
            const img = e.target.closest("img");
            if (!img) return;

            lightbox.style.display = "flex";
            lightboxImg.src = img.src;
            lightboxDescription.innerHTML = `<h3>${img.dataset.title || "Untitled"}</h3><p>${img.dataset.description || "No description available."}</p>`;
        });
    });

    closeBtn.addEventListener("click", () => {
        lightbox.style.display = "none";
    });

    // Initialize the carousel
    updateCarousel();
});

document.addEventListener("DOMContentLoaded", () => {
    const videoItems = document.querySelectorAll(".video-item");

    function revealOnScroll() {
        videoItems.forEach(item => {
            const itemTop = item.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            if (itemTop < windowHeight * 0.85) {
                item.classList.add("visible");
            }
        });
    }

    window.addEventListener("scroll", revealOnScroll);
    revealOnScroll(); // Run on load
});
