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








// Функция для получения даты следующего понедельника
function getNextMonday() {
  const now = new Date();
  const dayOfWeek = now.getDay(); 
  const daysUntilMonday = (8 - dayOfWeek) % 7; 
  const nextMonday = new Date(now.getFullYear(), now.getMonth(), now.getDate() + daysUntilMonday);
  nextMonday.setHours(0, 0, 0, 0); 
  return nextMonday;
}


function updateTimer() {
  const now = new Date();
  let nextMonday = new Date(localStorage.getItem('nextMonday'));

  
  if (!nextMonday || now >= nextMonday) {
      nextMonday = getNextMonday();
      localStorage.setItem('nextMonday', nextMonday);
  }

  const timeRemaining = nextMonday - now;

  if (timeRemaining > 0) {
      const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
      const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

     
      document.getElementById('days').textContent = days.toString().padStart(2, '0');
      document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
      document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
      document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
  }
}


updateTimer();
setInterval(updateTimer, 1000);






document.addEventListener("DOMContentLoaded", function () {
  ymaps.ready(init);

  function init() {
    // Создаем карту
    var myMap = new ymaps.Map("map", {
      center: [55.717963, 37.491192], // Исходные координаты центра
      zoom: 12,
      controls: [] // Убираем все стандартные контролы
    });

    // Добавляем геометки
    var officePlacemark = new ymaps.Placemark(
      [55.717963, 37.451192], // Координаты офиса
      {
        hintContent: "Офис компании",
        balloonContent: "г.Москва, Дорогобужская улица 14, этаж 3, каб. 300"
      },
      {
        preset: "islands#icon",
        iconColor: "#0095b6"
      }
    );

    var warehousePlacemark = new ymaps.Placemark(
      [55.612045, 37.448554], // Координаты склада
      {
        hintContent: "Склад компании",
        balloonContent: "г. Москва, ул. Адмирала Корнилова, д. 37, стр. 7"
      },
      {
        preset: "islands#icon",
        iconColor: "#f44336"
      }
    );

    myMap.geoObjects.add(officePlacemark);
    myMap.geoObjects.add(warehousePlacemark);

    // Отключаем скролл на карте
    myMap.behaviors.disable("scrollZoom");

    // Настраиваем центрирование карты, чтобы учитывать видимость контента
    var newCenter = [55.717963, 37.491192 + 0.09]; // Увеличиваем долготу для сдвига вправо
    myMap.setCenter(newCenter, 12);
  }
});


















