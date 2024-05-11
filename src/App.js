import React, { useState } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "./App.css"; // Importar estilos CSS personalizados

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD9lJQ2kDo5ek8AaDzee7uLvoUknxIbxNU",
  authDomain: "autenticationfirebasereact.firebaseapp.com",
  projectId: "autenticationfirebasereact",
  storageBucket: "autenticationfirebasereact.appspot.com",
  messagingSenderId: "401218704741",
  appId: "1:401218704741:web:15610df2f2ba7a0dd8fd8c",
  measurementId: "G-7X53LLK8C5",
};

// Inicializar o Firebase se ainda não estiver inicializado
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  const handleLogin = async () => {
    try {
      const userCredential = await firebase
        .auth()
        .signInWithEmailAndPassword(email, password);
      setError(null);
      setUser(userCredential.user);
    } catch (err) {
      setError(err.message);
      setUser(null);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const provider = new firebase.auth.GoogleAuthProvider();
      const userCredential = await firebase.auth().signInWithPopup(provider);
      setError(null);
      setUser(userCredential.user);
    } catch (err) {
      setError(err.message);
      setUser(null);
    }
  };

  const handleLogout = async () => {
    try {
      await firebase.auth().signOut();
      setUser(null);
      setEmail('');
      setPassword('');
    } catch (err) {
      console.error('Erro ao fazer logout:', err);
    }
  };

  return (
    <div className="container">
      <h1 className="title">Firebase Log-In</h1>
      {!user ? (
        <div>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleLogin}>Login</button>
          <button onClick={handleGoogleLogin}>Login with Google</button>
        </div>
      ) : (
        <div className="user-info">
          <h2>Olá! 👋</h2>
          <p>Sou Luiz Victorino, um profissional em transição de carreira para a área de tecnologia, atualmente trabalhando como Encarregado de Logística na SATO Brasil. Sou Bacharel em Administração de Empresas e também em conclusão do curso Técnico em Desenvolvimento de Sistemas. Estou participando do Bootcamp Santander 2024 - Fundamentos de IA para Devs. Meu interesse pela tecnologia foi despertado enquanto aprendia Excel VBA e desde então estou sempre em busca de aprender e explorar novas soluções para problemas.</p>
          {/* <p>Nome: {user.displayName || "Não fornecido"}</p>
          <p>Email: {user.email}</p>
          <p>ID do Usuário: {user.uid}</p> */}
          <button onClick={handleLogout}>LogOut</button>
        </div>
      )}
      {error && <p className="error">{error}</p>}
    </div>
  );
}

export default App;
