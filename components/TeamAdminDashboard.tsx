
import React, { useState } from 'react';
import { 
  Users, Mail, CreditCard, Calendar, 
  ChevronRight, MapPin, UserPlus, Tally4,
  DollarSign, TrendingUp, Bell, Search, 
  Smartphone, ShieldCheck, Check, Send
} from 'lucide-react';
import { User, TeamMember, TeamBooking } from '../types';

const TeamAdminDashboard: React.FC<{ user: User }> = ({ user }) => {
  const [activeTab, setActiveTab] = useState<'roster' | 'bookings' | 'billing'>('roster');
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');

  const [members, setMembers] = useState<TeamMember[]>([
    { id: '1', name: 'Alex Thompson', email: 'alex@team.london', avatar: 'https://i.pravatar.cc/150?u=alex', role: 'member', credits: 450, status: 'active' },
    { id: '2', name: 'Sarah Wu', email: 'sarah@team.london', avatar: 'https://i.pravatar.cc/150?u=sarah', role: 'member', credits: 120, status: 'active' },
    { id: '3', name: 'James Miller', email: 'james@team.london', avatar: 'https://i.pravatar.cc/150?u=james', role: 'admin', credits: 1200, status: 'active' },
    { id: '4', name: 'Lila Grace', email: 'lila@team.london', avatar: 'https://i.pravatar.cc/150?u=lila', role: 'member', credits: 0, status: 'invited' },
  ]);

  const teamBookings: TeamBooking[] = [
    { id: 'b1', memberId: '1', deskId: '1', date: 'Today', seatNumber: 'D4' },
    { id: 'b2', memberId: '2', deskId: '1', date: 'Today', seatNumber: 'D5' },
    { id: 'b3', memberId: '3', deskId: '1', date: 'Today', seatNumber: 'D1' },
  ];

  const handleInvite = () => {
    if (!inviteEmail) return;
    const newMember: TeamMember = {
      id: Math.random().toString(),
      name: inviteEmail.split('@')[0],
      email: inviteEmail,
      avatar: `https://i.pravatar.cc/150?u=${inviteEmail}`,
      role: 'member',
      credits: 0,
      status: 'invited'
    };
    setMembers([...members, newMember]);
    setInviteEmail('');
    setShowInviteModal(false);
  };

  return (
    <div className="min-h-screen bg-[#FCFAFA] pt-32 pb-24 px-4 md:px-8">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12">
        
        {/* Sidebar Nav */}
        <aside className="w-full lg:w-64 flex flex-col gap-2 h-fit">
           <div className="p-8 bg-[#2D2D2D] rounded-[2.5rem] text-white mb-6 shadow-xl">
              <p className="text-[9px] font-black uppercase tracking-widest text-white/40 mb-2">Team Account</p>
              <h3 className="text-xl font-black">Innovation HQ</h3>
              <div className="mt-8 flex items-center gap-2">
                 <div className="w-2 h-2 bg-green-400 rounded-full" />
                 <span className="text-[10px] font-bold uppercase tracking-widest">Active Monthly</span>
              </div>
           </div>
           {[
             { id: 'roster', label: 'Team Roster', icon: <Users size={18} /> },
             { id: 'bookings', label: 'Collaborative Booking', icon: <Calendar size={18} /> },
             { id: 'billing', label: 'Consolidated Billing', icon: <CreditCard size={18} /> }
           ].map(tab => (
             <button 
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-4 px-8 py-4 rounded-2xl font-bold text-sm transition-all
                ${activeTab === tab.id ? 'bg-[#E1E8E0] text-[#2D2D2D] shadow-sm' : 'hover:bg-white text-gray-400'}`}
             >
                {tab.icon} {tab.label}
             </button>
           ))}
        </aside>

        {/* Main Content */}
        <main className="flex-1 space-y-12">
           
           {activeTab === 'roster' && (
             <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="flex items-end justify-between mb-10">
                   <div>
                      <h1 className="text-4xl font-black text-[#2D2D2D] tracking-tight mb-2">Manage Roster</h1>
                      <p className="text-gray-500 font-medium">Assign credits and manage member access.</p>
                   </div>
                   <button 
                    onClick={() => setShowInviteModal(true)}
                    className="bg-[#2D2D2D] text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] flex items-center gap-3 shadow-xl hover:bg-black transition-all active:scale-95"
                   >
                      <UserPlus size={16} /> Invite Member
                   </button>
                </div>

                <div className="bg-white border border-gray-100 rounded-[3rem] overflow-hidden shadow-sm">
                   <table className="w-full text-left">
                      <thead>
                        <tr className="border-b border-gray-50 bg-gray-50/30">
                          <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-gray-400">Member</th>
                          <th className="px-6 py-6 text-[10px] font-black uppercase tracking-widest text-gray-400">Role</th>
                          <th className="px-6 py-6 text-[10px] font-black uppercase tracking-widest text-gray-400">Credits</th>
                          <th className="px-6 py-6 text-[10px] font-black uppercase tracking-widest text-gray-400">Status</th>
                          <th className="px-8 py-6 text-right"></th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-50">
                        {members.map(member => (
                          <tr key={member.id} className="hover:bg-gray-50/50 transition-colors">
                             <td className="px-8 py-6">
                                <div className="flex items-center gap-4">
                                   <img src={member.avatar} className="w-10 h-10 rounded-full object-cover" alt="" />
                                   <div>
                                      <h4 className="text-sm font-bold">{member.name}</h4>
                                      <p className="text-[11px] text-gray-400 font-medium">{member.email}</p>
                                   </div>
                                </div>
                             </td>
                             <td className="px-6 py-6">
                                <span className={`text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-md
                                  ${member.role === 'admin' ? 'bg-indigo-50 text-indigo-600' : 'bg-gray-100 text-gray-500'}`}>
                                   {member.role}
                                </span>
                             </td>
                             <td className="px-6 py-6 font-black text-sm text-[#2D2D2D]">
                                £{member.credits}
                             </td>
                             <td className="px-6 py-6">
                                <div className="flex items-center gap-2">
                                   <div className={`w-1.5 h-1.5 rounded-full ${member.status === 'active' ? 'bg-green-500' : 'bg-orange-400 animate-pulse'}`} />
                                   <span className="text-[10px] font-bold text-gray-500 uppercase">{member.status}</span>
                                </div>
                             </td>
                             <td className="px-8 py-6 text-right">
                                <button className="text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-black">Edit</button>
                             </td>
                          </tr>
                        ))}
                      </tbody>
                   </table>
                </div>
             </div>
           )}

           {activeTab === 'bookings' && (
             <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-12">
                <div className="flex items-end justify-between mb-4">
                   <div>
                      <h1 className="text-4xl font-black text-[#2D2D2D] tracking-tight mb-2">Who's in Today?</h1>
                      <p className="text-gray-500 font-medium">Real-time seating map for your Shoreditch HQ session.</p>
                   </div>
                   <div className="flex items-center gap-3">
                      <div className="flex -space-x-3">
                         {members.slice(0, 3).map(m => (
                           <img key={m.id} src={m.avatar} className="w-10 h-10 rounded-full border-4 border-white shadow-sm" alt="" />
                         ))}
                         <div className="w-10 h-10 rounded-full border-4 border-white bg-gray-100 flex items-center justify-center text-[10px] font-black text-gray-400 shadow-sm">+8</div>
                      </div>
                   </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                   {/* Seating Map */}
                   <div className="lg:col-span-2 bg-white border border-gray-100 rounded-[3rem] p-10 shadow-sm relative aspect-square lg:aspect-video">
                      <h3 className="text-xs font-black uppercase tracking-[0.2em] text-gray-400 mb-8">The Industrial Loft · Pod #4</h3>
                      <div className="grid grid-cols-6 grid-rows-4 gap-4 h-full">
                         {[...Array(24)].map((_, i) => {
                            const seatId = `D${i+1}`;
                            const booking = teamBookings.find(b => b.seatNumber === seatId);
                            const member = booking ? members.find(m => m.id === booking.memberId) : null;
                            return (
                              <div 
                                key={seatId} 
                                className={`rounded-2xl border-2 flex items-center justify-center transition-all relative group
                                  ${booking ? 'border-[#2D2D2D] bg-[#FCFAFA] shadow-md' : 'border-gray-50 border-dashed hover:border-gray-200'}`}
                              >
                                {member ? (
                                  <img src={member.avatar} className="w-10 h-10 rounded-full object-cover shadow-inner" title={member.name} alt="" />
                                ) : (
                                  <span className="text-[10px] font-bold text-gray-200">{seatId}</span>
                                )}
                                {member && (
                                  <div className="absolute bottom-full mb-2 bg-[#2D2D2D] text-white text-[10px] font-bold px-3 py-1 rounded-lg hidden group-hover:block whitespace-nowrap z-10 shadow-2xl animate-in zoom-in-95">
                                    {member.name}
                                  </div>
                                )}
                              </div>
                            );
                         })}
                      </div>
                   </div>

                   {/* Activity Feed */}
                   <div className="space-y-8">
                      <div className="bg-[#2D2D2D] rounded-[2.5rem] p-10 text-white shadow-2xl">
                         <h4 className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-8">Next Team Session</h4>
                         <div className="space-y-6 mb-10">
                            <div className="flex items-center gap-4">
                               <MapPin size={24} className="text-white/40" />
                               <div>
                                  <p className="font-black">Tea Building, Shoreditch</p>
                                  <p className="text-[10px] text-white/40 uppercase font-bold tracking-widest">Pod #4 · 12 Desks</p>
                               </div>
                            </div>
                            <div className="flex items-center gap-4">
                               <Calendar size={24} className="text-white/40" />
                               <div>
                                  <p className="font-black">Tomorrow, 10:00 AM</p>
                                  <p className="text-[10px] text-white/40 uppercase font-bold tracking-widest">Digital Key Ready</p>
                               </div>
                            </div>
                         </div>
                         <button className="w-full bg-white text-[#2D2D2D] py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] shadow-xl hover:scale-105 active:scale-95 transition-all">
                            Notify All Members
                         </button>
                      </div>

                      <div className="bg-white border border-gray-100 rounded-[2.5rem] p-8">
                         <div className="flex items-center gap-3 mb-6">
                            <Bell className="text-orange-500" size={18} />
                            <h4 className="text-sm font-bold">Recent Updates</h4>
                         </div>
                         <div className="space-y-4">
                            <p className="text-xs text-gray-500"><span className="font-bold text-[#2D2D2D]">Alex T.</span> checked into Pod #4.</p>
                            <p className="text-xs text-gray-500"><span className="font-bold text-[#2D2D2D]">Sarah W.</span> added a guest for 2pm.</p>
                            <p className="text-xs text-gray-500"><span className="font-bold text-[#2D2D2D]">System:</span> Boardroom access enabled.</p>
                         </div>
                      </div>
                   </div>
                </div>
             </div>
           )}

           {activeTab === 'billing' && (
             <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                   <div className="md:col-span-2 bg-[#FCFAFA] border-2 border-[#2D2D2D] rounded-[3rem] p-12 shadow-sm relative overflow-hidden">
                      <div className="absolute top-0 right-0 p-8 opacity-5">
                         <DollarSign size={160} strokeWidth={1} />
                      </div>
                      <div className="relative z-10">
                         <p className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 mb-2">Total Team Spend (Jan)</p>
                         <h2 className="text-6xl font-black text-[#2D2D2D] mb-8">£4,850.00</h2>
                         <div className="flex gap-6">
                            <div className="bg-gray-100 px-6 py-3 rounded-2xl">
                               <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1">Budget Cap</p>
                               <p className="text-sm font-black">£8,000 / mo</p>
                            </div>
                            <div className="bg-green-50 px-6 py-3 rounded-2xl">
                               <p className="text-[9px] font-bold text-green-600 uppercase tracking-widest mb-1">Status</p>
                               <p className="text-sm font-black text-green-600">On Target</p>
                            </div>
                         </div>
                      </div>
                   </div>

                   <div className="bg-white border border-gray-100 rounded-[3rem] p-10 flex flex-col justify-between shadow-sm">
                      <h3 className="text-lg font-black mb-6">Consolidated Billing</h3>
                      <div className="space-y-4">
                         <div className="flex justify-between items-center text-sm">
                            <span className="text-gray-500">Jan Invoice</span>
                            <span className="font-bold">Pending</span>
                         </div>
                         <div className="flex justify-between items-center text-sm">
                            <span className="text-gray-500">Due Date</span>
                            <span className="font-bold">31 Jan</span>
                         </div>
                      </div>
                      <button className="w-full mt-10 bg-[#2D2D2D] text-white py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl hover:bg-black transition-all">
                         Download PDF
                      </button>
                   </div>
                </div>

                <div className="bg-white border border-gray-100 rounded-[3rem] p-10 shadow-sm">
                   <h3 className="text-xl font-black mb-8">Billing Rules</h3>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                      <div className="space-y-6">
                         <div className="flex items-start gap-4">
                            <ShieldCheck className="text-green-500 shrink-0" size={24} />
                            <div>
                               <h4 className="font-bold mb-1">Monthly Budget Cap</h4>
                               <p className="text-sm text-gray-500">Automatically pause bookings once the team spend reaches £8,000.</p>
                            </div>
                         </div>
                         <div className="flex items-start gap-4">
                            <TrendingUp className="text-indigo-500 shrink-0" size={24} />
                            <div>
                               <h4 className="font-bold mb-1">Auto-Replenish Credits</h4>
                               <p className="text-sm text-gray-500">Top up member wallets by £50 if they fall below £10.</p>
                            </div>
                         </div>
                      </div>
                      <div className="space-y-4">
                         <label className="text-[10px] font-black uppercase text-gray-400 px-1">Adjust Monthly Cap</label>
                         <div className="flex gap-4">
                            <input type="number" defaultValue={8000} className="flex-1 bg-gray-50 px-6 py-4 rounded-2xl font-black text-lg outline-none border-2 border-transparent focus:border-[#2D2D2D]" />
                            <button className="bg-[#2D2D2D] text-white px-8 rounded-2xl font-black uppercase tracking-widest text-xs">Save</button>
                         </div>
                      </div>
                   </div>
                </div>
             </div>
           )}

        </main>
      </div>

      {/* Invite Modal */}
      {showInviteModal && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
           <div className="absolute inset-0 bg-[#2D2D2D]/60 backdrop-blur-sm" onClick={() => setShowInviteModal(false)} />
           <div className="relative w-full max-w-md bg-white rounded-[3rem] p-12 shadow-2xl animate-in zoom-in-95 duration-300">
              <h3 className="text-2xl font-black text-[#2D2D2D] mb-4">Invite Team Member</h3>
              <p className="text-sm text-gray-500 mb-8 font-medium">An invitation link will be sent to their email.</p>
              
              <div className="space-y-4 mb-10">
                 <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-gray-400 px-1">Email Address</label>
                    <input 
                      type="email" 
                      value={inviteEmail}
                      onChange={(e) => setInviteEmail(e.target.value)}
                      placeholder="teammate@company.com" 
                      className="w-full px-6 py-4 bg-gray-50 border-2 border-transparent focus:border-[#2D2D2D] focus:bg-white rounded-2xl text-sm font-bold outline-none transition-all" 
                    />
                 </div>
              </div>

              <div className="flex flex-col gap-3">
                 <button 
                  onClick={handleInvite}
                  className="w-full bg-[#2D2D2D] text-white py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-xl hover:bg-black transition-all"
                 >
                    Send Invitation
                 </button>
                 <button onClick={() => setShowInviteModal(false)} className="py-2 text-[10px] font-black uppercase tracking-widest text-gray-400">Cancel</button>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default TeamAdminDashboard;
