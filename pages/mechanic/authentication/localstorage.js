import React from 'react';

export default function LocalStorage() {
  const handleSetSessionData = () => {
    localStorage.setItem('username', 'john_doe');
  };

  const handleGetSessionData = () => {
    const username = localStorage.getItem('username');
    console.log('Username:', username);
  };

  const handleClearSessionData = () => {
    localStorage.clear();
    console.log('Session data cleared');
  };

  function setLocalStorageWithExpiry(key, value, expiry) {
    const now = new Date();
    const item = {
      value: value,
      expiry: now.getTime() + expiry,
    };
    localStorage.setItem(key, JSON.stringify(item));
  }

  return (
    <div>
      <button onClick={handleSetSessionData}>Set Session Data</button>
      <button onClick={handleGetSessionData}>Get Session Data</button>
      <button onClick={handleClearSessionData}>Clear Session Data</button>
    </div>
  );
}

