
import React from 'react';
import { Search, Home, Sparkles, User, Wallet, LayoutDashboard } from 'lucide-react';
import { User as UserType } from '../types';

interface Props {
  onViewChange?: (view: 'home' | 'search' | 'guest-dashboard' | 'profile' | 'concierge' | 'supplier-dashboard' | 'teams') => void;
  currentView?: string;
  currentUser: UserType | null;
}

const BottomNav: React.FC<Props> = ({ onViewChange, currentView, currentUser }) => {
  const isDashboard = ['guest-dashboard', 'supplier-dashboard', 'team-dashboard'].includes(currentView || '');

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-[160] bg-white border-t border-gray-100 pb-safe-area-inset-bottom shadow-[0_-10px_40px_rgba(0,0,0,0.06)]">
      <div className="flex items-center justify-around h-16 px-2">
        {/* 1. Home */}
        <button 
          onClick={() => onViewChange?.('home')}
          className={`flex flex-col items-center gap-1 transition-all flex-1 ${currentView === 'home' ? 'text-[#2D2D2D]' : 'text-gray-400'}`}
        >
          <Home size={20} strokeWidth={currentView === 'home' ? 2.5 : 2} />
          <span className="text-[9px] font-black uppercase tracking-widest">Home</span>
        </button>

        {/* 2. Search */}
        <button 
          onClick={() => onViewChange?.('search')}
          className={`flex flex-col items-center gap-1 transition-all flex-1 ${currentView === 'search' ? 'text-[#2D2D2D]' : 'text-gray-400'}`}
        >
          <Search size={20} strokeWidth={currentView === 'search' ? 2.5 : 2} />
          <span className="text-[9px] font-black uppercase tracking-widest">Search</span>
        </button>

        {/* 3. AI Concierge */}
        <button 
          onClick={() => onViewChange?.('concierge')}
          className={`flex flex-col items-center gap-1 transition-all flex-1 ${currentView === 'concierge' ? 'text-[#2D2D2D]' : 'text-gray-400'}`}
        >
          <Sparkles size={22} strokeWidth={currentView === 'concierge' ? 2.5 : 2} />
          <span className="text-[9px] font-black uppercase tracking-widest">Concierge</span>
        </button>

        {/* 4. Bookings / Pass */}
        <button 
          onClick={() => currentUser ? onViewChange?.('guest-dashboard') : onViewChange?.('profile')}
          className={`flex flex-col items-center gap-1 transition-all flex-1 ${currentView === 'guest-dashboard' ? 'text-[#2D2D2D]' : 'text-gray-400'}`}
        >
          <Wallet size={20} strokeWidth={currentView === 'guest-dashboard' ? 2.5 : 2} />
          <span className="text-[9px] font-black uppercase tracking-widest">Pass</span>
        </button>

        {/* 5. Profile / Login */}
        <button 
          onClick={() => onViewChange?.('profile')}
          className={`flex flex-col items-center gap-1 transition-all flex-1 ${isDashboard ? 'text-[#2D2D2D]' : 'text-gray-400'}`}
        >
          <div className={`w-5 h-5 rounded-full overflow-hidden border transition-all ${currentUser ? 'border-[#2D2D2D] border-2' : 'border-gray-300'}`}>
            {currentUser?.avatar ? (
              <img src={currentUser.avatar} className="w-full h-full object-cover" alt="" />
            ) : (
              <User size={14} className="mx-auto mt-0.5" strokeWidth={isDashboard ? 2.5 : 2} />
            )}
          </div>
          <span className="text-[9px] font-black uppercase tracking-widest">
            {currentUser ? 'Profile' : 'Login'}
          </span>
        </button>
      </div>
    </nav>
  );
};

export default BottomNav;
