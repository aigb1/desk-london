import React, { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import { 
  X, Check, Laptop, Coffee, Building2, User, Key, 
  Accessibility, Sofa, TrainFront,
  Wifi, Printer, Bike, Utensils, Clock, Monitor, Zap,
  MapPin, ChevronRight
} from 'lucide-react';
import { SearchFilters, DeskType } from '../types';
import { NEIGHBORHOODS } from '../constants';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  filters: SearchFilters;
  updateFilter: (key: keyof SearchFilters, value: any) => void;
  toggleArrayFilter: (key: 'type' | 'vibe' | 'amenities' | 'tubeLines', value: any) => void;
  resetFilters: () => void;
  resultsCount: number;
}

const TUBE_LINES = [
  { name: 'Bakerloo', color: '#B26300' },
  { name: 'Central', color: '#DC241F' },
  { name: 'Circle', color: '#FFD329' },
  { name: 'District', color: '#007D32' },
  { name: 'Elizabeth', color: '#6950A1' },
  { name: 'Hammersmith & City', color: '#F4A9BE' },
  { name: 'Jubilee', color: '#A1A5A7' },
  { name: 'Metropolitan', color: '#9B0058' },
  { name: 'Northern', color: '#000000' },
  { name: 'Piccadilly', color: '#0019A8' },
  { name: 'Victoria', color: '#0098D8' },
  { name: 'Waterloo & City', color: '#95CDBA' },
  { name: 'DLR', color: '#00AFAD' },
  { name: 'Overground', color: '#EF7B10' },
  { name: 'Thameslink', color: '#FF6A13' },
  { name: 'Tramlink', color: '#82C341' }
];

const Section = ({ title, subtitle, children, border = true }: any) => (
  <div className={`py-8 ${border ? 'border-b border-gray-200' : ''}`}>
    <h3 className="text-2xl font-bold text-[#2D2D2D] mb-1">{title}</h3>
    {subtitle && <p className="text-base text-gray-500 mb-6">{subtitle}</p>}
    <div className={subtitle ? "mt-2" : "mt-6"}>
      {children}
    </div>
  </div>
);

