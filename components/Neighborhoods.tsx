import React from 'react';
import { NEIGHBORHOODS } from '../constants';
import Skeleton from './Skeleton';

interface Props {
  onNeighborhoodClick?: (name: string) => void;
  isLoading?: boolean;
}

const Neighborhoods: React.FC<Props> = ({ onNeighborhoodClick, isLoading }) => {
  const getInitials = (text: string) => {
    return text
      .split(' ')
      .filter(Boolean)
      .map(n => n[0])
      .join('')
      .slice(0, 2)
      .toUpperCase();
  };

  const NeighborhoodPlaceholder = ({ name }: { name: string }) => (
    <div className="absolute inset-0 bg-[#f4f4f4] flex flex-col items-center justify-center relative overflow-hidden group-hover:bg-gray-100 transition-colors">
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <svg width="100%" height="100%"><pattern id="neigh-grid" width="60" height="60" patternUnits="userSpaceOnUse"><path d="M 60 0 L 0 0 0 60" fill="none" stroke="#2D2D2D" strokeWidth="0.8"/></pattern><rect width="100%" height="100%" fill="url(#neigh-grid)"/></svg>
      </div>
      <span className="text-6xl font-black text-[#2D2D2D] tracking-tighter opacity-10 transition-all group-hover:scale-110 group-hover:opacity-20">
        {getInitials(name)}
      </span>
      <p className="mt-4 text-[10px] font-black uppercase tracking-[0.3em] text-gray-300">Neighborhood Hub</p>
    </div>
  );

  return (
    <section className="max-w-7xl mx-auto px-6 py-16">
      <div className="mb-10">
        <h2 className="text-3xl font-bold tracking-tight mb-2">
          {isLoading ? <Skeleton className="h-9 w-64" /> : "Explore London Neighborhoods"}
        </h2>
        <p className="text-gray-500">
          {isLoading ? <Skeleton className="h-4 w-48 mt-2" /> : "Find the vibe that fits your work style today."}
        </p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading ? (
          [...Array(6)].map((_, i) => <Skeleton key={i} className="h-64 rounded-2xl" />)
        ) : (
          NEIGHBORHOODS.map((area) => (
            <div 
              key={area.id}
              onClick={() => onNeighborhoodClick?.(area.name)}
              className="group relative h-64 rounded-2xl overflow-hidden cursor-pointer shadow-sm hover:shadow-xl transition-all"
            >
              {area.image ? (
                <img 
                  src={area.image} 
                  alt={area.name}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  onError={(e) => {
                    // Fallback for broken links
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
              ) : null}
              
              {!area.image && <NeighborhoodPlaceholder name={area.name} />}
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-6 left-6 text-white">
                <h3 className="text-2xl font-bold">{area.name}</h3>
                <p className="text-sm text-gray-200">{area.count} desks available</p>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
};

export default Neighborhoods;