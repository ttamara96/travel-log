const API_URL = 'http://localhost:1337';

export async function listLogEntries() {
    const response = await fetch(`${API_URL}/api/logs`);
    return response.json();
}

export async function createLogEntry(entry) {
    const response = await fetch(`${API_URL}/api/logs`, {
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify(entry)
    });

    return response.json();
}

export async function updateLogEntry(_id, entry) {
    const requestBody = {...entry};
    delete requestBody.createdAt;
    delete requestBody.updatedAt;
    delete requestBody.__v;
    const response = await fetch(`${API_URL}/api/logs/${_id}`, {
        method: "PUT",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify(requestBody)
    });

    return response.json();
}


export async function deleteLogEntry(_id) {
    const response = await fetch(`${API_URL}/api/logs/${_id}`, {
        method: "DELETE"
    })
    return response;
}