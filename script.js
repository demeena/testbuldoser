document.addEventListener("DOMContentLoaded", () => {
  // Скрипт 1: Фон страницы
  const formFive = document.querySelector(".formFive");
  const body = document.body;

  if (formFive) {
    const updateBackground = () => {
      const formFivePosition = formFive.getBoundingClientRect().top;

      if (formFivePosition <= 0) {
        body.style.background = "white";
      } else {
        body.style.backgroundImage = "url('img/Rectangle 4.png')";
        body.style.backgroundSize = "cover";
        body.style.backgroundRepeat = "no-repeat";
        body.style.backgroundPosition = "center";
        body.style.backgroundAttachment = "fixed";
      }
    };

    updateBackground();
    window.addEventListener("scroll", updateBackground);
  } else {
    console.error("Элемент .formFive не найден!");
  }

  // Скрипт 2: Мобильное меню
  const mobileMenu = document.querySelector('.mobile-menu');
  const dropdownMenu = document.querySelector('.dropdown-menu');
  const closeMenuBtn = document.querySelector('.close-menu-btn');

  if (mobileMenu && dropdownMenu && closeMenuBtn) {
    mobileMenu.addEventListener('click', () => {
      dropdownMenu.classList.add('active');
    });

    closeMenuBtn.addEventListener('click', () => {
      dropdownMenu.classList.remove('active');
    });
  }

  


  // Скрипт 4: Попап
  const buttons = document.querySelectorAll('.popup-trigger');
  const popup = document.getElementById('popup');
  const closeBtn = document.querySelector('.popup-close');

  if (buttons.length > 0 && popup && closeBtn) {
    function showPopup() {
      popup.classList.add('show');
      popup.classList.remove('hidden');
      console.log('Попап должен появиться');
    }

    function hidePopup() {
      popup.classList.remove('show');
      popup.classList.add('hidden');
      console.log('Попап скрывается');
    }

    buttons.forEach((button) => {
      button.addEventListener('click', showPopup);
    });

    closeBtn.addEventListener('click', hidePopup);

    popup.addEventListener('click', (event) => {
      if (event.target === popup) {
        hidePopup();
      }
    });
  } else {
    console.error("Элементы для попапа не найдены!");
  }
});


document.addEventListener("DOMContentLoaded", () => {
  const productCards = document.querySelectorAll(".image-block");

  productCards.forEach((card) => {
    const mainImage = card.querySelector(".main-image");
    const thumbnails = card.querySelectorAll(".slider-secondary .slider-item");
    const prevButton = card.querySelector(".slider-button.prev");
    const nextButton = card.querySelector(".slider-button.next");

    let currentIndex = 0;
    const visibleThumbnails = 3;

    let touchStartX = 0;
    let touchEndX = 0;

    const updateSlider = (index) => {
      mainImage.src = thumbnails[index].src;

      thumbnails.forEach((thumbnail) => thumbnail.classList.remove("active-thumbnail"));
      thumbnails[index].classList.add("active-thumbnail");

      updateVisibleThumbnails(index);
    };

    const updateVisibleThumbnails = (activeIndex) => {
      thumbnails.forEach((thumbnail, index) => {
        thumbnail.style.display = "none";

        if (
          index >= activeIndex &&
          index < activeIndex + visibleThumbnails &&
          index < thumbnails.length
        ) {
          thumbnail.style.display = "block";
        }
      });

      if (activeIndex + visibleThumbnails > thumbnails.length) {
        for (let i = activeIndex; i < activeIndex + visibleThumbnails; i++) {
          const correctedIndex = i % thumbnails.length;
          thumbnails[correctedIndex].style.display = "block";
        }
      }
    };

    const showPrevImage = () => {
      currentIndex = (currentIndex - 1 + thumbnails.length) % thumbnails.length;
      updateSlider(currentIndex);
    };

    const showNextImage = () => {
      currentIndex = (currentIndex + 1) % thumbnails.length;
      updateSlider(currentIndex);
    };


    prevButton.addEventListener("click", showPrevImage);
    nextButton.addEventListener("click", showNextImage);

 
    thumbnails.forEach((thumbnail, index) => {
      thumbnail.addEventListener("click", () => {
        currentIndex = index;
        updateSlider(currentIndex);
      });
    });

    
    const handleTouchStart = (e) => {
      touchStartX = e.touches[0].clientX;
    };

    const handleTouchMove = (e) => {
      touchEndX = e.touches[0].clientX;
    };

    const handleTouchEnd = () => {
      const swipeDistance = touchEndX - touchStartX;

      if (swipeDistance > 50) {
       
        showPrevImage();
      } else if (swipeDistance < -50) {
       
        showNextImage();
      }
    };

    
    mainImage.addEventListener("touchstart", handleTouchStart);
    mainImage.addEventListener("touchmove", handleTouchMove);
    mainImage.addEventListener("touchend", handleTouchEnd);

 
    updateSlider(currentIndex);
  });
});








