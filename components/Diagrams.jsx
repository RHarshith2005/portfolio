
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Cpu, Terminal, Database, Globe, Code, Layers, Zap, BarChart2 } from 'lucide-react';

// --- SKILLS GRID (Was Surface Code) ---
export const SkillsDiagram = () => {
  const [activeSkills, setActiveSkills] = useState([]);
  const [showCertificate, setShowCertificate] = useState(false);
  
  const skills = [
    { id: 'python',     label: 'Python',     icon: Terminal,  certificate: '/python-certificate.pdf' },
    { id: 'javascript', label: 'JavaScript', icon: Code },
    { id: 'react',      label: 'React/Vite', icon: Globe },
    { id: 'fastapi',    label: 'FastAPI',    icon: Zap },
    { id: 'mongodb',    label: 'MongoDB',    icon: Database },
    { id: 'firebase',   label: 'Firebase',   icon: Layers },
    { id: 'crewai',     label: 'CrewAI',     icon: Cpu },
    { id: 'ml',         label: 'ML/AI',      icon: BarChart2 },
  ];

  const toggleSkill = (skill) => {
    if (skill.certificate) {
      setShowCertificate(true);
    } else {
      setActiveSkills(prev => prev.includes(skill.id) ? prev.filter(e => e !== skill.id) : [...prev, skill.id]);
    }
  };

  return (
    <>
      {showCertificate && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-2 sm:p-4" onClick={() => setShowCertificate(false)}>
          <div className="relative bg-white rounded-lg max-w-4xl w-full h-[95vh] sm:h-[90vh] overflow-hidden" onClick={(e) => e.stopPropagation()}>
            <div className="sticky top-0 z-10 bg-white border-b border-stone-200 p-3 sm:p-4 flex items-center justify-between">
              <h3 className="font-serif text-lg text-stone-900">Python Certificate</h3>
              <div className="flex gap-2">
                <a 
                  href="/python-certificate.pdf"
                  download="Python-Certificate.pdf"
                  className="bg-nobel-gold text-white px-3 py-2 sm:px-4 sm:py-2 rounded-lg hover:bg-nobel-gold/80 transition-colors text-sm"
                >
                  Download
                </a>
                <button 
                  onClick={() => setShowCertificate(false)}
                  className="bg-stone-900 text-white px-3 py-2 sm:px-4 sm:py-2 rounded-lg hover:bg-stone-800 transition-colors text-sm"
                >
                  Close
                </button>
              </div>
            </div>
            <iframe 
              src="/python-certificate.pdf"
              className="w-full h-[calc(100%-60px)]"
              title="Python Certificate"
            />
          </div>
        </div>
      )}
      
      <div className="flex flex-col items-center p-8 bg-white rounded-xl shadow-sm border border-stone-200 my-8">
      <h3 className="font-serif text-xl mb-4 text-stone-800">Interactive Skill Set</h3>
      <p className="text-sm text-stone-500 mb-6 text-center max-w-md">
        Click the icons to highlight skills. Python shows certificate.
      </p>
      
      <div className="grid grid-cols-3 gap-4 p-4 bg-[#F5F4F0] rounded-lg border border-stone-200">
         {skills.map((skill) => (
             <button
                key={skill.id}
                onClick={() => toggleSkill(skill)}
                className={`w-20 h-20 flex flex-col items-center justify-center gap-2 rounded-lg transition-all duration-300 relative ${activeSkills.includes(skill.id) ? 'bg-stone-800 text-nobel-gold shadow-md scale-105' : 'bg-white text-stone-500 hover:text-stone-800 hover:shadow-sm'}`}
             >
                {skill.certificate && (
                  <span className="absolute top-1 right-1 w-2 h-2 bg-green-500 rounded-full"></span>
                )}
                <skill.icon size={20} />
                <span className="text-[10px] font-bold uppercase tracking-wider">{skill.label}</span>
             </button>
         ))}
      </div>

      <div className="mt-6 h-6 text-sm font-serif italic text-stone-600">
        {activeSkills.length === 0 ? "Select a skill to explore." : `Selected: ${activeSkills.map(s => skills.find(sk => sk.id === s)?.label).join(", ")}`}
      </div>
    </div>
      </>
  );
};

