import { Service } from '../Modules/services.js';
import { banner, listenNow } from '../Components/Banner/banner.js';
import { Carousel } from '../Components/Carousel/carousel.js';
import { Cookies } from '../Components/Cookies/cookies.js';
import { firebaseConfig } from '../Modules/firebase-config.js';


const dataUrl = 'https://varlasouza.github.io/en/app/stream-lyrics/data/data.json';

const url = 'https://varlasouza.github.io/en/app/stream-lyrics/play.html';
let bannerCounter = 0;

firebase.initializeApp(firebaseConfig);

(async function () {
    let data = (await Service.get(dataUrl)).data;

    await firebase.database().ref().child('views').once('value', (snapshot) => {
        const tempViews = snapshot.val();
        data.map((current) => {
            data[current.id].views = tempViews[current.query].views;
        });
    });

    let mostPopCarousel = new Carousel(data, 0, url);
    let popCarousel = new Carousel(data, 1, url);
    let japaneseCarousel = new Carousel(data, 2, url);

    mostPopCarousel.create();
    popCarousel.create('pop');
    japaneseCarousel.create('japanese');

    data[1].views += 10;

    window.scrollMusic = (element, direction) => {
        mostPopCarousel.scroll(element, direction);
        popCarousel.scroll(element, direction);
        japaneseCarousel.scroll(element, direction);
    }

    window.changeBanner = (change) => bannerCounter = banner(bannerCounter, data, change);

    window.listenButton = () => listenNow(data);

    Cookies.show();

    window.acceptCookies = () => {
        Cookies.accept();
        Cookies.show();
    }

    setInterval(() => bannerCounter = banner(bannerCounter, data), 10000);
}) ();
