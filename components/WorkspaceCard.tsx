import React from 'react';
import { Star, Heart, Sparkles, ChevronRight, Eye } from 'lucide-react';
import { Desk } from '../types';
import Skeleton from './Skeleton';

interface Props {
  desk?: Desk;
  onClick?: (desk: Desk) => void;
  isTeamMode?: boolean;
  variant?: 'default' | 'horizontal';
  isHovered?: boolean;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  isLoading?: boolean;
}

const WorkspaceCard: React.FC<Props> = ({ 
  desk, 
  onClick, 
  isTeamMode, 
  variant = 'default',
  isHovered,
  onMouseEnter,
  onMouseLeave,
  isLoading
}) => {
  if (isLoading || !desk) {
    if (variant === 'horizontal') {
      return (
        <div className="flex bg-white rounded-3xl border border-gray-100 p-3.5 gap-4 shadow-sm">
          <Skeleton className="w-[36%] aspect-square rounded-2xl shrink-0" />
          <div className="flex-1 flex flex-col justify-between py-1">
            <div className="space-y-2">
              <Skeleton className="h-3 w-20" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
            </div>
            <Skeleton className="h-6 w-16" />
          </div>
        </div>
      );
    }
    return (
      <div className="bg-white">
        <Skeleton className="aspect-square rounded-[2rem] mb-5" />
        <div className="px-2 space-y-3">
          <div className="flex justify-between items-start">
            <div className="space-y-2 flex-1">
              <Skeleton className="h-3 w-16" />
              <Skeleton className="h-5 w-4/5" />
            </div>
            <Skeleton className="h-7 w-12 rounded-lg" />
          </div>
          <Skeleton className="h-4 w-full" />
          <div className="pt-4 border-t border-gray-50 flex justify-between items-center">
            <Skeleton className="h-6 w-20" />
            <Skeleton className="h-4 w-12" />
          </div>
        </div>
      </div>
    );
  }

  const isMeetingRoom = desk.type === 'Meeting Room';
  const neuralScore = Math.floor(88 + (desk.id.length * 2) % 12);
  
  const displayPrice = isTeamMode 
    ? (desk.price * (desk.capacity || 1) * 0.8).toFixed(0) 
    : (isMeetingRoom ? Math.round(desk.price / 6) : desk.price);
  
  const priceSuffix = isMeetingRoom ? '/HR' : '/DAY';

  const getInitials = (text: string) => {
    return text
      .split(' ')
      .filter(Boolean)
      .map(n => n[0])
      .join('')
      .slice(0, 2)
      .toUpperCase();
  };

  const FallbackPlaceholder = () => (
    <div className="w-full h-full bg-[#f9f9f9] flex flex-col items-center justify-center relative overflow-hidden group-hover:bg-gray-100 transition-colors">
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <svg width="100%" height="100%"><pattern id="card-grid" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M 40 0 L 0 0 0 40" fill="none" stroke="#2D2D2D" strokeWidth="0.5"/></pattern><rect width="100%" height="100%" fill="url(#card-grid)"/></svg>
      </div>
      <span className="text-4xl font-black text-[#2D2D2D] tracking-tighter opacity-20 transition-all group-hover:scale-110 group-hover:opacity-30">
        {getInitials(desk.title)}
      </span>
      <p className="mt-4 text-[9px] font-black uppercase tracking-widest text-gray-300">Media Pending</p>
    </div>
  );

  if (variant === 'horizontal') {
    return (
      <div 
        onClick={() => onClick?.(desk)}
        className="flex bg-white rounded-3xl overflow-hidden shadow-[0_15px_40px_rgba(0,0,0,0.18)] border border-gray-100 p-3.5 gap-4 active:scale-[0.98] transition-transform animate-in slide-in-from-bottom-2 duration-300"
      >
        <div className="w-[36%] aspect-square rounded-2xl overflow-hidden shrink-0 shadow-sm relative">
          {desk.image ? (
            <img src={desk.image} className="w-full h-full object-cover" alt={desk.title} />
          ) : (
            <FallbackPlaceholder />
          )}
          <div className="absolute top-2 left-2 bg-white/90 backdrop-blur px-2 py-1 rounded-lg">
             <Star size={10} fill="#2D2D2D" className="text-[#2D2D2D]" />
          </div>
        </div>

        <div className="flex-1 flex flex-col justify-between py-1 pr-1 min-w-0">
          <div>
            <div className="flex items-center gap-1.5 mb-2">
               <div className="bg-[#E1E8E0]/80 px-2 py-0.5 rounded-lg flex items-center gap-1">
                 <Sparkles size={10} className="text-[#2D2D2D]" />
                 <span className="text-[8px] font-black text-[#2D2D2D] uppercase tracking-wider">{neuralScore}% Neural Match</span>
               </div>
            </div>
            <h4 className="font-bold text-[15px] text-[#2D2D2D] leading-tight line-clamp-1">{desk.title}</h4>
            <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mt-1">{desk.neighborhood}</p>
          </div>
          
          <div className="flex items-end justify-between mt-auto">
            <div className="flex items-baseline gap-1">
              <span className="text-xl font-black text-[#2D2D2D]">£{displayPrice}</span>
              <span className="text-[8px] font-bold text-gray-400 uppercase tracking-widest">{priceSuffix}</span>
            </div>
            <button className="text-[9px] font-black text-[#2D2D2D] uppercase tracking-widest flex items-center gap-1 group/btn px-3 py-1.5 bg-gray-50 rounded-xl">
              OPEN <ChevronRight size={12} strokeWidth={4} />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      onClick={() => onClick?.(desk)}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className="group cursor-pointer transition-all duration-300 bg-white"
    >
      <div className="relative aspect-[4/3] md:aspect-square rounded-[2rem] overflow-hidden mb-5 shadow-sm group-hover:shadow-2xl transition-all duration-500">
        {desk.image ? (
          <img 
            src={desk.image} 
            alt={desk.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
        ) : (
          <FallbackPlaceholder />
        )}
        
        <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
           <div className="bg-white text-[#2D2D2D] px-6 py-3 rounded-full font-black text-[10px] uppercase tracking-[0.2em] shadow-2xl flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform">
              <Eye size={14} /> View Details
           </div>
        </div>

        <button 
          className="absolute top-6 right-6 p-3 rounded-full bg-white/90 backdrop-blur shadow-xl hover:scale-110 active:scale-90 transition-all z-10"
          onClick={(e) => e.stopPropagation()}
        >
          <Heart size={20} className="text-[#2D2D2D] hover:fill-[#2D2D2D]" />
        </button>
        
        <div className="absolute bottom-6 left-6">
          <div className="bg-white/95 backdrop-blur px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-xl flex items-center gap-2">
            <Sparkles size={12} className="text-green-500" />
            {neuralScore}% Neural Match
          </div>
        </div>
      </div>
      
      <div className="px-2">
        <div className="flex justify-between items-start mb-2">
          <div>
             <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{desk.neighborhood}</p>
             <h3 className="font-bold text-xl text-[#2D2D2D] tracking-tight group-hover:underline underline-offset-4">{desk.title}</h3>
          </div>
          <div className="flex items-center gap-1.5 font-bold text-sm bg-gray-50 px-2.5 py-1 rounded-lg">
            <Star size={14} fill="#2D2D2D" className="text-[#2D2D2D]" />
            <span>{desk.rating.toFixed(1)}</span>
          </div>
        </div>
        <p className="text-gray-400 text-sm font-medium mb-4 line-clamp-1 italic">
          "{desk.vibe} hub with curated amenities for professionals."
        </p>
        <div className="flex items-center justify-between pt-4 border-t border-gray-50">
           <div className="flex items-baseline gap-1">
             <p className="font-black text-xl text-[#2D2D2D]">£{displayPrice}</p>
             <span className="text-gray-400 text-[10px] font-bold tracking-widest uppercase">{priceSuffix}</span>
           </div>
           <button className="flex items-center gap-2 text-[10px] font-black text-[#2D2D2D] uppercase tracking-widest group-hover:underline underline-offset-4">
              VIEW <ChevronRight size={14} strokeWidth={3} className="text-gray-300" />
           </button>
        </div>
      </div>
    </div>
  );
};

export default WorkspaceCard;