import React, { useState, useEffect, useMemo } from 'react';
import { 
  Star, Heart, ChevronLeft, MapPin, Laptop, Coffee, 
  Building2, User, Key, ShieldCheck, Accessibility, 
  Sofa, Clock, Share, Info, ChevronRight, Minus, Plus, CreditCard,
  Wifi, Monitor, Dog, Zap, Check, TrainFront, X, Printer, Bike, Utensils, Lock, Shield, Send, Search,
  Briefcase
} from 'lucide-react';
import { Desk, BookingDetails, User as UserType, Role, Review, NearestStation } from '../types';
import AuthModal from './AuthModal';
import CheckoutFlow from './CheckoutFlow';
import Skeleton from './Skeleton';

interface Props {
  desk: Desk;
  onBack: () => void;
  currentUser: UserType | null;
  onAuthSuccess: (user: UserType) => void;
  onAuthError: (msg: string) => void;
  isLoading?: boolean;
}

const LINE_COLORS: Record<string, string> = {
  'Northern': 'bg-black',
  'Central': 'bg-[#E32017]',
  'Victoria': 'bg-[#0098D4]',
  'Jubilee': 'bg-[#A0A5A9]',
  'Piccadilly': 'bg-[#003688]',
  'District': 'bg-[#00782A]',
  'Circle': 'bg-[#FFD300]',
  'Metropolitan': 'bg-[#9B0058]',
  'Bakerloo': 'bg-[#B36305]',
  'Hammersmith & City': 'bg-[#F3A9BB]',
  'Elizabeth': 'bg-[#60399E]',
  'Waterloo & City': 'bg-[#95CDBA]',
  'DLR': 'bg-[#00A4A7]',
  'Overground': 'bg-[#EE7C0E]',
  'Thameslink': 'bg-[#FF6A13]',
  'Great Northern': 'bg-[#2D2D2D]',
  'Southern': 'bg-[#8CC63F]',
  'Tramlink': 'bg-[#82C341]'
};

const TransportBadge: React.FC<{ line: string }> = ({ line }) => {
  const colorClass = LINE_COLORS[line] || 'bg-gray-400';
  return (
    <div className="flex items-center gap-1.5 px-2 py-0.5 bg-white border border-gray-100 rounded-full shadow-sm">
      <div className={`w-2 h-2 rounded-full ${colorClass}`} />
      <span className="text-[9px] font-black uppercase tracking-widest text-[#2D2D2D]">{line}</span>
    </div>
  );
};

const ReviewCard: React.FC<{ review: Review }> = ({ review }) => (
  <div className="flex flex-col">
    <div className="flex items-center gap-3 mb-4">
      <img src={review.avatar} className="w-12 h-12 rounded-full object-cover shadow-sm" alt="" />
      <div>
        <h4 className="text-sm font-bold text-[#2D2D2D]">{review.user}</h4>
        <p className="text-xs text-gray-400 font-medium">London, UK · {review.date}</p>
      </div>
    </div>
    <div className="flex items-center gap-1 mb-3">
       {[...Array(5)].map((_, i) => (
         <Star key={i} size={10} fill={i < Math.floor(review.rating) ? "#2D2D2D" : "none"} className={i < Math.floor(review.rating) ? "text-[#2D2D2D]" : "text-gray-200"} />
       ))}
    </div>
    <p className="text-sm text-gray-600 leading-relaxed line-clamp-3 md:line-clamp-4">
      {review.comment}
    </p>
  </div>
);

