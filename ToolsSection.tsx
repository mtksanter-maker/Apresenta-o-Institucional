import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  TrendingUp, 
  Megaphone, 
  HardHat, 
  CreditCard, 
  Users, 
  FileText, 
  ShoppingCart, 
  Compass, 
  Terminal, 
  Layers,
  ChevronRight
} from "lucide-react";

interface System {
  name: string;
  desc: string;
}

interface Category {
  id: string;
  name: string;
  icon: React.ComponentType<any>;
  systems: System[];
}

const categories: Category[] = [
  {
    id: "comercial",
    name: "Comercial",
    icon: TrendingUp,
    systems: [
      { name: "CV CRM", desc: "Gestão de leads, funil de vendas, relacionamento com clientes e acompanhamento de negociações comerciais." },
      { name: "RD Station Conversas", desc: "Atendimento ao cliente e acompanhamento das interações comerciais e suporte." },
      { name: "Z2A", desc: "Ferramenta de inteligência artificial e apoio à gestão comercial e análises estratégicas." },
      { name: "Power BI", desc: "Dashboard e análise de indicadores comerciais, performance de vendas e acompanhamento de resultados." }
    ]
  },
  {
    id: "marketing",
    name: "Marketing",
    icon: Megaphone,
    systems: [
      { name: "RD Station Marketing", desc: "Automação de marketing, campanhas digitais, nutrição de leads e estratégias de relacionamento." },
      { name: "Canva", desc: "Criação de materiais gráficos, apresentações e comunicação visual interna e externa." },
      { name: "CapCut", desc: "Edição de vídeos para campanhas, redes sociais e comunicação institucional." },
      { name: "Adobe", desc: "Ferramentas de design, edição e produção criativa de materiais institucionais." },
      { name: "Bitly", desc: "Gestão e encurtamento de links para campanhas e ações digitais." },
      { name: "Banlek", desc: "Apoio à gestão de processos digitais e atividades da área de marketing." },
      { name: "Mlabs", desc: "Planejamento, agendamento e acompanhamento de redes sociais." },
      { name: "BotConversa", desc: "Automação de comunicação e relacionamento com clientes em canais digitais." },
      { name: "ChatGPT Pro", desc: "Apoio na criação de conteúdos, produtividade e otimização de processos internos." }
    ]
  },
  {
    id: "engenharia",
    name: "Engenharia / Obras",
    icon: HardHat,
    systems: [
      { name: "Inmeta", desc: "Gestão de obras e assistência técnica com foco em acompanhamento operacional." },
      { name: "Prevision", desc: "Planejamento e controle de cronogramas, produtividade e gestão da engenharia." },
      { name: "Dalux", desc: "Gestão de projetos, documentação técnica e acompanhamento de obras." },
      { name: "Revit", desc: "Modelagem técnica e desenvolvimento de projetos de engenharia e arquitetura." },
      { name: "GestarCad", desc: "Gestão de documentação técnica e processos de projetos." },
      { name: "SketchUp", desc: "Modelagem 3D e visualização de projetos arquitetônicos e técnicos." }
    ]
  },
  {
    id: "financeiro",
    name: "Finanças & Controladoria",
    icon: CreditCard,
    systems: [
      { name: "Lever Pro", desc: "Controle financeiro, análise de indicadores e apoio à controladoria." },
      { name: "TOTVS", desc: "Gestão financeira, pagamentos, relatórios e processos administrativos." },
      { name: "Sienge", desc: "ERP da construção civil com integração financeira, administrativa e operacional." }
    ]
  },
  {
    id: "rh",
    name: "Recursos Humanos",
    icon: Users,
    systems: [
      { name: "Sênior (Rubi)", desc: "Sistema de gestão de folha de pagamento e administração de pessoal, utilizado para apoiar processos de fechamento de folha, cálculos trabalhistas, férias, 13º salário, rescisões, encargos sociais e demais rotinas de Departamento Pessoal. A ferramenta contribui para maior agilidade, precisão e conformidade com a legislação trabalhista, garantindo segurança das informações e integração entre empresa, RH e contabilidade." },
      { name: "Qulture", desc: "Gestão de desempenho, avaliações, feedbacks, PDI e desenvolvimento de pessoas." },
      { name: "Reloponto", desc: "Controle de ponto, jornada de trabalho e banco de horas." },
      { name: "Autodoc", desc: "Gestão documental e processos de administração de pessoal." }
    ]
  },
  {
    id: "legalizacao",
    name: "Legalização & Adm.",
    icon: FileText,
    systems: [
      { name: "Mastertax", desc: "Emissão de certidões, legalizações e documentos fiscais e regulatórios." }
    ]
  },
  {
    id: "suprimentos",
    name: "Suprimentos",
    icon: ShoppingCart,
    systems: [
      { name: "Construmarket", desc: "Gestão de compras e fornecedores." }
    ]
  },
  {
    id: "expansao",
    name: "Expansão",
    icon: Compass,
    systems: [
      { name: "Viabil", desc: "Estudos de viabilidade, análise de novos projetos e expansão territorial." },
      { name: "Google Earth", desc: "Análise geográfica, territorial e apoio na prospecção de novos empreendimentos." }
    ]
  },
  {
    id: "ti",
    name: "Tecnologia da Informação",
    icon: Terminal,
    systems: [
      { name: "GitHub Copilot", desc: "Apoio ao desenvolvimento, automação e produtividade da equipe de tecnologia." }
    ]
  },
  {
    id: "geral",
    name: "Sistemas Gerais",
    icon: Layers,
    systems: [
      { name: "Hinc", desc: "Sistema de gestão geral para apoio administrativo, operacional e acompanhamento interno." },
      { name: "Strato", desc: "Apoio a gestão de processos internos e controles administrativos." },
      { name: "Sispro", desc: "Sistema utilizado em rotinas operacionais e administrativas diversas." }
    ]
  }
];

