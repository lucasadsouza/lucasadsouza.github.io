export function getCurrentTime () {
    let currentTime = 0;
    if (window.player && window.player.getCurrentTime) {
        currentTime = parseFloat(window.player.getCurrentTime());
    };

    return currentTime;
}
