export class Lyric {
    constructor (data, lrc) {
        this.id = data.id;
        this.query = data.query;
        this.title = data.title;
        this.singer = data.singer;
        this.album = data.album;
        this.author = data.author;
        this.by = data.by;
        this.genre = data.genre;
        this.video_id = data.video_id;
        this.banner = data.banner;
        this.banner_bottom_position = data.banner_bottom_position;

        this.timing = lrc.timing;
        this.lines = lrc.lines;

        this.views = 0;

        this.index = 0;
        this.viewsUpdated = false;
    }

    showInfo () {
        document.getElementById("about-title").innerHTML = `${this.title}`;
        document.getElementById("about-singer").innerHTML = `Artist(s): ${this.singer}`;
        document.getElementById("about-album").innerHTML = `Album: ${this.album}`;
        document.getElementById("about-author").innerHTML = `Author(s): ${this.author}`;
        document.getElementById("about-by").innerHTML = `Sincronized by: ${this.by}`;
    }

    showLines (index) {
        document.getElementById("lyrics-firstline").innerHTML = `<h3>${this.lines[index]}<\h3>`.toLowerCase();
        document.getElementById("lyrics-secondline").innerHTML = `<h4>${this.lines[index + 1]}<\h4>`;
        document.getElementById("lyrics-thirdline").innerHTML = `<h5>${this.lines[index + 2]}<\h5>`;
    }

    showViews () {
        let viewsText = 'views';
        if (this.views === 1) {
            viewsText = 'view';
        }

        document.getElementById("lrc-views").innerHTML = `${this.views} ${viewsText}`;
    }

    ctrlDisplay (videoCurrentTime, videoDuration) {
        if (videoCurrentTime < videoDuration && Number(videoCurrentTime.toFixed(2)) >= this.timing[this.index]) {
            this.showLines(this.index);
            this.index++;

            if ((Number(videoCurrentTime.toFixed(2)) - this.timing[this.index]) > 180) {
                this.index += 30;

            } else if ((Number(videoCurrentTime.toFixed(2)) - this.timing[this.index]) > 60) {
                this.index += 10;

            } else if ((Number(videoCurrentTime.toFixed(2)) - this.timing[this.index]) > 30) {
                this.index += 5;
            };

        } else {
            this.index--;

            if ((this.timing[this.index] - Number(videoCurrentTime.toFixed(2))) > 180) {
                this.index -= 30;

            } else if ((this.timing[this.index] - Number(videoCurrentTime.toFixed(2))) > 60) {
                this.index -= 10;

            } else if ((this.timing[this.index] - Number(videoCurrentTime.toFixed(2))) > 30) {
                this.index -= 5;
            }
        }

        if (this.viewsUpdated === false && videoCurrentTime >= videoDuration / 4) {
            this.views += 1;
            this.viewsUpdated = true;
        }
    }
}