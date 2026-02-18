import { useState, useEffect } from 'react';

const API_URL = '/api';

export default function GuestbookList({ refreshKey }) {
    const [entries, setEntries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const fetchEntries = async () => {
        setLoading(true);
        setError('');
        try {
            const res = await fetch(`${API_URL}/guestbook`);
            if (!res.ok) throw new Error('Failed to load entries');
            const data = await res.json();
            setEntries(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchEntries();
    }, [refreshKey]);

    const formatDate = (dateStr) => {
        return new Date(dateStr).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    if (loading) {
        return (
            <div className="loading">
                <div className="spinner" />
                <p>Wait loading...</p>
            </div>
        );
    }

    if (error) {
        return <div className="error-message">{error}</div>;
    }

    return (
        <div>
            <div className="entries-header">
                <h2>📖 Guestbook Entries</h2>
                <span className="entry-count">{entries.length} entries</span>
            </div>

            {entries.length === 0 ? (
                <div className="empty-state">
                    <div className="icon">📝</div>
                    <p>No entries yet. Be the first to sign!</p>
                </div>
            ) : (
                entries.map((entry) => (
                    <div className="entry-card" key={entry.id}>
                        <div className="entry-name">{entry.name}</div>
                        <div className="entry-message">{entry.message}</div>
                        <div className="entry-date">{formatDate(entry.created_at)}</div>
                    </div>
                ))
            )}
        </div>
    );
}
