import React, { useState } from 'react';
import { Calendar, Clock, CreditCard } from 'lucide-react';

interface Props {
  price: number;
}

const BookingWidget: React.FC<Props> = ({ price }) => {
  const [tab, setTab] = useState<'daily' | 'weekly' | 'monthly'>('daily');
  
  const displayPrice = tab === 'weekly' ? Math.floor(price * 4.5) : tab === 'monthly' ? Math.floor(price * 18) : price;

  return (
    <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-xl sticky top-24">
      <div className="flex items-center justify-between mb-6">
        <div>
          <span className="text-2xl font-bold">£{Math.floor(displayPrice)}</span>
          <span className="text-gray-500 text-sm font-medium"> / {tab === 'weekly' ? 'week' : tab === 'monthly' ? 'month' : 'day'}</span>
        </div>
        <div className="flex items-center gap-1 text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-md">
          <Clock size={12} />
          INSTANT
        </div>
      </div>

      {/* Tabs */}
      <div className="flex bg-gray-100 p-1 rounded-xl mb-6">
        {(['daily', 'weekly', 'monthly'] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all capitalize ${
              tab === t ? 'bg-white shadow-sm text-[#2D2D2D]' : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Inputs */}
      <div className="space-y-3 mb-6">
        <div className="border border-gray-200 rounded-xl p-3 flex items-center gap-3 group focus-within:border-black transition-colors cursor-pointer">
          <Calendar size={18} className="text-gray-400" />
          <div className="flex-1">
            <label className="block text-[10px] uppercase font-bold text-gray-400">Start Date</label>
            <span className="text-sm font-medium">Wed, Jan 15</span>
          </div>
        </div>
      </div>

      <button className="w-full bg-[#2D2D2D] hover:bg-black text-white py-4 rounded-2xl font-bold transition-all active:scale-[0.98] flex items-center justify-center gap-2 mb-4">
        <CreditCard size={18} />
        Check Availability
      </button>

      <p className="text-[10px] text-gray-400 text-center font-medium">
        You won't be charged yet. Powered by Stripe.
      </p>
    </div>
  );
};

export default BookingWidget;