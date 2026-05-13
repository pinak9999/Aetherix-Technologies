import { motion } from 'motion/react';
import { Calendar, User, Tag, ArrowRight, Share2, Facebook, Twitter, Linkedin } from 'lucide-react';
import { cn } from '../lib/utils';

const POSTS = [
  {
    id: '1',
    title: 'The Singularity of Autonomous Agents',
    excerpt: 'Exploring the transition from prompt-based AI to goal-oriented autonomous systems.',
    author: 'Dr. Orion Vance',
    date: 'May 12, 2026',
    category: 'Research',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800',
    color: 'from-accent-cyan/20'
  },
  {
    id: '2',
    title: 'Post-Quantum Encryption in AI Middleware',
    excerpt: 'Safeguarding distributed neural networks against the next decade of cryptographic threats.',
    author: 'Elena Rossi',
    date: 'May 8, 2026',
    category: 'Security',
    image: 'https://images.unsplash.com/photo-1639322537228-f710d846310a?auto=format&fit=crop&q=80&w=800',
    color: 'from-accent-purple/20'
  },
  {
    id: '3',
    title: 'Spatial Intelligence: Beyond Flat UIs',
    excerpt: 'Why the future of software interaction is three-dimensional and context-aware.',
    author: 'Marcus Chen',
    date: 'May 4, 2026',
    category: 'Design',
    image: 'https://images.unsplash.com/photo-1614850523296-e8c041de239b?auto=format&fit=crop&q=80&w=800',
    color: 'from-pink-500/20'
  },
];

export default function Blog() {
  return (
    <div className="pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        <header className="mb-20">
          <motion.h1 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-5xl md:text-8xl font-display font-bold tracking-tighter mb-6"
          >
            Insights & <br />
            <span className="text-gradient">Neural Discourse.</span>
          </motion.h1>
          <div className="flex flex-wrap gap-4 mt-8">
            {['All', 'Research', 'Security', 'Design', 'Engineering', 'Company'].map((cat) => (
              <button 
                key={cat}
                className={cn(
                  "px-6 py-2 rounded-full border border-white/10 text-xs font-mono uppercase tracking-widest hover:border-accent-cyan hover:text-accent-cyan transition-all",
                  cat === 'All' && "bg-white text-black border-white"
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {POSTS.map((post, i) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="group cursor-pointer"
            >
              <div className="relative aspect-[16/10] rounded-3xl overflow-hidden mb-6">
                <img 
                  src={post.image} 
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className={cn("absolute inset-0 bg-gradient-to-t to-transparent opacity-60", post.color)} />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 glass rounded-full text-[10px] font-mono uppercase tracking-widest text-white">
                    {post.category}
                  </span>
                </div>
              </div>
              
              <div className="p-2">
                <div className="flex items-center space-x-4 text-xs font-mono text-gray-500 mb-4">
                   <span className="flex items-center"><Calendar className="w-3 h-3 mr-1" /> {post.date}</span>
                   <span className="flex items-center"><User className="w-3 h-3 mr-1" /> {post.author}</span>
                </div>
                <h2 className="text-2xl font-display font-bold mb-4 group-hover:text-accent-cyan transition-colors line-clamp-2">
                  {post.title}
                </h2>
                <p className="text-gray-400 text-sm mb-6 line-clamp-3">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-accent-cyan font-bold text-xs uppercase tracking-widest">
                    <span>Read Analysis</span>
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform" />
                  </div>
                  <div className="flex space-x-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="text-gray-500 hover:text-white transition-colors">
                      <Share2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Newsletter Inset */}
        <div className="mt-32 p-12 md:p-20 glass rounded-[3rem] border-white/5 relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-r from-accent-cyan/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-display font-bold mb-4">Subscribe to the <span className="text-accent-cyan">Ether Pulse.</span></h2>
              <p className="text-gray-400">Join 40,000+ AI researchers and engineers receiving our weekly deep dives into autonomous systems.</p>
            </div>
            <div className="flex flex-col md:flex-row gap-4">
              <input 
                type="email" 
                placeholder="architect@aetherix.in" 
                className="flex-1 bg-black/40 border border-white/10 rounded-full px-8 py-4 outline-none focus:border-accent-cyan transition-colors"
              />
              <button className="px-10 py-4 bg-white text-black font-bold rounded-full hover:bg-accent-cyan transition-colors shrink-0">
                Join Pulse
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
