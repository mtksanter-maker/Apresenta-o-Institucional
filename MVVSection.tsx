import { motion } from "motion/react";

export default function MVVSection() {
  return (
    <div className="h-full flex flex-col justify-center">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
        <div>
          <div className="inline-flex items-center gap-3 text-sm uppercase tracking-widest text-santer-muted mb-2">
            <span className="w-12 h-px bg-white/30" />
            Seção 06
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Missão, visão e valores</h2>
        </div>
        <div className="text-sm uppercase tracking-widest text-santer-muted">06 / 15</div>
      </div>

      <motion.div 
        variants={{
          hidden: { opacity: 0 },
          show: { opacity: 1, transition: { staggerChildren: 0.15 } }
        }}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.3 }}
        className="grid md:grid-cols-3 gap-6"
      >
        <motion.article 
          variants={{
            hidden: { opacity: 0, y: 30 },
            show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } }
          }}
          className="glass-card p-8 rounded-3xl relative overflow-hidden group transition-all duration-500 hover:scale-[1.03] hover:!bg-white hover:-translate-y-2 hover:shadow-[0_0_40px_rgba(255,255,255,0.4)]"
        >
          <div className="absolute top-6 right-6 text-xs uppercase tracking-widest text-white/20 group-hover:text-navy-950/30 transition-colors duration-500">Missão</div>
          <h3 className="text-2xl font-bold tracking-tight mb-4 mt-8 group-hover:text-navy-950 transition-colors duration-500">Idealizar e construir imóveis que despertem orgulho</h3>
          <p className="text-soft-blue leading-[1.7] group-hover:text-navy-800 transition-colors duration-500">A missão da Santer é idealizar e construir imóveis que despertem orgulho em quem mora, promovendo também a satisfação dos colaboradores e a sustentabilidade da empresa.</p>
        </motion.article>

        <motion.article 
          variants={{
            hidden: { opacity: 0, y: 30 },
            show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } }
          }}
          className="glass-card p-8 rounded-3xl relative overflow-hidden group transition-all duration-500 hover:scale-[1.03] hover:!bg-white hover:-translate-y-2 hover:shadow-[0_0_40px_rgba(255,255,255,0.4)]"
        >
          <div className="absolute top-6 right-6 text-xs uppercase tracking-widest text-white/20 group-hover:text-navy-950/30 transition-colors duration-500">Visão</div>
          <h3 className="text-2xl font-bold tracking-tight mb-4 mt-8 group-hover:text-navy-950 transition-colors duration-500">Ser a primeira opção em qualidade de vida</h3>
          <p className="text-soft-blue leading-[1.7] group-hover:text-navy-800 transition-colors duration-500">A visão da empresa aponta para ser a primeira opção em empreendimentos que proporcionam qualidade de vida nas regiões onde atua.</p>
        </motion.article>

        <motion.article 
          variants={{
            hidden: { opacity: 0, y: 30 },
            show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } }
          }}
          className="glass-card p-8 rounded-3xl relative overflow-hidden group transition-all duration-500 hover:scale-[1.03] hover:!bg-white hover:-translate-y-2 hover:shadow-[0_0_40px_rgba(255,255,255,0.4)]"
        >
          <div className="absolute top-6 right-6 text-xs uppercase tracking-widest text-white/20 group-hover:text-navy-950/30 transition-colors duration-500">Valores</div>
          <h3 className="text-2xl font-bold tracking-tight mb-4 mt-8 group-hover:text-navy-950 transition-colors duration-500">Uma forma responsável, humana e consistente de crescer</h3>
          <p className="text-soft-blue leading-[1.7] mb-6 group-hover:text-navy-800 transition-colors duration-500">Ética, comprometimento, transparência, agilidade, valorização, respeito ao meio ambiente e às pessoas mostram que o crescimento tem responsabilidade.</p>
        </motion.article>
      </motion.div>
    </div>
  );
}
