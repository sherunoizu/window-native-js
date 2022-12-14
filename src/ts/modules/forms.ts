import {checkIsNumInputs} from './checkIsNumInputs';

import {IModalState} from '../main';

export const forms = (state: IModalState): void => {
  const forms = document.querySelectorAll('form');
  const inputs = document.querySelectorAll('input');
  const phoneInputs = document.querySelectorAll(
    'input[name="user_phone"]'
  ) as NodeListOf<HTMLInputElement>;

  checkIsNumInputs('input[name="user_phone"]');

  interface IMessage {
    loading: string;
    success: string;
    failure: string;
  }

  const message: IMessage = {
    loading: 'Загрузка...',
    success: 'Спасибо! Скоро мы с Вами свяжемся',
    failure: 'Что-то пошло не так...'
  };

  const postData = async (url: string, data: FormData): Promise<string> => {
    const statusMessage = document.querySelector('.status') as HTMLDivElement;
    statusMessage.textContent = message.loading;

    const result = await fetch(url, {
      method: 'POST',
      body: data
    });

    return await result.text();
  };

  const clearInputs = (): void => {
    inputs.forEach(input => (input.value = ''));
  };

  forms.forEach(form => {
    form.addEventListener('submit', e => {
      e.preventDefault();

      const statusMessage = document.createElement('div');
      statusMessage.classList.add('status');
      form.appendChild(statusMessage);

      const formData = new FormData(form);

      if (form.getAttribute('data-calc') === 'end') {
        let key: keyof IModalState;
        for (key in state) {
          formData.append(key, state[key].toString());
        }
      }

      postData('assets/server.php', formData)
        .then(postDataResult => {
          console.log({postDataResult});
          statusMessage.textContent = message.success;
        })
        .catch(() => (statusMessage.textContent = message.failure))
        .finally(() => {
          clearInputs();
          setTimeout(() => {
            statusMessage.remove();
          }, 5000);
        });
    });
  });
};
