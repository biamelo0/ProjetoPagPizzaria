export function carregarComponente(id,url) {
    fetch(url)
    .then(responde => responde.text())
    .then(data => {
        document.getElementById(id).innerHTML = data;
    })
    .catch(error => console.error('Erro ao carregar o componente ${url}: ', error))
}

carregarComponente('navbar', '/componentes/navbar.html');
carregarComponente('cards', '/componentes/cards.html');