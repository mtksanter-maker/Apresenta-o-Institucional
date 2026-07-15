import { cn } from "../lib/utils";
import { sections } from "../data/content";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useRef } from "react";

export default function Navigation({
  activeIndex,
  onNavigate,
  totalCount,
}: {
  activeIndex: number;
  onNavigate: (index: number) => void;
  totalCount: number;
}) {
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Attempt to center the active button in the scrollable nav
    const activeBtn = navRef.current?.querySelector(`[data-active="true"]`) as HTMLElement;
    if (activeBtn && navRef.current) {
      const parent = navRef.current;
      const scrollLeft = activeBtn.offsetLeft - parent.clientWidth / 2 + activeBtn.clientWidth / 2;
      parent.scrollTo({ left: scrollLeft, behavior: "smooth" });
    }
  }, [activeIndex]);

  return (
    <header className="fixed top-0 inset-x-0 z-50 h-auto lg:h-[86px] flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-6 px-4 lg:px-12 py-4 lg:py-0 backdrop-blur-xl bg-gradient-to-b from-navy-950/90 via-navy-950/70 to-transparent border-b border-white/5">
      <div className="flex items-center justify-between w-full lg:w-auto">
        <div className="flex items-center gap-3">
          <img 
            src="https://i.imgur.com/jCjAJUF.png" 
            alt="Santer Empreendimentos" 
            className="h-6 w-auto object-contain drop-shadow-sm"
          />
        </div>

        {/* Mobile controls */}
        <div className="flex items-center gap-2 lg:hidden">
            <button
            onClick={() => onNavigate(Math.max(0, activeIndex - 1))}
            disabled={activeIndex === 0}
            aria-label="Anterior"
            className="w-10 h-10 rounded-full border border-white/10 bg-white/5 text-white flex items-center justify-center disabled:opacity-50 transition-transform active:scale-95"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => onNavigate(Math.min(totalCount - 1, activeIndex + 1))}
            disabled={activeIndex === totalCount - 1}
            aria-label="Próximo"
            className="w-10 h-10 rounded-full border border-white/10 bg-white/5 text-white flex items-center justify-center disabled:opacity-50 transition-transform active:scale-95"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div
        ref={navRef}
        className="flex-1 overflow-x-auto no-scrollbar flex items-center"
      >
        <nav
          aria-label="Seções"
          className="inline-flex gap-1.5 p-1 rounded-full bg-white/5 border border-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]"
        >
          {sections.map((sec, idx) => {
            const isActive = activeIndex === idx;
            return (
              <button
                key={sec.id}
                data-active={isActive}
                onClick={() => onNavigate(idx)}
                className={cn(
                  "px-3.5 py-2 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2 whitespace-nowrap",
                  isActive
                    ? "bg-white/10 text-white"
                    : "text-santer-muted hover:bg-white/5 hover:text-white"
                )}
              >
                {sec.shortTitle}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Desktop controls */}
      <div className="hidden lg:flex items-center gap-2">
        <button
          onClick={() => onNavigate(Math.max(0, activeIndex - 1))}
          disabled={activeIndex === 0}
          aria-label="Anterior"
          className="w-10 h-10 rounded-full border border-white/10 bg-white/5 text-white flex items-center justify-center disabled:opacity-50 transition-transform hover:-translate-y-[1px] hover:bg-white/10"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={() => onNavigate(Math.min(totalCount - 1, activeIndex + 1))}
          disabled={activeIndex === totalCount - 1}
          aria-label="Próximo"
          className="w-10 h-10 rounded-full border border-white/10 bg-white/5 text-white flex items-center justify-center disabled:opacity-50 transition-transform hover:-translate-y-[1px] hover:bg-white/10"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </header>
  );
}
