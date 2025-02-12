
import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import Login from './components/Login'; 
import ChatRoom from './components/ChatRoom';

const ChatApp = () => {
 
  const [name, setName] = useState(''); 
  const [message, setMessage] = useState(''); 
  const [messages, setMessages] = useState([]); 
  const [loggedIn, setLoggedIn] = useState(false); 

  
  const handleLogin = () => {
    fetch('http://localhost:3000/login', {// http://192.168.100.102:3000/login
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name }), 
    })
      .then(response => {
        if (response.ok) {
          setLoggedIn(true); 
        } else {
          alert('Logowanie się nie powiodło.');
        }
      })
      .catch(error => console.error('Error:', error));
  };
  const sendMessage = () => {
    fetch('http://localhost:3000/messages', { http://192.168.100.102:3000/login
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, message }),
    })
      .then(response => {
        if (response.ok) {
          setMessage('');
          fetchMessages();
        } else {
          alert('Błąd w wysyłaniu wiadomości.');
        }
      })
      .catch(error => console.error('Error:', error));
  };

  
  const deleteMessage = (timestamp) => {
    console.log('Deleting message:', { name, timestamp });
    fetch('http://localhost:3000/messages', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, timestamp }),
    })
      .then(response => {
        if (response.ok) {
          fetchMessages();
        } else {
          response.json().then(error => alert(error.error));
        }
      })
      .catch(error => console.error('Error:', error));
  };
  
 
  const fetchMessages = () => {
    fetch('http://localhost:3000/messages')
      .then(response => response.json())
      .then(data => setMessages(data)) 
      .catch(error => console.error('Error:', error)); 
  };


  useEffect(() => {
    const interval = setInterval(fetchMessages, 1000);
    return () => clearInterval(interval); 
  }, []);

  
  return (
    <div className="container mt-5">
      {!loggedIn ? (
        <Login name={name} setName={setName} handleLogin={handleLogin} />
      ) : (
        <ChatRoom
          name={name}
          message={message}
          setMessage={setMessage}
          messages={messages}
          sendMessage={sendMessage}
          deleteMessage={deleteMessage}
        />
      )}
    </div>
  );
};

export default ChatApp;
