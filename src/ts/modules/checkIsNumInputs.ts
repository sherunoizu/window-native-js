export const checkIsNumInputs = (selector: string): void => {
  const numInputs = document.querySelectorAll(
    selector
  ) as NodeListOf<HTMLInputElement>;

  numInputs.forEach(input => {
    input.addEventListener('input', e => {
      input.value = input.value.replace(/\D/, '');
    });
  });
};
