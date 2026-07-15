import React, { useState } from 'react';
import { Utensils, Stethoscope, Smile, Pill, GraduationCap, Dumbbell, Clock, ChevronRight, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function BenefitsSection() {
  const benefits = [
    { 
      icon: Stethoscope, 
      title: 'Plano de Saúde', 
      subtitle: 'LEVMED',
      details: [
        'A empresa custeia 100% da mensalidade do plano para o colaborador. O colaborador participa apenas com coparticipação em consultas, exames e procedimentos realizados.',
        'Após a inclusão pelo RH, o colaborador recebe acesso à carteirinha digital. O agendamento pode ser realizado pela rede credenciada ou aplicativo LEVMED.',
        'No app, o colaborador pode acessar carteirinha virtual, guia médico, agendamentos e resultados de exames.'
      ],
      deadline: 'Até 30 dias após admissão.'
    },
    { 
      icon: Smile, 
      title: 'Plano Odontológico', 
      subtitle: 'ODONTO JARAGUÁ',
      details: [
        'Benefício com desconto mensal de R$ 34,00 em folha.',
        'Após inclusão realizada pelo RH, o colaborador pode acessar a rede credenciada pelo aplicativo ou portal do beneficiário, apresentando a carteirinha digital no atendimento.'
      ],
      deadline: 'Até 30 dias após admissão.'
    },
    { 
      icon: Utensils, 
      title: 'Cartão iFood Benefícios', 
      subtitle: '',
      details: [
        'Valor mensal de R$ 30,00 por dia útil, em média R$ 700,00 mensais, sem desconto em folha.',
        'O cartão é liberado após admissão e ativação. O saldo pode ser utilizado diretamente no aplicativo iFood, conforme categoria liberada pela empresa.'
      ],
      deadline: 'Disponível após ativação e fechamento da folha.'
    },
    { 
      icon: Pill, 
      title: 'Convênio Farmácia', 
      subtitle: 'FARMÁCIA SÃO JOÃO',
      details: [
        'Compras realizadas diretamente na farmácia, com desconto em folha.',
        'Para utilizar, o colaborador deve informar o CPF no caixa da farmácia conveniada. O valor utilizado será descontado posteriormente na folha de pagamento.'
      ],
      deadline: 'Liberação após cadastro realizado pelo RH.'
    },
    { 
      icon: Dumbbell, 
      title: 'Convênio Academia', 
      subtitle: '',
      details: [
        'Benefício concedido conforme critérios de assiduidade.',
        'Academias parceiras: You Gym — Guaramirim/SC, Pro Shape — Barra Velha/SC e Ultra Academia — Guaramirim/SC.',
        'Para utilizar, o colaborador deve solicitar o termo de elegibilidade com o RH. Após aprovação, recebe as orientações de acesso e utilização da academia parceira.'
      ],
      deadline: 'Disponível após ativação e fechamento da folha.'
    },
    { 
      icon: GraduationCap, 
      title: 'Auxílio Educação', 
      subtitle: '',
      details: [
        'Subsídio de até 50% da mensalidade, mediante aprovação interna.',
        'O colaborador deve apresentar a ementa do curso para validação da diretoria, formalizar a solicitação via e-mail com evidência da aprovação da Josi, realizar o pagamento da mensalidade e, após apresentar boleto e comprovante de pagamento, o RH organiza o reembolso de até 50%, conforme aprovação.',
        'O benefício pode variar conforme aderência do curso ao desenvolvimento profissional.'
      ],
      deadline: 'Disponível após 90 dias de experiência, mediante solicitação, análise e aprovação da diretoria.'
    }
  ];

  const [selectedBenefit, setSelectedBenefit] = useState<typeof benefits[0] | null>(null);

  // Close modal when pressing Escape
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") setSelectedBenefit(null);
  };

  return (
    <>
      <div className="h-auto flex flex-col pt-8 pb-8 md:py-12 outline-none" tabIndex={0} onKeyDown={handleKeyDown}>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 shrink-0">
          <div>
            <div className="inline-flex items-center gap-3 text-sm uppercase tracking-widest text-santer-muted mb-2">
              <span className="w-12 h-px bg-white/30" />
              Seção 12
            </div>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Benefícios</h2>
          </div>
          <div className="text-sm uppercase tracking-widest text-santer-muted">12 / 15</div>
        </div>

        <p className="max-w-3xl text-sm md:text-base lg:text-lg text-soft-blue leading-[1.75] mb-8 shrink-0">
          A experiência Santer também é construída de dentro para fora. A estrutura de benefícios reforça um posicionamento claro de cuidado com o bem-estar, a saúde e o desenvolvimento das pessoas.
        </p>

        <motion.div 
          variants={{
            hidden: { opacity: 0 },
            show: { opacity: 1, transition: { staggerChildren: 0.1 } }
          }}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 pb-20"
        >
          {benefits.map((benefit, i) => {
            const Icon = benefit.icon;

            return (
              <motion.article 
                variants={{
                  hidden: { opacity: 0, scale: 0.95, y: 20 },
                  show: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.5 } }
                }}
                key={i}
                onClick={() => setSelectedBenefit(benefit)}
                className="glass-card p-6 md:p-8 rounded-3xl flex flex-col justify-between items-start transition-all duration-300 hover:bg-white/10 hover:-translate-y-1 hover:shadow-lg hover:shadow-white/5 border border-white/10 group cursor-pointer w-full"
              >
                <div className="flex flex-col gap-4">
                  <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white shrink-0 group-hover:bg-white/10 transition-colors">
                    <Icon className="w-6 h-6 md:w-7 md:h-7" />
                  </div>
                  <div>
                    <h3 className="text-lg md:text-xl font-bold leading-tight">{benefit.title}</h3>
                    {benefit.subtitle && <p className="text-[10px] md:text-xs text-soft-blue uppercase tracking-widest mt-1.5 font-semibold">{benefit.subtitle}</p>}
                  </div>
                </div>
                
                <div className="mt-8 flex items-center text-[10px] md:text-xs text-white/50 uppercase tracking-widest font-semibold group-hover:text-white transition-colors">
                  Ver detalhes <ChevronRight className="w-3 h-3 md:w-4 md:h-4 ml-1" />
                </div>
              </motion.article>
            );
          })}
        </motion.div>
      </div>

      <AnimatePresence>
        {selectedBenefit && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedBenefit(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#0a0f1d]/80 backdrop-blur-md"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#111827] border border-white/10 p-6 md:p-8 md:pt-10 rounded-3xl max-w-lg w-full shadow-2xl relative max-h-[90vh] overflow-y-auto no-scrollbar flex flex-col"
            >
              <button
                onClick={() => setSelectedBenefit(null)}
                className="absolute top-4 right-4 p-2 bg-white/5 hover:bg-white/10 rounded-full text-white/70 hover:text-white transition-colors z-10"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-4 mb-8 pr-8">
                <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white shrink-0">
                  <selectedBenefit.icon className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white leading-tight">{selectedBenefit.title}</h3>
                  {selectedBenefit.subtitle && (
                    <p className="text-[10px] md:text-xs text-soft-blue uppercase tracking-widest mt-1.5 font-semibold">
                      {selectedBenefit.subtitle}
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-4 mb-8">
                {selectedBenefit.details.map((detail, idx) => (
                  <p key={idx} className="text-sm md:text-base text-white/80 leading-relaxed">
                    {detail}
                  </p>
                ))}
              </div>

              <div className="mt-auto pt-5 border-t border-white/10 flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center shrink-0">
                  <Clock className="w-4 h-4 text-white/50" />
                </div>
                <div>
                  <span className="text-xs uppercase tracking-widest font-semibold text-white/40 block mb-1">Prazo estimado</span>
                  <p className="text-sm font-medium text-white/90">
                    {selectedBenefit.deadline}
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
