
import React from 'react';
import { SlidersHorizontal, Check, TrainFront } from 'lucide-react';
import { SearchFilters, DeskType, VibeType } from '../types';

interface Props {
  filters: SearchFilters;
  updateFilter: (key: keyof SearchFilters, value: any) => void;
  toggleArrayFilter: (key: 'type' | 'vibe' | 'amenities' | 'tubeLines', value: any) => void;
  resetFilters: () => void;
  resultsCount: number;
  activeFiltersCount: number;
  onOpenModal: () => void;
}

const FilterBar: React.FC<Props> = ({ 
  filters, 
  updateFilter, 
  toggleArrayFilter, 
  resetFilters, 
  resultsCount, 
  activeFiltersCount,
  onOpenModal 
}) => {
  const deskTypes: DeskType[] = ['Hot Desk', 'Dedicated Desk', 'Private Office', 'Meeting Room'];
  const vibes: VibeType[] = ['Quiet', 'Social', 'Creative', 'Client-Ready'];

  const isTransportFiltered = filters.tubeLines.length > 0 || filters.maxCommute < 15;

  return (
    <div className="pt-2 pb-4 px-6 bg-white border-b border-gray-100 shrink-0 z-30 overflow-x-hidden md:shadow-none shadow-sm">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-6">
        
        <div className="flex items-center gap-3 overflow-x-auto hide-scrollbar pb-1 md:pb-0">
          
          <button 
            onClick={onOpenModal}
            className={`flex items-center gap-2 px-5 py-2.5 border rounded-full text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap shadow-sm relative group
              ${activeFiltersCount > 0 ? 'border-[#2D2D2D] bg-[#2D2D2D] text-white' : 'border-gray-100 bg-white hover:border-[#2D2D2D]'}
            `}
          >
            <SlidersHorizontal size={14} />
            Filters
            {activeFiltersCount > 0 && (
              <span className="ml-1.5 flex items-center justify-center w-4 h-4 bg-white text-[#2D2D2D] text-[8px] rounded-full">
                {activeFiltersCount}
              </span>
            )}
          </button>

          <div className="h-6 w-px bg-gray-100 mx-1 shrink-0" />

          {/* Quick Access Transport Indicator */}
          <button
            onClick={onOpenModal}
            className={`flex items-center gap-2 px-5 py-2.5 border rounded-full text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap shadow-sm
              ${isTransportFiltered ? 'bg-[#E1E8E0] border-[#E1E8E0] text-[#2D2D2D]' : 'bg-white border-gray-100 text-gray-400'}
            `}
          >
            <TrainFront size={14} />
            {filters.maxCommute < 15 ? `Under ${filters.maxCommute}m` : 'Commute'}
          </button>

          {/* Price Range Label */}
          <div className="flex items-center gap-4 bg-white border border-gray-100 rounded-full px-6 py-2.5 shadow-sm min-w-max">
            <label className="text-[9px] font-black uppercase tracking-widest text-gray-300">Up to £{filters.priceMax}</label>
            <input 
              type="range" 
              min="10" 
              max="200" 
              step="10"
              value={filters.priceMax}
              onChange={(e) => updateFilter('priceMax', parseInt(e.target.value))}
              className="w-20 accent-[#2D2D2D] cursor-pointer"
            />
          </div>

          <div className="h-6 w-px bg-gray-100 mx-1 shrink-0" />

          {/* Desk Types Pills */}
          <div className="flex items-center gap-2">
            {deskTypes.map(type => (
              <button
                key={type}
                onClick={() => toggleArrayFilter('type', type)}
                className={`px-5 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap border
                  ${filters.type.includes(type) 
                    ? 'bg-[#2D2D2D] text-white border-[#2D2D2D] shadow-md' 
                    : 'bg-white text-gray-400 border-gray-100 hover:border-gray-200'
                  }`}
              >
                {type}
              </button>
            ))}
          </div>

          {/* Vibes Pills */}
          <div className="flex items-center gap-2 ml-2">
            {vibes.map(vibe => (
              <button
                key={vibe}
                onClick={() => toggleArrayFilter('vibe', vibe)}
                className={`px-5 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap border
                  ${filters.vibe.includes(vibe) 
                    ? 'bg-[#E1E8E0] text-[#2D2D2D] border-[#E1E8E0] shadow-sm' 
                    : 'bg-white text-gray-400 border-gray-100 hover:border-gray-200'
                  }`}
              >
                {vibe}
              </button>
            ))}
          </div>
        </div>

        <div className="hidden lg:flex items-center gap-2 shrink-0">
          <span className="text-[9px] font-black text-gray-300 uppercase tracking-[0.3em] whitespace-nowrap">
            {resultsCount} Verified Spaces
          </span>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
