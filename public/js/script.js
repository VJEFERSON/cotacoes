console.log('javascripot loaded');

const cotacoesForm = document.querySelector('form');
const mainMessage = document.querySelector('h3');
const openValue = document.querySelector('#open');
const closeValue = document.querySelector('#close');
const lowValue = document.querySelector('#low');
const highValue = document.querySelector('#high');


cotacoesForm.addEventListener('submit', (event) => {
    mainMessage.innerText = 'BUSCANDO ...'
    event.preventDefault();
    const symbol = document.querySelector('input').value;
    console.log(symbol);
    fetch(`/cotacoes?ativo=${symbol}`).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                mainMessage.innerText = `Algo deu errado! Erro ${data.error.code}: ${data.error.message}`;
                console.log(`Algo deu errado! Erro ${data.error.code}: ${data.error.message}`);
            } else if (data.symbol) {
                mainMessage.innerText = symbol;
                highValue.innerText = `HIGH R$ ${data.high}`;
                lowValue.innerText = `LOW R$ ${data.low}`;
                closeValue.innerText = `CLOSE R$ ${data.close}`;
                openValue.innerText = `OPEN R$ ${data.close}`;
            }
        });
    });
});