import React, { useState, useEffect } from 'react';
import { X, Mic, FileUp, Sparkles, ChevronRight, MapPin, Star, RefreshCcw, Loader2, Trash2 } from 'lucide-react';
import { SEARCH_RESULTS } from '../constants';
import { Desk } from '../types';

interface NeuralDesk {
  id: string;
  name: string;
  location: string;
  neural_score: number;
  match_reason: string;
  image: string;
  price: number;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onDeskClick: (desk: Desk) => void;
}

// Mock IDs to match SEARCH_RESULTS in constants.tsx
const MOCK_NEURAL_DESKS: NeuralDesk[] = [
  {
    id: 'sh1', 
    name: 'The Industrial Loft',
    location: 'Shoreditch',
    neural_score: 98,
    match_reason: 'Perfect for high-focus work with dual-monitor setups and industrial aesthetic.',
    image: 'https://images.unsplash.com/photo-1527192491265-7e15c55b1ed2?auto=format&fit=crop&q=80&w=800',
    price: 45
  },
  {
    id: 's4', 
    name: 'Soho Innovation Suite',
    location: 'Soho',
    neural_score: 96,
    match_reason: 'Creative hub with high ceilings, artistic vibes, and private boardroom.',
    image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&q=80&w=800',
    price: 450
  },
  {
    id: 'cw1', 
    name: 'Glass Cube Suite',
    location: 'Canary Wharf',
    neural_score: 94,
    match_reason: 'Modern corporate hub with ample natural light and panoramic views.',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800',
    price: 85
  },
  {
    id: 's3', 
    name: 'The Library Nook',
    location: 'Soho',
    neural_score: 92,
    match_reason: 'Cozy, quiet sanctuary tucked away from the Soho bustle.',
    image: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=800',
    price: 35
  }
];

