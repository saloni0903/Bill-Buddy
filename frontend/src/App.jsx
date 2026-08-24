import React, { useState, useEffect } from 'react';
import { getDash, addSub, toggleSub } from './services/api';
import Metrics from './components/Metrics';
import Form from './components/Form';
import Grid from './components/Grid';

export default function App() {
  const [met, setMet] = useState({ burnRate: 0, alertCnt: 0 });
  const [subs, setSubs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState('');

  const load = async () => {
    try {
      setLoading(true);
      const data = await getDash();
      setMet(data.metrics);
      setSubs(data.subs);
      setErr('');
    } catch (ex) {
      setErr('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleAdd = async (d) => {
    const data = await addSub(d);
    setMet(data.metrics);
    setSubs(data.subs);
  };

  const handleToggle = async (id) => {
    try {
      const data = await toggleSub(id);
      setMet(data.metrics);
      setSubs(data.subs);
    } catch (ex) {
      setErr('Failed to toggle status');
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-10 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <header className="mb-10 text-center md:text-left flex flex-col md:flex-row md:items-center md:justify-between border-b border-zinc-900 pb-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Bill Buddy
            </h1>
            <p className="text-zinc-500 mt-1 text-sm md:text-base">
              Subscription Tracker & Renewal Dashboard
            </p>
          </div>
          <div className="mt-4 md:mt-0">
            <button
              onClick={load}
              className="bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 px-4 py-2 rounded-xl text-sm font-medium transition-colors flex items-center justify-center space-x-2"
            >
              <span>Refresh</span>
            </button>
          </div>
        </header>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-zinc-500 mt-4 text-sm font-medium">Syncing subscriptions...</p>
          </div>
        ) : (
          <>
            {err && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm p-4 rounded-xl mb-6 flex items-center">
                <span className="w-2 h-2 rounded-full bg-red-500 mr-2 animate-ping"></span>
                {err}
              </div>
            )}
            <Metrics burnRate={met.burnRate} alertCnt={met.alertCnt} />
            <Form onAdd={handleAdd} />
            <Grid subs={subs} onToggle={handleToggle} />
          </>
        )}
      </div>
    </div>
  );
}
