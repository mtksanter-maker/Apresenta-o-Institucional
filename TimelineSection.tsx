import { useRef, useEffect } from "react";
import { motion } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function TimelineSection() {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const onWheel = (e: WheelEvent) => {
      // Prevent parent from capturing horizontal scroll while we are interacting with the timeline
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
        e.stopPropagation();
      } else {
        // Auto convert vertical to horizontal inside the timeline to make it easier to scroll
        const isScrollingUp = e.deltaY < 0;
        const isScrollingDown = e.deltaY > 0;
        
        if (
          (isScrollingDown && el.scrollLeft < el.scrollWidth - el.clientWidth) ||
          (isScrollingUp && el.scrollLeft > 0)
        ) {
          e.stopPropagation();
          el.scrollBy({ left: e.deltaY, behavior: 'auto' });
        }
      }
    };

    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
  }, []);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -324, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 324, behavior: 'smooth' });
    }
  };

  const timeline = [
    { year: 2008, desc: 'Início das atividades e nascimento da trajetória da Santer no mercado imobiliário.' },
    { year: 2013, desc: 'Entrada da Josi na diretoria, reforçando o ciclo de crescimento e consolidação.' },
    { year: 2014, desc: 'Entrega do primeiro empreendimento Prime, ampliando a percepção de valor da marca.' },
    { year: 2018, desc: 'Nova sede em Guaramirim e entrada do Eduardo na diretoria, com novo patamar de estrutura.' },
    { year: 2020, desc: 'Vista Paradiso marca um novo ciclo de presença e consistência no portfólio entregue.' },
    { year: 2021, desc: 'Lavitta e Barra View reforçam expansão, maturidade e leitura estratégica de mercado.' },
    { year: 2023, desc: 'Fun e Viverde demonstram avanço de portfólio e continuidade de crescimento.' },
    { year: 2024, desc: 'Breeze e Feel consolidam a empresa como marca em movimento, expansão e evolução.' },
    { year: 2026, desc: 'Lavivitta e Barraview são entregues, consolidando uma experiência e trajetória construída ao longo dos anos.' },
  ];

  return (
    <div className="h-full flex flex-col justify-center">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-3 text-sm uppercase tracking-widest text-santer-muted mb-2">
            <span className="w-12 h-px bg-white/30" />
            Seção 10
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Linha do tempo</h2>
        </div>
        <div className="text-sm uppercase tracking-widest text-santer-muted">10 / 15</div>
      </div>

      <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-8 mb-12">
        <p className="max-w-3xl text-lg text-soft-blue leading-[1.75]">
          A evolução da Santer é marcada por marcos que mostram um crescimento consistente. A empresa cresce com estratégia, amadurece com experiência e amplia sua presença com segurança.
        </p>
        <div className="flex gap-3 shrink-0">
          <button onClick={scrollLeft} className="w-12 h-12 rounded-full border border-white/20 bg-white/5 flex items-center justify-center hover:bg-white/15 transition-colors cursor-pointer group">
            <ChevronLeft className="w-6 h-6 text-white group-hover:-translate-x-0.5 transition-transform" />
          </button>
          <button onClick={scrollRight} className="w-12 h-12 rounded-full border border-white/20 bg-white/5 flex items-center justify-center hover:bg-white/15 transition-colors cursor-pointer group">
            <ChevronRight className="w-6 h-6 text-white group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </div>

      <div 
        ref={scrollRef}
        className="w-full overflow-x-auto no-scrollbar pb-8 cursor-grab active:cursor-grabbing"
      >
        <div className="min-w-max flex gap-6 px-1 relative">
          <div className="absolute top-[21px] left-6 right-6 h-0.5 bg-gradient-to-r from-white/10 via-white/40 to-white/10" />
          
          {timeline.map((item, i) => (
            <motion.div 
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: false, margin: "-50px" }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              key={item.year} 
              className="relative pt-[42px] w-[300px]"
            >
              <div className="absolute top-3 left-6 w-5 h-5 rounded-full bg-white ring-[8px] ring-white/10" />
              <div className="glass-card p-6 rounded-2xl min-h-[200px] hover:-translate-y-1 transition-transform">
                <div className="text-3xl font-bold tracking-tight mb-4">{item.year}</div>
                <p className="text-soft-blue leading-relaxed text-[0.95rem]">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
