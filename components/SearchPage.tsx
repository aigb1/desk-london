import React, { useState, useEffect, useMemo, useRef } from 'react';
import { 
  Map as MapIcon, 
  List, 
  Star, 
  MapPin, 
  ChevronRight, 
  Sparkles, 
  Users, 
  Plus, 
  Minus, 
  Search, 
  Menu, 
  User as UserIcon,
  ChevronLeft,
  Filter,
  RefreshCcw,
  SlidersHorizontal,
  X,
  LogOut,
  LayoutDashboard,
  Briefcase,
  BarChart3,
  LayoutList
} from 'lucide-react';
import { Desk, SearchFilters, User } from '../types';
import { CATEGORIES } from '../constants';
import FilterBar from './FilterBar';
import FilterModal from './FilterModal';
import WorkspaceCard from './WorkspaceCard';
import { useSearch } from '../hooks/useSearch';
import Skeleton from './Skeleton';

interface Props {
  onDeskClick?: (desk: Desk) => void;
  onLogoClick?: () => void;
  initialFilters?: Partial<SearchFilters> | null;
  currentUser: User | null;
  onLoginClick?: () => void;
  onLogout?: () => void;
  onGuestDashboardClick?: () => void;
  onSupplierDashboardClick?: () => void;
  onConciergeClick?: () => void;
  isLoading?: boolean;
}

const BASE_SCALE_LAT = 5000;
const BASE_SCALE_LNG = 3200; 

