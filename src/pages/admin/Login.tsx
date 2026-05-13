import { useState } from 'react';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../../lib/firebase';
import { motion } from 'motion/react';
import { Cpu, Lock, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    setLoading(true);
    setError(null);
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      navigate('/admin');
    } catch (err: any) {
      setError(err.message || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="max-w-md w-full">
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-accent-cyan rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-[0_0_30px_rgba(0,240,255,0.3)]">
            <Lock className="text-black w-8 h-8" />
          </div>
          <h1 className="text-4xl font-display font-bold mb-4">Secure Access</h1>
          <p className="text-gray-400">Restricted to Aetherix Core Architects</p>
        </div>

        <div className="glass p-8 rounded-3xl border-white/10">
          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center text-red-500 text-sm">
              <AlertCircle className="w-4 h-4 mr-2" />
              {error}
            </div>
          )}

          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full py-4 bg-white text-black font-bold rounded-xl flex items-center justify-center space-x-3 hover:bg-accent-cyan transition-all disabled:opacity-50"
          >
            <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5" />
            <span>{loading ? 'Authenticating...' : 'Sign in with Google'}</span>
          </button>
          
          <p className="mt-8 text-[10px] text-center text-gray-500 uppercase tracking-widest leading-loose">
            By proceeding, you acknowledge that all neural interactions <br /> are monitored by Aetherix Security Protocols.
          </p>
        </div>
      </div>
    </div>
  );
}
