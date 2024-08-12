/* Responsive menu */

let navLinks = document.getElementById("links");

function openCloseMenu() {
  navLinks.classList.toggle("active");
}

document.getElementById("close-menu").addEventListener("click", function () {
  navLinks.classList.remove("active");
});

/* Slider 2 for project 2 */

const initSlider = () => {
  const sliderBtns = document.querySelectorAll(".slider2-wrapper .slider-btn");
  const sliderScrollbar = document.querySelector(
    ".wrapper-2 .slider2-scrollbar"
  );
  const scrollbarThumb = sliderScrollbar.querySelector(".scrollbar-thumb");
  const imagesList = document.querySelector(".slider2-wrapper .images-list");
  const maxScrollLeft = imagesList.scrollWidth - imagesList.clientWidth;

  scrollbarThumb.addEventListener("mousedown", (e) => {
    const startX = e.clientX;
    const thumbPosition = scrollbarThumb.offsetLeft;

    const handleMouseMove = (e) => {
      const deltaX = e.clientX - startX;
      const newThumbPosition = thumbPosition + deltaX;
      const maxThumbPosition =
        sliderScrollbar.getBoundingClientRect().width -
        scrollbarThumb.offsetLeft;
      const boundedPosition = Math.max(
        0,
        Math.min(maxThumbPosition, newThumbPosition)
      );
      const scrollPosition =
        (boundedPosition / maxThumbPosition) * maxScrollLeft;
      scrollbarThumb.style.left = `${boundedPosition}px`;
      imagesList.scrollLeft = scrollPosition;
    };

    const handleMouseUp = () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  });

  sliderBtns.forEach((button) => {
    button.addEventListener("click", () => {
      const direction = button.id === "prev-btn" ? -1 : 1;
      const scrollAmount = imagesList.clientWidth * direction;
      imagesList.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    });
  });
  const handleSlideBtns = () => {
    sliderBtns[0].style.display = imagesList.scrollLeft <= 0 ? "none" : "block";
    sliderBtns[1].style.display =
      imagesList.scrollLeft >= maxScrollLeft ? "none" : "block";
  };

  const updateScrollThumbPosition = () => {
    const scrollPosition = imagesList.scrollLeft;
    const thumbPosition =
      (scrollPosition / maxScrollLeft) *
      (sliderScrollbar.clientWidth - scrollbarThumb.offsetWidth);
    scrollbarThumb.style.left = `${thumbPosition}px`;
  };

  imagesList.addEventListener("scroll", () => {
    handleSlideBtns();
    updateScrollThumbPosition();
  });
};

window.addEventListener("load", initSlider);
