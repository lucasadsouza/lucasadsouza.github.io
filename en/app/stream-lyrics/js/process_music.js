export function popular(data) {
    let musicList = JSON.parse(JSON.stringify(data));

    return musicList.sort((a, b) => {
        return a.views - b.views;
    }).reverse();
}

export function filterTag(data, tag) {
    let musicList = popular(data);

    return musicList.filter((current) => {
        return current.genre.indexOf(tag) !== -1;
    });
}
