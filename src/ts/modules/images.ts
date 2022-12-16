export const images = (): void => {
  const imgPopup = document.createElement('div');
  const workSection = document.querySelector('.works') as HTMLDivElement;
  const bigImg = document.createElement('img');

  bigImg.classList.add('bigImg');

  imgPopup.classList.add('popup');
  workSection.appendChild(imgPopup);

  imgPopup.style.justifyContent = 'center';
  imgPopup.style.alignItems = 'center';
  imgPopup.style.display = 'none';

  imgPopup.appendChild(bigImg);

  workSection.addEventListener('click', e => {
    e.preventDefault();
    const target = e.target as HTMLImageElement;
    const targetParent = target.parentElement as HTMLLinkElement;
    const path: string = targetParent.getAttribute('href');
    const alt: string = target.getAttribute('alt');

    if (target && target.classList.contains('preview')) {
      imgPopup.style.display = 'flex';
      bigImg.setAttribute('src', path);
      bigImg.setAttribute('alt', alt);
      document.body.style.overflow = 'hidden';
    }

    if (target && target.matches('div.popup')) {
      imgPopup.style.display = 'none';
      document.body.style.overflow = 'hidden';
    }
  });
};
