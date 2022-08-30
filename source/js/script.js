// modules
import mobileHeight from './modules/mobile-height-adjust.js';
import slider from './modules/slider.js';
import menu from './modules/menu.js';
import footer from './modules/footer.js';
import chat from './modules/chat.js';
import form from './modules/form.js';
import social from './modules/social.js';
import pageLoaded from './modules/pageLoaded.js';
import FullPageScroll from './modules/full-page-scroll';
import animateTypography from './modules/animate-typography';
import awardAnimation from './modules/award-animation';
import {Game} from './modules/game';

// init modules
mobileHeight();
slider();
menu();
footer();
chat();
form();
social();
animateTypography();
awardAnimation();

const game = new Game();
game.init();

const fullPageScroll = new FullPageScroll();
fullPageScroll.init();
pageLoaded();

