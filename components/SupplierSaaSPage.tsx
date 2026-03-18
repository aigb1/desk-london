
import React, { useState, useMemo } from 'react';
import { Check, ChevronRight, TrendingUp, Zap, Building2, ShieldCheck, Rocket, Info } from 'lucide-react';

interface PricingTier {
  name: string;
  id: string;
  price: number;
  target: string;
  features: string[];
  icon: React.ReactNode;
  recommended?: boolean;
}

const SupplierSaaSPage: React.FC<{ onStartTrial: () => void; onBack: () => void }> = ({ onStartTrial, onBack }) => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  const [revenue, setRevenue] = useState(5000);

  const tiers: PricingTier[] = [
    {
      name: 'Lite',
      id: 'lite',
      price: 49,
      target: 'Single office or boutique studio',
      icon: <Building2 className="text-gray-400" size={24} />,
      features: ['Up to 5 desks', '0% Commission', 'Basic Listing', 'Mobile App Access', 'Email Support']
    },
    {
      name: 'Business',
      id: 'business',
      price: 149,
      target: 'Established coworking hubs',
      recommended: true,
      icon: <Zap className="text-[#2D2D2D]" size={24} />,
      features: [
        'Up to 50 desks',
        'Everything in Lite',
        'Kisi/Salto Digital Key Integration',
        'Team Booking Tools',
        'Advanced Analytics',
        'Featured Search Placement'
      ]
    },
    {
      name: 'Enterprise',
      id: 'enterprise',
      price: 399,
      target: 'Multi-location portfolios',
      icon: <Rocket className="text-gray-400" size={24} />,
      features: [
        'Unlimited desks',
        'White-label Member App',
        'API Access for custom ERPs',
        'Dedicated Account Manager',
        '24/7 Priority Phone Support'
      ]
    }
  ];

  const savings = useMemo(() => {
    const commissionPlatform = revenue * 0.20; // 20% commission
    const deskLondonFee = billingCycle === 'monthly' ? 149 : 149 * 0.83; // Approx business tier
    const monthlySavings = commissionPlatform - deskLondonFee;
    return {
      commission: commissionPlatform,
      fee: deskLondonFee,
      monthly: Math.max(0, monthlySavings),
      annual: Math.max(0, monthlySavings * 12)
    };
  }, [revenue, billingCycle]);

  return (
    <div className="min-h-screen bg-[#FCFAFA] pt-24 pb-32">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Hero Section */}
        <section className="text-center mb-24 animate-in fade-in slide-in-from-bottom-8 duration-700">
          <div className="inline-block px-4 py-1.5 bg-[#E1E8E0] text-[#2D2D2D] text-[10px] font-black uppercase tracking-widest rounded-full mb-8">
            For Workspace Providers
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-[#2D2D2D] mb-8 tracking-tight leading-tight">
            Keep every penny <br /> you earn.
          </h1>
          <p className="text-lg text-gray-500 font-medium max-w-2xl mx-auto mb-12 leading-relaxed">
            Stop giving away 15-20% of your revenue to marketplaces. Pay one transparent monthly fee and manage your entire building with desk.london.
          </p>

          {/* Pricing Toggle */}
          <div className="flex items-center justify-center gap-6">
            <span className={`text-sm font-bold ${billingCycle === 'monthly' ? 'text-[#2D2D2D]' : 'text-gray-400'}`}>Monthly</span>
            <button 
              onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'yearly' : 'monthly')}
              className="w-14 h-8 bg-gray-200 rounded-full relative p-1 transition-colors hover:bg-gray-300"
            >
              <div className={`w-6 h-6 bg-white rounded-full shadow-md transition-all duration-300 ${billingCycle === 'yearly' ? 'translate-x-6' : 'translate-x-0'}`} />
            </button>
            <div className="flex items-center gap-2">
              <span className={`text-sm font-bold ${billingCycle === 'yearly' ? 'text-[#2D2D2D]' : 'text-gray-400'}`}>Yearly</span>
              <span className="bg-green-100 text-green-700 text-[10px] font-black uppercase px-2 py-1 rounded-md">2 Months Free</span>
            </div>
          </div>
        </section>

        {/* Pricing Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-32">
          {tiers.map((tier) => {
            const displayPrice = billingCycle === 'yearly' ? Math.floor(tier.price * 10 / 12) : tier.price;
            return (
              <div 
                key={tier.id}
                className={`relative bg-white p-10 rounded-[3rem] border-2 transition-all duration-500 flex flex-col
                  ${tier.recommended ? 'border-[#2D2D2D] shadow-2xl scale-105 z-10' : 'border-gray-50 hover:border-gray-200 shadow-sm'}`}
              >
                {tier.recommended && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#2D2D2D] text-white text-[10px] font-black uppercase tracking-widest px-6 py-2 rounded-full shadow-lg">
                    Best Value
                  </div>
                )}
                
                <div className="mb-8">
                  <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center mb-6">
                    {tier.icon}
                  </div>
                  <h3 className="text-2xl font-black text-[#2D2D2D] mb-2">{tier.name}</h3>
                  <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mb-6">{tier.target}</p>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-black">£{displayPrice}</span>
                    <span className="text-gray-400 font-bold">/mo</span>
                  </div>
                  {billingCycle === 'yearly' && <p className="text-[10px] text-green-600 font-bold mt-2 uppercase">Billed annually</p>}
                </div>

                <div className="flex-1 space-y-4 mb-10">
                  {tier.features.map((feature, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="mt-1 w-4 h-4 rounded-full bg-[#E1E8E0] flex items-center justify-center shrink-0">
                        <Check size={10} className="text-[#2D2D2D]" />
                      </div>
                      <span className="text-sm text-gray-600 font-medium">{feature}</span>
                    </div>
                  ))}
                </div>

                <button 
                  onClick={onStartTrial}
                  className={`w-full py-4 rounded-2xl font-black uppercase tracking-widest text-xs transition-all active:scale-95 shadow-xl
                    ${tier.recommended ? 'bg-[#2D2D2D] text-white hover:bg-black' : 'bg-white border-2 border-[#2D2D2D] text-[#2D2D2D] hover:bg-gray-50'}`}
                >
                  Start 14-Day Free Trial
                </button>
              </div>
            );
          })}
        </div>

        {/* Savings Calculator Section */}
        <section className="bg-white border border-gray-100 rounded-[4rem] p-10 md:p-20 shadow-sm animate-in fade-in duration-1000">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <TrendingUp className="text-green-500" />
                <h2 className="text-3xl font-black text-[#2D2D2D] tracking-tight">Savings Calculator</h2>
              </div>
              <p className="text-gray-500 font-medium mb-12">See how much you save vs. commission-based platforms.</p>
              
              <div className="space-y-12">
                <div className="space-y-6">
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Total Monthly Revenue</label>
                    <span className="text-3xl font-black">£{revenue.toLocaleString()}</span>
                  </div>
                  <input 
                    type="range" 
                    min="1000" 
                    max="50000" 
                    step="500"
                    value={revenue}
                    onChange={(e) => setRevenue(parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-100 rounded-full appearance-none cursor-pointer accent-[#2D2D2D]"
                  />
                  <div className="flex justify-between text-[10px] font-bold text-gray-300 uppercase">
                    <span>£1k</span>
                    <span>£50k</span>
                  </div>
                </div>

                <div className="p-8 bg-gray-50 rounded-3xl space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-500">Traditional Platform (20% Fee)</span>
                    <span className="text-sm font-black text-red-500">£{savings.commission.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-500">desk.london Flat Fee</span>
                    <span className="text-sm font-black text-green-600">£{Math.floor(savings.fee).toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#2D2D2D] rounded-[3rem] p-12 text-white shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-10">
                <ShieldCheck size={120} strokeWidth={1} />
              </div>
              <div className="relative z-10">
                <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40 mb-12">Annual Potential Savings</h4>
                <div className="mb-12">
                  <span className="text-6xl md:text-7xl font-black text-green-400 block mb-2">£{Math.floor(savings.annual).toLocaleString()}</span>
                  <p className="text-white/60 text-sm font-medium leading-relaxed">
                    By switching to desk.london, you keep an additional <span className="text-white font-bold">£{Math.floor(savings.monthly).toLocaleString()} every single month</span>.
                  </p>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 bg-green-400 rounded-full" />
                    <span className="text-xs font-bold text-white/80">No per-booking fees</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 bg-green-400 rounded-full" />
                    <span className="text-xs font-bold text-white/80">No per-member charges</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 bg-green-400 rounded-full" />
                    <span className="text-xs font-bold text-white/80">Unlimited bookings included</span>
                  </div>
                </div>

                <button 
                  onClick={onStartTrial}
                  className="w-full mt-12 bg-white text-[#2D2D2D] py-5 rounded-[2rem] font-black uppercase tracking-[0.2em] text-[10px] shadow-xl hover:scale-105 active:scale-95 transition-all"
                >
                  Join 400+ London Hosts
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Style Trust Footer */}
        <div className="mt-24 text-center">
          <div className="flex items-center justify-center gap-2 text-gray-400 mb-8">
            <Info size={16} />
            <p className="text-xs font-bold uppercase tracking-widest">No credit card required to start your trial</p>
          </div>
          <button 
            onClick={onBack}
            className="text-sm font-bold underline underline-offset-8 text-gray-400 hover:text-[#2D2D2D] transition-colors"
          >
            Back to Explore
          </button>
        </div>

      </div>
    </div>
  );
};

export default SupplierSaaSPage;
