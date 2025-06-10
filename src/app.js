const express = require('express');
const path = require('path');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
    res.render('index'); // Renderiza views/index.ejs
});

app.listen(3000, () => {cd.
    console.log('Servidor rodando em http://localhost:3000');
    console.log("Logs");
});