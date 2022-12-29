export class SonyaGame {
  constructor() {
    this.element = document.getElementById(`screen-sonya`);
    this.animation = null;
  }

  createAppearAnimation() {
    return this.element.animate(
        [
          {
            transform: `translate(400px, 300px) rotateZ(-22deg) scale(0.3)`
          },
          {
            transform: `translate(0, 0) rotateZ(0) scale(1)`
          },
        ],
        {
          duration: 800,
          easing: `cubic-bezier(.17,.17,.37,1)`,
          delay: 400,
        }
    );
  }

  createBounceAnimation() {
    return this.element.animate(
        [
          {
            transform: `translateY(0)`
          },
          {
            transform: `translateY(-30px)`
          },
          {
            transform: `translateY(0)`
          }
        ],
        {
          duration: 3000,
          easing: `ease-in-out`,
          iterations: Infinity,
          fill: `both`,
        }
    );
  }

  appear() {
    if (this.animation) {
      this.animation.cancel();
    }
    this.animation = this.createAppearAnimation();

    this.animation.play();
    this.animation.onfinish = () => {
      this.animation = this.createBounceAnimation();
      this.animation.play();
    };
  }

  disappear() {
    this.animation = this.createAppearAnimation();

    this.animation.reverse();
    this.animation.play();
  }
}
