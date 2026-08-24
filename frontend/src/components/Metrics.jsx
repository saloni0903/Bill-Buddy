import React from 'react';

export default function Metrics({ burnRate, alertCnt }) {
  const f = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(burnRate);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
      <div className="bg-zinc-900/50 backdrop-blur-md border border-zinc-800 p-6 rounded-2xl flex flex-col justify-between shadow-xl transition-all duration-300 hover:border-emerald-500/30 hover:shadow-emerald-500/5">
        <div>
          <p className="text-zinc-400 text-sm font-medium uppercase tracking-wider">Total Monthly Burn</p>
          <h3 className="text-3xl md:text-4xl font-extrabold mt-2 bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">{f}/mo</h3>
        </div>
        <div className="mt-4 flex items-center text-emerald-400 text-xs font-semibold">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse mr-2"></span>
          Real-time Burn Rate
        </div>
      </div>
      
      <div className="bg-zinc-900/50 backdrop-blur-md border border-zinc-800 p-6 rounded-2xl flex flex-col justify-between shadow-xl transition-all duration-300 hover:border-amber-500/30 hover:shadow-amber-500/5">
        <div>
          <p className="text-zinc-400 text-sm font-medium uppercase tracking-wider">Upcoming Renewals (7 Days)</p>
          <h3 className="text-3xl md:text-4xl font-extrabold mt-2 text-zinc-100">{alertCnt}</h3>
        </div>
        <div className={`mt-4 flex items-center text-xs font-semibold ${alertCnt > 0 ? 'text-amber-400' : 'text-zinc-500'}`}>
          <span className={`w-2 h-2 rounded-full mr-2 ${alertCnt > 0 ? 'bg-amber-500 animate-ping' : 'bg-zinc-600'}`}></span>
          {alertCnt > 0 ? 'Action Required Soon' : 'System Clear'}
        </div>
      </div>
    </div>
  );
}
