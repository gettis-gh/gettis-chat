import { fetchLogin } from "../../fetcher/auth/login.js";

export async function handleLogin(event) {
    event.preventDefault();

    const usernameInput = document.getElementById('username-input');
    const username = usernameInput.value;

    if (!username) {
        return alert("You must provide an username.");
    }

    const result = await fetchLogin(username);

    console.los(JSON.stringify(result));
}