
import React from 'react';
import { AnalysisResult, Skill } from '../types';
import { PieChart, Pie, Cell, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend } from 'recharts';

interface DashboardProps {
  data: AnalysisResult;
}

const COLORS = ['#10b981', '#ef4444'];

// Fixed: Moved SkillBadge outside and added React.FC type to handle intrinsic React props like 'key'
const SkillBadge: React.FC<{ skill: Skill; type: 'matched' | 'missing' }> = ({ skill, type }) => (
  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium mr-2 mb-2 ${
    type === 'matched' ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'
  }`}>
    {skill.name}
  </span>
);

export const Dashboard: React.FC<DashboardProps> = ({ data }) => {
  const pieData = [
    { name: 'Match', value: data.matchScore },
    { name: 'Gap', value: 100 - data.matchScore }
  ];

  const radarData = [
    { subject: 'Skills', A: data.matchScore },
    { subject: 'Experience', A: data.experienceAlignment.score },
    { subject: 'Keywords', A: data.keywordRelevance.score },
    { subject: 'ATS Friendliness', A: 85 }, // Simulated score
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* Overview Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 col-span-1 flex flex-col items-center justify-center">
          <h3 className="text-slate-500 text-sm font-semibold uppercase mb-4">Overall Match Score</h3>
          <div className="w-full h-48">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="text-4xl font-bold text-slate-800 mt-[-6rem]">{data.matchScore}%</div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 col-span-1 md:col-span-2">
          <h3 className="text-slate-500 text-sm font-semibold uppercase mb-4">Analysis Breakdown</h3>
          <div className="w-full h-56">
             <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="subject" />
                <PolarRadiusAxis angle={30} domain={[0, 100]} />
                <Radar name="Candidate" dataKey="A" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Skills Match Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h3 className="text-slate-800 font-bold mb-4 flex items-center">
            <span className="w-3 h-3 bg-emerald-500 rounded-full mr-2"></span>
            Matched Skills
          </h3>
          <div className="flex flex-wrap">
            {data.skillsMatch.matched.map((s, i) => <SkillBadge key={i} skill={s} type="matched" />)}
            {data.skillsMatch.matched.length === 0 && <p className="text-slate-400 italic">No direct skill matches found.</p>}
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h3 className="text-slate-800 font-bold mb-4 flex items-center">
            <span className="w-3 h-3 bg-red-500 rounded-full mr-2"></span>
            Missing Critical Skills
          </h3>
          <div className="flex flex-wrap">
            {data.skillsMatch.missing.map((s, i) => <SkillBadge key={i} skill={s} type="missing" />)}
            {data.skillsMatch.missing.length === 0 && <p className="text-slate-400 italic">No critical skills missing.</p>}
          </div>
        </div>
      </div>

      {/* Improvement Suggestions */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
        <h3 className="text-slate-800 font-bold mb-6 text-xl">Actionable Suggestions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h4 className="text-blue-600 font-semibold mb-3 text-sm uppercase tracking-wider">Strategic Improvements</h4>
            <ul className="space-y-3">
              {data.suggestions.map((s, i) => (
                <li key={i} className="flex items-start text-slate-600">
                  <span className="text-blue-500 mr-2 font-bold">•</span>
                  {s}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-emerald-600 font-semibold mb-3 text-sm uppercase tracking-wider">ATS Optimization</h4>
            <ul className="space-y-3">
              {data.atsOptimization.map((s, i) => (
                <li key={i} className="flex items-start text-slate-600">
                  <span className="text-emerald-500 mr-2 font-bold">✓</span>
                  {s}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      
      {/* Keyword Heatmap Summary */}
      <div className="bg-slate-900 text-white p-6 rounded-xl shadow-lg">
        <h3 className="font-bold mb-4">Top Relevance Keywords</h3>
        <div className="flex flex-wrap gap-2">
          {data.keywordRelevance.topKeywords.map((kw, i) => (
            <span key={i} className="px-3 py-1 bg-slate-800 border border-slate-700 rounded text-sm hover:bg-slate-700 cursor-default transition-colors">
              {kw}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
