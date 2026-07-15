import { useState } from "react";
import { MapPin, X, Image as ImageIcon } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function MapSection() {
  const cities = [
    'Araquari', 'Balneário Piçarras', 'Barra Velha', 'Garuva', 'Guaramirim', 'Penha'
  ];

  const cityProjects: Record<string, string> = {
    'Araquari': 'Residencial Toscana',
    'Barra Velha': 'BarraView',
    'Balneário Piçarras': 'Viverde Eco Club',
    'Piçarras': 'Viverde Eco Club',
    'Penha': 'Lavitta Beach and Park'
  };

  const cityImages: Record<string, string> = {
    'Barra Velha': 'https://i.imgur.com/OtvjNiL.jpg',
    'Balneário Piçarras': 'https://i.imgur.com/eiBynJu.jpg',
    'Piçarras': 'https://i.imgur.com/eiBynJu.jpg',
    'Penha': 'https://i.imgur.com/QmqqD1E.jpg'
  };

  const [selectedCity, setSelectedCity] = useState<{name: string, project: string, image: string} | null>(null);

  // Positions carefully calculated for z=9 centered at Guaramirim
  const mapMarkers = [
    { name: 'Guaramirim', dx: 0, dy: -5 },
    { name: 'Araquari', dx: 101, dy: -42 },
    { name: 'Barra Velha', dx: 113, dy: 65 },
    { name: 'Piçarras', dx: 117, dy: 117 },
    { name: 'Penha', dx: 127, dy: 122 },
  ];

  const handleCityClick = (cityName: string) => {
    const proj = cityProjects[cityName];
    const img = cityImages[cityName];
    if (proj) {
      setSelectedCity({ name: cityName === 'Piçarras' ? 'Balneário Piçarras' : cityName, project: proj, image: img || '' });
    }
  };

  return (
    <div className="h-full flex flex-col justify-center">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
        <div>
          <div className="inline-flex items-center gap-3 text-sm uppercase tracking-widest text-santer-muted mb-2">
            <span className="w-12 h-px bg-white/30" />
            Seção 03
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Cidades de atuação</h2>
        </div>
        <div className="text-sm uppercase tracking-widest text-santer-muted">03 / 15</div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8 items-center">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: false, amount: 0.3 }}
          className="glass-card p-8 rounded-3xl"
        >
          <p className="text-lg text-soft-blue leading-[1.75] mb-8">
            A atuação da Santer está presente em cidades estratégicas de Santa Catarina, como Araquari, Balneário Piçarras, Barra Velha, Garuva, Guaramirim, Jaraguá do Sul e Penha. Essa presença regional demonstra a capacidade da empresa de identificar oportunidades em diferentes mercados e de desenvolver empreendimentos conectados ao perfil, ao ritmo de crescimento e ao potencial de valorização de cada localidade.
          </p>
          <div className="flex flex-wrap gap-3">
            {cities.map((city, i) => {
              const hasProject = !!cityProjects[city];
              return (
                <motion.button 
                  type="button"
                  onClick={() => handleCityClick(city)}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: false }}
                  transition={{ duration: 0.4, delay: i * 0.05 + 0.3 }}
                  key={city} 
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-full border border-white/10 text-sm transition-colors ${hasProject ? 'bg-white/10 hover:bg-white/20 text-white cursor-pointer shadow-sm' : 'bg-white/5 text-soft-blue cursor-default'}`}
                >
                  <MapPin className={`w-4 h-4 ${hasProject ? 'text-white' : 'text-white/50'}`} />
                  {city}
                  {hasProject && <span className="w-2 h-2 rounded-full bg-white ml-1 animate-pulse" />}
                </motion.button>
              );
            })}
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: false, amount: 0.3 }}
          className="relative min-h-[300px] sm:min-h-[420px] rounded-3xl flex items-center justify-center overflow-hidden border border-white/10 bg-[#e5e3df] shadow-2xl"
        >
          <iframe 
            title="Mapa de atuação da Santer Empreendimentos"
            src="https://maps.google.com/maps?q=Guaramirim+-+SC&z=9&output=embed" 
            className="absolute inset-0 w-full h-full border-0 pointer-events-none"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />

          {/* Protective overlay to prevent panning so markers stay aligned */}
          <div className="absolute inset-0 z-10" />

          {/* Map markers layer */}
          <div className="absolute inset-0 z-20 pointer-events-auto">
            {mapMarkers.map((marker) => {
              const hasProject = !!cityProjects[marker.name];
              return (
                <div 
                  key={marker.name}
                  className={`absolute top-1/2 left-1/2 group ${hasProject ? 'cursor-pointer' : 'cursor-default'}`}
                  style={{ transform: `translate(calc(-50% + ${marker.dx}px), calc(-50% + ${marker.dy}px))` }}
                  onClick={() => handleCityClick(marker.name)}
                >
                  <div className="relative flex items-center justify-center w-6 h-6">
                    <div className="absolute w-full h-full bg-navy-600 rounded-full animate-ping opacity-20" />
                    <div className={`w-4 h-4 rounded-full border-2 shadow-lg z-10 transition-colors ${hasProject ? 'border-white bg-white group-hover:scale-125' : 'border-white bg-navy-800'}`} />
                    
                    {/* Tooltip */}
                    <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-navy-950 text-white text-xs font-bold rounded-lg shadow-xl whitespace-nowrap opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all pointer-events-none border border-white/10">
                      {marker.name} {hasProject && ' (Ver Empreendimento)'}
                      {/* Tooltip Arrow */}
                      <div className="absolute top-full left-1/2 -translate-x-1/2 border-[5px] border-transparent border-t-navy-950 pointer-events-none" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="absolute right-6 top-6 max-w-[220px] p-4 rounded-2xl bg-navy-950/90 border border-white/10 backdrop-blur-md pointer-events-none z-30 hidden md:block shadow-2xl">
            <p className="text-[0.8rem] text-soft-blue leading-relaxed">
              Mapeamento de presença.
            </p>
          </div>
        </motion.div>
      </div>

      <AnimatePresence>
        {selectedCity && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedCity(null)}
              className="absolute inset-0 bg-navy-950/80 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative z-10 w-full max-w-sm bg-navy-900 border border-white/10 p-6 rounded-3xl shadow-2xl flex flex-col gap-6"
            >
              <button 
                onClick={() => setSelectedCity(null)}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/10 transition-colors text-white/70 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>

              <div>
                <h3 className="text-2xl font-bold pr-6">{selectedCity.name}</h3>
                <p className="text-sm text-soft-blue uppercase tracking-widest mt-1">Empreendimento Principal</p>
              </div>

              <div className="rounded-2xl border border-white/10 overflow-hidden bg-white/5">
                <div className="w-full aspect-video bg-white/5 flex flex-col items-center justify-center text-white/30 border-b border-white/10 relative group overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none" />
                  {selectedCity.image ? (
                    <img 
                      src={selectedCity.image} 
                      alt={selectedCity.project} 
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <>
                      <ImageIcon className="w-10 h-10 mb-2 opacity-50" />
                      <span className="text-[10px] uppercase tracking-widest">Imagem em breve</span>
                    </>
                  )}
                </div>
                <div className="p-6 flex flex-col items-center text-center bg-gradient-to-b from-transparent to-black/20">
                   <strong className="text-xl font-bold uppercase tracking-tight text-white">{selectedCity.project}</strong>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
