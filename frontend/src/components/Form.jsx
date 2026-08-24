import React, { useState } from 'react';

export default function Form({ onAdd }) {
  const [n, setN] = useState('');
  const [c, setC] = useState('');
  const [cy, setCy] = useState('Monthly');
  const [d, setD] = useState('');
  const [err, setErr] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const sub = async (e) => {
    e.preventDefault();
    if (!n || !c || !d) {
      setErr('Please fill all fields');
      return;
    }
    const costNum = parseFloat(c);
    if (isNaN(costNum) || costNum < 0) {
      setErr('Cost must be positive');
      return;
    }
    setErr('');
    setSubmitting(true);
    try {
      await onAdd({ name: n, cost: costNum, cycle: cy, date: d });
      setN('');
      setC('');
      setCy('Monthly');
      setD('');
    } catch (ex) {
      setErr(ex.response?.data?.error || 'Failed to add subscription');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-zinc-900/50 backdrop-blur-md border border-zinc-800 p-6 rounded-2xl shadow-xl mb-8">
      <h3 className="text-xl font-bold mb-4 text-zinc-100 bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">Add Subscription</h3>
      {err && (
        <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm p-3 rounded-lg mb-4 flex items-center">
          <span className="w-1.5 h-1.5 rounded-full bg-red-500 mr-2"></span>
          {err}
        </div>
      )}
      <form onSubmit={sub} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
        <div className="flex flex-col">
          <label className="text-zinc-400 text-xs font-semibold mb-2 uppercase tracking-wide">Service Name</label>
          <input
            type="text"
            value={n}
            onChange={(e) => setN(e.target.value)}
            placeholder="e.g. Netflix"
            className="bg-zinc-950 border border-zinc-850 rounded-xl px-4 py-2.5 text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-indigo-500 transition-colors text-sm"
            required
          />
        </div>
        <div className="flex flex-col">
          <label className="text-zinc-400 text-xs font-semibold mb-2 uppercase tracking-wide">Cost ($)</label>
          <input
            type="number"
            step="0.01"
            min="0"
            value={c}
            onChange={(e) => setC(e.target.value)}
            placeholder="e.g. 15.99"
            className="bg-zinc-950 border border-zinc-850 rounded-xl px-4 py-2.5 text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-indigo-500 transition-colors text-sm"
            required
          />
        </div>
        <div className="flex flex-col">
          <label className="text-zinc-400 text-xs font-semibold mb-2 uppercase tracking-wide">Billing Cycle</label>
          <select
            value={cy}
            onChange={(e) => setCy(e.target.value)}
            className="bg-zinc-950 border border-zinc-850 rounded-xl px-4 py-2.5 text-zinc-100 focus:outline-none focus:border-indigo-500 transition-colors text-sm"
          >
            <option value="Monthly">Monthly</option>
            <option value="Yearly">Yearly</option>
          </select>
        </div>
        <div className="flex flex-col">
          <label className="text-zinc-400 text-xs font-semibold mb-2 uppercase tracking-wide">Renewal Date</label>
          <input
            type="date"
            value={d}
            onChange={(e) => setD(e.target.value)}
            className="bg-zinc-950 border border-zinc-850 rounded-xl px-4 py-2.5 text-zinc-100 focus:outline-none focus:border-indigo-500 transition-colors text-sm"
            required
          />
        </div>
        <div className="md:col-span-4 flex justify-end mt-2">
          <button
            type="submit"
            disabled={submitting}
            className="w-full md:w-auto bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white font-semibold px-6 py-2.5 rounded-xl shadow-lg shadow-indigo-500/10 transition-all active:scale-[0.98] disabled:opacity-50 text-sm"
          >
            {submitting ? 'Adding...' : 'Add Service'}
          </button>
        </div>
      </form>
    </div>
  );
}
