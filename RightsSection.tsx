import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Clock, Fingerprint, CalendarOff, Home, FileText, Scale, ChevronDown, ChevronUp } from "lucide-react";

export default function RightsSection() {
  const [showAbsences, setShowAbsences] = useState(false);

  const topics = [
    {
      icon: Clock,
      title: "Horário de Trabalho",
      content: (
        <>
          <p className="text-sm md:text-base text-white/80 leading-relaxed">
            A jornada de trabalho estabelecida pela empresa é conforme a jornada contratual, sendo essencial para o bom andamento das atividades, a harmonia entre as equipes e para a organização dos processos.
          </p>
        </>
      )
    },
    {
      icon: Fingerprint,
      title: "Registro do Ponto",
      content: (
        <>
          <p className="text-sm md:text-base text-white/80 leading-relaxed mb-4">
            O controle de jornada é realizado por leitor biométrico e o registro deve ser feito obrigatoriamente:
          </p>
          <ul className="space-y-2 mb-4">
            {['No início da jornada', 'Na saída para o almoço', 'No retorno do almoço', 'No encerramento do expediente'].map((item, idx) => (
              <li key={idx} className="flex items-center gap-2 text-sm text-white/90">
                <div className="w-1.5 h-1.5 rounded-full bg-soft-blue" />
                {item}
              </li>
            ))}
          </ul>
          <p className="text-sm text-soft-blue leading-relaxed">
            Esse processo garante conformidade com a legislação trabalhista e assegura o correto pagamento de salários, horas extras, banco de horas e demais direitos relacionados.
          </p>
        </>
      )
    },
    {
      icon: CalendarOff,
      title: "Ausências, Atrasos e Saídas",
      content: (
        <>
          <p className="text-sm md:text-base text-white/80 leading-relaxed mb-4">
            Faltas, atrasos e saídas antecipadas podem acontecer, mas precisam ser <strong>sempre comunicados e justificados</strong> diretamente ao líder imediato.
          </p>
          <p className="text-sm text-white/80 leading-relaxed mb-4">
            Essa comunicação deve ocorrer de preferência com antecedência, verbalmente ou por escrito.
          </p>
          <p className="text-sm text-soft-blue leading-relaxed">
            A ausência de comunicação pode gerar impactos operacionais e comprometer o fluxo de trabalho do setor.
          </p>
        </>
      )
    },
    {
      icon: Home,
      title: "Home Office e Banco de Horas",
      content: (
        <>
          <p className="text-sm md:text-base text-white/80 leading-relaxed mb-4">
            Quando houver necessidade de realização de atividades em home office, o colaborador deverá solicitar ao RH o documento formal de autorização e registro.
          </p>
          <p className="text-sm text-soft-blue leading-relaxed">
            Esse processo garante a formalização correta da atividade, além do controle adequado da jornada e do banco de horas.
          </p>
        </>
      )
    },
    {
      icon: FileText,
      title: "Convenção Coletiva de Trabalho (CCT)",
      className: "md:col-span-2",
      content: (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-2">
          {/* Col 1: O que é & Garantias */}
          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-bold text-white mb-1.5 uppercase tracking-wider">O que é a CCT?</h4>
              <p className="text-xs text-soft-blue leading-relaxed">
                A Convenção Coletiva de Trabalho é um acordo entre o sindicato da categoria e as empresas do setor. Ela define regras sobre salário, jornada, benefícios e condições de trabalho.
              </p>
            </div>
            <div>
              <h4 className="text-sm font-bold text-white mb-2 uppercase tracking-wider">O que ela garante?</h4>
              <ul className="space-y-1.5">
                {[
                  "Piso salarial da categoria",
                  "Reajustes salariais anuais",
                  "Regras de jornada e horas extras",
                  "Benefícios previstos, quando aplicável",
                  "Condições de trabalho e segurança",
                  "Outras regras específicas da função ou atividade"
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-xs text-white/90">
                    <div className="w-1 h-1 rounded-full bg-soft-blue shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Col 2: Na Prática & Contribuições */}
          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-bold text-white mb-2 uppercase tracking-wider">De forma prática:</h4>
              <ul className="space-y-1.5">
                {[
                  "A empresa segue as regras definidas na CCT vigente",
                  "Essas regras são atualizadas periodicamente, normalmente uma vez por ano",
                  "O RH pode te apoiar em dúvidas a qualquer momento"
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs text-white/90">
                    <div className="w-1 h-1 rounded-full bg-soft-blue shrink-0 mt-1.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <h4 className="text-xs font-bold text-white mb-1 uppercase tracking-wider">Contribuição Negocial / Assistencial</h4>
              <p className="text-[10px] text-white/50 mb-2 leading-relaxed">Prevista na CCT da categoria</p>
              <div className="flex items-baseline gap-1">
                <span className="font-mono text-2xl font-black text-soft-blue">1%</span>
                <span className="text-xs text-white/80">ao mês sobre o salário</span>
              </div>
              <p className="text-[10px] text-white/40 mt-2 leading-relaxed">Aplicável conforme regras da convenção vigente.</p>
            </div>
          </div>

          {/* Col 3: Oposição & Compromisso */}
          <div className="space-y-4 flex flex-col justify-between">
            <div>
              <h4 className="text-sm font-bold text-white mb-1.5 uppercase tracking-wider">Direito de Oposição</h4>
              <p className="text-xs text-white/80 leading-relaxed mb-2">
                O colaborador pode optar por não contribuir. Para isso:
              </p>
              <ul className="space-y-1.5 mb-3">
                {[
                  "A solicitação deve ser feita diretamente ao sindicato",
                  "Deve respeitar o prazo definido na CCT",
                  "Normalmente é feita de forma presencial, conforme orientação do sindicato"
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs text-white/90">
                    <div className="w-1 h-1 rounded-full bg-red-400 shrink-0 mt-1.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="text-[11px] text-soft-blue leading-relaxed">
                Caso o colaborador tenha interesse em exercer esse direito, deve procurar o RH para receber as orientações atualizadas de prazo, local e procedimento.
              </p>
            </div>
            
            <div className="pt-4 border-t border-white/10">
              <p className="text-xs italic text-soft-blue/90 leading-relaxed">
                "Nosso compromisso é garantir transparência, cumprimento das normas e apoio para que você entenda seus direitos e deveres desde o início."
              </p>
            </div>
          </div>
        </div>
      )
    },
    {
      icon: Scale,
      title: "Ausências Legais",
      className: "md:col-span-2",
      content: (
        <div className="mt-2 space-y-4">
          <p className="text-sm md:text-base text-white/80 leading-relaxed max-w-4xl">
            A legislação trabalhista assegura ao colaborador algumas ausências abonadas, ou seja, períodos em que não há prejuízo salarial, desde que devidamente comprovados.
          </p>

          <button
            onClick={() => setShowAbsences(!showAbsences)}
            className="inline-flex items-center gap-2.5 px-5 py-2.5 bg-white/5 hover:bg-white/10 active:bg-white/15 border border-white/10 hover:border-white/20 transition-all duration-300 rounded-xl text-xs uppercase tracking-wider font-semibold text-white/95 hover:text-white cursor-pointer select-none"
          >
            {showAbsences ? "Recolher ausências" : "Visualizar ausências permitidas"}
            {showAbsences ? (
              <ChevronUp className="w-4 h-4 text-soft-blue" />
            ) : (
              <ChevronDown className="w-4 h-4 text-soft-blue" />
            )}
          </button>

          <AnimatePresence initial={false}>
            {showAbsences && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 pt-4">
                  {/* 1. Casamento Civil */}
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-4 md:p-5 transition-all duration-300 hover:bg-white/10 hover:border-white/10 flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] md:text-xs text-soft-blue uppercase tracking-widest font-semibold block mb-1">01 / Casamento Civil</span>
                      <h4 className="text-sm md:text-base font-bold text-white mb-1 leading-tight">Casamento Civil</h4>
                      <p className="text-xs md:text-sm text-white/70 leading-relaxed font-normal">
                        Até 3 dias úteis consecutivos, contados a partir da certidão de casamento.
                      </p>
                    </div>
                  </div>

                  {/* 2. Licença Maternidade */}
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-4 md:p-5 transition-all duration-300 hover:bg-white/10 hover:border-white/10 flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] md:text-xs text-soft-blue uppercase tracking-widest font-semibold block mb-1">02 / Maternidade</span>
                      <h4 className="text-sm md:text-base font-bold text-white mb-1 leading-tight">Licença Maternidade</h4>
                      <p className="text-xs md:text-sm text-white/70 leading-relaxed font-normal">
                        Até 120 dias, a partir da saída do trabalho.
                      </p>
                    </div>
                  </div>

                  {/* 3. Licença Paternidade */}
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-4 md:p-5 transition-all duration-300 hover:bg-white/10 hover:border-white/10 flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] md:text-xs text-soft-blue uppercase tracking-widest font-semibold block mb-1">03 / Paternidade</span>
                      <h4 className="text-sm md:text-base font-bold text-white mb-1 leading-tight">Licença Paternidade</h4>
                      <p className="text-xs md:text-sm text-white/70 leading-relaxed font-normal mb-3">
                        Atualmente de 5 dias, com ampliação legal prevista para os próximos anos, conforme legislação vigente:
                      </p>
                      <div className="space-y-1 bg-white/5 rounded-xl p-2.5 border border-white/5">
                        <div className="flex justify-between text-[11px] font-mono">
                          <span className="text-white/60">A partir de 01/01/2027:</span>
                          <span className="text-soft-blue font-bold">10 dias</span>
                        </div>
                        <div className="flex justify-between text-[11px] font-mono">
                          <span className="text-white/60">Em 2028:</span>
                          <span className="text-soft-blue font-bold">15 dias</span>
                        </div>
                        <div className="flex justify-between text-[11px] font-mono">
                          <span className="text-white/60">Em 2029:</span>
                          <span className="text-soft-blue font-bold">20 dias</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 4. Falecimento */}
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-4 md:p-5 transition-all duration-300 hover:bg-white/10 hover:border-white/10 flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] md:text-xs text-soft-blue uppercase tracking-widest font-semibold block mb-1">04 / Falecimento</span>
                      <h4 className="text-sm md:text-base font-bold text-white mb-1 leading-tight">Falecimento</h4>
                      <p className="text-xs md:text-sm text-white/70 leading-relaxed font-normal mb-2">
                        Até 2 dias consecutivos, em caso de falecimento de:
                      </p>
                      <ul className="space-y-1 bg-white/5 rounded-xl p-2.5 border border-white/5">
                        {['Cônjuge', 'Ascendentes, como pais e avós', 'Descendentes, como filhos', 'Irmãos', 'Pessoa que viva sob dependência econômica declarada'].map((item, idx) => (
                          <li key={idx} className="flex items-start gap-1.5 text-[11px] text-white/80">
                            <div className="w-1 h-1 rounded-full bg-soft-blue mt-1.5 shrink-0" />
                            <span className="leading-tight">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* 5. Alistamento Militar */}
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-4 md:p-5 transition-all duration-300 hover:bg-white/10 hover:border-white/10 flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] md:text-xs text-soft-blue uppercase tracking-widest font-semibold block mb-1">05 / Serviço Militar</span>
                      <h4 className="text-sm md:text-base font-bold text-white mb-1 leading-tight">Alistamento Militar Obrigatório</h4>
                      <p className="text-xs md:text-sm text-white/70 leading-relaxed font-normal">
                        Até 2 dias consecutivos.
                      </p>
                    </div>
                  </div>

                  {/* 6. Vestibular */}
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-4 md:p-5 transition-all duration-300 hover:bg-white/10 hover:border-white/10 flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] md:text-xs text-soft-blue uppercase tracking-widest font-semibold block mb-1">06 / Educação</span>
                      <h4 className="text-sm md:text-base font-bold text-white mb-1 leading-tight">Vestibular</h4>
                      <p className="text-xs md:text-sm text-white/70 leading-relaxed font-normal">
                        Ausência permitida nas datas das provas.
                      </p>
                    </div>
                  </div>

                  {/* 7. Atestado Médico */}
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-4 md:p-5 transition-all duration-300 hover:bg-white/10 hover:border-white/10 flex flex-col justify-between lg:col-span-2">
                    <div>
                      <span className="text-[10px] md:text-xs text-soft-blue uppercase tracking-widest font-semibold block mb-1">07 / Saúde</span>
                      <h4 className="text-sm md:text-base font-bold text-white mb-1 leading-tight">Atestado Médico ou Odontológico</h4>
                      <p className="text-xs md:text-sm text-white/70 leading-relaxed font-normal mb-3">
                        A ausência será abonada pelo período indicado no documento emitido por médico ou dentista, contendo obrigatoriamente:
                      </p>
                      <div className="grid grid-cols-2 gap-2 mb-3 bg-white/5 rounded-xl p-2.5 border border-white/5">
                        {['Carimbo', 'Assinatura', 'CRM ou CRO', 'Especialidade do profissional'].map((item, idx) => (
                          <div key={idx} className="flex items-center gap-1.5 text-xs text-white/90">
                            <div className="w-1 h-1 bg-soft-blue rounded-full shrink-0" />
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                      <p className="text-xs md:text-sm text-soft-blue leading-relaxed font-normal">
                        O atestado deverá ser entregue ao responsável do setor <strong>em até 24 horas após sua emissão</strong>, pelo colaborador ou por pessoa autorizada. Após esse prazo, o documento poderá perder sua validade.
                      </p>
                    </div>
                  </div>

                  {/* 8. Doação de Sangue */}
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-4 md:p-5 transition-all duration-300 hover:bg-white/10 hover:border-white/10 flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] md:text-xs text-soft-blue uppercase tracking-widest font-semibold block mb-1">08 / Cidadania</span>
                      <h4 className="text-sm md:text-base font-bold text-white mb-1 leading-tight">Doação de Sangue</h4>
                      <p className="text-xs md:text-sm text-white/70 leading-relaxed font-normal">
                        Ausência abonada durante todo o dia, mediante apresentação da declaração da unidade do HEMOSC.
                      </p>
                    </div>
                  </div>

                  {/* 9. Mesário Eleitoral */}
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-4 md:p-5 transition-all duration-300 hover:bg-white/10 hover:border-white/10 flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] md:text-xs text-soft-blue uppercase tracking-widest font-semibold block mb-1">09 / Cidadania</span>
                      <h4 className="text-sm md:text-base font-bold text-white mb-1 leading-tight">Mesário Eleitoral</h4>
                      <p className="text-xs md:text-sm text-white/70 leading-relaxed font-normal">
                        Direito a até 2 dias de folga, previamente acordados entre empresa e colaborador.
                      </p>
                    </div>
                  </div>

                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )
    }
  ];

  return (
    <div className="h-auto flex flex-col pt-8 pb-8 md:py-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 shrink-0">
        <div>
          <div className="inline-flex items-center gap-3 text-sm uppercase tracking-widest text-santer-muted mb-2">
            <span className="w-12 h-px bg-white/30" />
            Seção 13
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Direitos e Deveres</h2>
        </div>
        <div className="text-sm uppercase tracking-widest text-santer-muted">13 / 15</div>
      </div>

      <div className="max-w-4xl shrink-0 mb-10">
        <p className="text-sm md:text-base lg:text-lg text-white/90 leading-[1.75] mb-4">
          Na Santer, acreditamos que um ambiente de trabalho saudável se constrói com clareza, respeito e responsabilidade compartilhada. Cada colaborador é parte essencial dessa jornada, e compreender seus direitos e deveres fortalece não apenas a rotina operacional, mas também a cultura que sustenta nossos resultados.
        </p>
        <p className="text-sm md:text-base lg:text-lg text-soft-blue leading-[1.75]">
          Pontualidade, organização, comunicação transparente e postura profissional são pilares fundamentais para mantermos a excelência em nossas entregas.
        </p>
      </div>

      <motion.div 
        variants={{
          hidden: { opacity: 0 },
          show: { opacity: 1, transition: { staggerChildren: 0.1 } }
        }}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 pb-20"
      >
        {topics.map((topic, i) => (
          <motion.article 
            variants={{
              hidden: { opacity: 0, scale: 0.95, y: 20 },
              show: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.5 } }
            }}
            key={i}
            className={`glass-card p-6 md:p-8 rounded-3xl flex flex-col transition-all duration-300 hover:bg-white/10 border border-white/10 group h-full ${topic.className || ''}`}
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white shrink-0 group-hover:bg-white/10 transition-colors">
                <topic.icon className="w-6 h-6 md:w-7 md:h-7" />
              </div>
              <h3 className="text-lg md:text-xl font-bold leading-tight text-white">{topic.title}</h3>
            </div>
            
            <div className="flex-1 flex flex-col">
              {topic.content}
            </div>
          </motion.article>
        ))}
      </motion.div>
    </div>
  );
}
