
import React, { useState } from 'react';
import { 
  Menu, User as UserIcon, LayoutDashboard, 
  LogOut, Briefcase, BarChart3, Sparkles, X, LayoutList
} from 'lucide-react';
import { User } from '../types';

interface Props {
  onExploreClick?: () => void;
  onLogoClick?: () => void;
  onTeamsClick?: () => void;
  onConciergeClick?: () => void;
  onGuestDashboardClick?: () => void;
  onSupplierDashboardClick?: () => void;
  currentUser: User | null;
  onLogout?: () => void;
  onLoginClick?: () => void;
  isConciergeActive?: boolean;
}

const Header: React.FC<Props> = ({ 
  onExploreClick, 
  onLogoClick,
  onTeamsClick,
  onConciergeClick,
  onGuestDashboardClick,
  onSupplierDashboardClick,
  currentUser,
  onLogout,
  onLoginClick,
  isConciergeActive
}) => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-[120] px-4 py-3 sm:px-8 sm:py-4 transition-all duration-300">
      <nav className="max-w-7xl mx-auto glass rounded-full px-6 py-3 flex items-center justify-between shadow-sm border border-white/20 relative">
        <div className="flex items-center gap-2 cursor-pointer" onClick={onLogoClick}>
          <div className="w-8 h-8 bg-[#2D2D2D] rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-xs">D.L</span>
          </div>
          <span className="font-bold text-lg tracking-tight hidden sm:block">desk.london</span>
        </div>

        {/* Navigation Links - Desktop Only */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium">
          <button 
            onClick={onExploreClick} 
            className="hover:text-gray-500 transition-colors"
          >
            Explore
          </button>
          
          <button 
            onClick={onConciergeClick} 
            className={`flex items-center gap-2 transition-all group relative px-2 py-1 rounded-lg
              ${isConciergeActive ? 'text-[#2D2D2D] bg-[#E1E8E0]/40' : 'hover:text-black text-gray-500'}`}
          >
            <Sparkles size={14} className={`${isConciergeActive ? 'text-green-600' : 'text-gray-400 group-hover:text-green-500'} transition-colors`} />
            <span className="font-bold">AI Concierge</span>
            {isConciergeActive && <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-[#2D2D2D] rounded-full animate-in fade-in duration-500" />}
          </button>

          <button onClick={onTeamsClick} className="hover:text-gray-500 transition-colors">Teams</button>
          
          {currentUser?.role === 'SUPPLIER' ? (
             <button onClick={onSupplierDashboardClick} className="hover:text-gray-500 transition-colors">Supplier Portal</button>
          ) : (
             <button onClick={onSupplierDashboardClick} className="hover:text-gray-500 transition-colors">List your space</button>
          )}
        </div>

        <div className="flex items-center gap-3">
          <button className="hidden sm:block text-sm font-medium hover:bg-black/5 px-4 py-2 rounded-full transition-colors">
            Support
          </button>
          
          <div className="md:hidden flex items-center gap-2" onClick={onLogoClick}>
             <span className="font-bold text-sm tracking-tight pr-2">desk.london</span>
          </div>
          
          <div className="relative">
            <div 
              onClick={() => setShowMenu(!showMenu)}
              className="flex items-center gap-2 border border-gray-200 rounded-full py-1.5 px-3 hover:shadow-md transition-shadow cursor-pointer bg-white"
            >
              <Menu size={18} />
              <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
                {currentUser?.avatar ? (
                  <img src={currentUser.avatar} className="w-full h-full object-cover" alt="" />
                ) : (
                  <UserIcon size={18} className="text-gray-500" />
                )}
              </div>
            </div>

            {/* Dropdown Menu - Matched to Screenshot */}
            {showMenu && (
              <div className="absolute top-full mt-4 right-0 w-72 bg-white rounded-[2rem] shadow-[0_10px_40px_rgba(0,0,0,0.15)] border border-gray-100 py-4 overflow-hidden animate-in zoom-in-95 origin-top-right">
                
                {currentUser ? (
                  <>
                    <div className="px-7 py-5">
                      <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest mb-1.5">Signed in as</p>
                      <p className="text-sm font-bold text-[#2D2D2D] mb-2">{currentUser.email}</p>
                      <span className="inline-block px-3 py-1 bg-[#E1E8E0] text-[#2D2D2D] text-[9px] font-black uppercase rounded-md tracking-wider">
                        {currentUser.role.replace('_', ' ')} ACCOUNT
                      </span>
                    </div>

                    <div className="h-px bg-gray-50 mx-4 my-2" />

                    <div className="py-2">
                      {currentUser.role === 'SUPPLIER' ? (
                        <>
                          <button 
                            onClick={() => { onSupplierDashboardClick?.(); setShowMenu(false); }}
                            className="w-full flex items-center gap-4 px-7 py-3 hover:bg-gray-50 transition-all text-sm font-bold text-[#2D2D2D]"
                          >
                            <LayoutList size={18} className="text-[#2D2D2D]/60" /> Manage Listings
                          </button>
                          <button className="w-full flex items-center gap-4 px-7 py-3 hover:bg-gray-50 transition-all text-sm font-bold text-[#2D2D2D]">
                            <BarChart3 size={18} className="text-[#2D2D2D]/60" /> Earnings
                          </button>
                        </>
                      ) : (
                        <>
                          <button 
                            onClick={() => { onGuestDashboardClick?.(); setShowMenu(false); }}
                            className="w-full flex items-center gap-4 px-7 py-3 hover:bg-gray-50 transition-all text-sm font-bold text-[#2D2D2D]"
                          >
                            <LayoutDashboard size={18} className="text-[#2D2D2D]/60" /> {currentUser.role === 'TEAM_LEAD' ? 'Team Dashboard' : 'My Bookings'}
                          </button>
                          <button className="w-full flex items-center gap-4 px-7 py-3 hover:bg-gray-50 transition-all text-sm font-bold text-[#2D2D2D]">
                            <Briefcase size={18} className="text-[#2D2D2D]/60" /> Saved Desks
                          </button>
                        </>
                      )}
                    </div>

                    <div className="h-px bg-gray-50 mx-4 my-2" />

                    <button 
                      onClick={() => { onLogout?.(); setShowMenu(false); }}
                      className="w-full flex items-center gap-4 px-7 py-3 hover:bg-gray-50 transition-all text-sm font-bold text-[#2D2D2D]"
                    >
                      <LogOut size={18} className="text-[#2D2D2D]/60" /> Log out
                    </button>
                  </>
                ) : (
                  <div className="py-2">
                    <button 
                      onClick={() => { onLoginClick?.(); setShowMenu(false); }}
                      className="w-full text-left px-7 py-3 hover:bg-gray-50 transition-all text-sm font-bold text-[#2D2D2D]"
                    >
                      Log in
                    </button>
                    <button 
                      onClick={() => { onLoginClick?.(); setShowMenu(false); }}
                      className="w-full text-left px-7 py-3 hover:bg-gray-50 transition-all text-sm font-medium text-[#2D2D2D]"
                    >
                      Sign up
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
