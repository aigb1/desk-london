import React, { useState, useEffect } from 'react';
import { 
  X, ChevronRight, ChevronLeft, MapPin, Laptop, 
  Coffee, Building2, User, Key, Check, Plus, Minus,
  Monitor, Sofa, Dog, Wifi, Zap, Sparkles, Loader2,
  Camera, Map as MapIcon, Users, ArrowRight, ShieldCheck,
  Building, Layout, Search, Image as ImageIcon
} from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import { DeskType, VibeType } from '../types';

interface Props {
  onCancel: () => void;
  onComplete: () => void;
}

const AddListingFlow: React.FC<Props> = ({ onCancel, onComplete }) => {
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [magicWriting, setMagicWriting] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    type: 'Hot Desk' as DeskType,
    vibe: 'Quiet' as VibeType,
    buildingName: '',
    address: '',
    neighborhood: '',
    transport: '',
    amenities: [] as string[],
    description: '',
    title: '',
    priceDaily: 45,
    priceWeekly: 180,
    priceMonthly: 650,
    capacity: 1,
    images: [] as string[],
    instantBook: true
  });

  const nextStep = () => {
    setStep(s => Math.min(s + 1, 10));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  const prevStep = () => {
    setStep(s => Math.max(s - 1, 0));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleAmenity = (amenity: string) => {
    setFormData(prev => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter(a => a !== amenity)
        : [...prev.amenities, amenity]
    }));
  };

  const handleMagicWrite = async () => {
    if (!formData.title || !formData.neighborhood) {
      alert("Please enter a title and neighborhood first!");
      return;
    }
    setMagicWriting(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const prompt = `Write a high-end Airbnb-style listing description for a London workspace called "${formData.title}" in ${formData.neighborhood}.
      Type: ${formData.type}, Vibe: ${formData.vibe}.
      Amenities: ${formData.amenities.join(', ')}.
      Keep it professional, inviting, and approximately 100 words.`;
      
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt
      });
      if (response.text) setFormData(prev => ({ ...prev, description: response.text }));
    } catch (err) {
      console.error(err);
    } finally {
      setMagicWriting(false);
    }
  };

  const amenityOptions = [
    { label: 'Fiber Wifi', icon: <Wifi size={32} /> },
    { label: 'Barista Coffee', icon: <Coffee size={32} /> },
    { label: 'Monitor Provided', icon: <Monitor size={32} /> },
    { label: 'Standing Desks', icon: <Zap size={32} /> },
    { label: 'Pet Friendly', icon: <Dog size={32} /> },
    { label: 'Step-free access', icon: <Building size={32} /> },
    { label: 'Meeting Rooms', icon: <Users size={32} /> },
    { label: '24/7 Access', icon: <Key size={32} /> },
  ];

  const deskTypes = [
    { id: 'Hot Desk', icon: <User size={32} />, desc: 'A flexible seat in a common area.' },
    { id: 'Dedicated Desk', icon: <Layout size={32} />, desc: 'Your own desk in a shared office.' },
    { id: 'Private Office', icon: <Building2 size={32} />, desc: 'A locked room for you or your team.' },
    { id: 'Meeting Room', icon: <Users size={32} />, desc: 'A space for group sessions.' },
  ];

  // Logic to determine if "Next" should be enabled
  const canContinue = () => {
    switch (step) {
      case 1: return !!formData.type;
      case 2: return !!formData.vibe;
      case 3: return !!formData.address && !!formData.neighborhood;
      case 5: return formData.amenities.length > 0;
      case 6: return true; // Photos: Bypassed for testing purposes
      case 7: return formData.title.length >= 5;
      case 8: return formData.description.length >= 20;
      case 9: return formData.priceDaily > 0 && formData.priceWeekly > 0 && formData.priceMonthly > 0;
      default: return true;
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans pt-[72px] md:pt-[88px] relative">
      
      {/* Main Flow Area */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden mb-24">
        
        {/* Left Side Visual (Split Screen like Airbnb) - Only on Desktop */}
        {step % 2 === 0 && step !== 0 && (
          <div className="hidden lg:flex lg:flex-1 bg-[#2D2D2D] items-center justify-center p-20 text-white relative">
            <div className="max-w-md animate-in fade-in slide-in-from-left duration-700">
               <span className="text-sm font-bold opacity-50 uppercase tracking-widest mb-4 block">Step {Math.ceil(step/3)}</span>
               <h2 className="text-5xl font-black tracking-tight leading-tight">
                 {step === 2 && "Tell us about your space"}
                 {step === 4 && "Where's your place located?"}
                 {step === 6 && "Stand out from the crowd"}
                 {step === 8 && "Final details & pricing"}
                 {step === 10 && "One last look!"}
               </h2>
            </div>
            {/* Background Grain/Texture */}
            <div className="absolute inset-0 opacity-10 pointer-events-none">
              <svg width="100%" height="100%"><filter id="noise"><feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch"/></filter><rect width="100%" height="100%" filter="url(#noise)"/></svg>
            </div>
          </div>
        )}

        {/* Content Panel */}
        <div className="flex-1 overflow-y-auto px-6 pt-12 pb-12 md:px-20 lg:px-32 flex flex-col items-center justify-start lg:justify-center hide-scrollbar bg-white">
          <div className="w-full max-w-xl animate-in fade-in slide-in-from-bottom-4 duration-500">
            
            {/* STEP 0: Intro */}
            {step === 0 && (
              <div className="text-center">
                <h1 className="text-5xl md:text-6xl font-black text-[#2D2D2D] mb-8 tracking-tighter">It’s easy to get started on desk.london</h1>
                <div className="space-y-12 text-left mt-16 max-w-md mx-auto">
                   <div className="flex gap-6">
                      <div className="text-4xl font-black text-gray-200">1</div>
                      <div>
                         <h4 className="font-bold text-lg">Tell us about your space</h4>
                         <p className="text-gray-500">Share some basic info, like where it is and how many people can work there.</p>
                      </div>
                   </div>
                   <div className="flex gap-6">
                      <div className="text-4xl font-black text-gray-200">2</div>
                      <div>
                         <h4 className="font-bold text-lg">Make it stand out</h4>
                         <p className="text-gray-500">Add 5 or more photos plus a title and description—we’ll help you out.</p>
                      </div>
                   </div>
                   <div className="flex gap-6">
                      <div className="text-4xl font-black text-gray-200">3</div>
                      <div>
                         <h4 className="font-bold text-lg">Finish and publish</h4>
                         <p className="text-gray-500">Choose if you’d like to start with an experienced guest, then set your price.</p>
                      </div>
                   </div>
                </div>
              </div>
            )}

            {/* STEP 1: Categories */}
            {step === 1 && (
              <div>
                <h2 className="text-3xl font-black text-[#2D2D2D] mb-10">Which of these best describes your space?</h2>
                <div className="grid grid-cols-2 gap-4">
                  {deskTypes.map((t) => (
                    <button 
                      key={t.id}
                      onClick={() => setFormData({...formData, type: t.id as DeskType})}
                      className={`p-6 rounded-2xl border-2 text-left transition-all group
                        ${formData.type === t.id ? 'border-[#2D2D2D] bg-gray-50' : 'border-gray-100 bg-white hover:border-gray-300'}`}
                    >
                      <div className={`mb-4 transition-transform group-active:scale-95 ${formData.type === t.id ? 'text-[#2D2D2D]' : 'text-gray-400'}`}>
                        {t.icon}
                      </div>
                      <h4 className="font-bold text-sm text-[#2D2D2D]">{t.id}</h4>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* STEP 2: Vibe Selection */}
            {step === 2 && (
              <div>
                <h2 className="text-3xl font-black text-[#2D2D2D] mb-10">What’s the primary vibe of your hub?</h2>
                <div className="space-y-4">
                  {(['Quiet', 'Social', 'Creative', 'Client-Ready'] as VibeType[]).map((v) => (
                    <button 
                      key={v}
                      onClick={() => setFormData({...formData, vibe: v})}
                      className={`w-full p-8 rounded-2xl border-2 text-left transition-all flex items-center justify-between group
                        ${formData.vibe === v ? 'border-[#2D2D2D] bg-gray-50' : 'border-gray-100 bg-white hover:border-gray-300'}`}
                    >
                      <div>
                        <h4 className="font-bold text-lg text-[#2D2D2D]">{v}</h4>
                        <p className="text-sm text-gray-500">
                          {v === 'Quiet' && "Library-like focus for deep productivity."}
                          {v === 'Social' && "Energetic atmosphere for networking."}
                          {v === 'Creative' && "Inspired surroundings for artists and founders."}
                          {v === 'Client-Ready' && "Polished, professional corporate standards."}
                        </p>
                      </div>
                      {formData.vibe === v && <div className="w-6 h-6 bg-[#2D2D2D] rounded-full flex items-center justify-center"><Check size={14} className="text-white" /></div>}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* STEP 3: Location */}
            {step === 3 && (
              <div>
                <h2 className="text-3xl font-black text-[#2D2D2D] mb-10">Where's your office located?</h2>
                <div className="space-y-6">
                   <div className="border border-gray-300 rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-[#2D2D2D] transition-all bg-white">
                      <div className="p-4 border-b border-gray-300 bg-white">
                         <label className="block text-[10px] font-black uppercase text-gray-400 mb-1">Country/Region</label>
                         <div className="text-sm font-bold text-[#2D2D2D]">United Kingdom</div>
                      </div>
                      <input 
                        type="text" 
                        placeholder="Street address"
                        value={formData.address}
                        onChange={e => setFormData({...formData, address: e.target.value})}
                        className="w-full p-4 text-sm font-medium outline-none border-b border-gray-300 bg-white text-[#2D2D2D] placeholder:text-gray-400"
                      />
                      <input 
                        type="text" 
                        placeholder="Neighborhood (e.g. Shoreditch)"
                        value={formData.neighborhood}
                        onChange={e => setFormData({...formData, neighborhood: e.target.value})}
                        className="w-full p-4 text-sm font-medium outline-none bg-white text-[#2D2D2D] placeholder:text-gray-400"
                      />
                   </div>
                   <div className="aspect-video bg-gray-50 rounded-3xl relative overflow-hidden group border border-gray-100">
                      <div className="absolute inset-0 flex items-center justify-center">
                         <div className="w-10 h-10 bg-[#2D2D2D] border-4 border-white rounded-full shadow-2xl animate-bounce" />
                      </div>
                      <img src="https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&q=80&w=800" className="w-full h-full object-cover opacity-50" alt="" />
                   </div>
                </div>
              </div>
            )}

            {/* STEP 4: Capacity */}
            {step === 4 && (
              <div>
                <h2 className="text-3xl font-black text-[#2D2D2D] mb-4">Share some basics about your space</h2>
                <p className="text-gray-500 mb-12">How many guests can you comfortably seat?</p>
                <div className="flex items-center justify-between py-6 border-b border-gray-100">
                   <span className="text-lg font-medium text-[#2D2D2D]">Guests</span>
                   <div className="flex items-center gap-4">
                      <button 
                        onClick={() => setFormData({...formData, capacity: Math.max(1, formData.capacity - 1)})}
                        className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:border-[#2D2D2D] transition-colors bg-white text-[#2D2D2D]"
                      >
                        <ChevronLeft size={16} />
                      </button>
                      <span className="w-8 text-center font-bold text-[#2D2D2D]">{formData.capacity}</span>
                      <button 
                        onClick={() => setFormData({...formData, capacity: formData.capacity + 1})}
                        className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:border-[#2D2D2D] transition-colors bg-white text-[#2D2D2D]"
                      >
                        <ChevronRight size={16} />
                      </button>
                   </div>
                </div>
              </div>
            )}

            {/* STEP 5: Amenities */}
            {step === 5 && (
              <div>
                <h2 className="text-3xl font-black text-[#2D2D2D] mb-4">Tell guests what your space has to offer</h2>
                <p className="text-gray-500 mb-10">Select any of the amenities below.</p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                   {amenityOptions.map(opt => (
                     <button 
                      key={opt.label}
                      onClick={() => toggleAmenity(opt.label)}
                      className={`flex flex-col items-start gap-4 p-6 rounded-2xl border-2 transition-all
                        ${formData.amenities.includes(opt.label) ? 'border-[#2D2D2D] bg-gray-50' : 'border-gray-100 bg-white hover:border-gray-300'}`}
                     >
                        <div className={`${formData.amenities.includes(opt.label) ? 'text-[#2D2D2D]' : 'text-gray-400'}`}>
                          {opt.icon}
                        </div>
                        <span className="text-sm font-bold text-left text-[#2D2D2D]">{opt.label}</span>
                     </button>
                   ))}
                </div>
              </div>
            )}

            {/* STEP 6: Photos */}
            {step === 6 && (
              <div className="text-center">
                <h2 className="text-3xl font-black text-[#2D2D2D] mb-4 text-left">Add some photos of your office</h2>
                <p className="text-gray-500 mb-12 text-left">You'll need 5 photos to get started. You can add more later.</p>
                
                <div className="border-2 border-dashed border-gray-200 rounded-[3rem] p-12 flex flex-col items-center justify-center hover:bg-gray-50 transition-all cursor-pointer group bg-white">
                   <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                      <ImageIcon size={40} className="text-gray-300" />
                   </div>
                   <button className="bg-[#2D2D2D] text-white px-8 py-3 rounded-xl font-bold text-sm mb-4">Upload from your device</button>
                   <p className="text-xs text-gray-400">or drag and drop here</p>
                </div>
              </div>
            )}

            {/* STEP 7: Title */}
            {step === 7 && (
              <div>
                <h2 className="text-3xl font-black text-[#2D2D2D] mb-4">Now, let's give your workspace a title</h2>
                <p className="text-gray-500 mb-10">Short titles work best. Don’t worry, you can always change it later.</p>
                <textarea 
                  value={formData.title}
                  onChange={e => setFormData({...formData, title: e.target.value.slice(0, 32)})}
                  placeholder="The Sunlit Loft Hub"
                  className="w-full h-40 p-8 rounded-[2rem] border-2 border-gray-200 focus:border-[#2D2D2D] text-2xl font-black outline-none transition-all resize-none bg-white text-[#2D2D2D] placeholder:text-gray-200"
                />
                <p className="mt-4 text-xs font-bold text-gray-400 uppercase tracking-widest">{formData.title.length} / 32</p>
              </div>
            )}

            {/* STEP 8: Description */}
            {step === 8 && (
              <div>
                <h2 className="text-3xl font-black text-[#2D2D2D] mb-4">Create your description</h2>
                <p className="text-gray-500 mb-8">Share what makes your place special.</p>
                
                <div className="relative">
                   <textarea 
                    value={formData.description}
                    onChange={e => setFormData({...formData, description: e.target.value.slice(0, 500)})}
                    placeholder="Tell guests about the vibe, the community, and the tech..."
                    className="w-full h-64 p-8 rounded-[2rem] border-2 border-gray-200 focus:border-[#2D2D2D] text-lg font-medium leading-relaxed outline-none transition-all resize-none bg-white text-[#2D2D2D] placeholder:text-gray-300"
                   />
                   <button 
                    onClick={handleMagicWrite}
                    disabled={magicWriting}
                    className="absolute bottom-6 right-6 flex items-center gap-2 bg-[#E1E8E0] text-[#2D2D2D] px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-[#d0dbce] transition-all disabled:opacity-50 shadow-sm"
                   >
                     {magicWriting ? <Loader2 size={14} className="animate-spin" /> : <Sparkles size={14} />}
                     AI Magic Write
                   </button>
                </div>
                <p className="mt-4 text-xs font-bold text-gray-400 uppercase tracking-widest">{formData.description.length} / 500</p>
              </div>
            )}

            {/* STEP 9: Pricing Tiers */}
            {step === 9 && (
              <div>
                <h2 className="text-3xl font-black text-[#2D2D2D] mb-4">Set your pricing tiers</h2>
                <p className="text-gray-500 mb-10">Offer flexible options for short and long-term stays.</p>
                
                <div className="space-y-6">
                   {/* Daily */}
                   <div className="bg-white p-6 rounded-3xl border-2 border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 group focus-within:border-[#2D2D2D] transition-all">
                      <div className="flex-1">
                         <h4 className="text-[10px] font-black uppercase text-gray-400 mb-2">Daily Rate</h4>
                         <div className="flex items-center gap-4">
                            <button 
                              type="button"
                              onClick={() => setFormData({...formData, priceDaily: Math.max(1, formData.priceDaily - 1)})}
                              className="w-10 h-10 rounded-full border-2 border-gray-100 flex items-center justify-center hover:border-[#2D2D2D] transition-all text-[#2D2D2D] active:scale-95"
                            >
                              <Minus size={18} />
                            </button>
                            <div className="flex items-center gap-1">
                               <span className="text-3xl font-black text-[#2D2D2D]">£</span>
                               <input 
                                 type="number" 
                                 value={formData.priceDaily}
                                 onChange={e => setFormData({...formData, priceDaily: parseInt(e.target.value) || 0})}
                                 className="w-20 text-3xl font-black outline-none bg-white text-[#2D2D2D] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                               />
                            </div>
                            <button 
                              type="button"
                              onClick={() => setFormData({...formData, priceDaily: formData.priceDaily + 1})}
                              className="w-10 h-10 rounded-full border-2 border-gray-100 flex items-center justify-center hover:border-[#2D2D2D] transition-all text-[#2D2D2D] active:scale-95"
                            >
                              <Plus size={18} />
                            </button>
                         </div>
                      </div>
                      <p className="text-[10px] font-bold text-gray-300 uppercase tracking-widest self-end sm:self-center">per day</p>
                   </div>

                   {/* Weekly */}
                   <div className="bg-white p-6 rounded-3xl border-2 border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 group focus-within:border-[#2D2D2D] transition-all">
                      <div className="flex-1">
                         <h4 className="text-[10px] font-black uppercase text-gray-400 mb-2">Weekly Rate</h4>
                         <div className="flex items-center gap-4">
                            <button 
                              type="button"
                              onClick={() => setFormData({...formData, priceWeekly: Math.max(1, formData.priceWeekly - 5)})}
                              className="w-10 h-10 rounded-full border-2 border-gray-100 flex items-center justify-center hover:border-[#2D2D2D] transition-all text-[#2D2D2D] active:scale-95"
                            >
                              <Minus size={18} />
                            </button>
                            <div className="flex items-center gap-1">
                               <span className="text-3xl font-black text-[#2D2D2D]">£</span>
                               <input 
                                 type="number" 
                                 value={formData.priceWeekly}
                                 onChange={e => setFormData({...formData, priceWeekly: parseInt(e.target.value) || 0})}
                                 className="w-24 text-3xl font-black outline-none bg-white text-[#2D2D2D] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                               />
                            </div>
                            <button 
                              type="button"
                              onClick={() => setFormData({...formData, priceWeekly: formData.priceWeekly + 5})}
                              className="w-10 h-10 rounded-full border-2 border-gray-100 flex items-center justify-center hover:border-[#2D2D2D] transition-all text-[#2D2D2D] active:scale-95"
                            >
                              <Plus size={18} />
                            </button>
                         </div>
                      </div>
                      <p className="text-[10px] font-bold text-gray-300 uppercase tracking-widest self-end sm:self-center">per week</p>
                   </div>

                   {/* Monthly */}
                   <div className="bg-white p-6 rounded-3xl border-2 border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 group focus-within:border-[#2D2D2D] transition-all">
                      <div className="flex-1">
                         <h4 className="text-[10px] font-black uppercase text-gray-400 mb-2">Monthly Rate</h4>
                         <div className="flex items-center gap-4">
                            <button 
                              type="button"
                              onClick={() => setFormData({...formData, priceMonthly: Math.max(1, formData.priceMonthly - 10)})}
                              className="w-10 h-10 rounded-full border-2 border-gray-100 flex items-center justify-center hover:border-[#2D2D2D] transition-all text-[#2D2D2D] active:scale-95"
                            >
                              <Minus size={18} />
                            </button>
                            <div className="flex items-center gap-1">
                               <span className="text-3xl font-black text-[#2D2D2D]">£</span>
                               <input 
                                 type="number" 
                                 value={formData.priceMonthly}
                                 onChange={e => setFormData({...formData, priceMonthly: parseInt(e.target.value) || 0})}
                                 className="w-28 text-3xl font-black outline-none bg-white text-[#2D2D2D] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                               />
                            </div>
                            <button 
                              type="button"
                              onClick={() => setFormData({...formData, priceMonthly: formData.priceMonthly + 10})}
                              className="w-10 h-10 rounded-full border-2 border-gray-100 flex items-center justify-center hover:border-[#2D2D2D] transition-all text-[#2D2D2D] active:scale-95"
                            >
                              <Plus size={18} />
                            </button>
                         </div>
                      </div>
                      <p className="text-[10px] font-bold text-gray-300 uppercase tracking-widest self-end sm:self-center">per month</p>
                   </div>
                </div>

                <div className="mt-12 p-8 bg-gray-50 rounded-[2.5rem] border border-gray-100">
                   <div className="flex justify-between items-center mb-2">
                      <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Host Fee</span>
                      <span className="text-sm font-bold text-green-600">0% for 12 months</span>
                   </div>
                   <p className="text-xs text-gray-500 leading-relaxed italic">
                     "We're waiving all commission for new independent London hosts. You keep 100% of your earnings."
                   </p>
                </div>
              </div>
            )}

            {/* STEP 10: Final Review */}
            {step === 10 && (
              <div>
                <h2 className="text-3xl font-black text-[#2D2D2D] mb-4">Review your listing</h2>
                <p className="text-gray-500 mb-12">Here's what we'll show to guests. Make sure everything looks right.</p>
                
                <div className="bg-white border border-gray-200 rounded-[2.5rem] overflow-hidden shadow-2xl">
                   <div className="aspect-[4/3] bg-gray-100 relative">
                      <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800" className="w-full h-full object-cover" alt="" />
                      <div className="absolute top-6 left-6 bg-white px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-xl">Preview</div>
                   </div>
                   <div className="p-8">
                      <div className="flex justify-between items-start mb-6 pb-6 border-b border-gray-50">
                        <h3 className="text-2xl font-black text-[#2D2D2D]">{formData.title || "The Hub"}</h3>
                        <div className="text-right">
                           <span className="font-black text-xl text-[#2D2D2D]">£{formData.priceDaily}</span>
                           <p className="text-[8px] font-black text-gray-400 uppercase tracking-widest">Daily rate</p>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 mb-6">
                        <div className="bg-gray-50 p-3 rounded-2xl">
                           <p className="text-[8px] font-black text-gray-400 uppercase tracking-widest mb-1">Weekly</p>
                           <p className="text-lg font-black text-[#2D2D2D]">£{formData.priceWeekly}</p>
                        </div>
                        <div className="bg-gray-50 p-3 rounded-2xl">
                           <p className="text-[8px] font-black text-gray-400 uppercase tracking-widest mb-1">Monthly</p>
                           <p className="text-lg font-black text-[#2D2D2D]">£{formData.priceMonthly}</p>
                        </div>
                      </div>

                      <p className="text-sm text-gray-500 mb-6">{formData.type} in {formData.neighborhood}</p>
                      <div className="flex flex-wrap gap-2">
                         {formData.amenities.slice(0, 3).map(a => (
                           <span key={a} className="text-[9px] font-black uppercase tracking-widest bg-gray-100 px-2 py-1 rounded-md text-gray-400">{a}</span>
                         ))}
                      </div>
                   </div>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>

      {/* Persistent Progress Footer */}
      <div className="fixed bottom-0 left-0 right-0 px-6 py-4 md:px-12 md:py-6 border-t border-gray-100 bg-white z-[200] pb-safe-area-inset-bottom">
         <div className="max-w-7xl mx-auto flex items-center justify-between">
            <button 
              onClick={step === 0 ? onCancel : prevStep}
              className="text-sm font-bold underline underline-offset-4 text-gray-500 hover:text-black transition-all"
            >
              {step === 0 ? "Exit" : "Back"}
            </button>
            
            <div className="flex-1 max-w-xs mx-8 hidden sm:block">
               <div className="h-1 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-[#2D2D2D] transition-all duration-700" style={{ width: `${(step / 10) * 100}%` }} />
               </div>
            </div>

            {step < 10 ? (
              <button 
                onClick={nextStep}
                disabled={!canContinue()}
                className={`px-10 py-4 rounded-xl font-black uppercase tracking-[0.2em] text-[10px] transition-all shadow-xl flex items-center gap-3
                  ${canContinue() ? 'bg-[#2D2D2D] text-white hover:bg-black active:scale-95' : 'bg-gray-100 text-gray-400 cursor-not-allowed'}`}
              >
                {step === 0 ? "Get Started" : "Continue"}
              </button>
            ) : (
              <button 
                onClick={() => {
                  setLoading(true);
                  setTimeout(() => {
                    setLoading(false);
                    onComplete();
                  }, 2000);
                }}
                className="px-12 py-4 bg-green-600 text-white rounded-xl font-black uppercase tracking-[0.2em] text-[10px] hover:bg-green-700 transition-all active:scale-95 shadow-xl flex items-center gap-3"
              >
                {loading ? <Loader2 size={16} className="animate-spin" /> : <ShieldCheck size={16} />}
                Publish Listing
              </button>
            )}
         </div>
      </div>
    </div>
  );
};

export default AddListingFlow;