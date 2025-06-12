import { handleGetin } from "../../handler/auth/getin.js";

const getinForm = document.getElementById('getin-form');
getinForm.addEventListener('submit', handleGetin);