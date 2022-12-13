interface ITabsSelectors {
  headerSelector: string;
  tabSelector: string;
  contentSelector: string;
  activeClass: string;
}

const tabs = (selectors: ITabsSelectors) => {
  const header = document.querySelector(selectors.headerSelector) as Element;
  const tabs = document.querySelectorAll(selectors.tabSelector);
  const contents = document.querySelectorAll(
    selectors.contentSelector
  ) as NodeListOf<HTMLElement>;

  const hideTabContent = () => {
    contents.forEach(content => (content.style.display = 'none'));

    tabs.forEach(tab => tab.classList.remove(selectors.activeClass));
  };

  const showTabContent = (i = 0) => {
    contents[i].style.display = 'block';
    tabs[i].classList.add(selectors.activeClass);
  };

  hideTabContent();
  showTabContent();

  header.addEventListener('click', e => {
    const target = e.target as HTMLLinkElement;
    const targetParent = target.parentNode as HTMLElement;
    const tabSelectorClass = selectors.tabSelector.replace(/\./, '');

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
  });
};

export {tabs};