const SearchPage: React.FC<Props> = ({ 
  onDeskClick, 
  onLogoClick, 
  initialFilters,
  currentUser,
  onLoginClick,
  onLogout,
  onGuestDashboardClick,
  onSupplierDashboardClick,
  onConciergeClick,
  isLoading
}) => {
  const { 
    filters, 
    filteredResults, 
    activeFiltersCount, 
    updateFilter, 
    toggleArrayFilter, 
    resetFilters 
  } = useSearch(initialFilters);
  
  const [isMapView, setIsMapView] = useState(false);
  const [selectedDesk, setSelectedDesk] = useState<Desk | null>(null);
  const [hoveredDeskId, setHoveredDeskId] = useState<string | null>(null);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [zoom, setZoom] = useState(() => window.innerWidth < 768 ? 0.9 : 0.75);
  
  const listContainerRef = useRef<HTMLDivElement>(null);
  const horizontalScrollRef = useRef<HTMLDivElement>(null);

  const mapBounds = useMemo(() => {
    if (filteredResults.length === 0) return { center: { lat: 51.512, lng: -0.115 }, span: { lat: 0.02, lng: 0.02 } };
    let minLat = Infinity, maxLat = -Infinity, minLng = Infinity, maxLng = -Infinity;
    filteredResults.forEach(d => {
      minLat = Math.min(minLat, d.lat);
      maxLat = Math.max(maxLat, d.lat);
      minLng = Math.min(minLng, d.lng);
      maxLng = Math.max(maxLng, d.lng);
    });
    return {
      center: { lat: (minLat + maxLat) / 2, lng: (minLng + maxLng) / 2 },
      span: { lat: Math.max(0.005, maxLat - minLat), lng: Math.max(0.005, maxLng - minLng) }
    };
  }, [filteredResults]);

  const getMarkerPos = (lat: number, lng: number) => {
    const topPos = 50 - (lat - mapBounds.center.lat) * (BASE_SCALE_LAT * zoom);
    const leftPos = 50 + (lng - mapBounds.center.lng) * (BASE_SCALE_LNG * zoom);
    return { top: topPos, left: leftPos };
  };

  useEffect(() => {
    if (filteredResults.length > 0 && !selectedDesk) {
      setSelectedDesk(filteredResults[0]);
    }
  }, [filteredResults]);

  const handleZoomIn = () => setZoom(prev => Math.min(prev + 0.1, 2.5));
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 0.1, 0.4));

  const handleMarkerClick = (desk: Desk) => {
    setSelectedDesk(desk);
    if (window.innerWidth < 768 && horizontalScrollRef.current) {
      const index = filteredResults.findIndex(d => d.id === desk.id);
      if (index !== -1) {
        const cardWidth = horizontalScrollRef.current.offsetWidth * 0.85 + 16;
        horizontalScrollRef.current.scrollTo({ left: index * cardWidth, behavior: 'smooth' });
      }
    }
    if (window.innerWidth >= 768) {
      const element = document.getElementById(`desk-${desk.id}`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    }
  };

  const handleCategorySelection = (categoryId: string) => {
    if (filters.amenities.length === 1 && filters.amenities.includes(categoryId)) {
      updateFilter('amenities', []);
    } else {
      updateFilter('amenities', [categoryId]);
    }
  };

  return (
    <div className="h-screen flex flex-col bg-white overflow-hidden pt-[72px] md:pt-[88px]">
      
      <div className="bg-white border-b border-gray-100 shadow-sm md:shadow-none shrink-0 z-10">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex items-center gap-6">
          
          <div className="flex-1 flex items-center gap-8 overflow-x-auto hide-scrollbar scroll-smooth">
            {CATEGORIES.map((cat) => (
              <button 
                key={cat.id}
                onClick={() => handleCategorySelection(cat.id)}
                className={`flex flex-col items-center gap-2 pb-2 border-b-2 transition-all min-w-max group
                  ${filters.amenities.includes(cat.id) 
                    ? 'border-[#2D2D2D] text-[#2D2D2D]' 
                    : 'border-transparent text-gray-500 hover:text-black hover:border-gray-200'}`}
              >
                <div className={`transition-transform group-hover:scale-110 ${filters.amenities.includes(cat.id) ? 'scale-110' : ''}`}>
                  {React.cloneElement(cat.icon as React.ReactElement, { size: 24, strokeWidth: 1.5 })}
                </div>
                <span className="text-[11px] font-bold whitespace-nowrap">{cat.label}</span>
              </button>
            ))}
          </div>

          <button 
            onClick={() => setIsFilterModalOpen(true)}
            className="flex items-center gap-2 px-4 py-3 border border-gray-200 rounded-xl text-[12px] font-bold hover:border-black transition-all shadow-sm bg-white shrink-0"
          >
            <SlidersHorizontal size={14} />
            <span className="hidden sm:inline">Filters</span>
            {activeFiltersCount > 0 && (
              <span className="ml-1 flex items-center justify-center w-5 h-5 bg-[#2D2D2D] text-white text-[10px] rounded-full">
                {activeFiltersCount}
              </span>
            )}
          </button>
        </div>
      </div>

      <FilterModal 
        isOpen={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
        filters={filters}
        updateFilter={updateFilter}
        toggleArrayFilter={toggleArrayFilter}
        resetFilters={resetFilters}
        resultsCount={filteredResults.length}
      />

      <div className="flex-1 flex overflow-hidden relative">
        <div className="max-w-7xl mx-auto w-full flex-1 flex overflow-hidden">
          
          <div className={`flex-1 md:flex-[0.45] lg:flex-[0.55] bg-white transition-transform duration-500 z-10 
            ${isMapView ? 'hidden md:block translate-x-0' : 'block translate-x-0'}`}>
            <div ref={listContainerRef} className="h-full overflow-y-auto px-4 md:px-8 py-8 scroll-smooth hide-scrollbar pb-32">
              <div className="mb-8">
                <h3 className="text-[14px] font-bold text-[#2D2D2D] mb-1">
                  {isLoading ? <Skeleton className="h-4 w-48" /> : (activeFiltersCount > 0 ? `${filteredResults.length} curated matches for you` : `Over ${filteredResults.length} desks in London`)}
                </h3>
                <p className="text-[12px] text-gray-500 font-medium">
                  {isLoading ? <Skeleton className="h-3 w-64 mt-1" /> : "Find the perfect boutique hub for your next project"}
                </p>
              </div>

              {isLoading ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-6 md:gap-8 pb-40">
                  {[...Array(6)].map((_, i) => <WorkspaceCard key={i} isLoading />)}
                </div>
              ) : filteredResults.length === 0 ? (
                <div className="py-24 text-center">
                  <h4 className="text-xl font-bold mb-3">No matching hubs</h4>
                  <p className="text-sm text-gray-400 mb-10">Try clearing filters to find more independent spaces.</p>
                  <button onClick={resetFilters} className="bg-[#2D2D2D] text-white px-10 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl">Reset All</button>
                </div>
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-6 md:gap-8 pb-40">
                  {filteredResults.map((desk) => (
                    <div key={desk.id} id={`desk-${desk.id}`} className="scroll-mt-32">
                      <WorkspaceCard 
                        desk={desk} 
                        onClick={(d) => onDeskClick?.(d)} 
                        isTeamMode={filters.isTeamMode} 
                        isHovered={hoveredDeskId === desk.id}
                        onMouseEnter={() => setHoveredDeskId(desk.id)}
                        onMouseLeave={() => setHoveredDeskId(null)}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className={`flex-1 md:flex-[0.55] lg:flex-[0.45] relative bg-[#f7f7f7] border-l border-gray-100 transition-transform duration-500 overflow-hidden
            ${isMapView ? 'block translate-x-0' : 'hidden md:block'}`}>
            <div className="absolute inset-0 flex items-center justify-center bg-white">
              <div className="absolute inset-[-1000%] opacity-[0.04] pointer-events-none" style={{ transform: `scale(${1/zoom})` }}>
                <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                  <defs><pattern id="search-grid" width="120" height="120" patternUnits="userSpaceOnUse">
                    <path d="M 120 0 L 0 0 0 120" fill="none" stroke="#2D2D2D" strokeWidth="0.8"/>
                  </pattern></defs>
                  <rect width="100%" height="100%" fill="url(#search-grid)" />
                </svg>
              </div>
              {!isLoading && filteredResults.map((desk) => {
                const isMeetingRoom = desk.type === 'Meeting Room';
                const displayPrice = filters.isTeamMode 
                  ? (desk.price * (desk.capacity || 1) * 0.8).toFixed(0) 
                  : (isMeetingRoom ? Math.round(desk.price / 6) : desk.price);
                
                const pos = getMarkerPos(desk.lat, desk.lng);
                const isActive = selectedDesk?.id === desk.id;
                const isHovered = hoveredDeskId === desk.id;
                return (
                  <button 
                    key={desk.id}
                    onClick={() => handleMarkerClick(desk)}
                    onMouseEnter={() => setHoveredDeskId(desk.id)}
                    onMouseLeave={() => setHoveredDeskId(null)}
                    className={`absolute transition-all duration-300 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center group
                      ${isActive ? 'z-[60] scale-110' : isHovered ? 'z-[50] scale-105' : 'z-[40]'}`}
                    style={{ top: `${pos.top}%`, left: `${pos.left}%` }}
                  >
                    <div className={`px-3 py-1.5 rounded-full font-black text-[14px] shadow-xl transition-all border-[1.5px] tracking-tight
                      ${isActive || isHovered ? 'bg-[#2D2D2D] text-white border-[#2D2D2D]' : 'bg-white text-[#2D2D2D] border-gray-100 hover:scale-105 shadow-md'}`}>
                      £{displayPrice}{isMeetingRoom && <span className="text-[8px] ml-0.5 opacity-60">/hr</span>}
                    </div>
                    <div className={`w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] -mt-0.5
                      ${isActive || isHovered ? 'border-t-[#2D2D2D]' : 'border-t-white'}`} />
                  </button>
                );
              })}
            </div>

            <div className="absolute top-6 left-1/2 -translate-x-1/2 z-[100] hidden md:block">
              <button className="bg-white border border-gray-200 px-6 py-2.5 rounded-full shadow-lg text-[13px] font-bold hover:bg-gray-50 transition-all flex items-center gap-2">
                <RefreshCcw size={14} className="text-gray-400" /> Search as I move
              </button>
            </div>

            <div className="absolute bottom-10 right-10 flex flex-col gap-4 z-50 hidden md:flex">
               <div className="flex flex-col bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden pointer-events-auto">
                  <button onClick={handleZoomIn} className="p-3 hover:bg-gray-50 transition-colors text-[#2D2D2D]"><Plus size={18} strokeWidth={3} /></button>
                  <div className="h-px bg-gray-100" />
                  <button onClick={handleZoomOut} className="p-3 hover:bg-gray-50 transition-colors text-[#2D2D2D]"><Minus size={18} strokeWidth={3} /></button>
               </div>
               <button onClick={() => updateFilter('isTeamMode', !filters.isTeamMode)} className={`p-3.5 rounded-2xl shadow-xl border transition-all pointer-events-auto flex items-center justify-center ${filters.isTeamMode ? 'bg-[#2D2D2D] text-white border-[#2D2D2D]' : 'bg-white text-gray-400 border-gray-100 hover:border-[#2D2D2D]'}`}>
                  <Users size={20} />
               </button>
            </div>

            <div className="md:hidden absolute top-6 left-6 right-6 z-[100] flex items-center justify-between gap-3">
               <button onClick={() => setIsMapView(false)} className="w-10 h-10 bg-white rounded-full shadow-xl border border-gray-100 flex items-center justify-center text-[#2D2D2D]">
                  <ChevronLeft size={20} />
               </button>
               <button className="flex-1 bg-white border border-gray-200 px-6 py-3 rounded-full shadow-xl text-[12px] font-bold text-[#2D2D2D]">
                  Search as I move the map
               </button>
            </div>

            <div className={`md:hidden absolute bottom-10 left-0 right-0 z-[100] transition-transform duration-500 ${isMapView ? 'translate-y-0' : 'translate-y-full'}`}>
               <div ref={horizontalScrollRef} className="flex gap-4 px-6 overflow-x-auto snap-x snap-mandatory hide-scrollbar pb-4">
                  {filteredResults.map(desk => (
                    <div key={desk.id} className="w-[85%] shrink-0 snap-center">
                      <WorkspaceCard desk={desk} onClick={(d) => onDeskClick?.(d)} isTeamMode={filters.isTeamMode} variant="horizontal" />
                    </div>
                  ))}
               </div>
            </div>
          </div>
        </div>
      </div>

      <button 
        onClick={() => setIsMapView(!isMapView)}
        className="md:hidden fixed bottom-[90px] left-1/2 -translate-x-1/2 z-[130] bg-[#2D2D2D] text-white px-8 py-3.5 rounded-full shadow-2xl flex items-center gap-3 font-bold text-[14px] active:scale-95 transition-all border border-white/10"
      >
        {isMapView ? <List size={18} strokeWidth={3} /> : <MapIcon size={18} strokeWidth={3} />}
        {isMapView ? 'Show list' : 'Show map'}
      </button>
    </div>
  );
};

export default SearchPage;