import { fetchRegister } from "./register.js";
import { fetchLogin } from "./login.js";

export async function fetchGetin(username) {
    const registerResponse = await fetchRegister(username);

    if (registerResponse.error) {
        alert(`Error trying to register. ${JSON.stringify(registerResponse)}`);
    }

    const loginResponse = await fetchLogin(username);

    if (loginResponse.error) {
        return `Error trying to login. ${loginResponse}`;
    }

    return loginResponse;
}