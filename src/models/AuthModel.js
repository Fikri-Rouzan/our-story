export default class AuthModel {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  register({ name, email, password }) {
    return fetch(`${this.baseUrl}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    }).then((res) => res.json());
  }

  login({ email, password }) {
    return fetch(`${this.baseUrl}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    }).then((res) => res.json());
  }
}
