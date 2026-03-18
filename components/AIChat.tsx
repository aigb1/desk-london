
import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, Send, X, Bot, Sparkles } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

const AIChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState<{role: 'user' | 'bot', text: string}[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleAsk = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    const userMsg = query;
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setQuery('');
    setIsTyping(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `The user is looking for a desk in London. Here is their query: "${userMsg}". 
        Help them find the best neighborhood or vibe. Be helpful, concise, and professional. 
        Current London neighborhoods available: Soho, Shoreditch, Canary Wharf, Farringdon, Southbank, Marylebone.`,
        config: {
          systemInstruction: "You are the desk.london AI assistant. You help people find the perfect workspace. Use 'Hospitality-Minimalism' tone.",
        }
      });

      setMessages(prev => [...prev, { role: 'bot', text: response.text || "I'm sorry, I couldn't process that. Try asking about a specific neighborhood!" }]);
    } catch (err) {
      setMessages(prev => [...prev, { role: 'bot', text: "Connection error. Please try again." }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <>
      {/* Trigger Bubble */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-20 right-4 md:bottom-8 md:right-8 z-[70] w-14 h-14 bg-[#2D2D2D] text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all group"
      >
        {isOpen ? <X /> : <Sparkles className="group-hover:rotate-12 transition-transform" />}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-36 right-4 md:bottom-24 md:right-8 z-[70] w-[calc(100vw-2rem)] md:w-96 h-[500px] bg-white rounded-3xl shadow-2xl border border-gray-100 flex flex-col overflow-hidden animate-in slide-in-from-bottom-4 duration-300">
          <div className="p-4 bg-[#E1E8E0] border-b border-gray-200/50 flex items-center gap-3">
            <div className="w-10 h-10 bg-[#2D2D2D] rounded-full flex items-center justify-center">
              <Bot size={20} className="text-white" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-[#2D2D2D]">desk.london AI</h4>
              <p className="text-[10px] text-gray-500 font-medium">Online • Ask me anything</p>
            </div>
          </div>

          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#FCFAFA]">
            {messages.length === 0 && (
              <div className="text-center py-8">
                <p className="text-sm text-gray-400">Try asking: "Where is a quiet place in Soho?"</p>
              </div>
            )}
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                  msg.role === 'user' 
                  ? 'bg-[#2D2D2D] text-white rounded-tr-none' 
                  : 'bg-white border border-gray-100 text-[#2D2D2D] rounded-tl-none shadow-sm'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white border border-gray-100 p-3 rounded-2xl rounded-tl-none animate-pulse">
                  <div className="flex gap-1">
                    <div className="w-1.5 h-1.5 bg-gray-300 rounded-full" />
                    <div className="w-1.5 h-1.5 bg-gray-300 rounded-full" />
                    <div className="w-1.5 h-1.5 bg-gray-300 rounded-full" />
                  </div>
                </div>
              </div>
            )}
          </div>

          <form onSubmit={handleAsk} className="p-4 bg-white border-t border-gray-100 flex gap-2">
            <input 
              type="text" 
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Type your search..."
              className="flex-1 bg-gray-50 rounded-full px-4 py-2 text-sm outline-none focus:ring-1 focus:ring-[#2D2D2D]/20"
            />
            <button type="submit" className="w-10 h-10 bg-[#2D2D2D] text-white rounded-full flex items-center justify-center hover:bg-black transition-colors">
              <Send size={18} />
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default AIChat;
