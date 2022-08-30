import {AwardNumberAnimation} from './award-number-animation';

const targets = [{
  svgAnimateTarget: `primaryAwardAppear`,
  parent: `journeys`,
  descriptionAppearDelay: 2500,
},
{
  svgAnimateTarget: `secondaryAwardAppear`,
  parent: `cases`,
  descriptionAppearDelay: 1250,
  animatedNumberValue: 7,
  initialAnimatedNumberValue: 1,
},
{
  svgAnimateTarget: `additionalAwardAppear`,
  parent: `codes`,
  descriptionAppearDelay: 1000,
  animatedNumberValue: 900,
  initialAnimatedNumberValue: 11,
}];

class AwardAnimation {
  constructor({svgAnimateTarget, descriptionAppearDelay, animatedNumberValue, initialAnimatedNumberValue}) {
    this._svgAnimateTarget = svgAnimateTarget;
    this._descriptionAppearDelay = descriptionAppearDelay;
    this._isPlayed = false;
    this._awardEl = null;
    this.numberAnimation = new AwardNumberAnimation({animatedNumberValue, initialAnimatedNumberValue});

    this.beginAnimation = this.beginAnimation.bind(this);
    this.onEndAnimation = this.onEndAnimation.bind(this);
  }

  onEndAnimation() {
    this._awardEl.classList.add(`animated`);
  }

  beginAnimation() {
    if (this._isPlayed) {
      return;
    }
    const element = document.getElementById(this._svgAnimateTarget);
    element.beginElement();
    const description = this._awardEl.querySelector(`.js-prizes-desc`);
    const isPortrait = window.innerWidth < window.innerHeight;
    const isTablet = window.innerWidth < 1024;
    const delay = isTablet && isPortrait ? 0 : this._descriptionAppearDelay;

    setTimeout(() => {
      description.classList.add(`animated`);
      this.numberAnimation.startTimer();
    }, delay);

    this._isPlayed = true;
  }

  init(parent) {
    this._awardEl = document.getElementById(parent);
    this._awardEl.addEventListener(`transitionstart`, this.beginAnimation);
    const numberEl = this._awardEl.querySelector(`.js-prizes-number`);
    this.numberAnimation.init(this.onEndAnimation, numberEl);
  }
}

export default () => {
  targets.forEach(({svgAnimateTarget, parent, descriptionAppearDelay, animatedNumberValue, initialAnimatedNumberValue}) => {
    const svgAnimation = new AwardAnimation({svgAnimateTarget, descriptionAppearDelay, animatedNumberValue, initialAnimatedNumberValue});
    svgAnimation.init(parent);
  });
};
