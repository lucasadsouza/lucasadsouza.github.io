function windowSizer () {
    let windowHeight = window.innerHeight;
    let windowWidth = window.innerWidth;

    if (windowWidth <= 600) {
        //It checks whether the variables are equivalent or not the 16:9 ratio and tries to adjust them until they are.
        while (Number((windowWidth / windowHeight).toFixed(2)) !== 1.78) {
            if (windowHeight < windowWidth / 1.5 && windowWidth / windowHeight < 1.78) {
                windowHeight -= 1;

            } else if (windowWidth / windowHeight > 1.78){
                windowHeight += 10;

            } else {
                windowHeight -= 100;
            }
        }

    } else {
        //On medium screens it just applies a simple division.
        windowWidth /= 2;
        windowHeight /= 1.5;
    }

    if (windowWidth > 768) {
        //On large screens it just applies a simple division.
        windowWidth = windowWidth / 2;
    };

    return [windowHeight, windowWidth];
}


function lyricData(lyric) {
    const lyricArtist = lyric[0].replace("[ar: ", "").replace("]", "");
    const lyricAlbum = lyric[1].replace("[al: ", "").replace("]", "");
    const lyricTitle = lyric[2].replace("[ti: ", "").replace("]", "");
    const lyricAutor = lyric[3].replace("[au: ", "").replace("]", "");
    const lyricBy = lyric[4].replace("[by: ", "").replace("]", "");
    const lyricVideoID = lyric[5].replace("[vi: ", "").replace("]", "");

    return {
        artist: lyricArtist,
        album: lyricAlbum,
        title: lyricTitle,
        autor: lyricAutor,
        by: lyricBy,
        videoID: lyricVideoID
        };
}


function processTimeAndData(lyric, lyricAllData) {
    let lyricTiming = [];
    let lyricLines = [];

    for (let index = 6; index < lyric.length; index++) {
        let timeInSeconds = lyric[index].replace("[", "").split("]")[0];
        timeInSeconds = Number(timeInSeconds.split(":")[0]) * 60 + Number(timeInSeconds.split(":")[1]);

        lyricTiming.push(Number(timeInSeconds.toFixed(2)) - 0.5);
        lyricLines.push(lyric[index].split("]")[1]);
    };

    lyricTiming.push(Number(((lyricTiming[lyricTiming.length - 1]) + 8).toFixed(2)));
    lyricLines.push("&#160");
    lyricTiming.push(Number(((lyricTiming[lyricTiming.length - 1]) + 120).toFixed(2)));
    lyricLines.push("&#160");
    lyricTiming.push(Number(((lyricTiming[lyricTiming.length - 1]) + 1).toFixed(2)));
    lyricLines.push("&#160");

    lyricAllData.timing = lyricTiming;
    lyricAllData.lines = lyricLines;

    return lyricAllData;
}


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


function lyricProcessing(lyric) {
    let lyricAllData = lyricData(lyric);
    lyricAllData = processTimeAndData(lyric, lyricAllData);

    return lyricAllData;
}


function getUrlParams () {
    let url_string = window.location.href;
    let url = new URL(url_string);

    let music = url.searchParams.get("lrc");
    let type = url.searchParams.get("type");
    let musicID = url.searchParams.get("id");

    return [music, type, musicID];
}


function getMusicLyric (music) {
    fetch(`https://varlasouza.github.io/en/app/stream-lyrics/play/${music}.txt`).then((response) => {
        if (response.ok) {
            return response.text();
        }

    }).then(lrc => {
        lrc = lrc.split("\n");
        let lyrics = lyricProcessing(lrc);

        jsonHandler('put', 'current-lyric', lyrics);

    }).catch((error) => {
        console.error(error);
    });
}


function getMusicsData () {
    fetch(`https://varlasouza.github.io/en/app/stream-lyrics/play/lyrics-data.json`).then((response) => {
        if (response.ok) {
            return response.json();
        }

    }).then(data => {
        for (let key in data) {
            let dataLog = data[key].split("\n");
            let lyricsData = lyricData(dataLog);

            data[key] = lyricsData;
        }

        jsonHandler('put', 'current-data', data);

    }).catch((error) => {
        console.error(error);
    });
}