const FilterModal: React.FC<Props> = ({ 
  isOpen, 
  onClose, 
  filters, 
  updateFilter, 
  toggleArrayFilter, 
  resetFilters, 
  resultsCount 
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  if (!isOpen) return null;

  const amenities = [
    { label: 'High-speed Wi-Fi', icon: <Wifi size={24} /> },
    { label: 'Barista Coffee', icon: <Coffee size={24} /> },
    { label: 'Meeting Rooms', icon: <Building2 size={24} /> },
    { label: 'Phone Booths', icon: <User size={24} /> },
    { label: 'Pet Friendly', icon: <Accessibility size={24} /> },
    { label: 'Printing', icon: <Printer size={24} /> },
    { label: 'Bike Storage', icon: <Bike size={24} /> },
    { label: 'Kitchenette', icon: <Utensils size={24} /> },
    { label: '24/7 Access', icon: <Clock size={24} /> },
    { label: 'Ergonomic Chair', icon: <Sofa size={24} /> },
    { label: 'Monitor Provided', icon: <Monitor size={24} /> },
    { label: 'Standing Desks', icon: <Zap size={24} /> },
  ];

  const deskTypes: { label: DeskType; icon: any; description: string }[] = [
    { label: 'Hot Desk', icon: <User size={24} />, description: 'A flexible seat in a common area.' },
    { label: 'Dedicated Desk', icon: <Laptop size={24} />, description: 'Your own desk in a shared office.' },
    { label: 'Private Office', icon: <Building2 size={24} />, description: 'A locked room for individuals or teams.' },
    { label: 'Meeting Room', icon: <Sofa size={24} />, description: 'Spaces for group collaboration and workshops.' },
  ];

  const modalContent = (
    <div className="fixed inset-0 z-[200] flex items-end sm:items-center justify-center p-0 sm:p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-in fade-in duration-300"
        onClick={onClose}
      />
      
      {/* Modal Container */}
      <div 
        ref={modalRef}
        className="relative w-full max-w-3xl bg-white sm:rounded-2xl shadow-2xl flex flex-col h-[90vh] sm:h-[85vh] overflow-hidden animate-in slide-in-from-bottom sm:zoom-in-95 duration-500"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 shrink-0">
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <X size={20} />
          </button>
          <h2 className="text-base font-bold">Filters</h2>
          <div className="w-10" />
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-6 sm:px-10 py-4 hide-scrollbar">
          
          {/* LOCATION SELECTION */}
          <Section title="Location" subtitle="Search by neighborhood">
             <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {NEIGHBORHOODS.map((n) => {
                  const isSelected = filters.searchQuery === n.name;
                  return (
                    <button 
                      key={n.id}
                      type="button"
                      onClick={() => updateFilter('searchQuery', isSelected ? '' : n.name)}
                      className={`flex flex-col gap-2 p-2 rounded-xl border-2 transition-all text-left
                        ${isSelected ? 'border-[#2D2D2D] bg-gray-50' : 'border-transparent hover:border-gray-200'}`}
                    >
                      <img src={n.image} className="w-full aspect-square rounded-lg object-cover" alt="" />
                      <span className="text-[13px] font-semibold text-[#2D2D2D] ml-1">{n.name}</span>
                    </button>
                  );
                })}
             </div>
          </Section>

          {/* Price Range */}
          <Section title="Price range" subtitle="Daily rates for desks including VAT">
            <div className="mt-8 mb-8 px-4">
              <div className="relative h-16 flex items-end gap-1 mb-2">
                {[...Array(28)].map((_, i) => (
                  <div 
                    key={i} 
                    className="flex-1 bg-gray-200 rounded-t-sm"
                    style={{ height: `${20 + Math.random() * 80}%` }}
                  />
                ))}
              </div>
              <div className="flex items-center gap-4">
                <div className="flex-1 border border-gray-300 rounded-xl p-3 focus-within:ring-2 focus-within:ring-[#2D2D2D] focus-within:border-transparent transition-all">
                  <label className="block text-xs font-medium text-gray-500 mb-1">Minimum</label>
                  <div className="flex items-center gap-1">
                    <span className="text-base font-medium">£</span>
                    <input 
                      type="number" 
                      value={filters.priceMin} 
                      onChange={(e) => updateFilter('priceMin', Number(e.target.value))}
                      className="w-full text-base font-medium outline-none bg-transparent"
                    />
                  </div>
                </div>
                <div className="w-4 h-px bg-gray-300 shrink-0" />
                <div className="flex-1 border border-gray-300 rounded-xl p-3 focus-within:ring-2 focus-within:ring-[#2D2D2D] focus-within:border-transparent transition-all">
                  <label className="block text-xs font-medium text-gray-500 mb-1">Maximum</label>
                  <div className="flex items-center gap-1">
                    <span className="text-base font-medium">£</span>
                    <input 
                      type="number" 
                      value={filters.priceMax} 
                      onChange={(e) => updateFilter('priceMax', Number(e.target.value))}
                      className="w-full text-base font-medium outline-none bg-transparent"
                    />
                  </div>
                </div>
              </div>
            </div>
          </Section>

          {/* Desk Type */}
          <Section title="Type of workspace" subtitle="Filter by the kind of space you need">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {deskTypes.map((type) => {
                const isSelected = filters.type.includes(type.label);
                return (
                  <button
                    key={type.label}
                    type="button"
                    onClick={() => toggleArrayFilter('type', type.label)}
                    className={`flex flex-col items-start gap-3 p-5 rounded-2xl border-2 transition-all text-left group
                      ${isSelected 
                        ? 'border-[#2D2D2D] bg-gray-50' 
                        : 'border-gray-200 hover:border-[#2D2D2D]'}`}
                  >
                    <div className={`${isSelected ? 'text-[#2D2D2D]' : 'text-gray-400 group-hover:text-[#2D2D2D]'} transition-colors`}>
                      {type.icon}
                    </div>
                    <div>
                      <span className="text-base font-bold text-[#2D2D2D] block">{type.label}</span>
                      <span className="text-sm text-gray-500">{type.description}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </Section>

          {/* Transport & Proximity Section */}
          <Section title="Transport" subtitle="Filter by proximity to tube lines">
            <div className="mb-10">
              <div className="grid grid-cols-4 sm:grid-cols-8 gap-4">
                {TUBE_LINES.map((line) => {
                  const isSelected = filters.tubeLines.includes(line.name);
                  return (
                    <button
                      key={line.name}
                      type="button"
                      onClick={() => toggleArrayFilter('tubeLines', line.name)}
                      className="flex flex-col items-center gap-2 group outline-none"
                    >
                      <div 
                        className={`w-12 h-12 rounded-full flex items-center justify-center transition-all border-2
                          ${isSelected ? 'scale-105 shadow-md' : 'border-transparent opacity-30 group-hover:opacity-100'}
                        `}
                        style={{ 
                          backgroundColor: isSelected ? line.color : 'white',
                          borderColor: isSelected ? 'white' : line.color 
                        }}
                      >
                        {isSelected && <Check size={20} className="text-white" strokeWidth={3} />}
                      </div>
                      <span className={`text-[10px] font-bold uppercase tracking-tight text-center leading-tight transition-colors
                        ${isSelected ? 'text-[#2D2D2D]' : 'text-gray-400'}`}>
                        {line.name.split(' ')[0]}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center mb-2">
                <h4 className="text-base font-bold text-[#2D2D2D]">Walking distance to station</h4>
                <span className="text-sm font-bold text-[#2D2D2D]">
                  Under {filters.maxCommute} mins
                </span>
              </div>
              <div className="relative pt-6 px-1">
                <input 
                  type="range" 
                  min="5" 
                  max="15" 
                  step="5"
                  value={filters.maxCommute}
                  onChange={(e) => updateFilter('maxCommute', Number(e.target.value))}
                  className="w-full h-1 bg-gray-200 rounded-full appearance-none cursor-pointer accent-[#2D2D2D]"
                />
              </div>
            </div>
          </Section>

          {/* Amenities */}
          <Section title="Amenities" subtitle="Essential features for your workday">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
              {amenities.map((item) => {
                const isSelected = filters.amenities.includes(item.label);
                return (
                  <button
                    key={item.label}
                    type="button"
                    onClick={() => toggleArrayFilter('amenities', item.label)}
                    className="flex items-center gap-4 py-3 group w-full text-left"
                  >
                    <div className={`w-6 h-6 rounded-md border-2 flex items-center justify-center transition-all
                      ${isSelected 
                        ? 'bg-[#2D2D2D] border-[#2D2D2D] text-white' 
                        : 'border-gray-300 group-hover:border-[#2D2D2D]'}`}>
                      {isSelected && <Check size={16} strokeWidth={3} />}
                    </div>
                    <span className="text-base font-medium text-gray-700 group-hover:text-[#2D2D2D] transition-colors flex-1">{item.label}</span>
                  </button>
                );
              })}
            </div>
          </Section>

          {/* Booking Options */}
          <Section title="Booking options" border={false}>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-lg font-bold text-[#2D2D2D]">Instant Book</h4>
                  <p className="text-sm text-gray-500">Secure your space instantly without waiting for host approval</p>
                </div>
                <button 
                  type="button"
                  onClick={() => updateFilter('instantBook', !filters.instantBook)}
                  className={`w-12 h-8 rounded-full transition-colors relative flex items-center shrink-0 ${filters.instantBook ? 'bg-[#2D2D2D]' : 'bg-gray-300'}`}
                >
                  <div className={`w-6 h-6 bg-white rounded-full transition-all shadow-md ${filters.instantBook ? 'translate-x-5' : 'translate-x-1'}`} />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-lg font-bold text-[#2D2D2D]">Self Check-in</h4>
                  <p className="text-sm text-gray-500">Access the building via digital key on your phone</p>
                </div>
                <button 
                  type="button"
                  onClick={() => updateFilter('selfCheckIn', !filters.selfCheckIn)}
                  className={`w-12 h-8 rounded-full transition-colors relative flex items-center shrink-0 ${filters.selfCheckIn ? 'bg-[#2D2D2D]' : 'bg-gray-300'}`}
                >
                  <div className={`w-6 h-6 bg-white rounded-full transition-all shadow-md ${filters.selfCheckIn ? 'translate-x-5' : 'translate-x-1'}`} />
                </button>
              </div>
            </div>
          </Section>
        </div>

        {/* Footer */}
        <div className="px-6 sm:px-10 py-4 border-t border-gray-200 flex items-center justify-between shrink-0 bg-white">
          <button 
            type="button"
            onClick={resetFilters}
            className="text-base font-bold underline underline-offset-4 hover:text-black transition-colors"
          >
            Clear all
          </button>
          <button 
            type="button"
            onClick={onClose}
            className="bg-[#2D2D2D] text-white px-8 py-3.5 rounded-xl text-base font-bold hover:bg-black transition-all active:scale-95 shadow-lg"
          >
            Show {resultsCount} desks
          </button>
        </div>
      </div>
    </div>
  );

  return ReactDOM.createPortal(modalContent, document.body);
};

export default FilterModal;