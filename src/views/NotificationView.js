export default class NotificationView {
  constructor(navBtn, mobileBtn) {
    this.navBtn = navBtn;
    this.mobileBtn = mobileBtn;
  }

  setSubscribed(isSubscribed) {
    const text = isSubscribed
      ? "Disable Notifications"
      : "Enable Notifications";

    this.navBtn.textContent = text;
    this.mobileBtn.textContent = text;
  }

  bindToggle(handler) {
    this.navBtn.addEventListener("click", handler);

    this.mobileBtn.addEventListener("click", () => {
      handler();
      if (window.closeMobileMenu) window.closeMobileMenu();
    });
  }
}
