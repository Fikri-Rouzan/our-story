export default class Router {
  constructor() {
    this.routes = [];
    window.addEventListener("hashchange", () => this.resolve());
    window.addEventListener("load", () => this.resolve());
  }

  register(path, callback) {
    const segments = path.split("/").filter(Boolean);
    this.routes.push({ path, segments, callback });
  }

  resolve() {
    const hash = location.hash.slice(1) || "/";
    const urlSegments = hash.split("/").filter(Boolean);

    for (const route of this.routes) {
      const params = {};
      if (route.path === hash) {
        return route.callback(params);
      }
      if (route.segments.length === urlSegments.length) {
        let matched = true;
        route.segments.forEach((seg, i) => {
          if (seg.startsWith(":")) {
            params[seg.slice(1)] = urlSegments[i];
          } else if (seg !== urlSegments[i]) {
            matched = false;
          }
        });
        if (matched) {
          return route.callback(params);
        }
      }
    }

    const home = this.routes.find((r) => r.path === "/");
    if (home) home.callback({});
  }
}
