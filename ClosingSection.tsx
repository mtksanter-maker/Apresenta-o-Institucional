import { ArrowRight, CornerLeftUp } from "lucide-react";
import { motion } from "motion/react";

export default function ClosingSection({ onNavigate }: { onNavigate: (index: number) => void }) {
  return (
    <motion.div 
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.3 }}
      variants={{
        hidden: { opacity: 0 },
        show: { opacity: 1, transition: { staggerChildren: 0.2 } }
      }}
      className="h-full flex flex-col justify-center items-center text-center max-w-4xl mx-auto px-4"
    >
      <motion.h2 
        variants={{ hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } } }}
        className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05] mb-12"
      >
        Santer
        <span className="block text-3xl md:text-4xl lg:text-5xl text-soft-blue font-medium mt-4">
          Construindo projetos para a sua vida
        </span>
      </motion.h2>
      
      <motion.div 
        variants={{ hidden: { opacity: 0, scale: 0.9 }, show: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeOut" } } }}
        className="flex flex-col sm:flex-row items-center gap-4"
      >
        <button 
          onClick={() => window.open('https://santerempreendimentos.com.br', '_blank')}
          className="group inline-flex items-center gap-3 px-8 py-4 rounded-full bg-white text-navy-900 font-bold shadow-xl hover:-translate-y-0.5 transition-transform"
        >
          Conhecer mais
          <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
        </button>
        <button 
          onClick={() => onNavigate(0)}
          className="group inline-flex items-center gap-3 px-8 py-4 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors"
        >
          <CornerLeftUp className="w-5 h-5 transition-transform group-hover:-translate-y-1" />
          Voltar ao início
        </button>
      </motion.div>
    </motion.div>
  );
}
