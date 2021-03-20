export class Banner {
    constructor (data, URL) {
        this.data = data;
        this.URL = URL;
    }

    _counter = 0;

    slideShow (change="plus") {
        let banner = document.getElementsByClassName("banner")[0];
        let title = document.getElementsByClassName("banner-title")[0];
        let singer = document.getElementsByClassName("banner-singer")[0];
        let genre = document.getElementsByClassName("music-tags")[0];

        let tags = "";
        let tagMaxNumber = 4;

        if (change === "plus") {
            this._counter++;

            if (this._counter === 3) {this._counter = 0}

        } else {
            this._counter--;

            if (this._counter === -1) {this._counter = 2}
        }

        banner.style.backgroundImage = `url("${this.data[this._counter].banner}")`;

        if (this.data[this._counter].banner_bottom_position === true) {
            banner.style.backgroundPosition = 'bottom';

        } else {
            banner.style.backgroundPosition = 'center';
        }

        title.innerHTML = `<h2>${this.data[this._counter].title}</h2>`;
        singer.innerHTML = `<p>${this.data[this._counter].singer}</p>`;

        if (screen.width <= 414 && this.data[this._counter].genre.join('').length > 28) {tagMaxNumber = 3}

        for (let i = 0; i < tagMaxNumber; i++) {tags += `<li class="tag-item">${this.data[this._counter].genre[i].toUpperCase()}</li>`}

        genre.innerHTML = tags;
    }

    listenButton () {
        window.location.href = `${this.URL}?id=${this.data[this._counter].query}`;
    }
}
