import { getUrlParams } from './Modules/get-url-param.js';
import { Lyric } from './Modules/Lyric.js';
import { getCurrentTime } from './Modules/get-current-time.js';
import { Service } from '../Modules/services.js';
import { Cookies } from '../Components/Cookies/cookies.js';
import { Carousel } from '../Components/Carousel/carousel.js';
import { firebaseConfig } from '../Modules/firebase-config.js';
import { Search } from '../Modules/search.js';


const dataUrl = 'https://varlasouza.github.io/en/app/stream-lyrics/data/data.json';
const lrcUrl = 'https://varlasouza.github.io/en/app/stream-lyrics/data/lrc.json';

const url = 'https://varlasouza.github.io/en/app/stream-lyrics/play.html';


firebase.initializeApp(firebaseConfig);


(async function () {
    let data = (await Service.get(dataUrl)).data;
    const dataLrc = (await Service.get(lrcUrl)).data;
    let dataViews;

    const ID = getUrlParams();

    const dataIdx = (data.findIndex((current) => current.query === ID));
    const lrcIdx = (dataLrc.findIndex((current) => current.query === ID));

    const lyric = new Lyric(data[dataIdx], dataLrc[lrcIdx]);

    await firebase.database().ref().child(`views/${lyric.query}/views`).once('value', (snapshot) => {
        dataViews = snapshot.val();
    });
    await firebase.database().ref().child('views').once('value', (snapshot) => {
        const tempViews = snapshot.val();
        data.map((current) => {
            data[current.id].views = tempViews[current.query].views;
        });
    });

    lyric.views = dataViews;
    lyric.showInfo();
    lyric.showViews();
    window.video_id = lyric.video_id;

    Cookies.show();

    let mostPopCarousel = new Carousel(data, 0, url, lyric.query);
    mostPopCarousel.create();

    let search = new Search(data, url);
    search.find();

    window.scrollMusic = (element, direction) => mostPopCarousel.scroll(element, direction);

    window.acceptCookies = () => {
        Cookies.accept();
        Cookies.show();
    }

    window.onPlayerReady = (event) => {
        setInterval(() => {
            lyric.ctrlDisplay(getCurrentTime(), window.player.getDuration());

            if (lyric.views > dataViews) {
                firebase.database().ref().child(`views/${lyric.query}`).set({
                    views: lyric.views
                });
            }
        }, 500);
        event.target.playVideo();
    }

    window.selectSearch = (query) => search.select(query);

    firebase.database().ref().child(`views/${lyric.query}/views`).on('value', (snapshot) => {
        dataViews = snapshot.val();
        lyric.views = dataViews;

        lyric.showViews();
    });
}) ();
