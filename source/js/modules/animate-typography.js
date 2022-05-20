import {SCREEN_ACTIVE_SET} from '../constants';

const targets = [
  {
    selector: `.js-intro-title-row-top`,
    duration: 500,
    delayStep: 330,
    wordDelay: 200
  },
  {
    selector: `.js-intro-title-row-bottom`,
    duration: 500,
    delayStep: 330,
    wordDelay: 460
  },
  {
    selector: `.js-intro-date`,
    duration: 500,
    delayStep: 330,
    wordDelay: 1200
  },
  {
    selector: `.js-story-title`,
    duration: 500,
    delayStep: 330,
  },
  {
    selector: `.js-prizes-title`,
    duration: 500,
    delayStep: 330,
    wordDelay: 350,
  },
  {
    selector: `.js-rule-title`,
    duration: 500,
    delayStep: 330,
  },
  {
    selector: `.js-game-title`,
    duration: 500,
    delayStep: 330,
    wordDelay: 100,
  },
];

class AnimateTypography {
  constructor({node, duration, delayStep, wordDelay, classForActivate, selector}) {
    this._node = node;
    this._selector = selector;
    this._duration = duration;
    this._delayStep = delayStep;
    this._wordDelay = wordDelay ? wordDelay : 0;
    this._classForActivate = classForActivate;

    this.onToggleAnimationHandler = this.onToggleAnimation.bind(this);
  }

  onToggleAnimation({detail}) {
    const {screenElement} = detail;

    const element = screenElement.querySelector(this._selector);

    if (element) {
      this.runAnimation();
    } else {
      this.destroyAnimation();
    }
  }

  createElement(letter) {
    const span = document.createElement(`span`);
    span.textContent = letter;
    span.style.transitionDuration = `${this._duration}ms`;
    span.style.transitionDelay = `${this._delayStep * Math.random() + this._wordDelay}ms`;
    return span;
  }

  getRealCharIndex({wordIndex, charIndex, textArray}) {
    return wordIndex ? textArray[wordIndex - 1].length + charIndex : charIndex;
  }

  init() {
    if (!this._node) {
      return;
    }

    document.body.addEventListener(SCREEN_ACTIVE_SET, this.onToggleAnimationHandler);

    const text = this._node.textContent.trim().split(` `).filter((word)=> word !== ``);

    const content = text.reduce((fragmentParent, word, wordIndex) => {
      const wordElement = Array.from(word).reduce((fragment, char, charIndex) => {
        const realCharIndex = this.getRealCharIndex({wordIndex, charIndex, textArray: text});
        fragment.appendChild(this.createElement(char, realCharIndex));
        return fragment;
      }, document.createDocumentFragment());
      const wordContainer = document.createElement(`span`);
      wordContainer.classList.add(`animated-text__word`);
      wordContainer.appendChild(wordElement);
      fragmentParent.appendChild(wordContainer);
      return fragmentParent;
    }, document.createDocumentFragment());

    this._node.innerHTML = ``;
    this._node.appendChild(content);
  }

  runAnimation() {
    if (!this._node) {
      return;
    }
    this._node.classList.add(this._classForActivate);
  }

  destroyAnimation() {
    this._node.classList.remove(this._classForActivate);
  }
}

export default () => {
  targets.forEach(({selector, duration, delayStep, wordDelay}) => {
    const node = document.querySelector(selector);
    const animate = new AnimateTypography({selector, node, duration, wordDelay, delayStep, classForActivate: `active`});
    animate.init();
  });
};
