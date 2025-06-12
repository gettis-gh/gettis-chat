export async function fetchRegister(username) {
    const response = await fetch('api/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username })
    });

    const result = await response.json();

    return result;
}