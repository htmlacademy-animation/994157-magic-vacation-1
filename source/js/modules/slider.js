import Swiper from "swiper";
import {AnimateTypography} from "./animate-typography";
import {SCREEN_ACTIVE_SET, THEME_CLASS_NAMES} from '../constants';

export default () => {
  let storySlider;
  let currentThemeClass = THEME_CLASS_NAMES.purple;
  let sliderContainer = document.getElementById(`story`);
  sliderContainer.style.backgroundImage = `url("img/slide1.jpg"), linear-gradient(180deg, rgba(83, 65, 118, 0) 0%, #523E75 16.85%)`;

  const titleNode = document.querySelector(`.js-story-title`);
  const animateTitle = new AnimateTypography({selector: `.js-story-title`, node: titleNode, duration: 500, delayStep: 330, classForActivate: `active`});
  animateTitle.init();

  const toggleTitleAnimation = (slideIndex) => {
    if (slideIndex > 0) {
      setTimeout(() => {
        animateTitle.destroyAnimation();
      }, 400);
    } else {
      setTimeout(() => {
        animateTitle.runAnimation();
      }, 400);
    }
  };

  const changeThemeClass = (themeClassName) => {
    document.body.classList.remove(currentThemeClass);
    currentThemeClass = themeClassName;
    document.body.classList.add(currentThemeClass);
  };

  const changeTheme = (slideIndex) => {
    if (slideIndex >= 6) {
      changeThemeClass(THEME_CLASS_NAMES.default);
    } else if (slideIndex >= 4) {
      changeThemeClass(THEME_CLASS_NAMES.lightBlue);
    } else if (slideIndex >= 2) {
      changeThemeClass(THEME_CLASS_NAMES.blue);
    } else {
      changeThemeClass(THEME_CLASS_NAMES.purple);
    }
  };

  const hideTheme = () => {
    document.body.classList.remove(currentThemeClass);
  };

  const showTheme = () => {
    document.body.classList.add(currentThemeClass);
  };

  const toggleTheme = ({detail}) => {
    const {screenName} = detail;

    if (screenName === `story`) {
      showTheme();
    } else {
      hideTheme();
    }
  };

  const handleSlideChange = (slideIndex) => {
    toggleTitleAnimation(slideIndex);
    changeTheme(slideIndex);
  };

  const setSlider = function () {
    if (((window.innerWidth / window.innerHeight) < 1) || window.innerWidth < 769) {
      storySlider = new Swiper(`.js-slider`, {
        effect: `fade`,
        fadeEffect: {
          crossFade: true
        },
        pagination: {
          el: `.swiper-pagination`,
          type: `bullets`
        },
        keyboard: {
          enabled: true
        },
        on: {
          slideChange: () => {
            if (storySlider.activeIndex === 0 || storySlider.activeIndex === 1) {
              sliderContainer.style.backgroundImage = `url("img/slide1.jpg"), linear-gradient(180deg, rgba(83, 65, 118, 0) 0%, #523E75 16.85%)`;
            } else if (storySlider.activeIndex === 2 || storySlider.activeIndex === 3) {
              sliderContainer.style.backgroundImage = `url("img/slide2.jpg"), linear-gradient(180deg, rgba(45, 54, 179, 0) 0%, #2A34B0 16.85%)`;
            } else if (storySlider.activeIndex === 4 || storySlider.activeIndex === 5) {
              sliderContainer.style.backgroundImage = `url("img/slide3.jpg"), linear-gradient(180deg, rgba(92, 138, 198, 0) 0%, #5183C4 16.85%)`;
            } else if (storySlider.activeIndex === 6 || storySlider.activeIndex === 7) {
              sliderContainer.style.backgroundImage = `url("img/slide4.jpg"), linear-gradient(180deg, rgba(45, 39, 63, 0) 0%, #2F2A42 16.85%)`;
            }

            handleSlideChange(storySlider.activeIndex);
          },
          resize: () => {
            storySlider.update();
          }
        },
        observer: true,
        observeParents: true
      });
    } else {
      storySlider = new Swiper(`.js-slider`, {
        slidesPerView: 2,
        slidesPerGroup: 2,
        virtualTranslate: true,
        pagination: {
          el: `.swiper-pagination`,
          type: `fraction`
        },
        navigation: {
          nextEl: `.js-control-next`,
          prevEl: `.js-control-prev`,
        },
        keyboard: {
          enabled: true
        },
        on: {
          slideChange: () => {
            if (storySlider.activeIndex === 0) {
              sliderContainer.style.backgroundImage = `url("img/slide1.jpg")`;
            } else if (storySlider.activeIndex === 2) {
              sliderContainer.style.backgroundImage = `url("img/slide2.jpg")`;
            } else if (storySlider.activeIndex === 4) {
              sliderContainer.style.backgroundImage = `url("img/slide3.jpg")`;
            } else if (storySlider.activeIndex === 6) {
              sliderContainer.style.backgroundImage = `url("img/slide4.jpg")`;
            }
            handleSlideChange(storySlider.activeIndex);
          },
          resize: () => {
            storySlider.update();
          }
        },
        observer: true,
        observeParents: true
      });
    }
  };

  window.addEventListener(`resize`, function () {
    if (storySlider) {
      storySlider.destroy();
    }
    setSlider();
  });

  document.body.addEventListener(SCREEN_ACTIVE_SET, toggleTheme);

  setSlider();
};
