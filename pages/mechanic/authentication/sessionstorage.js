import React from 'react';

export default function SessionStorage() {
  const handleSetSessionData = () => {
    sessionStorage.setItem('email', 'john_doe');
  };

  const handleGetSessionData = () => {
    const session = sessionStorage.getItem('email');
    console.log('session:', session);
  };

  const handleClearSessionData = () => {
    sessionStorage.clear();
    console.log('Session data cleared');
  };

  return (
    <div>
      <button onClick={handleSetSessionData}>Set Session Data</button>
      <button onClick={handleGetSessionData}>Get Session Data</button>
      <button onClick={handleClearSessionData}>Clear Session Data</button>
    </div>
  );
}

