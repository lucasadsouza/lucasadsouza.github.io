export function footerStyle () {
    if (document.getElementsByClassName('footer-yellow')[0] !== undefined) {
        document.documentElement.style.setProperty('--footer-background-color', '#fe9e27');
        document.documentElement.style.setProperty('--footer-text-hover', '#b9731d');
    }
}
