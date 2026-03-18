
import React, { useState } from 'react';
import { 
  Calendar, Clock, MapPin, Key, Heart, Wallet, 
  Settings, MessageSquare, ChevronRight, RefreshCw,
  Search, CreditCard, Receipt, Sparkles, Smartphone,
  Tally4, Share, Send, MoreHorizontal, Check, 
  TrendingUp, Zap, User, Star
} from 'lucide-react';
import { SEARCH_RESULTS } from '../constants';
import { Desk } from '../types';

type DashboardTab = 'bookings' | 'saved' | 'pass' | 'inbox' | 'account';

const SavedDesks: React.FC<{ onExplore: () => void }> = ({ onExplore }) => {
  const [saved, setSaved] = useState<Desk[]>(SEARCH_RESULTS.slice(1, 4));

  if (saved.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center animate-in fade-in slide-in-from-bottom-4">
        <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mb-6">
          <Heart size={32} className="text-gray-300" />
        </div>
        <h3 className="text-xl font-bold mb-2">No saved desks yet</h3>
        <p className="text-gray-500 mb-8 max-w-xs">Start hearting spaces you love to see them appear here for quick booking.</p>
        <button 
          onClick={onExplore}
          className="bg-[#2D2D2D] text-white px-10 py-4 rounded-2xl font-black uppercase tracking-widest text-xs shadow-xl active:scale-95 transition-all"
        >
          Start Exploring
        </button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 animate-in fade-in slide-in-from-bottom-4">
      {saved.map((desk) => (
        <div key={desk.id} className="group cursor-pointer">
          <div className="relative aspect-square rounded-[2rem] overflow-hidden mb-4 shadow-sm group-hover:shadow-2xl transition-all duration-500">
            <img src={desk.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="" />
            <button 
              onClick={(e) => { e.stopPropagation(); setSaved(prev => prev.filter(d => d.id !== desk.id)); }}
              className="absolute top-4 right-4 p-3 rounded-full bg-white text-red-500 shadow-xl hover:scale-110 active:scale-90 transition-all"
            >
              <Heart size={18} fill="currentColor" />
            </button>
            <div className="absolute bottom-4 left-4">
               <span className="bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest">
                  {desk.neighborhood}
               </span>
            </div>
          </div>
          <div className="flex justify-between items-start mb-2">
            <h4 className="font-bold text-[#2D2D2D]">{desk.title}</h4>
            <div className="flex items-center gap-1 text-xs font-bold">
               <Star size={12} fill="#2D2D2D" /> {desk.rating}
            </div>
          </div>
          <div className="flex items-center justify-between">
            <p className="font-black text-sm">£{desk.price}<span className="text-gray-400 font-normal">/day</span></p>
            <button className="bg-[#2D2D2D] text-white px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-black transition-all">
              Book Now
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

const LondonPass: React.FC = () => {
  const [isPro, setIsPro] = useState(false);
  const usageData = [65, 40, 80, 50, 90, 30, 70];

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Main Balance Card */}
        <div className="md:col-span-2 bg-[#2D2D2D] rounded-[3rem] p-10 text-white shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-10">
            <Wallet size={120} strokeWidth={1} />
          </div>
          <div className="relative z-10 h-full flex flex-col justify-between">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40 mb-2">Total Credits</p>
              <h2 className="text-5xl font-black mb-6">£2,450.00</h2>
              <div className="flex gap-4">
                <div className="bg-white/10 px-4 py-2 rounded-xl">
                  <p className="text-[9px] font-bold text-white/40 uppercase tracking-widest mb-1">Estimated Desk Days</p>
                  <p className="text-sm font-black">~54 Days</p>
                </div>
                <div className="bg-white/10 px-4 py-2 rounded-xl">
                  <p className="text-[9px] font-bold text-white/40 uppercase tracking-widest mb-1">Reward Multiplier</p>
                  <p className="text-sm font-black text-green-400">1.5x Active</p>
                </div>
              </div>
            </div>
            
            <div className="mt-12 flex items-end gap-2 h-24">
              {usageData.map((h, i) => (
                <div key={i} className="flex-1 bg-white/20 rounded-t-lg transition-all hover:bg-white cursor-help group relative" style={{ height: `${h}%` }}>
                  <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-white text-black text-[9px] font-bold px-2 py-1 rounded hidden group-hover:block whitespace-nowrap">
                    £{Math.floor(h * 1.5)} spent
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Top Up Fast Actions */}
        <div className="bg-white border border-gray-100 rounded-[3rem] p-8 shadow-sm flex flex-col justify-between">
          <h3 className="text-lg font-bold mb-6">Quick Top-up</h3>
          <div className="space-y-3">
            {[50, 100, 250].map(amount => (
              <button key={amount} className="w-full group flex items-center justify-between p-5 border-2 border-gray-50 rounded-2xl hover:border-[#2D2D2D] hover:bg-gray-50 transition-all">
                <span className="font-black text-lg">£{amount}</span>
                <div className="flex items-center gap-2">
                  <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest group-hover:text-[#2D2D2D]">Instant Buy</span>
                  <ChevronRight size={16} className="text-gray-300" />
                </div>
              </button>
            ))}
          </div>
          <p className="text-[10px] text-gray-400 text-center mt-6">Powered by Stripe Connect</p>
        </div>
      </div>

      <div className="bg-white rounded-[2.5rem] p-10 flex flex-col md:flex-row items-center justify-between border border-gray-100">
        <div className="flex items-center gap-6 mb-8 md:mb-0">
          <div className="w-16 h-16 bg-[#2D2D2D] rounded-3xl flex items-center justify-center text-white shadow-xl">
             <Zap size={32} />
          </div>
          <div>
            <h3 className="text-xl font-black text-[#2D2D2D]">London Pro Membership</h3>
            <p className="text-sm text-gray-500">Unlimited coffee, printer access & priority desk booking.</p>
          </div>
        </div>
        <button 
          onClick={() => setIsPro(!isPro)}
          className={`flex items-center gap-4 px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-xs transition-all shadow-xl
            ${isPro ? 'bg-green-600 text-white' : 'bg-[#2D2D2D] text-white hover:bg-black'}`}
        >
          {isPro ? <Check size={18} /> : null}
          {isPro ? 'Membership Active' : 'Upgrade for £29/mo'}
        </button>
      </div>
    </div>
  );
};

const Inbox: React.FC = () => {
  const [activeChat, setActiveChat] = useState(0);
  const [message, setMessage] = useState('');
  const [chats, setChats] = useState([
    {
      id: 1,
      name: 'Oliver (Tea Building)',
      lastMsg: 'The printer code is 4455.',
      time: '14:02',
      status: 'Booking Confirmed',
      unread: true,
      messages: [
        { role: 'host', text: 'Hi Alex, welcome to the Tea Building!' },
        { role: 'user', text: 'Thanks Oliver! Where can I find the printer?' },
        { role: 'host', text: 'It\'s in the central hub. The printer code is 4455.' },
      ]
    },
    {
      id: 2,
      name: 'Sarah (Canary Wharf)',
      lastMsg: 'Great, see you then!',
      time: 'Yesterday',
      status: 'Query',
      unread: false,
      messages: [
        { role: 'user', text: 'Is there a quiet room available for a 2pm call?' },
        { role: 'host', text: 'Yes, we have a few booths open.' },
        { role: 'user', text: 'Perfect, booking now.' },
        { role: 'host', text: 'Great, see you then!' },
      ]
    }
  ]);

  const quickReplies = ["What is the Wi-Fi password?", "Where is the printer?", "Is there coffee?", "Is the space dog-friendly?"];

  const handleSend = () => {
    if (!message.trim()) return;
    const newMsg = { role: 'user' as const, text: message };
    const updatedChats = [...chats];
    updatedChats[activeChat].messages.push(newMsg);
    updatedChats[activeChat].lastMsg = message;
    updatedChats[activeChat].time = 'Just now';
    setChats(updatedChats);
    setMessage('');
  };

  return (
    <div className="h-[600px] flex flex-col md:flex-row bg-white border border-gray-100 rounded-[3rem] overflow-hidden shadow-sm animate-in fade-in slide-in-from-bottom-4">
      {/* Sidebar Conversations */}
      <div className="w-full md:w-80 border-r border-gray-50 flex flex-col">
        <div className="p-6 border-b border-gray-50">
          <h3 className="text-sm font-black uppercase tracking-widest text-[#2D2D2D]">Conversations</h3>
        </div>
        <div className="flex-1 overflow-y-auto">
          {chats.map((chat, i) => (
            <button 
              key={chat.id}
              onClick={() => setActiveChat(i)}
              className={`w-full p-6 text-left border-b border-gray-50 flex gap-4 transition-all
                ${activeChat === i ? 'bg-gray-50' : 'hover:bg-gray-50'}`}
            >
              <div className="w-12 h-12 bg-gray-100 rounded-full flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start mb-1">
                  <h4 className="text-sm font-bold truncate">{chat.name}</h4>
                  <span className="text-[9px] text-gray-400 font-bold uppercase">{chat.time}</span>
                </div>
                <p className={`text-xs truncate ${chat.unread ? 'font-bold text-[#2D2D2D]' : 'text-gray-500'}`}>{chat.lastMsg}</p>
                <span className={`inline-block mt-2 px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-widest
                  ${chat.status === 'Booking Confirmed' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>
                  {chat.status}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Active Chat Pane */}
      <div className="flex-1 flex flex-col relative bg-white">
        <div className="p-6 border-b border-gray-50 bg-white flex items-center justify-between">
           <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gray-100 rounded-full" />
              <div>
                 <h4 className="text-sm font-bold">{chats[activeChat].name}</h4>
                 <p className="text-[10px] text-green-600 font-bold uppercase tracking-widest">Host Online</p>
              </div>
           </div>
           <button className="p-2 text-gray-400 hover:text-[#2D2D2D]"><MoreHorizontal size={20} /></button>
        </div>

        <div className="flex-1 overflow-y-auto p-8 space-y-6">
           {chats[activeChat].messages.map((msg, i) => (
             <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-4 rounded-2xl text-sm leading-relaxed
                  ${msg.role === 'user' 
                    ? 'bg-[#2D2D2D] text-white rounded-tr-none shadow-xl' 
                    : 'bg-white border border-gray-100 text-[#2D2D2D] rounded-tl-none shadow-sm'}`}>
                   {msg.text}
                </div>
             </div>
           ))}
        </div>

        {/* Input Bar */}
        <div className="p-6 border-t border-gray-50 bg-white space-y-4">
           <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-2">
              {quickReplies.map(reply => (
                <button 
                  key={reply}
                  onClick={() => setMessage(reply)}
                  className="px-4 py-2 bg-gray-50 border border-gray-100 rounded-full text-[10px] font-bold text-gray-500 hover:border-[#2D2D2D] hover:text-[#2D2D2D] transition-all whitespace-nowrap"
                >
                   {reply}
                </button>
              ))}
           </div>
           <div className="flex gap-3">
              <input 
                type="text" 
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Message your host..."
                className="flex-1 bg-gray-50 border-2 border-transparent focus:border-[#2D2D2D] focus:bg-white px-6 py-4 rounded-2xl text-sm font-medium outline-none transition-all"
              />
              <button 
                onClick={handleSend}
                className="bg-[#2D2D2D] text-white p-4 rounded-2xl hover:bg-black transition-all shadow-lg active:scale-95"
              >
                 <Send size={20} />
              </button>
           </div>
        </div>
      </div>
    </div>
  );
};

const GuestDashboard: React.FC = () => {
  const [currentTab, setCurrentTab] = useState<DashboardTab>('bookings');
  const [showKeyModal, setShowKeyModal] = useState(false);
  const nextBooking = SEARCH_RESULTS[0];

  const navigateToSearch = () => {
    window.location.href = '#search';
  };

  const tabs = [
    { id: 'bookings', label: 'My Bookings', icon: <Calendar size={18} /> },
    { id: 'saved', label: 'Saved Desks', icon: <Heart size={18} /> },
    { id: 'pass', label: 'London Pass', icon: <Wallet size={18} /> },
    { id: 'inbox', label: 'Inbox', icon: <MessageSquare size={18} /> },
    { id: 'account', label: 'Account', icon: <Settings size={18} /> },
  ];

  return (
    <div className="min-h-screen bg-white pt-24 pb-20 md:pb-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 flex flex-col md:flex-row gap-12">
        
        {/* Sidebar - Desktop */}
        <aside className="hidden md:flex w-64 flex-col gap-2 shrink-0 h-fit sticky top-32">
          {tabs.map((tab) => (
            <button 
              key={tab.id}
              onClick={() => setCurrentTab(tab.id as DashboardTab)}
              className={`flex items-center gap-4 px-6 py-4 rounded-2xl font-bold text-sm transition-all
                ${currentTab === tab.id ? 'bg-gray-100 text-[#2D2D2D] shadow-sm' : 'hover:bg-gray-50 text-gray-500'}`}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </aside>

        {/* Main Content */}
        <main className="flex-1 space-y-12 pb-24">
          
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 mb-2">Guest Hub</p>
              <h1 className="text-4xl font-black text-[#2D2D2D] tracking-tight">
                {currentTab === 'bookings' && "Your Office Anywhere"}
                {currentTab === 'saved' && "Your Collections"}
                {currentTab === 'pass' && "London Wallet"}
                {currentTab === 'inbox' && "Messages"}
                {currentTab === 'account' && "Preferences"}
              </h1>
              <p className="text-gray-500 font-medium">Welcome back, Alex. {currentTab === 'bookings' ? "Ready for deep work?" : ""}</p>
            </div>
            {currentTab !== 'pass' && (
              <div 
                onClick={() => setCurrentTab('pass')}
                className="flex items-center gap-3 bg-white border border-gray-100 p-2 rounded-2xl shadow-sm cursor-pointer hover:shadow-md transition-all"
              >
                 <div className="px-4 text-right">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Balance</p>
                    <p className="text-sm font-black">£2,450.00</p>
                 </div>
                 <button className="bg-[#2D2D2D] text-white p-2.5 rounded-xl">
                    <Wallet size={18} />
                 </button>
              </div>
            )}
          </div>

          {/* Dynamic Content Sections */}
          {currentTab === 'bookings' && (
            <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
              {/* Next Up Card */}
              <div className="relative rounded-[3rem] overflow-hidden shadow-2xl group">
                 <img src={nextBooking.image} className="w-full h-[400px] object-cover brightness-75 group-hover:scale-105 transition-transform duration-1000" alt="" />
                 <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                 <div className="absolute inset-0 p-10 flex flex-col justify-between">
                    <div className="flex justify-between items-start">
                       <div className="bg-white/20 backdrop-blur-md border border-white/30 px-5 py-2.5 rounded-2xl flex items-center gap-2">
                          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                          <span className="text-white text-[10px] font-black uppercase tracking-widest">Starting in 42 mins</span>
                       </div>
                       <button className="p-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white hover:bg-white/20 transition-all">
                          <Share size={20} />
                       </button>
                    </div>
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                       <div>
                          <h2 className="text-5xl font-black text-white mb-4 tracking-tight">{nextBooking.title}</h2>
                          <div className="flex items-center gap-6 text-white/80 text-sm font-medium">
                             <div className="flex items-center gap-2"><MapPin size={18} /> {nextBooking.neighborhood}</div>
                             <div className="flex items-center gap-2"><Clock size={18} /> 09:00 - 18:00</div>
                          </div>
                       </div>
                       <button 
                         onClick={() => setShowKeyModal(true)}
                         className="bg-white text-[#2D2D2D] px-12 py-5 rounded-[2rem] font-black uppercase tracking-[0.2em] text-xs hover:scale-105 transition-all shadow-2xl flex items-center justify-center gap-3 active:scale-95"
                       >
                          <Key size={18} />
                          Unlock Door
                       </button>
                    </div>
                 </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                 {/* History */}
                 <div className="lg:col-span-2 space-y-8">
                    <div className="flex items-center justify-between">
                       <h3 className="text-xl font-bold">Recent History</h3>
                       <button className="text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-[#2D2D2D]">View all</button>
                    </div>
                    <div className="space-y-4">
                       {SEARCH_RESULTS.slice(1, 4).map(desk => (
                         <div key={desk.id} className="bg-white border border-gray-100 rounded-[2.5rem] p-6 flex items-center gap-6 group hover:shadow-xl transition-all cursor-pointer">
                            <img src={desk.image} className="w-24 h-24 rounded-3xl object-cover" alt="" />
                            <div className="flex-1">
                               <h4 className="font-bold text-[#2D2D2D] text-lg mb-1">{desk.title}</h4>
                               <p className="text-sm text-gray-400 font-medium mb-2">{desk.neighborhood}</p>
                               <div className="flex items-center gap-2">
                                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                                  <p className="text-[10px] font-black text-green-600 uppercase tracking-widest">Completed · 12 Jan</p>
                               </div>
                            </div>
                            <button className="p-4 bg-gray-50 rounded-2xl group-hover:bg-gray-100 transition-all">
                               <RefreshCw size={20} className="text-gray-400 group-hover:text-[#2D2D2D]" />
                            </button>
                         </div>
                       ))}
                    </div>
                 </div>

                 {/* Side Cards */}
                 <div className="space-y-12">
                    <div 
                      onClick={() => setCurrentTab('pass')}
                      className="bg-[#2D2D2D] rounded-[2.5rem] p-10 text-white shadow-2xl cursor-pointer hover:scale-[1.02] transition-all"
                    >
                       <h4 className="text-[10px] font-black uppercase tracking-widest text-white/50 mb-8">London Pass</h4>
                       <div className="flex items-end justify-between mb-8">
                          <div>
                             <p className="text-4xl font-black mb-1">2,400</p>
                             <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Available Credits</p>
                          </div>
                          <Tally4 size={40} className="text-white/20 rotate-12" />
                       </div>
                       <button className="w-full bg-white hover:bg-gray-50 transition-all py-4 rounded-2xl text-[#2D2D2D] text-[10px] font-black uppercase tracking-[0.2em] flex items-center justify-center gap-2">
                          Manage Pass
                       </button>
                    </div>

                    <div className="bg-white border border-gray-100 rounded-[2.5rem] p-8 shadow-sm">
                       <div className="flex items-center gap-3 mb-6">
                          <Sparkles className="text-green-500" size={20} />
                          <h4 className="text-sm font-bold">AI Concierge</h4>
                       </div>
                       <p className="text-xs text-gray-500 leading-relaxed mb-6">
                          Based on your preferences and today's weather, I recommend <b>The Library Nook in Soho</b>. It's quiet and only 12 mins away on the Elizabeth Line.
                       </p>
                       <button className="w-full bg-gray-50 hover:bg-gray-100 py-4 rounded-2xl text-[10px] font-bold uppercase tracking-widest flex items-center justify-center gap-2 transition-all">
                          Check Vibe <ChevronRight size={14} />
                       </button>
                    </div>
                 </div>
              </div>
            </div>
          )}

          {currentTab === 'saved' && <SavedDesks onExplore={() => window.location.href = '#search'} />}
          {currentTab === 'pass' && <LondonPass />}
          {currentTab === 'inbox' && <Inbox />}
          {currentTab === 'account' && (
            <div className="py-20 text-center animate-in fade-in slide-in-from-bottom-4">
               <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
                  <User size={32} className="text-gray-300" />
               </div>
               <h3 className="text-xl font-bold mb-2">Account Settings</h3>
               <p className="text-gray-500 mb-8">Update your profile, payment methods, and notification preferences.</p>
               <button className="bg-white border border-[#2D2D2D] px-8 py-3 rounded-2xl text-xs font-bold hover:bg-[#2D2D2D] hover:text-white transition-all">
                 Edit Profile
               </button>
            </div>
          )}
        </main>
      </div>

      {/* Unlock Modal */}
      {showKeyModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-[#2D2D2D]/60 backdrop-blur-sm animate-in fade-in duration-300" onClick={() => setShowKeyModal(false)} />
          <div className="relative bg-white rounded-[3rem] p-12 max-w-sm w-full text-center shadow-2xl animate-in zoom-in-95 duration-300">
             <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-8 relative">
                <Smartphone size={48} className="text-[#2D2D2D]" />
                <div className="absolute inset-0 rounded-full border-4 border-[#2D2D2D]/20 animate-ping" />
             </div>
             <h3 className="text-2xl font-black text-[#2D2D2D] mb-2">Syncing with Building</h3>
             <p className="text-sm text-gray-400 mb-10 font-medium">Hold your phone near the reader</p>
             <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden mb-10">
                <div className="h-full bg-[#2D2D2D] w-1/2 animate-infinite-loading rounded-full" />
             </div>
             <button onClick={() => setShowKeyModal(false)} className="text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-black transition-colors">Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GuestDashboard;
