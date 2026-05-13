import { useEffect, useState } from 'react';
import { collection, query, orderBy, onSnapshot, limit } from 'firebase/firestore';
import { db, auth } from '../../lib/firebase';
import { motion } from 'motion/react';
import { LayoutDashboard, Users, FileText, Mail, LogOut, ChevronRight, Activity } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { formatDate } from '../../lib/utils';

export default function AdminDashboard() {
  const [contacts, setContacts] = useState<any[]>([]);
  const [apps, setApps] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubAuth = auth.onAuthStateChanged((user) => {
      if (!user) navigate('/admin/login');
      // In a real app, check for isAdmin collection doc here too
    });

    const qContacts = query(collection(db, 'contacts'), orderBy('createdAt', 'desc'), limit(10));
    const qApps = query(collection(db, 'careerApplications'), orderBy('appliedAt', 'desc'), limit(10));

    const unsubC = onSnapshot(qContacts, (snaps) => {
      setContacts(snaps.docs.map(d => ({ id: d.id, ...d.data() })));
    });

    const unsubA = onSnapshot(qApps, (snaps) => {
      setApps(snaps.docs.map(d => ({ id: d.id, ...d.data() })));
      setLoading(false);
    });

    return () => {
      unsubAuth();
      unsubC();
      unsubA();
    };
  }, [navigate]);

  const handleLogout = () => {
    auth.signOut();
    navigate('/admin/login');
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <Activity className="w-12 h-12 text-accent-cyan animate-spin" />
    </div>
  );

  return (
    <div className="min-h-screen bg-[#050505] flex">
      {/* Sidebar */}
      <aside className="w-64 border-r border-white/5 p-6 hidden lg:flex flex-col">
        <div className="flex items-center space-x-2 mb-12">
          <div className="w-8 h-8 bg-accent-cyan rounded flex items-center justify-center">
            <LayoutDashboard className="text-black w-5 h-5" />
          </div>
          <span className="font-display font-bold text-lg">HQ CONTROL</span>
        </div>

        <nav className="flex-1 space-y-2">
          {[
            { icon: <LayoutDashboard size={18} />, label: 'Overview', active: true },
            { icon: <Mail size={18} />, label: 'Lead Pipeline' },
            { icon: <FileText size={18} />, label: 'Talent Review' },
            { icon: <Users size={18} />, label: 'Neural Logs' },
          ].map((item) => (
            <button
              key={item.label}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                item.active ? 'bg-accent-cyan/10 text-accent-cyan' : 'text-gray-500 hover:text-white hover:bg-white/5'
              }`}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        <button 
          onClick={handleLogout}
          className="flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium text-red-500 hover:bg-red-500/10 transition-all mt-auto"
        >
          <LogOut size={18} />
          <span>Exit Interface</span>
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 lg:p-12 overflow-y-auto pt-24 lg:pt-12">
        <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-12">
          <div>
            <h1 className="text-3xl font-display font-bold">Neural Nexus Overview</h1>
            <p className="text-gray-500 text-sm">Welcome back, Architect.</p>
          </div>
          <div className="flex items-center space-x-4">
             <div className="px-4 py-2 glass rounded-lg text-xs font-mono">
               SYS_UPTIME: 99.98%
             </div>
             <div className="w-10 h-10 rounded-full bg-accent-purple/20 flex items-center justify-center border border-accent-purple/30">
               <span className="text-accent-purple text-xs font-bold">A</span>
             </div>
          </div>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-12">
          {[
            { label: 'Total Leads', value: '1,284', trend: '+12%', icon: <Mail /> },
            { label: 'Applications', value: '432', trend: '+24%', icon: <FileText /> },
            { label: 'Active Projects', value: '42', trend: '+2', icon: <Activity /> },
            { label: 'Latency', value: '11ms', trend: '-2ms', icon: <Cpu /> },
          ].map((stat, i) => (
             <div key={i} className="glass p-6 rounded-2xl border-white/5 group hover:border-accent-cyan/20 transition-all">
                <div className="flex items-center justify-between mb-4">
                   <div className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center text-accent-cyan group-hover:scale-110 transition-transform">
                      {stat.icon}
                   </div>
                   <span className="text-xs font-mono text-green-400">{stat.trend}</span>
                </div>
                <span className="text-xs font-mono text-gray-500 uppercase tracking-widest block mb-1">{stat.label}</span>
                <span className="text-2xl font-display font-bold">{stat.value}</span>
             </div>
          ))}
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
           {/* Recent Leads */}
           <div className="glass p-8 rounded-3xl border-white/5">
              <div className="flex items-center justify-between mb-8">
                 <h2 className="text-xl font-display font-bold">Recent Leads</h2>
                 <button className="text-xs font-mono text-accent-cyan uppercase tracking-tighter hover:underline">View All</button>
              </div>
              <div className="space-y-6">
                 {contacts.map((c) => (
                    <div key={c.id} className="flex items-center justify-between p-4 bg-white/5 rounded-2xl group hover:bg-white/10 transition-all">
                       <div className="flex items-center space-x-4">
                          <div className="w-10 h-10 rounded-full bg-accent-cyan/10 flex items-center justify-center text-accent-cyan">
                             {c.name[0]}
                          </div>
                          <div>
                             <h4 className="font-bold text-sm">{c.name}</h4>
                             <p className="text-xs text-gray-500">{c.subject}</p>
                          </div>
                       </div>
                       <ChevronRight className="w-4 h-4 text-gray-700 group-hover:text-accent-cyan transition-all" />
                    </div>
                 ))}
                 {contacts.length === 0 && <p className="text-gray-500 text-sm italic">No active pulse detected in the queue.</p>}
              </div>
           </div>

           {/* Recent Applications */}
           <div className="glass p-8 rounded-3xl border-white/5">
              <div className="flex items-center justify-between mb-8">
                 <h2 className="text-xl font-display font-bold">Talent Pipeline</h2>
                 <button className="text-xs font-mono text-accent-cyan uppercase tracking-tighter hover:underline">Review All</button>
              </div>
              <div className="space-y-6">
                 {apps.map((a) => (
                    <div key={a.id} className="flex items-center justify-between p-4 bg-white/5 rounded-2xl group hover:bg-white/10 transition-all">
                       <div className="flex items-center space-x-4">
                          <div className="w-10 h-10 rounded-full bg-accent-purple/10 flex items-center justify-center text-accent-purple">
                             {a.name[0]}
                          </div>
                          <div>
                             <h4 className="font-bold text-sm">{a.name}</h4>
                             <p className="text-xs text-gray-500">{a.jobTitle}</p>
                          </div>
                       </div>
                       <div className="text-right">
                          <span className="text-[10px] font-mono text-gray-600 block">{formatDate(a.appliedAt?.toDate())}</span>
                          <span className="text-[10px] font-mono text-accent-cyan px-2 py-0.5 bg-accent-cyan/10 rounded uppercase">New</span>
                       </div>
                    </div>
                 ))}
                 {apps.length === 0 && <p className="text-gray-500 text-sm italic">The neural talent buffer is currently clear.</p>}
              </div>
           </div>
        </div>
      </main>
    </div>
  );
}

import { Cpu } from 'lucide-react';
