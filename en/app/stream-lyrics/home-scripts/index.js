import { Service } from '../Modules/services.js';
import { Banner } from '../Components/Banner/banner.js';
import { Carousel } from '../Components/Carousel/carousel.js';
import { Cookies } from '../Components/Cookies/cookies.js';
import { firebaseConfig } from '../Modules/firebase-config.js';
import { Search } from '../Modules/search.js';


const dataUrl = './data/data.json';

const url = './play.html';

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

    let banner = new Banner(data, url);
    let search = new Search(data, url);

    data[1].views += 10;

    window.scrollMusic = (element, direction) => {
        mostPopCarousel.scroll(element, direction);
        popCarousel.scroll(element, direction);
        japaneseCarousel.scroll(element, direction);
    }

    window.changeBanner = (change) => banner.slideShow(change);

    window.listenButton = () => banner.listenButton();

    Cookies.show();
    search.find();

    window.acceptCookies = () => {
        Cookies.accept();
        Cookies.show();
    }

    window.selectSearch = (query) => search.select(query);

    setInterval(() => banner.slideShow(), 10000);
}) ();
