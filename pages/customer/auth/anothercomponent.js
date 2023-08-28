// AnotherComponent.js
import React from 'react';
import Home from '../pages/index'; // Adjust the path based on your project structure

const AnotherComponent = () => {
  // Your component code here
  return (
    <div>
      <h2>This is another component</h2>
      <Home /> {/* Use the Home component here */}
    </div>
  );
};

export default AnotherComponent;
