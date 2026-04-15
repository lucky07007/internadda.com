'use client'

import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { useAuth } from '@/lib/auth-context'
import { useParams, useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { Verified, CheckCircle, ArrowRight } from 'lucide-react'
import { internships } from '@/data/internships'

export default function ApplyPage() {
  const params = useParams();
  const id = params?.id as string;
  const { user, loading } = useAuth();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    college: '',
    age: '',
    mobile: ''
  });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => { setMounted(true); }, []);
  useEffect(() => {
    if (mounted && !loading && !user) {
      router.replace(`/auth/signin?callbackUrl=/apply/${id}`);
    }
  }, [user, loading, mounted, router, id]);

  if (!mounted || loading) return <div className="min-h-screen bg-zinc-50 flex items-center justify-center font-bold text-xl uppercase tracking-widest">Loading...</div>;
  if (!user) return null;

  const job = internships.find(i => i.id === id) || internships[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Front-end mock submission success
    setSubmitted(true);
  };

  return (
    <>
      <Header />
      <main className="w-full bg-zinc-50 min-h-screen pt-24 pb-20">
        <div className="max-w-3xl mx-auto px-4">
          <div className="text-center mb-10">
             <div className="inline-flex items-center gap-2 mb-4 bg-black text-white px-3 py-1 text-[10px] font-bold uppercase tracking-widest rounded-sm">
                <Verified size={12} /> Powered by UpForge
             </div>
             <h1 className="text-3xl md:text-5xl font-serif font-black text-black uppercase tracking-tight mb-3">Application Form</h1>
             <p className="text-zinc-600 font-medium tracking-widest text-[12px] uppercase">Applying for: <strong className="text-black">{job.title}</strong> at {job.company}</p>
          </div>

          <div className="bg-white border-2 border-black p-8 md:p-12 shadow-[8px_8px_0_0_#000]">
            {submitted ? (
              <div className="text-center py-10">
                <CheckCircle size={48} className="mx-auto text-black mb-4" />
                <h2 className="text-3xl font-serif font-black mb-2 uppercase">Application Submitted</h2>
                <p className="text-zinc-600 font-medium mb-8">Your UpForge verified profile and application details have been securely sent to {job.company}.</p>
                <button onClick={() => router.push('/internships')} className="bg-black text-white px-6 py-3 font-bold uppercase tracking-widest text-[12px] rounded-sm hover:-translate-y-1 transition-transform inline-flex items-center gap-2">
                  Browse More Roles <ArrowRight size={14} />
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-widest text-black mb-2">Full Name</label>
                  <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full border-b border-black bg-zinc-50 p-3 text-black font-medium focus:outline-none focus:border-b-2" placeholder="Jane Doe" />
                </div>
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-widest text-black mb-2">College / University</label>
                  <input required type="text" value={formData.college} onChange={e => setFormData({...formData, college: e.target.value})} className="w-full border-b border-black bg-zinc-50 p-3 text-black font-medium focus:outline-none focus:border-b-2" placeholder="Global Tech University" />
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-widest text-black mb-2">Age</label>
                    <input required type="number" min="16" max="99" value={formData.age} onChange={e => setFormData({...formData, age: e.target.value})} className="w-full border-b border-black bg-zinc-50 p-3 text-black font-medium focus:outline-none focus:border-b-2" placeholder="20" />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-widest text-black mb-2">Mobile Number</label>
                    <input required type="tel" value={formData.mobile} onChange={e => setFormData({...formData, mobile: e.target.value})} className="w-full border-b border-black bg-zinc-50 p-3 text-black font-medium focus:outline-none focus:border-b-2" placeholder="+1 (555) 000-0000" />
                  </div>
                </div>
                
                <div className="bg-zinc-100 p-4 border border-zinc-300 rounded-sm mt-8">
                   <p className="text-[11px] text-zinc-600 leading-relaxed font-medium">
                     By applying, you acknowledge that this is a <strong>100% free, performance-based role</strong>. You will not receive a monetary stipend, but will earn highly valued verifiable startup experience, a formal Certificate of Completion, and a Letter of Recommendation mapped directly to your UpForge Global Profile.
                   </p>
                </div>

                <button type="submit" className="w-full bg-black text-white px-6 py-4 font-bold uppercase tracking-widest text-[14px] rounded-sm hover:-translate-y-1 transition-transform shadow-[4px_4px_0_0_rgba(0,0,0,0.3)] hover:shadow-[6px_6px_0_0_rgba(0,0,0,0.5)] mt-4">
                  Submit Application
                </button>
              </form>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
