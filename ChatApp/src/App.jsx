// Importujemy wymagane moduły
import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importujemy styl Bootstrap
import Login from './components/Login'; // Importujemy komponent logowania
import ChatRoom from './components/ChatRoom'; // Importujemy komponent pokoju czatu

const ChatApp = () => {
  // Stany aplikacji
  const [name, setName] = useState(''); // Imię użytkownika
  const [message, setMessage] = useState(''); // Treść wiadomości
  const [messages, setMessages] = useState([]); // Lista wszystkich wiadomości
  const [loggedIn, setLoggedIn] = useState(false); // Status logowania użytkownika

  // Funkcja obsługująca logowanie użytkownika
  const handleLogin = () => {
    fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name }), // Przesyłamy imię użytkownika do serwera
    })
      .then(response => {
        if (response.ok) {
          setLoggedIn(true); // Ustawiamy status logowania na true, jeśli się powiodło
        } else {
          alert('Logowanie się nie powiodło.'); // Wyświetlamy komunikat w przypadku błędu
        }
      })
      .catch(error => console.error('Error:', error)); // Logujemy błędy
  };

  // Funkcja obsługująca wysyłanie wiadomości
  const sendMessage = () => {
    fetch('http://localhost:3000/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, message }), // Przesyłamy imię i wiadomość do serwera
    })
      .then(response => {
        if (response.ok) {
          setMessage(''); // Czyszczymy pole wiadomości po pomyślnym wysłaniu
          fetchMessages(); // Pobieramy zaktualizowaną listę wiadomości
        } else {
          alert('Błąd w wysyłaniu wiadomości.'); // Wyświetlamy komunikat w przypadku błędu
        }
      })
      .catch(error => console.error('Error:', error)); // Logujemy błędy
  };

  // Funkcja obsługująca usuwanie wiadomości
  const deleteMessage = (timestamp) => {
    console.log('Deleting message:', { name, timestamp }); // Logujemy dane wiadomości do usunięcia
    fetch('http://localhost:3000/messages', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, timestamp }), // Przesyłamy imię i znacznik czasu do serwera
    })
      .then(response => {
        if (response.ok) {
          fetchMessages(); // Pobieramy zaktualizowaną listę wiadomości po usunięciu
        } else {
          response.json().then(error => alert(error.error)); // Wyświetlamy komunikat błędu
        }
      })
      .catch(error => console.error('Error:', error)); // Logujemy błędy
  };
  
  // Funkcja pobierająca listę wiadomości
  const fetchMessages = () => {
    fetch('http://localhost:3000/messages')
      .then(response => response.json())
      .then(data => setMessages(data)) // Ustawiamy stan z pobranymi wiadomościami
      .catch(error => console.error('Error:', error)); // Logujemy błędy
  };

  // Hook efektu - pobieranie wiadomości co sekundę
  useEffect(() => {
    const interval = setInterval(fetchMessages, 1000); // Ustawiamy odświeżanie wiadomości co 1 sekundę
    return () => clearInterval(interval); // Czyścimy interval po odmontowaniu komponentu
  }, []);

  // Renderowanie komponentów
  return (
    <div className="container mt-5">
      {!loggedIn ? (
        <Login name={name} setName={setName} handleLogin={handleLogin} /> // Wyświetlamy formularz logowania, jeśli użytkownik nie jest zalogowany
      ) : (
        <ChatRoom
          name={name} // Przekazujemy imię użytkownika
          message={message} // Przekazujemy treść wiadomości
          setMessage={setMessage} // Funkcja do ustawiania treści wiadomości
          messages={messages} // Przekazujemy listę wiadomości
          sendMessage={sendMessage} // Funkcja do wysyłania wiadomości
          deleteMessage={deleteMessage} // Funkcja do usuwania wiadomości
        />
      )}
    </div>
  );
};

export default ChatApp;
