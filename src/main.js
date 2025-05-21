import Router from "./router.js";
import AuthModel from "./models/AuthModel.js";
import RegisterView from "./views/RegisterView.js";
import LoginView from "./views/LoginView.js";
import HomeView from "./views/HomeView.js";
import RegisterPresenter from "./presenters/RegisterPresenter.js";
import LoginPresenter from "./presenters/LoginPresenter.js";
import HomePresenter from "./presenters/HomePresenter.js";

const BASE_URL = "https://story-api.dicoding.dev/v1";
const app = document.getElementById("app");
const router = new Router();

router.register("/", () => {
  const view = new HomeView(app);
  new HomePresenter(view, router).init();
});

router.register("/register", () => {
  const view = new RegisterView(app);
  const model = new AuthModel(BASE_URL);
  new RegisterPresenter(model, view, router).init();
});

router.register("/login", () => {
  const view = new LoginView(app);
  const model = new AuthModel(BASE_URL);
  new LoginPresenter(model, view, router).init();
});

function updateAuthButtons() {
  const token = localStorage.getItem("token");
  const navBtn = document.getElementById("nav-auth-btn");
  const mobileBtn = document.getElementById("mobile-nav-auth-btn");
  if (token) {
    navBtn.textContent = "Logout";
    mobileBtn.textContent = "Logout";
    navBtn.onclick = handleLogout;
    mobileBtn.onclick = () => {
      handleLogout();
      closeMobileMenu();
    };
  } else {
    navBtn.textContent = "Login";
    mobileBtn.textContent = "Login";
    navBtn.onclick = () => {
      location.hash = "/login";
    };
    mobileBtn.onclick = () => {
      location.hash = "/login";
      closeMobileMenu();
    };
  }
}

function handleLogout() {
  localStorage.clear();
  location.hash = "/";
  updateAuthButtons();
}

const mobileMenuBtn = document.getElementById("mobile-menu-button");
const mobileMenuEl = document.getElementById("mobile-menu");
const mobileMenuClose = document.getElementById("mobile-menu-close");

function openMobileMenu() {
  mobileMenuEl.classList.remove("translate-x-full");
}
function closeMobileMenu() {
  mobileMenuEl.classList.add("translate-x-full");
}

mobileMenuBtn.addEventListener("click", openMobileMenu);
mobileMenuClose.addEventListener("click", closeMobileMenu);

window.addEventListener("load", () => {
  updateAuthButtons();
});
window.addEventListener("hashchange", updateAuthButtons);
