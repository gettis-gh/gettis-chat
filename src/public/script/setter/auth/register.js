import { handleRegister } from "../../handler/auth/register.js";

const registerForm = document.getElementById('register-form');
registerForm.addEventListener('submit', handleRegister);