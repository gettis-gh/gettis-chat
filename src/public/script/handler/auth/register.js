import { fetchRegister } from "../../fetcher/auth/register.js";

export async function handleRegister(event) {
    event.preventDefault();

    const usernameInput = document.getElementById('username-input');
    const username = usernameInput.value;

    if (!username) {
        return alert("You must provide an username.");
    }

    const result = await fetchRegister(username);

    alert(JSON.stringify(result));
}