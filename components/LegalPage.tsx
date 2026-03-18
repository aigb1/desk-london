import React, { useState, useEffect, useRef } from 'react';
import { ChevronRight, ChevronLeft, HelpCircle, ShieldAlert, Ban, ScrollText, UserCheck, Users, Building } from 'lucide-react';
import { LegalPageType } from '../types';

interface Props {
  type: LegalPageType;
  onBack: () => void;
}

const FAQItem = ({ question, answer }: { question: string, answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-gray-100">
      <button 
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-6 flex items-center justify-between text-left group"
      >
        <span className="text-lg font-bold text-[#2D2D2D] group-hover:text-black transition-colors">{question}</span>
        <div className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
           <ChevronRight size={20} className="text-gray-300" />
        </div>
      </button>
      <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-96 pb-6' : 'max-h-0'}`}>
        <p className="text-gray-500 leading-relaxed text-sm font-medium">{answer}</p>
      </div>
    </div>
  );
};

const LegalPage: React.FC<Props> = ({ type, onBack }) => {
  const [activeSection, setActiveSection] = useState<string>('');
  const contentRef = useRef<HTMLDivElement>(null);

  const titles: Record<LegalPageType, string> = {
    privacy: 'Privacy Policy',
    terms: 'Terms of Service',
    faq: 'Frequently Asked Questions',
    about: 'About desk.london'
  };

  const sections: Record<LegalPageType, { title: string, id: string, content: string }[]> = {
    privacy: [
      { id: 'collection', title: 'Data Collection', content: 'We collect information that identifies, relates to, describes, or is reasonably capable of being associated with you. This includes professional identifiers, financial data for transactions, and geolocation data necessary for building access and digital key functionality.' },
      { id: 'usage', title: 'How We Use Data', content: 'Your data is primarily used to facilitate bookings, process secure payments via Stripe, and generate encrypted digital keys for building entry. We also use aggregated, non-identifying data to improve the desk.london search algorithm and local recommendations.' },
      { id: 'security', title: 'Data Security', content: 'We implement robust technical and organizational measures to protect your personal information. Digital keys are non-transferable and utilize end-to-end encryption. Building access logs are stored securely and only accessible by authorized property managers.' },
      { id: 'cookies', title: 'Cookies & Tracking', content: 'Our platform uses essential cookies to maintain your session and role preferences. We do not sell your personal information to third parties for advertising purposes. You can manage your cookie preferences through your browser settings.' }
    ],
    terms: [
      { id: 'booking', title: 'Booking Policy', content: 'All bookings made through desk.london are subject to building-specific rules. "Instant Book" listings are confirmed immediately. Other listings require host approval. Your booking is not finalized until you receive a digital confirmation and receipt.' },
      { id: 'cancel', title: 'Cancellation', content: 'Standard cancellation is free up to 24 hours before your scheduled arrival. Late cancellations or "no-shows" may incur a fee equivalent to the full daily rate. Exceptional circumstances are reviewed by our concierge team on a case-by-case basis.' },
      { id: 'liability', title: 'Liability', content: 'desk.london acts as a marketplace connecting guests and hosts. While we vet all listings, building operators are responsible for maintaining the safety and facilities of the physical workspace. Guests must adhere to all local building safety protocols.' },
      { id: 'conduct', title: 'Code of Conduct', content: 'We expect all members of the desk.london community to act with professional courtesy. Respect the "Vibe" of your selected zone (e.g., maintain silence in Quiet Zones). Discriminatory behavior or misuse of facilities will lead to immediate account suspension.' }
    ],
    faq: [
      { id: 'guest_faq', title: 'For Guests & Teams', content: 'Find your flow with ease. Everything from credits to digital access for individuals and teams.' },
      { id: 'supplier_faq', title: 'For Workspace Suppliers', content: 'Turn your empty desks into revenue. Software and hardware integration details for property managers.' }
    ],
    about: [
      { id: 'mission', title: 'Our Mission', content: 'To democratize access to the capital\'s best workspaces. We believe the future of London is flexible, hybrid, and hospitality-led.' },
      { id: 'work', title: 'How it Works', content: 'Find a desk by neighborhood or vibe, book instantly using your London Pass, and unlock the door with your phone. No long-term leases, just pure productivity.' }
    ]
  };

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-10% 0px -70% 0px',
      threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, observerOptions);

    sections[type].forEach((sec) => {
      const el = document.getElementById(sec.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [type]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 120; // Sticky header offset
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setActiveSection(id);
    }
  };

  return (
    <div className="min-h-screen bg-[#FCFAFA] pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row gap-16">
        
        {/* Sticky Sidebar */}
        <aside className="w-full md:w-64 shrink-0">
          <div className="sticky top-32 space-y-10">
            <button 
              type="button"
              onClick={onBack}
              className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-black mb-8 transition-all group"
            >
              <ChevronLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> 
              Return Home
            </button>
            
            <div>
              <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-6 px-1">Table of Contents</h4>
              <nav className="space-y-3">
                {sections[type].map(s => {
                  const isActive = activeSection === s.id;
                  return (
                    <button 
                      key={s.id} 
                      type="button"
                      onClick={() => scrollToSection(s.id)}
                      className={`w-full text-left block px-4 py-2.5 rounded-xl text-sm font-bold transition-all border-2
                        ${isActive 
                          ? 'border-[#2D2D2D]/20 bg-[#E1E8E0]/10 text-[#2D2D2D]' 
                          : 'border-transparent text-gray-500 hover:bg-gray-50 hover:text-[#2D2D2D]'
                        }`}
                    >
                      {s.title}
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>
        </aside>

        {/* Content Area */}
        <main className="flex-1 max-w-2xl" ref={contentRef}>
          <h1 className="text-5xl font-black text-[#2D2D2D] mb-12 tracking-tight leading-tight">{titles[type]}</h1>
          
          <div className="prose prose-sm font-medium text-gray-500 leading-[1.8] space-y-16">
            
            {type === 'faq' ? (
              <div className="space-y-16">
                {sections.faq.map(sec => (
                  <section key={sec.id} id={sec.id} className="scroll-mt-32">
                    <div className="flex items-center gap-3 mb-6">
                      {sec.id === 'guest_faq' ? <Users size={28} className="text-[#2D2D2D]" /> : <Building size={28} className="text-[#2D2D2D]" />}
                      <h2 className="text-2xl font-black text-[#2D2D2D]">{sec.title}</h2>
                    </div>
                    
                    {sec.id === 'guest_faq' && (
                      <div className="space-y-2">
                        <FAQItem 
                          question="How does the London Pass work?" 
                          answer="The London Pass is our flexible credit system. You purchase credits in advance which can be redeemed at any desk across the capital. Credits never expire and provide 1-click booking without entering card details every time." 
                        />
                        <FAQItem 
                          question="Can I book for my whole team?" 
                          answer="Yes. Our 'Teams' functionality allows an admin to book multiple desks or private pods simultaneously. You can also assign individual credit limits to team members." 
                        />
                        <FAQItem 
                          question="What happens if the digital key doesn't work?" 
                          answer="Our digital keys use encrypted BLE/NFC. Ensure your Bluetooth is enabled and you have the desk.london app open. If failure persists, every building has a 24/7 concierge or physical backup code accessible in your booking details." 
                        />
                        <FAQItem 
                          question="Is there a minimum booking time?" 
                          answer="Most desks are available for daily rental (9am-6pm). We also offer weekly and monthly bundles for higher discounts and long-term residency." 
                        />
                        <FAQItem 
                          question="Can I bring a guest for a meeting?" 
                          answer="This depends on the building's specific rules. Generally, hot desking is for one person, but private offices and meeting rooms allow for guests up to the room's capacity." 
                        />
                      </div>
                    )}

                    {sec.id === 'supplier_faq' && (
                      <div className="space-y-2">
                        <FAQItem 
                          question="How much does it cost to list my space?" 
                          answer="desk.london is a SaaS-first platform. We don't take a 20% commission on every booking. Instead, we charge a flat monthly subscription starting at £49. This allows you to keep 100% of your booking revenue." 
                        />
                        <FAQItem 
                          question="What hardware do I need for digital keys?" 
                          answer="We integrate directly with Kisi, Salto, and HID via API. If you have these systems, integration takes minutes. If you have no smart locks, we can provide a partner installer to upgrade your door." 
                        />
                        <FAQItem 
                          question="When do I get paid for bookings?" 
                          answer="Payouts are processed daily. Once a guest completes their stay, the funds are released to your connected Stripe account and arrive in your bank within 1-3 business days." 
                        />
                        <FAQItem 
                          question="How do you handle security and insurance?" 
                          answer="Every guest is verified via ID and linked payment. However, property managers must maintain their own public liability insurance. desk.london provides a secondary 'Host Guarantee' for property damage up to £5,000." 
                        />
                        <FAQItem 
                          question="Can I set my own custom house rules?" 
                          answer="Absolutely. You can define quiet hours, pet policies, and specific check-in requirements for every listing through your Supplier Dashboard." 
                        />
                      </div>
                    )}
                  </section>
                ))}
              </div>
            ) : (
              <div className="space-y-20">
                {sections[type].map(sec => (
                  <section key={sec.id} id={sec.id} className="scroll-mt-32 animate-in fade-in duration-700">
                    <div className="flex items-center gap-3 mb-6">
                       {sec.id === 'liability' && <ShieldAlert size={28} className="text-[#2D2D2D]" />}
                       {sec.id === 'cancel' && <Ban size={28} className="text-[#2D2D2D]" />}
                       {sec.id === 'booking' && <ScrollText size={28} className="text-[#2D2D2D]" />}
                       {sec.id === 'conduct' && <UserCheck size={28} className="text-[#2D2D2D]" />}
                       <h2 className="text-2xl font-black text-[#2D2D2D]">{sec.title}</h2>
                    </div>
                    
                    <p className="text-gray-600 leading-relaxed">{sec.content}</p>
                    
                    {sec.id === 'conduct' && (
                      <ul className="list-disc pl-5 mt-6 space-y-4 text-gray-600">
                        <li>Standard cancellation is free up to 24 hours before your slot.</li>
                        <li>Members must adhere to the Vibe Guidelines (Quiet vs Social) of their selected zone.</li>
                        <li>Digital keys are non-transferable and tied to your unique device ID.</li>
                      </ul>
                    )}

                    {sec.id === 'security' && (
                      <div className="mt-8 p-6 bg-white border border-gray-100 rounded-3xl flex items-start gap-4 shadow-sm">
                        <div className="w-10 h-10 bg-[#E1E8E0] rounded-xl flex items-center justify-center shrink-0">
                          <HelpCircle size={20} className="text-[#2D2D2D]" />
                        </div>
                        <div>
                          <h4 className="text-xs font-black uppercase tracking-widest text-[#2D2D2D] mb-1">Encrypted Access</h4>
                          <p className="text-[12px] text-gray-500 font-medium leading-relaxed">All digital entry tokens are refreshed every 60 seconds to ensure the highest level of building security.</p>
                        </div>
                      </div>
                    )}

                    {sec.id === 'liability' && (
                      <div className="mt-8 p-6 bg-[#FCFAFA] border border-gray-100 rounded-3xl">
                         <p className="text-[12px] text-gray-400 font-bold uppercase tracking-widest mb-2">Guest Responsibility</p>
                         <p className="text-xs text-gray-500 leading-relaxed italic">By booking, you acknowledge that desk.london is not liable for personal property lost or stolen within third-party workspace facilities.</p>
                      </div>
                    )}
                  </section>
                ))}
              </div>
            )}

            <div className="pt-12 border-t border-gray-100">
               <div className="p-8 bg-[#E1E8E0]/20 rounded-3xl border border-[#E1E8E0]/40 flex flex-col sm:flex-row items-center gap-6">
                  <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-[#2D2D2D] shadow-sm shrink-0">
                    <HelpCircle size={32} />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#2D2D2D]">Still need help?</h4>
                    <p className="text-sm">Our concierge team is available 24/7 for London access support.</p>
                  </div>
                  <button type="button" className="sm:ml-auto w-full sm:w-auto bg-[#2D2D2D] text-white px-8 py-3 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-black transition-all active:scale-95 shadow-xl">Chat Now</button>
               </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default LegalPage;