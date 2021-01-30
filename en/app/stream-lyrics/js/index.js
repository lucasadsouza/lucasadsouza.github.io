        import { getMusicData, jsonHandler } from './data_handler.js';
        import { banner, listenNow } from '../Elements/Banner/banner.js';
        import { carousel, scrollCarousel } from '../Elements/Carousel/carousel.js';
        import { popular, filterTag } from './process_music.js';

        getMusicData();
        var data = jsonHandler('get', 'current-data').data;

        let bannerCounter = 0;
        window.changeBanner = (change) => {
            bannerCounter = banner(bannerCounter, data, change);
        }

        window.listenButton = () => {
            listenNow(data);
        }

        window.scrollMusic = (element, direction) => {
            scrollCarousel(element, direction);
        }

        let showMenu = true;
        if (showMenu === true) {
            const popularList = popular(data);
            const popList = filterTag(data, 'Pop');
            const japaneseList = filterTag(data, 'Japanese');

            carousel(popularList, 0, 'https://varlasouza.github.io/en/app/stream-lyrics/play?lrc=');
            carousel(popList, 1, 'https://varlasouza.github.io/en/app/stream-lyrics/play?lrc=');
            carousel(japaneseList, 2, 'https://varlasouza.github.io/en/app/stream-lyrics/play?lrc=');

            showMenu = false;
        }

        setInterval(() => {
            bannerCounter = banner(bannerCounter, data);
        }, 10000);