import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Cpu, Zap, Shield, Globe, Layers, BarChart, Rocket, ChevronRight, PlayCircle } from 'lucide-react';
import { cn } from '../lib/utils';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const services = [
  {
    title: 'AI Agent Development',
    description: 'Autonomous agents capable of complex reasoning and multi-step execution.',
    icon: <Cpu />,
    size: 'col-span-2 row-span-1',
    color: 'from-cyan-500/20 to-blue-500/0'
  },
  {
    title: 'Enterprise Workflow',
    description: 'Scalable automation for global supply chains.',
    icon: <Layers />,
    size: 'col-span-1 row-span-1',
    color: 'from-purple-500/20 to-pink-500/0'
  },
  {
    title: 'Cyber Prediction',
    description: 'ML-driven threat detection and real-time response.',
    icon: <Shield />,
    size: 'col-span-1 row-span-1',
    color: 'from-emerald-500/20 to-teal-500/0'
  },
  {
    title: 'Global Scale',
    description: 'Infrastructure designed for 99.999% uptime at any throughput.',
    icon: <Globe />,
    size: 'col-span-1 row-span-2',
    color: 'from-orange-500/20 to-yellow-500/0'
  },
  {
    title: 'Neural Analytics',
    description: 'Insight extraction from petabytes of unstructured data.',
    icon: <BarChart />,
    size: 'col-span-2 row-span-1',
    color: 'from-indigo-500/20 to-blue-500/0'
  },
];

const chartData = [
  { name: '00:00', value: 400 },
  { name: '04:00', value: 300 },
  { name: '08:00', value: 600 },
  { name: '12:00', value: 800 },
  { name: '16:00', value: 500 },
  { name: '20:00', value: 900 },
  { name: '23:59', value: 1100 },
];

