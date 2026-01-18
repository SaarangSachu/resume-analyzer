
import React from 'react';

const tips = [
  {
    category: "Formatting",
    title: "Keep it Simple",
    desc: "ATS software struggles with tables, text boxes, and complex graphics. Use a clean, single-column layout for maximum readability.",
    icon: "📄"
  },
  {
    category: "Keywords",
    title: "Context Matters",
    desc: "Don't just list keywords. Show how you used those skills in your achievements to score higher on 'experience alignment' metrics.",
    icon: "🔍"
  },
  {
    category: "Headers",
    title: "Standard Headings",
    desc: "Use common headers like 'Experience', 'Education', and 'Skills'. Creative titles can confuse the parser and hide your qualifications.",
    icon: "🏷️"
  },
  {
    category: "Strategy",
    title: "Tailor Every App",
    desc: "Use ResumePro to adjust your resume for every job description. Even minor keyword shifts can boost your match from 60% to 90%.",
    icon: "🎯"
  }
];

export const ATSTips: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto py-12 px-4 animate-in fade-in duration-500">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-slate-900 mb-4">Master the ATS</h2>
        <p className="text-slate-600 max-w-2xl mx-auto">95% of Fortune 500 companies use Applicant Tracking Systems. Here's how to ensure yours gets seen by a human.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {tips.map((tip, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl border border-slate-200 hover:shadow-lg transition-all group">
            <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">{tip.icon}</div>
            <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest">{tip.category}</span>
            <h3 className="text-lg font-bold text-slate-800 mt-1 mb-3">{tip.title}</h3>
            <p className="text-sm text-slate-500 leading-relaxed">{tip.desc}</p>
          </div>
        ))}
      </div>

      <div className="mt-16 bg-slate-900 rounded-3xl p-10 text-white relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-lg">
            <h3 className="text-2xl font-bold mb-4">The Golden Rule</h3>
            <p className="text-slate-400 text-lg italic">"Optimize for the robot, but write for the human."</p>
            <p className="mt-4 text-slate-300">Passing the ATS is only the first hurdle. Your content must still be compelling enough to impress a recruiter in under 6 seconds.</p>
          </div>
          <div className="flex-shrink-0">
             <div className="bg-indigo-600 p-1 rounded-xl shadow-2xl">
                <div className="bg-slate-900 p-6 rounded-lg border border-slate-700">
                  <div className="text-sm font-mono text-emerald-400"># Pro Tip</div>
                  <div className="text-lg font-semibold mt-2">Use Standard Fonts</div>
                  <p className="text-sm text-slate-400 mt-1">Stick to Arial, Helvetica, or Calibri.</p>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};
