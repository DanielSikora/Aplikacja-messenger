// Importujemy wymagane moduły
const express = require('express');
const cors = require('cors');

// Tworzymy instancję aplikacji Express
const app = express();

// Middleware do obsługi JSON i CORS
app.use(express.json()); // Automatyczne parsowanie JSON w żądaniach
app.use(cors()); // Zezwolenie na zapytania z innych domen

// Prosta baza danych w pamięci serwera
let users = []; // Lista użytkowników, którzy się zalogowali
let messages = []; // Lista wiadomości w czacie

// Endpoint do logowania użytkownika
// Użytkownik podaje swoje imię, które jest zapisywane w pamięci serwera
app.post('/login', (req, res) => {
    const { name } = req.body; // Oczekujemy, że klient wyśle obiekt { name: "imię" }

    if (!name) {
        // Sprawdzamy, czy imię zostało podane
        return res.status(400).send({ error: 'Imię jest wymagane' });
    }

    // Dodajemy imię do listy użytkowników
    users.push(name);

    // Wysyłamy odpowiedź z potwierdzeniem logowania
    res.status(200).send({ message: 'Zalogowano pomyślnie', name });
});

// Endpoint do wysyłania wiadomości
// Użytkownik wysyła swoje imię i treść wiadomości
app.post('/messages', (req, res) => {
    const { name, message } = req.body; // Oczekujemy obiektu { name: "imię", message: "treść wiadomości" }

    if (!name || !message) {
        // Sprawdzamy, czy imię i treść wiadomości zostały podane
        return res.status(400).send({ error: 'Imię i treść wiadomości są wymagane' });
    }

    // Tworzymy nową wiadomość z datą wysłania
    const newMessage = { name, message, timestamp: new Date() };

    // Dodajemy wiadomość do listy wiadomości
    messages.push(newMessage);

    // Wysyłamy odpowiedź z dodaną wiadomością
    res.status(200).send(newMessage);
});

// Endpoint do pobierania wszystkich wiadomości
// Klient pobiera listę wszystkich wiadomości z czatu
app.get('/messages', (req, res) => {
    res.status(200).send(messages); // Wysyłamy listę wiadomości jako odpowiedź
});

// Endpoint do usuwania wiadomości
// Użytkownik może usunąć wiadomość, jeśli jego imię zgadza się z nadawcą wiadomości
app.delete('/messages', (req, res) => {
    const { name, timestamp } = req.body;
    console.log('Otrzymano żądanie usunięcia:', { name, timestamp });

    if (!name || !timestamp) {
        return res.status(400).send({ error: 'Imię i znacznik czasu są wymagane' });
    }

    const initialLength = messages.length;

    // Porównujemy timestamp jako stringi ISO
    messages = messages.filter(
        msg => !(msg.name === name && new Date(msg.timestamp).toISOString() === timestamp)
    );

    console.log('Pozostałe wiadomości:', messages);

    if (messages.length === initialLength) {
        return res.status(404).send({ error: 'Nie znaleziono wiadomości lub brak autoryzacji' });
    }

    res.status(200).send({ message: 'Wiadomość została pomyślnie usunięta' });
});

// Uruchomienie serwera
const PORT = 3000; // Ustawiamy port, na którym będzie działał serwer
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Serwer działa na http://localhost:${PORT}`); // Informujemy, że serwer działa
});
