import Swiper from "swiper";
import {AnimateTypography} from "./animate-typography";
import {SCREEN_ACTIVE_SET, THEME_CLASS_NAMES, STORY_SLIDE_NAMES} from '../constants';

export default () => {
  let storySlider;
  let currentThemeClass = THEME_CLASS_NAMES.purple;

  const titleNode = document.querySelector(`.js-story-title`);
  const animateTitle = new AnimateTypography({selector: `.js-story-title`, node: titleNode, duration: 500, delayStep: 330, classForActivate: `active`});
  animateTitle.init();

  const emitChangeDisplayEvent = (slideName) => {
    const event = new CustomEvent(`slideChanged`, {
      detail: {
        slideName
      }
    });

    document.body.dispatchEvent(event);
  };

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

  const changeThemeAndEmitChange = (slideIndex) => {
    if (slideIndex >= 6) {
      changeThemeClass(THEME_CLASS_NAMES.default);
      emitChangeDisplayEvent(STORY_SLIDE_NAMES.AI_SONYA);
    } else if (slideIndex >= 4) {
      changeThemeClass(THEME_CLASS_NAMES.lightBlue);
      emitChangeDisplayEvent(STORY_SLIDE_NAMES.SNOWMAN_AND_COMPASS);
    } else if (slideIndex >= 2) {
      changeThemeClass(THEME_CLASS_NAMES.blue);
      emitChangeDisplayEvent(STORY_SLIDE_NAMES.PYRAMID_AND_CACTUS);
    } else {
      changeThemeClass(THEME_CLASS_NAMES.purple);
      emitChangeDisplayEvent(STORY_SLIDE_NAMES.DOG_AND_SUITCASE);
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
    changeThemeAndEmitChange(slideIndex);
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
