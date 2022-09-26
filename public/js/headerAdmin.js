window.addEventListener ('load', () => {

    let barsMenu = document.querySelector ('.i-bars-menu');

    barsMenu.addEventListener ('click', (e) => {
        let optionsMenu = document.querySelector ('.nav-options-user');
        optionsMenu.style.display = 'block';
    })
})