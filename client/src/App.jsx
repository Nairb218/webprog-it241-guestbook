import { useState } from 'react';
import GuestbookForm from './components/GuestbookForm';
import GuestbookList from './components/GuestbookList';
import './App.css';

function App() {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleEntryAdded = () => {
    setRefreshKey((prev) => prev + 1);
  };

  return (
    <>
      <header className="app-header">
        <h1>Nairb's Guestbook</h1>
        <p>World would appreciate your kind words</p>
      </header>

      <GuestbookForm onEntryAdded={handleEntryAdded} />
      <GuestbookList refreshKey={refreshKey} />
    </>
  );
}

export default App;
