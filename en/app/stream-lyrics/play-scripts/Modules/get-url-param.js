export function getUrlParams () {
    let url_string = window.location.href;
    let url = new URL(url_string);

    // let music = url.searchParams.get("lrc");
    // let type = url.searchParams.get("type");
    let ID = url.searchParams.get("id");

    return ID;

    // return [music, type, musicID];
}