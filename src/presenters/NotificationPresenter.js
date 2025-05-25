import Swal from "sweetalert2";

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
    this.swRegistration = null;
    this.subscription = null;
  }

  async init() {
    if (!("serviceWorker" in navigator) || !("PushManager" in window)) {
      await Swal.fire({
        icon: "error",
        title: "Push Notifications Not Supported",
        text: "Your browser doesn’t support push notifications. Please update or try a different browser",
      });
      return;
    }

    try {
      this.swRegistration = await navigator.serviceWorker.register("/sw.js");
      this.subscription =
        await this.swRegistration.pushManager.getSubscription();
      this.view.setSubscribed(!!this.subscription);
      this.view.bindToggle(this.toggleSubscription.bind(this));
    } catch {
      await Swal.fire({
        icon: "error",
        title: "Service Worker Registration Failed",
        text: "We couldn’t register the service worker. Please refresh the page and try again",
      });
    }
  }

  async toggleSubscription() {
    const token = localStorage.getItem("token");

    if (!token) {
      await Swal.fire({
        icon: "warning",
        title: "Sign In Required",
        text: "Please sign in to manage your notifications",
      });
      return;
    }

    try {
      if (this.subscription) {
        const endpoint = this.subscription.endpoint;
        const res = await this.model.unsubscribe(endpoint, token);

        if (!res.error) {
          await this.subscription.unsubscribe();
          this.subscription = null;
          this.view.setSubscribed(false);

          await Swal.fire({
            icon: "success",
            title: "Notifications Disabled!",
            text: "You won’t receive notifications anymore",
          });
        } else {
          await Swal.fire({
            icon: "error",
            title: "Something Went Wrong",
            text: res.message,
          });
        }
      } else {
        const permission = await Notification.requestPermission();

        if (permission !== "granted") {
          await Swal.fire({
            icon: "error",
            title: "Notifications Permission Denied",
            text: "You have blocked notifications. To stay updated, please enable notifications in your browser or system settings",
          });
          return;
        }

        this.subscription = await this.swRegistration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC_KEY),
        });

        const res = await this.model.subscribe(this.subscription, token);

        if (!res.error) {
          this.view.setSubscribed(true);
          await Swal.fire({
            icon: "success",
            title: "Notifications Enabled!",
            text: "You’ll now receive notifications",
          });
        } else {
          await Swal.fire({
            icon: "error",
            title: "Something Went Wrong",
            text: res.message,
          });
        }
      }
    } catch {
      await Swal.fire({
        icon: "error",
        title: "Network Error",
        text: "Please try again later",
      });
    }
  }
}
