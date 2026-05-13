import { useState } from 'react';
import { motion } from 'motion/react';
import { Briefcase, MapPin, Clock, ArrowRight, Upload, Search, Rocket } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { cn } from '../lib/utils';
import { addDoc, collection } from 'firebase/firestore';
import { db, OperationType, handleFirestoreError } from '../lib/firebase';

const jobSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Invalid email'),
  portfolio: z.string().url('Invalid URL').optional().or(z.literal('')),
  message: z.string().min(10, 'Tell us a bit about yourself'),
});

type JobFormValues = z.infer<typeof jobSchema>;

const JOBS = [
  {
    id: 'ai-eng-01',
    title: 'Senior AI Research Engineer',
    dept: 'Intelligence',
    location: 'San Francisco / Remote',
    type: 'Full-time',
    description: 'Lead the development of our next-gen autonomous reasoning models.'
  },
  {
    id: 'fe-eng-02',
    title: 'Principal Frontend Architect',
    dept: 'Product',
    location: 'Mumbai / Remote',
    type: 'Full-time',
    description: 'Craft high-performance, cinematic spatial web interfaces.'
  },
  {
    id: 'be-eng-03',
    title: 'Distributed Systems Lead',
    dept: 'Infrastructure',
    location: 'Remote',
    type: 'Full-time',
    description: 'Scale our inference engine to handle petabyte-scale throughput.'
  },
  {
    id: 'ux-04',
    title: 'Product Design Director',
    dept: 'Creative',
    location: 'London / Remote',
    type: 'Full-time',
    description: 'Define the visual language of human-AI collaboration.'
  },
];

export default function Careers() {
  const [selectedJob, setSelectedJob] = useState<typeof JOBS[0] | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<JobFormValues>({
    resolver: zodResolver(jobSchema),
  });

  const onSubmit = async (data: JobFormValues) => {
    if (!selectedJob) return;
    try {
      await addDoc(collection(db, 'careerApplications'), {
        ...data,
        jobId: selectedJob.id,
        jobTitle: selectedJob.title,
        status: 'applied',
        appliedAt: new Date()
      });
      setIsSubmitted(true);
      reset();
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, 'careerApplications');
    }
  };

  return (
    <div className="pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-display font-bold mb-6"
          >
            Join the <span className="text-gradient">Neural Vanguard.</span>
          </motion.h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            We're building the future of autonomous intelligence. Help us define the next era of human accomplishment.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-6">
            <div className="relative mb-12">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
              <input 
                type="text" 
                placeholder="Search positions..." 
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 focus:ring-2 focus:ring-accent-cyan outline-none transition-all"
              />
            </div>

            {JOBS.map((job) => (
              <motion.div
                key={job.id}
                whileHover={{ x: 10 }}
                onClick={() => setSelectedJob(job)}
                className={cn(
                  "p-8 rounded-3xl border transition-all cursor-pointer group",
                  selectedJob?.id === job.id 
                    ? "bg-accent-cyan/10 border-accent-cyan/50 shadow-[0_0_30px_rgba(0,240,255,0.1)]" 
                    : "bg-white/5 border-white/10 hover:border-white/30"
                )}
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div>
                    <h3 className="text-2xl font-display font-bold mb-2 group-hover:text-accent-cyan transition-colors">{job.title}</h3>
                    <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                      <span className="flex items-center"><Briefcase className="w-4 h-4 mr-1" /> {job.dept}</span>
                      <span className="flex items-center"><MapPin className="w-4 h-4 mr-1" /> {job.location}</span>
                      <span className="flex items-center"><Clock className="w-4 h-4 mr-1" /> {job.type}</span>
                    </div>
                  </div>
                  <ArrowRight className="w-6 h-6 text-gray-600 group-hover:text-accent-cyan transition-all" />
                </div>
              </motion.div>
            ))}
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-32 glass p-8 rounded-[2rem] border-white/10">
              {!selectedJob ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-20 grayscale opacity-30">
                  <Briefcase className="w-16 h-16 mb-4" />
                  <p className="text-gray-400">Select a position to begin your application</p>
                </div>
              ) : (
                <div className="space-y-8">
                  <div>
                    <h2 className="text-2xl font-display font-bold mb-2 text-accent-cyan">{selectedJob.title}</h2>
                    <p className="text-gray-400 text-sm">{selectedJob.description}</p>
                  </div>

                  {isSubmitted ? (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center py-10 bg-accent-cyan/10 rounded-2xl border border-accent-cyan/20"
                    >
                      <Rocket className="w-12 h-12 text-accent-cyan mx-auto mb-4" />
                      <h3 className="font-bold text-xl mb-2">Application Transmitted</h3>
                      <p className="text-gray-400 text-sm">Our neural talent agents will review your profile shortly.</p>
                      <button 
                        onClick={() => setIsSubmitted(false)}
                        className="mt-6 text-accent-cyan text-sm font-bold border-b border-accent-cyan pb-1"
                      >
                        Apply for another role
                      </button>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                      <div>
                        <input 
                          {...register('name')}
                          placeholder="Full Name" 
                          className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-accent-cyan transition-colors"
                        />
                        {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                      </div>
                      <div>
                        <input 
                          {...register('email')}
                          placeholder="Email" 
                          className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-accent-cyan transition-colors"
                        />
                        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                      </div>
                      <div>
                        <input 
                          {...register('portfolio')}
                          placeholder="Portfolio / LinkedIn (URL)" 
                          className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-accent-cyan transition-colors"
                        />
                        {errors.portfolio && <p className="text-red-500 text-xs mt-1">{errors.portfolio.message}</p>}
                      </div>
                      <div className="relative group cursor-pointer border-2 border-dashed border-white/10 p-6 rounded-xl hover:border-accent-cyan transition-colors">
                        <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" />
                        <div className="flex flex-col items-center">
                          <Upload className="w-6 h-6 text-gray-500 mb-2 group-hover:text-accent-cyan" />
                          <span className="text-xs text-gray-400 uppercase tracking-widest">Attach Resume / CV</span>
                        </div>
                      </div>
                      <div>
                        <textarea 
                          {...register('message')}
                          placeholder="Why Aetherix?" 
                          rows={4}
                          className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-accent-cyan transition-colors resize-none"
                        />
                        {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>}
                      </div>
                      <button 
                        disabled={isSubmitting}
                        type="submit"
                        className="w-full py-4 bg-accent-cyan text-black font-bold rounded-xl hover:shadow-[0_0_30px_rgba(0,240,255,0.3)] transition-all disabled:opacity-50"
                      >
                        {isSubmitting ? 'Transmitting...' : 'Submit Application'}
                      </button>
                    </form>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
