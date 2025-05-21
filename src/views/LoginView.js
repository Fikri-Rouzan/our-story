export default class LoginView {
  constructor(container) {
    this.container = container;
  }

  get template() {
    return `
    <main id="main-content"
          role="main"
          class="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4">
      
      <section aria-labelledby="login-heading" class="w-full max-w-md">
        <form id="form-login"
              class="bg-white p-6 rounded-lg shadow">
          
          <header class="mb-6 text-center">
            <h2 id="login-heading" class="text-2xl font-semibold">
              Login
            </h2>
          </header>
          
          <fieldset class="mb-4">
            <label for="email" class="block mb-1">
              Email
            </label>
            <input type="email"
                   id="email"
                   name="email"
                   required
                   class="w-full border rounded px-3 py-2 focus:outline-none focus:ring"/>
          </fieldset>
          
          <fieldset class="mb-6">
            <label for="password" class="block mb-1">
              Password
            </label>
            <input type="password"
                   id="password"
                   name="password"
                   required
                   class="w-full border rounded px-3 py-2 focus:outline-none focus:ring"/>
          </fieldset>
          
          <button type="submit"
                  class="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition">
            Login
          </button>
          
          <p class="mt-4 text-center text-sm">
            Belum punya akun?
            <a href="#/register" class="text-green-600 hover:underline">
              Register
            </a>
          </p>
        
        </form>
      </section>
    </main>
  `;
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
