
import React, { useEffect } from 'react';
import { X, AlertCircle } from 'lucide-react';

interface Props {
  message: string;
  onClose: () => void;
}

const Toast: React.FC<Props> = ({ message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 5000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-[300] w-full max-w-sm px-4 animate-in slide-in-from-bottom-4">
      <div className="bg-[#2D2D2D] text-white rounded-2xl p-4 shadow-2xl flex items-center justify-between border border-white/10">
        <div className="flex items-center gap-3">
          <AlertCircle className="text-red-400" size={18} />
          <p className="text-xs font-bold leading-relaxed">{message}</p>
        </div>
        <button onClick={onClose} className="p-1 hover:bg-white/10 rounded-lg transition-colors">
          <X size={16} />
        </button>
      </div>
    </div>
  );
};

export default Toast;
