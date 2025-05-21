export default class RegisterView {
  constructor(container) {
    this.container = container;
  }

  get template() {
    return `
    <main id="main-content" role="main"
          class="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4">
      <section aria-labelledby="register-title"
               class="w-full max-w-md bg-white p-6 rounded-lg shadow">
        <header>
          <h2 id="register-title"
              class="text-2xl mb-4 text-center">
            Register
          </h2>
        </header>
        <form id="form-register" novalidate>
          <fieldset class="space-y-4 mb-6">
            <legend class="sr-only">Form Registrasi Pengguna</legend>
            
            <div>
              <label for="name" class="block mb-1">Name</label>
              <input type="text" id="name" name="name" required
                     class="w-full border rounded px-3 py-2 focus:outline-none focus:ring"/>
            </div>
            
            <div>
              <label for="email" class="block mb-1">Email</label>
              <input type="email" id="email" name="email" required
                     class="w-full border rounded px-3 py-2 focus:outline-none focus:ring"/>
            </div>
            
            <div>
              <label for="password" class="block mb-1">Password</label>
              <input type="password" id="password" name="password" minlength="8" required
                     class="w-full border rounded px-3 py-2 focus:outline-none focus:ring"/>
            </div>
          </fieldset>
          
          <button type="submit"
                  class="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">
            Register
          </button>
        </form>
        
        <footer class="mt-4 text-center text-sm">
          <p>
            Sudah punya akun?
            <a href="#/login" class="text-blue-600 hover:underline">
              Login
            </a>
          </p>
        </footer>
      </section>
    </main>`;
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
