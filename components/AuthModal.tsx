import React from 'react';
import { X } from 'lucide-react';
import AuthPortal from './AuthPortal';
import { Role } from '../types';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (role: Role) => void;
  onError: (message: string) => void;
}

const AuthModal: React.FC<Props> = ({ isOpen, onClose, onSuccess, onError }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[600] flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-[#2D2D2D]/60 backdrop-blur-sm animate-in fade-in duration-300" 
        onClick={onClose}
      />
      <div className="relative w-full max-w-md bg-white rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <button onClick={onClose} className="p-2 hover:bg-gray-50 rounded-full transition-colors">
            <X size={20} />
          </button>
          <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Secure Access</h2>
          <div className="w-10" />
        </div>

        <div className="p-8 pb-12">
          <AuthPortal 
            onAuthSuccess={(role) => onSuccess(role)} 
            onError={(msg) => onError(msg)} 
          />
          
          <p className="mt-10 text-[10px] text-gray-400 text-center leading-relaxed font-medium">
            By continuing, you agree to desk.london's <br />
            <span className="underline cursor-pointer">Terms of Service</span> and <span className="underline cursor-pointer">Privacy Policy</span>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;