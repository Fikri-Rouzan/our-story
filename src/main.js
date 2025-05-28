import "leaflet/dist/leaflet.css";
import L from "leaflet";
import Swal from "sweetalert2";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconUrl: "/assets/marker-icon-violet.png",
  iconRetinaUrl: "/assets/marker-icon-2x-violet.png",
  shadowUrl: "/assets/marker-shadow.png",
});

import Router from "./router.js";
import AuthModel from "./models/AuthModel.js";
import StoryModel from "./models/StoryModel.js";
import NotificationModel from "./models/NotificationModel.js";

import RegisterView from "./views/RegisterView.js";
import LoginView from "./views/LoginView.js";
import HomeView from "./views/HomeView.js";
import StoryDetailView from "./views/StoryDetailView.js";
import AddStoryView from "./views/AddStoryView.js";
import NotificationView from "./views/NotificationView.js";

import RegisterPresenter from "./presenters/RegisterPresenter.js";
import LoginPresenter from "./presenters/LoginPresenter.js";
import HomePresenter from "./presenters/HomePresenter.js";
import StoryDetailPresenter from "./presenters/StoryDetailPresenter.js";
import AddStoryPresenter from "./presenters/AddStoryPresenter.js";
import NotificationPresenter from "./presenters/NotificationPresenter.js";
import NotFoundPresenter from "./presenters/NotFoundPresenter.js";

const BASE_URL = "https://story-api.dicoding.dev/v1";

const app = document.getElementById("app");

const router = new Router();

// Home page
router.register("/", () =>
  new HomePresenter(new StoryModel(BASE_URL), new HomeView(app), router).init()
);

// Registration page
router.register("/register", () =>
  new RegisterPresenter(
    new AuthModel(BASE_URL),
    new RegisterView(app),
    router
  ).init()
);

// Login page
router.register("/login", () =>
  new LoginPresenter(new AuthModel(BASE_URL), new LoginView(app), router).init()
);

// Add new story page
router.register("/add-story", () =>
  new AddStoryPresenter(
    new StoryModel(BASE_URL),
    new AddStoryView(app),
    router
  ).init()
);

// Story detail page
router.register("/story/:id", (p) =>
  new StoryDetailPresenter(
    new StoryModel(BASE_URL),
    new StoryDetailView(app),
    router
  ).init(p)
);

// Not found page
router.register("*", () => {
  new NotFoundPresenter(app).init();
});

const navHomeBtn = document.getElementById("nav-home-btn");
const navAddBtn = document.getElementById("nav-add-story-btn");
const navNotifBtn = document.getElementById("nav-notif-btn");
const navAuthBtn = document.getElementById("nav-auth-btn");

const mobileHomeBtn = document.getElementById("mobile-nav-home-btn");
const mobileAddBtn = document.getElementById("mobile-nav-add-btn");
const mobileNotifBtn = document.getElementById("mobile-nav-notif-btn");
const mobileAuthBtn = document.getElementById("mobile-nav-auth-btn");

const notifModel = new NotificationModel(BASE_URL);
const notifView = new NotificationView(navNotifBtn, mobileNotifBtn);

function updateNotifButtons(subscribed) {
  const icon = subscribed ? "fa-bell-slash" : "fa-bell";
  const text = subscribed ? "Disable Notifications" : "Enable Notifications";
  const html = `<i class="fas ${icon} fa-fw leading-none"></i><span class="ml-2">${text}</span>`;
  navNotifBtn.innerHTML = html;
  mobileNotifBtn.innerHTML = html;
}

notifView.setSubscribed = (isSubscribed) => {
  updateNotifButtons(isSubscribed);
};

new NotificationPresenter(notifModel, notifView).init();
updateNotifButtons(false);

mobileNotifBtn.addEventListener("click", () => {
  closeMobileMenu();
});

// Home click handlers
navHomeBtn.addEventListener("click", () => {
  location.hash = "/";
});
mobileHomeBtn.addEventListener("click", () => {
  location.hash = "/";
  closeMobileMenu();
});

// Add story click handlers
navAddBtn.addEventListener("click", () => {
  location.hash = "/add-story";
});
mobileAddBtn.addEventListener("click", () => {
  location.hash = "/add-story";
  closeMobileMenu();
});

// Authentication click handlers
function updateAuthButtons() {
  const token = localStorage.getItem("token");

  if (token) {
    const html = `<i class="fas fa-right-from-bracket fa-fw leading-none"></i><span class="ml-2">Sign Out</span>`;
    navAuthBtn.innerHTML = html;
    mobileAuthBtn.innerHTML = html;
    navAuthBtn.onclick = handleLogout;
    mobileAuthBtn.onclick = () => {
      handleLogout();
      closeMobileMenu();
    };
  } else {
    const html = `<i class="fas fa-right-from-bracket fa-fw leading-none"></i><span class="ml-2">Sign In</span>`;
    navAuthBtn.innerHTML = html;
    mobileAuthBtn.innerHTML = html;
    navAuthBtn.onclick = () => {
      location.hash = "/login";
    };
    mobileAuthBtn.onclick = () => {
      location.hash = "/login";
      closeMobileMenu();
    };
  }
}

function handleLogout() {
  Swal.fire({
    title: "Are You Sure You Want to Sign Out?",
    text: "You'll be signed out of your account",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Sign Out",
    cancelButtonText: "Cancel",
  }).then((result) => {
    if (result.isConfirmed) {
      localStorage.clear();
      location.hash = "/";
      updateAuthButtons();
      Swal.fire({
        icon: "success",
        title: "You Have Successfully Signed Out",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  });
}

// Mobile menu toggle controls
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

// Automatically close mobile menu
const mdBreakpoint = 768;
window.addEventListener("resize", () => {
  if (window.innerWidth >= mdBreakpoint) closeMobileMenu();
});

window.addEventListener("load", updateAuthButtons);
window.addEventListener("hashchange", updateAuthButtons);

// View Transitions API
if (document.startViewTransition) {
  document.documentElement.addEventListener("viewtransitionstart", () => {
    const oldContent = document.querySelector(":view-transition-old(#app)");
    const newContent = document.querySelector(":view-transition-new(#app)");

    if (oldContent)
      oldContent.animate(
        [
          { transform: "translateX(0)", opacity: 1 },
          { transform: "translateX(-30%)", opacity: 0 },
        ],
        { duration: 300, easing: "ease-in" }
      );

    if (newContent)
      newContent.animate(
        [
          { transform: "translateX(30%)", opacity: 0 },
          { transform: "translateX(0)", opacity: 1 },
        ],
        { duration: 300, easing: "ease-out", fill: "forwards", delay: 100 }
      );
  });
}