function getVideoCurrentTime () {
    let videoCurrentTime = 0;
    if (player && player.getCurrentTime) {
        videoCurrentTime = parseFloat(player.getCurrentTime());
    };

    return videoCurrentTime;
}


function showLyricLines(lyric, index) {
    document.getElementById("lyrics-firstline").innerHTML = `<h3>${lyric.lines[index]}<\h3>`.toLowerCase().replace(lyric.title.toLowerCase().trim(), `<spam style="color: #583b8a;">${lyric.title.toLowerCase().trim()}</spam>`);
    document.getElementById("lyrics-secondline").innerHTML = `<h4>${lyric.lines[index + 1]}<\h4>`;
    document.getElementById("lyrics-thirdline").innerHTML = `<h5>${lyric.lines[index + 2]}<\h5>`;
}


function showLyricInfo(lyric) {
    document.getElementById("about-title").innerHTML = `<h6>${lyric.title}</h6>`;
    document.getElementById("about-artist").innerHTML = `<p>Artista(s): ${lyric.artist}</p>`;
    document.getElementById("about-album").innerHTML = `<p>Album: ${lyric.album}</p>`;
    document.getElementById("about-autor").innerHTML = `<p>Compositor(es): ${lyric.autor}</p>`;
}


function controlLyricsDisplay () {
    videoCurrentTime = getVideoCurrentTime();
    var lyric = jsonHandler('get', 'current-lyric');

    if (videoCurrentTime < videoDuration && Number(videoCurrentTime.toFixed(2)) >= lyric.timing[index]) {
        showLyricLines(lyric, index);
        index++;

        if ((Number(videoCurrentTime.toFixed(2)) - lyric.timing[index]) > 180) {
            index += 30;

        } else if ((Number(videoCurrentTime.toFixed(2)) - lyric.timing[index]) > 60) {
            index += 10;

        } else if ((Number(videoCurrentTime.toFixed(2)) - lyric.timing[index]) > 30) {
            index += 5;
        };

    } else {
        index--;

        if ((lyric.timing[index] - Number(videoCurrentTime.toFixed(2))) > 180) {
            index -= 30;

        } else if ((lyric.timing[index] - Number(videoCurrentTime.toFixed(2))) > 60) {
            index -= 10;

        } else if ((lyric.timing[index] - Number(videoCurrentTime.toFixed(2))) > 30) {
            index -= 5;
        }
    }
    let data = jsonHandler('get', 'current-data');
    showLyricInfo(lyric);
}


function changeMusic(musicName) {
    let data = jsonHandler('get', 'current-data');
    let urlParams = data[musicName];

    window.location.href = `https://varlasouza.github.io/stream-lyrics?lrc=${musicName}&type=alphabet&id=${urlParams.videoID}`;
}


function acceptCookies () {
    jsonHandler('put', 'cookies-accepted', 'true');

    removeCookiesMsg();
}


function removeCookiesMsg () {
    let cookiesState = jsonHandler('get', 'cookies-accepted');
    let cookiesMessage = document.getElementById("cookies-box");

    if (cookiesState === 'true') {
        cookiesMessage.parentNode.removeChild(cookiesMessage);
    };
}

var videoDuration = 0;
var videoCurrentTime = 0;
var interval = null;
var index = 0;

let windowSize = windowSizer();
var urlParams = getUrlParams();

getMusicLyric(urlParams[0]);
getMusicsData();


var tag = document.createElement('script');
var firstScriptTag = document.getElementsByTagName('script')[0];
tag.src = "https://www.youtube.com/iframe_api";
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);


var player;
function onYouTubeIframeAPIReady () {
    player = new YT.Player('player', {
        height: windowSize[0],
        width: windowSize[1],

        videoId: urlParams[2],

        playerVars: {
            rel: 0,
            showinfo: 0,
            fs: 0
        },

        events: {
        'onReady': onPlayerReady
        }
    });
};


function onPlayerReady (event) {
    removeCookiesMsg();
    videoDuration = parseInt(player.getDuration());
    interval = setInterval(controlLyricsDisplay, 500);
    
    event.target.playVideo();
}