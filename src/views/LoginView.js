export default class LoginView {
  constructor(container) {
    this.container = container;
  }

  get template() {
    return `
      <main id="main-content" role="main"
            class="min-h-[calc(100vh-4rem-4rem)] flex items-center justify-center bg-gray-100 p-4">
        <div class="w-full max-w-4xl bg-white rounded-lg shadow-lg overflow-hidden flex flex-col md:flex-row">
          
          <!-- Left panel -->
          <div class="md:w-1/2 bg-primary p-8 flex flex-col items-center justify-center text-white">
            <h2 class="text-4xl font-bold mb-2">Good to see you again!</h2>
            <p class="text-lg">Sign in to continue</p>
          </div>

          <!-- Right panel -->
          <section aria-labelledby="login-heading" class="md:w-1/2 p-8">
            <header class="mb-6 text-center">
              <h2 id="login-heading" class="text-2xl font-bold">Sign In</h2>
            </header>

            <!-- Login form -->
            <form id="form-login" novalidate class="space-y-5">
              <!-- Email -->
              <div>
                <label for="email" class="block mb-1 font-medium">Email</label>
                <div class="relative">
                  <i class="fas fa-envelope absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    placeholder="Enter your email"
                    class="w-full border border-gray-300 rounded-md px-3 py-2 pl-10
                           focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition"
                  />
                </div>
              </div>

              <!-- Password -->
              <div>
                <label for="password" class="block mb-1 font-medium">Password</label>
                <div class="relative">
                  <i class="fas fa-lock absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    required
                    minlength="8"
                    placeholder="Enter your password (8+ characters)"
                    class="w-full border border-gray-300 rounded-md px-3 py-2 pl-10 pr-10
                           focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition"
                  />
                  <!-- Toggle password -->
                  <button
                    type="button"
                    id="toggle-password"
                    aria-label="Toggle password visibility"
                    class="absolute inset-y-0 right-0 pr-3 flex items-center
                           text-gray-500 hover:text-gray-700 focus:outline-none cursor-pointer"
                  >
                    <i class="fas fa-eye"></i>
                  </button>
                </div>
              </div>

              <!-- Submit -->
              <button
                type="submit"
                class="w-full bg-primary text-white py-3 font-semibold rounded-xl hover:bg-secondary
                       transition cursor-pointer mt-2"
              >
                Sign In
              </button>

              <!-- Link to register -->
              <p class="mt-4 text-center text-sm">
                Don't have an account?
                <a href="#/register" class="text-primary hover:underline font-medium">
                  Sign Up
                </a>
              </p>
            </form>
          </section>
        </div>
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

  bindTogglePassword() {
    const pwInput = this.container.querySelector("#password");
    const btn = this.container.querySelector("#toggle-password");
    const icon = btn.querySelector("i");

    btn.addEventListener("click", () => {
      const hidden = pwInput.type === "password";
      pwInput.type = hidden ? "text" : "password";
      icon.classList.toggle("fa-eye");
      icon.classList.toggle("fa-eye-slash");
    });
  }
}
