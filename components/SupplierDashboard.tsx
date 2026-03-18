
import React, { useState } from 'react';
import { 
  BarChart3, Users, MessageSquare, Bell, 
  Calendar as CalendarIcon, Zap, ShieldCheck, 
  TrendingUp, ChevronRight, Activity,
  Smartphone, Plus, DollarSign, LayoutList
} from 'lucide-react';

interface Props {
  onAddListing?: () => void;
  onManageListings?: () => void;
}

const SupplierDashboard: React.FC<Props> = ({ onAddListing, onManageListings }) => {
  const [isInstantBook, setIsInstantBook] = useState(true);

  const stats = [
    { label: "Today's Occupancy", value: "84%", icon: <Users size={20} />, trend: "+4% from yesterday" },
    { label: "Revenue (Jan)", value: "£14,240", icon: <DollarSign size={20} />, trend: "On track for £18k" },
    { label: "Unread Inquiries", value: "3", icon: <MessageSquare size={20} />, trend: "Avg. response time: 4m" },
    { label: "Avg. Review Score", value: "4.92", icon: <Activity size={20} />, trend: "Top 5% in Shoreditch" },
  ];

  return (
    <div className="min-h-screen bg-white pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Header HUD */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
           <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">Property Manager</p>
              <h1 className="text-3xl font-black text-[#2D2D2D]">The Industrial Loft Hub</h1>
           </div>
           <div className="flex items-center gap-3">
              <button 
                onClick={onManageListings}
                className="bg-white border border-gray-200 px-6 py-3.5 rounded-2xl font-black uppercase tracking-[0.15em] text-[10px] hover:bg-gray-50 transition-all shadow-sm flex items-center gap-2"
              >
                 <LayoutList size={16} /> Manage All
              </button>
              <button 
                onClick={onAddListing}
                className="bg-[#2D2D2D] text-white px-8 py-3.5 rounded-2xl font-black uppercase tracking-[0.15em] text-[10px] hover:bg-black transition-all shadow-xl flex items-center gap-2"
              >
                 <Plus size={16} /> Add Listing
              </button>
           </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
           {stats.map((stat, i) => (
             <div key={i} className="bg-white border border-gray-100 rounded-[2rem] p-8 shadow-sm hover:shadow-xl transition-all group">
                <div className="flex items-center justify-between mb-4">
                   <div className="p-3 bg-gray-50 rounded-2xl text-[#2D2D2D] group-hover:bg-white transition-colors">
                      {stat.icon}
                   </div>
                   <TrendingUp size={16} className="text-green-500" />
                </div>
                <h3 className="text-2xl font-black text-[#2D2D2D] mb-1">{stat.value}</h3>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">{stat.label}</p>
                <div className="pt-3 border-t border-gray-50 text-[10px] font-bold text-green-600 uppercase tracking-wider">
                   {stat.trend}
                </div>
             </div>
           ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
           
           {/* Smart Calendar & Ops */}
           <div className="lg:col-span-8 space-y-10">
              
              {/* Mock Calendar */}
              <div className="bg-white border border-gray-100 rounded-[3rem] p-10 shadow-sm">
                 <div className="flex items-center justify-between mb-10">
                    <h3 className="text-xl font-bold flex items-center gap-2">
                       <CalendarIcon size={20} /> Inventory Manager
                    </h3>
                    <div className="flex gap-2">
                       <button className="p-2 border border-gray-100 rounded-lg hover:bg-gray-50 transition-all">
                          <ChevronRight size={18} className="rotate-180" />
                       </button>
                       <button className="p-2 border border-gray-100 rounded-lg hover:bg-gray-50 transition-all">
                          <ChevronRight size={18} />
                       </button>
                    </div>
                 </div>
                 
                 <div className="grid grid-cols-7 gap-4 text-center">
                    {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(d => (
                      <div key={d} className="text-[10px] font-black uppercase text-gray-400 mb-4">{d}</div>
                    ))}
                    {[...Array(31)].map((_, i) => (
                      <div 
                        key={i} 
                        className={`aspect-square rounded-2xl flex flex-col items-center justify-center cursor-pointer transition-all border-2
                          ${i === 14 ? 'bg-[#2D2D2D] border-[#2D2D2D] text-white' : 
                            i < 14 ? 'bg-gray-50 border-transparent text-gray-400' : 'bg-white border-gray-50 hover:border-[#2D2D2D]'}`}
                      >
                         <span className="text-xs font-bold">{i + 1}</span>
                         <span className="text-[8px] font-bold mt-1 opacity-60">£45</span>
                      </div>
                    ))}
                 </div>

                 <div className="mt-10 pt-10 border-t border-gray-100 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                       <div className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-gray-200 rounded-full" />
                          <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Booked</span>
                       </div>
                       <div className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-white border border-gray-200 rounded-full" />
                          <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Available</span>
                       </div>
                    </div>
                    <button className="text-[10px] font-black uppercase tracking-widest underline">Edit Bulk Pricing</button>
                 </div>
              </div>

              {/* Operational Tools */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div className="bg-white border border-gray-100 rounded-[2.5rem] p-8 flex items-center justify-between group shadow-sm">
                    <div>
                       <h4 className="font-bold text-[#2D2D2D] mb-1">Instant Book API</h4>
                       <p className="text-xs text-gray-500">Auto-sync building availability</p>
                    </div>
                    <button 
                      onClick={() => setIsInstantBook(!isInstantBook)}
                      className={`w-12 h-7 rounded-full transition-colors relative ${isInstantBook ? 'bg-[#2D2D2D]' : 'bg-gray-300'}`}
                    >
                       <div className={`absolute top-1 w-5 h-5 bg-white rounded-full transition-all ${isInstantBook ? 'left-6' : 'left-1'}`} />
                    </button>
                 </div>
                 <div className="bg-white border border-gray-100 rounded-[2.5rem] p-8 flex items-center justify-between hover:shadow-lg transition-all shadow-sm">
                    <div className="flex items-center gap-4">
                       <div className="w-10 h-10 bg-green-50 rounded-full flex items-center justify-center text-green-600">
                          <ShieldCheck size={20} />
                       </div>
                       <div>
                          <h4 className="font-bold text-[#2D2D2D] mb-1">Access Sync</h4>
                          <p className="text-xs text-gray-500">Kisi Smart Locks Online</p>
                       </div>
                    </div>
                    <div className="flex items-center gap-1 text-[10px] font-bold text-green-600">
                       <Zap size={10} fill="currentColor" /> Active
                    </div>
                 </div>
              </div>
           </div>

           {/* Live Feed & Revenue */}
           <div className="lg:col-span-4 space-y-10">
              
              {/* Live Ticker */}
              <div className="bg-white border border-gray-100 rounded-[3rem] p-8 shadow-sm">
                 <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-8 flex items-center justify-between">
                    Live Feed 
                    <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                 </h4>
                 <div className="space-y-6">
                    {[1, 2, 3].map(i => (
                      <div key={i} className="flex gap-4 pb-6 border-b border-gray-50 last:border-0 last:pb-0">
                         <div className="w-10 h-10 rounded-full bg-gray-100 shrink-0" />
                         <div>
                            <p className="text-xs font-bold text-[#2D2D2D] mb-0.5">Alex M. just booked</p>
                            <p className="text-[10px] text-gray-400 mb-2">Industrial Loft (Desk #4) · 15 Jan</p>
                            <div className="flex gap-2">
                               <button className="text-[10px] font-black text-[#2D2D2D] bg-gray-100 px-3 py-1 rounded-full uppercase tracking-widest hover:bg-gray-200">Approve</button>
                               <button className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Details</button>
                            </div>
                         </div>
                      </div>
                    ))}
                 </div>
              </div>

              {/* Revenue Forecast */}
              <div className="bg-[#2D2D2D] rounded-[3rem] p-10 text-white shadow-2xl relative overflow-hidden">
                 <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/5 rounded-full" />
                 <h4 className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-10">Revenue Forecast</h4>
                 <div className="flex items-end gap-1 h-32 mb-10">
                    {[30, 45, 60, 40, 70, 85, 90, 65, 80, 100].map((h, i) => (
                      <div key={i} className="flex-1 bg-white/20 rounded-t-sm transition-all hover:bg-white cursor-help" style={{ height: `${h}%` }} />
                    ))}
                 </div>
                 <div className="space-y-4">
                    <div className="flex justify-between items-center">
                       <p className="text-[10px] font-bold text-white/50 uppercase tracking-widest">Projected (Jan)</p>
                       <p className="text-xl font-black">£18,450.00</p>
                    </div>
                    <div className="flex justify-between items-center">
                       <p className="text-[10px] font-bold text-white/50 uppercase tracking-widest">Next Payout</p>
                       <p className="text-sm font-bold">£2,450 (Fri)</p>
                    </div>
                 </div>
                 <button className="w-full mt-10 bg-white/10 hover:bg-white/20 py-4 rounded-2xl text-[10px] font-bold uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2">
                    <BarChart3 size={14} /> Full Analytics
                 </button>
              </div>

              {/* Operational Status */}
              <div className="bg-white border border-gray-100 rounded-[3rem] p-8 shadow-sm flex items-center justify-between">
                 <div className="flex items-center gap-4">
                    <Smartphone size={24} className="text-gray-400" />
                    <p className="text-xs font-bold text-[#2D2D2D]">Mobile App Sync</p>
                 </div>
                 <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-green-600">Live</span>
                 </div>
              </div>

           </div>
        </div>
      </div>
    </div>
  );
};

export default SupplierDashboard;
