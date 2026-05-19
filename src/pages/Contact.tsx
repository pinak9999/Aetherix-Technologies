import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Send, MessageSquare, Globe, ChevronRight } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useState } from 'react';

import { addDoc, collection } from 'firebase/firestore';
import { db, OperationType, handleFirestoreError } from '../lib/firebase';

const contactSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Invalid email'),
  subject: z.string().min(5, 'Subject is too short'),
  message: z.string().min(20, 'Please provide more detail'),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormValues) => {
    try {
      await addDoc(collection(db, 'contacts'), {
        ...data,
        status: 'new',
        createdAt: new Date() // rules use request.time
      });
      setSubmitted(true);
      reset();
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, 'contacts');
    }
  };

  return (
    <div className="pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <motion.h1 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-5xl md:text-7xl font-display font-bold mb-6"
          >
            Initiate <span className="text-gradient">Contact.</span>
          </motion.h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Ready to integrate autonomous intelligence into your ecosystem? Our architects are standing by.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          {/* Info Section */}
          <div className="space-y-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                { icon: <Mail />, label: 'Email', value: 'contact@aetherixai.tech', href: 'mailto:contact@aetherixai.tech' },
                { icon: <Phone />, label: 'Phone', value: '+919834491836', href: 'tel:+919834491836' },
                { icon: <Globe />, label: 'Website', value: 'aetherixai.tech', href: '#' },
                { icon: <MessageSquare />, label: 'Support', value: '24/7 Neural Assistant', href: '#' },
              ].map((item, i) => (
                <motion.a
                  key={i}
                  href={item.href}
                  whileHover={{ y: -5 }}
                  className="glass p-8 rounded-3xl border-white/5 hover:border-accent-cyan/30 transition-all group"
                >
                  <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center mb-6 text-accent-cyan group-hover:scale-110 transition-transform">
                    {item.icon}
                  </div>
                  <span className="text-xs font-mono text-gray-500 uppercase tracking-widest block mb-2">{item.label}</span>
                  <span className="text-lg font-bold group-hover:text-accent-cyan transition-colors">{item.value}</span>
                </motion.a>
              ))}
            </div>

            <div className="glass p-10 rounded-[2.5rem] border-white/5">
              <h3 className="text-2xl font-display font-bold mb-8 flex items-center">
                <MapPin className="mr-3 text-accent-purple" /> Headquarters
              </h3>
              <div className="space-y-4 text-gray-400">
                <p className="text-lg text-white">Aetherix Technologies</p>
                <p>703, Mahalaxmi Complex, Ovaripada,</p>
                <p>Mumbai, Maharashtra 400068</p>
                <p className="pt-4 mt-6 border-t border-white/5 flex items-center text-accent-purple font-bold text-sm">
                  VIEW ON MAP <ChevronRight className="w-4 h-4 ml-1" />
                </p>
              </div>
            </div>
          </div>

          {/* Form Section */}
          <div className="relative">
            <div className="glass p-10 md:p-14 rounded-[3rem] border-white/10 relative z-10 shadow-[0_0_80px_rgba(0,240,255,0.05)]">
              {submitted ? (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center py-20"
                >
                  <div className="w-20 h-20 bg-accent-cyan/10 rounded-full flex items-center justify-center mx-auto mb-8">
                    <Send className="text-accent-cyan w-10 h-10" />
                  </div>
                  <h2 className="text-3xl font-display font-bold mb-4">Transmission Successful</h2>
                  <p className="text-gray-400 mb-8">Your request has been queued in our priority buffer. Expect a response within 4 neural cycles (approx. 2 hours).</p>
                  <button 
                    onClick={() => setSubmitted(false)}
                    className="px-10 py-4 bg-white text-black font-bold rounded-full hover:bg-accent-cyan transition-colors"
                  >
                    Send Another Message
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-mono text-gray-500 uppercase tracking-widest mb-2 ml-4">Identifier</label>
                      <input 
                        {...register('name')}
                        placeholder="Your Name" 
                        className="w-full bg-black/40 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-accent-cyan transition-colors"
                      />
                      {errors.name && <p className="text-red-500 text-xs mt-1 ml-4">{errors.name.message}</p>}
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-gray-500 uppercase tracking-widest mb-2 ml-4">Communication Port</label>
                      <input 
                        {...register('email')}
                        placeholder="Email Address" 
                        className="w-full bg-black/40 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-accent-cyan transition-colors"
                      />
                      {errors.email && <p className="text-red-500 text-xs mt-1 ml-4">{errors.email.message}</p>}
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-gray-500 uppercase tracking-widest mb-2 ml-4">Subject Protocol</label>
                    <input 
                      {...register('subject')}
                      placeholder="e.g. Enterprise Integration Inquiry" 
                      className="w-full bg-black/40 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-accent-cyan transition-colors"
                    />
                    {errors.subject && <p className="text-red-500 text-xs mt-1 ml-4">{errors.subject.message}</p>}
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-gray-500 uppercase tracking-widest mb-2 ml-4">Payload Content</label>
                    <textarea 
                      {...register('message')}
                      placeholder="Describe your vision..." 
                      rows={6}
                      className="w-full bg-black/40 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-accent-cyan transition-colors resize-none"
                    />
                    {errors.message && <p className="text-red-500 text-xs mt-1 ml-4">{errors.message.message}</p>}
                  </div>
                  <button 
                    disabled={isSubmitting}
                    type="submit"
                    className="w-full py-5 bg-accent-cyan text-black font-extrabold rounded-2xl hover:shadow-[0_0_40px_rgba(0,240,255,0.4)] transition-all disabled:opacity-50 flex items-center justify-center space-x-3 group"
                  >
                    <span>{isSubmitting ? 'Transmitting...' : 'INITIATE TRANSMISSION'}</span>
                    <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
