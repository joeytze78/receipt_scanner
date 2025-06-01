<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Login</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-100 min-h-screen flex items-center justify-center">
  <div class="bg-white p-8 rounded shadow-md w-full max-w-md">
    <div class="flex justify-between mb-6">
      <button id="show-login" class="font-bold border-b-2 border-blue-500">Login</button>
      <button id="show-signup" class="font-bold text-gray-500">Sign Up</button>
    </div>

    <form id="auth-form" class="space-y-4">
      <input type="email" id="email" placeholder="Email" required class="w-full p-2 border rounded" />
      <input type="password" id="password" placeholder="Password" required class="w-full p-2 border rounded" />
      <button type="submit" class="w-full bg-blue-500 text-white p-2 rounded">Submit</button>
    </form>

    <p id="status" class="mt-4 text-sm text-red-600"></p>
  </div>

  <script type="module">
    import { supabase } from './src/main.js';

    let isLogin = true;

    const form = document.getElementById('auth-form');
    const status = document.getElementById('status');
    const showLogin = document.getElementById('show-login');
    const showSignup = document.getElementById('show-signup');

    showLogin.addEventListener('click', () => {
      isLogin = true;
      showLogin.classList.add('border-blue-500');
      showSignup.classList.remove('border-blue-500');
      status.textContent = '';
    });

    showSignup.addEventListener('click', () => {
      isLogin = false;
      showSignup.classList.add('border-blue-500');
      showLogin.classList.remove('border-blue-500');
      status.textContent = '';
    });

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const email = document.getElementById('email').value.trim();
      const password = document.getElementById('password').value;

      status.textContent = 'Authenticating...';

      if (isLogin) {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) {
          status.textContent = 'Login failed. Check email or password. Or switch to Sign Up.';
        } else {
          status.textContent = 'Login successful! Redirecting...';
          setTimeout(() => window.location.href = 'index.html', 800);
        }
      } else {
        const { data, error } = await supabase.auth.signUp({ email, password });
        if (error) {
          status.textContent = 'Sign up failed: ' + error.message;
        } else {
          status.textContent = 'Sign up successful! Please check your email to confirm.';
        }
      }
    });
  </script>
</body>
</html>
