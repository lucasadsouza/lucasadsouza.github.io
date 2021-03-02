export const Cookies = {
    accept: () => {
        localStorage.setItem('cookies-allow', JSON.stringify('true'));
    },

    show: () => {
        const cookiesState = JSON.parse(localStorage.getItem('cookies-allow'))
        let cookiesMessage = document.getElementById("cookies-box");

        if (cookiesState !== 'true') {
            cookiesMessage.style.display = 'flex';

        } else {
            cookiesMessage.style.display = 'none';
        };
    }
}
