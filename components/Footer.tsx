
import React from 'react';
import { Instagram, Twitter, Linkedin, Facebook, Globe, PoundSterling } from 'lucide-react';
import { LegalPageType } from '../types';

interface Props {
  onNeighborhoodClick?: (name: string) => void;
  onLegalClick?: (type: LegalPageType) => void;
  onPricingClick?: () => void;
}

const Footer: React.FC<Props> = ({ onNeighborhoodClick, onLegalClick, onPricingClick }) => {
  return (
    <footer className="bg-white border-t border-gray-100 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-16">
          
          <div>
            <h4 className="font-bold text-sm mb-6 uppercase tracking-wider">Central London</h4>
            <ul className="space-y-4 text-sm text-gray-500">
              <li><button onClick={() => onNeighborhoodClick?.('Soho')} className="hover:underline">Soho</button></li>
              <li><button onClick={() => onNeighborhoodClick?.('Mayfair')} className="hover:underline">Mayfair</button></li>
              <li><button onClick={() => onNeighborhoodClick?.('Fitzrovia')} className="hover:underline">Fitzrovia</button></li>
              <li><button onClick={() => onNeighborhoodClick?.('Holborn')} className="hover:underline">Holborn</button></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-sm mb-6 uppercase tracking-wider">The City</h4>
            <ul className="space-y-4 text-sm text-gray-500">
              <li><button onClick={() => onNeighborhoodClick?.('Bank')} className="hover:underline">Bank</button></li>
              <li><button onClick={() => onNeighborhoodClick?.('Liverpool St')} className="hover:underline">Liverpool St</button></li>
              <li><button onClick={() => onNeighborhoodClick?.('Old St')} className="hover:underline">Old St</button></li>
              <li><button onClick={() => onNeighborhoodClick?.('Clerkenwell')} className="hover:underline">Clerkenwell</button></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-sm mb-6 uppercase tracking-wider">East London</h4>
            <ul className="space-y-4 text-sm text-gray-500">
              <li><button onClick={() => onNeighborhoodClick?.('Shoreditch')} className="hover:underline">Shoreditch</button></li>
              <li><button onClick={() => onNeighborhoodClick?.('Hackney')} className="hover:underline">Hackney</button></li>
              <li><button onClick={() => onNeighborhoodClick?.('Canary Wharf')} className="hover:underline">Canary Wharf</button></li>
              <li><button onClick={() => onNeighborhoodClick?.('Stratford')} className="hover:underline">Stratford</button></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-sm mb-6 uppercase tracking-wider">Support</h4>
            <ul className="space-y-4 text-sm text-gray-500">
              <li><button onClick={() => onLegalClick?.('faq')} className="hover:underline">FAQs</button></li>
              <li><button onClick={() => onPricingClick?.()} className="hover:underline">Pricing</button></li>
              <li><button onClick={() => onLegalClick?.('privacy')} className="hover:underline">Privacy Policy</button></li>
              <li><button onClick={() => onLegalClick?.('terms')} className="hover:underline">Terms of Service</button></li>
              <li><button onClick={() => onPricingClick?.()} className="hover:underline">List Your Space</button></li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-gray-100 gap-8">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <span className="text-sm text-gray-500">© 2026 desk.london. Built for the capital.</span>
            <div className="flex items-center gap-4">
              <a href="#" className="text-gray-400 hover:text-black transition-colors"><Twitter size={18} /></a>
              <a href="#" className="text-gray-400 hover:text-black transition-colors"><Instagram size={18} /></a>
              <a href="#" className="text-gray-400 hover:text-black transition-colors"><Linkedin size={18} /></a>
              <a href="#" className="text-gray-400 hover:text-black transition-colors"><Facebook size={18} /></a>
            </div>
          </div>

          <div className="flex items-center gap-6 text-sm font-semibold">
            <div className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors">
              <Globe size={16} />
              <span>English (UK)</span>
            </div>
            <div className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors">
              <PoundSterling size={16} />
              <span>GBP</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
