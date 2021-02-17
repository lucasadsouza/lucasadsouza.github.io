export class Carousel {
    constructor (data, index, URL) {
        this.data = data;
        this.index = index;
        this.URL = URL;
    }

    _show = false;
    _className = 'carousel-items';
    _scrollValue = 302;

    create (sortTag='_mostPop') {
        if (this._show) {return this._show}

        let itemData = JSON.parse(JSON.stringify(this.data));

        itemData = itemData.sort((a, b) => {
            return a.views - b.views;
        }).reverse();

        if (sortTag !== '_mostPop') {
            itemData = itemData.filter((current) => {
                return current.genre.indexOf(sortTag) !== -1;
            });
        }

        let items = document.getElementsByClassName(this._className)[this.index];
        const img = items.children[0].children[0].children[0];
        let itemString = '';

        itemData = itemData.map((current) => {
            if (img.getAttribute('orientation') === 'portrait' && current.title.length >= 18) {
                current.title = `${current.title.slice(0, 18).trim()}...`;

            } else if (current.title.length >= 24) {
                current.title = `${current.title.slice(0, 24).trim()}...`;
            }

            if (img.getAttribute('orientation') === 'portrait' && current.singer.length >= 19) {
                current.singer = `${current.singer.slice(0, 19).trim()}...`;

            } else if (current.singer.length >= 31) {
                current.singer = `${current.singer.slice(0, 31).trim()}...`;
            }

            return current;
        });

        itemData.map((current) => {
            itemString += items.innerHTML;

            itemString = itemString.replace('@link', `${this.URL}${current.id}&type=alphabet&id=${current.video_id}`);
            itemString = itemString.replace('img/default.png', current.banner);
            itemString = itemString.replace('@title', current.title);
            itemString = itemString.replace('@subtitle', current.singer);
        });

        items.innerHTML = itemString;

        this._show = true;
    }

    scroll (element, direction) {
        if (element === this.index) {
            if (direction === "right") {
                document.getElementsByClassName(this._className)[element].scrollLeft += this._scrollValue;

            } else {
                document.getElementsByClassName(this._className)[element].scrollLeft -= this._scrollValue;
            }
        }
    }

}
