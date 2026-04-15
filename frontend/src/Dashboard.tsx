import { useState, useEffect } from 'react';
import { apiService } from './api';
import { SimulationOptions, SimulationResult, SimulationRequest } from './types';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

export const Dashboard = () => {
  const [options, setOptions] = useState<SimulationOptions | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<SimulationResult | null>(null);
  const [formData, setFormData] = useState<SimulationRequest>({
    strategy: '', engine: '', amount: 1000, duration: 10
  });

  useEffect(() => {
    apiService.getOptions().then(res => {
      if (res.success && res.data) {
        setOptions(res.data);
        setFormData(prev => ({
          ...prev,
          strategy: res.data!.strategies[0].id,
          engine: res.data!.engines[0].id
        }));
      }
    });
  }, []);

  const handleSimulate = async () => {
    setLoading(true);
    const res = await apiService.simulate(formData);
    if (res.success && res.data) setResult(res.data);
    setLoading(false);
  };

  if (!options) return (
    <div className="flex h-screen items-center justify-center bg-[var(--bg)]">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-[var(--accent)] border-t-transparent rounded-full animate-spin"></div>
        <p className="text-[var(--text)] animate-pulse font-mono text-sm uppercase tracking-widest">Sincronizando Core...</p>
      </div>
    </div>
  );

  return (
    <div className="flex-1 px-6 py-10 max-w-[1126px] mx-auto animate-in fade-in slide-in-from-bottom-4 duration-1000">
      {/* Header Minimalista */}
      <header className="mb-12 text-left border-l-4 border-[var(--accent)] pl-6">
        <h1 className="text-5xl font-bold tracking-tighter m-0">Invest<span className="text-[var(--accent)]">Lab</span></h1>
        <p className="text-[var(--text)] mt-2 font-medium">Bridge Pattern Simulation Engine v1.0</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Panel de Control (4 columnas) */}
        <section className="lg:col-span-4 space-y-6">
          <div className="card p-6 backdrop-blur-md bg-opacity-50">
            <h2 className="text-sm font-bold uppercase tracking-widest text-[var(--accent)] mb-6">Configuración</h2>
            
            <div className="space-y-6">
              <div className="group">
                <label className="text-[11px] font-bold text-[var(--text)] uppercase mb-2 block group-focus-within:text-[var(--accent)] transition-colors">Estrategia</label>
                <select 
                  className="input-field w-full p-3 bg-[var(--code-bg)] outline-none focus:ring-1 focus:ring-[var(--accent)] transition-all cursor-pointer"
                  value={formData.strategy} 
                  onChange={e => setFormData({...formData, strategy: e.target.value})}
                >
                  {options.strategies.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                </select>
              </div>

              <div>
                <label className="text-[11px] font-bold text-[var(--text)] uppercase mb-2 block">Motor de Ejecución</label>
                <select 
                  className="input-field w-full p-3 bg-[var(--code-bg)] outline-none focus:ring-1 focus:ring-[var(--accent)] transition-all cursor-pointer"
                  value={formData.engine} 
                  onChange={e => setFormData({...formData, engine: e.target.value})}
                >
                  {options.engines.map(e => <option key={e.id} value={e.id}>{e.name}</option>)}
                </select>
              </div>

              <div>
                <label className="text-[11px] font-bold text-[var(--text)] uppercase mb-2 block">Capital (USD)</label>
                <input 
                  type="number" 
                  className="input-field w-full p-3 bg-[var(--code-bg)] outline-none focus:ring-1 focus:ring-[var(--accent)] transition-all font-mono"
                  value={formData.amount} 
                  onChange={e => setFormData({...formData, amount: Number(e.target.value)})} 
                />
              </div>

              <button 
                onClick={handleSimulate} 
                disabled={loading}
                className="btn-primary w-full py-4 rounded-none font-black uppercase tracking-tighter text-lg hover:tracking-widest transition-all duration-300 disabled:opacity-30"
              >
                {loading ? 'Procesando...' : 'Simular Inversión'}
              </button>
            </div>
          </div>
        </section>

        {/* Panel de Resultados (8 columnas) */}
        <section className="lg:col-span-8 space-y-6">
          {result ? (
            <div className="animate-in zoom-in-95 duration-500 space-y-6">
              {/* Key Metrics */}
              <div className="grid grid-cols-2 gap-4">
                <div className="card p-6 bg-gradient-to-br from-[var(--bg)] to-[var(--code-bg)]">
                  <p className="text-[10px] font-bold text-[var(--text)] uppercase mb-1">Balance Final</p>
                  <div className="text-3xl font-black text-[var(--text-h)] font-mono">
                    ${result.final_amount.toLocaleString(undefined, {minimumFractionDigits: 2})}
                  </div>
                </div>
                <div className="card p-6 border-t-2 border-t-[var(--accent)]">
                  <p className="text-[10px] font-bold text-[var(--text)] uppercase mb-1">Rendimiento</p>
                  <div className="text-3xl font-black text-[var(--accent)] font-mono">
                    +{result.profit_percentage}%
                  </div>
                </div>
              </div>

              {/* Gráfica */}
              <div className="card p-6 h-[400px] w-full">
                <h3 className="text-[11px] font-bold text-[var(--text)] uppercase mb-6 tracking-widest">Curva de Crecimiento Proyectada</h3>
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={result.history}>
                    <defs>
                      <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="var(--accent)" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="var(--accent)" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                    <XAxis dataKey="day" stroke="var(--text)" fontSize={10} tickLine={false} axisLine={false} />
                    <YAxis stroke="var(--text)" fontSize={10} tickLine={false} axisLine={false} tickFormatter={(val) => `$${val}`} />
                    <Tooltip 
                      contentStyle={{backgroundColor: 'var(--bg)', border: '1px solid var(--border)', borderRadius: '8px', fontSize: '12px'}}
                      itemStyle={{color: 'var(--accent)'}}
                    />
                    <Area type="monotone" dataKey="value" stroke="var(--accent)" strokeWidth={3} fillOpacity={1} fill="url(#colorValue)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          ) : (
            <div className="card h-full flex flex-col items-center justify-center p-20 border-dashed border-2 opacity-30 group hover:opacity-100 transition-opacity">
              <div className="text-4xl mb-4 group-hover:scale-125 transition-transform duration-500">📉</div>
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-center">Esperando parámetros para inicializar flujo de datos</p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};