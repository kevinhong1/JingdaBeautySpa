document.addEventListener("DOMContentLoaded", function () {
  const gallery = document.getElementById("gallery");
  const track = document.querySelector(".gallery-track");
  const items = document.querySelectorAll(".gallery-item");
  const totalItems = items.length;
  const isMobile = window.innerWidth <= 768;

  let currentIndex = 0;
  const containerWidth = document.querySelector(
    ".carousel-container"
  ).offsetWidth;
  const itemWidth = isMobile ? containerWidth : (containerWidth - 60) / 3;

  // Mobile
  if (isMobile) {
    items.forEach((item) => {
      item.style.flex = "0 0 100%";
      item.style.width = "100%";
    });

    const navigation = document.createElement("div");
    navigation.className = "gallery-navigation";

    const prevButton = document.createElement("button");
    prevButton.className = "gallery-nav-arrow prev";
    prevButton.innerHTML = "←";
    prevButton.addEventListener("click", () => {
      if (currentIndex > 0) {
        currentIndex--;
        updateMobilePosition();
      }
    });

    const nextButton = document.createElement("button");
    nextButton.className = "gallery-nav-arrow next";
    nextButton.innerHTML = "→";
    nextButton.addEventListener("click", () => {
      if (currentIndex < totalItems - 1) {
        currentIndex++;
        updateMobilePosition();
      }
    });

    navigation.appendChild(prevButton);
    navigation.appendChild(nextButton);
    document.querySelector("#gallery").appendChild(navigation);
    track.style.transform = `translateX(0)`;
  }
  // Desktop
  else {
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
    currentIndex = totalItems;
    track.style.transform = `translateX(${-currentIndex * (itemWidth)}px)`;
  }

  function updateMobilePosition() {
    const itemWidth = document.querySelector(".gallery-item").offsetWidth;
    track.style.transition = "transform 0.5s ease";
    track.style.transform = `translateX(${-currentIndex * itemWidth}px)`;
  }
  if (!isMobile) {
    let isScrolling = false;
    let lastScrollTime = Date.now();
    const scrollCooldown = 100;

    gallery.addEventListener(
      "wheel",
      function (e) {
        e.preventDefault();
        const currentTime = Date.now();
        if (currentTime - lastScrollTime < scrollCooldown) return;

        if (!isScrolling) {
          isScrolling = true;
          const direction = e.deltaY > 0;

          if (direction) {
            currentIndex++;
            track.style.transform = `translateX(${
              -currentIndex * (itemWidth + 30)
            }px)`;

            if (currentIndex >= totalItems * 4) {
              setTimeout(() => {
                track.style.transition = "none";
                currentIndex = totalItems;
                track.style.transform = `translateX(${
                  -currentIndex * (itemWidth + 30)
                }px)`;
                setTimeout(
                  () => (track.style.transition = "transform 0.5s ease"),
                  50
                );
              }, 500);
            }
          } else if (currentIndex > 0) {
            currentIndex--;
            track.style.transform = `translateX(${
              -currentIndex * (itemWidth + 30)
            }px)`;
          }

          lastScrollTime = currentTime;
          setTimeout(() => {
            isScrolling = false;
          }, scrollCooldown);
        }
      },
      { passive: false }
    );
  }
  window.addEventListener("resize", function () {
    if (window.innerWidth <= 768 !== isMobile) {
      location.reload();
    }
  });
});
