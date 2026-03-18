import React from 'react';
import { 
  Building2, 
  Dog, 
  Clock, 
  Palette, 
  VolumeX, 
  Library, 
  ShieldCheck, 
  Zap, 
  Key,
  Mic,
  Sun,
  HeartPulse,
  PhoneCall,
  Paintbrush,
  Flower2,
  Coffee,
  Users
} from 'lucide-react';
import { Category, Neighborhood, Desk, ValueProp, NeighborhoodMeta } from './types';

export const NEIGHBORHOOD_METADATA: Record<string, NeighborhoodMeta> = {
  'Soho': {
    vibe: 'Luxury & Creative',
    description: 'Work in the beating heart of London’s media district. Soho offers an electric atmosphere with high-end amenities and exclusive member clubs.',
    lunchSpots: ['Dishoom', 'Bao Soho', 'The Palomar'],
    commuteLines: ['Central', 'Northern', 'Bakerloo', 'Elizabeth'],
    category: 'Central'
  },
  'Mayfair': {
    vibe: 'Ultra-Premium & Private',
    description: 'Discreet, high-end private offices in London’s most prestigious postcode. Perfect for family offices and hedge funds.',
    lunchSpots: ['Scott’s', 'Sexy Fish', 'Amazonico'],
    commuteLines: ['Jubilee', 'Central', 'Piccadilly'],
    category: 'Central'
  },
  'Fitzrovia': {
    vibe: 'Media & Design Hub',
    description: 'A sophisticated blend of residential charm and commercial innovation. Home to top architects and creative agencies.',
    lunchSpots: ['Riding House Cafe', 'Circolo Popolare', 'Honey & Co'],
    commuteLines: ['Northern', 'Victoria', 'Central'],
    category: 'Central'
  },
  'Holborn': {
    vibe: 'Legal & Intellectual',
    description: 'The historic center of the legal profession. Professional, quiet, and exceptionally well-connected to Midtown.',
    lunchSpots: ['Noble Rot', 'Rosewood Courtyard', 'The Hoxton'],
    commuteLines: ['Central', 'Piccadilly'],
    category: 'Central'
  },
  'Bank': {
    vibe: 'Corporate & Fast-paced',
    description: 'The epicentre of global finance. Historic architecture meets state-of-the-art boardrooms for serious professionals.',
    lunchSpots: ['The Ned', '1 Lombard Street', 'Caravan'],
    commuteLines: ['Central', 'Northern', 'Waterloo & City', 'DLR'],
    category: 'The City'
  },
  'Liverpool St': {
    vibe: 'Global Tech & Finance',
    description: 'Where the City meets the Silicon Roundabout. High-energy, modern skyscrapers with unbeatable transport links.',
    lunchSpots: ['Duck & Waffle', 'Sushisamba', 'Eataly'],
    commuteLines: ['Elizabeth', 'Central', 'Circle', 'Overground'],
    category: 'The City'
  },
  'Old St': {
    vibe: 'Tech & Innovation',
    description: 'Silicon Roundabout is the global hub for fintech and deep tech. Fast-paced, well-connected, and filled with ambitious talent.',
    lunchSpots: ['Nightjar', 'Bone Daddies', 'Ozone Coffee'],
    commuteLines: ['Northern', 'Great Northern'],
    category: 'The City'
  },
  'Clerkenwell': {
    vibe: 'Architectural & Artisan',
    description: 'London’s design district. Warehouse conversions, hidden courtyards, and a high concentration of design studios.',
    lunchSpots: ['St. John', 'Moro', 'Granger & Co'],
    commuteLines: ['Elizabeth', 'Thameslink', 'Circle'],
    category: 'The City'
  },
  'Shoreditch': {
    vibe: 'Art & Startup',
    description: 'The creative soul of East London. Ideal for tech startups and artists looking for sunlit warehouse lofts and pet-friendly workspaces.',
    lunchSpots: ['Smokestak', 'Gloria', 'Boxpark'],
    commuteLines: ['Northern', 'Overground'],
    category: 'East'
  },
  'Hackney': {
    vibe: 'Creative & Green',
    description: 'The pulse of modern East London. From London Fields to Mare Street, find inspiring spaces in former industrial giants.',
    lunchSpots: ['Brat', 'Pophams', 'E5 Bakehouse'],
    commuteLines: ['Overground'],
    category: 'East'
  },
  'Canary Wharf': {
    vibe: 'Tech & Finance',
    description: 'Sky-high productivity in London’s corporate fortress. Focus on high-speed fiber, panoramic Thames views, and professional executive suites.',
    lunchSpots: ['The Ivy in the Park', 'Roka', 'Mercato Metropolitano'],
    commuteLines: ['Jubilee', 'Elizabeth', 'DLR'],
    category: 'East'
  },
  'Stratford': {
    vibe: 'Growth & Opportunity',
    description: 'Innovation at the Olympic Park. Modern, expansive campuses with world-class facilities and high-speed rail access.',
    lunchSpots: ['Darkhorse', 'Westfield Hall', 'Unity Kitchen'],
    commuteLines: ['Central', 'Jubilee', 'Elizabeth', 'DLR'],
    category: 'East'
  }
};

