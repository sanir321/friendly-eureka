import React, { useState } from 'react';
import SplashScreen from './components/SplashScreen';
import KeyVerification from './components/KeyVerification';
import ChatInterface from './components/ChatInterface'; // Will create this next

function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [keyVerified, setKeyVerified] = useState(false);

  const handleSplashFinish = () => {
    setShowSplash(false);
  };

  const handleKeyVerified = () => {
    setKeyVerified(true);
  };

  return (
    <div className="App">
      {showSplash ? (
        <SplashScreen onFinish={handleSplashFinish} />
      ) : keyVerified ? (
        <ChatInterface />
      ) : (
        <KeyVerification onKeyVerified={handleKeyVerified} />
      )}
    </div>
  );
}

export default App;