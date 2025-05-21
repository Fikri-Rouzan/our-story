export default class RegisterView {
  constructor(container) {
    this.container = container;
  }

  get template() {
    return `
      <div class="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4">
        <form id="form-register" class="w-full max-w-md bg-white p-6 rounded-lg shadow">
          <h2 class="text-2xl mb-4 text-center">Register</h2>
          <div class="mb-4">
            <label class="block mb-1">Name</label>
            <input type="text" id="name" required
              class="w-full border rounded px-3 py-2 focus:outline-none focus:ring"/>
          </div>
          <div class="mb-4">
            <label class="block mb-1">Email</label>
            <input type="email" id="email" required
              class="w-full border rounded px-3 py-2 focus:outline-none focus:ring"/>
          </div>
          <div class="mb-6">
            <label class="block mb-1">Password</label>
            <input type="password" id="password" minlength="8" required
              class="w-full border rounded px-3 py-2 focus:outline-none focus:ring"/>
          </div>
          <button type="submit"
            class="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">
            Register
          </button>
          <p class="mt-4 text-center text-sm">
            Sudah punya akun?
            <a href="#/login" class="text-blue-600 hover:underline">Login</a>
          </p>
        </form>
      </div>`;
  }

  render() {
    this.container.innerHTML = this.template;
  }

  bindSubmit(handler) {
    const form = document.getElementById("form-register");
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const data = {
        name: form.querySelector("#name").value.trim(),
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
