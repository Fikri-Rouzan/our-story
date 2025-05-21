const VAPID_PUBLIC_KEY =
  "BCCs2eonMI-6H2ctvFaWg-UYdDv387Vno_bzUzALpB442r2lCnsHmtrx8biyPi_E-1fSGABK_Qs_GlvPoJJqxbk";

function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
  const raw = atob(base64);
  const output = new Uint8Array(raw.length);
  for (let i = 0; i < raw.length; ++i) {
    output[i] = raw.charCodeAt(i);
  }
  return output;
}

export default class NotificationPresenter {
  constructor(model, view) {
    this.model = model;
    this.view = view;
  }

  async init() {
    if (!("serviceWorker" in navigator) || !("PushManager" in window)) {
      this.view.showMessage("Browser ini tidak mendukung Push Notifications.");
      return;
    }

    this.swRegistration = await navigator.serviceWorker.register("/sw.js");
    this.subscription = await this.swRegistration.pushManager.getSubscription();
    this.view.setSubscribed(!!this.subscription);

    this.view.bindToggle(this.toggleSubscription.bind(this));
  }

  async toggleSubscription() {
    const token = localStorage.getItem("token");
    if (!token) {
      this.view.showMessage("Silakan login terlebih dahulu.");
      return;
    }

    if (this.subscription) {
      const endpoint = this.subscription.endpoint;
      const res = await this.model.unsubscribe(endpoint, token);
      if (!res.error) {
        await this.subscription.unsubscribe();
        this.subscription = null;
        this.view.setSubscribed(false);
        this.view.showMessage("Berhasil unsubscribe.");
      } else {
        this.view.showMessage(res.message);
      }
    } else {
      const permission = await Notification.requestPermission();
      if (permission !== "granted") {
        this.view.showMessage("Izin notifikasi ditolak.");
        return;
      }
      this.subscription = await this.swRegistration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC_KEY),
      });
      const res = await this.model.subscribe(this.subscription, token);
      if (!res.error) {
        this.view.setSubscribed(true);
        this.view.showMessage("Berhasil subscribe.");
      } else {
        this.view.showMessage(res.message);
      }
    }
  }
}
