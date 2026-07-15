import { motion } from "motion/react";
import { User } from "lucide-react";

export default function LeadershipSection() {
  const leaders = [
    { name: 'Fernando Nilson da Silva', role: 'Presidente do Conselho', image: 'https://imgur.com/CqZ41XC.jpg' },
    { name: 'Mari Deise Stringari', role: 'Diretoria Financeira', image: 'https://imgur.com/W8JlvKZ.jpg' },
    { name: 'Joslaine Stringari', role: 'Diretoria Administrativa', image: 'https://imgur.com/l5BPh3V.jpg' },
    { name: 'Eduardo Schuster', role: 'Diretoria Executiva', image: 'https://imgur.com/Pc2nhDu.jpg' }
  ];

  return (
    <div className="h-full flex flex-col justify-center">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
        <div>
          <div className="inline-flex items-center gap-3 text-sm uppercase tracking-widest text-santer-muted mb-2">
            <span className="w-12 h-px bg-white/30" />
            Seção 07
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Diretoria Santer</h2>
        </div>
        <div className="text-sm uppercase tracking-widest text-santer-muted">07 / 15</div>
      </div>

      <motion.div 
        variants={{
          hidden: { opacity: 0 },
          show: { opacity: 1, transition: { staggerChildren: 0.1 } }
        }}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.2 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {leaders.map(leader => (
          <motion.article 
            key={leader.name} 
            variants={{
              hidden: { opacity: 0, y: 30, scale: 0.95 },
              show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: "easeOut" } }
            }}
            className="glass-card p-4 rounded-3xl flex flex-col gap-4 items-center text-center group"
          >
            <div className="w-full aspect-[3/4] rounded-2xl bg-white/5 border border-white/10 flex flex-col items-center justify-center text-white/30 group-hover:bg-white/10 transition-colors overflow-hidden relative">
              {leader.image ? (
                <img src={leader.image} alt={leader.name} className="absolute inset-0 w-full h-full object-cover transition-all duration-500" />
              ) : (
                <>
                  <User className="w-12 h-12 mb-2 opacity-50" />
                  <span className="text-xs uppercase tracking-widest">Espaço para foto</span>
                </>
              )}
            </div>
            <div className="pb-2">
              <h3 className="text-lg font-bold mb-1">{leader.name}</h3>
              <div className="text-xs uppercase tracking-widest text-santer-muted">{leader.role}</div>
            </div>
          </motion.article>
        ))}
      </motion.div>
    </div>
  );
}
