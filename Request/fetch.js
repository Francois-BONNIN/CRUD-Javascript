const DeleteOptions = {
    method: 'DELETE',
    headers: {
        'Content-Type': 'application/json'
    }
};

function PostOpt(match) {
    const PostOptions = {
        method: 'POST',
        body: JSON.stringify(match),
        headers: {
            'Content-Type': 'application/json'
        }
    }
    return PostOptions;
}

function PutOpt(match) {
    const PostOptions = {
        method: 'PUT',
        body: JSON.stringify(match),
        headers: {
            'Content-Type': 'application/json'
        }
    }
    return PostOptions;
}