
import React from 'react';

export const Documentation: React.FC = () => {
  const sections = [
    {
      title: "Getting Started",
      content: "Upload your resume in PDF or TXT format and paste the target Job Description. Our AI compares keywords, skills, and experience levels to give you an objective match score."
    },
    {
      title: "How Scoring Works",
      content: "The Match Score (0-100) is calculated using Gemini's advanced semantic analysis. It looks for more than just keyword frequency; it evaluates context, seniority, and skill relevance."
    },
    {
      title: "Security & Privacy",
      content: "We take your data security seriously. Resumes are processed in real-time and are never stored on our servers. The analysis is performed via an encrypted connection to Google's Gemini API."
    },
    {
      title: "Supported Formats",
      content: "We currently support .pdf, .docx, and .txt files. For best results with images or complex layouts, we recommend converting to a plain text format first."
    }
  ];

  return (
    <div className="max-w-4xl mx-auto py-12 px-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <h2 className="text-3xl font-bold text-slate-900 mb-2">Help Center</h2>
      <p className="text-slate-500 mb-8 text-lg">Everything you need to know about using ResumePro.</p>
      
      <div className="space-y-6">
        {sections.map((section, i) => (
          <div key={i} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:border-indigo-300 transition-colors">
            <h3 className="text-xl font-bold text-slate-800 mb-3">{section.title}</h3>
            <p className="text-slate-600 leading-relaxed">{section.content}</p>
          </div>
        ))}
      </div>
      
      <div className="mt-12 p-8 bg-indigo-600 rounded-2xl text-white text-center">
        <h3 className="text-2xl font-bold mb-4">Still have questions?</h3>
        <p className="mb-6 opacity-90">Our support team is available 24/7 for Pro and Enterprise users.</p>
        <button className="px-6 py-3 bg-white text-indigo-600 font-bold rounded-lg hover:bg-indigo-50 transition-colors">
          Contact Support
        </button>
      </div>
    </div>
  );
};
