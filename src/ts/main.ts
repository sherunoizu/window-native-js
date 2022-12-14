import {modals} from './modules';
import {tabs} from './modules';
import {forms} from './modules';
import {changeModalState} from './modules';

import './slider';

export interface IModalState {
  form: number;
  width: number;
  height: number;
  type: string,
  profile: string
}

document.addEventListener('DOMContentLoaded', () => {
  const modalState: IModalState = {
    form: 0,
    width: 0,
    height: 0,
    type: '',
    profile: ''
  };

  changeModalState(modalState);

  modals();
  tabs({
    headerSelector: '.glazing_slider',
    tabSelector: '.glazing_block',
    contentSelector: '.glazing_content',
    activeClass: 'active'
  });
  tabs({
    headerSelector: '.decoration_slider',
    tabSelector: '.no_click',
    contentSelector: '.decoration_content > div > div',
    activeClass: 'after_click'
  });
  tabs({
    headerSelector: '.balcon_icons',
    tabSelector: '.balcon_icons_img',
    contentSelector: '.big_img > img',
    activeClass: 'do_image_more',
    display: 'inline-block'
  });
  forms(modalState);
});
