export default class RegisterView {
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
            <h2 class="text-4xl font-bold mb-2 text-center">Welcome to Our Story!</h2>
            <p class="text-lg text-center">Join us today!</p>
          </div>

          <!-- Right panel -->
          <section aria-labelledby="register-title"
                   class="md:w-1/2 p-8">
            <header class="mb-6">
              <h2 id="register-title" class="text-2xl font-bold text-center">
                Create Account
              </h2>
            </header>

            <!-- Register form -->
            <form id="form-register" novalidate class="space-y-5">
              <!-- Name -->
              <div>
                <label for="name" class="block mb-1 font-medium">Full Name</label>
                <div class="relative">
                  <i class="fas fa-user absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    placeholder="Enter your full name"
                    class="w-full border border-gray-300 rounded-md px-3 py-2 pl-10
                           focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition"
                  />
                </div>
              </div>

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
                    minlength="8"
                    required
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
                           text-gray-500 hover:text-gray-700 focus:outline-none"
                  >
                    <i class="fas fa-eye cursor-pointer"></i>
                  </button>
                </div>
              </div>

              <!-- Submit -->
              <button
                type="submit"
                class="w-full bg-primary text-white py-3 font-semibold rounded-xl hover:bg-secondary transition cursor-pointer mt-2"
              >
                Sign Up
              </button>
            </form>

            <!-- Link to login -->
            <footer class="mt-4 text-center text-sm">
              <p>
                Already have an account?
                <a href="#/login" class="text-primary hover:underline font-medium">
                  Sign In
                </a>
              </p>
            </footer>
          </section>
        </div>
      </main>
    `;
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

  bindTogglePassword() {
    const pwInput = this.container.querySelector("#password");
    const btn = this.container.querySelector("#toggle-password");
    const icon = btn.querySelector("i");

    btn.addEventListener("click", () => {
      const isHidden = pwInput.type === "password";
      pwInput.type = isHidden ? "text" : "password";
      icon.classList.toggle("fa-eye");
      icon.classList.toggle("fa-eye-slash");
    });
  }
}