export const CATEGORIES: Category[] = [
  { id: 'Skyscraper Views', label: 'Skyscraper Views', icon: <Building2 className="w-6 h-6" /> },
  { id: 'Pet Friendly', label: 'Pet Friendly', icon: <Dog className="w-6 h-6" /> },
  { id: '24/7 Access', label: '24/7 Access', icon: <Clock className="w-6 h-6" /> },
  { id: 'Creative Studios', label: 'Creative Studios', icon: <Palette className="w-6 h-6" /> },
  { id: 'Quiet Zones', label: 'Quiet Zones', icon: <VolumeX className="w-6 h-6" /> },
  { id: 'Library Vibes', label: 'Library Vibes', icon: <Library className="w-6 h-6" /> },
  { id: 'Roof Terraces', label: 'Roof Terraces', icon: <Sun className="w-6 h-6" /> },
  { id: 'Podcast Studios', label: 'Podcast Studios', icon: <Mic className="w-6 h-6" /> },
  { id: 'Private Booths', label: 'Phone Booths', icon: <PhoneCall className="w-6 h-6" /> },
  { id: 'Wellness Rooms', label: 'Wellness Rooms', icon: <HeartPulse className="w-6 h-6" /> },
  { id: 'Artisan Lofts', label: 'Artisan Lofts', icon: <Paintbrush className="w-6 h-6" /> },
  { id: 'Garden Access', label: 'Garden Access', icon: <Flower2 className="w-6 h-6" /> },
  { id: 'Barista Coffee', label: 'Coffee Bars', icon: <Coffee className="w-6 h-6" /> },
  { id: 'Meeting Rooms', label: 'Boardrooms', icon: <Users className="w-6 h-6" /> },
];

