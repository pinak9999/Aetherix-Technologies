import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Cpu, Activity } from 'lucide-react';

export default function LoadingScreen() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => setLoading(false), 1000);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 150);

    return () => clearInterval(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9999] bg-[#050505] flex flex-col items-center justify-center p-6"
        >
          <div className="relative mb-12">
             <motion.div 
               animate={{ rotate: 360 }}
               transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
               className="w-24 h-24 rounded-2xl border border-accent-cyan/30 flex items-center justify-center"
             >
                <Cpu className="w-10 h-10 text-accent-cyan" />
             </motion.div>
             <div className="absolute inset-x-[-20px] top-full mt-4 flex items-center justify-center">
                <Activity className="w-4 h-4 text-accent-purple animate-pulse mr-2" />
                <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-gray-500">Neural Sync</span>
             </div>
          </div>
          
          <div className="w-64 h-[2px] bg-white/5 rounded-full overflow-hidden relative">
            <motion.div 
              className="absolute left-0 top-0 h-full bg-accent-cyan shadow-[0_0_15px_rgba(0,240,255,0.8)]"
              style={{ width: `${progress}%` }}
            />
          </div>
          
          <div className="mt-4 font-mono text-[10px] text-accent-cyan uppercase tracking-widest">
            {progress < 30 && "Decrypting Kernel..."}
            {progress >= 30 && progress < 70 && "Optimizing Neural Pathways..."}
            {progress >= 70 && progress < 100 && "Synchronizing Interlink..."}
            {progress >= 100 && "Connection established."}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
