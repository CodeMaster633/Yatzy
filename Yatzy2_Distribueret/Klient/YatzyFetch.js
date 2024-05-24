export async function get(url) {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(response.status);
    }
    return await response.json();
}

export async function post(url, objekt) {
    const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(objekt),
        headers: { 'Content-Type': 'application/json' }
    });
    if (!response.ok) {
        throw new Error(response.status);
    }
    return await response.json();
}

export async function put(url, objekt) {
    const response = await fetch(url, {
        method: "PUT",
        body: JSON.stringify(objekt),
        headers: { 'Content-Type': 'application/json' }
    });
    if (!response.ok) {
        throw new Error(response.status);
    }
    return await response.json();
}
