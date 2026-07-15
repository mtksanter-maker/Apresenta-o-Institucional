import { motion } from "motion/react";

export default function AboutSection() {
  const getYearsOfHistory = () => {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    // July is month 6 (0-indexed: January = 0, July = 6)
    const anniversaryDate = new Date(currentYear, 6, 15);
    
    if (currentDate >= anniversaryDate) {
      return currentYear - 2008;
    } else {
      return currentYear - 2008 - 1;
    }
  };

  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.1 } }
  };
  
  const textItem = {
    hidden: { opacity: 0, x: -30, filter: "blur(8px)" },
    show: { opacity: 1, x: 0, filter: "blur(0px)", transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
  };

  const rightContainer = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.3 } }
  };

  const cardItem = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
  };

  const tagContainer = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.05, delayChildren: 0.6 } }
  };

  const tagItem = {
    hidden: { opacity: 0, scale: 0.8 },
    show: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: "easeOut" } }
  };

  return (
    <div className="h-full flex flex-col justify-center">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
        <div>
          <div className="inline-flex items-center gap-3 text-sm uppercase tracking-widest text-santer-muted mb-2">
            <span className="w-12 h-px bg-white/30" />
            Seção 02
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Quem somos</h2>
        </div>
        <div className="text-sm uppercase tracking-widest text-santer-muted">02 / 15</div>
      </div>

      <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-8">
        <motion.div 
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="glass-card p-8 rounded-3xl"
        >
          <motion.p variants={textItem} className="text-lg text-soft-blue leading-[1.75] mb-6">
            Somos uma incorporadora que atua no mercado imobiliário desde 2008, com sede em Guaramirim/SC. Ao longo dessa trajetória, já entregamos 3.211 unidades, consolidando nossa presença e compromisso com a realização dos sonhos de nossos clientes.
          </motion.p>
          <motion.p variants={textItem} className="text-lg text-soft-blue leading-[1.75]">
            Nossos empreendimentos são desenvolvidos sempre com foco nas pessoas, criando espaços inteligentes que unem conforto, funcionalidade e excelência em cada detalhe. Queremos que cada projeto seja motivo de orgulho para quem escolhe viver nele. Nosso diferencial está em um atendimento próximo e dedicado, aliado ao cumprimento de prazos e à busca constante por qualidade e modernização em nossas obras.
          </motion.p>
        </motion.div>

        <motion.div 
          variants={rightContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="flex flex-col gap-4"
        >
          <motion.div variants={cardItem} className="p-6 rounded-2xl bg-white/5 border border-white/10 relative overflow-hidden group">
            <div className="absolute inset-0 bg-white/5 -translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
            <strong className="block text-4xl lg:text-5xl font-bold tracking-tight mb-2 relative z-10">3.211</strong>
            <p className="text-soft-blue relative z-10">Unidades entregues em uma trajetória construída com consistência, proximidade e foco em qualidade.</p>
          </motion.div>
          <div className="grid grid-cols-2 gap-4">
            <motion.div variants={cardItem} className="p-6 rounded-2xl bg-white/5 border border-white/10 relative overflow-hidden group">
              <div className="absolute inset-0 bg-white/5 -translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
              <strong className="block text-3xl font-bold tracking-tight mb-2 relative z-10">{getYearsOfHistory()}+</strong>
              <p className="text-sm text-soft-blue relative z-10">Anos de história e evolução contínua no mercado imobiliário.</p>
            </motion.div>
            <motion.div variants={cardItem} className="p-6 rounded-2xl bg-white/5 border border-white/10 relative overflow-hidden group">
              <div className="absolute inset-0 bg-white/5 -translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
              <strong className="block text-3xl font-bold tracking-tight mb-2 relative z-10">SC</strong>
              <p className="text-sm text-soft-blue relative z-10">Sede em Guaramirim e forte atuação regional estratégica.</p>
            </motion.div>
          </div>
          <motion.div variants={cardItem} className="p-6 rounded-2xl bg-white/5 border border-white/10">
            <h3 className="text-lg font-medium mb-4">O que diferencia a marca</h3>
            <motion.div variants={tagContainer} className="flex flex-wrap gap-2">
              {['Atendimento próximo', 'Cumprimento de prazos', 'Qualidade', 'Modernização', 'Atenção aos detalhes'].map(tag => (
                <motion.span variants={tagItem} key={tag} className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-sm text-soft-blue">
                  {tag}
                </motion.span>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
