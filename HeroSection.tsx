import { motion, useMotionValue, useMotionTemplate } from "motion/react";
import { MouseEvent } from "react";

export default function HeroSection() {
  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.1 } }
  };
  
  const item = {
    hidden: { opacity: 0, y: 30, filter: "blur(8px)" },
    show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } }
  };

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <div 
      className="h-full w-full flex flex-col items-center justify-center text-center relative group"
      onMouseMove={handleMouseMove}
    >
      {/* Interactive Mouse Gradient */}
      <motion.div
        className="pointer-events-none absolute -inset-4 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              700px circle at ${mouseX}px ${mouseY}px,
              rgba(56, 189, 248, 0.15),
              transparent 80%
            )
          `,
          zIndex: 0
        }}
      />

      <motion.div 
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        className="flex flex-col items-center relative z-10 w-full"
      >
        <motion.div variants={item} className="text-lg sm:text-xl md:text-2xl text-soft-blue tracking-[0.25em] font-light mb-2 uppercase">
          Bem-vindo(a)
        </motion.div>
        
        <motion.h1 variants={item} className="relative z-10 mb-2">
          <span className="text-[3.5rem] xs:text-[5rem] sm:text-[7rem] md:text-[9rem] lg:text-[11rem] leading-none font-black tracking-tighter text-white drop-shadow-2xl">
            Santer
          </span>
        </motion.h1>

        <motion.div variants={item} className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-santer-muted font-light tracking-[0.35em] uppercase sm:mt-2">
          Empreendimentos
        </motion.div>
      </motion.div>
    </div>
  );
}
