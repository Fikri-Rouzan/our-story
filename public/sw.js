self.addEventListener("push", (event) => {
  const defaultPayload = {
    title: "Notification",
    options: {
      body: "You have a new notification",
    },
  };

  const { title, options } = event.data ? event.data.json() : defaultPayload;

  event.waitUntil(self.registration.showNotification(title, options));
});