const AIConciergeModal: React.FC<Props> = ({ isOpen, onClose, onDeskClick }) => {
  const [inputText, setInputText] = useState('');
  const [isSyncing, setIsSyncing] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [visibleItems, setVisibleItems] = useState<number>(0);

  // Body Scroll Lock
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    if (showResults) {
      const timer = setInterval(() => {
        setVisibleItems(prev => {
          if (prev < MOCK_NEURAL_DESKS.length) return prev + 1;
          clearInterval(timer);
          return prev;
        });
      }, 150);
      return () => clearInterval(timer);
    } else {
      setVisibleItems(0);
    }
  }, [showResults]);

  const handleSync = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      setShowResults(true);
    }, 1500);
  };

  const handleClearAll = () => {
    setInputText('');
    setShowResults(false);
    setVisibleItems(0);
  };

  const handleClose = () => {
    handleClearAll();
    onClose();
  };

  const handleResultClick = (neuralDesk: NeuralDesk) => {
    const fullDesk = SEARCH_RESULTS.find(d => d.id === neuralDesk.id);
    if (fullDesk) {
      onDeskClick(fullDesk);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[250] flex items-end md:items-center justify-center p-0 md:p-8">
      <div 
        className="absolute inset-0 bg-[#2D2D2D]/40 backdrop-blur-xl animate-in fade-in duration-500" 
        onClick={handleClose}
      />
      
      <div className="relative w-full max-w-6xl h-[92vh] md:h-full md:max-h-[800px] bg-[#FCFAFA] rounded-t-[3rem] md:rounded-[3rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)] flex flex-col md:flex-row overflow-y-auto md:overflow-hidden animate-in slide-in-from-bottom md:zoom-in-95 duration-500 border-t md:border border-white/50 hide-scrollbar">
        
        {/* Global Exit Button */}
        <button 
          onClick={handleClose}
          className="absolute top-6 right-6 z-[300] p-3 bg-white border border-gray-100 hover:border-gray-300 rounded-full transition-all shadow-xl active:scale-90 flex items-center justify-center group"
          title="Close Modal"
        >
          <X size={20} className="text-[#2D2D2D] group-hover:scale-110 transition-transform" />
        </button>

        {/* Left Panel: Input Brief - Fixed Scroll behavior */}
        <div className="w-full md:w-[45%] bg-white md:border-r border-gray-100 flex flex-col shrink-0 overflow-y-auto hide-scrollbar">
          <div className="p-8 md:p-14">
            <div className="flex items-center gap-3 mb-10 md:mb-12">
              <div className="p-2 bg-[#2D2D2D] rounded-xl">
                <Sparkles className="text-green-400" size={24} />
              </div>
              <h2 className="text-[11px] font-black uppercase tracking-[0.3em] text-[#2D2D2D]">Neural Concierge</h2>
            </div>
            
            <h1 className="text-[32px] md:text-[40px] font-black text-[#2D2D2D] tracking-tight leading-[1.1] mb-6">
              Establish your <br /> working brief.
            </h1>
            <p className="text-sm text-gray-400 font-medium mb-10 md:mb-12 leading-relaxed">
              Our neural engine maps 400+ data points to find your <br className="hidden md:block" /> perfect match.
            </p>

            <div className="space-y-6 md:space-y-8">
              <div className="flex gap-4">
                <button className="flex-1 flex items-center justify-center gap-3 py-4 bg-white border-2 border-gray-100 rounded-2xl hover:border-gray-200 transition-all font-bold text-sm shadow-sm group active:scale-95">
                  <div className="p-1.5 bg-gray-50 rounded-lg group-hover:bg-[#E1E8E0] transition-colors">
                    <Mic size={18} className="text-[#2D2D2D]" />
                  </div>
                  Voice
                </button>
                <button className="flex-1 flex items-center justify-center gap-3 py-4 bg-white border-2 border-gray-100 rounded-2xl hover:border-gray-200 transition-all font-bold text-sm shadow-sm group active:scale-95">
                  <div className="p-1.5 bg-gray-50 rounded-lg group-hover:bg-[#E1E8E0] transition-colors">
                    <FileUp size={18} className="text-[#2D2D2D]" />
                  </div>
                  Files
                </button>
              </div>

              <div className="space-y-3">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-1">Requirements</p>
                <div className="bg-gray-50/50 border-2 border-gray-100 rounded-[1.5rem] md:rounded-[2rem] p-5 md:p-6 focus-within:border-[#2D2D2D]/20 focus-within:bg-white transition-all">
                  <textarea 
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder="E.g., A quiet spot in Soho with natural light..."
                    className="w-full h-24 md:h-32 bg-transparent outline-none resize-none text-sm font-medium leading-relaxed placeholder:text-gray-300"
                  />
                </div>
              </div>

              <div className="mt-2">
                <button 
                  onClick={handleSync}
                  disabled={isSyncing}
                  className="w-full bg-[#1A1A1A] text-white py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] hover:bg-black transition-all active:scale-95 flex items-center justify-center gap-3 shadow-2xl disabled:opacity-50"
                >
                  {isSyncing ? <Loader2 size={16} className="animate-spin" /> : <Sparkles size={16} className="text-green-400" />}
                  {isSyncing ? 'Accessing Registry...' : 'Sync with Neural Registry'}
                  {!isSyncing && <ChevronRight size={16} />}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel: Results List */}
        <div className={`flex-1 flex flex-col overflow-visible md:overflow-hidden transition-all duration-700 ${showResults || isSyncing ? 'opacity-100' : 'opacity-0 md:opacity-100'}`}>
          <div className="px-8 md:px-10 py-6 md:py-8 flex items-center justify-between border-y md:border-t-0 md:border-b border-gray-50 bg-white/50 backdrop-blur-sm sticky top-0 z-20">
            <h3 className="text-lg md:text-xl font-black text-[#2D2D2D]">Found Matches ({showResults ? MOCK_NEURAL_DESKS.length : '0'})</h3>
            <button 
              onClick={handleClearAll}
              className="flex items-center gap-2 px-4 md:px-6 py-2 rounded-full border-2 border-gray-100 text-[9px] md:text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-[#2D2D2D] hover:border-gray-200 transition-all active:scale-95 group"
            >
              <Trash2 size={12} className="group-hover:text-red-500 transition-colors" />
              Clear
            </button>
          </div>

          <div className="flex-1 overflow-y-visible md:overflow-y-auto p-6 md:p-10 hide-scrollbar bg-[#FCFAFA]">
            {!showResults && !isSyncing && (
              <div className="hidden md:flex h-full flex-col items-center justify-center text-center opacity-30">
                <Sparkles size={64} className="mb-6 text-gray-300" />
                <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">Waiting for Brief</p>
              </div>
            )}

            {isSyncing && (
              <div className="h-64 md:h-full flex flex-col items-center justify-center space-y-4">
                 <Loader2 size={32} className="animate-spin text-[#2D2D2D]" />
                 <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#2D2D2D] animate-pulse">Neural Mapping in Progress</p>
              </div>
            )}

            {showResults && (
              <div className="space-y-4 md:space-y-6 pb-12 md:pb-0">
                {MOCK_NEURAL_DESKS.map((desk, i) => (
                  <div 
                    key={desk.id}
                    onClick={() => handleResultClick(desk)}
                    className={`group bg-white rounded-2xl md:rounded-[2rem] p-3 md:p-5 flex items-center gap-4 md:gap-6 border border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.05)] hover:shadow-xl hover:translate-y-[-2px] transition-all duration-500 cursor-pointer relative
                      ${i < visibleItems ? 'animate-in fade-in slide-in-from-bottom-6' : 'opacity-0'}`}
                  >
                    {/* Standardized Thumbnail (approx 35% on small view if flex) */}
                    <div className="w-20 h-20 md:w-24 md:h-24 rounded-xl md:rounded-2xl overflow-hidden shrink-0 shadow-sm">
                      <img src={desk.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="" />
                    </div>

                    {/* Content Section */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="text-sm md:text-lg font-bold md:font-black text-[#2D2D2D] truncate leading-tight">{desk.name}</h4>
                      </div>
                      <p className="text-[9px] md:text-[10px] font-bold md:font-black uppercase tracking-widest text-gray-400 mb-1.5 md:mb-3">{desk.location}</p>
                      <p className="text-[11px] md:text-[13px] text-gray-500 font-medium leading-relaxed line-clamp-2 pr-2 md:pr-4">
                        {desk.match_reason}
                      </p>
                    </div>

                    {/* Score & Action - Standardized Right Section */}
                    <div className="text-right shrink-0 pr-1 md:pr-2 border-l border-gray-50 pl-3 md:pl-4">
                       <div className="mb-2 md:mb-4">
                          <div className="flex items-center justify-end gap-1 mb-0.5">
                            <Sparkles size={12} className="text-green-500" />
                            <p className="text-lg md:text-[22px] font-black text-[#2D2D2D] leading-none">{desk.neural_score}%</p>
                          </div>
                          <p className="text-[7px] md:text-[8px] font-black text-gray-300 uppercase tracking-widest">Match</p>
                       </div>
                       <button className="text-[9px] md:text-[10px] font-black text-[#2D2D2D] tracking-widest flex items-center gap-1 justify-end ml-auto transition-all group-hover:translate-x-1">
                         EXPLORE <ChevronRight size={12} strokeWidth={3} />
                       </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIConciergeModal;