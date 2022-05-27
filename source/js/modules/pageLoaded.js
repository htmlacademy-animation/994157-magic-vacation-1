export default () => {
  window.addEventListener(`load`, () => {
    setTimeout(() => {
      document.body.classList.add(`page--loaded`);
    }, 350);
  });
};

