// modules
import mobileHeight from './modules/mobile-height-adjust.js';
import slider from './modules/slider.js';
import menu from './modules/menu.js';
import footer from './modules/footer.js';
import chat from './modules/chat.js';
import form from './modules/form.js';
import social from './modules/social.js';
import animateTypography from './modules/animate-typography';
import awardAnimation from './modules/award-animation';
import {Game} from './modules/game';
import {scene3dStory} from './modules/3d/scene-3d-story';

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
scene3dStory.init();

window.scene3dStory = scene3dStory;
