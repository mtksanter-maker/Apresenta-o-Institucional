/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from "react";
import { cn } from "./lib/utils";
import Navigation from "./components/Navigation";
import { sections } from "./data/content";

import HeroSection from "./components/sections/HeroSection";
import AboutSection from "./components/sections/AboutSection";
import MapSection from "./components/sections/MapSection";
import PortfolioSection from "./components/sections/PortfolioSection";
import MVVSection from "./components/sections/MVVSection";
import LeadershipSection from "./components/sections/LeadershipSection";
import AwardsSection from "./components/sections/AwardsSection";
import VideoSection from "./components/sections/VideoSection";
import TimelineSection from "./components/sections/TimelineSection";
import HQSection from "./components/sections/HQSection";
import BenefitsSection from "./components/sections/BenefitsSection";
import RightsSection from "./components/sections/RightsSection";
import CommercialSection from "./components/sections/CommercialSection";
import ToolsSection from "./components/sections/ToolsSection";
import ClosingSection from "./components/sections/ClosingSection";

export default function App() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleWheel = (e: WheelEvent) => {
      // Check if we are scrolling inside a scrollable child container (like the benefits modal or a scrollable section)
      let target = e.target as HTMLElement | null;
      while (target && target !== container) {
        const style = window.getComputedStyle(target);
        if (
          (target.scrollHeight > target.clientHeight && (style.overflowY === 'auto' || style.overflowY === 'scroll' || style.overflowY === 'overlay')) ||
          (target.scrollWidth > target.clientWidth && (style.overflowX === 'auto' || style.overflowX === 'scroll' || style.overflowX === 'overlay'))
        ) {
          return;
        }
        target = target.parentElement;
      }

      // Otherwise, prevent the mouse scroll from sliding presentation sections
      e.preventDefault();
    };

    container.addEventListener("wheel", handleWheel, { passive: false });
    return () => container.removeEventListener("wheel", handleWheel);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      // Determine active section based on scroll position
      if (window.innerWidth >= 1024) {
        const index = Math.round(container.scrollLeft / window.innerWidth);
        if (index !== activeIndex) {
          setActiveIndex(index);
        }
      } else {
        const index = Math.round(container.scrollTop / window.innerHeight);
        if (index !== activeIndex) {
          setActiveIndex(index);
        }
      }
    };

    // Use requestAnimationFrame for scroll check
    let ticking = false;
    const tickScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    container.addEventListener("scroll", tickScroll);
    return () => container.removeEventListener("scroll", tickScroll);
  }, [activeIndex]);

  const goToSection = (index: number) => {
    const container = containerRef.current;
    if (!container) return;

    if (window.innerWidth >= 1024) {
      container.scrollTo({ left: index * window.innerWidth, behavior: "smooth" });
    } else {
      container.scrollTo({ top: index * window.innerHeight, behavior: "smooth" });
    }
  };

  return (
    <div className="h-screen w-screen overflow-hidden flex flex-col bg-navy-950 text-foreground relative font-sans">
      <Navigation
        activeIndex={activeIndex}
        onNavigate={goToSection}
        totalCount={sections.length}
      />

      <main
        ref={containerRef}
        className="flex-1 w-full flex flex-col lg:flex-row overflow-y-auto lg:overflow-x-auto lg:overflow-y-hidden snap-y lg:snap-x snap-mandatory scroll-smooth no-scrollbar relative z-10"
      >
        <SectionWrapper index={0} activeIndex={activeIndex} altBg={false}><HeroSection /></SectionWrapper>
        <SectionWrapper index={1} activeIndex={activeIndex} altBg={true}><AboutSection /></SectionWrapper>
        <SectionWrapper index={2} activeIndex={activeIndex} altBg={false} depth><MapSection /></SectionWrapper>
        <SectionWrapper index={3} activeIndex={activeIndex} altBg={true}><PortfolioSection /></SectionWrapper>
        <SectionWrapper index={4} activeIndex={activeIndex} altBg={false} depth><CommercialSection /></SectionWrapper>
        <SectionWrapper index={5} activeIndex={activeIndex} altBg={true}><MVVSection /></SectionWrapper>
        <SectionWrapper index={6} activeIndex={activeIndex} altBg={false} depth><LeadershipSection /></SectionWrapper>
        <SectionWrapper index={7} activeIndex={activeIndex} altBg={true}><AwardsSection /></SectionWrapper>
        <SectionWrapper index={8} activeIndex={activeIndex} altBg={false} depth><VideoSection /></SectionWrapper>
        <SectionWrapper index={9} activeIndex={activeIndex} altBg={true}><TimelineSection /></SectionWrapper>
        <SectionWrapper index={10} activeIndex={activeIndex} altBg={false} depth><HQSection /></SectionWrapper>
        <SectionWrapper index={11} activeIndex={activeIndex} altBg={true}><BenefitsSection /></SectionWrapper>
        <SectionWrapper index={12} activeIndex={activeIndex} altBg={false} depth><RightsSection /></SectionWrapper>
        <SectionWrapper index={13} activeIndex={activeIndex} altBg={true}><ToolsSection /></SectionWrapper>
        <SectionWrapper index={14} activeIndex={activeIndex} altBg={false} depth><ClosingSection onNavigate={goToSection}/></SectionWrapper>
      </main>


    </div>
  );
}

function SectionWrapper({
  children,
  index,
  activeIndex,
  altBg,
  depth
}: {
  children: React.ReactNode;
  index: number;
  activeIndex: number;
  altBg?: boolean;
  depth?: boolean;
}) {
  const isVisible = Math.abs(index - activeIndex) <= 1;

  return (
    <section
      data-index={index}
      className={cn(
        "w-full h-full flex-none snap-start snap-always relative overflow-y-auto p-6 pt-32 lg:pt-32 lg:p-12 pb-24",
        "flex flex-col no-scrollbar",
        altBg && "bg-gradient-to-br from-navy-800/40 to-navy-950/20",
        depth && "bg-gradient-to-br from-navy-900/60 to-navy-800/40 shadow-inner",
        !altBg && !depth && "bg-transparent",
        "transition-opacity duration-500",
        isVisible ? "opacity-100" : "opacity-0"
      )}
    >
      <div className="max-w-7xl mx-auto w-full h-full flex flex-col">
        {children}
      </div>
    </section>
  );
}
