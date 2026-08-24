import React from 'react';

export default function Grid({ subs, onToggle }) {
  const fDate = (dStr) => {
    return new Date(dStr).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      timeZone: 'UTC'
    });
  };

  const fCost = (c) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(c);
  };

  return (
    <div className="bg-zinc-900/50 backdrop-blur-md border border-zinc-800 rounded-2xl shadow-xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-zinc-800 text-zinc-400 text-xs font-semibold uppercase tracking-wider bg-zinc-950/40">
              <th className="px-6 py-4">Name</th>
              <th className="px-6 py-4">Cost</th>
              <th className="px-6 py-4">Billing Cycle</th>
              <th className="px-6 py-4">Next Renewal Date</th>
              <th className="px-6 py-4 text-center">Status</th>
              <th className="px-6 py-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-850">
            {subs.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-10 text-zinc-500 text-sm">
                  No active subscriptions found. Add some services above!
                </td>
              </tr>
            ) : (
              subs.map((s) => {
                const paused = s.status === 'Paused';
                return (
                  <tr
                    key={s._id}
                    className={`transition-all duration-200 hover:bg-zinc-850/20 ${
                      paused ? 'opacity-40 line-through saturate-50 bg-zinc-950/10' : ''
                    }`}
                  >
                    <td className="px-6 py-4 font-semibold text-zinc-100 text-sm">
                      <div className="flex items-center space-x-2">
                        <span>{s.name}</span>
                        {s.isOverdue && (
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium bg-red-500/10 text-red-400 border border-red-500/20 animate-pulse">
                            Overdue
                          </span>
                        )}
                        {!s.isOverdue && s.isUrgent && (
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium bg-amber-500/10 text-amber-400 border border-amber-500/20">
                            Renewing Soon
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-zinc-100 text-sm font-medium">
                      {fCost(s.cost)}
                    </td>
                    <td className="px-6 py-4 text-zinc-400 text-sm">
                      {s.cycle}
                    </td>
                    <td className="px-6 py-4 text-zinc-300 text-sm">
                      {fDate(s.date)}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span
                        className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border ${
                          paused
                            ? 'bg-zinc-800/50 text-zinc-500 border-zinc-700'
                            : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                        }`}
                      >
                        {s.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => onToggle(s._id)}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${
                          paused ? 'bg-zinc-700' : 'bg-emerald-500'
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            paused ? 'translate-x-1' : 'translate-x-6'
                          }`}
                        />
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
