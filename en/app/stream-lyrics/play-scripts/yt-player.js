var tag = document.createElement('script');
var firstScriptTag = document.getElementsByTagName('script')[0];
tag.src = "https://www.youtube.com/iframe_api";
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

async function onYouTubeIframeAPIReady () {
    let ytInterval = setInterval(() => {
        if (window.video_id !== undefined) {
            window.player = new YT.Player('player', {
                height: '100%',
                width: '100%',

                videoId: window.video_id,

                playerVars: {
                    rel: 0,
                    showinfo: 0,
                    fs: 0,
                    origin: 'https://varlasouza.github.io'
                },

                events: {
                'onReady': window.onPlayerReady
                }
            });

            clearInterval(ytInterval);
        }
    }, 5000);
};