import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import logo from '../assets/logo.png'; // Adjust path as needed

const SplashScreen = ({ onFinish }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onFinish();
    }, 3000); // 3 seconds
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <motion.div
      className="splash-screen flex flex-col items-center justify-center h-screen bg-gray-900 text-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.5 }}
    >
      <motion.img
        src={logo}
        alt="AI-Tools-FX Logo"
        className="w-32 h-32 mb-4"
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
      />
      <motion.h1
        className="text-4xl font-bold"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
      >
        AI-Tools-FX 1.00
      </motion.h1>
    </motion.div>
  );
};

export default SplashScreen;