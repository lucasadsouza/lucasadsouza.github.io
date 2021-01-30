export function carousel(data, index, link) {
    let itemsTumb = JSON.parse(JSON.stringify(data));
    let carouselItems = document.getElementsByClassName('carousel-items')[index];
    const carouselImg = carouselItems.children[0].children[0].children[0];
    let carouselItemString = '';

    itemsTumb = itemsTumb.map((current) => {
        if (carouselImg.getAttribute('orientation') === 'portrait' && current.title.length >= 18) {
            current.title = `${current.title.slice(0, 18).trim()}...`;

        } else if (current.title.length >= 24) {
            current.title = `${current.title.slice(0, 24).trim()}...`;
        }

        if (carouselImg.getAttribute('orientation') === 'portrait' && current.singer.length >= 19) {
            current.singer = `${current.singer.slice(0, 19).trim()}...`;

        } else if (current.singer.length >= 31) {
            current.singer = `${current.singer.slice(0, 31).trim()}...`;
        }

        return current;
    });

    itemsTumb.map((current) => {
        carouselItemString += carouselItems.innerHTML;

        carouselItemString = carouselItemString.replace('@link', `${link}${current.id}&type=alphabet&id=${current.video_id}`);
        carouselItemString = carouselItemString.replace('img/default.png', current.banner);
        carouselItemString = carouselItemString.replace('@title', current.title);
        carouselItemString = carouselItemString.replace('@subtitle', current.singer);
    });

    carouselItems.innerHTML = carouselItemString;
}


export function scrollCarousel (element, direction) {
    if (direction === "right") {
        document.getElementsByClassName("carousel-items")[element].scrollLeft += 302;

    } else {
        document.getElementsByClassName("carousel-items")[element].scrollLeft -= 302;
    }
}
