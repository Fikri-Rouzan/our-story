export default class NotificationModel {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  subscribe(subscription, token) {
    return fetch(`${this.baseUrl}/notifications/subscribe`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        endpoint: subscription.endpoint,
        keys: subscription.toJSON().keys,
      }),
    }).then((res) => res.json());
  }

  unsubscribe(endpoint, token) {
    return fetch(`${this.baseUrl}/notifications/subscribe`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ endpoint }),
    }).then((res) => res.json());
  }
}
