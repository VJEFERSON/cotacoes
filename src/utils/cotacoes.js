const request = require('request')
const apiAcessKey = '7289c3273b6763ee3713839862b51a67';
const symbolPadraoExemplo = 'MSFT';
module.exports.cotacao = (symbolCotacao, callback) => {
    const symbol = symbolCotacao ? symbolCotacao.toUpperCase() : symbolPadraoExemplo;
    const url = `http://api.marketstack.com/v1/eod?access_key=${apiAcessKey}&symbols=${symbol}`;

    request.get({ url, json: true }, (err, response) => {
        if (err) {
            callback({ code: 500, message: `Something went wrong: ${error}` }, undefined);
        }
        else if (response.body.data === undefined) {
            callback({ code: 404, message: `No data found!` }, undefined);
        } else if (response.body.data.length > 0) {
            const parsedResponde = response.body.data[0];
            const { symbol, open, high, low, close } = parsedResponde;
            callback(undefined, { symbol, open, high, low, close });
        } else {
            callback({ code: 404, message: 'Sem cotações para o simbolo de ativo informado!' }, undefined);
        }
    });
}