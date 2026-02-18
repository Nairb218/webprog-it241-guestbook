import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'

// Works in both dev (proxied) and production (same origin)
const API_URL = '/api/guestbook';

function App() {
  const [messages, setMessages] = useState([]);
  const [name, setName] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      setLoading(true);
      const res = await axios.get(API_URL);
      setMessages(res.data);
    } catch (error) {
      console.error("Error fetching messages:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !msg.trim()) return alert("Please fill in both fields");
    try {
      await axios.post(API_URL, { name: name.trim(), message: msg.trim() });
      setName("");
      setMsg("");
      fetchMessages();
    } catch (error) {
      console.error("Error posting message:", error);
    }
  };

  return (
    <div className="app">
      <header className="header">
        <h1>📖 Guestbook</h1>
        <p className="subtitle">Leave a message for everyone to see!</p>
      </header>

      <form className="form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Your Name</label>
          <input
            id="name"
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={e => setName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            placeholder="Write your message here..."
            value={msg}
            onChange={e => setMsg(e.target.value)}
            rows={3}
          />
        </div>
        <button type="submit" className="btn-submit">
          ✍️ Sign Guestbook
        </button>
      </form>

      <section className="messages">
        <h2>Messages ({messages.length})</h2>
        {loading ? (
          <p className="loading">Loading messages...</p>
        ) : messages.length === 0 ? (
          <p className="empty">No messages yet. Be the first to sign!</p>
        ) : (
          messages.map(m => (
            <div key={m.id} className="message-card">
              <div className="message-header">
                <strong className="message-name">{m.name}</strong>
                <span className="message-date">
                  {new Date(m.created_at).toLocaleDateString('en-US', {
                    year: 'numeric', month: 'short', day: 'numeric',
                    hour: '2-digit', minute: '2-digit'
                  })}
                </span>
              </div>
              <p className="message-text">{m.message}</p>
            </div>
          ))
        )}
      </section>
    </div>
  )
}

export default App