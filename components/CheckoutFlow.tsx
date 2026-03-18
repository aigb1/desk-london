import React, { useState, useEffect } from 'react';
import { 
  X, ChevronRight, ChevronLeft, ShieldCheck, 
  CreditCard, Calendar, Clock, Check, Download, 
  Smartphone, Share, MessageSquare, ChevronDown, ChevronUp
} from 'lucide-react';
import { Desk, BookingDetails } from '../types';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  desk: Desk;
  booking: BookingDetails;
}

type Step = 'review' | 'details' | 'payment' | 'success';

const CheckoutFlow: React.FC<Props> = ({ isOpen, onClose, desk, booking }) => {
  const [step, setStep] = useState<Step>('review');
  const [agreedToRules, setAgreedToRules] = useState(false);
  const [messageToHost, setMessageToHost] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showMobileSummary, setShowMobileSummary] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      // Auto-close summary when moving steps
      setShowMobileSummary(false);
    }
    else document.body.style.overflow = 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen, step]);

  if (!isOpen) return null;

  const handlePayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setStep('success');
    }, 2000);
  };

  const steps: { key: Step; label: string }[] = [
    { key: 'review', label: 'Review' },
    { key: 'details', label: 'Guest' },
    { key: 'payment', label: 'Pay' }
  ];

  const currentStepIndex = steps.findIndex(s => s.key === step);

  const Progress = () => (
    <div className="flex items-center gap-2 mb-8 px-2">
      {steps.map((s, i) => (
        <React.Fragment key={s.key}>
          <div className="flex items-center gap-2">
            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black border-2 transition-all
              ${currentStepIndex >= i ? 'bg-[#2D2D2D] border-[#2D2D2D] text-white' : 'bg-white border-gray-100 text-gray-300'}`}>
              {i + 1}
            </div>
            <span className={`text-[10px] font-bold uppercase tracking-widest ${currentStepIndex >= i ? 'text-[#2D2D2D]' : 'text-gray-300'}`}>
              {s.label}
            </span>
          </div>
          {i < steps.length - 1 && <div className="flex-1 h-px bg-gray-100" />}
        </React.Fragment>
      ))}
    </div>
  );

  const SummaryCard = () => (
    <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm shrink-0 md:w-80">
      <div className="flex gap-4 mb-6 pb-6 border-b border-gray-100">
        <img src={desk.image} className="w-20 h-20 rounded-2xl object-cover" alt="" />
        <div>
          <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">{desk.neighborhood}</h4>
          <h3 className="text-sm font-bold text-[#2D2D2D] leading-tight">{desk.title}</h3>
          <p className="text-[11px] text-gray-500 mt-1">{desk.type}</p>
        </div>
      </div>
      <div className="space-y-4 mb-6">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-500">Dates</span>
          <span className="font-bold">{new Date(booking.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-500">Type</span>
          <span className="font-bold capitalize">{booking.type}</span>
        </div>
      </div>
      <div className="pt-6 border-t border-gray-100 flex items-center justify-between">
        <span className="font-bold text-[#2D2D2D]">Total (GBP)</span>
        <span className="text-xl font-black">£{booking.totalPrice}</span>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 z-[500] flex flex-col md:items-center md:justify-center">
      <div 
        className="absolute inset-0 bg-[#2D2D2D]/80 backdrop-blur-md animate-in fade-in duration-500" 
        onClick={step === 'success' ? onClose : undefined}
      />
      
      {step === 'success' ? (
        <div className="relative w-full max-w-2xl bg-[#FCFAFA] md:rounded-[3rem] h-full md:h-auto overflow-y-auto animate-in zoom-in-95 duration-500 p-6 md:p-12 text-center pb-safe-area-inset-bottom">
           <div className="w-20 h-20 bg-[#E1E8E0] rounded-full flex items-center justify-center mx-auto mb-6 md:mb-8 animate-bounce mt-8 md:mt-0">
              <Check size={40} className="text-[#2D2D2D]" />
           </div>
           <h2 className="text-3xl md:text-4xl font-black text-[#2D2D2D] mb-4">You're all set!</h2>
           <p className="text-gray-500 mb-8 md:mb-12 max-w-sm mx-auto text-sm">
             Your booking for <b>{desk.title}</b> is confirmed. Your digital pass is now active.
           </p>

           {/* Pass Simulation View */}
           <div className="bg-white rounded-[2.5rem] shadow-2xl border border-gray-100 overflow-hidden mb-12 max-w-sm mx-auto">
              <div className="bg-[#2D2D2D] p-6 text-white text-left">
                <div className="flex justify-between items-start mb-8">
                  <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-xs">D.L</span>
                  </div>
                  <div className="bg-green-500 px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest">Active Pass</div>
                </div>
                <h4 className="text-xs font-black uppercase tracking-widest text-white/40 mb-1">Pass Holder</h4>
                <p className="font-bold text-lg mb-4">Guest User</p>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-[8px] font-black uppercase tracking-widest text-white/40 mb-0.5">Location</h4>
                    <p className="text-xs font-bold">{desk.neighborhood}</p>
                  </div>
                  <div>
                    <h4 className="text-[8px] font-black uppercase tracking-widest text-white/40 mb-0.5">Date</h4>
                    <p className="text-xs font-bold">{new Date(booking.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}</p>
                  </div>
                </div>
              </div>
              <div className="p-8 flex flex-col items-center">
                <div className="w-48 h-48 bg-gray-50 rounded-2xl mb-6 flex items-center justify-center border-2 border-dashed border-gray-200">
                  <div className="w-32 h-32 grid grid-cols-4 grid-rows-4 gap-1 opacity-20">
                    {[...Array(16)].map((_, i) => <div key={i} className="bg-black rounded-sm" />)}
                  </div>
                </div>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Entry ID: DL-{Math.random().toString(36).substr(2, 6).toUpperCase()}</p>
              </div>
           </div>

           <div className="flex flex-col gap-4 max-w-xs mx-auto">
              <button className="flex items-center justify-center gap-2 bg-[#2D2D2D] text-white py-4 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-black transition-all active:scale-95 shadow-lg">
                <Download size={14} /> Add to Apple Wallet
              </button>
              <button 
                onClick={onClose}
                className="text-sm font-bold underline underline-offset-8 decoration-2 text-gray-500 hover:text-[#2D2D2D] py-4"
              >
                Back to Explore
              </button>
           </div>
        </div>
      ) : (
        <div className="relative w-full max-w-5xl bg-white md:rounded-[3rem] flex flex-col h-full md:h-[85vh] overflow-hidden animate-in slide-in-from-bottom duration-500">
          {/* Mobile Handle */}
          <div className="absolute top-2 left-1/2 -translate-x-1/2 w-8 h-1 bg-gray-200 rounded-full md:hidden" />
          
          {/* Header */}
          <div className="flex items-center justify-between px-6 md:px-8 py-5 md:py-6 border-b border-gray-100 shrink-0 mt-2 md:mt-0">
            <button onClick={onClose} className="p-2 hover:bg-gray-50 rounded-full transition-colors">
              <X size={20} />
            </button>
            <h2 className="text-sm md:text-base font-bold">Secure Checkout</h2>
            <div className="w-10" />
          </div>

          {/* Mobile Summary Toggler */}
          <div className="md:hidden bg-gray-50 border-b border-gray-100">
            <button 
              onClick={() => setShowMobileSummary(!showMobileSummary)}
              className="w-full px-6 py-4 flex items-center justify-between text-[11px] font-black uppercase tracking-widest text-[#2D2D2D]"
            >
              <div className="flex items-center gap-2">
                <span className="text-gray-400">Order Summary</span>
                <span>£{booking.totalPrice}</span>
              </div>
              {showMobileSummary ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>
            {showMobileSummary && (
              <div className="px-6 pb-6 animate-in slide-in-from-top-2 duration-300">
                <div className="flex gap-4 pt-2">
                  <img src={desk.image} className="w-16 h-16 rounded-xl object-cover" alt="" />
                  <div className="flex-1">
                    <p className="font-bold text-xs">{desk.title}</p>
                    <p className="text-[10px] text-gray-500 mt-0.5">{new Date(booking.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })} · {booking.type}</p>
                    <p className="text-[10px] font-black mt-2">TOTAL: £{booking.totalPrice}</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="flex-1 overflow-y-auto px-6 md:px-8 py-8 md:py-10 hide-scrollbar pb-32">
            <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-16">
              
              {/* Left Side: Step Content */}
              <div className="flex-1">
                <Progress />

                {step === 'review' && (
                  <div className="animate-in fade-in slide-in-from-left-4 duration-500">
                    <h3 className="text-2xl md:text-3xl font-black text-[#2D2D2D] mb-8 tracking-tight">Rules of the Hub</h3>
                    
                    <div className="space-y-10">
                      <div className="p-6 md:p-8 bg-[#E1E8E0]/20 rounded-[2rem] border border-[#E1E8E0]/40">
                        <div className="flex items-center gap-4 mb-4">
                          <ShieldCheck className="text-[#2D2D2D]" size={28} />
                          <h4 className="font-bold">Building Protocol</h4>
                        </div>
                        <ul className="space-y-4 text-xs md:text-sm text-gray-600 font-medium">
                          <li className="flex gap-3"><span>•</span> <span>Professional attire required in social zones</span></li>
                          <li className="flex gap-3"><span>•</span> <span>Noise-cancelling headphones mandatory in Quiet Zones</span></li>
                          <li className="flex gap-3"><span>•</span> <span>No phone calls in the main coworking atrium</span></li>
                        </ul>
                      </div>

                      <div className="flex items-start gap-4 p-2">
                        <div 
                          onClick={() => setAgreedToRules(!agreedToRules)}
                          className={`mt-1 w-6 h-6 rounded-md border-2 flex items-center justify-center cursor-pointer transition-all shrink-0
                            ${agreedToRules ? 'bg-[#2D2D2D] border-[#2D2D2D] text-white' : 'bg-white border-gray-200'}`}
                        >
                          {agreedToRules && <Check size={14} strokeWidth={4} />}
                        </div>
                        <label className="text-sm font-medium text-gray-700 leading-relaxed cursor-pointer select-none">
                          I agree to follow the host's rules and understand that desk.london is facilitating this booking.
                        </label>
                      </div>
                    </div>

                    <button 
                      onClick={() => setStep('details')}
                      disabled={!agreedToRules}
                      className={`mt-12 w-full md:w-auto px-10 py-5 rounded-[1.5rem] font-black uppercase tracking-[0.2em] text-[10px] transition-all shadow-xl
                        ${agreedToRules ? 'bg-[#2D2D2D] text-white hover:bg-black active:scale-95' : 'bg-gray-100 text-gray-400 cursor-not-allowed'}`}
                    >
                      Agree and Continue
                    </button>
                  </div>
                )}

                {step === 'details' && (
                  <div className="animate-in fade-in slide-in-from-right-4 duration-500">
                    <button onClick={() => setStep('review')} className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-400 mb-8 hover:text-[#2D2D2D]">
                      <ChevronLeft size={14} /> Back
                    </button>
                    <h3 className="text-2xl md:text-3xl font-black text-[#2D2D2D] mb-8 tracking-tight">Who's working?</h3>
                    
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                           <label className="text-[10px] font-black uppercase text-gray-400 px-1">First Name</label>
                           <input type="text" placeholder="e.g. Alex" className="w-full px-5 py-4 bg-gray-50 border-2 border-transparent focus:border-[#2D2D2D] focus:bg-white rounded-2xl outline-none transition-all text-sm font-bold" />
                        </div>
                        <div className="space-y-2">
                           <label className="text-[10px] font-black uppercase text-gray-400 px-1">Last Name</label>
                           <input type="text" placeholder="e.g. Smith" className="w-full px-5 py-4 bg-gray-50 border-2 border-transparent focus:border-[#2D2D2D] focus:bg-white rounded-2xl outline-none transition-all text-sm font-bold" />
                        </div>
                      </div>

                      <div className="space-y-4 pt-6 border-t border-gray-100">
                         <div className="flex items-center gap-3 mb-2">
                            <MessageSquare className="text-gray-400" size={18} />
                            <h4 className="text-sm font-bold">Message the Hub (Optional)</h4>
                         </div>
                         <textarea 
                           placeholder="Any specific needs today? Monitor preference, desk location, etc..."
                           value={messageToHost}
                           onChange={(e) => setMessageToHost(e.target.value)}
                           className="w-full h-32 px-5 py-4 bg-gray-50 border-2 border-transparent focus:border-[#2D2D2D] focus:bg-white rounded-3xl outline-none transition-all text-sm font-medium resize-none"
                         />
                      </div>
                    </div>

                    <button 
                      onClick={() => setStep('payment')}
                      className="mt-12 w-full md:w-auto px-10 py-5 bg-[#2D2D2D] text-white rounded-[1.5rem] font-black uppercase tracking-[0.2em] text-[10px] hover:bg-black transition-all active:scale-95 shadow-xl"
                    >
                      Continue to Payment
                    </button>
                  </div>
                )}

                {step === 'payment' && (
                  <div className="animate-in fade-in slide-in-from-right-4 duration-500">
                    <button onClick={() => setStep('details')} className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-400 mb-8 hover:text-[#2D2D2D]">
                      <ChevronLeft size={14} /> Back
                    </button>
                    <h3 className="text-2xl md:text-3xl font-black text-[#2D2D2D] mb-8 tracking-tight">Payment</h3>
                    
                    <div className="space-y-8">
                       <div className="p-6 md:p-8 border-2 border-gray-100 rounded-[2rem] bg-[#FCFAFA] relative group focus-within:border-[#2D2D2D] transition-all">
                          <label className="block text-[10px] font-black uppercase text-gray-400 mb-6">Credit or Debit Card</label>
                          <div className="flex items-center gap-4 pb-4 border-b border-gray-100 mb-6">
                             <CreditCard className="text-gray-300" />
                             <input type="text" placeholder="0000 0000 0000 0000" className="flex-1 bg-transparent outline-none font-bold text-sm" />
                          </div>
                          <div className="flex gap-6">
                             <div className="flex-1">
                               <label className="block text-[8px] font-black uppercase text-gray-300 mb-1">Expiry</label>
                               <input type="text" placeholder="MM / YY" className="w-full bg-transparent outline-none font-bold text-sm" />
                             </div>
                             <div className="w-20">
                               <label className="block text-[8px] font-black uppercase text-gray-300 mb-1">CVV</label>
                               <input type="text" placeholder="123" className="w-full bg-transparent outline-none font-bold text-sm" />
                             </div>
                          </div>
                          <div className="absolute top-6 right-6 hidden sm:flex gap-2">
                             <img src="https://img.icons8.com/color/48/visa.png" className="h-5" alt="Visa" />
                             <img src="https://img.icons8.com/color/48/mastercard.png" className="h-5" alt="MC" />
                          </div>
                       </div>

                       <div className="flex flex-col gap-4">
                          <button 
                            onClick={handlePayment}
                            disabled={isProcessing}
                            className="w-full flex items-center justify-center gap-3 bg-black text-white py-5 rounded-[1.5rem] font-bold text-xs transition-all hover:opacity-90 active:scale-95 disabled:opacity-50"
                          >
                             {isProcessing ? (
                               <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                             ) : (
                               <>
                                 <div className="w-6 h-6 flex items-center justify-center bg-white rounded-full">
                                    <span className="text-black text-[10px] font-black">P</span>
                                 </div>
                                 Pay with Apple Pay
                               </>
                             )}
                          </button>
                          <button 
                            onClick={handlePayment}
                            disabled={isProcessing}
                            className="w-full bg-[#2D2D2D] text-white py-5 rounded-[1.5rem] font-black uppercase tracking-[0.2em] text-[10px] transition-all hover:bg-black active:scale-95 shadow-xl disabled:opacity-50"
                          >
                            {isProcessing ? 'Processing Securely...' : `Confirm £${booking.totalPrice}`}
                          </button>
                       </div>
                       
                       <p className="text-center text-[9px] text-gray-400 font-bold uppercase tracking-widest">
                         <ShieldCheck className="inline mr-1" size={10} /> Secure SSL Encrypted Checkout
                       </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Right Side: Sticky Summary (Desktop) */}
              <div className="hidden md:block">
                <div className="sticky top-0">
                  <SummaryCard />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CheckoutFlow;