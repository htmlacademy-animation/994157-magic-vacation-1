import {AnimationTickTimer} from './animation-tick-timer';

export class GameTimer extends AnimationTickTimer {
  constructor() {
    super({animationTime: 300000, frameInterval: 1000});
    this.draw = this.draw.bind(this);
  }

  draw() {
    if (!this.minutesEl || !this.secondsEl) {
      return;
    }

    this.timePassed = this.then - this.startTime;

    const minutes = new Date(this.timePassed).getMinutes();
    const seconds = new Date(this.timePassed).getSeconds();

    const paddedMinutes = String(minutes).padStart(2, 0);
    const paddedSeconds = String(seconds).padStart(2, 0);

    this.minutesEl.innerHTML = paddedMinutes;
    this.secondsEl.innerHTML = paddedSeconds;
  }

  resetTimer() {
    this.minutesEl.innerHTML = `00`;
    this.secondsEl.innerHTML = `00`;
  }

  init(onEndTimer) {
    super.init(onEndTimer);
    this.minutesEl = document.querySelector(`.js-counter-minutes`);
    this.secondsEl = document.querySelector(`.js-counter-seconds`);
  }
}
