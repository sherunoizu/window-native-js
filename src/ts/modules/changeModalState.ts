import {IModalState} from '../main';
import {checkIsNumInputs} from './checkIsNumInputs';

export const changeModalState = (state: IModalState) => {
  const windowForms = document.querySelectorAll(
    '.balcon_icons_img'
  ) as NodeListOf<HTMLInputElement>;
  const windowWidth = document.querySelectorAll(
    '#width'
  ) as NodeListOf<HTMLInputElement>;
  const windowHeight = document.querySelectorAll(
    '#height'
  ) as NodeListOf<HTMLInputElement>;
  const windowType = document.querySelectorAll(
    '#view_type'
  ) as NodeListOf<HTMLInputElement>;
  const windowProfile = document.querySelectorAll(
    '.checkbox'
  ) as NodeListOf<HTMLInputElement>;

  checkIsNumInputs('#width');
  checkIsNumInputs('#height');

  interface IBindActions {
    event: string;
    elementsNodeList: NodeListOf<HTMLInputElement>;
    property: keyof IModalState;
  }

  function bindActionToElements({
    event,
    elementsNodeList,
    property
  }: IBindActions) {
    elementsNodeList.forEach((element, i) => {
      element.addEventListener(event, () => {
        switch (element.nodeName) {
          case 'SPAN':
            if (property === 'form') state[property] = i;
            break;
          case 'INPUT':
            if (
              element.getAttribute('type') === 'checkbox' &&
              property === 'profile'
            ) {
              state[property] = i === 0 ? 'Холодное' : 'Теплое';

              elementsNodeList.forEach((checkbox, j) => {
                checkbox.checked = false;
                if (i == j) {
                  checkbox.checked = true;
                }
              });
            } else {
              if (property === 'width' || property === 'height') {
                state[property] = +element.value;
              }
            }
            break;
          case 'SELECT':
            if (property === 'type') {
              state[property] = element.value;
            }
            break;
        }
      });
    });

    console.log(state);
  }

  const windowFormAction: IBindActions = {
    event: 'click',
    elementsNodeList: windowForms,
    property: 'form'
  };

  const windowKeyDownFormAction: IBindActions = {
    event: 'keydown',
    elementsNodeList: windowForms,
    property: 'form'
  };

  const windowWidthAction: IBindActions = {
    event: 'input',
    elementsNodeList: windowWidth,
    property: 'width'
  };

  const windowHeightAction: IBindActions = {
    event: 'input',
    elementsNodeList: windowHeight,
    property: 'height'
  };

  const windowTypeAction: IBindActions = {
    event: 'change',
    elementsNodeList: windowType,
    property: 'type'
  };

  const windowProfileAction: IBindActions = {
    event: 'change',
    elementsNodeList: windowProfile,
    property: 'profile'
  };

  bindActionToElements(windowFormAction);
  bindActionToElements(windowKeyDownFormAction);
  bindActionToElements(windowWidthAction);
  bindActionToElements(windowHeightAction);
  bindActionToElements(windowTypeAction);
  bindActionToElements(windowProfileAction);
};
