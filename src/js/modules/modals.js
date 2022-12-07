const modals = () => {
   const modalTimeout = showModalByTime(".popup", 3000);
   
   function bindModal(triggerSelector, modalSelector, closeSelector) {
      const triggers = document.querySelectorAll(triggerSelector);
      const modal = document.querySelector(modalSelector);
      const close = document.querySelector(closeSelector);

      triggers.forEach((trigger) => {
         trigger.addEventListener("click", (e) => {
            if (e.target) {
               e.preventDefault();
               showModal(modal);
            }
         });
      });

      close.addEventListener("click", () => {
         hideModal(modal);
      });

      modal.addEventListener("click", (e) => {
         if (e.target === modal) {
            hideModal(modal);
         }
      });
   }

   function showModal(modal) {
      clearTimeout(modalTimeout);
      modal.style.display = "block";
      document.addEventListener(
         "keydown",
         (e) => {
            if (e.key === "Escape") {
               hideModal(modal);
            }
         },
         { once: true }
      );
   }

   function hideModal(modal) {
      modal.style.display = "none";
      document.body.style.overflow = "";
   }

   function showModalByTime(selector, time) {
      return setTimeout(() => {
         document.querySelector(selector).style.display = "block";
         document.body.style.overflow = "hidden";
      }, time);
   }

   bindModal(
      ".popup_engineer_btn",
      ".popup_engineer",
      ".popup_engineer .popup_close"
   );
   bindModal(".phone_link", ".popup", ".popup .popup_close");
};

export default modals;