// --- PROJECT WORKFLOW (Was Transformer Decoder) ---
export const ProjectFlowDiagram = () => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
        setStep(s => (s + 1) % 4);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center p-8 bg-[#F5F4F0] rounded-xl border border-stone-200 my-8">
      <h3 className="font-serif text-xl mb-4 text-stone-900">Development Lifecycle</h3>
      <p className="text-sm text-stone-600 mb-6 text-center max-w-md">
        My standard approach to tackling engineering problems, from concept to deployment.
      </p>

      <div className="relative w-full max-w-lg h-56 bg-white rounded-lg shadow-inner overflow-hidden mb-6 border border-stone-200 flex items-center justify-center gap-8 p-4">
        
        {/* Ideation */}
        <div className="flex flex-col items-center gap-2">
            <div className={`w-16 h-16 rounded-lg border-2 flex flex-col items-center justify-center transition-colors duration-500 ${step === 0 ? 'border-nobel-gold bg-nobel-gold/10' : 'border-stone-200 bg-stone-50'}`}>
               <Zap size={24} className={step === 0 ? 'text-nobel-gold' : 'text-stone-300'} />
            </div>
            <span className="text-[10px] uppercase font-bold tracking-wider text-stone-500">Analysis</span>
        </div>

        {/* Arrows */}
        <motion.div animate={{ opacity: step >= 1 ? 1 : 0.3, x: step >= 1 ? 0 : -5 }}>→</motion.div>

        {/* Development */}
        <div className="flex flex-col items-center gap-2">
             <div className={`w-24 h-24 rounded-xl border-2 flex flex-col items-center justify-center gap-2 transition-colors duration-500 relative overflow-hidden ${step === 1 || step === 2 ? 'border-stone-800 bg-stone-900 text-white' : 'border-stone-200 bg-stone-50'}`}>
                <Code size={24} className={step === 1 || step === 2 ? 'text-nobel-gold animate-pulse' : 'text-stone-300'} />
                {step === 1 && (
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-full h-[1px] bg-nobel-gold absolute top-1/3 animate-ping"></div>
                        <div className="w-full h-[1px] bg-nobel-gold absolute top-2/3 animate-ping delay-75"></div>
                    </div>
                )}
             </div>
             <span className="text-[10px] uppercase font-bold tracking-wider text-stone-500">Build</span>
        </div>

        {/* Arrows */}
        <motion.div animate={{ opacity: step >= 3 ? 1 : 0.3, x: step >= 3 ? 0 : -5 }}>→</motion.div>

        {/* Output Stage */}
        <div className="flex flex-col items-center gap-2">
            <div className={`w-16 h-16 rounded-lg border-2 flex flex-col items-center justify-center transition-colors duration-500 ${step === 3 ? 'border-green-500 bg-green-50' : 'border-stone-200 bg-stone-50'}`}>
                {step === 3 ? (
                    <Globe size={24} className="text-green-600" />
                ) : (
                    <Globe size={24} className="text-stone-300" />
                )}
            </div>
            <span className="text-[10px] uppercase font-bold tracking-wider text-stone-500">Deploy</span>
        </div>

      </div>

      <div className="flex gap-2">
          {[0, 1, 2, 3].map(s => (
              <div key={s} className={`h-1 rounded-full transition-all duration-300 ${step === s ? 'w-8 bg-nobel-gold' : 'w-2 bg-stone-300'}`}></div>
          ))}
      </div>
    </div>
  );
};

// --- STATS DIAGRAM (Was Performance Metric) ---
export const StatsDiagram = () => {
    const [category, setCategory] = useState('Full Stack');
    
    const data = {
        'Full Stack': { label: 'Production Apps Shipped', val: 88, sub: 'React + FastAPI' },
        'AI/ML':      { label: 'AI/Agent Engineering',    val: 82, sub: 'CrewAI + LLMs'  },
        'DevOps':     { label: 'CI/CD & Deployment',       val: 78, sub: 'Vercel + Render' }
    };

    const currentData = data[category];
    
    return (
        <div className="flex flex-col md:flex-row gap-8 items-center p-8 bg-stone-900 text-stone-100 rounded-xl my-8 border border-stone-800 shadow-lg">
            <div className="flex-1 min-w-[240px]">
                <h3 className="font-serif text-xl mb-2 text-nobel-gold">Proficiency Metrics</h3>
                <p className="text-stone-400 text-sm mb-4 leading-relaxed">
                    A self-assessment of production-readiness across my primary engineering disciplines — built from shipping real client projects, a peer-reviewed paper, and ongoing event-driven development.
                </p>
                <div className="flex gap-2 mt-6">
                    {['Full Stack', 'AI/ML', 'DevOps'].map((d) => (
                        <button 
                            key={d}
                            onClick={() => setCategory(d)} 
                            className={`px-3 py-1.5 rounded text-sm font-medium transition-all duration-200 border ${category === d ? 'bg-nobel-gold text-stone-900 border-nobel-gold' : 'bg-transparent text-stone-400 border-stone-700 hover:border-stone-500 hover:text-stone-200'}`}
                        >
                            {d}
                        </button>
                    ))}
                </div>
                <div className="mt-6 font-mono text-xs text-stone-500 flex items-center gap-2">
                    <BarChart2 size={14} className="text-nobel-gold" /> 
                    <span>RELATIVE SKILL LEVEL</span>
                </div>
            </div>
            
            <div className="relative w-64 h-72 bg-stone-800/50 rounded-xl border border-stone-700/50 p-6 flex justify-around items-end">
                {/* Background Grid Lines */}
                <div className="absolute inset-0 p-6 flex flex-col justify-between pointer-events-none opacity-10">
                   <div className="w-full h-[1px] bg-stone-400"></div>
                   <div className="w-full h-[1px] bg-stone-400"></div>
                   <div className="w-full h-[1px] bg-stone-400"></div>
                   <div className="w-full h-[1px] bg-stone-400"></div>
                </div>

                {/* Skill Bar */}
                <div className="w-24 flex flex-col justify-end items-center h-full z-10">
                     <div className="flex-1 w-full flex items-end justify-center relative mb-3">
                        <div className="absolute -top-5 w-full text-center text-sm font-mono text-nobel-gold font-bold bg-stone-900/90 py-1 px-2 rounded backdrop-blur-sm border border-nobel-gold/30 shadow-sm">{currentData.val}%</div>
                        <motion.div 
                            key={category}
                            className="w-full bg-nobel-gold rounded-t-md shadow-[0_0_20px_rgba(197,160,89,0.25)] relative overflow-hidden"
                            initial={{ height: 0 }}
                            animate={{ height: `${currentData.val}%` }}
                            transition={{ type: "spring", stiffness: 80, damping: 15 }}
                        >
                           {/* Shine effect */}
                           <div className="absolute inset-0 bg-gradient-to-tr from-transparent to-white/20"></div>
                        </motion.div>
                    </div>
                     <div className="h-6 flex items-center text-xs font-bold text-nobel-gold uppercase tracking-wider">{currentData.sub}</div>
                </div>
            </div>
        </div>
    )
}
