let bannerCounter = 0;
export function banner (bannerCounter, data, change="plus") {
    let banner = document.getElementsByClassName("banner")[0];
    let title = document.getElementsByClassName("banner-title")[0];
    let singer = document.getElementsByClassName("banner-singer")[0];
    let genre = document.getElementsByClassName("music-tags")[0];
    let tags = "";
    let tagNumber = 4;

    if (change === "plus") {
        bannerCounter++;
    
        if (bannerCounter === 3) {
            bannerCounter = 0;
        }

    } else {
        bannerCounter--;

        if (bannerCounter === -1) {
            bannerCounter = 2;
        }
    }

    banner.style.backgroundImage = `url("${data[bannerCounter].banner}")`;

    if (data[bannerCounter].banner_bottom_position === true) {
        banner.style.backgroundPosition = 'bottom';

    } else {
        banner.style.backgroundPosition = 'center';
    }

    title.innerHTML = `<h2>${data[bannerCounter].title}</h2>`;
    singer.innerHTML = `<p>${data[bannerCounter].singer}</p>`;

    if (screen.width <= 414 && data[bannerCounter].genre.join('').length > 28) {
        tagNumber = 3;
    }

    for (let i = 0; i < tagNumber; i++) {
        tags += `<li class="tag-item">${data[bannerCounter].genre[i].toUpperCase()}</li>`;
    }

    genre.innerHTML = tags;

    return bannerCounter;
}

export function listenNow (data) {
    window.location.href = `https://varlasouza.github.io/en/app/stream-lyrics/play?lrc=${data[bannerCounter].id}&type=alphabet&id=${data[bannerCounter].video_id}`;
}