export function jsonHandler(action, cookieName, item=false) {
    let result;
    if (action === 'put' && item !== false) {
        result = JSON.stringify(item);
        localStorage.setItem(cookieName, result);

    } else if (action === 'get') {
        result = JSON.parse(localStorage.getItem(cookieName));

    } else if (action === 'get-json') {
        console.log(item);
        result = JSON.parse(item);
    }

    return result;
}

export function getMusicData () {
    fetch(`https://varlasouza.github.io/en/app/stream-lyrics/data.json`).then((response) => {
        if (response.ok) {
            return response.json();
        }

    }).then(data => {
        jsonHandler('put', 'current-data', data);

    }).catch((error) => {
        console.error(error);
    });
}