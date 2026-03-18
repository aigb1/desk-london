
import React, { useState } from 'react';
import { User as UserIcon, Building, Chrome as Google, Mail, ChevronRight, Smartphone, Loader2 } from 'lucide-react';
import { Role } from '../types';

interface Props {
  onAuthSuccess: (role: Role) => void;
  onError: (message: string) => void;
}

const AuthPortal: React.FC<Props> = ({ onAuthSuccess, onError }) => {
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSignIn = async (provider: 'google' | 'apple' | 'email') => {
    if (!selectedRole) {
      onError("Please select how you want to use desk.london first.");
      return;
    }

    setLoading(true);
    try {
      // Simulated Auth.js / NextAuth signIn logic
      // In a real Next.js app: await signIn(provider, { callbackUrl: `/dashboard/${selectedRole.toLowerCase()}` })
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          // 5% chance to simulate failure for testing the error boundary
          if (Math.random() < 0.05) reject(new Error(`${provider} authentication failed.`));
          else resolve(true);
        }, 1200);
      });
      
      onAuthSuccess(selectedRole);
    } catch (err: any) {
      onError(err.message || "An unexpected error occurred during sign-in.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {!selectedRole ? (
        <>
          <div className="text-center mb-8">
            <h3 className="text-2xl font-black text-[#2D2D2D] mb-2">Welcome to desk.london</h3>
            <p className="text-sm text-gray-500 font-medium">Choose your path to begin</p>
          </div>

          <div className="grid grid-cols-1 gap-4">
            <button 
              onClick={() => setSelectedRole('GUEST')}
              className="group p-6 bg-white border-2 border-gray-100 hover:border-[#2D2D2D] rounded-[2rem] text-left transition-all hover:shadow-xl active:scale-[0.98]"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-[#E1E8E0] rounded-2xl flex items-center justify-center text-[#2D2D2D] group-hover:bg-[#2D2D2D] group-hover:text-white transition-colors">
                  <UserIcon size={24} />
                </div>
                <ChevronRight size={20} className="text-gray-300 group-hover:text-[#2D2D2D] transition-colors" />
              </div>
              <h4 className="text-lg font-black text-[#2D2D2D]">I'm looking for a desk</h4>
              <p className="text-xs text-gray-500 mt-1 font-medium">Book premium workspaces across London instantly.</p>
            </button>

            <button 
              onClick={() => setSelectedRole('SUPPLIER')}
              className="group p-6 bg-white border-2 border-gray-100 hover:border-[#2D2D2D] rounded-[2rem] text-left transition-all hover:shadow-xl active:scale-[0.98]"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-[#2D2D2D] rounded-2xl flex items-center justify-center text-white group-hover:bg-[#E1E8E0] group-hover:text-[#2D2D2D] transition-colors">
                  <Building size={24} />
                </div>
                <ChevronRight size={20} className="text-gray-300 group-hover:text-[#2D2D2D] transition-colors" />
              </div>
              <h4 className="text-lg font-black text-[#2D2D2D]">I have desks to list</h4>
              <p className="text-xs text-gray-500 mt-1 font-medium">Maximize your square footage and manage bookings.</p>
            </button>
          </div>
        </>
      ) : (
        <div className="animate-in fade-in zoom-in-95 duration-300">
          <button 
            onClick={() => setSelectedRole(null)}
            className="text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-[#2D2D2D] mb-6 flex items-center gap-2"
          >
            ← Back to choice
          </button>
          
          <div className="mb-8">
            <h3 className="text-2xl font-black text-[#2D2D2D] mb-1">
              Continue as {selectedRole === 'GUEST' ? 'Guest' : 'Supplier'}
            </h3>
            <p className="text-sm text-gray-500 font-medium">Secure authentication for your account.</p>
          </div>

          <div className="space-y-3">
            <button 
              disabled={loading}
              onClick={() => handleSignIn('google')}
              className="w-full flex items-center justify-center gap-3 px-6 py-4 border-2 border-gray-100 rounded-2xl font-bold text-sm hover:border-[#2D2D2D] transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? <Loader2 className="animate-spin" size={20} /> : <Google size={20} />}
              Continue with Google
            </button>
            <button 
              disabled={loading}
              onClick={() => handleSignIn('apple')}
              className="w-full flex items-center justify-center gap-3 px-6 py-4 border-2 border-gray-100 rounded-2xl font-bold text-sm hover:border-[#2D2D2D] transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Smartphone size={20} />
              Continue with Apple
            </button>
            
            <div className="relative py-4">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-100"></div></div>
              <div className="relative flex justify-center text-[10px] font-black uppercase tracking-[0.2em] text-gray-300">
                <span className="bg-white px-4">or use email</span>
              </div>
            </div>

            <input 
              disabled={loading}
              type="email" 
              placeholder="name@company.com"
              className="w-full px-6 py-4 bg-gray-50 border-2 border-transparent focus:border-[#2D2D2D] focus:bg-white rounded-2xl text-sm font-bold outline-none transition-all"
            />
            <button 
              disabled={loading}
              onClick={() => handleSignIn('email')}
              className="w-full bg-[#2D2D2D] text-white py-4 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-black transition-all active:scale-[0.98] shadow-xl disabled:opacity-50"
            >
              {loading ? <Loader2 className="animate-spin mx-auto" size={20} /> : 'Send Login Link'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AuthPortal;
