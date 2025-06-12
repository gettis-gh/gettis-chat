import { handleLogin } from "../../handler/auth/login.js";

const loginForm = document.getElementById('login-form');
loginForm.addEventListener('submit', handleLogin);