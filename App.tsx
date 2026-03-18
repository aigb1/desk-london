import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Neighborhoods from './components/Neighborhoods';
import TopRated from './components/TopRated';
import ValueProp from './components/ValueProp';
import SEOBlock from './components/SEOBlock';
import Footer from './components/Footer';
import BottomNav from './components/BottomNav';
import PWAInstallPrompt from './components/PWAInstallPrompt';
import SearchPage from './components/SearchPage';
import AIChat from './components/AIChat';
import AIConciergeModal from './components/AIConciergeModal';
import DeskDetailPage from './components/DeskDetailPage';
import GuestDashboard from './components/GuestDashboard';
import SupplierDashboard from './components/SupplierDashboard';
import AddListingFlow from './components/AddListingFlow';
import ManageListings from './components/ManageListings';
import TeamsLandingPage from './components/TeamsLandingPage';
import TeamAdminDashboard from './components/TeamAdminDashboard';
import NeighborhoodPage from './components/NeighborhoodPage';
import LegalPage from './components/LegalPage';
import AuthModal from './components/AuthModal';
import Toast from './components/Toast';
import SupplierSaaSPage from './components/SupplierSaaSPage';
import { Desk, User, Role, LegalPageType, SearchFilters } from './types';

type ViewType = 'home' | 'search' | 'detail' | 'guest-dashboard' | 'supplier-dashboard' | 'add-listing' | 'manage-listings' | 'teams' | 'team-dashboard' | 'neighborhood' | 'legal' | 'supplier-saas';

