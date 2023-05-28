async function postData(url, data) {
    const req = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: data,
    });

    if (!req.ok) {
        throw new Error(`Could not fetch ${url}, status ${req.status}`);
    }
    return await req.json();
}

export {postData}