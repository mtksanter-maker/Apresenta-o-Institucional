import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Trophy, Award, Heart, ShieldCheck, Medal, Presentation, Star, BookmarkCheck, Sparkles, X, Calendar } from "lucide-react";

interface Recognition {
  area: string;
  title: string;
  badge: string;
  desc: string;
  icon: React.ComponentType<{ className?: string }>;
  logoUrl?: string;
}

export default function AwardsSection() {
  const [selectedAward, setSelectedAward] = useState<Recognition | null>(null);

  const recognitions: Recognition[] = [
    {
      area: "Engenharia",
      title: "Prêmio Prevision",
      badge: "Dezembro / 2026",
      desc: "Conquistado em reconhecimento à excelência no planejamento de obras e à maturidade operacional na engenharia.",
      icon: Trophy,
      logoUrl: "https://i.imgur.com/MIAc3vs.png"
    },
    {
      area: "Engenharia / Qualidade",
      title: "Prêmio Inmeta de Excelência em Gestão",
      badge: "Janeiro / 2026",
      desc: "Prêmio de destaque que chancela a eficiência, qualidade e governança nos processos de gestão de construtoras.",
      icon: Sparkles,
      logoUrl: "https://i.imgur.com/oZZSnlC.png"
    },
    {
      area: "Institucional",
      title: "Selo Great Place To Work (GPTW)",
      badge: "Outubro / 2025",
      desc: "Importante certificação internacional que atesta a alta qualidade do clima organizacional e orgulho interno.",
      icon: Heart,
      logoUrl: "https://i.imgur.com/QDydlK2.png"
    },
    {
      area: "Financeiro",
      title: "Selo Ouro — Maturidade NPU",
      badge: "Dezembro / 2025",
      desc: "Nível máximo de certificação do Programa de Selos de Maturidade da NPU, comprovando alta eficiência financeira.",
      icon: Medal,
      logoUrl: "https://i.imgur.com/dLh1AKg.png"
    },

    {
      area: "Engenharia / Suprimentos",
      title: "Selo Prata — Maturidade NPU",
      badge: "Dezembro / 2025",
      desc: "Concedido pelo Programa de Selos de Maturidade, premiando a sintonia do setor de suprimentos e inteligência operacional.",
      icon: Award,
      logoUrl: "https://i.imgur.com/dLh1AKg.png"
    },
    {
      area: "Projetos",
      title: "Case de Sucesso Dalux",
      badge: "Destaque Nacional",
      desc: "Convite para apresentação do case de sucesso da Santer no primeiro evento oficial do Dalux no Brasil, consolidando nosso pioneirismo tecnológico.",
      icon: Presentation
    },
    {
      area: "Certificações",
      title: "ISO 9001",
      badge: "Padrão Internacional",
      desc: "Garantia internacional de padronização, auditoria rigorosa e constante otimização dos nossos processos.",
      icon: ShieldCheck,
      logoUrl: "https://i.imgur.com/mLozogp.png"
    },
    {
      area: "Certificações",
      title: "PBQPh",
      badge: "Excelência em Habitat",
      desc: "Certificação de conformidade ao Programa Brasileiro da Qualidade e Produtividade do Habitat.",
      icon: BookmarkCheck,
      logoUrl: "https://i.imgur.com/hAZJR9x.png"
    }
  ];

  return (
    <div className="h-full flex flex-col justify-center">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
        <div>
          <div className="inline-flex items-center gap-3 text-sm uppercase tracking-widest text-santer-muted mb-2">
            <span className="w-12 h-px bg-white/30" />
            Seção 08
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Orgulho de Fazer Parte</h2>
        </div>
        <div className="text-sm uppercase tracking-widest text-santer-muted">08 / 15</div>
      </div>

      <div className="mb-8">
        <p className="text-sm md:text-base text-white/70 max-w-4xl leading-relaxed">
          Nossas conquistas refletem o esforço diário das nossas equipes por evolução operacional, inovação e máxima qualidade de entrega. Clique em cada selo, prêmio ou certificação para obter mais detalhes.
        </p>
      </div>

      <motion.div 
        variants={{
          hidden: { opacity: 0 },
          show: { opacity: 1, transition: { staggerChildren: 0.05 } }
        }}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.1 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 overflow-y-auto no-scrollbar max-h-[55vh] pr-1 py-1"
      >
        {recognitions.map((item, index) => (
          <motion.div
            key={index}
            variants={{
              hidden: { opacity: 0, y: 12, scale: 0.98 },
              show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.35, ease: "easeOut" } }
            }}
            onClick={() => setSelectedAward(item)}
            className="bg-navy-900/40 border border-white/10 p-5 rounded-2xl hover:bg-navy-800/40 hover:border-soft-blue/30 cursor-pointer transition-all duration-300 flex flex-col justify-between h-36 group relative overflow-hidden"
          >
            {/* Subtle highlight sheen */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.01] to-white/[0.03] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

            <div className="flex items-start justify-between gap-4 z-10">
              {item.logoUrl ? (
                <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center p-1.5 group-hover:scale-105 transition-all duration-300 shrink-0 shadow-md overflow-hidden">
                  <img 
                    src={item.logoUrl} 
                    alt={item.title} 
                    className="w-full h-full object-contain"
                    referrerPolicy="no-referrer"
                  />
                </div>
              ) : (
                <div className="w-10 h-10 rounded-xl bg-soft-blue/10 border border-soft-blue/20 flex items-center justify-center text-soft-blue group-hover:bg-soft-blue/25 group-hover:scale-105 transition-all duration-300 shrink-0">
                  <item.icon className="w-5 h-5" />
                </div>
              )}
              <span className="text-[10px] text-white/50 uppercase tracking-widest font-semibold block bg-white/5 px-2.5 py-1 rounded-full border border-white/5 whitespace-nowrap">
                {item.area}
              </span>
            </div>

            <div className="z-10 mt-3">
              <h3 className="text-sm md:text-base font-bold text-white group-hover:text-soft-blue transition-colors duration-300 line-clamp-2 leading-snug">
                {item.title}
              </h3>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Details Modal overlay */}
      <AnimatePresence>
        {selectedAward && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedAward(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#0a0f1d]/85 backdrop-blur-md"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#111827] border border-white/10 p-6 md:p-8 rounded-3xl max-w-lg w-full shadow-2xl relative max-h-[90vh] overflow-y-auto no-scrollbar flex flex-col"
            >
              <button
                onClick={() => setSelectedAward(null)}
                className="absolute top-4 right-4 p-2 bg-white/5 hover:bg-white/10 rounded-full text-white/70 hover:text-white transition-colors z-10"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-4 mb-6">
                {selectedAward.logoUrl ? (
                  <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center p-2 shrink-0 shadow-lg overflow-hidden">
                    <img 
                      src={selectedAward.logoUrl} 
                      alt={selectedAward.title} 
                      className="w-full h-full object-contain"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                ) : (
                  <div className="w-14 h-14 rounded-2xl bg-soft-blue/10 border border-soft-blue/20 flex items-center justify-center text-soft-blue shrink-0">
                    <selectedAward.icon className="w-7 h-7" />
                  </div>
                )}
                <div>
                  <span className="text-[10px] md:text-xs text-soft-blue uppercase tracking-widest font-semibold block mb-0.5">
                    {selectedAward.area}
                  </span>
                  <h3 className="text-xl md:text-2xl font-bold text-white leading-tight">
                    {selectedAward.title}
                  </h3>
                </div>
              </div>

              <div className="border-t border-white/5 pt-5 mb-6">
                <p className="text-sm md:text-base text-white/80 leading-relaxed font-normal">
                  {selectedAward.desc}
                </p>
              </div>

              <div className="mt-auto pt-5 border-t border-white/5 flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-white/5 border border-white/5 flex items-center justify-center shrink-0">
                  <Calendar className="w-4 h-4 text-white/50" />
                </div>
                <div>
                  <span className="text-xs uppercase tracking-widest font-semibold text-white/40 block mb-0.5">Reconhecimento / Período</span>
                  <p className="text-sm font-semibold text-soft-blue">
                    {selectedAward.badge}
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
