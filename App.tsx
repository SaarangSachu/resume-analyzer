
import React, { useState, useCallback } from 'react';
import { Header, View } from './components/Header';
import { FileUpload } from './components/FileUpload';
import { Dashboard } from './components/Dashboard';
import { Documentation } from './components/Documentation';
import { ATSTips } from './components/ATSTips';
import { Pricing } from './components/Pricing';
import { SecurityBadge } from './components/SecurityBadge';
import { analyzeResume } from './services/geminiService';
import { AnalysisResult, AppState } from './types';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>('analyzer');
  const [appState, setAppState] = useState<AppState>(AppState.IDLE);
  const [resumeText, setResumeText] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleStartAnalysis = useCallback(async () => {
    if (!resumeText.trim() || !jobDescription.trim()) {
      alert("Please provide both a resume and a job description.");
      return;
    }

    setAppState(AppState.ANALYZING);
    setError(null);
    
    try {
      const result = await analyzeResume(resumeText, jobDescription);
      setAnalysis(result);
      setAppState(AppState.COMPLETED);
    } catch (err: any) {
      setError(err.message || "An error occurred during analysis.");
      setAppState(AppState.ERROR);
    }
  }, [resumeText, jobDescription]);

  const reset = () => {
    setAppState(AppState.IDLE);
    setResumeText('');
    setJobDescription('');
    setAnalysis(null);
    setError(null);
  };

  const renderAnalyzer = () => (
    <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-2">
            Resume <span className="text-indigo-600">Optimizer</span>
          </h2>
          <p className="text-slate-500 max-w-xl">
            Upload your professional profile and target job description to get a deep semantic match analysis.
          </p>
        </div>
        <SecurityBadge />
      </div>

      {(appState === AppState.IDLE || appState === AppState.ANALYZING || appState === AppState.ERROR) && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Resume Upload Column */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 h-full flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-lg text-slate-800">1. Your Resume</h3>
                {resumeText && <span className="text-emerald-500 text-xs font-bold uppercase tracking-wider">✓ Loaded</span>}
              </div>
              <FileUpload onFileParsed={setResumeText} isLoading={appState === AppState.ANALYZING} />
              <div className="mt-4 flex-grow flex flex-col">
                <label className="block text-xs font-bold text-slate-500 uppercase mb-2 tracking-widest">Manually Edit Content</label>
                <textarea
                  className="w-full flex-grow p-4 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all resize-none min-h-[200px]"
                  placeholder="Paste or refine your resume text here..."
                  value={resumeText}
                  onChange={(e) => setResumeText(e.target.value)}
                  disabled={appState === AppState.ANALYZING}
                ></textarea>
              </div>
            </div>
          </div>

          {/* JD Input Column */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 h-full flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-lg text-slate-800">2. Job Description</h3>
              {jobDescription && <span className="text-emerald-500 text-xs font-bold uppercase tracking-wider">✓ Ready</span>}
            </div>
            <div className="flex-grow flex flex-col">
              <label className="block text-xs font-bold text-slate-500 uppercase mb-2 tracking-widest">Target Role Requirements</label>
              <textarea
                className="w-full flex-grow p-4 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all resize-none min-h-[350px]"
                placeholder="Paste the full job post details from LinkedIn, Indeed, etc..."
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                disabled={appState === AppState.ANALYZING}
              ></textarea>
            </div>
          </div>
        </div>
      )}

      {/* Control Panel */}
      {(appState === AppState.IDLE || appState === AppState.ERROR) && (
        <div className="flex flex-col items-center justify-center space-y-4">
          <button
            onClick={handleStartAnalysis}
            className={`px-12 py-5 bg-indigo-600 text-white rounded-2xl font-bold text-lg hover:bg-indigo-700 hover:scale-105 transition-all shadow-2xl shadow-indigo-100 active:scale-95 flex items-center ${
              (!resumeText.trim() || !jobDescription.trim()) ? 'opacity-50 cursor-not-allowed grayscale' : ''
            }`}
            disabled={!resumeText.trim() || !jobDescription.trim()}
          >
            Run Intelligence Check
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </button>
          <p className="text-xs text-slate-400">Powered by Gemini 3 Pro Engine</p>
        </div>
      )}

      {appState === AppState.ANALYZING && (
        <div className="flex flex-col items-center justify-center py-24">
          <div className="relative">
            <div className="w-20 h-20 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-10 h-10 bg-indigo-50 rounded-full animate-pulse"></div>
            </div>
          </div>
          <h3 className="text-2xl font-bold text-slate-800 mt-8">Analyzing Context...</h3>
          <p className="text-slate-500 mt-2">Our AI is extracting skills and experience patterns.</p>
        </div>
      )}

      {appState === AppState.ERROR && (
        <div className="max-w-lg mx-auto mt-12 p-6 bg-red-50 border border-red-200 rounded-2xl text-red-800 text-center">
          <div className="bg-red-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h4 className="font-bold text-lg">Analysis Error</h4>
          <p className="text-sm mt-2 opacity-90">{error}</p>
          <button onClick={() => setAppState(AppState.IDLE)} className="mt-6 text-sm font-bold underline">Try again</button>
        </div>
      )}

      {appState === AppState.COMPLETED && analysis && (
        <div className="mt-8 space-y-10">
          <div className="flex items-center justify-between bg-white px-6 py-4 rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse"></div>
              <span className="text-slate-700 font-bold">Analysis Ready for Review</span>
            </div>
            <button 
              onClick={reset}
              className="px-4 py-2 bg-slate-900 text-white font-bold rounded-lg hover:bg-slate-800 transition-all text-sm"
            >
              Start New Check
            </button>
          </div>
          <Dashboard data={analysis} />
        </div>
      )}
    </div>
  );

  const renderContent = () => {
    switch (currentView) {
      case 'docs': return <Documentation />;
      case 'tips': return <ATSTips />;
      case 'pricing': return <Pricing />;
      default: return renderAnalyzer();
    }
  };

  return (
    <div className="min-h-screen pb-12 bg-slate-50 selection:bg-indigo-100">
      <Header currentView={currentView} onNavigate={setCurrentView} />
      <main className="max-w-6xl mx-auto px-4 mt-12">
        {renderContent()}
      </main>

      <footer className="mt-24 border-t border-slate-200 py-16 text-center text-slate-400">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="text-left">
              <div className="text-xl font-bold text-slate-800 mb-2">ResumePro</div>
              <p className="max-w-xs text-sm">Empowering job seekers with state-of-the-art career intelligence.</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-12 text-sm">
              <div className="text-left">
                <div className="font-bold text-slate-800 mb-4 uppercase tracking-widest text-xs">Product</div>
                <ul className="space-y-2">
                  <li><button onClick={() => setCurrentView('analyzer')} className="hover:text-indigo-600 transition-colors">Analyzer</button></li>
                  <li><button onClick={() => setCurrentView('pricing')} className="hover:text-indigo-600 transition-colors">Pricing</button></li>
                </ul>
              </div>
              <div className="text-left">
                <div className="font-bold text-slate-800 mb-4 uppercase tracking-widest text-xs">Resources</div>
                <ul className="space-y-2">
                  <li><button onClick={() => setCurrentView('tips')} className="hover:text-indigo-600 transition-colors">ATS Tips</button></li>
                  <li><button onClick={() => setCurrentView('docs')} className="hover:text-indigo-600 transition-colors">Documentation</button></li>
                </ul>
              </div>
              <div className="text-left hidden md:block">
                <div className="font-bold text-slate-800 mb-4 uppercase tracking-widest text-xs">Legal</div>
                <ul className="space-y-2">
                  <li><button onClick={() => setCurrentView('docs')} className="hover:text-indigo-600 transition-colors">Privacy</button></li>
                  <li><button onClick={() => setCurrentView('docs')} className="hover:text-indigo-600 transition-colors">Terms</button></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="mt-16 pt-8 border-t border-slate-100 text-xs italic">
            &copy; 2025 ResumePro AI Platform. All analysis is performed using Gemini AI models.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
