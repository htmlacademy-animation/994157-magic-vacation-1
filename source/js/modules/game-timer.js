export class GameTimer {
  constructor() {
    this.animationTime = 300000; // 5 min
    this.frameInterval = 1000; // 1s в ms
    this.now = null;
    this.then = null;
    this.elapsed = null;
    this.timePassed = null;
    this.animationRequest = null;
    this.minutesEl = null;
    this.secondsEl = null;
    this.startTime = null;

    this.onEndTimer = null;

    this.startTimer = this.startTimer.bind(this);
    this.stopTimer = this.stopTimer.bind(this);
    this.endTimer = this.endTimer.bind(this);
    this.tick = this.tick.bind(this);
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

  tick() {
    if (this.timePassed >= this.animationTime) {
      this.endTimer();
      return;
    }

    if (this.animationRequest) {
      this.animationRequest = requestAnimationFrame(this.tick);
    }

    this.now = Date.now();
    this.elapsed = this.now - this.then;

    if (this.elapsed > this.frameInterval) {
      this.then = this.now - (this.elapsed % this.frameInterval);
      this.draw();
    }
  }

  endTimer() {
    this.stopTimer();
    if (this.onEndTimer) {
      this.onEndTimer();
    }
  }

  resetTimer() {
    this.minutesEl.innerHTML = `00`;
    this.secondsEl.innerHTML = `00`;
  }

  startTimer() {
    this.then = Date.now();
    this.startTime = Date.now();
    this.animationRequest = requestAnimationFrame(this.tick);
  }

  stopTimer() {
    if (this.animationRequest) {
      cancelAnimationFrame(this.animationRequest);
      this.animationRequest = null;
      this.startTime = null;
      this.now = null;
      this.then = null;
      this.elapsed = null;
      this.timePassed = null;
    }

    setTimeout(() => {
      this.resetTimer();
    }, 500);
  }

  init(onEndTimer) {
    this.minutesEl = document.querySelector(`.js-counter-minutes`);
    this.secondsEl = document.querySelector(`.js-counter-seconds`);

    this.onEndTimer = onEndTimer;
  }
}