export const NEIGHBORHOODS: Neighborhood[] = [
  { id: 'soho', name: 'Soho', image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&q=80&w=800', count: 42 },
  { id: 'shoreditch', name: 'Shoreditch', image: 'https://images.unsplash.com/photo-1529655683826-aba9b3e77383?auto=format&fit=crop&q=80&w=800', count: 38 },
  { id: 'canary', name: 'Canary Wharf', image: 'https://images.unsplash.com/photo-1549414436-1e68783ed3c1?auto=format&fit=crop&q=80&w=800', count: 25 },
  { id: 'mayfair', name: 'Mayfair', image: 'https://images.unsplash.com/photo-1517733948473-ef91937f1970?auto=format&fit=crop&q=80&w=800', count: 18 },
  { id: 'hackney', name: 'Hackney', image: 'https://images.unsplash.com/photo-1533929736458-ca588d08c8be?auto=format&fit=crop&q=80&w=800', count: 31 },
  { id: 'old-st', name: 'Old St', image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800', count: 19 },
];

export const MOCK_REVIEWS = [
  { id: 'r1', user: 'Alex M.', avatar: 'https://i.pravatar.cc/150?u=alex', rating: 5, date: 'October 2026', comment: 'Absolutely stunning space. The light in the morning is perfect for deep focus.' },
  { id: 'r2', user: 'Sarah J.', avatar: 'https://i.pravatar.cc/150?u=sarah', rating: 4.8, date: 'September 2026', comment: 'Great coffee and the community is very welcoming. Wi-Fi was rock solid.' },
  { id: 'r3', user: 'James W.', avatar: 'https://i.pravatar.cc/150?u=james', rating: 5, date: 'August 2026', comment: 'Best desk I have used in London. Easy access and very quiet.' },
  { id: 'r4', user: 'Emily R.', avatar: 'https://i.pravatar.cc/150?u=emily', rating: 5, date: 'July 2026', comment: 'The vibe here is exactly what I needed. High ceilings and a great view.' },
  { id: 'r5', user: 'Michael K.', avatar: 'https://i.pravatar.cc/150?u=michael', rating: 4.9, date: 'June 2026', comment: 'Professional environment with excellent meeting rooms. Highly recommend for client pitches.' },
  { id: 'r6', user: 'Sophie T.', avatar: 'https://i.pravatar.cc/150?u=sophie', rating: 4.7, date: 'May 2026', comment: 'A bit busy during lunch hours, but the desk setup is top-notch. Very ergonomic.' },
  { id: 'r7', user: 'Daniel L.', avatar: 'https://i.pravatar.cc/150?u=daniel', rating: 5, date: 'April 2026', comment: 'Love the industrial loft feel. It really gets the creative juices flowing.' },
  { id: 'r8', user: 'Chloe B.', avatar: 'https://i.pravatar.cc/150?u=chloe', rating: 4.8, date: 'March 2026', comment: 'The staff are incredibly helpful. The check-in process was seamless.' },
  { id: 'r9', user: 'Liam O.', avatar: 'https://i.pravatar.cc/150?u=liam', rating: 5, date: 'February 2026', comment: 'Stunning views of the City. Great place to get work done and feel inspired.' },
  { id: 'r10', user: 'Olivia H.', avatar: 'https://i.pravatar.cc/150?u=olivia', rating: 4.9, date: 'January 2026', comment: 'Quiet zones are actually quiet! Perfect for when you need to grind out code.' },
  { id: 'r11', user: 'Noah G.', avatar: 'https://i.pravatar.cc/150?u=noah', rating: 5, date: 'December 2025', comment: 'Excellent fiber connection. Hosted several video calls without a single glitch.' },
  { id: 'r12', user: 'Ava W.', avatar: 'https://i.pravatar.cc/150?u=ava', rating: 4.8, date: 'November 2025', comment: 'Great snacks and tea selection. It\'s the little things that make a difference.' },
  { id: 'r13', user: 'William P.', avatar: 'https://i.pravatar.cc/150?u=william', rating: 5, date: 'October 2025', comment: 'Best coworking space in East London by far. Stylish and functional.' },
  { id: 'r14', user: 'Isabella C.', avatar: 'https://i.pravatar.cc/150?u=isabella', rating: 4.7, date: 'September 2025', comment: 'The location is unbeatable. Just a short walk from the station.' },
  { id: 'r15', user: 'Lucas S.', avatar: 'https://i.pravatar.cc/150?u=lucas', rating: 5, date: 'August 2025', comment: 'Highly collaborative atmosphere. Met several other founders here.' },
  { id: 'r16', user: 'Mia K.', avatar: 'https://i.pravatar.cc/150?u=mia', rating: 4.9, date: 'July 2025', comment: 'Clean, modern, and very well-maintained. The cleaning staff do a great job.' },
  { id: 'r17', user: 'Benjamin J.', avatar: 'https://i.pravatar.cc/150?u=benjamin', rating: 5, date: 'June 2025', comment: 'The digital key system is so convenient. No more fumbling for cards.' },
  { id: 'r18', user: 'Charlotte F.', avatar: 'https://i.pravatar.cc/150?u=charlotte', rating: 4.8, date: 'May 2025', comment: 'Quiet, professional, and well-equipped. Everything I need for a productive day.' }
];

const IMAGE_POOL = [
  "https://images.unsplash.com/photo-1497366216548-37526070297c",
  "https://images.unsplash.com/photo-1497215728101-856f4ea42174",
  "https://images.unsplash.com/photo-1497366811353-6870744d04b2",
  "https://images.unsplash.com/photo-1497366754035-f200968a6e72",
  "https://images.unsplash.com/photo-1524758631624-e2822e304c36",
  "https://images.unsplash.com/photo-1497215842964-222b430dc094",
  "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
  "https://images.unsplash.com/photo-1527192491265-7e15c55b1ed2",
  "https://images.unsplash.com/photo-1504384308090-c894fdcc538d",
  "https://images.unsplash.com/photo-1516321318423-f06f85e504b3",
  "https://images.unsplash.com/photo-1431540015161-0bf868a2d407",
  "https://images.unsplash.com/photo-1503387762-592dee58c160",
  "https://images.unsplash.com/photo-1556761175-b413da4baf72",
  "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad",
  "https://images.unsplash.com/photo-1529655683826-aba9b3e77383",
  "https://images.unsplash.com/photo-1549414436-1e68783ed3c1",
  "https://images.unsplash.com/photo-1517733948473-ef91937f1970",
  "https://images.unsplash.com/photo-1533929736458-ca588d08c8be",
  "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab",
  "https://images.unsplash.com/photo-1493397665622-8800976ba180",
  "https://images.unsplash.com/photo-1553028826-f4804a6dba3b",
  "https://images.unsplash.com/photo-1552664730-d307ca884978",
  "https://images.unsplash.com/photo-1571624436279-b272bfc752cd",
  "https://images.unsplash.com/photo-1491975474562-1f4e30bc9468",
  "https://images.unsplash.com/photo-1434626881859-194d67b2b86f",
  "https://images.unsplash.com/photo-1568992687345-269483b0f3ee",
  "https://images.unsplash.com/photo-1416339306562-f3d12fefd36f",
  "https://images.unsplash.com/photo-1497215728101-856f4ea42174"
];

const BASE_AMENITIES = ['High-speed Wi-Fi', 'AC', 'Monitor Provided', 'Ergonomic Chair'];

const HOST_JAMES = { name: 'James', avatar: 'https://i.pravatar.cc/150?u=james', bio: 'Curator', joinedDate: '2019' };

const getAmenities = (primary: string, others: string[] = []) => {
  return [...new Set([...BASE_AMENITIES, primary, ...others])];
};

// HELPER: Generate 12 variations for each neighborhood with randomized images
const generateResults = (neighborhood: string, prefix: string, startPrice: number) => {
  return Array.from({ length: 12 }, (_, i) => {
    // Randomize image selection from pool
    const imageIndex = (prefix.charCodeAt(0) + i) % IMAGE_POOL.length;
    const hasImage = (i + prefix.charCodeAt(0)) % 15 !== 0; // Occasionally skip image for demonstrating fallback
    
    const primaryLine = NEIGHBORHOOD_METADATA[neighborhood]?.commuteLines[0] || 'Central';
    const secondaryLine = NEIGHBORHOOD_METADATA[neighborhood]?.commuteLines[1] || 'Northern';
    
    return {
      id: `${prefix}${i + 1}`,
      title: `${neighborhood} ${['Studio', 'Hub', 'Loft', 'Club', 'Suite', 'Pod', 'Sanctuary', 'Collective', 'Works', 'Vault', 'Penthouse', 'Corner'][i]}`,
      neighborhood: neighborhood,
      buildingName: `${neighborhood} Landmark ${i + 1}`,
      rating: 4.8 + (i % 3) * 0.1,
      reviewCount: 20 + i * 8,
      price: startPrice + (i % 5) * 10,
      image: hasImage ? `${IMAGE_POOL[imageIndex]}?auto=format&fit=crop&q=80&w=800` : "",
      vibe: (['Quiet', 'Social', 'Creative', 'Client-Ready'][i % 4]) as any,
      type: (['Hot Desk', 'Dedicated Desk', 'Private Office', 'Meeting Room', 'Team Pod'][i % 5]) as any,
      amenities: getAmenities(['Library Vibes', 'Pet Friendly', 'Roof Terraces', 'Skyscraper Views'][i % 4], ['Barista Coffee', '24/7 Access']),
      lat: 51.5 + (Math.random() * 0.1),
      lng: -0.1 + (Math.random() * 0.1),
      nearest_station: { name: `${neighborhood} Station`, distance: 2 + (i % 5), lines: [primaryLine] },
      nearby_stations: [
        { name: `${neighborhood} Station`, distance: 2 + (i % 5), lines: [primaryLine] },
        { name: `${['Old Street', 'Farringdon', 'Angel', 'Oxford Circus'][i % 4]}`, distance: 7 + (i % 3), lines: [secondaryLine] },
        { name: `${['Barbican', 'Waterloo', 'Paddington', 'Kings Cross'][i % 4]}`, distance: 12 + (i % 2), lines: ['Circle', 'Jubilee'] }
      ],
      capacity: 1 + (i % 10),
      is_team_ready: i % 2 === 0,
      reviews: MOCK_REVIEWS,
      host: HOST_JAMES
    };
  });
};

export const SEARCH_RESULTS: Desk[] = [
  ...generateResults('Soho', 's', 55),
  ...generateResults('Mayfair', 'm', 90),
  ...generateResults('Fitzrovia', 'fz', 65),
  ...generateResults('Holborn', 'h', 45),
  ...generateResults('Bank', 'b', 80),
  ...generateResults('Liverpool St', 'ls', 70),
  ...generateResults('Old St', 'ost', 40),
  ...generateResults('Clerkenwell', 'cl', 50),
  ...generateResults('Shoreditch', 'sh', 45),
  ...generateResults('Hackney', 'hk', 35),
  ...generateResults('Canary Wharf', 'cw', 85),
  ...generateResults('Stratford', 'st', 30),
];

export const VALUE_PROPS: ValueProp[] = [
  {
    id: 'commissions',
    title: 'No Commissions',
    description: 'We believe in fair pricing. What you see is what the host gets, keeping desks affordable for everyone.',
    icon: <ShieldCheck className="w-10 h-10 text-[#2D2D2D]" />
  },
  {
    id: 'api',
    title: 'Instant API Booking',
    description: 'Our proprietary API syncs directly with building systems for real-time availability and instant confirmation.',
    icon: <Zap className="w-10 h-10 text-[#2D2D2D]" />
  },
  {
    id: 'digital-key',
    title: 'Digital Key Access',
    description: 'Receive your secure digital key directly on your phone as soon as your booking is confirmed.',
    icon: <Key className="w-10 h-10 text-[#2D2D2D]" />
  }
];