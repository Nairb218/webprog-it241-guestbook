import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'

// Automatically switches between localhost and Vercel URL
const API_URL = import.meta.env.PROD 
  ? '/api/guestbook' 
  : 'http://localhost:3000/guestbook';

function App() {
  const [messages, setMessages] = useState([]);
  const [name, setName] = useState("");
  const [msg, setMsg] = useState("");

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const res = await axios.get(API_URL);
      setMessages(res.data);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !msg) return alert("Please fill in both fields");
    try {
      await axios.post(API_URL, { name, message: msg });
      setName("");
      setMsg("");
      fetchMessages();
    } catch (error) {
      console.error("Error posting message:", error);
    }
  };

  return (
    <div className="container" style={{ padding: '20px' }}>
      <h1>Guestbook</h1>
      <div style={{ marginBottom: '20px' }}>
        <input 
          placeholder="Name" 
          value={name} 
          onChange={e => setName(e.target.value)} 
          style={{ display: 'block', marginBottom: '10px' }} 
        />
        <textarea 
          placeholder="Message" 
          value={msg} 
          onChange={e => setMsg(e.target.value)} 
          style={{ display: 'block', marginBottom: '10px' }} 
        />
        <button onClick={handleSubmit}>Sign Guestbook</button>
      </div>

      <div>
        {messages.map(m => (
          <div key={m.id} style={{ borderBottom: '1px solid #ccc', padding: '10px 0' }}>
            <strong>{m.name}:</strong> {m.message}
          </div>
        ))}
      </div>
    </div>
  )
}

export default App