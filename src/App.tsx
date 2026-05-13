import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import ThreeBackground from './components/ThreeBackground';
import Home from './pages/Home';
import Blog from './pages/Blog';
import Careers from './pages/Careers';
import Contact from './pages/Contact';
import Login from './pages/admin/Login';
import AdminDashboard from './pages/admin/Dashboard';
import Chatbot from './components/Chatbot';
import CursorGlow from './components/CursorGlow';
import LoadingScreen from './components/LoadingScreen';

export default function App() {
  return (
    <Router>
      <div className="relative min-h-screen bg-deep-black text-white selection:bg-accent-cyan selection:text-black overflow-hidden">
        {/* Artistic Flair Atmospheric Elements */}
        <div className="fixed inset-0 pointer-events-none z-0">
          <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-accent-purple/10 rounded-full blur-[120px]"></div>
          <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-accent-cyan/5 rounded-full blur-[140px]"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-20" style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.05) 1px, transparent 1px)', backgroundSize: '32px 32px' }}></div>
        </div>

        {/* Side Rail: Vertical Label */}
        <div className="fixed left-10 top-1/2 -translate-y-1/2 hidden xl:flex flex-col items-center gap-10 z-40">
          <div className="h-20 w-[1px] bg-gradient-to-b from-transparent via-accent-cyan to-transparent"></div>
          <span className="rotate-[-90deg] whitespace-nowrap text-[9px] tracking-[0.5em] uppercase font-bold text-white/40">
            Silicon Valley &bull; Mumbai &bull; London
          </span>
        </div>

        {/* Right Rail: Socials */}
        <div className="fixed right-10 top-1/2 -translate-y-1/2 hidden xl:flex flex-col gap-6 items-center text-white/40 text-[10px] font-bold tracking-widest uppercase z-40">
          <a href="#" className="hover:text-accent-cyan transition-colors">LI</a>
          <a href="#" className="hover:text-accent-purple transition-colors">GH</a>
          <a href="#" className="hover:text-accent-cyan transition-colors">X</a>
          <div className="h-12 w-[1px] bg-white/10"></div>
        </div>

        <LoadingScreen />
        <div className="relative z-10">
          <CursorGlow />
          <ThreeBackground />
          <Navbar />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/careers" element={<Careers />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/admin/login" element={<Login />} />
            </Routes>
          </main>
          <Chatbot />
          
          <footer className="relative z-20 border-t border-white/5 bg-black/80 backdrop-blur-2xl px-10 py-12">
            <div className="max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
              <div className="col-span-1 border-r border-white/5 pr-12">
                <p className="text-[10px] uppercase tracking-[0.2em] font-bold mb-4 text-accent-cyan">Trusted By</p>
                <div className="flex gap-6 opacity-40 grayscale hover:grayscale-0 transition-all cursor-default text-xs font-black tracking-tighter uppercase">
                  <span>NVIDIA</span>
                  <span>STRIPE</span>
                  <span>OPENAI</span>
                </div>
              </div>

              <div className="col-span-2 px-8 flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-white font-bold text-2xl">150+</span>
                  <span className="text-[9px] uppercase tracking-widest text-[#A0AAB2]">Active Deployments</span>
                </div>
                <div className="h-8 w-[1px] bg-white/10"></div>
                <div className="flex flex-col">
                  <span className="text-white font-bold text-2xl">99.9%</span>
                  <span className="text-[9px] uppercase tracking-widest text-[#A0AAB2]">Agent Uptime</span>
                </div>
                <div className="h-8 w-[1px] bg-white/10"></div>
                <div className="flex flex-col">
                  <span className="text-white font-bold text-2xl">40+</span>
                  <span className="text-[9px] uppercase tracking-widest text-[#A0AAB2]">Global Clients</span>
                </div>
              </div>

              <div className="col-span-1 flex flex-col items-end justify-center">
                <div className="text-right">
                  <p className="text-white font-mono text-[10px] tracking-widest uppercase">Status: <span className="text-accent-cyan">All Systems Operational</span></p>
                  <p className="text-[9px] font-mono opacity-50 uppercase mt-1">Lat: 19.0760 N &bull; Long: 72.8777 E</p>
                </div>
              </div>
            </div>
            <div className="max-w-[1440px] mx-auto px-6 mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-[10px] text-gray-500 uppercase tracking-[0.2em]">
              <span>© 2026 Aetherix Technologies. Global Pioneer.</span>
              <div className="flex gap-8">
                <a href="#" className="hover:text-white">Privacy</a>
                <a href="#" className="hover:text-white">Terms</a>
                <a href="#" className="hover:text-white">Network</a>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </Router>
  );
}
