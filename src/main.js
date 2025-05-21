import Router from "./router.js";
import AuthModel from "./models/AuthModel.js";
import StoryModel from "./models/StoryModel.js";
import RegisterView from "./views/RegisterView.js";
import LoginView from "./views/LoginView.js";
import HomeView from "./views/HomeView.js";
import AddStoryView from "./views/AddStoryView.js";
import RegisterPresenter from "./presenters/RegisterPresenter.js";
import LoginPresenter from "./presenters/LoginPresenter.js";
import HomePresenter from "./presenters/HomePresenter.js";
import AddStoryPresenter from "./presenters/AddStoryPresenter.js";

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

router.register("/add-story", () => {
  const model = new StoryModel(BASE_URL);
  const view = new AddStoryView(app);
  new AddStoryPresenter(model, view, router).init();
});

const navAddBtn = document.getElementById("nav-add-story-btn");
const navAuthBtn = document.getElementById("nav-auth-btn");
const mobileAddBtn = document.getElementById("mobile-nav-add-btn");
const mobileAuthBtn = document.getElementById("mobile-nav-auth-btn");

navAddBtn.addEventListener("click", () => {
  location.hash = "/add-story";
});
mobileAddBtn.addEventListener("click", () => {
  location.hash = "/add-story";
  closeMobileMenu();
});

function updateAuthButtons() {
  const token = localStorage.getItem("token");
  if (token) {
    navAuthBtn.textContent = "Logout";
    navAuthBtn.onclick = handleLogout;
    mobileAuthBtn.textContent = "Logout";
    mobileAuthBtn.onclick = () => {
      handleLogout();
      closeMobileMenu();
    };
  } else {
    navAuthBtn.textContent = "Login";
    navAuthBtn.onclick = () => {
      location.hash = "/login";
    };
    mobileAuthBtn.textContent = "Login";
    mobileAuthBtn.onclick = () => {
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

window.addEventListener("load", updateAuthButtons);
window.addEventListener("hashchange", updateAuthButtons);
