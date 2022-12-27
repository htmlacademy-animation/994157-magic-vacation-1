import {SCREEN_NAMES, STORY_SLIDE_NAMES} from '../../../constants';
import {BUBBLES} from './bubbles';

export const SCENES = Object.freeze({
  [SCREEN_NAMES.TOP]: {
    image: `img/module-5/scenes-textures/scene-0.png`,
    hasHueShift: false,
  },
  [STORY_SLIDE_NAMES.DOG_AND_SUITCASE]: {
    image: `img/module-5/scenes-textures/scene-1.png`,
    hasHueShift: false,
  },
  [STORY_SLIDE_NAMES.PYRAMID_AND_CACTUS]: {
    image: `img/module-5/scenes-textures/scene-2.png`,
    hasHueShift: true,
    hueShift: 0,
    bubbles: BUBBLES,
  },
  [STORY_SLIDE_NAMES.SNOWMAN_AND_COMPASS]: {
    image: `img/module-5/scenes-textures/scene-3.png`,
    hasHueShift: false,
  },
  [STORY_SLIDE_NAMES.AI_SONYA]: {
    image: `img/module-5/scenes-textures/scene-4.png`,
    hasHueShift: false,
  },
});
export const SCENE_INDEX_BY_NAME = Object.freeze({
  [SCREEN_NAMES.TOP]: 0,
  [STORY_SLIDE_NAMES.DOG_AND_SUITCASE]: 1,
  [STORY_SLIDE_NAMES.PYRAMID_AND_CACTUS]: 2,
  [STORY_SLIDE_NAMES.SNOWMAN_AND_COMPASS]: 3,
  [STORY_SLIDE_NAMES.AI_SONYA]: 4,
});
