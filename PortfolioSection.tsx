import { MapPin } from "lucide-react";
import { motion } from "motion/react";

export default function PortfolioSection() {
  const projects = [
    { title: "SAN PIETRO", units: 128, location: "Guaramirim/SC" },
    { title: "BRISA DO VALLE", units: 87, location: "Guaramirim/SC" },
    { title: "BARRAVIEW", units: 260, location: "Barra Velha/SC" },
    { title: "LAVITTA", units: 360, location: "Penha/SC" },
    { title: "GRAN VALLE", units: 224, location: "Jaraguá do Sul/SC" },
    { title: "MONET", units: 52, location: "Guaramirim/SC" },
    { title: "ANGELUS", units: 224, location: "Balneário Piçarras/SC" },
    { title: "SÃO RAFAEL", units: 24, location: "Balneário Piçarras/SC" },
    { title: "VICENZA", units: 60, location: "Garuva/SC" },
    { title: "LÁ PIETÁ", units: 36, location: "Guaramirim/SC" },
    { title: "JARDINS", units: 209, location: "Guaramirim/SC" },
    { title: "TOSCANA I", units: 216, location: "Araquari/SC" },
    { title: "VISTA PARADISO", units: 99, location: "Penha/SC" },
    { title: "SÃO MIGUEL", units: 198, location: "Guaramirim/SC" },
    { title: "JARDIM FLORENÇA", units: 264, location: "Guaramirim/SC" },
    { title: "TOSCANA II", units: 253, location: "Araquari/SC" },
    { title: "", units: 0, location: "", isSpacer: true }, // Spacer to match grid positioning of duplicate Toscana II
    { title: "SÃO GABRIEL", units: 40, location: "Guaramirim/SC" },
    { title: "SAN LORENZO", units: 125, location: "Guaramirim/SC" },
    { title: "VILLA VENETO", units: 352, location: "Araquari/SC" },
  ];

  return (
    <div className="h-full flex flex-col justify-center">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
        <div>
          <div className="inline-flex items-center gap-3 text-sm uppercase tracking-widest text-santer-muted mb-2">
            <span className="w-12 h-px bg-white/30" />
            Seção 04
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Empreendimentos entregues</h2>
        </div>
        <div className="text-sm uppercase tracking-widest text-santer-muted">04 / 15</div>
      </div>

      <motion.div 
        variants={{
          hidden: { opacity: 0 },
          show: { opacity: 1, transition: { staggerChildren: 0.05 } }
        }}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.1 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-10"
      >
        {projects.map((proj, index) => proj.isSpacer ? (
          <div key={`spacer-${index}`} className="hidden lg:block" />
        ) : (
          <motion.div 
            variants={{
              hidden: { opacity: 0, y: 20 },
              show: { opacity: 1, y: 0, transition: { duration: 0.4 } }
            }}
            key={proj.title} 
            className="flex flex-col"
          >
            <h3 className="text-xl font-bold text-white uppercase mb-1">{proj.title}</h3>
            <span className="text-soft-blue text-base mb-1">{proj.units} unidades</span>
            <div className="flex items-center gap-1.5 text-santer-muted text-sm">
              <MapPin className="w-4 h-4" />
              <span>{proj.location}</span>
            </div>
          </motion.div>
        ))}

        <motion.div 
          variants={{
            hidden: { opacity: 0, y: 20 },
            show: { opacity: 1, y: 0, transition: { duration: 0.4 } }
          }}
          className="flex flex-col pt-4 border-t border-white/10 lg:pl-0"
        >
          <h3 className="text-xl font-bold text-white uppercase mb-1">TOTAL ENTREGUE</h3>
          <span className="text-soft-blue text-base">3.211 unidades</span>
        </motion.div>
      </motion.div>
    </div>
  );
}
