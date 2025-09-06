
(function() {
  'use strict';

  window.BASE_URL = window.BASE_URL || 'http://localhost:3000';
  const API_BASE_URL = window.BASE_URL;

 
  function el(sel, root = document) { return root.querySelector(sel); }

  function showMessage(text, type = 'success') {
    let box = el('#authMessage');
    if (!box) {
      box = document.createElement('div');
      box.id = 'authMessage';
      box.style.cssText = `
        position: fixed; top: 20px; right: 20px; z-index: 1000;
        padding: 12px 18px; border-radius: 6px; color: white;
        font-weight: bold; display: none;
      `;
      document.body.appendChild(box);
    }
    box.textContent = text;
    box.style.backgroundColor = type === 'error' ? '#dc2626' : '#059669';
    box.style.display = 'block';
    clearTimeout(box._hideTO);
    box._hideTO = setTimeout(() => { box.style.display = 'none'; }, 3500);
  }

 
  async function apiCall(endpoint, options = {}) {
    const url = endpoint.startsWith('http') ? endpoint : `${API_BASE_URL}${endpoint}`;
    const response = await fetch(url, {
      headers: { 'Content-Type': 'application/json', ...options.headers },
      ...options
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || `HTTP ${response.status}`);
    return data;
  }

 
  async function registerUser(email, password) {
    return await apiCall('/api/register', {
      method: 'POST',
      body: JSON.stringify({ email, password })
    });
  }

  async function loginUser(email, password) {
    return await apiCall('/api/login', {
      method: 'POST',
      body: JSON.stringify({ email, password })
    });
  }

  function setCurrentUser(email) {
    sessionStorage.setItem('farmfusion_user', JSON.stringify({ email, time: Date.now() }));
  }

  function clearCurrentUser() {
    sessionStorage.removeItem('farmfusion_user');
  }

  
  function setupForms() {
    const loginForm = el('#loginForm');
    if (loginForm) {
      loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = el('#email', loginForm).value.trim();
        const password = el('#password', loginForm).value;

        if (!email || !password) return showMessage('Fill in all fields', 'error');
        try {
          showMessage('Logging in...');
          await loginUser(email, password);
          setCurrentUser(email);
          showMessage('Login successful!');
          setTimeout(() => window.location.href = 'marketplace.html', 800);
        } catch (err) {
          showMessage('Login failed: ' + err.message, 'error');
        }
      });
    }

    const registerForm = el('#registerForm');
    if (registerForm) {
      registerForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = el('#email', registerForm).value.trim();
        const password = el('#password', registerForm).value;
        const confirm = el('#confirmPassword', registerForm).value;

        if (!email || !password || !confirm) return showMessage('Fill in all fields', 'error');
        if (password !== confirm) return showMessage('Passwords do not match', 'error');
        if (password.length < 6) return showMessage('Password must be at least 6 characters', 'error');

        try {
          showMessage('Creating account...');
          await registerUser(email, password);
          setCurrentUser(email);
          showMessage('Registration successful!');
          setTimeout(() => window.location.href = 'marketplace.html', 800);
        } catch (err) {
          showMessage('Registration failed: ' + err.message, 'error');
        }
      });
    }
  }

 
  document.addEventListener('DOMContentLoaded', () => {
    console.log('Auth App.js loaded with BASE_URL:', API_BASE_URL);
    setupForms();
    const year = el('#year');
    if (year) year.textContent = new Date().getFullYear();
  });

})();
