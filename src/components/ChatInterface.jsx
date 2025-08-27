import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { Send, Image } from 'lucide-react';

const ChatInterface = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const chatContainerRef = useRef(null);

  // Initialize Gemini API (replace with your actual API key)
  const API_KEY = 'AIzaSyCDou57ZM8wiiqIXPgW0aie9iN8ALnmvnw'; 
  const genAI = new GoogleGenerativeAI(API_KEY);

  useEffect(() => {
    // Scroll to bottom on new message
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = async () => {
    if (input.trim() === '') return;

    const newMessage = { text: input, sender: 'user', type: 'text' };
    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setInput('');
    setLoading(true);

    const lowerCaseInput = input.trim().toLowerCase();

    if (lowerCaseInput === 'who are you' || lowerCaseInput === 'what are you about') {
      setMessages((prevMessages) => [...prevMessages, { text: 'I am a trained model by Grecko.', sender: 'ai', type: 'text' }]);
      setLoading(false);
      return;
    }

    try {
      const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
      const result = await model.generateContent(input);
      const response = await result.response;
      const text = response.text();

      setMessages((prevMessages) => [...prevMessages, { text, sender: 'ai', type: 'text' }]);
    } catch (error) {
      console.error('Error sending message to Gemini API:', error);
      setMessages((prevMessages) => [...prevMessages, { text: 'Error: Could not get a response.', sender: 'ai', type: 'text' }]);
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (e) => {
      const base64Image = e.target.result.split(',')[1];
      const newMessage = { text: 'Image uploaded.', sender: 'user', type: 'image', imageUrl: e.target.result };
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      setLoading(true);

      try {
        const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
        const image = {
          inlineData: {
            data: base64Image,
            mimeType: file.type,
          },
        };
        const result = await model.generateContent([
          'Analyze this trading chart screenshot and provide a structured trading signal.\n' +
          'Follow this exact format:\n\n' +
          '📊 Trading Signal Report\n' +
          '———————————————\n' +
          '🔔 Signal: [BUY / SELL / HOLD]\n' +
          '💰 Entry Price: [X]\n' +
          '🛑 Stop Loss: [X]\n' +
          '🎯 Target Price: [X]\n' +
          '⏳ Duration: [X]\n' +
          '📈 Win Rate: [X%]\n' +
          '⚖️ Risk/Reward Ratio: [X:Y]\n\n' +
          '📝 Reasoning:\n' +
          '[Short explanation of the analysis behind the signal]',
          image
        ]);
        const response = await result.response;
        const text = response.text();
        try {
          const signalData = JSON.parse(text);
          setMessages((prevMessages) => [...prevMessages, { data: signalData, sender: 'ai', type: 'trading_signal' }]);
        } catch (parseError) {
          console.warn('Could not parse Gemini response as JSON, displaying as plain text:', parseError);
          setMessages((prevMessages) => [...prevMessages, { text, sender: 'ai', type: 'text' }]);
        }
      } catch (error) {
        console.error('Error analyzing image with Gemini Vision API:', error);
        setMessages((prevMessages) => [...prevMessages, { text: 'Error: Could not analyze image.', sender: 'ai', type: 'text' }]);
      } finally {
        setLoading(false);
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="chat-interface flex flex-col h-screen bg-gray-900 text-white">
      {messages.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="flex-grow flex flex-row items-center justify-start text-center"
        >
          <div className="flex w-full h-screen">
            <div className="w-1/2 flex items-center justify-center">
              <img src="/respond.gif" alt="Loading GIF" className="max-w-full h-auto" />
            </div>
            <div className="w-1/2 flex items-center justify-center">
              <p className="text-gray-400 text-lg">hii trader lets trade 👋</p>
            </div>
          </div>
        </motion.div>
      )}

      <div ref={chatContainerRef} className="flex-grow p-4 overflow-y-auto">
        <AnimatePresence>
          {messages.map((msg, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className={`flex mb-4 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs lg:max-w-md p-3 rounded-lg ${msg.sender === 'user' ? 'bg-blue-600' : 'bg-gray-700'}`}
              >
                {msg.type === 'text' && <p className="whitespace-pre-wrap">{msg.text}</p>}
                {msg.type === 'image' && (
                  <img src={msg.imageUrl} alt="Uploaded Chart" className="max-w-full h-auto max-h-64 object-contain rounded-md" />
                )}
                {msg.type === 'trading_signal' && (
                  <div className="trading-signal-card p-4 bg-gray-800 rounded-lg shadow-lg">
                    <h3 className="text-lg font-bold mb-2 text-blue-400">📊 Trading Signal Report</h3>
                    <hr className="border-gray-600 mb-2" />
                    <p className="mb-1"><span className="font-semibold text-green-400">🔔 Signal:</span> {msg.data.signal}</p>
                    <p className="mb-1"><span className="font-semibold text-yellow-400">💰 Entry Price:</span> {msg.data.entry_price}</p>
                    <p className="mb-1"><span className="font-semibold text-red-400">🛑 Stop Loss:</span> {msg.data.stop_loss}</p>
                    <p className="mb-1"><span className="font-semibold text-purple-400">🎯 Target Price:</span> {msg.data.target_price}</p>
                    <p className="mb-1"><span className="font-semibold text-orange-400">⏳ Duration:</span> {msg.data.duration}</p>
                    <p className="mb-1"><span className="font-semibold text-cyan-400">📈 Win Rate:</span> {msg.data.win_rate}</p>
                    <p className="mb-1"><span className="font-semibold text-pink-400">⚖️ Risk/Reward Ratio:</span> {msg.data.risk_reward_ratio}</p>
                    <h4 className="font-semibold mt-3 mb-1 text-gray-300">📝 Reasoning:</h4>
                    <p className="text-sm text-gray-400 whitespace-pre-wrap">{msg.data.reasoning}</p>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        {loading && (
          <div className="flex justify-start mb-4">
            <div className="bg-gray-700 p-3 rounded-lg">
              <p className="text-gray-400">Typing...</p>
            </div>
          </div>
        )}
      </div>

      {/* ✅ Updated Input Bar */}
      <div className="input-bar flex justify-center items-center py-4 px-6 bg-gray-900">
        <div className="relative flex items-center w-full max-w-2xl bg-gray-800 rounded-2xl shadow-xl px-4">
          <input
            type="text"
            className="flex-grow py-3 px-4 rounded-2xl bg-gray-900 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 border-none transition duration-200 text-base"
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          />

          {/* Image Upload */}
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
            id="image-upload"
          />
          <label
            htmlFor="image-upload"
            className="p-2 text-gray-300 cursor-pointer hover:bg-gray-700 rounded-full transition mx-1"
          >
            <Image size={20} />
          </label>

          {/* Send Button */}
          <button
            onClick={handleSendMessage}
            className="p-2 bg-blue-600 rounded-full hover:bg-blue-700 transition mx-1"
          >
            <Send size={20} className="text-white" />
          </button>
        </div>
      </div>

      <div className="text-center text-gray-500 text-xs pb-2">
        I am not 100% accurate.
      </div>
    </div>
  );
};

export default ChatInterface;
