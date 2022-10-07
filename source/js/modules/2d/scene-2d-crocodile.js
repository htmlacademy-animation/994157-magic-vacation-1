import {Scene2D} from './scene-2d';
import {Animation2d} from './animation-2d';
import _ from '../../utils/easing';

const IMAGES_URLS = Object.freeze({
  crocodile: `img/module-4/lose-images/crocodile.png`,
  snowflake: `img/module-4/lose-images/snowflake.png`,
  flamingo: `img/module-4/lose-images/flamingo.png`,
  watermelon: `img/module-4/lose-images/watermelon.png`,
  leaf: `img/module-4/lose-images/leaf.png`,
  saturn: `img/module-4/lose-images/saturn.png`,
  tearDrop: `img/module-4/lose-images/drop.png`,
});

const OBJECTS = Object.freeze({
  crocodile: {
    imageId: `crocodile`,
    x: 49,
    y: 63,
    size: 100,
    transforms: {
      translateY: -25,
      translateX: 45,
    }
  },
  snowflake: {
    imageId: `snowflake`,
    x: 75,
    y: 59,
    size: 16,
    transforms: {
      scaleX: 0,
      scaleY: 0,
      translateY: 5,
      translateX: -15,
    }
  },
  flamingo: {
    imageId: `flamingo`,
    x: 23,
    y: 48,
    size: 21,
    transforms: {
      scaleX: 0,
      scaleY: 0,
      translateY: 20,
      translateX: 35,
    }
  },
  watermelon: {
    imageId: `watermelon`,
    x: 6,
    y: 74,
    size: 18,
    transforms: {
      scaleX: 0,
      scaleY: 0,
      translateY: -5,
      translateX: 45,
    }
  },
  leaf: {
    imageId: `leaf`,
    x: 90,
    y: 40,
    size: 23,
    transforms: {
      scaleX: 0,
      scaleY: 0,
      translateY: 25,
      translateX: -20,
    }
  },
  saturn: {
    imageId: `saturn`,
    x: 89,
    y: 80,
    size: 20,
    transforms: {
      scaleX: 0,
      scaleY: 0,
      translateY: -15,
      translateX: -30,
    }
  },
});

const LOCALS = Object.freeze({
  key: {
    scale: 0.8,
    opacity: 0,
  },
  tearDrop: {
    scale: 0,
    translateY: 0,
    opacity: 0,
    deltaCenterY: 0,
  }
});

export class Scene2DCrocodile extends Scene2D {
  constructor() {
    const canvas = document.getElementById(`crocodile-scene`);

    super({
      canvas,
      objects: OBJECTS,
      locals: LOCALS,
      imagesUrls: IMAGES_URLS,
    });

    this.afterInit = () => {
      this.objects.crocodile.after = this.drawClip.bind(this);
      this.objects.crocodile.before = this.drawKey.bind(this);
      this.objects.saturn.after = this.drawTearDrop.bind(this);
    };

    this.initEventListeners();
    this.initObjects(OBJECTS);
    this.initLocals();
    this.updateSize();
  }

  initEventListeners() {
    window.addEventListener(`resize`, this.updateSize.bind(this));
  }

  initAnimations() {
    this.animations.push(new Animation2d({
      func: () => {
        this.drawScene();
      },
      duration: `infinite`,
      fps: 60
    }));

    this.initKeyAnimations();
    this.initCrocodileAnimations();
    this.initSnowflakeAnimations();
    this.initFlamingoAnimations();
    this.initWatermelonAnimations();
    this.initLeafAnimations();
    this.initSaturnAnimations();
    this.initTearDropAnimations();
  }

  initLocals() {
    this.locals = {
      key: {
        scale: LOCALS.key.scale,
        opacity: LOCALS.key.opacity,
      },
      tearDrop: {
        scale: LOCALS.tearDrop.scale,
        translateY: LOCALS.tearDrop.translateY,
        opacity: LOCALS.tearDrop.opacity,
        deltaCenterY: LOCALS.tearDrop.deltaCenterY
      }
    };
  }

