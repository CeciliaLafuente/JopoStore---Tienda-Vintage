window.addEventListener ('load', () => {

    let searchBar = document.querySelector ("search-bar");

    searchBar.addEventListener ('change', () => {
        if (searchBar.value == req.body.keyWords) {
            searchBar.placeholder = req.body.keyWords;
        } else {
            searchBar.placeholder = "¿Qué estás buscando?";
        };
    })
})
