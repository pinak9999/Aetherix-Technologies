import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Rocket, Shield, Cpu, Zap, ChevronRight } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '../lib/utils';

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'AI Agents', href: '/solutions' },
  { name: 'Products', href: '/products' },
  { name: 'Case Studies', href: '/cases' },
  { name: 'Careers', href: '/careers' },
  { name: 'Blog', href: '/blog' },
  { name: 'Contact', href: '/contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-10 py-6",
        scrolled ? "bg-black/50 backdrop-blur-xl border-b border-white/5" : "bg-transparent"
      )}
    >
      <div className="max-w-[1440px] mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 bg-gradient-to-br from-[#00F0FF] to-[#7000FF] rounded-lg flex items-center justify-center p-[1px]">
            <div className="w-full h-full bg-[#050505] rounded-[7px] flex items-center justify-center">
              <span className="text-white font-black text-xs">Æ</span>
            </div>
          </div>
          <span className="text-white font-bold tracking-[0.2em] text-lg uppercase font-display">AETHERIX</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center space-x-10">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              className={cn(
                "text-[10px] uppercase tracking-[0.2em] font-bold transition-all hover:text-accent-cyan",
                location.pathname === link.href ? "text-accent-cyan" : "text-text-muted"
              )}
            >
              {link.name}
            </Link>
          ))}
          <Link
            to="/demo"
            className="px-6 py-2.5 bg-white text-black text-[11px] font-bold uppercase tracking-widest rounded-full hover:bg-accent-cyan transition-all"
          >
            Book Demo
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button className="lg:hidden text-white" onClick={() => setIsOpen(true)}>
          <Menu className="w-8 h-8" />
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[60] bg-black flex flex-col p-8"
          >
            <div className="flex justify-end">
              <button onClick={() => setIsOpen(false)}>
                <X className="w-10 h-10" />
              </button>
            </div>
            <div className="flex flex-col space-y-8 mt-12">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-4xl font-display font-bold hover:text-accent-cyan transition-colors"
                >
                  {link.name}
                </Link>
              ))}
              <Link
                to="/demo"
                onClick={() => setIsOpen(false)}
                className="mt-4 p-4 bg-accent-cyan text-black text-center font-bold rounded-xl"
              >
                Book a Demo
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
