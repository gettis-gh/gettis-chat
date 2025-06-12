import { fetchGetin } from "../../fetcher/auth/getin.js";

export async function handleGetin(event) {
    event.preventDefault();

    const usernameInput = document.getElementById('username-input');
    const username = usernameInput.value;

    if (!username) {
        return alert("You must provide an username.");
    }

    const result = await fetchGetin(username);

    alert(JSON.stringify(result));
}