import { motion } from "motion/react";

export default function HQSection() {
  const sectors = ['Administração', 'Engenharia', 'Projetos', 'RH', 'Financeiro', 'Marketing', 'Compras', 'Financiamentos', 'Legalização', 'Contratos'];

  return (
    <div className="h-full flex flex-col justify-center">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
        <div>
          <div className="inline-flex items-center gap-3 text-sm uppercase tracking-widest text-santer-muted mb-2">
            <span className="w-12 h-px bg-white/30" />
            Seção 11
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Sede Guaramirim</h2>
        </div>
        <div className="text-sm uppercase tracking-widest text-santer-muted">11 / 15</div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-auto lg:h-full lg:min-h-[500px]">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: false, amount: 0.3 }}
          className="relative rounded-[2rem] bg-gradient-to-br from-navy-800/80 to-navy-950/80 border border-white/10 shadow-2xl overflow-hidden min-h-[300px] sm:min-h-[400px] group"
        >
          {/* Sede Guaramirim Image */}
          <div className="absolute inset-0 bg-[url('https://i.imgur.com/FvEyeYT.jpeg')] bg-cover bg-center opacity-60 group-hover:opacity-85 transition-opacity duration-500" />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/40 to-transparent" />
          
          <div className="absolute top-6 left-6 inline-flex px-4 py-2 rounded-full bg-navy-950/80 border border-white/10 text-xs tracking-[0.14em] uppercase text-soft-blue backdrop-blur-md">
            Guaramirim, SC
          </div>

          <div className="absolute right-6 bottom-6 p-6 rounded-3xl bg-navy-950/80 border border-white/10 backdrop-blur-xl min-w-[200px]">
            <strong className="block text-4xl tracking-tight font-bold mb-2">800 m²</strong>
            <span className="text-sm text-santer-muted leading-relaxed block max-w-[28ch]">
              Estrutura inaugurada em 2018 e ampliada em 2025 para sustentar o crescimento da operação.
            </span>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          viewport={{ once: false, amount: 0.3 }}
          className="glass-card p-8 rounded-3xl flex flex-col justify-center"
        >
          <p className="text-lg text-soft-blue leading-[1.75] mb-6">
            A sede da Santer em Guaramirim representa a estrutura que sustenta o crescimento da empresa. O espaço reúne equipes multifuncionais, integrando os principais pilares do negócio.
          </p>
          <p className="text-lg text-soft-blue leading-[1.75] mb-8">
            Mais do que uma sede corporativa, esse ambiente simboliza organização, integração e capacidade de gestão, refletindo a força de uma operação ampla.
          </p>
          
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="p-5 rounded-2xl bg-white/5 border border-white/10">
              <strong className="block text-3xl font-bold tracking-tight mb-2">1.100+</strong>
              <p className="text-sm text-soft-blue">Colaboradores movimentados direta e indiretamente.</p>
            </div>
            <div className="p-5 rounded-2xl bg-white/5 border border-white/10">
              <strong className="block text-3xl font-bold tracking-tight mb-2">10</strong>
              <p className="text-sm text-soft-blue">Áreas integradas para dar fluidez à operação.</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {sectors.map(sector => (
              <span key={sector} className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-sm text-soft-blue">
                {sector}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