export default function ToolsSection() {
  const [selectedCatId, setSelectedCatId] = useState<string>("comercial");
  const activeCategory = categories.find(c => c.id === selectedCatId) || categories[0];

  return (
    <div className="h-full flex flex-col pt-16 pb-8 md:py-12 overflow-y-auto no-scrollbar">
      {/* Title Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 shrink-0">
        <div>
          <div className="inline-flex items-center gap-3 text-sm uppercase tracking-widest text-santer-muted mb-2">
            <span className="w-12 h-px bg-white/30" />
            Seção 14
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">O Futuro</h2>
        </div>
        <div className="text-sm uppercase tracking-widest text-santer-muted">14 / 15</div>
      </div>

      {/* Description Panel */}
      <div className="mb-8 shrink-0 max-w-4xl">
        <p className="text-xs md:text-sm text-soft-blue uppercase tracking-wider font-semibold mb-2">
          Tecnologia que apoia nossa operação
        </p>
        <p className="text-sm md:text-base text-white/90 leading-relaxed">
          Cada área da Santer utiliza sistemas específicos que apoiam a rotina, a produtividade e a gestão dos processos. Essas ferramentas fazem parte do dia a dia operacional e são fundamentais para garantir agilidade, controle e eficiência em todas as nossas entregas. 
        </p>
      </div>

      {/* Main Core View Area */}
      <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] xl:grid-cols-[320px_1fr] gap-6 flex-1 min-h-[300px] lg:max-h-[520px] lg:overflow-hidden">
        
        {/* Left Side: Category Navigator */}
        <div className="flex flex-col gap-4 lg:overflow-y-auto no-scrollbar">
          {/* Categories Pill List */}
          <div className="bg-navy-950/40 border border-white/5 p-2 rounded-2xl flex flex-row lg:flex-col gap-1 overflow-x-auto lg:overflow-x-visible lg:overflow-y-auto no-scrollbar shrink-0 lg:max-h-none">
            {categories.map((cat) => {
              const IconComp = cat.icon;
              const isSelected = cat.id === selectedCatId;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCatId(cat.id)}
                  className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs md:text-sm font-medium transition-all duration-300 shrink-0 whitespace-nowrap text-left ${
                    isSelected 
                      ? "bg-soft-blue/25 text-white border border-soft-blue/30 shadow-md"
                      : "text-white/60 hover:text-white hover:bg-white/5 border border-transparent"
                  }`}
                >
                  <IconComp className={`w-4.5 h-4.5 shrink-0 ${isSelected ? "text-soft-blue" : "text-white/40"}`} />
                  <span className="truncate">{cat.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Side: Active Systems Card Catalog */}
        <div className="bg-navy-900/10 border border-white/5 rounded-3xl p-5 lg:overflow-y-auto no-scrollbar flex flex-col justify-start">
          <div className="flex items-center justify-between mb-4 border-b border-white/5 pb-3">
            <div className="flex items-center gap-2">
              <activeCategory.icon className="w-5 h-5 text-soft-blue" />
              <h3 className="font-bold text-base md:text-lg text-white">{activeCategory.name}</h3>
            </div>
            <span className="text-xs text-white/40 font-mono">
              {activeCategory.systems.length} {activeCategory.systems.length === 1 ? "sistema cadastrado" : "sistemas cadastrados"}
            </span>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={selectedCatId}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              {activeCategory.systems.map((sys, idx) => (
                <motion.div
                  key={sys.name}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.05, duration: 0.3 }}
                  className="bg-navy-900/40 border border-white/10 p-4.5 rounded-2xl flex flex-col justify-between hover:border-white/20 hover:bg-navy-800/20 transition-all duration-300 group"
                >
                  <div>
                    <h4 className="font-bold text-white text-sm md:text-base mb-1.5 group-hover:text-soft-blue transition-colors duration-300 flex items-center justify-between gap-2">
                      <span>{sys.name}</span>
                      <ChevronRight className="w-4 h-4 text-white/10 group-hover:text-soft-blue group-hover:translate-x-0.5 transition-all duration-300" />
                    </h4>
                    <p className="text-xs md:text-sm text-white/70 leading-relaxed font-normal">
                      {sys.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
}
