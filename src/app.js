const path = require('path');
const express = require('express');
const hbs = require('hbs');
const cotacao = require('./utils/cotacoes');

const app = express();
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

app.use(express.static(publicDirectoryPath));


app.get('', (req, res) => {
    res.render('index', {
        title: 'Bem Vindo ao Cotações Analitics',
        author: 'Valdeci J. P. R'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        author: 'Valdeci J. P. R',
        message: 'Help', routes: [
            { name: '', description: 'Raiz!' },
            { name: '/help', description: 'Help listing you routes!' },
            { name: '/about', description: 'Version Application!' }
        ]
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Cotações Analitics',
        author: 'Valdeci J. P. R',
        version: 'Version 1.0.0!'
    });
});

app.get('/cotacoes', (req, res) => {
    if (req.query.ativo) {
        cotacao.cotacao(req.query.ativo, (error, cotacao) => {
            if (error) {
                res.status(error.code).json({ error: error });
            } else {
                res.send(cotacao);
            }
        });
    } else {
        res.status(400).json({ error: { code: 400, message: 'É necessario realizar a passagem do simbolo de ativo!' } });
    }
});


app.get('*', (req, res) => {
    res.render('404', {
        title: 'Erro 404',
        author: 'Valdeci J. P. R',
        errorMessage: 'Página não encontrada!'
    });
});

app.listen(3000, () => {
    console.log('Server is up in port 3000!');
})