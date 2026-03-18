
import React, { useState, useMemo } from 'react';
import { 
  Search, SlidersHorizontal, ChevronLeft, MoreVertical, 
  ExternalLink, Copy, Archive, Edit3, CheckCircle2, 
  XCircle, Clock, Check, Trash2, ArrowUpDown,
  Filter, LayoutList, LayoutGrid, DollarSign, Calendar
} from 'lucide-react';
import { Desk, ListingStatus, DeskType } from '../types';
import { SEARCH_RESULTS } from '../constants';

interface Props {
  onBack: () => void;
}

const ManageListings: React.FC<Props> = ({ onBack }) => {
  // Mock data initialization
  const [listings, setListings] = useState<Desk[]>(
    SEARCH_RESULTS.map((d, i) => ({
      ...d,
      status: i % 3 === 0 ? 'Live' : i % 3 === 1 ? 'Occupied' : 'Hidden',
      nextBooking: i % 2 === 0 ? '15 Jan' : 'None'
    }))
  );

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [showBulkPriceModal, setShowBulkPriceModal] = useState(false);
  const [priceAdjustment, setPriceAdjustment] = useState({ type: 'flat', value: 0 });

  // Filtering Logic
  const filteredListings = useMemo(() => {
    return listings.filter(l => 
      l.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      l.neighborhood.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [listings, searchQuery]);

  const toggleSelectAll = () => {
    if (selectedIds.length === filteredListings.length && filteredListings.length > 0) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredListings.map(l => l.id));
    }
  };

  const toggleSelect = (id: string) => {
    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const updateStatus = (id: string, newStatus: ListingStatus) => {
    setListings(prev => prev.map(l => l.id === id ? { ...l, status: newStatus } : l));
  };

  const applyBulkPrice = () => {
    setListings(prev => prev.map(l => {
      if (selectedIds.includes(l.id)) {
        const newValue = priceAdjustment.type === 'flat' 
          ? l.price + priceAdjustment.value 
          : l.price * (1 + priceAdjustment.value / 100);
        return { ...l, price: Math.max(10, Math.round(newValue)) };
      }
      return l;
    }));
    setShowBulkPriceModal(false);
    setSelectedIds([]);
  };

  const getStatusColor = (status?: ListingStatus) => {
    switch (status) {
      case 'Live': return 'bg-green-500';
      case 'Occupied': return 'bg-orange-500';
      case 'Hidden': return 'bg-gray-300';
      default: return 'bg-gray-300';
    }
  };

  // Helper for refined circle checkboxes
  const CircularCheckbox = ({ checked, onToggle, className = "" }: { checked: boolean, onToggle: () => void, className?: string }) => (
    <div 
      onClick={(e) => { e.stopPropagation(); onToggle(); }}
      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center cursor-pointer transition-all shrink-0 ${
        checked 
          ? 'bg-white border-[#2D2D2D] text-[#2D2D2D]' 
          : 'bg-white border-gray-200'
      } ${className}`}
    >
      {checked && <Check size={12} strokeWidth={4} />}
    </div>
  );

  return (
    <div className="min-h-screen bg-[#FCFAFA] pt-24 pb-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Navigation & Title */}
        <div className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <button 
              onClick={onBack}
              className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-black mb-4 transition-all"
            >
              <ChevronLeft size={14} /> Back to HUB
            </button>
            <h1 className="text-3xl font-black text-[#2D2D2D]">Manage Listings</h1>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4">
             <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input 
                  type="text" 
                  placeholder="Search desks or postcodes..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 pr-6 py-3.5 bg-white border border-gray-100 rounded-2xl text-sm font-medium w-full sm:w-64 focus:ring-2 focus:ring-[#2D2D2D]/5 outline-none transition-all shadow-sm"
                />
             </div>
             <button className="flex items-center justify-center gap-2 px-6 py-3.5 bg-white border border-gray-100 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-gray-50 transition-all shadow-sm">
                <Filter size={14} /> Filters
             </button>
          </div>
        </div>

        {/* Desktop Table View */}
        <div className="hidden md:block bg-white border border-gray-100 rounded-[2.5rem] overflow-hidden shadow-sm">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-gray-50 bg-gray-50/30">
                <th className="px-8 py-5">
                   <CircularCheckbox 
                    checked={selectedIds.length === filteredListings.length && filteredListings.length > 0}
                    onToggle={toggleSelectAll}
                   />
                </th>
                <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400">Listing</th>
                <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400">Type</th>
                <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400">Price (Daily)</th>
                <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400">Status</th>
                <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400">Next Booking</th>
                <th className="px-6 py-5 text-right"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredListings.map(desk => (
                <tr 
                  key={desk.id} 
                  className={`group transition-colors hover:bg-gray-50/50 ${selectedIds.includes(desk.id) ? 'bg-[#E1E8E0]/10' : ''}`}
                >
                  <td className="px-8 py-5">
                     <CircularCheckbox 
                      checked={selectedIds.includes(desk.id)}
                      onToggle={() => toggleSelect(desk.id)}
                     />
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-4">
                      <img src={desk.image} className="w-12 h-12 rounded-xl object-cover shrink-0" alt="" />
                      <div>
                        <h4 className="text-sm font-bold text-[#2D2D2D]">{desk.title}</h4>
                        <p className="text-[11px] text-gray-400 font-medium">{desk.neighborhood}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <span className="text-[10px] font-bold text-gray-500 bg-gray-100 px-3 py-1 rounded-full uppercase tracking-widest">
                      {desk.type}
                    </span>
                  </td>
                  <td className="px-6 py-5">
                    <span className="text-sm font-black">£{desk.price}</span>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-2">
                       <div className={`w-2 h-2 rounded-full ${getStatusColor(desk.status)}`} />
                       <select 
                        value={desk.status} 
                        onChange={(e) => updateStatus(desk.id, e.target.value as ListingStatus)}
                        className="bg-transparent text-[11px] font-bold text-[#2D2D2D] outline-none cursor-pointer"
                       >
                          <option>Live</option>
                          <option>Hidden</option>
                          <option>Occupied</option>
                       </select>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-2 text-xs font-medium text-gray-500">
                       <Calendar size={14} /> {desk.nextBooking}
                    </div>
                  </td>
                  <td className="px-6 py-5 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-2 hover:bg-[#E1E8E0] rounded-lg transition-colors" title="Edit"><Edit3 size={16} /></button>
                      <button className="p-2 hover:bg-[#E1E8E0] rounded-lg transition-colors" title="View"><ExternalLink size={16} /></button>
                      <button className="p-2 hover:bg-[#E1E8E0] rounded-lg transition-colors" title="Archive"><Archive size={16} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Grid View */}
        <div className="md:hidden space-y-4">
           {filteredListings.map(desk => (
             <div key={desk.id} className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm relative overflow-hidden group">
                <div className="flex items-start gap-4 mb-4">
                   <img src={desk.image} className="w-16 h-16 rounded-2xl object-cover" alt="" />
                   <div className="flex-1">
                      <div className="flex items-center justify-between">
                         <h4 className="text-sm font-bold truncate pr-8">{desk.title}</h4>
                         <CircularCheckbox 
                            checked={selectedIds.includes(desk.id)}
                            onToggle={() => toggleSelect(desk.id)}
                            className="absolute top-6 right-6"
                         />
                      </div>
                      <p className="text-[11px] text-gray-400 font-medium mb-2">{desk.neighborhood}</p>
                      <div className="flex items-center gap-2">
                         <div className={`w-1.5 h-1.5 rounded-full ${getStatusColor(desk.status)}`} />
                         <span className="text-[10px] font-black uppercase tracking-widest">{desk.status}</span>
                      </div>
                   </div>
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                   <div className="text-sm font-black">£{desk.price}<span className="text-gray-400 font-normal">/day</span></div>
                   <button className="px-6 py-2 bg-[#E1E8E0] text-[#2D2D2D] rounded-xl text-[10px] font-black uppercase tracking-widest">
                      Quick Edit
                   </button>
                </div>
                {/* Swipe simulation background */}
                <div className="absolute inset-y-0 right-[-100px] w-[100px] bg-red-500 flex items-center justify-center text-white transition-all group-active:right-0">
                   <Archive size={24} />
                </div>
             </div>
           ))}
        </div>

        {/* Floating Bulk Action Bar */}
        {selectedIds.length > 0 && (
          <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[90] w-full max-w-2xl px-4 animate-in slide-in-from-bottom-10">
            <div className="bg-[#2D2D2D] text-white rounded-[2rem] px-8 py-5 shadow-2xl flex items-center justify-between border border-white/10">
              <div className="flex items-center gap-4">
                 <div className="w-10 h-10 bg-white/10 rounded-2xl flex items-center justify-center font-black text-sm">
                   {selectedIds.length}
                 </div>
                 <p className="text-xs font-bold hidden sm:block">Desks Selected</p>
              </div>
              
              <div className="flex items-center gap-2 sm:gap-4">
                 <button 
                  onClick={() => setShowBulkPriceModal(true)}
                  className="flex items-center gap-2 px-4 py-2 hover:bg-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all"
                 >
                    <DollarSign size={14} /> Price
                 </button>
                 <button className="flex items-center gap-2 px-4 py-2 hover:bg-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all">
                    <Clock size={14} /> Block
                 </button>
                 <div className="w-px h-6 bg-white/10 mx-2" />
                 <button 
                  onClick={() => setListings(prev => prev.filter(l => !selectedIds.includes(l.id)))}
                  className="p-3 text-red-400 hover:bg-red-500/10 rounded-xl transition-all"
                 >
                    <Trash2 size={16} />
                 </button>
              </div>
            </div>
          </div>
        )}

        {/* Quick Edit Pricing Modal */}
        {showBulkPriceModal && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-[#2D2D2D]/60 backdrop-blur-sm" onClick={() => setShowBulkPriceModal(false)} />
            <div className="relative bg-white rounded-[2.5rem] p-10 max-w-sm w-full shadow-2xl animate-in zoom-in-95">
               <h3 className="text-xl font-bold mb-6">Bulk Price Adjustment</h3>
               
               <div className="flex bg-gray-100 p-1 rounded-2xl mb-6">
                 <button 
                  onClick={() => setPriceAdjustment({ ...priceAdjustment, type: 'flat' })}
                  className={`flex-1 py-3 text-[10px] font-black uppercase rounded-xl transition-all ${priceAdjustment.type === 'flat' ? 'bg-white shadow-sm' : 'text-gray-400'}`}
                 >
                   Flat Fee
                 </button>
                 <button 
                  onClick={() => setPriceAdjustment({ ...priceAdjustment, type: 'percent' })}
                  className={`flex-1 py-3 text-[10px] font-black uppercase rounded-xl transition-all ${priceAdjustment.type === 'percent' ? 'bg-white shadow-sm' : 'text-gray-400'}`}
                 >
                   Percentage
                 </button>
               </div>

               <div className="relative mb-8">
                  <span className="absolute left-6 top-1/2 -translate-y-1/2 font-black text-gray-400">
                    {priceAdjustment.type === 'flat' ? '£' : '%'}
                  </span>
                  <input 
                    type="number" 
                    value={priceAdjustment.value}
                    onChange={(e) => setPriceAdjustment({ ...priceAdjustment, value: parseInt(e.target.value) || 0 })}
                    className="w-full pl-12 pr-6 py-5 bg-gray-50 border-2 border-transparent focus:border-[#2D2D2D] rounded-2xl font-black text-lg outline-none transition-all"
                  />
                  <p className="text-[10px] font-bold text-gray-400 mt-2 px-2 uppercase tracking-widest">
                    Use negative numbers to decrease
                  </p>
               </div>

               <div className="flex flex-col gap-3">
                  <button 
                    onClick={applyBulkPrice}
                    className="w-full bg-[#2D2D2D] text-white py-4 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-black transition-all shadow-xl"
                  >
                    Apply to {selectedIds.length} Desks
                  </button>
                  <button 
                    onClick={() => setShowBulkPriceModal(false)}
                    className="w-full py-3 text-xs font-bold text-gray-400 hover:text-black transition-all"
                  >
                    Cancel
                  </button>
               </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default ManageListings;
