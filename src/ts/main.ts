import {modals} from './modules';
import {tabs} from './modules';
import {forms} from './modules';

import './slider';

document.addEventListener('DOMContentLoaded', () => {
  modals();
  tabs({
    headerSelector: '.glazing_slider',
    tabSelector: '.glazing_block',
    contentSelector: '.glazing_content',
    activeClass: 'active',
    display: 'block'
  });
  tabs({
    headerSelector: '.decoration_slider',
    tabSelector: '.no_click',
    contentSelector: '.decoration_content > div > div',
    activeClass: 'after_click',
    display: 'block'
  });
  tabs({
    headerSelector: '.balcon_icons',
    tabSelector: '.balcon_icons_img',
    contentSelector: '.big_img > img',
    activeClass: 'do_image_more',
    display: 'inline-block'
  });
  forms();
});
