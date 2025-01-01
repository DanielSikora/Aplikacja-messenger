import React from 'react';

// Komponent odpowiedzialny za pokój czatu
const ChatRoom = ({ name, messages, message, setMessage, sendMessage, deleteMessage }) => (
  <div className="card p-4">
    <h3>Chat Room</h3>
    {/* Sekcja wyświetlająca wiadomości */}
    <div className="chat-box mb-3" style={{ height: '300px', overflowY: 'scroll' }}>
      {messages.map((msg, index) => (
        <div key={index} className="d-flex justify-content-between align-items-center mb-2">
          <div>
            {/* Wyświetlanie wiadomości */}
            <strong>{msg.name}:</strong> {msg.message} <span className="text-muted">({new Date(msg.timestamp).toLocaleTimeString()})</span>
          </div>
          {msg.name === name && (
            // Przycisk do usuwania wiadomości widoczny tylko dla autora wiadomości
            <button
              className="btn btn-sm btn-danger"
              onClick={() => deleteMessage(msg.timestamp)}
            >
              Usuń
            </button>
          )}
        </div>
      ))}
    </div>
    {/* Sekcja wprowadzania wiadomości */}
    <div className="mb-3">
      <input
        type="text"
        className="form-control"
        placeholder="Type a message"
        value={message} // Wartość pola wiadomości
        onChange={(e) => setMessage(e.target.value)} // Aktualizacja stanu wiadomości
      />
    </div>
    {/* Przycisk wysyłania wiadomości */}
    <button className="btn btn-success" onClick={sendMessage}>
      Wyślij
    </button>
  </div>
);

export default ChatRoom;
