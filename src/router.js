export default class Router {
  constructor() {
    this.routes = {};
    window.addEventListener("hashchange", () => this.resolve());
    window.addEventListener("load", () => this.resolve());
  }
  register(path, callback) {
    this.routes[path] = callback;
  }
  resolve() {
    const hash = location.hash.slice(1) || "/";
    (this.routes[hash] || this.routes["/"])();
  }
}
