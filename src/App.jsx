import { useState, useEffect, useRef } from 'react';
import './App.css';
import AskAi from './AskAi.js';

function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const chatContainerRef = useRef(null);

  useEffect(() => {
    chatContainerRef.current?.scrollTo({ top: chatContainerRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages]);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { text: input, sender: 'user' };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    const response = await AskAi(input);
    setLoading(false);
    const aiMessage = { text: response, sender: 'ai' };
    setMessages((prev) => [...prev, aiMessage]);
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white p-4">
      <div className="w-full max-w-lg bg-gray-800 shadow-2xl rounded-xl p-4 flex flex-col h-[80vh] border border-gray-700">
        <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-3 flex flex-col space-y-3 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`p-3 rounded-xl text-white max-w-[75%] transition-all duration-300 shadow-lg flex flex-col ${
                msg.sender === 'user' 
                  ? 'bg-blue-500 ml-auto text-right' 
                  : 'bg-gray-700 mr-auto text-left'
              }`}
            >
              {msg.text}
            </div>
          ))}
          {loading && <div className="text-gray-400 p-3 self-start">AI is typing...</div>}
        </div>
        <form onSubmit={handleSubmit} className="flex p-2 border-t border-gray-700 bg-gray-900 rounded-b-xl">
          <input
            type="text"
            className="flex-1 p-3 border-none rounded-lg bg-gray-700 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
          />
          <button className="ml-3 bg-blue-600 hover:bg-blue-500 text-white px-5 py-3 rounded-lg transition-all duration-300 shadow-md" disabled={loading}>
            {loading ? '...' : 'Send'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;