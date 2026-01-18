
import React, { useState } from 'react';

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    features: ["3 Analysis per month", "Standard ATS Tips", "Basic Keyword Match", "Email Support"],
    button: "Current Plan",
    featured: false
  },
  {
    name: "Pro",
    price: "$19",
    period: "per month",
    features: ["Unlimited Analysis", "Gemini 3 Pro Engine", "Deep Skill Gap Analysis", "Priority Support", "PDF Exports"],
    button: "Go Pro",
    featured: true
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "for teams",
    features: ["API Access", "Bulk Processing", "Custom Models", "Dedicated Manager", "SLA Guarantee"],
    button: "Contact Sales",
    featured: false
  }
];

export const Pricing: React.FC = () => {
  const [selected, setSelected] = useState('Free');

  return (
    <div className="max-w-6xl mx-auto py-16 px-4 animate-in fade-in duration-700">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-extrabold text-slate-900 mb-4">Simple, Transparent Pricing</h2>
        <p className="text-slate-500 text-xl">Land your dream job faster with Pro features.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {plans.map((plan) => (
          <div 
            key={plan.name}
            className={`relative p-8 rounded-3xl border transition-all duration-300 flex flex-col ${
              plan.featured 
                ? 'border-indigo-600 ring-4 ring-indigo-50 shadow-xl scale-105 z-10 bg-white' 
                : 'border-slate-200 bg-white hover:border-indigo-300'
            }`}
          >
            {plan.featured && (
              <span className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-indigo-600 text-white text-xs font-bold rounded-full uppercase">
                Most Popular
              </span>
            )}
            
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-slate-800">{plan.name}</h3>
              <div className="flex items-baseline mt-4">
                <span className="text-4xl font-extrabold text-slate-900">{plan.price}</span>
                <span className="ml-2 text-slate-500 text-sm">/{plan.period}</span>
              </div>
            </div>

            <ul className="space-y-4 mb-10 flex-grow">
              {plan.features.map((feature, i) => (
                <li key={i} className="flex items-center text-slate-600 text-sm">
                  <svg className="w-5 h-5 text-emerald-500 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  {feature}
                </li>
              ))}
            </ul>

            <button 
              onClick={() => setSelected(plan.name)}
              className={`w-full py-4 rounded-xl font-bold transition-all ${
                plan.featured 
                  ? 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg shadow-indigo-200' 
                  : 'bg-slate-100 text-slate-800 hover:bg-slate-200'
              } ${selected === plan.name && 'ring-2 ring-offset-2 ring-indigo-500'}`}
            >
              {plan.button}
            </button>
          </div>
        ))}
      </div>
      
      <p className="text-center text-slate-400 mt-12 text-sm italic">
        * No credit card required to start with the Free plan.
      </p>
    </div>
  );
};
