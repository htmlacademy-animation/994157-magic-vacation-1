import {AnimationTickTimer} from './animation-tick-timer';

export class AwardNumberAnimation extends AnimationTickTimer {
  constructor({animatedNumberValue, initialAnimatedNumberValue}) {
    super({animationTime: 700, frameInterval: 100});
    this.animatedNumberValue = animatedNumberValue;
    this.initialAnimatedNumberValue = initialAnimatedNumberValue;
    this.element = null;

    this.draw = this.draw.bind(this);
  }

  draw() {
    if (!this.element) {
      return;
    }

    this.timePassed = this.then - this.startTime;

    this.element.innerHTML = Math.floor(this.animatedNumberValue / this.animationTime * this.timePassed);
  }

  init(onEndTimer, element) {
    super.init(onEndTimer);
    if (element) {
      this.element = element;
      this.element.innerHTML = this.initialAnimatedNumberValue;
    }
  }
}
