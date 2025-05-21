self.addEventListener("push", (event) => {
  let data = { title: "Notifikasi", options: { body: "Ada notifikasi baru" } };
  if (event.data) {
    data = event.data.json();
  }
  event.waitUntil(self.registration.showNotification(data.title, data.options));
});
