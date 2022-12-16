export const modals = () => {
  const modalTimeout = showModalByTime('.popup', 10000);

  interface IModalSelectors {
    triggerSelector: string;
    modalSelector: string;
    closeSelector: string;
    closeClickOverlay: boolean;
  }

  function bindModal(selectors: IModalSelectors) {
    const triggers = document.querySelectorAll(selectors.triggerSelector);
    const modal = document.querySelector(
      selectors.modalSelector
    ) as HTMLElement;
    const close = document.querySelector(
      selectors.closeSelector
    ) as HTMLElement;
    modal.classList.add('hide');
    const windows = document.querySelectorAll(
      '[data-modal]'
    ) as NodeListOf<HTMLElement>;
    const scroll = calcScroll();

    const hideAllModals = (): void => {
      windows.forEach(window => {
        window.style.display = 'none';
      });
    };

    triggers.forEach(trigger => {
      trigger.addEventListener('click', e => {
        if (e.target) {
          e.preventDefault();
          showModal(modal);
        }

        hideAllModals();
      });
    });

    close.addEventListener('click', () => {
      hideModal(modal);

      hideAllModals();
    });

    modal.addEventListener('click', e => {
      if (e.target === modal && selectors.closeClickOverlay) {
        hideAllModals();
        hideModal(modal);
      }
    });
  }

  function showModal(modal: Element) {
    clearTimeout(modalTimeout);
    modal.classList.remove('hide');
    modal.classList.add('show');
    document.addEventListener(
      'keydown',
      e => {
        if (e.key === 'Escape') {
          hideModal(modal);
        }
      },
      {once: true}
    );
  }

  function hideModal(modal: Element) {
    modal.classList.remove('show');
    modal.classList.add('hide');
    document.body.style.overflow = '';
    document.body.style.marginRight = `0px`;
  }

  function showModalByTime(selector: string, time: number) {
    const cuurentModal: Element = document.querySelector(
      selector
    ) as HTMLElement;
    return setTimeout(() => {
      cuurentModal.classList.remove('hide');
      cuurentModal.classList.add('show');
      document.body.style.overflow = 'hidden';
      document.body.style.marginRight = `${scroll}px`;
    }, time);
  }

  function calcScroll(): number {
    const div = document.createElement('div');

    div.style.width = '50px';
    div.style.height = '50px';
    div.style.overflowY = 'scroll';
    div.style.visibility = 'hidden';

    document.body.appendChild(div);

    const scrollWidth = div.offsetWidth - div.clientWidth;
    div.remove();

    return scrollWidth;
  }

  const popupEngineerSelectors: IModalSelectors = {
    triggerSelector: '.popup_engineer_btn',
    modalSelector: '.popup_engineer',
    closeSelector: '.popup_engineer .popup_close',
    closeClickOverlay: true
  };

  const popupSelectors: IModalSelectors = {
    triggerSelector: '.phone_link',
    modalSelector: '.popup',
    closeSelector: '.popup .popup_close',
    closeClickOverlay: true
  };

  const popupCalcSelectors: IModalSelectors = {
    triggerSelector: '.popup_calc_btn',
    modalSelector: '.popup_calc',
    closeSelector: '.popup_calc_close',
    closeClickOverlay: true
  };

  const popupProfileSelectors: IModalSelectors = {
    triggerSelector: '.popup_calc_button',
    modalSelector: '.popup_calc_profile',
    closeSelector: '.popup_calc_profile_close',
    closeClickOverlay: false
  };

  const popupProfileEndSelectors: IModalSelectors = {
    triggerSelector: '.popup_calc_profile_button',
    modalSelector: '.popup_calc_end',
    closeSelector: '.popup_calc_end_close',
    closeClickOverlay: false
  };

  bindModal(popupEngineerSelectors);
  bindModal(popupSelectors);
  bindModal(popupCalcSelectors);
  bindModal(popupProfileSelectors);
  bindModal(popupProfileEndSelectors);
};
