export default class LoginView {
  constructor(container) {
    this.container = container;
  }

  get template() {
    return `
      <div class="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4">
        <form id="form-login" class="w-full max-w-md bg-white p-6 rounded-lg shadow">
          <h2 class="text-2xl mb-4 text-center">Login</h2>
          <div class="mb-4">
            <label class="block mb-1">Email</label>
            <input type="email" id="email" required
              class="w-full border rounded px-3 py-2 focus:outline-none focus:ring"/>
          </div>
          <div class="mb-6">
            <label class="block mb-1">Password</label>
            <input type="password" id="password" required
              class="w-full border rounded px-3 py-2 focus:outline-none focus:ring"/>
          </div>
          <button type="submit"
            class="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition">
            Login
          </button>
          <p class="mt-4 text-center text-sm">
            Belum punya akun?
            <a href="#/register" class="text-green-600 hover:underline">Register</a>
          </p>
        </form>
      </div>`;
  }

  render() {
    this.container.innerHTML = this.template;
  }

  bindSubmit(handler) {
    const form = document.getElementById("form-login");
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const data = {
        email: form.querySelector("#email").value.trim(),
        password: form.querySelector("#password").value.trim(),
      };
      handler(data);
    });
  }

  showMessage(msg) {
    alert(msg);
  }
}
