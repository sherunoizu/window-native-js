interface ITabsSelectors {
  headerSelector: string;
  tabSelector: string;
  contentSelector: string;
  activeClass: string;
  event?: 'click' | 'keydown';
  display?: 'flex' | 'block' | 'inline-block';
}

const tabs = ({
  headerSelector,
  tabSelector,
  contentSelector,
  activeClass,
  event = 'click',
  display = 'block'
}: ITabsSelectors) => {
  const header = document.querySelector(headerSelector) as Element;
  const tabs = document.querySelectorAll(tabSelector);
  const contents = document.querySelectorAll(
    contentSelector
  ) as NodeListOf<HTMLElement>;

  const hideTabContent = () => {
    contents.forEach(content => (content.style.display = 'none'));

    tabs.forEach(tab => tab.classList.remove(activeClass));
  };

  const showTabContent = (i = 0) => {
    contents[i].style.display = display;
    tabs[i].classList.add(activeClass);
  };

  hideTabContent();
  showTabContent();

  header.addEventListener(event, e => {
    const target = e.target as HTMLLinkElement;
    const targetParent = target.parentNode as HTMLElement;
    const tabSelectorClass = tabSelector.replace(/\./, '');

    if (event !== 'keydown' || (e as KeyboardEvent).code === 'Space') {
      if (
        target &&
        (target.classList.contains(tabSelectorClass) ||
          targetParent.classList.contains(tabSelectorClass))
      ) {
        tabs.forEach((tab, i) => {
          if (target == tab || targetParent == tab) {
            hideTabContent();
            showTabContent(i);
          }
        });
      }
    }
  });
};

export {tabs};
