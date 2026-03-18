
import React, { useEffect } from 'react';
import { ChevronRight, Coffee, TrainFront, MapPin } from 'lucide-react';
import { SEARCH_RESULTS, NEIGHBORHOOD_METADATA } from '../constants';
import { Desk } from '../types';
import WorkspaceCard from './WorkspaceCard';

interface Props {
  name: string;
  onBack: () => void;
  onDeskClick: (desk: Desk) => void;
}

const LINE_COLORS: Record<string, string> = {
  'Northern': 'bg-black', 'Central': 'bg-[#E32017]', 'Victoria': 'bg-[#0098D4]',
  'Jubilee': 'bg-[#A0A5A9]', 'Piccadilly': 'bg-[#003688]', 'District': 'bg-[#00782A]',
  'Circle': 'bg-[#FFD300]', 'Bakerloo': 'bg-[#B36305]', 'Elizabeth': 'bg-[#60399E]',
  'DLR': 'bg-[#00A4A7]', 'Overground': 'bg-[#EE7C0E]'
};

const NeighborhoodPage: React.FC<Props> = ({ name, onBack, onDeskClick }) => {
  const meta = NEIGHBORHOOD_METADATA[name] || {
    vibe: 'Premium London Workspaces',
    description: `Discover exceptional desks in ${name}. Well-connected and designed for modern professionals.`,
    lunchSpots: ['Local Cafe', 'Community Kitchen', 'Market Stalls'],
    commuteLines: ['District', 'Northern'],
    category: 'Central'
  };

  const filteredDesks = SEARCH_RESULTS.filter(d => d.neighborhood === name).slice(0, 12);

  useEffect(() => {
    document.title = `Coworking in ${name}, London | desk.london`;
    window.scrollTo(0, 0);
  }, [name]);

  return (
    <div className="min-h-screen bg-white pb-24">
      <section className="pt-32 pb-16 px-6 md:px-12 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto">
          <nav className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-400 mb-10">
            <button onClick={onBack} className="hover:text-black">Home</button>
            <ChevronRight size={10} />
            <span>{meta.category} London</span>
            <ChevronRight size={10} />
            <span className="text-[#2D2D2D]">{name}</span>
          </nav>
          
          <div className="max-w-3xl">
            <div className="inline-block px-4 py-1.5 bg-gray-100 text-[#2D2D2D] text-[10px] font-black uppercase tracking-widest rounded-full mb-6">
              {meta.vibe}
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-[#2D2D2D] tracking-tight mb-8 leading-tight">
              Premium Desks in {name}
            </h1>
            <p className="text-lg text-gray-500 font-medium leading-relaxed">
              {meta.description}
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-12">
          <div>
            <h2 className="text-2xl font-black text-[#2D2D2D]">Available Now in {name}</h2>
            <p className="text-sm text-gray-400 font-medium mt-1">Instant booking available for today</p>
          </div>
          <button className="text-sm font-bold underline underline-offset-8">View All {name}</button>
        </div>

        <div className="flex flex-col md:grid md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
          {filteredDesks.map(desk => (
            <WorkspaceCard 
              key={desk.id} 
              desk={desk} 
              onClick={(d) => onDeskClick(d)} 
            />
          ))}
          {filteredDesks.length === 0 && (
             <div className="col-span-full py-12 bg-white rounded-[2rem] text-center border-2 border-dashed border-gray-100">
               <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">No listings live today in this area</p>
             </div>
          )}
        </div>
      </section>

      <section className="py-20 px-6 md:px-12 max-w-7xl mx-auto border-t border-gray-100">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
          <div className="space-y-6">
            <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-[#2D2D2D]">
              <Coffee size={24} />
            </div>
            <h3 className="text-xl font-black">Lunch Spots</h3>
            <ul className="space-y-3">
              {meta.lunchSpots.map(spot => (
                <li key={spot} className="flex items-center gap-3 text-gray-600 font-medium text-sm">
                  <div className="w-1 h-1 bg-[#2D2D2D] rounded-full" /> {spot}
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-6">
            <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-[#2D2D2D]">
              <TrainFront size={24} />
            </div>
            <h3 className="text-xl font-black">Commute</h3>
            <div className="flex flex-wrap gap-2">
              {meta.commuteLines.map(line => (
                <div key={line} className="flex items-center gap-2 px-3 py-1 bg-white border border-gray-100 rounded-full shadow-sm">
                   <div className={`w-2 h-2 rounded-full ${LINE_COLORS[line] || 'bg-gray-400'}`} />
                   <span className="text-[9px] font-black uppercase tracking-widest">{line}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div className="w-12 h-12 bg-[#2D2D2D] rounded-2xl flex items-center justify-center text-white">
              <MapPin size={24} />
            </div>
            <h3 className="text-xl font-black">Local Vibe</h3>
            <p className="text-sm text-gray-600 leading-relaxed font-medium">
              A hub for high-growth talent. Perfect for professionals who value synergy, accessibility, and high-quality coffee.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default NeighborhoodPage;
