export class AnimationTickTimer {
  constructor({animationTime, frameInterval}) {
    this.animationTime = animationTime;
    this.frameInterval = frameInterval;
    this.now = null;
    this.then = null;
    this.elapsed = null;
    this.timePassed = null;
    this.animationRequest = null;
    this.startTime = null;

    this.onEndTimer = null;

    this.startTimer = this.startTimer.bind(this);
    this.stopTimer = this.stopTimer.bind(this);
    this.endTimer = this.endTimer.bind(this);
    this.tick = this.tick.bind(this);
    this.draw = this.draw.bind(this);
  }

  draw() {}

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

  resetTimer() {}

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
    this.onEndTimer = onEndTimer;
  }
}
