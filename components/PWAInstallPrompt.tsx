
import React, { useState, useEffect } from 'react';
import { X, Smartphone, Download } from 'lucide-react';

const PWAInstallPrompt: React.FC = () => {
  const [show, setShow] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

  useEffect(() => {
    // 1. Frequency Control Check
    const dismissedUntil = localStorage.getItem('desk_london_pwa_snooze');
    const isSnoozed = dismissedUntil && new Date().getTime() < parseInt(dismissedUntil);
    if (isSnoozed) return;

    // 2. Already Installed Check
    const isStandalone = 
      window.matchMedia('(display-mode: standalone)').matches || 
      (window.navigator as any).standalone === true;
    
    if (isStandalone) return;

    // 3. Logic for Browsers Supporting beforeinstallprompt
    const handleBeforeInstall = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
      
      // Trigger prompt after 10s delay
      const timer = setTimeout(() => {
        setShow(true);
      }, 10000);
      return () => clearTimeout(timer);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstall);

    // 4. iOS Detection (iOS doesn't fire beforeinstallprompt)
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;
    if (isIOS) {
      const timer = setTimeout(() => {
        setShow(true);
      }, 10000);
      return () => clearTimeout(timer);
    }

    return () => window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
  }, []);

  const handleDismiss = () => {
    setShow(false);
    // Snooze for 7 days
    const snoozeTime = new Date().getTime() + 7 * 24 * 60 * 60 * 1000;
    localStorage.setItem('desk_london_pwa_snooze', snoozeTime.toString());
  };

  const handleInstall = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setShow(false);
      }
      setDeferredPrompt(null);
    } else {
      // iOS Specific Instructions
      alert('To install desk.london on iOS:\n1. Tap the Share button in your browser.\n2. Scroll down and tap "Add to Home Screen".');
      setShow(false);
    }
  };

  if (!show) return null;

  return (
    <div className="fixed bottom-24 left-4 right-4 z-[100] sm:left-auto sm:right-8 sm:w-96 animate-in slide-in-from-bottom-10 duration-700">
      <div className="bg-[#FCFAFA] border border-[#2D2D2D]/10 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)] rounded-[2.5rem] p-5 flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-[#2D2D2D] rounded-2xl flex items-center justify-center shrink-0 shadow-lg">
            <Smartphone size={24} className="text-[#FCFAFA]" />
          </div>
          <div className="text-left">
            <h4 className="text-sm font-black text-[#2D2D2D] tracking-tight leading-none mb-1">Install App</h4>
            <p className="text-[11px] text-gray-500 font-medium leading-tight">Instant access & offline keys.</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <button 
            onClick={handleInstall}
            className="bg-[#2D2D2D] text-white px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-black transition-all active:scale-95 shadow-md flex items-center gap-2"
          >
            <Download size={14} />
            Install
          </button>
          <button 
            onClick={handleDismiss}
            className="p-2 text-gray-300 hover:text-[#2D2D2D] transition-colors"
            aria-label="Dismiss prompt"
          >
            <X size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PWAInstallPrompt;