  initCrocodileAnimations() {
    this.animations.push(new Animation2d({
      func: (progress) => {
        const progressReversed = 1 - progress;
        this.objects.crocodile.transforms.translateY = -25 * progressReversed;
        this.objects.crocodile.transforms.translateX = 45 * progressReversed;
      },
      duration: 600,
      delay: 1350,
      easing: _.easeOutQuad
    }));
  }

  initSnowflakeAnimations() {
    this.animations.push(new Animation2d({
      func: (progress) => {
        const progressReversed = 1 - progress;
        this.objects.snowflake.transforms.translateY = 5 * progressReversed;
        this.objects.snowflake.transforms.translateX = -15 * progressReversed;
        this.objects.snowflake.transforms.scaleX = progress;
        this.objects.snowflake.transforms.scaleY = progress;
      },
      duration: 600,
      delay: 500,
      easing: _.easeOutQuad
    }));

    this.animations.push(new Animation2d({
      func: (progress) => {
        this.objects.snowflake.transforms.translateY = 70 * progress;
      },
      duration: 600,
      delay: 1200,
      easing: _.easeInQuad
    }));
  }

  initWatermelonAnimations() {
    this.animations.push(new Animation2d({
      func: (progress) => {
        const progressReversed = 1 - progress;
        this.objects.watermelon.transforms.translateY = -5 * progressReversed;
        this.objects.watermelon.transforms.translateX = 45 * progressReversed;
        this.objects.watermelon.transforms.scaleX = progress;
        this.objects.watermelon.transforms.scaleY = progress;
      },
      duration: 600,
      delay: 500,
      easing: _.easeOutQuad
    }));
    this.animations.push(new Animation2d({
      func: (progress) => {
        this.objects.watermelon.transforms.translateY = 70 * progress;
      },
      duration: 600,
      delay: 1200,
      easing: _.easeInQuad
    }));
  }

  initLeafAnimations() {
    this.animations.push(new Animation2d({
      func: (progress) => {
        const progressReversed = 1 - progress;
        this.objects.leaf.transforms.translateY = 20 * progressReversed;
        this.objects.leaf.transforms.translateX = -15 * progressReversed;
        this.objects.leaf.transforms.scaleX = progress;
        this.objects.leaf.transforms.scaleY = progress;
      },
      duration: 500,
      delay: 500,
      easing: _.easeOutQuad
    }));
    this.animations.push(new Animation2d({
      func: (progress) => {
        this.objects.leaf.transforms.translateY = 70 * progress;
      },
      duration: 600,
      delay: 1000,
      easing: _.easeInQuad
    }));
  }

  initSaturnAnimations() {
    this.animations.push(new Animation2d({
      func: (progress) => {
        const progressReversed = 1 - progress;
        this.objects.saturn.transforms.translateY = -15 * progressReversed;
        this.objects.saturn.transforms.translateX = -30 * progressReversed;
        this.objects.saturn.transforms.scaleX = progress;
        this.objects.saturn.transforms.scaleY = progress;
      },
      duration: 600,
      delay: 500,
      easing: _.easeOutQuad
    }));

    this.animations.push(new Animation2d({
      func: (progress) => {
        this.objects.saturn.transforms.translateY = 70 * progress;
      },
      duration: 600,
      delay: 1250,
      easing: _.easeInQuad
    }));
  }

  initFlamingoAnimations() {
    this.animations.push(new Animation2d({
      func: (progress) => {
        const progressReversed = 1 - progress;
        this.objects.flamingo.transforms.translateY = 20 * progressReversed;
        this.objects.flamingo.transforms.translateX = 35 * progressReversed;
        this.objects.flamingo.transforms.scaleX = progress;
        this.objects.flamingo.transforms.scaleY = progress;
      },
      duration: 500,
      delay: 500,
      easing: _.easeOutQuad
    }));

    this.animations.push(new Animation2d({
      func: (progress) => {
        this.objects.flamingo.transforms.translateY = 70 * progress;
      },
      duration: 600,
      delay: 1100,
      easing: _.easeInQuad
    }));
  }

