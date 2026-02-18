import { useState } from 'react';

const API_URL = '/api';

export default function GuestbookForm({ onEntryAdded }) {
    const [name, setName] = useState('');
    const [message, setMessage] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!name.trim() || !message.trim()) return;

        setSubmitting(true);
        setError('');

        try {
            const res = await fetch(`${API_URL}/guestbook`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: name.trim(), message: message.trim() }),
            });

            if (!res.ok) throw new Error('Failed to add entry');

            setName('');
            setMessage('');
            if (onEntryAdded) onEntryAdded();
        } catch (err) {
            setError(err.message);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="form-card">
            <h2>✍️ Sign the Guestbook</h2>

            {error && <div className="error-message">{error}</div>}

            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                        id="name"
                        type="text"
                        placeholder="Your name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="message">Message</label>
                    <textarea
                        id="message"
                        placeholder="Leave a message..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        required
                    />
                </div>

                <button className="submit-btn" type="submit" disabled={submitting}>
                    {submitting ? 'Posting...' : 'Post Entry'}
                </button>
            </form>
        </div>
    );
}
