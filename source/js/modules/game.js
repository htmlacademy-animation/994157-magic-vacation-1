import {GET_SUCCESS_MESSAGE, SCREEN_ACTIVE_SET, SCREEN_CHANGED_EVENT_TYPE, SCREEN_NAMES} from '../constants';
import {GameTimer} from './game-timer';
import {Scene2DSeaCalf} from './2d/scene-2d-sea-calf';
import {Scene2DCrocodile} from './2d/scene-2d-crocodile';
import {SonyaGame} from './2d/sonya-game';

export class Game {
  constructor() {
    this.activeGameScreen = SCREEN_NAMES.GAME;
    this.resultScreens = document.querySelectorAll(`.screen--result`);
    this.resultScreenTitles = document.querySelectorAll(`[data-parent-screen]`);
    this.titleFailRestart = document.getElementById(`resetNegativeTitleOpacity`);
    this.screenGameEl = document.getElementById(`${SCREEN_NAMES.GAME}`);

    this.timer = new GameTimer();
    this.scene2DSeaCalf = new Scene2DSeaCalf();
    this.scene2DCrocodile = new Scene2DCrocodile();
    this.sonya = new SonyaGame();

    this.showResultEls = document.querySelectorAll(`.js-show-result`);
    this.playBtn = document.querySelector(`.js-play`);

    this.showFailScreen = this.showFailScreen.bind(this);
    this.restartGame = this.restartGame.bind(this);
    this.showResultByButtonClick = this.showResultByButtonClick.bind(this);
    this.setCurrentResultScreen = this.setCurrentResultScreen.bind(this);
    this.hideScreens = this.hideScreens.bind(this);
    this.checkScreen = this.checkScreen.bind(this);
    this.setPlayScreenActive = this.setPlayScreenActive.bind(this);
    this.onEndTimer = this.onEndTimer.bind(this);
    this.emitChangeDisplayEvent = this.emitChangeDisplayEvent.bind(this);
    this.startTimer = this.startTimer.bind(this);
    this.setSuccessScreen = this.setSuccessScreen.bind(this);
  }

  setCurrentResultScreen(targetId) {
    this.hideSonya();
    this.activeGameScreen = targetId;
    const targetScreenEl = [].slice.call(this.resultScreens).find(function (el) {
      return el.getAttribute(`id`) === targetId;
    });

    let titleTargetEl = [].slice.call(this.resultScreenTitles).find(function (el) {
      return el.getAttribute(`data-parent-screen`) === targetId;
    });

    if (targetScreenEl) {
      this.screenGameEl.classList.remove(`screen--show`);

      setTimeout(() => {
        targetScreenEl.classList.add(`screen--show`);
        targetScreenEl.classList.remove(`screen--hidden`);
        this.emitChangeDisplayEvent(targetScreenEl);
      }, 200);
    }

    if (titleTargetEl) {
      titleTargetEl.beginElement();
    }

    if (this.activeGameScreen === `result`) {
      this.scene2DSeaCalf.start();
    }

    if (this.activeGameScreen === `result3`) {
      this.scene2DCrocodile.start();
    }
  }

  emitChangeDisplayEvent(screenEl) {
    const event = new CustomEvent(SCREEN_ACTIVE_SET, {
      detail: {
        'screenElement': screenEl
      }
    });

    setTimeout(() => {
      document.body.dispatchEvent(event);
    }, 200);
  }

  setPlayScreenActive() {
    this.activeGameScreen = SCREEN_NAMES.GAME;
    this.screenGameEl.classList.add(`screen--show`);
    this.emitChangeDisplayEvent(this.screenGameEl);
  }

  showFailScreen() {
    this.setCurrentResultScreen(SCREEN_NAMES.RESULT_NEGATIVE);
    this.scene2DCrocodile.start();
  }

  hideScreens() {
    [].slice.call(this.resultScreens).forEach(function (el) {
      el.classList.remove(`screen--show`);
      el.classList.add(`screen--hidden`);
    });

    this.titleFailRestart.beginElement();
  }

  restartGame() {
    this.startTimer();
    this.setPlayScreenActive();
    this.hideScreens();
    document.getElementById(`messages`).innerHTML = ``;
    document.getElementById(`message-field`).focus();
    this.titleFailRestart.beginElement();
    this.scene2DCrocodile.stop();
  }

  showResultByButtonClick(evt) {
    const buttonEl = evt.target;
    const screenTarget = buttonEl.getAttribute(`data-target`);
    this.hideScreens();
    this.setCurrentResultScreen(screenTarget);
    this.timer.stopTimer();
  }

  showSonya() {
    this.sonya.appear();
  }

  hideSonya() {
    this.sonya.disappear();
  }

  onEndTimer() {
    this.hideSonya();
    this.showFailScreen();
  }

  startTimer() {
    setTimeout(() => {
      this.timer.startTimer();
    }, 1400);
  }

  checkScreen({detail}) {
    const {screenName} = detail;

    const isGamePage = screenName === SCREEN_NAMES.GAME;
    const isPlayScreen = this.activeGameScreen === SCREEN_NAMES.GAME;

    if (isGamePage) {
      if (isPlayScreen) {
        this.startTimer();
        this.setPlayScreenActive();
        this.showSonya();
      } else {
        this.setCurrentResultScreen(this.activeGameScreen);
      }
    } else {
      this.hideSonya();
      this.timer.stopTimer();
      this.hideScreens();
      this.screenGameEl.classList.remove(`screen--show`);
    }
  }

  setSuccessScreen({detail}) {
    const {screenElement} = detail;
    this.hideScreens();
    this.setCurrentResultScreen(screenElement);
    this.timer.stopTimer();
  }

  init() {
    this.timer.init(this.onEndTimer);
    document.body.addEventListener(SCREEN_CHANGED_EVENT_TYPE, this.checkScreen);
    document.body.addEventListener(GET_SUCCESS_MESSAGE, this.setSuccessScreen);

    if (this.playBtn) {
      this.playBtn.addEventListener(`click`, this.restartGame);
    }

    for (let i = 0; i < this.showResultEls.length; i++) {
      this.showResultEls[i].addEventListener(`click`, this.showResultByButtonClick);
    }
  }
}
