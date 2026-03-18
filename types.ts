import React from 'react';

export interface Category {
  id: string;
  label: string;
  icon: React.ReactNode;
}

export interface Neighborhood {
  id: string;
  name: string;
  image: string;
  count: number;
}

export interface NeighborhoodMeta {
  vibe: string;
  description: string;
  lunchSpots: string[];
  commuteLines: string[];
  category: 'Central' | 'The City' | 'East' | 'West';
}

export type DeskType = 'Hot Desk' | 'Dedicated Desk' | 'Private Office' | 'Meeting Room' | 'Team Pod';
export type VibeType = 'Quiet' | 'Social' | 'Creative' | 'Client-Ready';
export type Role = 'GUEST' | 'SUPPLIER' | 'TEAM_LEAD';
export type ListingStatus = 'Live' | 'Hidden' | 'Occupied';
export type LegalPageType = 'privacy' | 'terms' | 'faq' | 'about';

export interface Review {
  id: string;
  user: string;
  avatar: string;
  rating: number;
  date: string;
  comment: string;
}

export interface Host {
  name: string;
  avatar: string;
  bio: string;
  joinedDate: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: Role;
  teamId?: string;
}

export interface TeamMember {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: 'member' | 'admin';
  credits: number;
  status: 'active' | 'invited';
}

export interface TeamBooking {
  id: string;
  memberId: string;
  deskId: string;
  date: string;
  seatNumber: string;
}

export interface BookingDetails {
  deskId: string;
  type: 'hourly' | 'daily' | 'weekly' | 'monthly';
  date: string;
  slots: string[];
  deskCount: number;
  totalPrice: number;
  status?: 'upcoming' | 'completed' | 'cancelled';
}

export interface NearestStation {
  name: string;
  distance: number;
  lines: string[];
}

export interface Desk {
  id: string;
  title: string;
  neighborhood: string;
  buildingName?: string;
  rating: number;
  reviewCount: number;
  price: number;
  image: string;
  additionalImages?: string[];
  vibe: VibeType;
  type: DeskType;
  amenities: string[];
  lat: number;
  lng: number;
  instantBook?: boolean;
  selfCheckIn?: boolean;
  stepFree?: boolean;
  ergonomic?: boolean;
  description?: string;
  host?: Host;
  reviews?: Review[];
  commute?: {
    walkTime: number;
  };
  nearest_station?: NearestStation;
  nearby_stations?: NearestStation[];
  techSpecs?: {
    monitors?: boolean;
    fiber?: boolean;
  };
  status?: ListingStatus;
  nextBooking?: string;
  is_team_ready?: boolean;
  capacity?: number;
}

export interface ValueProp {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

export interface SearchFilters {
  priceMin: number;
  priceMax: number;
  type: DeskType[];
  vibe: VibeType[];
  amenities: string[];
  tubeLines: string[];
  searchQuery: string;
  instantBook: boolean;
  selfCheckIn: boolean;
  stepFree: boolean;
  ergonomic: boolean;
  maxCommute: number;
  isTeamMode: boolean;
  minCapacity: number;
  duration: 'hourly' | 'daily' | 'weekly' | 'monthly';
  startDate: string;
  endDate: string;
}