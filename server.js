const express = require('express');
const session = require('express-session');
const mysql = require('mysql2');
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');

const app = express();

// Middleware do obsługi POST requestów
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Serwowanie plików statycznych (HTML)
app.use(express.static('public'));

// Konfiguracja sesji
app.use(session({
    secret: 'mysecret',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }  // secure: true dla HTTPS
}));

// Konfiguracja połączenia z bazą danych MySQL
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'login_system'
});

db.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL');
});

// Rejestracja użytkownika
app.post('/register', (req, res) => {
    const { username, password } = req.body;

    bcrypt.hash(password, 10, (err, hash) => {
        if (err) throw err;

        const sql = 'INSERT INTO users (username, password) VALUES (?, ?)';
        db.query(sql, [username, hash], (err, result) => {
            if (err) throw err;
            res.redirect('/login.html'); // Po rejestracji przekierowujemy do logowania
        });
    });
});

// Logowanie użytkownika
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    const sql = 'SELECT * FROM users WHERE username = ?';
    db.query(sql, [username], (err, result) => {
        if (err) throw err;

        if (result.length === 0) {
            return res.status(400).send('User not found');
        }

        const user = result[0];

        bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) throw err;

            if (isMatch) {
                req.session.user = { id: user.id, username: user.username };
                res.redirect('/dashboard');
            } else {
                res.status(400).send('Incorrect password');
            }
        });
    });
});

// Middleware sprawdzający, czy użytkownik jest zalogowany
const isAuthenticated = (req, res, next) => {
    if (req.session.user) {
        next();
    } else {
        res.redirect('/login.html'); // Przekierowanie na stronę logowania, jeśli niezalogowany
    }
};

// Ochroniona trasa (dashboard)
app.get('/dashboard', isAuthenticated, (req, res) => {
    res.send(`<h1>Welcome ${req.session.user.username}, you are logged in!</h1>
              <a href="/logout">Logout</a>`);
});

// Wylogowanie użytkownika
app.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.status(500).send('Error during logout');
        }
        res.redirect('/login.html');
    });
});

// Serwer startuje na porcie 3000
app.listen(3000, () => {
    console.log('Server running on port 3000');
});
