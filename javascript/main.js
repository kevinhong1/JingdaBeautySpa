document.addEventListener("DOMContentLoaded", function () {
  const gallery = document.getElementById("gallery");
  const track = document.querySelector(".gallery-track");
  const items = document.querySelectorAll(".gallery-item");
  const totalItems = items.length;

  let currentPosition = 0;
  const containerWidth = document.querySelector(
    ".carousel-container"
  ).offsetWidth;
  const itemWidth = (containerWidth - 60) / 3;
  const scrollAmount = itemWidth + 30;
  let isScrolling = false;
  let lastScrollTime = Date.now();
  const scrollCooldown = 100;

  for (let i = 0; i < 3; i++) {
    items.forEach((item) => {
      const clone = item.cloneNode(true);
      track.appendChild(clone);
    });
    items.forEach((item) => {
      const clone = item.cloneNode(true);
      track.insertBefore(clone, track.firstChild);
    });
  }

  currentPosition = -totalItems * scrollAmount;
  track.style.transform = `translateX(${currentPosition}px)`;

  function updatePosition(direction) {
    track.style.transition = "transform 0.5s ease";

    if (direction > 0) {
      currentPosition -= scrollAmount;
      track.style.transform = `translateX(${currentPosition}px)`;

      if (Math.abs(currentPosition) >= totalItems * 4 * scrollAmount) {
        setTimeout(() => {
          track.style.transition = "none";
          currentPosition = -totalItems * scrollAmount;
          track.style.transform = `translateX(${currentPosition}px)`;
          setTimeout(() => {
            track.style.transition = "transform 0.5s ease";
          }, 50);
        }, 500);
      }
    } else {

      if (currentPosition < -scrollAmount) {
        currentPosition += scrollAmount;
        track.style.transform = `translateX(${currentPosition}px)`;
      }
    }
  }

  gallery.addEventListener(
    "wheel",
    function (e) {
      e.preventDefault();

      const currentTime = Date.now();
      if (currentTime - lastScrollTime < scrollCooldown) return;

      if (!isScrolling) {
        isScrolling = true;
        updatePosition(e.deltaY);

        lastScrollTime = currentTime;
        setTimeout(() => {
          isScrolling = false;
        }, scrollCooldown);
      }
    },
    { passive: false }
  );

  window.addEventListener("resize", function () {
    const newContainerWidth = document.querySelector(
      ".carousel-container"
    ).offsetWidth;
    const newItemWidth = (newContainerWidth - 60) / 3;
    const newScrollAmount = newItemWidth + 30;
    const scrolledItems = Math.round(Math.abs(currentPosition) / scrollAmount);

    currentPosition = -scrolledItems * newScrollAmount;
    track.style.transition = "none";
    track.style.transform = `translateX(${currentPosition}px)`;
  });
});
