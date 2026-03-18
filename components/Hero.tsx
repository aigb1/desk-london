import React, { useState } from 'react';
import { Search, Sparkles } from 'lucide-react';
import Skeleton from './Skeleton';
import { SearchFilters, DeskType, VibeType } from '../types';

interface Props {
  onSearchClick?: (filters: Partial<SearchFilters>) => void;
  onConciergeClick?: () => void;
  isLoading?: boolean;
}

const Hero: React.FC<Props> = ({ onSearchClick, onConciergeClick, isLoading }) => {
  const [location, setLocation] = useState('');
  const [type, setType] = useState<DeskType | ''>('');
  const [vibe, setVibe] = useState<VibeType | ''>('');

  if (isLoading) {
    return (
      <section className="relative h-[85vh] min-h-[600px] w-full pt-24 md:pt-32 px-4">
        <Skeleton className="h-full w-full rounded-[2.5rem]" />
      </section>
    );
  }

  const handleSearch = () => {
    const filters: Partial<SearchFilters> = {};
    if (location) filters.searchQuery = location;
    if (type) filters.type = [type as DeskType];
    if (vibe) filters.vibe = [vibe as VibeType];
    onSearchClick?.(filters);
  };

  return (
    <section className="relative h-[85vh] min-h-[600px] w-full pt-24 md:pt-32 px-4">
      <div className="relative h-full w-full rounded-[2.5rem] overflow-hidden shadow-2xl">
        <img 
          src="https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&q=80&w=2000" 
          alt="Sunlit Shoreditch Loft"
          className="absolute inset-0 w-full h-full object-cover"
        />
        
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/50" />

        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 md:px-6">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-8 md:mb-12 tracking-tight drop-shadow-lg leading-tight">
            Coworking and <br className="hidden md:block" /> Desk Space London.
          </h1>

          <div className="w-full max-w-4xl glass p-2 rounded-[2rem] md:rounded-full shadow-2xl border border-white/30 flex flex-col md:flex-row items-center transition-all">
            <div className="flex-1 w-full flex flex-col md:flex-row items-center divide-y md:divide-y-0 md:divide-x divide-gray-200/40">
              
              {/* 1. WHERE */}
              <div className="flex-1 w-full px-6 py-4 md:py-3 text-left group">
                <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-0.5 transition-colors group-focus-within:text-black">Where</label>
                <div className="relative">
                  <select 
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="bg-transparent border-none outline-none w-full text-sm font-medium text-gray-400 focus:text-black transition-colors appearance-none cursor-pointer"
                  >
                    <option value="" disabled>London Neighborhood</option>
                    <option value="Soho">Soho</option>
                    <option value="Shoreditch">Shoreditch</option>
                    <option value="Canary Wharf">Canary Wharf</option>
                    <option value="Mayfair">Mayfair</option>
                    <option value="Hackney">Hackney</option>
                    <option value="Old St">Old St</option>
                    <option value="Fitzrovia">Fitzrovia</option>
                    <option value="Holborn">Holborn</option>
                  </select>
                </div>
              </div>

              {/* 2. TYPE */}
              <div className="flex-1 w-full px-6 py-4 md:py-3 text-left group">
                <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-0.5 transition-colors group-focus-within:text-black">Type</label>
                <div className="relative">
                  <select 
                    value={type}
                    onChange={(e) => setType(e.target.value as DeskType)}
                    className="bg-transparent border-none outline-none w-full text-sm font-medium text-gray-400 focus:text-black transition-colors appearance-none cursor-pointer"
                  >
                    <option value="" disabled>Space type</option>
                    <option value="Hot Desk">Hot Desk</option>
                    <option value="Dedicated Desk">Dedicated Desk</option>
                    <option value="Private Office">Private Office</option>
                    <option value="Meeting Room">Meeting Room</option>
                    <option value="Team Pod">Team Pod</option>
                  </select>
                </div>
              </div>

              {/* 3. VIBE */}
              <div className="flex-1 w-full px-6 py-4 md:py-3 text-left group">
                <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-0.5 transition-colors group-focus-within:text-black">Vibe</label>
                <div className="relative">
                  <select 
                    value={vibe}
                    onChange={(e) => setVibe(e.target.value as VibeType)}
                    className="bg-transparent border-none outline-none w-full text-sm font-medium text-gray-400 focus:text-black transition-colors appearance-none cursor-pointer"
                  >
                    <option value="" disabled>Select vibe</option>
                    <option value="Quiet">Quiet</option>
                    <option value="Social">Social</option>
                    <option value="Creative">Creative</option>
                    <option value="Client-Ready">Client-Ready</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 w-full md:w-auto mt-2 md:mt-0">
              <button 
                onClick={() => onConciergeClick?.()}
                className="hidden md:flex bg-white/10 hover:bg-white/20 text-white p-4 rounded-full border border-white/20 transition-all items-center justify-center group active:scale-95 shadow-lg"
                title="Neural Concierge"
              >
                <Sparkles size={20} className="text-green-400 group-hover:rotate-12 transition-transform" />
              </button>
              <button 
                onClick={handleSearch}
                className="flex-1 md:flex-none bg-[#2D2D2D] hover:bg-black text-white p-5 md:p-4 rounded-3xl md:rounded-full transition-all flex items-center justify-center gap-3 group active:scale-95 shadow-lg"
              >
                <Search size={20} className="group-hover:scale-110 transition-transform" />
                <span className="md:hidden font-bold text-sm tracking-wide">Search Spaces</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;