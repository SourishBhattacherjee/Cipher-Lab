import React, { useState } from 'react';
import { MessageSquare, Sparkles, ArrowDownUp, Settings2 } from 'lucide-react';
import { algorithms, type EncryptionAlgorithm } from './utils/encryptionUtils';

function App() {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');
  const [selectedAlgorithm, setSelectedAlgorithm] = useState<EncryptionAlgorithm>(algorithms[0]);
  const [showAlgorithmInfo, setShowAlgorithmInfo] = useState(false);

  const handleConvert = () => {
    if (mode === 'encode') {
      setOutputText(selectedAlgorithm.encode(inputText));
    } else {
      setOutputText(selectedAlgorithm.decode(inputText));
    }
  };

  const toggleMode = () => {
    setMode(mode === 'encode' ? 'decode' : 'encode');
    setInputText('');
    setOutputText('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center p-4">
      <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-2xl p-8 w-full max-w-2xl transform transition-all duration-300 hover:shadow-3xl hover:scale-[1.02]">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 flex items-center gap-2 group">
            <Sparkles className="w-8 h-8 text-purple-500 transform transition-transform duration-300 group-hover:rotate-12" />
            Cipher Lab
          </h1>
          <div className="flex gap-2">
            <button
              onClick={() => setShowAlgorithmInfo(!showAlgorithmInfo)}
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-all duration-300 hover:shadow-md active:scale-95"
            >
              <Settings2 className="w-4 h-4" />
              Algorithm Info
            </button>
            <button
              onClick={toggleMode}
              className="flex items-center gap-2 px-4 py-2 bg-purple-100 text-purple-600 rounded-lg hover:bg-purple-200 transition-all duration-300 hover:shadow-md active:scale-95"
            >
              <ArrowDownUp className="w-4 h-4 transition-transform duration-300 hover:rotate-180" />
              Switch to {mode === 'encode' ? 'Decode' : 'Encode'}
            </button>
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Encryption Algorithm
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {algorithms.map((algo) => (
              <button
                key={algo.id}
                onClick={() => setSelectedAlgorithm(algo)}
                className={`p-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  selectedAlgorithm.id === algo.id
                    ? 'bg-purple-600 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {algo.name}
              </button>
            ))}
          </div>
        </div>

        {showAlgorithmInfo && (
          <div className="mb-6 p-4 bg-purple-50 rounded-lg animate-fadeIn">
            <h3 className="font-medium text-purple-800 mb-2">{selectedAlgorithm.name}</h3>
            <p className="text-sm text-purple-600">{selectedAlgorithm.description}</p>
          </div>
        )}

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 transition-colors duration-300 hover:text-purple-600">
              {mode === 'encode' ? 'Enter Text' : 'Enter Encoded Message'}
            </label>
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="w-full h-32 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 hover:border-purple-300 hover:shadow-md resize-none"
              placeholder={mode === 'encode' ? 'Type your message here...' : 'Paste encoded message here...'}
            />
          </div>

          <button
            onClick={handleConvert}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-lg transition-all duration-300 hover:shadow-lg hover:from-purple-700 hover:to-pink-700 active:scale-[0.98] flex items-center justify-center gap-2 group"
          >
            <MessageSquare className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
            {mode === 'encode' ? 'Encode Message' : 'Decode Message'}
          </button>

          {outputText && (
            <div className="animate-fadeIn">
              <label className="block text-sm font-medium text-gray-700 mb-2 transition-colors duration-300 hover:text-purple-600">
                {mode === 'encode' ? 'Encoded Message' : 'Decoded Text'}
              </label>
              <div className="w-full min-h-32 p-4 bg-gradient-to-br from-purple-50 to-pink-50 border border-gray-200 rounded-lg break-words transition-all duration-300 hover:shadow-md hover:border-purple-200">
                {outputText}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;