  initTearDropAnimations() {
    let prevValue = 0;
    this.animations.push(new Animation2d({
      func: (progress, details) => {
        const oldPrevValue = prevValue;

        const period = (details.currentTime - details.startTime) / 1000;
        const value = Math.sin(2.5 * period);
        prevValue = value;

        if (oldPrevValue < value) {
          this.locals.tearDrop.translateY = 0;
          this.locals.tearDrop.opacity = 1;
          this.locals.tearDrop.deltaCenterY = 0;
          if (value >= 0) {
            this.locals.tearDrop.scale = Math.abs(value);
          } else {
            this.locals.tearDrop.opacity = 0;
          }
        } else {
          const progressReversed = 1 - Math.abs(value);
          if (value <= 0) {
            this.locals.tearDrop.scale = progressReversed;
            this.locals.tearDrop.opacity = progressReversed;
            this.locals.tearDrop.deltaCenterY = 4;
          } else {
            this.locals.tearDrop.deltaCenterY = 0;
            this.locals.tearDrop.translateY = 5 * progressReversed;
          }
        }
      },
      duration: `infinite`,
      delay: 1900,
      easing: _.easeInOutQuad
    }));
  }

  initKeyAnimations() {
    this.animations.push(new Animation2d({
      func: (progress) => {
        this.locals.key.opacity = progress;
        this.locals.key.scale = 0.8 + (progress / 5);
      },
      duration: 200,
      delay: 500,
      easing: _.easeLinear
    }));
  }

  drawKey() {
    const {key: {scale, opacity}} = this.locals;

    if (opacity === 0) {
      return;
    }
    this.ctx.save();
    const s = this.size / 100;
    this.ctx.setTransform(scale, 0, 0, scale, 50 * s, 57 * s);

    this.ctx.beginPath();
    // окружность
    this.ctx.arc(0, -9 * s, 11 * s, 0, (Math.PI / 180) * 360);
    // правый верхний угол
    this.ctx.moveTo(7 * s, -1 * s);
    // нижний правый угол
    this.ctx.lineTo(11 * s, 20 * s);
    // нижний левый угол
    this.ctx.lineTo(-11 * s, 20 * s);
    // верхний левый угол
    this.ctx.lineTo(-7 * s, -1 * s);

    this.ctx.closePath();
    this.ctx.globalAlpha = opacity;
    this.ctx.fillStyle = `#A67EE5`;
    this.ctx.fill();
    this.ctx.restore();
  }

  drawClip() {
    const s = this.size / 100;
    this.ctx.beginPath();
    this.ctx.moveTo(50 * s, 37 * s);
    this.ctx.arc(50 * s, 48 * s, 11 * s, (Math.PI / 180) * -90, (Math.PI / 180) * 50);
    this.ctx.lineTo(61 * s, 77 * s);
    this.ctx.lineTo(100 * s, 77 * s);
    this.ctx.lineTo(100 * s, 31 * s);
    this.ctx.lineTo(50 * s, 31 * s);
    this.ctx.lineTo(50 * s, 37 * s);

    this.ctx.closePath();
    this.ctx.fillStyle = `#5f458c`;
    this.ctx.fill();
    this.ctx.restore();
  }

  drawTearDrop() {
    const {tearDrop: {scale, translateY, opacity, deltaCenterY}} = this.locals;
    this.ctx.save();
    const s = this.size / 100;
    this.ctx.setTransform(scale, 0, 0, scale, 47 * s, (65 + translateY + deltaCenterY) * s);
    this.ctx.beginPath();
    this.ctx.moveTo(0, -deltaCenterY * s);
    this.ctx.quadraticCurveTo(5 * s, (7 - deltaCenterY) * s, 0, (8 - deltaCenterY) * s);
    this.ctx.quadraticCurveTo(-5 * s, (7 - deltaCenterY) * s, 0, -deltaCenterY * s);
    this.ctx.arc(0, (5.5 - deltaCenterY) * s, 2.5 * s, 0, Math.PI * 2);
    this.ctx.closePath();
    this.ctx.globalAlpha = opacity;
    this.ctx.fillStyle = `#B4C3FF`;
    this.ctx.fill();
    this.ctx.restore();
  }
}
