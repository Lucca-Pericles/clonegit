const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const path = require('path');

const app = express();
const PORT = 3000;

// Configurar body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Configurar sessão
app.use(session({
    secret: 'segredo',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Defina como true se estiver usando HTTPS
}));

// Servir arquivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Rota de registro
app.post('/register', (req, res) => {
    const { email, password } = req.body;

    // Verificação básica no servidor
    if (!email || !password) {
        return res.status(400).send('Por favor, preencha todos os campos.');
    }

    // Armazenar os dados na sessão
    req.session.user = { email, password };

    // Redirecionar para a página de exibição
    res.redirect('/display.html');
});

// Rota para enviar dados da sessão
app.get('/session-data', (req, res) => {
    if (req.session.user) {
        res.json(req.session.user);
    } else {
        res.status(400).send('Nenhuma sessão ativa.');
    }
});

// Iniciar o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
