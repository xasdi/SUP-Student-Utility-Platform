const express = require('express');
const session = require('express-session');
const mysql = require('mysql2');
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const app = express();

// Middleware do obsługi POST requestów
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());
// Konfiguracja sesji
app.use(session({
    secret: 'mysecret',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }  // secure: true dla HTTPS
}));

app.post('/doesuserexist', (req, res) => {
    const usernametocheck = req.body.usernametocheck;
    if (usernametocheck == ''){
        const goodlength = false
        res.json({ goodlength })
    }if(usernametocheck !== ''){
        const sql = 'SELECT * FROM users WHERE username = ?';
    db.query(sql, [usernametocheck], (err, result) => {
        if (err) throw err;

        // Check if user exists
        const exists = result.length > 0;
        const goodlength = true
        res.json({ exists, goodlength });
    });
    }
    
});

// Rejestracja użytkownika
app.post('/register', (req, res) => {
    const { username, password } = req.body; //zdefiniuj 2 zmienne i ustaw ich wartości na dane przekazane w pliku json
    
    const sql = 'SELECT * FROM users WHERE username = ?';
    db.query(sql, [username], (err, result) => {
        if (err) throw err;

        // Check if user exists
        const exists = result.length > 0;
        if(exists){
            res.send('Użytkownik już istnieje cwelu')
          }else if(exists == false){
            bcrypt.hash(password, 10, (err, hash) => {
                if (err) throw err;
                
                const sql = 'INSERT INTO users (username, password) VALUES (?, ?)';
                db.query(sql, [username, hash], (err, result) => {
                    if (err) throw err;
                    res.redirect('/login.html'); // Po rejestracji przekierowujemy do logowania
                });
            });
        } 
    });
      
});

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
                res.redirect('/dashboard.html');
            } else {
                res.status(400).send('Incorrect password');
            }
        });
    });
});



// Middleware sprawdzający, czy użytkownik jest zalogowany, rzeczy nie wymagające zalogowania dawać nad ^ a te wymagające logowania pod v
const isAuthenticated = (req, res, next) => {
   
    if (req.session.user) {
        next();
    } else {
       
        res.redirect('/login.html'); // Przekierowanie na stronę logowania, jeśli niezalogowany
    }
};

// Serwowanie plików statycznych (HTML)
app.use(express.static('public'));
app.use(isAuthenticated, express.static('logedin'));

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

// Wylogowanie użytkownika
app.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.status(500).send('Error during logout');
        }
        res.redirect('/login.html');
    });
});

// Konfiguracja multer do przesyłania plików
const upload = multer({ dest: 'uploads/' }); // Pliki będą tymczasowo zapisywane w katalogu 'uploads/'

// Upload pliku i zapis do bazy danych
app.post('/upload', isAuthenticated, upload.single('file'), (req, res) => {
    
    const file = req.file;
    const owner = req.session.user.username;

    // Odczyt pliku z systemu plików
    const fileData = fs.readFileSync(file.path);

    // Zapytanie do bazy danych, które zapisze plik jako BLOB
    const sql = 'INSERT INTO files (filename, file_data, file_owner) VALUES (?, ?, ?)';
    db.query(sql, [file.originalname, fileData, owner], (err, result) => {
        if (err) throw err;

        // Usunięcie pliku z katalogu 'uploads' po zapisaniu go w bazie
        fs.unlinkSync(file.path);

        res.redirect('/upload.html')
    });
});



app.get('/getfiles', isAuthenticated, (req, res) => {
    const fileowner = req.session.user.username;
    const sql = 'SELECT id, filename FROM files WHERE file_owner = ?';
    db.query(sql, [fileowner], (err, result) => {
        if (err) throw err;

        if (result.length === 0) {
            return res.status(404).send('No files found');
        }

       
        res.json(result);
        
    });
})

// Pobieranie pliku z bazy danych
app.get('/download/:id', isAuthenticated, (req, res) => {
    const fileId = req.params.id;

    // Pobranie pliku z bazy danych
    const sql = 'SELECT filename, file_data FROM files WHERE id = ?';
    db.query(sql, [fileId], (err, result) => {
        if (err) throw err;

        if (result.length === 0) {
            return res.status(404).send('File not found');
        }

        const file = result[0];

        // Ustawienie nagłówków i wysłanie pliku
        res.setHeader('Content-Disposition', `attachment; filename=${file.filename}`);
        res.setHeader('Content-Type', 'application/octet-stream');
        res.send(file.file_data);
    });
});

app.get('/delete/:id', isAuthenticated , (req, res) => {
    const deletefileId = req.params.id;
    const owner = req.session.user.username;

    // Pobranie pliku z bazy danych
    const sql = 'DELETE FROM files WHERE id = ? AND file_owner = ?';
    db.query(sql, [deletefileId, owner], (err, result) => {
        if (err) throw err;

        if (result.length === 0) {
            return res.status(404).send('File not found');
        }

        res.redirect('/upload.html')
        
    });
});

app.post('/doesuserexist', (req, res) => {
    const usernametocheck = req.body.usernametocheck;
    
    const sql = 'SELECT * FROM users WHERE username = ?';
    db.query(sql, [usernametocheck], (err, result) => {
        if (err) throw err;

        // Check if user exists
        const exists = result.length > 0;
        res.json({ exists });
    });
});


app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Serwer startuje na porcie 3000
app.listen(3000, () => {
    console.log('Server running on port 3000');
});
