export async function fetchLogin(username) {
    const response = await fetch('api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username })
    });

    const result = await response.json();

    return result;
}