import React, { useState, useRef, useEffect } from 'react';
import { 
  Bot, 
  SendHorizontal, 
  User, 
  Package, 
  CircleDollarSign, 
  LayoutDashboard, 
  DatabaseZap, 
  Loader2,
  Sun,
  Moon
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkBreaks from 'remark-breaks';

type Message = {
  role: 'user' | 'assistant';
  content: string;
  tool_used?: boolean;
};

type AgentStatus = 'online' | 'offline' | 'checking';

export default function App() {
  const [messages, setMessages] = useState<Message[]>([
    { 
      role: 'assistant', 
      content: 'Hello! I am your Retail Copilot. I can monitor stock levels, check competitor pricing, and help you manage your catalog.\n\n**Try asking:**\n- "How is our stock looking for electronics?"\n- "Are there any items we should reorder?"' 
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) return savedTheme === 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });
  const [agentStatus, setAgentStatus] = useState<AgentStatus>('checking');
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Poll backend for Agent Status
  useEffect(() => {
    const checkStatus = async () => {
      try {
        const response = await fetch('http://localhost:8000/');
        if (response.ok) {
          setAgentStatus('online');
        } else {
          setAgentStatus('offline');
        }
      } catch (error) {
        setAgentStatus('offline');
      }
    };

    checkStatus();
    // Poll every 15 seconds
    const interval = setInterval(checkStatus, 15000);
    return () => clearInterval(interval);
  }, []);

  // Auto-scroll to the latest message
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle('dark', isDarkMode);
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userText = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userText }]);
    setLoading(true);

    try {
      const response = await fetch('http://localhost:8000/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: userText })
      });

      const data = await response.json();
      
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: data.response || "Sorry, I encountered an error.",
        tool_used: data.tool_used
      }]);
    } catch (error) {
      console.error("Fetch error:", error);
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: "Network error. Please ensure your backend is running on port 3000." 
      }]);
    } finally {
      setLoading(false);
    }
  };

  // Toggle Theme
  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  return (
    <div className="h-screen w-full flex transition-colors duration-300">
      {/* App Container - Applies Lavendar Theme Colors */}
      <div className="flex h-full w-full bg-[#F8F7FA] dark:bg-[#1E1B24] text-gray-800 dark:text-[#E2DFE7]">
        
        {/* Sidebar */}
        <aside className="w-64 bg-[#ECE9F2] dark:bg-[#15131A] border-r border-[#E5E0F1] dark:border-[#2A2533] flex flex-col hidden md:flex transition-colors duration-300">
          <div className="p-5 font-bold text-xl flex items-center gap-2 text-[#4A3D63] dark:text-[#BCA3E0]">
            <DatabaseZap className="text-[#8264C2] dark:text-[#967BB6]" />
            Retail OS
          </div>
          <nav className="flex-1 p-4 space-y-2">
            <button className="flex items-center gap-3 w-full p-3 rounded-xl bg-[#DDD6EA] dark:bg-[#2A2533] text-[#4A3D63] dark:text-[#E2DFE7] font-medium transition-colors">
              <LayoutDashboard size={20} className="text-[#8264C2] dark:text-[#967BB6]"/>
              Copilot Agent
            </button>
            <button className="flex items-center gap-3 w-full p-3 rounded-xl hover:bg-[#DDD6EA]/50 dark:hover:bg-[#2A2533]/60 text-gray-600 dark:text-gray-400 font-medium transition-colors">
              <Package size={20} />
              Inventory Hub
            </button>
            <button className="flex items-center gap-3 w-full p-3 rounded-xl hover:bg-[#DDD6EA]/50 dark:hover:bg-[#2A2533]/60 text-gray-600 dark:text-gray-400 font-medium transition-colors">
              <CircleDollarSign size={20} />
              Pricing Engine
            </button>
          </nav>
        </aside>

        {/* Main Chat Area */}
        <main className="flex-1 flex flex-col h-full relative">
          
          {/* Header */}
          <header className="bg-white/80 dark:bg-[#1E1B24]/80 backdrop-blur-md border-b border-[#E5E0F1] dark:border-[#2A2533] p-4 flex justify-between items-center shadow-sm z-10 shrink-0 transition-colors duration-300">
            <div>
              <h1 className="text-xl font-bold text-[#4A3D63] dark:text-[#BCA3E0]">Autonomous Replenishment Copilot</h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">Powered by Claude & Postgres</p>
            </div>
            <div className="flex items-center gap-4">
              
              {/* Theme Toggle */}
              <button 
                onClick={toggleTheme}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-[#2A2533] transition-colors text-gray-500 dark:text-gray-400"
                aria-label="Toggle Theme"
              >
                {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>

              {/* Dynamic Status */}
              <div className="flex items-center gap-2 bg-[#F8F7FA] dark:bg-[#2A2533] px-3 py-1.5 rounded-full border border-[#E5E0F1] dark:border-[#3B3446]">
                {agentStatus === 'checking' && <Loader2 size={12} className="animate-spin text-gray-400" />}
                {agentStatus === 'online' && <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]"></span>}
                {agentStatus === 'offline' && <span className="h-2.5 w-2.5 rounded-full bg-red-500"></span>}
                <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                  {agentStatus === 'checking' ? 'Connecting...' : agentStatus === 'online' ? 'Agent Online' : 'Agent Offline'}
                </span>
              </div>
            </div>
          </header>

          {/* Messages List - Flex-1 ensures it pushes the input box to the bottom without overlap */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex gap-4 max-w-4xl mx-auto ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                
                {/* Avatar */}
                <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm ${
                  msg.role === 'user' 
                    ? 'bg-[#8264C2] dark:bg-[#967BB6] text-white' 
                    : 'bg-white dark:bg-[#2A2533] border border-[#E5E0F1] dark:border-[#3B3446] text-[#8264C2] dark:text-[#BCA3E0]'
                }`}>
                  {msg.role === 'user' ? <User size={20} /> : <Bot size={22} />}
                </div>

                {/* Message Bubble */}
                <div className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'} max-w-[85%]`}>
                  <div className={`p-4 rounded-2xl shadow-sm ${
                    msg.role === 'user' 
                      ? 'bg-[#8264C2] dark:bg-[#967BB6] text-white rounded-tr-sm' 
                      : 'bg-white dark:bg-[#2A2533] border border-[#E5E0F1] dark:border-[#3B3446] text-gray-800 dark:text-[#E2DFE7] rounded-tl-sm'
                  }`}>
                    <div className="markdown-body leading-relaxed text-[15px]">
                      <ReactMarkdown remarkPlugins={[remarkGfm, remarkBreaks]}>
                        {msg.content}
                      </ReactMarkdown>
                    </div>
                  </div>
                  
                  {/* Visual Indicator if the AI used a Database Tool */}
                  {msg.tool_used && (
                    <div className="flex items-center gap-1.5 mt-2 text-xs font-semibold text-[#8264C2] dark:text-[#BCA3E0] bg-[#EADAFF]/50 dark:bg-[#2A2533] px-2.5 py-1.5 rounded-lg border border-[#D5C6EB] dark:border-[#3B3446]">
                      <DatabaseZap size={14} />
                      <span>Queried Postgres Database</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
            
            {loading && (
              <div className="flex gap-4 max-w-4xl mx-auto">
                <div className="w-10 h-10 rounded-full bg-white dark:bg-[#2A2533] border border-[#E5E0F1] dark:border-[#3B3446] text-[#8264C2] dark:text-[#BCA3E0] flex items-center justify-center flex-shrink-0 shadow-sm">
                  <Bot size={22} />
                </div>
                <div className="px-5 py-4 rounded-2xl bg-white dark:bg-[#2A2533] border border-[#E5E0F1] dark:border-[#3B3446] shadow-sm rounded-tl-sm flex items-center gap-3 text-gray-500 dark:text-gray-400 font-medium">
                  <Loader2 size={18} className="animate-spin text-[#8264C2] dark:text-[#967BB6]" />
                  <span>Agent is analyzing data...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area - Shrink-0 keeps it exactly at the bottom of the flex container */}
          <div className="shrink-0 bg-gradient-to-t from-[#F8F7FA] via-[#F8F7FA] dark:from-[#1E1B24] dark:via-[#1E1B24] to-transparent pt-6 pb-6 px-4">
            <form onSubmit={handleSendMessage} className="max-w-4xl mx-auto relative flex items-center group">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="E.g., Which electronics are low in stock?"
                className="w-full pl-6 pr-14 py-4 rounded-full border border-[#D5C6EB] dark:border-[#3B3446] shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[#8264C2] dark:focus:ring-[#967BB6] focus:border-transparent text-gray-800 dark:text-[#E2DFE7] bg-white dark:bg-[#2A2533] text-[15px] transition-all"
                disabled={loading || agentStatus === 'offline'}
              />
              <button 
                type="submit" 
                disabled={loading || !input.trim() || agentStatus === 'offline'}
                className="absolute right-2 p-2 w-11 h-11 flex items-center justify-center bg-[#8264C2] dark:bg-[#967BB6] text-white rounded-full hover:bg-[#6b4fac] dark:hover:bg-[#b098c9] transition-colors disabled:bg-gray-300 dark:disabled:bg-gray-700 disabled:cursor-not-allowed shadow-sm"
              >
                {/* SendHorizontal properly centered */}
                <SendHorizontal size={20} className="ml-0.5" /> 
              </button>
            </form>
            <div className="text-center mt-3 text-xs text-gray-400 dark:text-gray-500 font-medium">
              The agent has real-time access to database pricing. {agentStatus === 'offline' && <span className="text-red-400 block mt-1">Cannot send messages while backend is offline.</span>}
            </div>
          </div>

        </main>
      </div>
    </div>
  );
}