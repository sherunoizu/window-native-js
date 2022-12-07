const tabs = (headerSelector, tabSelector, contentSelector, activeClass) => {
   const header = document.querySelector(headerSelector);
   const tabs = document.querySelectorAll(tabSelector);
   const contents = document.querySelectorAll(contentSelector);

   const hideTabContent = () => {
      contents.forEach((content) => (content.style.display = "none"));

      tabs.forEach((tab) => tab.classList.remove(activeClass));
   };

   const showTabContent = (i = 0) => {
      contents[i].style.display = "block";
      tabs[i].classList.add(activeClass);
   };

   hideTabContent();
   showTabContent();

   header.addEventListener("click", (e) => {
      const target = e.target;
      const targetParent = target.parentNode;
      const tabSelectorClass = tabSelector.replace(/\./, "");
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

export default tabs;
