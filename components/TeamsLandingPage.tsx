import React, { useState } from 'react';
import { Users, Search, ChevronRight, Sparkles, Building2, MapPin, Star } from 'lucide-react';
import { SEARCH_RESULTS } from '../constants';
import { Desk } from '../types';

interface Props {
  onSearchTeams: () => void;
  onBookTeamPod: (desk: Desk) => void;
}

const TeamsLandingPage: React.FC<Props> = ({ onSearchTeams, onBookTeamPod }) => {
  const [teamSize, setTeamSize] = useState('5-20');
  
  const teamReadyDesks = SEARCH_RESULTS.filter(d => d.is_team_ready);

  return (
    <div className="min-h-screen bg-[#FCFAFA] pb-24">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center px-4 md:px-8">
        <div className="absolute inset-0 overflow-hidden pt-24 pb-8 px-4">
           <div className="relative h-full w-full rounded-[3rem] overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&q=80&w=2000" 
                className="absolute inset-0 w-full h-full object-cover"
                alt="Modern Team Workspace"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent" />
              <div className="absolute inset-0 flex flex-col justify-center px-8 md:px-20 max-w-4xl">
                 <h1 className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight tracking-tighter">
                   Work Better, Together.
                 </h1>
                 <p className="text-lg md:text-xl text-white/90 font-medium mb-12 max-xl leading-relaxed">
                   The easiest way to book group pods, boardrooms, and satellite offices for your entire London team.
                 </p>
                 
                 {/* Team-First Search */}
                 <div className="w-full bg-white rounded-[2rem] p-3 shadow-2xl flex flex-col md:flex-row items-center gap-2 border border-white/20">
                    <div className="flex-1 w-full flex items-center px-6 gap-4">
                       <MapPin className="text-gray-400" size={20} />
                       <input 
                        type="text" 
                        placeholder="Team location in London..." 
                        className="bg-transparent border-none outline-none w-full text-sm font-bold text-[#2D2D2D]"
                       />
                    </div>
                    <div className="w-full md:w-auto h-px md:h-8 md:w-px bg-gray-100" />
                    <div className="flex-1 w-full px-6 flex items-center gap-4">
                       <Users className="text-gray-400" size={20} />
                       <select 
                        value={teamSize}
                        onChange={(e) => setTeamSize(e.target.value)}
                        className="bg-transparent border-none outline-none w-full text-sm font-bold text-[#2D2D2D] appearance-none cursor-pointer"
                       >
                         <option>5-20 People</option>
                         <option>20-50 People</option>
                         <option>50+ People</option>
                       </select>
                    </div>
                    <button 
                      onClick={onSearchTeams}
                      className="w-full md:w-auto bg-[#2D2D2D] text-white px-8 py-4 rounded-full font-black uppercase tracking-widest text-xs flex items-center justify-center gap-3 hover:bg-black transition-all shadow-xl active:scale-95"
                    >
                       <Search size={18} /> Search Teams
                    </button>
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* Curated Team Bundles */}
      <section className="max-w-7xl mx-auto px-6 py-20">
         <div className="flex items-end justify-between mb-12">
            <div>
               <p className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 mb-2">Curated Spaces</p>
               <h2 className="text-4xl font-black text-[#2D2D2D]">Team Hubs</h2>
            </div>
            <div className="flex items-center gap-2 text-sm font-bold underline underline-offset-8 decoration-2 cursor-pointer hover:text-gray-500">
               View all bundles <ChevronRight size={18} />
            </div>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {teamReadyDesks.map(desk => (
              <div 
                key={desk.id} 
                onClick={() => onBookTeamPod(desk)}
                className="group cursor-pointer bg-white rounded-[2.5rem] border border-gray-100 p-4 shadow-sm hover:shadow-2xl transition-all duration-500"
              >
                 <div className="relative aspect-[4/3] rounded-[2rem] overflow-hidden mb-6">
                    <img src={desk.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="" />
                    <div className="absolute top-6 left-6 bg-[#2D2D2D] text-white px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2 shadow-xl">
                       <Sparkles size={12} /> Team Favorite
                    </div>
                 </div>
                 <div className="px-4 pb-4">
                    <div className="flex justify-between items-start mb-2">
                       <div>
                          <h4 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-1">{desk.neighborhood}</h4>
                          <h3 className="text-xl font-black text-[#2D2D2D] leading-tight">{desk.title}</h3>
                       </div>
                       <div className="flex items-center gap-1.5 font-bold text-sm bg-[#E1E8E0]/40 px-3 py-1.5 rounded-xl">
                          <Star size={14} fill="#2D2D2D" /> {desk.rating.toFixed(1)}
                       </div>
                    </div>
                    <p className="text-sm text-gray-500 line-clamp-2 mb-6">Up to {desk.capacity} desks + dedicated meeting suite.</p>
                    <div className="flex items-center justify-between pt-6 border-t border-gray-50">
                       <div>
                          <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Starting group rate</p>
                          <p className="text-2xl font-black">£{desk.price * 8} <span className="text-xs font-normal text-gray-400">/day</span></p>
                       </div>
                       <button className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center group-hover:bg-[#2D2D2D] group-hover:text-white transition-all">
                          <ChevronRight size={24} />
                       </button>
                    </div>
                 </div>
              </div>
            ))}
         </div>
      </section>

      {/* Team Value Prop */}
      <section className="bg-[#2D2D2D] py-24 px-6 mt-12">
         <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-16 text-center">
               <div className="space-y-6">
                  <div className="w-20 h-20 bg-white/10 rounded-[2rem] flex items-center justify-center mx-auto text-white">
                     <Users size={40} />
                 </div>
                 <h3 className="text-2xl font-black text-white">Scale Effortlessly</h3>
                 <p className="text-white/60 text-sm leading-relaxed">Book for 5 people today, and 50 people next week. No long-term leases, no overhead.</p>
               </div>
               <div className="space-y-6">
                  <div className="w-20 h-20 bg-white/10 rounded-[2rem] flex items-center justify-center mx-auto text-white">
                     <Building2 size={40} />
                 </div>
                 <h3 className="text-2xl font-black text-white">Satellite Offices</h3>
                 <p className="text-white/60 text-sm leading-relaxed">Establish presence in Soho, Canary Wharf, and Hackney simultaneously with a single account.</p>
               </div>
               <div className="space-y-6">
                  <div className="w-20 h-20 bg-white/10 rounded-[2rem] flex items-center justify-center mx-auto text-white">
                     <Sparkles size={40} />
                 </div>
                 <h3 className="text-2xl font-black text-white">Team Synergy</h3>
                 <p className="text-white/60 text-sm leading-relaxed">Private boardrooms and project spaces designed specifically for collaborative deep focus.</p>
               </div>
            </div>
         </div>
      </section>
    </div>
  );
};

export default TeamsLandingPage;