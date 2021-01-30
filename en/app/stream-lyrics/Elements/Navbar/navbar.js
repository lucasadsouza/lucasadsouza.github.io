export function navbarStyle () {
    if (document.getElementsByClassName('navbar-black')[0] !== undefined) {
        document.documentElement.style.setProperty('--navbar-background-color', '#000000');

        document.documentElement.style.setProperty('--navbar-text-color', '#f5f9fc');

        if (document.getElementsByClassName('navbar-yellow')[0] !== undefined) {
            document.documentElement.style.setProperty('--navbar-text-hover', '#fe9e27');
        
        } else {
            document.documentElement.style.setProperty('--navbar-text-hover', '#4682ba');
        }

    } else if (document.getElementsByClassName('navbar-yellow')[0] !== undefined) {
        document.documentElement.style.setProperty('--navbar-text-hover', '#fe9e27');
    
    }
}