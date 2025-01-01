import React from 'react';

// Komponent odpowiedzialny za logowanie użytkownika
const Login = ({ name, setName, handleLogin }) => (
  <div className="card p-4">
    <h3>Login</h3>
    <div className="mb-3">
      {/* Pole tekstowe do wprowadzania imienia */}
      <input
        type="text"
        className="form-control"
        placeholder="Podaj swoje imię."
        value={name} // Wartość pola powiązana ze stanem "name"
        onChange={(e) => setName(e.target.value)} // Aktualizacja stanu "name" przy zmianie
      />
    </div>
    {/* Przycisk do logowania */}
    <button className="btn btn-primary" onClick={handleLogin}>
      Login
    </button>
  </div>
);

export default Login;
