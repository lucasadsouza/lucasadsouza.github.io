console.log('start\n');

function jsonHandler(action, cookieName, item=false) {
    let result;
    if (action === 'put' && item !== false) {
        result = JSON.stringify(item);
        localStorage.setItem(cookieName, result);

    } else if (action === 'get') {
        result = JSON.parse(localStorage.getItem(cookieName));

    } else if (action === 'get-json') {
        console.log(item);
        result = JSON.parse(item);
    }

    return result;
}

function getMusicsData () {
    fetch(`../data.json`).then((response) => {
        if (response.ok) {
            return response.json();
        }

    }).then(data => {
        jsonHandler('put', 'current-data', data);

    }).catch((error) => {
        console.error(error);
    });
}

getMusicsData();
var data = jsonHandler('get', 'current-data').data;

bannerCounter = 0;

function changeBanner (change="plus") {
    let banner = document.getElementsByClassName("banner-carousel")[0];
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
}
//file:///C:/Users/paula%20caroline/Desktop/Projetos/Programa%C3%A7%C3%A3o/Html%20Css%20e%20JS/varlasouza.github.io-master/stream-lyrics/index.html
function listenNow () {
    window.location.href = `https://varlasouza.github.io/en/app/stream-lyrics/play?lrc=${data[bannerCounter].id}&type=alphabet&id=${data[bannerCounter].video_id}`;
}

function scrollMusic (element, direction) {
    if (direction === "right") {
        document.getElementsByClassName("music-items")[element].scrollLeft += 302;

    } else {
        document.getElementsByClassName("music-items")[element].scrollLeft -= 302;
    }
}

function isOverflown(element) {
    if (element.scrollHeight > element.clientHeight) {
        return true;

    } else {
        return false;
    }
}

function showVideoMenu() {
    let musicsTumb = JSON.parse(JSON.stringify(data));

    musicsTumb = musicsTumb.map((current) => {
        if (current.title.length >= 24) {
            current.title = `${current.title.slice(0, 24)}...`;
        }

        if (current.singer.length >= 31) {
            current.singer = `${current.singer.slice(0, 31)}...`;
        }

        return current;
    });

    musicsTumb = musicsTumb.sort((a, b) => {
        return a.views - b.views;
    }).reverse();

    let bestOfPop = musicsTumb.filter((current) => {
        return current.genre.indexOf('Pop') !== -1;
    });

    let madeInJapan = musicsTumb.filter((current) => {
        return current.genre.indexOf('Japanese') !== -1;
    });

    musicsTumb = [musicsTumb, bestOfPop, madeInJapan];

    for (let i = 0; i < musicsTumb.length; i++) {
        let elementosDiv = [];
        let elementosDivNew = "";

        for (let index = 0; index < musicsTumb[i].length && index < 20; index++) {
            elementosDiv.push(`<div class="item">
                <a href="https://varlasouza.github.io/en/app/stream-lyrics/play?lrc=${musicsTumb[i][index].id}&type=alphabet&id=${musicsTumb[i][index].video_id}">
                    <img src="${musicsTumb[i][index].banner}" alt="">

                    <div>
                        <h3>${musicsTumb[i][index].title}</h3>
                        <p>${musicsTumb[i][index].singer}</p>
                    </div>
                </a>
            </div>`);
        };

        for (let index = 0; index < elementosDiv.length; index++) {
            elementosDivNew = elementosDivNew + elementosDiv[index];
        };

        document.getElementsByClassName("music-items")[i].innerHTML = elementosDivNew;
        // if (33 * 2 + 302 * musicsTumb[i].length < screen.width) {
        //     document.getElementsByClassName(`hide${i}`)[0].style.display = "none";
        //     document.getElementsByClassName(`hide${i}`)[1].style.display = "none";
        // }
    }
}

let showMenu = true;
if (showMenu === true) {
    showVideoMenu();

    showMenu = false;
}

setInterval(changeBanner, 10000);