export default function Home() {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex flex-col items-center justify-center overflow-hidden px-10">
        <div className="max-w-[1440px] mx-auto text-center z-10 flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center"
          >
            <div className="flex items-center gap-3 mb-8 px-4 py-1.5 bg-white/5 border border-white/10 rounded-full backdrop-blur-md">
              <span className="flex h-2 w-2 rounded-full bg-accent-cyan animate-pulse"></span>
              <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-white">
                Next-Gen Autonomous Ecosystem V4.0
              </span>
            </div>

            <h1 className="text-5xl md:text-8xl font-display font-bold text-white text-center leading-[0.9] tracking-tighter mb-8 max-w-5xl">
              EMPOWERING THE FUTURE <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-accent-cyan via-accent-purple to-accent-cyan animate-gradient-x">
                WITH INTELLIGENT AI SYSTEMS.
              </span>
            </h1>

            <p className="max-w-2xl text-center text-lg leading-relaxed mb-10 text-text-muted">
              We engineer autonomous AI agents, enterprise-grade software, and scalable digital
              ecosystems for the next generation of multi-billion dollar businesses.
            </p>

            <div className="flex flex-col md:flex-row items-center justify-center gap-6">
              <button className="w-full md:w-auto px-10 py-4 bg-gradient-to-r from-accent-cyan to-accent-purple text-white font-bold rounded-full text-xs uppercase tracking-widest shadow-[0_0_40px_rgba(0,240,255,0.2)] hover:scale-105 transition-transform flex items-center justify-center space-x-2">
                <Rocket className="w-4 h-4" />
                <span>Explore AI Solutions</span>
              </button>
              <button className="w-full md:w-auto px-10 py-4 border border-white/20 text-white font-bold rounded-full text-xs uppercase tracking-widest hover:bg-white/5 transition-colors">
                Free Consultation
              </button>
            </div>
          </motion.div>
        </div>

        {/* Floating UI Decorative Elements */}
        <div className="absolute top-[18%] left-[10%] w-32 h-32 border border-white/10 rounded-2xl rotate-12 backdrop-blur-sm bg-white/5 hidden xl:flex items-center justify-center pointer-events-none animate-float">
          <div className="w-12 h-[1px] bg-accent-cyan/30"></div>
        </div>
        <div className="absolute bottom-[25%] right-[10%] w-48 h-24 border border-white/10 rounded-xl -rotate-6 backdrop-blur-md bg-white/5 p-4 hidden xl:block pointer-events-none animate-float [animation-delay:2s]">
          <div className="w-full h-2 bg-white/10 rounded mb-2"></div>
          <div className="w-2/3 h-2 bg-white/5 rounded"></div>
          <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-accent-purple shadow-[0_0_10px_#7000FF]"></div>
        </div>
      </section>

      {/* Trusted By Section */}
      <section className="py-20 border-y border-white/5 bg-black/20">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-center text-xs font-mono text-gray-500 uppercase tracking-widest mb-12">
            Accelerating growth for industry leaders
          </p>
          <div className="flex flex-wrap justify-center gap-12 md:gap-24 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
            {['Meta', 'NVIDIA', 'Vercel', 'AWS', 'Google'].map((logo) => (
              <span key={logo} className="text-3xl font-display font-black tracking-tighter text-white">
                {logo}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Services Bento Grid */}
      <section className="py-32 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-display font-bold mb-6">Omnipresent Intelligence.</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            From autonomous core logic to global delivery lattices, Aetherix provides the backbone for the post-digital era.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px]">
          {services.map((s, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -5 }}
              className={cn(
                "glass rounded-3xl p-8 relative overflow-hidden group border-white/5 hover:border-white/20 transition-all",
                s.size
              )}
            >
              <div className={cn("absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity", s.color)} />
              <div className="relative z-10 h-full flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center mb-6 text-accent-cyan group-hover:scale-110 transition-transform">
                    {s.icon}
                  </div>
                  <h3 className="text-2xl font-display font-bold mb-2">{s.title}</h3>
                  <p className="text-gray-400 text-sm">{s.description}</p>
                </div>
                <div className="flex items-center text-xs font-mono text-accent-cyan opacity-0 group-hover:opacity-100 translate-x-[-10px] group-hover:translate-x-0 transition-all">
                  <span>LEARN MORE</span>
                  <ChevronRight className="w-4 h-4 ml-1" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Live Dashboard Preview */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="glass rounded-[3rem] overflow-hidden border-white/10 shadow-[0_0_100px_rgba(112,0,255,0.1)]">
            <div className="p-12 md:p-20 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
              <div>
                <span className="text-accent-purple font-mono text-xs tracking-widest uppercase mb-4 block">Operation Dashboard</span>
                <h2 className="text-4xl md:text-5xl font-display font-bold mb-8">
                  Real-time visibility into the <span className="text-accent-purple">neural fabric.</span>
                </h2>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 rounded bg-accent-purple/20 flex items-center justify-center flex-shrink-0">
                      <Zap className="w-4 h-4 text-accent-purple" />
                    </div>
                    <div>
                      <h4 className="font-bold">Lightning Latency</h4>
                      <p className="text-gray-400 text-sm">Average response time under 12ms globally.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 rounded bg-accent-cyan/20 flex items-center justify-center flex-shrink-0">
                      <Shield className="w-4 h-4 text-accent-cyan" />
                    </div>
                    <div>
                      <h4 className="font-bold">Zero-Knowledge Proofs</h4>
                      <p className="text-gray-400 text-sm">Security that evolves faster than the threats.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-black/50 rounded-2xl p-8 border border-white/10 shadow-inner">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="font-display font-bold">Inference Throughput</h3>
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 rounded-full bg-accent-cyan" />
                    <div className="w-2 h-2 rounded-full bg-white/10" />
                    <div className="w-2 h-2 rounded-full bg-white/10" />
                  </div>
                </div>
                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={chartData}>
                      <defs>
                        <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#7000FF" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#7000FF" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#222" vertical={false} />
                      <XAxis dataKey="name" stroke="#555" fontSize={10} tickLine={false} axisLine={false} />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#000', border: '1px solid #333', borderRadius: '8px' }}
                        itemStyle={{ color: '#00F0FF' }}
                      />
                      <Area type="monotone" dataKey="value" stroke="#7000FF" fillOpacity={1} fill="url(#colorValue)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
                <div className="grid grid-cols-3 gap-4 mt-8">
                  <div className="p-4 bg-white/5 rounded-xl">
                    <span className="text-[10px] text-gray-500 uppercase block mb-1">Inferences</span>
                    <span className="text-lg font-display font-bold">12.4M</span>
                  </div>
                  <div className="p-4 bg-white/5 rounded-xl">
                    <span className="text-[10px] text-gray-500 uppercase block mb-1">Growth</span>
                    <span className="text-lg font-display font-bold text-green-400">+24%</span>
                  </div>
                  <div className="p-4 bg-white/5 rounded-xl">
                    <span className="text-[10px] text-gray-500 uppercase block mb-1">Uptime</span>
                    <span className="text-lg font-display font-bold">99.9%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Articles Link */}
      <section className="py-20 text-center">
         <Link to="/blog" className="inline-flex items-center space-x-2 text-gray-400 hover:text-accent-cyan transition-colors group">
            <span className="font-mono text-sm tracking-widest uppercase">Deep Dives & Research</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
         </Link>
      </section>
    </div>
  );
}

