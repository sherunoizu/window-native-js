const modals = () => {
  const modalTimeout = showModalByTime('.popup', 10000);

  interface IModalSelectors {
    triggerSelector: string;
    modalSelector: string;
    closeSelector: string;
  }

  function bindModal({
    triggerSelector,
    modalSelector,
    closeSelector
  }: IModalSelectors) {
    const triggers = document.querySelectorAll(triggerSelector);
    const modal = document.querySelector(modalSelector) as HTMLElement;
    const close = document.querySelector(closeSelector) as HTMLElement;
    modal.classList.add('hide');

    triggers.forEach(trigger => {
      trigger.addEventListener('click', e => {
        if (e.target) {
          e.preventDefault();
          showModal(modal);
        }
      });
    });

    close.addEventListener('click', () => {
      hideModal(modal);
    });

    modal.addEventListener('click', e => {
      if (e.target === modal) {
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
  }

  function showModalByTime(selector: string, time: number) {
    const cuurentModal: Element = document.querySelector(
      selector
    ) as HTMLElement;
    return setTimeout(() => {
      cuurentModal.classList.remove('hide');
      cuurentModal.classList.add('show');
      document.body.style.overflow = 'hidden';
    }, time);
  }

  const popupEngineerSelectors: IModalSelectors = {
    triggerSelector: '.popup_engineer_btn',
    modalSelector: '.popup_engineer',
    closeSelector: '.popup_engineer .popup_close'
  };

  const popupSelectors = {
    triggerSelector: '.phone_link',
    modalSelector: '.popup',
    closeSelector: '.popup .popup_close'
  };

  bindModal(popupEngineerSelectors);
  bindModal(popupSelectors);
};

export {modals};
