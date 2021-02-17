        import { getMusicData, jsonHandler } from './data_handler.js';
        import { banner, listenNow } from '../Components/Banner/banner.js';
        import { Carousel } from '../Components/Carousel/carousel.js';


        const url = 'https://varlasouza.github.io/en/app/stream-lyrics/play?lrc=';
        let bannerCounter = 0;

        getMusicData();
        const data = jsonHandler('get', 'current-data').data;

        let mostPopCarousel = new Carousel(data, 0, url);
        let popCarousel = new Carousel(data, 1, url);
        let japaneseCarousel = new Carousel(data, 2, url);

        mostPopCarousel.create();
        popCarousel.create('Pop');
        japaneseCarousel.create('Japanese');

        window.changeBanner = (change) => bannerCounter = banner(bannerCounter, data, change);

        window.listenButton = () => listenNow(data);

        window.scrollMusic = (element, direction) => {
            mostPopCarousel.scroll(element, direction);
            popCarousel.scroll(element, direction);
            japaneseCarousel.scroll(element, direction);
        }

        setInterval(() => bannerCounter = banner(bannerCounter, data), 10000);