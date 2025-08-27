import React, { useState } from 'react';
import { motion } from 'framer-motion';
import logo from '../assets/logo.png'; // Adjust path as needed

const VALID_KEYS = [
  'TRAD-48293',
  'BULL-17540',
  'BEAR-93215',
  'PIPS-60487',
  'RISK-21859',
  'GAIN-75601',
  'FOREX-34982',
  'FXAI-59013',
  'CHRT-84726',
  'SIGN-12054',
  'WAVE-69823',
  'STOP-43170',
  'TARG-87209',
  'CASH-26358',
  'MOON-91547',
  'SELL-50682',
  'BUYX-78410',
  'MARK-32965',
  'SWNG-65124',
  'PLAN-40739'
]; // Replace with actual keys

const KeyVerification = ({ onKeyVerified }) => {
  const [keyInput, setKeyInput] = useState('');
  const [error, setError] = useState('');

  const handleVerify = () => {
    if (VALID_KEYS.includes(keyInput)) {
      onKeyVerified();
    } else {
      setError('Invalid Key. Please try again.');
    }
  };

  const handleTelegramLink = () => {
    window.open('https://t.me/yourAIFX9I', '_blank'); // Replace with actual Telegram link
  };

  return (
    <motion.div
      className="key-verification-screen flex flex-col items-center justify-center h-screen bg-gray-900 text-white p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Logo */}
      <motion.img
        src={logo}
        alt="AI-Tools-FX Logo"
        className="w-24 h-24 mb-8"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      />

      {/* Title */}
      <h2 className="text-2xl font-bold mb-6">Enter Your Access Key</h2>

      {/* Input field */}
      <motion.input
        type="text"
        className="w-full max-w-sm mx-auto px-4 py-3 mb-4 rounded-full bg-gray-800 border border-gray-700 text-white placeholder-gray-400 
                   focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-md transition"
        placeholder="Your Access Key"
        value={keyInput}
        onChange={(e) => setKeyInput(e.target.value)}
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.3 }}
      />

      {/* Error Message */}
      {error && <p className="text-red-500 mb-4">{error}</p>}

      {/* Continue Button */}
      <motion.button
        className="w-full max-w-sm mx-auto bg-blue-600 hover:bg-blue-700 
                   text-white font-bold py-3 px-4 rounded-full shadow-md 
                   focus:outline-none focus:ring-2 focus:ring-blue-400 transition-transform transform hover:scale-105"
        onClick={handleVerify}
        whileTap={{ scale: 0.95 }}
      >
        Continue
      </motion.button>

      {/* Telegram link */}
      <p className="mt-4 text-sm">
        Don't have a key?{' '}
        <span
          className="text-blue-500 font-medium cursor-pointer hover:text-blue-400 hover:underline"
          onClick={handleTelegramLink}
        >
          Get one here
        </span>
      </p>

      {/* Warning */}
      <p className="text-yellow-500 text-xs mt-2 text-center">
        ⚠️ Sharing your key may lead to key disablement.
      </p>
    </motion.div>
  );
};

export default KeyVerification;