const App: React.FC = () => {
  const [view, setView] = useState<ViewType>('home');
  const [isAppLoading, setIsAppLoading] = useState(true);
  const [selectedDesk, setSelectedDesk] = useState<Desk | null>(null);
  const [selectedNeighborhood, setSelectedNeighborhood] = useState<string | null>(null);
  const [legalType, setLegalType] = useState<LegalPageType>('faq');
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isConciergeOpen, setIsConciergeOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [searchInitialFilters, setSearchInitialFilters] = useState<Partial<SearchFilters> | null>(null);
  
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('desk_london_user');
    return saved ? JSON.parse(saved) : null;
  });

  // Global Loading Simulation
  useEffect(() => {
    setIsAppLoading(true);
    const timer = setTimeout(() => setIsAppLoading(false), 800);
    return () => clearTimeout(timer);
  }, [view, selectedDesk, selectedNeighborhood]);

  // Boutique SEO & Dynamic Metadata Logic
  useEffect(() => {
    let title = "Desk Space London | Coworking Space London | desk.london";
    let description = "Discover London's most inspiring independent workspaces. No chains, just curated boutique desks and creative hubs in the heart of the capital.";
    let image = "https://img.icons8.com/ios-filled/512/2D2D2D/office-chair.png";

    switch(view) {
      case 'search':
        title = `Find Your Indie Base | desk.london`;
        description = "Search handpicked boutique hot desks and private offices across London’s creative neighborhoods. Filter by vibe and community.";
        break;
      case 'detail':
        if (selectedDesk) {
          title = `${selectedDesk.title} | ${selectedDesk.neighborhood} Boutique Workspace | desk.london`;
          description = `Book your place at ${selectedDesk.title} in ${selectedDesk.neighborhood}. A curated ${selectedDesk.vibe} workspace near ${selectedDesk.nearest_station?.name}.`;
          image = selectedDesk.image;
        }
        break;
      case 'teams':
        title = "Boutique Workspaces for Teams | desk.london";
        description = "Empower your startup with access to London’s best independent offices. Flexible multi-user passes for the city's most ambitious teams.";
        break;
      case 'supplier-saas':
        title = "List Your Independent Space | desk.london";
        description = "Join London’s premier platform for indie operators. No-commission, flat-fee listings for boutique coworking spaces and creative studios.";
        break;
      case 'neighborhood':
        if (selectedNeighborhood) {
          title = `Coworking in ${selectedNeighborhood} | Independent Hubs | desk.london`;
          description = `Discover the best independent hot desks and private offices in ${selectedNeighborhood}. Handpicked workspaces with local character.`;
        }
        break;
    }

    document.title = title;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', description);

    const updateOG = (property: string, content: string) => {
      let el = document.querySelector(`meta[property="${property}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute('property', property);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    updateOG('og:title', title);
    updateOG('og:description', description);
    updateOG('og:image', image);
    updateOG('og:type', 'website');
    updateOG('og:url', window.location.href);

  }, [view, selectedDesk, selectedNeighborhood]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [view, selectedDesk, selectedNeighborhood]);

  const handleLoginClick = () => setIsAuthModalOpen(true);
  
  const handleAuthSuccess = (role: Role) => {
    const mockUser: User = {
      id: 'u1',
      name: role === 'SUPPLIER' ? 'Oliver' : 'Alex',
      email: role === 'SUPPLIER' ? 'oliver@workspace.london' : 'alex@guest.london',
      role: role,
      avatar: `https://i.pravatar.cc/150?u=${role.toLowerCase()}`
    };
    setCurrentUser(mockUser);
    localStorage.setItem('desk_london_user', JSON.stringify(mockUser));
    setIsAuthModalOpen(false);
    
    if (view === 'supplier-saas') {
      setView('add-listing');
    } else {
      setView(role === 'SUPPLIER' ? 'supplier-dashboard' : 'guest-dashboard');
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('desk_london_user');
    setView('home');
  };

  const handleBottomNavChange = (newView: any) => {
    if (newView === 'concierge') {
      setIsConciergeOpen(true);
      return;
    }
    if (newView === 'contact') {
      setLegalType('faq');
      setView('legal');
      return;
    }
    if (newView === 'profile') {
      if (currentUser) {
        setView(currentUser.role === 'SUPPLIER' ? 'supplier-dashboard' : 'guest-dashboard');
      } else {
        setIsAuthModalOpen(true);
      }
      return;
    }
    setView(newView);
  };

  const handleListSpaceTrigger = () => {
    if (currentUser?.role === 'SUPPLIER') {
      setView('supplier-dashboard');
    } else {
      setView('add-listing');
    }
  };

  const resetToHome = () => {
    setSearchInitialFilters(null);
    setView('home');
  };

  const handleSearchTrigger = (filters: Partial<SearchFilters>) => {
    setSearchInitialFilters(filters);
    setView('search');
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header 
        currentUser={currentUser} 
        onLogout={handleLogout} 
        onLoginClick={handleLoginClick}
        onLogoClick={resetToHome}
        onExploreClick={() => { setSearchInitialFilters(null); setView('search'); }}
        onTeamsClick={() => setView('teams')}
        onConciergeClick={() => setIsConciergeOpen(true)}
        onGuestDashboardClick={() => setView('guest-dashboard')}
        onSupplierDashboardClick={handleListSpaceTrigger}
        isConciergeActive={isConciergeOpen}
      />

      <main className="flex-1 pb-20 md:pb-0 bg-white">
        {view === 'home' && (
          <>
            <Hero 
              onSearchClick={handleSearchTrigger} 
              onConciergeClick={() => setIsConciergeOpen(true)}
              isLoading={isAppLoading}
            />
            <Neighborhoods 
              onNeighborhoodClick={(name) => {
                setSelectedNeighborhood(name);
                setView('neighborhood');
              }} 
              isLoading={isAppLoading}
            />
            <TopRated 
              onDeskClick={(desk) => {
                setSelectedDesk(desk);
                setView('detail');
              }} 
              onViewAllClick={() => { setSearchInitialFilters(null); setView('search'); }} 
              isLoading={isAppLoading}
            />
            <ValueProp />
            <SEOBlock />
          </>
        )}

        {view === 'search' && (
          <SearchPage 
            onDeskClick={(desk) => {
              setSelectedDesk(desk);
              setView('detail');
            }} 
            onLogoClick={resetToHome}
            initialFilters={searchInitialFilters}
            currentUser={currentUser}
            onLoginClick={handleLoginClick}
            onLogout={handleLogout}
            onGuestDashboardClick={() => setView('guest-dashboard')}
            onSupplierDashboardClick={handleListSpaceTrigger}
            onConciergeClick={() => setIsConciergeOpen(true)}
            isLoading={isAppLoading}
          />
        )}

        {view === 'neighborhood' && selectedNeighborhood && (
          <NeighborhoodPage 
            name={selectedNeighborhood} 
            onBack={resetToHome} 
            onDeskClick={(desk) => {
              setSelectedDesk(desk);
              setView('detail');
            }}
          />
        )}

        {view === 'detail' && selectedDesk && (
          <DeskDetailPage 
            desk={selectedDesk} 
            onBack={() => setView('search')} 
            currentUser={currentUser}
            onAuthSuccess={(user) => { setCurrentUser(user); localStorage.setItem('desk_london_user', JSON.stringify(user)); }}
            onAuthError={(msg) => setToastMessage(msg)}
            isLoading={isAppLoading}
          />
        )}

        {view === 'guest-dashboard' && <GuestDashboard />}
        {view === 'supplier-dashboard' && (
          <SupplierDashboard 
            onAddListing={() => setView('add-listing')} 
            onManageListings={() => setView('manage-listings')} 
          />
        )}
        {view === 'add-listing' && <AddListingFlow onCancel={resetToHome} onComplete={() => setView('manage-listings')} />}
        {view === 'manage-listings' && <ManageListings onBack={() => setView('supplier-dashboard')} />}
        
        {view === 'teams' && (
          <TeamsLandingPage 
            onSearchTeams={() => { setSearchInitialFilters({ isTeamMode: true }); setView('search'); }}
            onBookTeamPod={(desk) => { setSelectedDesk(desk); setView('detail'); }}
          />
        )}

        {view === 'legal' && <LegalPage type={legalType} onBack={resetToHome} />}
        
        {view === 'supplier-saas' && (
          <SupplierSaaSPage onBack={resetToHome} onStartTrial={() => setIsAuthModalOpen(true)} />
        )}
      </main>

      <Footer 
        onNeighborhoodClick={(name) => { setSelectedNeighborhood(name); setView('neighborhood'); }}
        onLegalClick={(type) => { setLegalType(type); setView('legal'); }}
        onPricingClick={() => setView('supplier-saas')}
      />

      {view !== 'add-listing' && (
        <BottomNav 
          currentUser={currentUser} 
          currentView={view} 
          onViewChange={handleBottomNavChange} 
        />
      )}

      <PWAInstallPrompt />
      
      <AIConciergeModal 
        isOpen={isConciergeOpen} 
        onClose={() => setIsConciergeOpen(false)} 
        onDeskClick={(desk) => {
          setSelectedDesk(desk);
          setIsConciergeOpen(false);
          setView('detail');
        }}
      />

      <AIChat />

      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
        onSuccess={handleAuthSuccess}
        onError={(msg) => setToastMessage(msg)}
      />

      {toastMessage && <Toast message={toastMessage} onClose={() => setToastMessage(null)} />}
    </div>
  );
};

export default App;