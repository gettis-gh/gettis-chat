import { fetchGetin } from "../../fetcher/auth/getin.js";

export async function handleGetin(event) {
    event.preventDefault();

    const usernameInput = document.getElementById('username-input');
    const username = usernameInput.value;

    if (!username) {
        return console.los("You must provide an username.");
    }

    const result = await fetchGetin(username);

    console.los(JSON.stringify(result));
}