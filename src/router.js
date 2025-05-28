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
    const urlSegs = hash.split("/").filter(Boolean);

    let matched = null;

    for (const route of this.routes) {
      const params = {};

      if (route.path === hash) {
        matched = { callback: route.callback, params };
        break;
      }

      if (route.segments.length === urlSegs.length) {
        let ok = true;
        route.segments.forEach((seg, i) => {
          if (seg.startsWith(":")) {
            params[seg.slice(1)] = urlSegs[i];
          } else if (seg !== urlSegs[i]) {
            ok = false;
          }
        });

        if (ok) {
          matched = { callback: route.callback, params };
          break;
        }
      }
    }

    if (!matched) {
      const notFound = this.routes.find((r) => r.path === "*");

      if (notFound) {
        matched = { callback: notFound.callback, params: {} };
      } else {
        const home = this.routes.find((r) => r.path === "/");

        matched = { callback: home.callback, params: {} };
      }
    }

    const runRoute = () => matched.callback(matched.params);

    if (document.startViewTransition) {
      document.startViewTransition(runRoute);
    } else {
      runRoute();
    }
  }
}
