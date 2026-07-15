import { ResponsiveContainer, BarChart, Bar, Cell, Tooltip, XAxis, YAxis, CartesianGrid } from "recharts";
import { salesData } from "../../data/content";
import { motion } from "motion/react";

export default function CommercialSection() {
  const maxSales = Math.max(...salesData.map(d => d.sales));

  const listContainer = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.1 } }
  };
  
  const textItem = {
    hidden: { opacity: 0, y: 20, filter: "blur(5px)" },
    show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.6, ease: "easeOut" } }
  };

  const statItem = {
    hidden: { opacity: 0, scale: 0.9, y: 15 },
    show: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.5, ease: "backOut" } }
  };

  const chartContainer = {
    hidden: { opacity: 0, filter: "blur(10px)", scale: 0.95 },
    show: { opacity: 1, filter: "blur(0px)", scale: 1, transition: { duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <div className="h-full flex flex-col justify-center">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
        <div>
          <div className="inline-flex items-center gap-3 text-sm uppercase tracking-widest text-santer-muted mb-2">
            <span className="w-12 h-px bg-white/30" />
            Seção 05
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Estratégia comercial</h2>
        </div>
        <div className="text-sm uppercase tracking-widest text-santer-muted">05 / 15</div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[0.85fr_1.15fr] gap-8 h-auto lg:h-[500px]">
        <motion.div 
          variants={listContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="glass-card p-8 rounded-3xl flex flex-col overflow-y-auto no-scrollbar"
        >
          <motion.h3 variants={textItem} className="text-2xl font-bold tracking-tight mb-4">Evolução que comprova amadurecimento</motion.h3>
          <motion.p variants={textItem} className="text-[1.05rem] text-soft-blue leading-[1.75] mb-8">
            Os resultados comerciais mostram não apenas aumento de volume, mas também reposicionamento de mercado, maior percepção de valor do portfólio e avanço consistente da força comercial da marca.
          </motion.p>
          
          <div className="grid grid-cols-2 gap-4 mt-auto">
            <motion.div variants={statItem} className="p-4 rounded-2xl bg-white/5 border border-white/10 group hover:border-white/20 transition-colors">
              <strong className="block text-3xl font-bold tracking-tight mb-1 cursor-default" title="Volume comercial alcançado em 2024">R$ 457 mi</strong>
              <span className="text-xs text-santer-muted">Vendas em 2024</span>
            </motion.div>
            <motion.div variants={statItem} className="p-4 rounded-2xl bg-white/5 border border-white/10 group hover:border-white/20 transition-colors">
              <strong className="block text-3xl font-bold tracking-tight mb-1 cursor-default" title="Número de unidades vendidas em 2024">634</strong>
              <span className="text-xs text-santer-muted">Unidades vendidas (2024)</span>
            </motion.div>
            <motion.div variants={statItem} className="p-4 rounded-2xl bg-white/5 border border-white/10 group hover:border-white/20 transition-colors">
              <strong className="block text-3xl font-bold tracking-tight mb-1 cursor-default" title="Valor médio por unidade em 2024">R$ 720 mil</strong>
              <span className="text-xs text-santer-muted">Ticket médio (2024)</span>
            </motion.div>
            <motion.div variants={statItem} className="p-4 rounded-2xl bg-white/5 border border-white/10 group hover:border-white/20 transition-colors">
              <strong className="block text-3xl font-bold tracking-tight mb-1 text-green-400">+893%</strong>
              <span className="text-xs text-santer-muted">Crescimento 2018 &rarr; 2024</span>
            </motion.div>
          </div>
        </motion.div>

        <motion.div 
          variants={chartContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="glass-card p-8 rounded-3xl flex flex-col items-stretch pt-6 pb-2"
        >
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8 shrink-0">
            <div>
              <h3 className="text-xl font-bold">Volume de vendas</h3>
              <div className="text-xs uppercase tracking-widest text-santer-muted mt-1">Milhões de reais</div>
            </div>
            <div className="text-xs uppercase tracking-widest text-santer-muted">2018 - 2025</div>
          </div>

          <div className="flex-1 min-h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={salesData} margin={{ top: 20, right: 0, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.1)" />
                <XAxis 
                  dataKey="year" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 13 }} 
                  dy={16}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 13 }} 
                  tickFormatter={value => `${value}`}
                />
                <Tooltip 
                  cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload;
                      return (
                        <div className="p-4 rounded-xl bg-navy-900 border border-white/10 shadow-xl backdrop-blur-xl">
                          <p className="font-bold text-lg mb-1">{data.year}</p>
                          <p className="text-sm text-soft-blue">Vendas: <strong className="text-white">R$ {data.sales} mi</strong></p>
                          <p className="text-sm text-soft-blue">Unidades: <strong className="text-white">{data.units}</strong></p>
                          <p className="text-sm text-soft-blue">Ticket: <strong className="text-white">{data.ticket}</strong></p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Bar 
                  dataKey="sales" 
                  radius={[6, 6, 0, 0]} 
                  animationDuration={1500}
                >
                  {salesData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={entry.sales === maxSales ? '#ffffff' : 'url(#colorSales)'} 
                    />
                  ))}
                </Bar>
                
                <defs>
                  <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="rgba(255,255,255,0.8)" />
                    <stop offset="100%" stopColor="rgba(53,88,125,0.8)" />
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
