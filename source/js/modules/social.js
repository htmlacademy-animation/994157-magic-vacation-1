export default () => {
  const socialBlock = document.querySelector(`.js-social-block`);
  socialBlock.addEventListener(`mouseover`, function () {
    socialBlock.classList.add(`social-block--active`);
  });
  socialBlock.addEventListener(`mouseleave`, function () {
    socialBlock.classList.remove(`social-block--active`);
  });

  const socialList = document.querySelector(`.js-social-list`);
  const socialToggler = document.querySelector(`.js-social-toggler`);
  socialList.addEventListener(`mouseover`, function () {
    socialToggler.classList.add(`social-block__toggler--active`);
  });
  socialList.addEventListener(`mouseleave`, function () {
    socialToggler.classList.remove(`social-block__toggler--active`);
  });
};
