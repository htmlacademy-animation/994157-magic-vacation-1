export default () => {
  let showResultEls = document.querySelectorAll(`.js-show-result`);
  let results = document.querySelectorAll(`.screen--result`);
  let titles = document.querySelectorAll(`[data-parent-screen]`);
  let titleFailRestart = document.getElementById(`resetNegativeTitleOpacity`);

  const hideScreens = (resultScreens) => {
    [].slice.call(resultScreens).forEach(function (el) {
      el.classList.remove(`screen--show`);
      el.classList.add(`screen--hidden`);
    });
  };

  if (results.length) {
    for (let i = 0; i < showResultEls.length; i++) {
      showResultEls[i].addEventListener(`click`, function () {
        let target = showResultEls[i].getAttribute(`data-target`);
        hideScreens(results);

        let targetEl = [].slice.call(results).filter(function (el) {
          return el.getAttribute(`id`) === target;
        });

        let titleTargetEl = [].slice.call(titles).find(function (el) {
          return el.getAttribute(`data-parent-screen`) === target;
        });

        targetEl[0].classList.add(`screen--show`);
        targetEl[0].classList.remove(`screen--hidden`);

        if (titleTargetEl) {
          titleTargetEl.beginElement();
        }
      });
    }

    let playBtn = document.querySelector(`.js-play`);
    if (playBtn) {
      playBtn.addEventListener(`click`, function () {
        hideScreens(results);
        document.getElementById(`messages`).innerHTML = ``;
        document.getElementById(`message-field`).focus();
        titleFailRestart.beginElement();
      });
    }
  }
};
