import { Play } from "lucide-react";
import { useState } from "react";
import { motion } from "motion/react";

export default function VideoSection() {
  const [selectedVideo, setSelectedVideo] = useState<{title: string, url: string | null} | null>(null);

  return (
    <>
      <div className="h-full flex flex-col justify-center">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <div className="inline-flex items-center gap-3 text-sm uppercase tracking-widest text-santer-muted mb-2">
              <span className="w-12 h-px bg-white/30" />
              Seção 09
            </div>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Vídeo Institucional</h2>
          </div>
          <div className="text-sm uppercase tracking-widest text-santer-muted">09 / 15</div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-auto lg:h-[500px]">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, filter: "blur(5px)" }}
            whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.3 }}
            className="relative min-h-[240px] sm:min-h-[300px] lg:min-h-0 rounded-[2rem] bg-gradient-to-br from-navy-800/80 to-navy-950/80 border border-white/10 shadow-2xl overflow-hidden flex items-center justify-center group cursor-pointer" 
            onClick={() => setSelectedVideo({ title: 'Vídeo Institucional', url: 'https://www.youtube.com/embed/5khIcCWFikQ?autoplay=1' })}
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.1)_0%,_transparent_50%)] opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute top-6 left-6 inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-navy-950/60 border border-white/10 text-white font-medium text-sm backdrop-blur-md z-20">
              Vídeo institucional
            </div>
            <button className="relative z-10 w-24 h-24 rounded-full bg-white/10 border border-white/20 backdrop-blur-md flex items-center justify-center shadow-2xl transition-transform duration-300 group-hover:scale-110">
              <Play className="w-8 h-8 text-white ml-1.5 fill-white" />
            </button>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95, filter: "blur(5px)" }}
            whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.3 }}
            className="relative min-h-[240px] sm:min-h-[300px] lg:min-h-0 rounded-[2rem] bg-gradient-to-br from-navy-800/80 to-navy-950/80 border border-white/10 shadow-2xl overflow-hidden flex items-center justify-center group cursor-pointer" 
            onClick={() => setSelectedVideo({ title: 'Jeito Santer de Ser', url: 'https://www.youtube.com/embed/zkbyELu1O4s?autoplay=1' })}
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.1)_0%,_transparent_50%)] opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute top-6 left-6 inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-navy-950/60 border border-white/10 text-white font-medium text-sm backdrop-blur-md z-20">
              Jeito Santer de Ser
            </div>
            <button className="relative z-10 w-24 h-24 rounded-full bg-white/10 border border-white/20 backdrop-blur-md flex items-center justify-center shadow-2xl transition-transform duration-300 group-hover:scale-110">
              <Play className="w-8 h-8 text-white ml-1.5 fill-white" />
            </button>
          </motion.div>
        </div>
      </div>

      {selectedVideo && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-navy-950/80 backdrop-blur-xl p-4 md:p-8" onClick={() => setSelectedVideo(null)}>
          <div className="w-full max-w-5xl rounded-[2rem] bg-navy-900 border border-white/10 shadow-2xl overflow-hidden p-6 relative" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-6">
              <div>
                <div className="text-sm uppercase tracking-widest text-santer-muted mb-2">Reproduzindo</div>
                <h2 className="text-2xl md:text-3xl font-bold">{selectedVideo.title}</h2>
              </div>
              <button onClick={() => setSelectedVideo(null)} className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors">
                ✕
              </button>
            </div>
            {selectedVideo.url ? (
              <div className="aspect-video w-full rounded-2xl bg-black overflow-hidden flex items-center justify-center border border-white/10 shadow-inner">
                <iframe 
                  width="100%" 
                  height="100%" 
                  src={selectedVideo.url} 
                  title={selectedVideo.title} 
                  frameBorder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                  referrerPolicy="strict-origin-when-cross-origin" 
                  allowFullScreen
                  className="w-full h-full"
                ></iframe>
              </div>
            ) : (
              <div className="aspect-video w-full rounded-2xl border border-dashed border-white/20 bg-white/5 flex flex-col items-center justify-center p-8 text-center text-soft-blue">
                <h3 className="text-2xl font-bold text-white mb-4">Insira aqui o arquivo de vídeo do {selectedVideo.title}</h3>
                <p className="max-w-[58ch] leading-relaxed">
                  Este espaço está pronto para receber o player de vídeo.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
