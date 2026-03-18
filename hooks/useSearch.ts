import { useState, useMemo } from 'react';
import { SEARCH_RESULTS } from '../constants';
import { SearchFilters, Desk, DeskType, VibeType } from '../types';

const DEFAULT_FILTERS: SearchFilters = {
  priceMin: 5,
  priceMax: 1000,
  type: [],
  vibe: [],
  amenities: [],
  tubeLines: [],
  searchQuery: '',
  instantBook: false,
  selfCheckIn: false,
  stepFree: false,
  ergonomic: false,
  maxCommute: 15,
  isTeamMode: false,
  minCapacity: 1,
  duration: 'daily',
  startDate: '',
  endDate: ''
};

// Helper to shuffle array using Fisher-Yates algorithm
const shuffle = <T>(array: T[]): T[] => {
  const newArr = [...array];
  for (let i = newArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
  }
  return newArr;
};

// Simple hash function for stable randomization based on filters
const hashString = (str: string) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash) + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
};

export const useSearch = (initialOverride?: Partial<SearchFilters> | null) => {
  const [filters, setFilters] = useState<SearchFilters>(() => {
    const base = { ...DEFAULT_FILTERS, ...(initialOverride || {}) };
    // If meeting room is chosen, default duration should be hourly
    if (base.type.includes('Meeting Room')) {
      base.duration = 'hourly';
    }
    return base;
  });

  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (filters.priceMin > 5 || filters.priceMax < 1000) count++;
    if (filters.type.length > 0) count++;
    if (filters.vibe.length > 0) count++;
    if (filters.amenities.length > 0) count++;
    if (filters.tubeLines.length > 0) count++;
    if (filters.instantBook) count++;
    if (filters.selfCheckIn) count++;
    if (filters.stepFree) count++;
    if (filters.ergonomic) count++;
    if (filters.maxCommute < 15) count++;
    if (filters.isTeamMode) count++;
    if (filters.startDate || filters.endDate) count++;
    if (filters.duration !== 'daily' && filters.duration !== 'hourly') count++;
    if (filters.searchQuery) count++;
    return count;
  }, [filters]);

  const filteredResults = useMemo(() => {
    let results: Desk[] = [];
    
    try {
      results = SEARCH_RESULTS.filter(desk => {
        if (!desk) return false;

        // Team Mode Filter
        if (filters.isTeamMode && !desk.is_team_ready) return false;
        if (filters.isTeamMode && (desk.capacity || 0) < filters.minCapacity) return false;

        // Search Query Filter
        if (filters.searchQuery) {
          const query = filters.searchQuery.toLowerCase();
          const matchesTitle = desk.title?.toLowerCase().includes(query);
          const matchesNeighborhood = desk.neighborhood?.toLowerCase().includes(query);
          const matchesStation = desk.nearest_station?.name.toLowerCase().includes(query);
          if (!matchesTitle && !matchesNeighborhood && !matchesStation) return false;
        }

        // Price Filter - Note: In a real app we'd convert prices to common base
        // but here we just use daily as the base filter unit
        if (desk.price < filters.priceMin || desk.price > filters.priceMax) return false;

        // Desk Type Filter
        if (filters.type.length > 0 && !filters.type.includes(desk.type)) return false;

        // Vibe Filter
        if (filters.vibe.length > 0 && !filters.vibe.includes(desk.vibe)) return false;

        // Amenities Filter
        if (filters.amenities.length > 0) {
          const hasAllAmenities = filters.amenities.every(amenity => 
            desk.amenities?.includes(amenity)
          );
          if (!hasAllAmenities) return false;
        }

        // Tube Line Filter
        if (filters.tubeLines.length > 0) {
          const stationLines = desk.nearest_station?.lines || [];
          const hasSelectedLine = filters.tubeLines.some(line => stationLines.includes(line));
          if (!hasSelectedLine) return false;
        }

        // Commute Proximity Filter
        const walkTime = desk.nearest_station?.distance || desk.commute?.walkTime || 0;
        if (walkTime > filters.maxCommute) return false;

        // Toggles
        if (filters.instantBook && !desk.instantBook) return false;
        if (filters.selfCheckIn && !desk.selfCheckIn) return false;
        if (filters.stepFree && !desk.stepFree) return false;
        if (filters.ergonomic && !desk.ergonomic) return false;

        return true;
      });
    } catch (error) {
      console.error("Filtering logic error:", error);
      results = SEARCH_RESULTS;
    }

    // RANDOMISATION AND DISPLAY LOGIC
    let processed = shuffle(results);

    if (activeFiltersCount > 0) {
      const seed = hashString(JSON.stringify(filters));
      const randomLimit = 4 + (seed % 9); 
      return processed.slice(0, Math.min(processed.length, randomLimit));
    } else {
      return processed.slice(0, Math.max(12, processed.length));
    }
  }, [filters, activeFiltersCount]);

  const updateFilter = (key: keyof SearchFilters, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const toggleArrayFilter = (key: 'type' | 'vibe' | 'amenities' | 'tubeLines', value: any) => {
    setFilters(prev => {
      const currentArray = prev[key] as any[];
      const newArray = currentArray.includes(value)
        ? currentArray.filter(v => v !== value)
        : [...currentArray, value];
      
      // Auto-switch duration if primary type changes to/from Meeting Room
      let newDuration = prev.duration;
      if (key === 'type') {
        if (newArray.length === 1 && newArray.includes('Meeting Room')) {
          newDuration = 'hourly';
        } else if (!newArray.includes('Meeting Room')) {
          newDuration = 'daily';
        }
      }

      return { ...prev, [key]: newArray, duration: newDuration };
    });
  };

  const resetFilters = () => setFilters(DEFAULT_FILTERS);

  return {
    filters,
    filteredResults,
    activeFiltersCount,
    updateFilter,
    toggleArrayFilter,
    resetFilters
  };
};