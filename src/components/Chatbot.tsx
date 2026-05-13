import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, Send, X, Bot, User, Sparkles } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import { cn } from '../lib/utils';
import ReactMarkdown from 'react-markdown';

const SYSTEM_PROMPT = `
You are Aetherix Assistant, a high-end AI representative for Aetherix Technologies.
Aetherix is a multi-billion dollar Silicon Valley AI startup specializing in:
1. Autonomous AI Agent Development
2. Enterprise-grade Software Solutions
3. Generative AI Systems
4. Neural Workflow Automation
5. Cyber Prediction & Defense

Your tone: Professional, vision-driven, slightly futuristic, helpful, and highly intelligent.
Key person: Dr. Orion Vance (Founder).
Location: Mumbai & San Francisco.

If asked about pricing or booking, direct them to "Book a Demo" in the navigation.
Keep responses concise but premium.
`;

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'bot'; content: string }[]>([
    { role: 'bot', content: 'Connection established. How can Aetherix assist your digital evolution today?' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;

    const userMsg = input.trim();
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setInput('');
    setIsTyping(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: [
          { role: 'user', parts: [{ text: `System: ${SYSTEM_PROMPT}\nUser: ${userMsg}` }] }
        ],
      });

      const botMsg = response.text || "I apologize, our neural uplink is experiencing interference. Please try again.";
      setMessages(prev => [...prev, { role: 'bot', content: botMsg }]);
    } catch (err) {
      console.error(err);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="fixed bottom-8 right-8 z-[100]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="mb-6 w-96 max-w-[calc(100vw-2rem)] glass rounded-[2rem] border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col h-[500px]"
          >
            {/* Header */}
            <div className="p-6 bg-accent-cyan text-black flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-black/10 rounded-full flex items-center justify-center">
                  <Sparkles className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-display font-bold leading-none">Aetherix AI</h4>
                  <span className="text-[10px] font-mono uppercase tracking-widest opacity-70">Neural Interlink Active</span>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="hover:rotate-90 transition-transform">
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide">
              {messages.map((m, i) => (
                <div key={i} className={cn("flex", m.role === 'user' ? "justify-end" : "justify-start")}>
                  <div className={cn(
                    "max-w-[80%] p-4 rounded-2xl text-sm leading-relaxed",
                    m.role === 'user' ? "bg-white/10 text-white rounded-tr-none" : "bg-accent-cyan/10 text-gray-200 border border-accent-cyan/10 rounded-tl-none"
                  )}>
                    <div className="markdown-body prose prose-invert prose-sm">
                      <ReactMarkdown>
                          {m.content}
                      </ReactMarkdown>
                    </div>
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white/5 p-4 rounded-2xl rounded-tl-none flex space-x-1">
                    <div className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce" />
                    <div className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce [animation-delay:0.2s]" />
                    <div className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce [animation-delay:0.4s]" />
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="p-4 border-t border-white/5 bg-black/20">
              <div className="relative">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Inquire about Aetherix..."
                  className="w-full bg-white/5 border border-white/10 rounded-full py-4 pl-6 pr-12 text-sm outline-none focus:border-accent-cyan transition-colors"
                />
                <button 
                  onClick={handleSend}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-accent-cyan rounded-full text-black hover:scale-110 transition-transform"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 bg-white text-black rounded-full shadow-[0_0_50px_rgba(0,240,255,0.3)] flex items-center justify-center group hover:bg-accent-cyan transition-all duration-500"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
              <X className="w-8 h-8" />
            </motion.div>
          ) : (
            <motion.div key="msg" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.8, opacity: 0 }}>
              <MessageSquare className="w-8 h-8" />
            </motion.div>
          )}
        </AnimatePresence>
      </button>
    </div>
  );
}
