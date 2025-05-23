export default class NotificationModel {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  subscribe(subscription, token) {
    const payload = {
      endpoint: subscription.endpoint,
      keys: subscription.toJSON().keys,
    };

    return fetch(`${this.baseUrl}/notifications/subscribe`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    }).then((response) => response.json());
  }

  unsubscribe(endpoint, token) {
    return fetch(`${this.baseUrl}/notifications/subscribe`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ endpoint }),
    }).then((response) => response.json());
  }
}
