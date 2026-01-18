
import React from 'react';

export type View = 'analyzer' | 'docs' | 'tips' | 'pricing';

interface HeaderProps {
  currentView: View;
  onNavigate: (view: View) => void;
}

export const Header: React.FC<HeaderProps> = ({ currentView, onNavigate }) => {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <button 
          onClick={() => onNavigate('analyzer')}
          className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
        >
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-xl">R</span>
          </div>
          <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-blue-600">
            ResumePro
          </h1>
        </button>
        
        <nav className="flex space-x-2 md:space-x-8 text-sm font-medium">
          {[
            { id: 'docs', label: 'Documentation' },
            { id: 'tips', label: 'ATS Tips' },
            { id: 'pricing', label: 'Pricing' }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id as View)}
              className={`px-3 py-2 rounded-md transition-colors ${
                currentView === item.id 
                  ? 'text-indigo-600 bg-indigo-50' 
                  : 'text-slate-600 hover:text-indigo-600 hover:bg-slate-50'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
};
