import React, { useState } from 'react';
import { MessageSquare, Sparkles, ArrowDownUp, LogOut } from 'lucide-react';
import { encodeMessage, decodeMessage } from '../utils/emojiCipher';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function EmojiConverter() {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleConvert = () => {
    if (mode === 'encode') {
      setOutputText(encodeMessage(inputText));
    } else {
      setOutputText(decodeMessage(inputText));
    }
  };

  const toggleMode = () => {
    setMode(mode === 'encode' ? 'decode' : 'encode');
    setInputText('');
    setOutputText('');
  };

  const handleLogout = async () => {
    await logout();
    navigate('/signin');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-2xl">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
            <Sparkles className="w-8 h-8 text-purple-500" />
            Emoji Cipher
          </h1>
          <div className="flex items-center gap-4">
            <button
              onClick={toggleMode}
              className="flex items-center gap-2 px-4 py-2 bg-purple-100 text-purple-600 rounded-lg hover:bg-purple-200 transition-colors"
            >
              <ArrowDownUp className="w-4 h-4" />
              Switch to {mode === 'encode' ? 'Decode' : 'Encode'}
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>

        {user && (
          <div className="mb-6 bg-purple-50 p-3 rounded-lg">
            <p className="text-purple-700">
              Welcome, <span className="font-semibold">{user.name}</span>!
            </p>
          </div>
        )}

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {mode === 'encode' ? 'Enter Text' : 'Enter Emoji'}
            </label>
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="w-full h-32 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder={mode === 'encode' ? 'Type your message here...' : 'Paste emoji message here...'}
            />
          </div>

          <button
            onClick={handleConvert}
            className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-center gap-2"
          >
            <MessageSquare className="w-5 h-5" />
            {mode === 'encode' ? 'Convert to Emoji' : 'Decode Message'}
          </button>

          {outputText && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {mode === 'encode' ? 'Emoji Message' : 'Decoded Text'}
              </label>
              <div className="w-full min-h-32 p-4 bg-gray-50 border border-gray-300 rounded-lg break-words">
                {outputText}
              </div>
            </div>
          )}

          <div className="mt-8 text-sm text-gray-600">
            <h2 className="font-semibold mb-2">How it works:</h2>
            <p>
              This converter uses a homomorphic-inspired algorithm that maintains the property 
              where concatenating encoded messages is equivalent to encoding concatenated messages. 
              Each character is mapped to a unique emoji, making the conversion reversible while 
              preserving message structure.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmojiConverter;