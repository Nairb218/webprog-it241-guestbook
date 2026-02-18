import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [posts, setPosts] = useState<any[]>([]);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');

  const API = '/api/guestbook';

  const fetchPosts = async () => {
    const res = await axios.get(API);
    setPosts(res.data);
  };

  const submitPost = async (e: any) => {
    e.preventDefault();
    await axios.post(API, { name, message });
    setName('');
    setMessage('');
    fetchPosts();
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div style={{ maxWidth: '600px', margin: 'auto' }}>
      <h1>Guestbook</h1>

      <form onSubmit={submitPost}>
        <input
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <textarea
          placeholder="Your message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        />
        <button type="submit">Submit</button>
      </form>

      <hr />

      {posts.map((post) => (
        <div key={post.id}>
          <h3>{post.name}</h3>
          <p>{post.message}</p>
          <small>{new Date(post.created_at).toLocaleString()}</small>
        </div>
      ))}
    </div>
  );
}

export default App;