const DeskDetailPage: React.FC<Props> = ({ desk, onBack, currentUser, onAuthSuccess, onAuthError, isLoading }) => {
  const isMeetingRoom = desk.type === 'Meeting Room';
  const [activeTab, setActiveTab] = useState<'hourly' | 'daily' | 'weekly' | 'monthly'>(isMeetingRoom ? 'hourly' : 'daily');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedSlots, setSelectedSlots] = useState<string[]>([]);
  const [deskCount, setDeskCount] = useState(1);
  const [isSaved, setIsSaved] = useState(false);
  const [isAmenitiesModalOpen, setIsAmenitiesModalOpen] = useState(false);
  const [isReviewsModalOpen, setIsReviewsModalOpen] = useState(false);
  const [isHostDrawerOpen, setIsHostDrawerOpen] = useState(false);
  const [isAboutExpanded, setIsAboutExpanded] = useState(false);
  const [hostMessage, setHostMessage] = useState('');
  
  // Mobile Widget State
  const [isMobileWidgetOpen, setIsMobileWidgetOpen] = useState(false);
  
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [isLoading]);

  const totalPrice = useMemo(() => {
    let base = desk.price;
    if (activeTab === 'hourly') {
      // Assuming desk.price is daily, hourly is roughly 1/6th for meeting rooms
      base = Math.round(desk.price / 6);
    } else if (activeTab === 'weekly') {
      base = desk.price * 4.5;
    } else if (activeTab === 'monthly') {
      base = desk.price * 18;
    }
    
    const timeMultiplier = activeTab === 'hourly' ? Math.max(1, selectedSlots.length) : 1;
    // CRITICAL LOGIC: For Meeting Rooms, the price is flat per room, not per attendee
    const countMultiplier = isMeetingRoom ? 1 : deskCount;
    
    return Math.floor(base * countMultiplier * timeMultiplier);
  }, [activeTab, deskCount, desk.price, selectedSlots, isMeetingRoom]);

  const handleBookNow = () => {
    if (!currentUser) {
      setIsMobileWidgetOpen(false);
      setIsAuthModalOpen(true);
    } else {
      setIsCheckoutOpen(true);
    }
  };

  const handleContactHost = () => {
    if (!currentUser) {
      setIsAuthModalOpen(true);
    } else {
      setIsHostDrawerOpen(true);
    }
  };

  const handleAuthSuccess = (role: Role) => {
    const newUser: UserType = {
      id: Math.random().toString(36).substr(2, 9),
      name: role === 'GUEST' ? 'Alex' : 'Oliver',
      email: role === 'GUEST' ? 'alex@desk.london' : 'oliver@host.london',
      role: role,
      avatar: `https://i.pravatar.cc/150?u=${role.toLowerCase()}`
    };
    onAuthSuccess(newUser);
    setIsAuthModalOpen(false);
  };

  const currentBooking: BookingDetails = {
    deskId: desk.id,
    type: activeTab,
    date: selectedDate,
    slots: selectedSlots,
    deskCount: deskCount,
    totalPrice: totalPrice
  };

  const amenityIcons: Record<string, React.ReactNode> = {
    'High-speed Wi-Fi': <Wifi size={20} />,
    'Barista Coffee': <Coffee size={20} />,
    'Private Booths': <User size={20} />,
    '24/7 Access': <Clock size={20} />,
    'Monitor Provided': <Monitor size={20} />,
    'Ergonomic Chair': <Sofa size={20} />,
    'Pet Friendly': <Dog size={20} />,
    'Meeting Rooms': <Building2 size={20} />,
    'Fiber Wifi': <Wifi size={20} />,
    'AC': <Zap size={20} />,
    'Printing': <Printer size={20} />,
    'Bike Storage': <Bike size={20} />,
    'Kitchenette': <Utensils size={20} />,
    'Lockers': <Lock size={20} />,
    '24/7 Security': <Shield size={20} />,
    'Standing Desks': <Zap size={20} />,
    'Quiet Zone': <Clock size={20} />
  };

  const getInitials = (text: string) => {
    return text
      .split(' ')
      .filter(Boolean)
      .map(n => n[0])
      .join('')
      .slice(0, 2)
      .toUpperCase();
  };

  const FallbackPlaceholder = () => (
    <div className="w-full h-full bg-[#f9f9f9] flex flex-col items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <svg width="100%" height="100%"><pattern id="detail-grid-bg" width="60" height="60" patternUnits="userSpaceOnUse"><path d="M 60 0 L 0 0 0 60" fill="none" stroke="#2D2D2D" strokeWidth="0.5"/></pattern><rect width="100%" height="100%" fill="url(#detail-grid-bg)"/></svg>
      </div>
      <span className="text-8xl font-black text-[#2D2D2D] tracking-tighter opacity-10">
        {getInitials(desk.title)}
      </span>
      <p className="mt-8 text-[12px] font-black uppercase tracking-[0.3em] text-gray-300">Workspace Hub</p>
    </div>
  );

  const toggleSlot = (slot: string) => {
    setSelectedSlots(prev => 
      prev.includes(slot) ? prev.filter(s => s !== slot) : [...prev, slot]
    );
  };

  const BookingForm = () => {
    const availableTabs = isMeetingRoom 
      ? (['hourly', 'daily'] as const) 
      : (['daily', 'weekly', 'monthly'] as const);

    const hourlySlots = [
      "08:00", "09:00", "10:00", "11:00", "12:00", "13:00", 
      "14:00", "15:00", "16:00", "17:00", "18:00", "19:00"
    ];

    const displayUnitPrice = useMemo(() => {
      if (activeTab === 'hourly') return Math.round(desk.price / 6);
      if (activeTab === 'weekly') return Math.round(desk.price * 4.5);
      if (activeTab === 'monthly') return Math.round(desk.price * 18);
      return desk.price;
    }, [activeTab, desk.price]);

    return (
      <>
        <div className="flex items-end justify-between mb-8">
          <div>
            <span className="text-3xl font-black text-[#2D2D2D]">£{displayUnitPrice}</span>
            <span className="text-gray-500 font-bold ml-1">/{activeTab === 'hourly' ? 'hour' : activeTab === 'monthly' ? 'month' : activeTab === 'weekly' ? 'week' : 'day'}</span>
          </div>
          <div className="flex items-center gap-1 text-[11px] font-black uppercase text-green-600">
            <Star size={12} fill="currentColor" /> {desk.rating.toFixed(1)}
          </div>
        </div>

        <div className="flex bg-gray-100 p-1 rounded-2xl mb-8">
          {availableTabs.map(t => (
            <button 
              key={t}
              onClick={() => { setActiveTab(t); setSelectedSlots([]); }}
              className={`flex-1 py-3 text-[11px] font-black uppercase tracking-widest rounded-xl transition-all
                ${activeTab === t ? 'bg-white shadow-md text-[#2D2D2D]' : 'text-gray-400 hover:text-gray-600'}`}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="space-y-3 mb-8 px-1">
            <div className="border-2 border-gray-100 rounded-3xl p-4 group focus-within:border-[#2D2D2D] transition-all bg-white">
              <label className="block text-[10px] font-black uppercase text-gray-400 mb-1">Select Date</label>
              <input 
                type="date" 
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full bg-transparent text-sm font-bold outline-none cursor-pointer text-[#2D2D2D]"
              />
            </div>

            {activeTab === 'hourly' && (
              <div className="space-y-2">
                <label className="block text-[10px] font-black uppercase text-gray-400 px-1">Available Hours</label>
                <div className="flex flex-col gap-2 max-h-48 overflow-y-auto pr-2 hide-scrollbar scroll-smooth border-2 border-gray-50 rounded-3xl p-3 bg-white">
                  {hourlySlots.map(slot => (
                    <button
                      key={slot}
                      onClick={() => toggleSlot(slot)}
                      className={`w-full py-3 px-4 rounded-xl text-xs font-black transition-all flex items-center justify-between border-2
                        ${selectedSlots.includes(slot) 
                          ? 'bg-[#2D2D2D] border-[#2D2D2D] text-white shadow-lg' 
                          : 'bg-white border-gray-100 text-gray-400 hover:border-gray-200'}`}
                    >
                      <span>{slot} - {parseInt(slot.split(':')[0]) + 1}:00</span>
                      {selectedSlots.includes(slot) && <Check size={14} />}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="border-2 border-gray-100 rounded-3xl p-4 flex items-center justify-between bg-white">
              <div>
                <label className="block text-[10px] font-black uppercase text-gray-400 mb-1">{isMeetingRoom ? 'Estimated Attendees' : 'Number of Desks'}</label>
                <span className="text-sm font-bold">{deskCount} {isMeetingRoom ? 'Guest' : 'Desk'}{deskCount > 1 ? 's' : ''}</span>
              </div>
              <div className="flex items-center gap-3">
                  <button onClick={() => setDeskCount(Math.max(1, deskCount-1))} className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50"><Minus size={14}/></button>
                  <button onClick={() => setDeskCount(Math.min(desk.capacity || 10, deskCount+1))} className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50"><Plus size={14}/></button>
              </div>
            </div>
        </div>

        <div className="space-y-3 mb-8 px-2">
          {isMeetingRoom && (
            <div className="bg-[#E1E8E0]/30 p-3 rounded-xl border border-[#E1E8E0]/50 mb-4">
              <p className="text-[9px] font-black uppercase text-[#2D2D2D] tracking-widest flex items-center gap-2">
                <Info size={10} /> Flat rate room booking
              </p>
            </div>
          )}
          <div className="flex justify-between text-sm">
            <span className="text-gray-500 underline">
              £{displayUnitPrice} x {activeTab === 'hourly' ? Math.max(1, selectedSlots.length) : 1} {activeTab === 'hourly' ? 'hours' : 'units'}
            </span>
            <span className="font-bold">£{totalPrice}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500 underline">desk.london service fee</span>
            <span className="font-bold">£0</span>
          </div>
          <div className="h-px bg-gray-100 my-4" />
          <div className="flex justify-between items-center">
            <span className="font-bold">Total</span>
            <span className="text-xl font-black">£{totalPrice}</span>
          </div>
        </div>

        <button 
          onClick={handleBookNow}
          disabled={activeTab === 'hourly' && selectedSlots.length === 0}
          className={`w-full py-5 rounded-2xl font-black uppercase tracking-[0.15em] text-xs transition-all active:scale-[0.98] shadow-2xl flex items-center justify-center gap-3
            ${(activeTab === 'hourly' && selectedSlots.length === 0) 
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
              : 'bg-[#2D2D2D] hover:bg-black text-white'}`}
        >
          <CreditCard size={18} />
          {activeTab === 'hourly' && selectedSlots.length === 0 ? 'Select Slots' : 'Book Now'}
        </button>

        <div className="mt-6 flex items-center justify-center gap-2 text-gray-400">
          <Info size={14} />
          <p className="text-[10px] font-bold uppercase tracking-widest">You won't be charged yet</p>
        </div>
      </>
    );
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white pb-32 pt-24 md:pt-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="hidden md:flex justify-between mb-8">
            <div className="space-y-4">
              <Skeleton className="h-8 w-64" />
              <Skeleton className="h-4 w-48" />
            </div>
            <div className="flex gap-4">
              <Skeleton className="h-10 w-24" />
              <Skeleton className="h-10 w-24" />
            </div>
          </div>
          <Skeleton className="h-[300px] md:h-[500px] rounded-3xl mb-8" />
          <div className="flex flex-col md:flex-row gap-16">
            <div className="flex-1 space-y-12">
              <Skeleton className="h-24 w-full" />
              <Skeleton className="h-48 w-full" />
              <Skeleton className="h-32 w-full" />
              <Skeleton className="h-64 w-full" />
            </div>
            <div className="hidden md:block w-[400px]">
              <Skeleton className="h-[600px] w-full sticky top-24" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pb-32">
      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
        onSuccess={handleAuthSuccess} 
        onError={onAuthError}
      />
      
      {isCheckoutOpen && (
        <CheckoutFlow 
          isOpen={isCheckoutOpen} 
          onClose={() => setIsCheckoutOpen(false)} 
          desk={desk} 
          booking={currentBooking} 
        />
      )}

      {/* Mobile Slide-up Booking Widget */}
      <div 
        className={`fixed inset-0 z-[300] md:hidden transition-all duration-500 ease-in-out ${isMobileWidgetOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
      >
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setIsMobileWidgetOpen(false)} />
        <div 
          className={`absolute bottom-0 left-0 right-0 bg-white rounded-t-[3rem] p-8 shadow-2xl transition-transform duration-500 ease-in-out transform ${isMobileWidgetOpen ? 'translate-y-0' : 'translate-y-full'}`}
        >
          <div className="w-12 h-1.5 bg-gray-100 rounded-full mx-auto mb-8 cursor-pointer" onClick={() => setIsMobileWidgetOpen(false)} />
          <div className="max-h-[80vh] overflow-y-auto hide-scrollbar">
            <BookingForm />
          </div>
        </div>
      </div>

      {/* Host Message Drawer */}
      <div className={`fixed inset-0 z-[250] pointer-events-none transition-opacity duration-300 ${isHostDrawerOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0'}`}>
        <div className="absolute inset-0 bg-[#2D2D2D]/40 backdrop-blur-sm" onClick={() => setIsHostDrawerOpen(false)} />
        <div className={`absolute top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl transition-transform duration-500 ease-in-out transform ${isHostDrawerOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="flex flex-col h-full">
            <div className="p-8 border-b border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gray-100 rounded-full overflow-hidden">
                  <img src={desk.host?.avatar} className="w-full h-full object-cover" alt="" />
                </div>
                <div>
                  <h3 className="font-bold text-[#2D2D2D]">Message {desk.host?.name}</h3>
                  <p className="text-[10px] text-green-600 font-black uppercase tracking-widest">Typical response: 10 mins</p>
                </div>
              </div>
              <button onClick={() => setIsHostDrawerOpen(false)} className="p-2 hover:bg-gray-50 rounded-full transition-colors">
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-8 space-y-8 bg-white">
               <div className="p-6 bg-white border border-gray-100 rounded-[2rem] shadow-sm">
                  <p className="text-xs text-gray-500 leading-relaxed italic mb-4">
                    "Hi there! I'm {desk.host?.name}, the curator of {desk.buildingName}. Let me know if you have any questions about the space, Wi-Fi, or accessibility."
                  </p>
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                    <span className="text-[9px] font-black uppercase tracking-widest text-gray-400">Host Recommendation</span>
                  </div>
               </div>
               
               <div className="space-y-4">
                 <p className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-300 text-center">Conversation Start</p>
                 <div className="flex justify-end">
                    <div className="bg-[#2D2D2D] text-white px-5 py-3 rounded-2xl rounded-tr-none text-sm shadow-lg">
                      Hi {desk.host?.name}, I'm interested in booking a desk for {new Date(selectedDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}.
                    </div>
                 </div>
               </div>
            </div>

            <div className="p-8 border-t border-gray-100 bg-white">
              <div className="flex gap-4">
                <textarea 
                  value={hostMessage}
                  onChange={(e) => setHostMessage(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 bg-gray-50 border-2 border-transparent focus:border-[#2D2D2D] focus:bg-white rounded-[1.5rem] p-4 text-sm outline-none transition-all resize-none h-24"
                />
              </div>
              <button 
                onClick={() => {
                  if(!hostMessage.trim()) return;
                  setHostMessage('');
                }}
                className="w-full mt-4 bg-[#2D2D2D] text-white py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] flex items-center justify-center gap-2 hover:bg-black transition-all active:scale-95 shadow-xl"
              >
                <Send size={14} /> Send Message
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Amenities Modal */}
      {isAmenitiesModalOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-[#2D2D2D]/60 backdrop-blur-sm" onClick={() => setIsAmenitiesModalOpen(false)} />
          <div className="relative w-full max-w-2xl bg-white rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
            <div className="flex items-center justify-between px-8 py-6 border-b border-gray-100">
              <h2 className="text-xl font-bold">What this place offers</h2>
              <button onClick={() => setIsAmenitiesModalOpen(false)} className="p-2 hover:bg-gray-50 rounded-full transition-colors">
                <X size={20} />
              </button>
            </div>
            <div className="p-8 max-h-[70vh] overflow-y-auto hide-scrollbar">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6">
                {desk.amenities.slice(0, 12).map(amenity => (
                  <div key={amenity} className="flex items-center gap-4 text-gray-700">
                    {amenityIcons[amenity] || <Check size={20} />}
                    <span className="text-sm font-medium">{amenity}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Reviews Modal */}
      {isReviewsModalOpen && (
        <div className="fixed inset-0 z-[400] flex items-center justify-center p-0 md:p-8">
          <div className="absolute inset-0 bg-[#2D2D2D]/60 backdrop-blur-md" onClick={() => setIsReviewsModalOpen(false)} />
          <div className="relative w-full max-w-4xl h-full md:h-[90vh] bg-white md:rounded-[2.5rem] shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom duration-500">
             <div className="flex items-center justify-between px-8 py-6 border-b border-gray-100 shrink-0">
                <button onClick={() => setIsReviewsModalOpen(false)} className="p-2 hover:bg-gray-50 rounded-full transition-colors">
                  <X size={24} className="text-[#2D2D2D]" />
                </button>
                <div className="text-center">
                  <h2 className="text-lg font-black text-[#2D2D2D]">Guest Reviews</h2>
                  <div className="flex items-center justify-center gap-1 mt-0.5">
                    <Star size={12} fill="#2D2D2D" />
                    <span className="text-[11px] font-bold">{desk.rating.toFixed(1)} · {desk.reviewCount} reviews</span>
                  </div>
                </div>
                <div className="w-10" />
             </div>

             <div className="flex-1 overflow-y-auto p-8 md:p-12 hide-scrollbar bg-white">
                <div className="max-w-3xl mx-auto">
                   <div className="flex flex-col md:flex-row gap-12">
                      {/* Left: Summary (Airbnb style) */}
                      <div className="w-full md:w-1/3 space-y-6 sticky top-0 h-fit bg-white pb-8 md:pb-0">
                         <div className="flex items-center gap-4">
                            <h3 className="text-6xl font-black text-[#2D2D2D] tracking-tighter">{desk.rating.toFixed(1)}</h3>
                            <div className="flex flex-col">
                               <div className="flex gap-0.5">
                                  {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="#2D2D2D" />)}
                               </div>
                               <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mt-2">Overall Rating</p>
                            </div>
                         </div>
                         <div className="space-y-4">
                            {['Cleanliness', 'Accuracy', 'Communication', 'Location', 'Value'].map(stat => (
                              <div key={stat}>
                                <div className="flex justify-between items-center text-xs font-bold mb-1">
                                  <span>{stat}</span>
                                  <span>4.9</span>
                                </div>
                                <div className="h-1 bg-gray-100 rounded-full overflow-hidden">
                                   <div className="h-full bg-[#2D2D2D] w-[95%] rounded-full" />
                                </div>
                              </div>
                            ))}
                         </div>
                      </div>

                      {/* Right: Review List */}
                      <div className="flex-1 space-y-12">
                         <div className="relative mb-10">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                            <input 
                              type="text" 
                              placeholder="Search reviews" 
                              className="w-full pl-12 pr-6 py-4 bg-gray-50 border-2 border-transparent focus:border-[#2D2D2D] focus:bg-white rounded-2xl text-sm font-bold outline-none transition-all"
                            />
                         </div>
                         <div className="space-y-12">
                            {desk.reviews?.map(rev => (
                              <div key={rev.id} className="pb-12 border-b border-gray-50 last:border-0">
                                 <ReviewCard review={rev} />
                              </div>
                            ))}
                         </div>
                      </div>
                   </div>
                </div>
             </div>
          </div>
        </div>
      )}

      {/* Mobile Sticky Header (Nav) */}
      <div className="md:hidden sticky top-0 z-50 px-4 py-4 flex items-center justify-between glass">
        <button onClick={onBack} className="p-2 bg-white rounded-full shadow-md">
          <ChevronLeft size={20} />
        </button>
        <div className="flex items-center gap-2">
          <button className="p-2 bg-white rounded-full shadow-md"><Share size={18} /></button>
          <button onClick={() => setIsSaved(!isSaved)} className="p-2 bg-white rounded-full shadow-md">
            <Heart size={18} className={isSaved ? "fill-red-500 text-red-500" : "text-gray-800"} />
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 pt-24 pb-6 md:pt-32 md:pb-10">
        
        <div className="hidden md:flex items-start justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-[#2D2D2D] mb-2">{desk.title}</h1>
            <div className="flex items-center gap-4 text-sm font-medium">
              <div className="flex items-center gap-1">
                <Star size={14} fill="#2D2D2D" />
                <span>{desk.rating.toFixed(1)}</span>
                <span className="text-gray-400">·</span>
                <button onClick={() => setIsReviewsModalOpen(true)} className="underline font-bold">{desk.reviewCount} reviews</button>
              </div>
              <span className="text-gray-400">·</span>
              <div className="flex items-center gap-1 underline font-bold">
                <MapPin size={14} />
                <span>{desk.neighborhood}, London</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-2 text-sm font-bold underline hover:bg-gray-50 px-3 py-2 rounded-lg transition-all">
              <Share size={16} /> Share
            </button>
            <button 
              onClick={() => setIsSaved(!isSaved)}
              className="flex items-center gap-2 text-sm font-bold underline hover:bg-gray-50 px-3 py-2 rounded-lg transition-all"
            >
              <Heart size={16} className={isSaved ? "fill-red-500 text-red-500" : ""} />
              {isSaved ? 'Saved' : 'Save'}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-2 rounded-3xl overflow-hidden h-[300px] md:h-[500px] mb-8 md:mb-12 shadow-sm relative">
          <div className="md:col-span-2 h-full">
            {desk.image ? (
              <img src={desk.image} className="w-full h-full object-cover hover:brightness-95 transition-all" alt={desk.title} />
            ) : (
              <FallbackPlaceholder />
            )}
          </div>
          <div className="hidden md:grid grid-cols-1 grid-rows-2 gap-2 md:col-span-1 h-full">
            <img src={desk.additionalImages?.[0] || (desk.image ? `${desk.image}&sig=1` : "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800")} className="w-full h-full object-cover hover:brightness-95 transition-all" alt="" />
            <img src={desk.additionalImages?.[1] || (desk.image ? `${desk.image}&sig=2` : "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=800")} className="w-full h-full object-cover hover:brightness-95 transition-all" alt="" />
          </div>
          <div className="hidden md:grid grid-cols-1 grid-rows-2 gap-2 md:col-span-1 h-full">
            <img src={desk.additionalImages?.[2] || (desk.image ? `${desk.image}&sig=3` : "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&q=80&w=800")} className="w-full h-full object-cover hover:brightness-95 transition-all" alt="" />
            <img src={desk.additionalImages?.[3] || (desk.image ? `${desk.image}&sig=4` : "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=800")} className="w-full h-full object-cover hover:brightness-95 transition-all" alt="" />
          </div>
          <button className="absolute bottom-6 right-6 bg-white border border-[#2D2D2D] px-6 py-2 rounded-xl text-xs font-bold hover:bg-gray-50 transition-all shadow-lg flex items-center gap-2">
             Show all photos
          </button>
        </div>

        <div className="flex flex-col md:flex-row gap-16 relative">
          
          <div className="flex-1 space-y-12">
            
            {/* 1. TITLE & OPERATOR SECTION */}
            <div className="border-b border-gray-100 pb-4">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-[#2D2D2D] mb-1">
                    {desk.type} at {desk.buildingName || 'Private Hub'}
                  </h2>
                  <p className="text-gray-500 font-medium">
                    {desk.vibe} Vibe · High-end Furniture · Dedicated Support
                  </p>
                </div>
                {/* Operator Logo Replacement */}
                <div className="w-14 h-14 bg-white border border-gray-100 rounded-2xl flex items-center justify-center shrink-0 shadow-sm">
                   <div className="w-10 h-10 bg-[#2D2D2D] rounded-lg flex items-center justify-center">
                     <span className="text-white font-black text-[10px]">D.L</span>
                   </div>
                </div>
              </div>
            </div>

            {/* 2. ABOUT THE SPACE SECTION */}
            <div className="border-b border-gray-100 pb-12 pt-2">
               <h3 className="text-xl font-bold mb-6">About this space</h3>
               <div className="prose prose-sm font-medium text-gray-600 leading-[1.8]">
                 <p className={isAboutExpanded ? "mb-6" : "mb-0"}>
                   {desk.description || "Experience the best of London working in this beautifully curated workspace. Designed for productivity and comfort, our space offers everything a modern professional needs."}
                 </p>
                 
                 {isAboutExpanded && (
                   <div className="animate-in fade-in slide-in-from-top-2 duration-500">
                     <p className="mt-4 text-[13px] text-gray-500 leading-relaxed border-t border-gray-50 pt-6">
                       This hub also features an on-site wellness studio and rooftop breakout area for all members. Our community team is dedicated to fostering an environment where independent professionals can thrive and connect.
                     </p>
                   </div>
                 )}
               </div>
               
               <button 
                onClick={() => setIsAboutExpanded(!isAboutExpanded)}
                className="mt-6 flex items-center gap-1 font-bold underline underline-offset-4 text-sm hover:text-black transition-colors"
               >
                 {isAboutExpanded ? "Show less" : "Show more"} <ChevronRight size={16} className={`transition-transform duration-300 ${isAboutExpanded ? 'rotate-90' : ''}`} />
               </button>

               {/* Vibe, Tech, Access, Perks boxes - Always visible now */}
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mt-12">
                  <div className="flex gap-4">
                     <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center shrink-0 shadow-sm border border-gray-100/50">
                        <Zap size={20} className="text-[#2D2D2D]" />
                     </div>
                     <div>
                        <h4 className="font-bold text-sm mb-1 text-[#2D2D2D]">The Vibe</h4>
                        <p className="text-[13px] text-gray-500 leading-relaxed">Carefully curated for {desk.vibe.toLowerCase()} professionals. We prioritize deep focus and community synergy through architectural design.</p>
                     </div>
                  </div>
                  <div className="flex gap-4">
                     <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center shrink-0 shadow-sm border border-gray-100/50">
                        <Laptop size={20} className="text-[#2D2D2D]" />
                     </div>
                     <div>
                        <h4 className="font-bold text-sm mb-1 text-[#2D2D2D]">Tech & Specs</h4>
                        <p className="text-[13px] text-gray-500 leading-relaxed">Equipped with enterprise-grade 1Gbps fiber optic internet, ergonomic seating, and dual 4K monitor setups in dedicated zones.</p>
                     </div>
                  </div>
                  <div className="flex gap-4">
                     <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center shrink-0 shadow-sm border border-gray-100/50">
                        <Accessibility size={20} className="text-[#2D2D2D]" />
                     </div>
                     <div>
                        <h4 className="font-bold text-sm mb-1 text-[#2D2D2D]">Access Control</h4>
                        <p className="text-[13px] text-gray-500 leading-relaxed">Seamless 24/7 digital key access via your smartphone. Secure storage for personal belongings and on-site hospitality.</p>
                     </div>
                  </div>
                  <div className="flex gap-4">
                     <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center shrink-0 shadow-sm border border-gray-100/50">
                        <Briefcase size={20} className="text-[#2D2D2D]" />
                     </div>
                     <div>
                        <h4 className="font-bold text-sm mb-1 text-[#2D2D2D]">Community Perks</h4>
                        <p className="text-[13px] text-gray-500 leading-relaxed">Exclusive access to networking sessions, artisanal coffee bars, and discounted partner boardroom rates across London.</p>
                     </div>
                  </div>
               </div>
            </div>

            {/* 3. MEET/CONTACT YOUR HOST SECTION */}
            <div className="bg-[#E1E8E0]/20 p-8 rounded-3xl border border-[#E1E8E0]/40">
              <div className="flex items-center gap-4 mb-4">
                <img src={desk.host?.avatar || "https://i.pravatar.cc/150?u=host"} className="w-16 h-16 rounded-full object-cover shadow-md border-2 border-white" alt="" />
                <div>
                  <h3 className="font-bold text-lg">Meet your host, {desk.host?.name}</h3>
                  <p className="text-xs text-gray-500 font-bold uppercase tracking-wider">Joined desk.london in {desk.host?.joinedDate || "2024"}</p>
                </div>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed mb-6 italic">
                "{desk.host?.bio || "I am dedicated to providing the best workspace experience in London. My goal is to ensure you have everything you need for a productive session."}"
              </p>
              <button 
                onClick={handleContactHost}
                className="bg-[#2D2D2D] text-white px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-black transition-all active:scale-95 shadow-xl flex items-center gap-2"
              >
                <Send size={14} /> Contact Host
              </button>
            </div>

            {/* 4. WHAT THIS PLACE OFFERS SECTION */}
            <div className="border-b border-gray-100 pb-12">
               <h3 className="text-xl font-bold mb-8">What this place offers</h3>
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6">
                  {desk.amenities.slice(0, 8).map(amenity => (
                    <div key={amenity} className="flex items-center gap-4 text-gray-700">
                      {amenityIcons[amenity] || <Check size={20} />}
                      <span className="text-sm font-medium">{amenity}</span>
                    </div>
                  ))}
               </div>
               <button 
                onClick={() => setIsAmenitiesModalOpen(true)}
                className="mt-10 bg-white border border-[#2D2D2D] px-10 py-4 rounded-2xl text-sm font-bold hover:bg-black hover:text-white transition-all"
               >
                 Show all {Math.min(12, desk.amenities.length)} amenities
               </button>
            </div>

            {/* 5. NEAREST TUBE SECTION (Repositioned) */}
            <div className="border-b border-gray-100 pb-12">
               {(desk.nearby_stations || [desk.nearest_station]).filter(Boolean).length > 0 && (
                <div className="space-y-4">
                  <h3 className="text-xl font-bold mb-6">Nearby transport</h3>
                  <div className="grid grid-cols-1 gap-4">
                    {(desk.nearby_stations || [desk.nearest_station]).map((station, idx) => (
                      station && (
                        <div key={idx} className="p-6 bg-white border border-gray-100 rounded-3xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 animate-in fade-in duration-700">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-white rounded-2xl shadow-sm border border-gray-50 flex items-center justify-center">
                              <TrainFront size={22} className="text-[#2D2D2D]" />
                            </div>
                            <div>
                              <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-1">Nearest Hub</h4>
                              <p className="text-sm font-bold text-[#2D2D2D]">
                                {station.distance} min walk to {station.name}
                              </p>
                            </div>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {station.lines.map(line => (
                              <TransportBadge key={line} line={line} />
                            ))}
                          </div>
                        </div>
                      )
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* 6. WHERE YOU'LL BE (MAP) SECTION */}
            <div className="border-b border-gray-100 pb-12">
               <h3 className="text-xl font-bold mb-6">Where you'll be</h3>
               <div className="aspect-[21/9] bg-[#E1E8E0] rounded-3xl relative overflow-hidden group shadow-inner">
                  <div className="absolute inset-0 bg-[#e5e5e5]">
                    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                      <pattern id="detail-grid" width="60" height="60" patternUnits="userSpaceOnUse">
                        <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#2D2D2D" strokeWidth="0.1"/>
                      </pattern>
                      <rect width="100%" height="100%" fill="url(#detail-grid)" />
                    </svg>
                  </div>
                  {desk.nearest_station && (
                    <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 800 300">
                       <path 
                        d="M 400 150 L 450 150 L 450 120 L 520 120" 
                        fill="none" 
                        stroke="#2D2D2D" 
                        strokeWidth="3" 
                        strokeDasharray="5,5"
                        className="opacity-40"
                       />
                       <circle cx="520" cy="120" r="8" fill="white" stroke="#2D2D2D" strokeWidth="3" />
                       <text x="535" y="125" className="text-[10px] font-black uppercase tracking-widest fill-[#2D2D2D]">
                         {desk.nearest_station.name}
                       </text>
                    </svg>
                  )}
                  <div className="absolute inset-0 flex items-center justify-center">
                     <div className="w-10 h-10 bg-[#2D2D2D] border-4 border-white rounded-full shadow-2xl animate-bounce" />
                  </div>
               </div>
               <div className="mt-4 flex items-center justify-between">
                 <div>
                   <p className="text-sm font-bold text-[#2D2D2D]">{desk.neighborhood}, London</p>
                   <p className="text-sm text-gray-500">Exact location provided after booking.</p>
                 </div>
                 {desk.nearest_station && (
                    <div className="text-right hidden sm:block">
                       <p className="text-xs font-black text-[#2D2D2D] uppercase tracking-widest">{desk.nearest_station.distance} min walk</p>
                       <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">To Station</p>
                    </div>
                 )}
               </div>
            </div>

            {/* 7. REVIEWS SECTION */}
            <div className="pb-12">
               <div className="flex items-center gap-2 mb-10">
                  <Star size={20} fill="#2D2D2D" />
                  <h3 className="text-xl font-black text-[#2D2D2D]">{desk.rating.toFixed(1)} · {desk.reviewCount} reviews</h3>
               </div>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
                  {desk.reviews?.slice(0, 6).map(rev => (
                    <div key={rev.id}>
                       <ReviewCard review={rev} />
                    </div>
                  ))}
               </div>
               <button 
                onClick={() => setIsReviewsModalOpen(true)}
                className="mt-12 bg-white border-2 border-[#2D2D2D] px-10 py-4 rounded-2xl text-sm font-black uppercase tracking-widest hover:bg-[#2D2D2D] hover:text-white transition-all active:scale-95 shadow-sm"
               >
                 Show all {desk.reviewCount} reviews
               </button>
            </div>
          </div>

          {/* Desktop Sidebar - Hidden on Mobile */}
          <div className="hidden md:block md:w-[400px] shrink-0">
             <div className="sticky top-24 bg-white border border-gray-200 rounded-[2.5rem] p-8 shadow-2xl">
                <BookingForm />
             </div>
          </div>
        </div>
      </div>

      {/* Mobile Sticky Footer - Airbnb Style */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-[260] bg-white border-t border-gray-100 px-6 py-4 flex items-center justify-between animate-in slide-in-from-bottom duration-500 pb-safe-area-inset-bottom">
        <div>
          <div className="flex items-baseline gap-1">
            <span className="text-lg font-black text-[#2D2D2D]">£{totalPrice}</span>
            <span className="text-gray-500 text-xs font-bold">/{activeTab === 'hourly' ? 'hr' : activeTab === 'monthly' ? 'mo' : activeTab === 'weekly' ? 'wk' : 'day'}</span>
          </div>
          <button 
            onClick={() => setIsMobileWidgetOpen(true)}
            className="text-[10px] font-black uppercase text-[#2D2D2D] underline underline-offset-2"
          >
            {new Date(selectedDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}
          </button>
        </div>
        <button 
          onClick={() => setIsMobileWidgetOpen(true)}
          className="bg-[#2D2D2D] text-white px-10 py-3.5 rounded-2xl font-black uppercase tracking-[0.15em] text-[10px] shadow-xl active:scale-95 transition-all"
        >
          Book Now
        </button>
      </div>
    </div>
  );
};

export default DeskDetailPage;