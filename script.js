/* =========================================================
   Santer Empreendimentos — Apresentação Institucional
   Lógica de interação (vanilla JS)
   ========================================================= */
(function () {
  "use strict";

  /* ---------------------------------------------------------
     Navegação / seções
     --------------------------------------------------------- */
  const NAV = [
    "Início", "Quem Somos", "Presença", "Portfólio", "Estratégia",
    "Missão e Valores", "Liderança", "Cultura", "Reconhecimentos",
    "Manifesto", "História", "Estrutura", "Benefícios", "Direitos",
    "O Futuro", "Movimento"
  ];

  const main = document.getElementById("deck");
  const navList = document.getElementById("nav-list");
  const navScroll = document.getElementById("nav-scroll");
  const prevBtns = document.querySelectorAll("[data-nav-prev]");
  const nextBtns = document.querySelectorAll("[data-nav-next]");
  let activeIndex = -1;
  const total = NAV.length;

  // Build nav buttons
  NAV.forEach((label, idx) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.dataset.index = idx;
    btn.className =
      "nav-btn px-3.5 py-2 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2 whitespace-nowrap text-santer-muted hover:bg-white/5 hover:text-white";
    btn.textContent = label;
    btn.addEventListener("click", () => goToSection(idx));
    navList.appendChild(btn);
  });
  const navBtns = navList.querySelectorAll(".nav-btn");

  const isDesktop = () => window.innerWidth >= 1024;

  function goToSection(index) {
    index = Math.max(0, Math.min(total - 1, index));
    if (isDesktop()) {
      main.scrollTo({ left: index * window.innerWidth, behavior: "smooth" });
    } else {
      main.scrollTo({ top: index * window.innerHeight, behavior: "smooth" });
    }
  }

  function setActive(index) {
    if (index === activeIndex) return;
    activeIndex = index;
    navBtns.forEach((b, i) => {
      const on = i === index;
      b.dataset.active = on;
      b.classList.toggle("bg-white/10", on);
      b.classList.toggle("text-white", on);
      b.classList.toggle("text-santer-muted", !on);
    });
    // center active button
    const activeBtn = navBtns[index];
    if (activeBtn && navScroll) {
      const left =
        activeBtn.offsetLeft - navScroll.clientWidth / 2 + activeBtn.clientWidth / 2;
      navScroll.scrollTo({ left, behavior: "smooth" });
    }
    // prev/next disabled state
    prevBtns.forEach((b) => (b.disabled = index === 0));
    nextBtns.forEach((b) => (b.disabled = index === total - 1));
    // section fade
    sections.forEach((s, i) => {
      s.classList.toggle("is-hidden", Math.abs(i - index) > 1);
    });
  }

  prevBtns.forEach((b) =>
    b.addEventListener("click", () => goToSection(activeIndex - 1))
  );
  nextBtns.forEach((b) =>
    b.addEventListener("click", () => goToSection(activeIndex + 1))
  );

  const sections = Array.from(main.querySelectorAll(".deck-section"));

  // Scroll spy
  let ticking = false;
  main.addEventListener("scroll", () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        const idx = isDesktop()
          ? Math.round(main.scrollLeft / window.innerWidth)
          : Math.round(main.scrollTop / window.innerHeight);
        setActive(Math.max(0, Math.min(total - 1, idx)));
        ticking = false;
      });
      ticking = true;
    }
  });

  // Wheel: block deck sliding unless inside a scrollable child
  main.addEventListener(
    "wheel",
    function (e) {
      let target = e.target;
      while (target && target !== main) {
        const style = window.getComputedStyle(target);
        if (
          (target.scrollHeight > target.clientHeight &&
            ["auto", "scroll", "overlay"].includes(style.overflowY)) ||
          (target.scrollWidth > target.clientWidth &&
            ["auto", "scroll", "overlay"].includes(style.overflowX))
        ) {
          return;
        }
        target = target.parentElement;
      }
      e.preventDefault();
    },
    { passive: false }
  );

  // Keyboard arrows
  window.addEventListener("keydown", (e) => {
    if (document.querySelector(".modal-layer.is-open")) return;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") goToSection(activeIndex + 1);
    if (e.key === "ArrowLeft" || e.key === "ArrowUp") goToSection(activeIndex - 1);
  });

  setActive(0);
  prevBtns.forEach((b) => (b.disabled = true));

  /* ---------------------------------------------------------
     Reveal on view
     --------------------------------------------------------- */
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add("is-in");
      });
    },
    { threshold: 0.15 }
  );
  document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

  /* ---------------------------------------------------------
     Modais genéricos
     --------------------------------------------------------- */
  const modalLayer = document.getElementById("modal-layer");
  function openModal(html, opts) {
    opts = opts || {};
    modalLayer.innerHTML = html;
    modalLayer.classList.add("is-open");
    modalLayer.classList.remove("hidden");
    document.body.style.overflow = "hidden";
    modalLayer.querySelectorAll("[data-close]").forEach((el) =>
      el.addEventListener("click", closeModal)
    );
  }
  function closeModal() {
    modalLayer.classList.remove("is-open");
    modalLayer.classList.add("hidden");
    modalLayer.innerHTML = "";
    document.body.style.overflow = "";
  }
  modalLayer.addEventListener("click", (e) => {
    if (e.target === modalLayer || e.target.dataset.backdrop !== undefined)
      closeModal();
  });
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal();
  });
  const esc = (s) =>
    String(s == null ? "" : s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");

  /* =========================================================
     Seção 03 — Cidades (mapa + modal)
     ========================================================= */
  const cities = [
    "Araquari", "Balneário Piçarras", "Barra Velha", "Garuva",
    "Guaramirim", "Penha"
  ];
  const cityProjects = {
    Araquari: "Residencial Toscana",
    "Barra Velha": "BarraView",
    "Balneário Piçarras": "Viverde Eco Club",
    Piçarras: "Viverde Eco Club",
    Penha: "Lavitta Beach and Park"
  };
  const cityImages = {
    "Barra Velha": "https://i.imgur.com/OtvjNiL.jpg",
    "Balneário Piçarras": "https://i.imgur.com/eiBynJu.jpg",
    Piçarras: "https://i.imgur.com/eiBynJu.jpg",
    Penha: "https://i.imgur.com/QmqqD1E.jpg"
  };
  const mapMarkers = [
    { name: "Guaramirim", dx: 0, dy: -5 },
    { name: "Araquari", dx: 101, dy: -42 },
    { name: "Barra Velha", dx: 113, dy: 65 },
    { name: "Piçarras", dx: 117, dy: 117 },
    { name: "Penha", dx: 127, dy: 122 }
  ];

  function openCity(name) {
    const proj = cityProjects[name];
    if (!proj) return;
    const displayName = name === "Piçarras" ? "Balneário Piçarras" : name;
    const img = cityImages[name] || "";
    openModal(`
      <div class="absolute inset-0 bg-navy-950/80 backdrop-blur-sm" data-backdrop></div>
      <div class="relative z-10 w-full max-w-sm bg-navy-900 border border-white/10 p-6 rounded-3xl shadow-2xl flex flex-col gap-6 modal-anim">
        <button data-close class="absolute top-4 right-4 p-2 rounded-full hover:bg-white/10 transition-colors text-white/70 hover:text-white">
          <i data-lucide="x" class="w-5 h-5"></i>
        </button>
        <div>
          <h3 class="text-2xl font-bold pr-6">${esc(displayName)}</h3>
          <p class="text-sm text-soft-blue uppercase tracking-widest mt-1">Empreendimento Principal</p>
        </div>
        <div class="rounded-2xl border border-white/10 overflow-hidden bg-white/5">
          <div class="w-full aspect-video bg-white/5 flex flex-col items-center justify-center text-white/30 border-b border-white/10 relative overflow-hidden">
            ${
              img
                ? `<img src="${img}" alt="${esc(proj)}" class="absolute inset-0 w-full h-full object-cover" referrerpolicy="no-referrer">`
                : `<i data-lucide="image" class="w-10 h-10 mb-2 opacity-50"></i><span class="text-[10px] uppercase tracking-widest">Imagem em breve</span>`
            }
          </div>
          <div class="p-6 flex flex-col items-center text-center bg-gradient-to-b from-transparent to-black/20">
            <strong class="text-xl font-bold uppercase tracking-tight text-white">${esc(proj)}</strong>
          </div>
        </div>
      </div>
    `);
    if (window.lucide) window.lucide.createIcons();
  }

  // City pills
  const cityPills = document.getElementById("city-pills");
  if (cityPills) {
    cities.forEach((city) => {
      const has = !!cityProjects[city];
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className =
        "flex items-center gap-1.5 px-4 py-2 rounded-full border border-white/10 text-sm transition-colors " +
        (has
          ? "bg-white/10 hover:bg-white/20 text-white cursor-pointer shadow-sm"
          : "bg-white/5 text-soft-blue cursor-default");
      btn.innerHTML = `<i data-lucide="map-pin" class="w-4 h-4 ${
        has ? "text-white" : "text-white/50"
      }"></i>${esc(city)}${
        has ? `<span class="w-2 h-2 rounded-full bg-white ml-1 animate-pulse"></span>` : ""
      }`;
      if (has) btn.addEventListener("click", () => openCity(city));
      cityPills.appendChild(btn);
    });
  }

  // Map markers
  const markerLayer = document.getElementById("map-markers");
  if (markerLayer) {
    mapMarkers.forEach((m) => {
      const has = !!cityProjects[m.name];
      const wrap = document.createElement("div");
      wrap.className =
        "absolute top-1/2 left-1/2 group " + (has ? "cursor-pointer" : "cursor-default");
      wrap.style.transform = `translate(calc(-50% + ${m.dx}px), calc(-50% + ${m.dy}px))`;
      wrap.innerHTML = `
        <div class="relative flex items-center justify-center w-6 h-6">
          <div class="absolute w-full h-full bg-navy-600 rounded-full animate-ping opacity-20"></div>
          <div class="w-4 h-4 rounded-full border-2 shadow-lg z-10 transition-colors ${
            has ? "border-white bg-white group-hover:scale-125" : "border-white bg-navy-800"
          }"></div>
          <div class="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-navy-950 text-white text-xs font-bold rounded-lg shadow-xl whitespace-nowrap opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all pointer-events-none border border-white/10">
            ${esc(m.name)}${has ? " (Ver Empreendimento)" : ""}
            <div class="absolute top-full left-1/2 -translate-x-1/2 border-[5px] border-transparent border-t-navy-950 pointer-events-none"></div>
          </div>
        </div>`;
      if (has) wrap.addEventListener("click", () => openCity(m.name));
      markerLayer.appendChild(wrap);
    });
  }

  /* =========================================================
     Seção 05 — Estratégia comercial (gráfico)
     ========================================================= */
  const salesData = [
    { year: 2018, sales: 46, units: 251, ticket: "R$ 183 mil" },
    { year: 2019, sales: 108, units: 417, ticket: "R$ 258 mil" },
    { year: 2020, sales: 143, units: 566, ticket: "n/d" },
    { year: 2021, sales: 205, units: 700, ticket: "n/d" },
    { year: 2022, sales: 261, units: 591, ticket: "n/d" },
    { year: 2023, sales: 360, units: 500, ticket: "n/d" },
    { year: 2024, sales: 457, units: 634, ticket: "R$ 720 mil" },
    { year: 2025, sales: 185.78, units: "n/d", ticket: "n/d" }
  ];
  const chartEl = document.getElementById("sales-chart");
  if (chartEl) {
    const maxSales = Math.max(...salesData.map((d) => d.sales));
    const yTop = 500;
    const ticks = [0, 100, 200, 300, 400, 500];
    const tooltip = document.createElement("div");
    tooltip.className = "chart-tooltip";
    document.body.appendChild(tooltip);

    let html =
      '<div class="chart-yaxis">' +
      ticks.map((t) => `<span>${t}</span>`).join("") +
      "</div><div class='chart-plot'><div class='chart-gridlines'>" +
      ticks.map(() => "<span></span>").join("") +
      "</div>";
    salesData.forEach((d) => {
      const h = (d.sales / yTop) * 100;
      const isMax = d.sales === maxSales;
      html += `<div class="chart-bar-col" data-year="${d.year}">
        <div class="chart-bar ${isMax ? "is-max" : ""}" style="height:${h}%"></div>
        <div class="chart-xlabel">${d.year}</div>
      </div>`;
    });
    html += "</div>";
    chartEl.innerHTML = html;

    chartEl.querySelectorAll(".chart-bar-col").forEach((col) => {
      const d = salesData.find((x) => x.year == col.dataset.year);
      col.addEventListener("mousemove", (e) => {
        tooltip.innerHTML = `
          <p class="font-bold text-lg mb-1">${d.year}</p>
          <p class="text-sm text-soft-blue">Vendas: <strong class="text-white">R$ ${d.sales} mi</strong></p>
          <p class="text-sm text-soft-blue">Unidades: <strong class="text-white">${d.units}</strong></p>
          <p class="text-sm text-soft-blue">Ticket: <strong class="text-white">${d.ticket}</strong></p>`;
        tooltip.classList.add("is-visible");
        let x = e.clientX + 16;
        if (x + 200 > window.innerWidth) x = e.clientX - 200;
        tooltip.style.left = x + "px";
        tooltip.style.top = e.clientY - 20 + "px";
      });
      col.addEventListener("mouseleave", () =>
        tooltip.classList.remove("is-visible")
      );
    });
  }

  /* =========================================================
     Seção 09 — Premiações (cards + modal)
     ========================================================= */
  const recognitions = [
    { area: "Engenharia", title: "Prêmio Prevision", badge: "Dezembro / 2026", desc: "Conquistado em reconhecimento à excelência no planejamento de obras e à maturidade operacional na engenharia.", icon: "trophy", logoUrl: "https://i.imgur.com/MIAc3vs.png" },
    { area: "Engenharia / Qualidade", title: "Prêmio Inmeta de Excelência em Gestão", badge: "Janeiro / 2026", desc: "Prêmio de destaque que chancela a eficiência, qualidade e governança nos processos de gestão de construtoras.", icon: "sparkles", logoUrl: "https://i.imgur.com/oZZSnlC.png" },
    { area: "Institucional", title: "Selo Great Place To Work (GPTW)", badge: "Outubro / 2025", desc: "Importante certificação internacional que atesta a alta qualidade do clima organizacional e orgulho interno.", icon: "heart", logoUrl: "https://i.imgur.com/QDydlK2.png" },
    { area: "Financeiro", title: "Selo Ouro — Maturidade NPU", badge: "Dezembro / 2025", desc: "Nível máximo de certificação do Programa de Selos de Maturidade da NPU, comprovando alta eficiência financeira.", icon: "medal", logoUrl: "https://i.imgur.com/dLh1AKg.png" },
    { area: "Engenharia / Suprimentos", title: "Selo Prata — Maturidade NPU", badge: "Dezembro / 2025", desc: "Concedido pelo Programa de Selos de Maturidade, premiando a sintonia do setor de suprimentos e inteligência operacional.", icon: "award", logoUrl: "https://i.imgur.com/dLh1AKg.png" },
    { area: "Projetos", title: "Case de Sucesso Dalux", badge: "Destaque Nacional", desc: "Convite para apresentação do case de sucesso da Santer no primeiro evento oficial do Dalux no Brasil, consolidando nosso pioneirismo tecnológico.", icon: "presentation" },
    { area: "Certificações", title: "ISO 9001", badge: "Padrão Internacional", desc: "Garantia internacional de padronização, auditoria rigorosa e constante otimização dos nossos processos.", icon: "shield-check", logoUrl: "https://i.imgur.com/mLozogp.png" },
    { area: "Certificações", title: "PBQPh", badge: "Excelência em Habitat", desc: "Certificação de conformidade ao Programa Brasileiro da Qualidade e Produtividade do Habitat.", icon: "bookmark-check", logoUrl: "https://i.imgur.com/hAZJR9x.png" }
  ];
  const awardsGrid = document.getElementById("awards-grid");
  if (awardsGrid) {
    recognitions.forEach((item, i) => {
      const card = document.createElement("div");
      card.className =
        "bg-navy-900/40 border border-white/10 p-5 rounded-2xl hover:bg-navy-800/40 hover:border-soft-blue/30 cursor-pointer transition-all duration-300 flex flex-col justify-between h-36 group relative overflow-hidden";
      card.innerHTML = `
        <div class="flex items-start justify-between gap-4 z-10">
          ${
            item.logoUrl
              ? `<div class="w-10 h-10 rounded-xl bg-white flex items-center justify-center p-1.5 group-hover:scale-105 transition-all duration-300 shrink-0 shadow-md overflow-hidden"><img src="${item.logoUrl}" alt="${esc(item.title)}" class="w-full h-full object-contain" referrerpolicy="no-referrer"></div>`
              : `<div class="w-10 h-10 rounded-xl bg-soft-blue/10 border border-soft-blue/20 flex items-center justify-center text-soft-blue group-hover:bg-soft-blue/25 group-hover:scale-105 transition-all duration-300 shrink-0"><i data-lucide="${item.icon}" class="w-5 h-5"></i></div>`
          }
          <span class="text-[10px] text-white/50 uppercase tracking-widest font-semibold block bg-white/5 px-2.5 py-1 rounded-full border border-white/5 whitespace-nowrap">${esc(item.area)}</span>
        </div>
        <div class="z-10 mt-3">
          <h3 class="text-sm md:text-base font-bold text-white group-hover:text-soft-blue transition-colors duration-300 line-clamp-2 leading-snug">${esc(item.title)}</h3>
        </div>`;
      card.addEventListener("click", () => openAward(item));
      awardsGrid.appendChild(card);
    });
  }
  function openAward(item) {
    openModal(`
      <div class="absolute inset-0 bg-[#0a0f1d]/85 backdrop-blur-md" data-backdrop></div>
      <div class="relative z-10 bg-[#111827] border border-white/10 p-6 md:p-8 rounded-3xl max-w-lg w-full shadow-2xl max-h-[90vh] overflow-y-auto no-scrollbar flex flex-col modal-anim">
        <button data-close class="absolute top-4 right-4 p-2 bg-white/5 hover:bg-white/10 rounded-full text-white/70 hover:text-white transition-colors z-10"><i data-lucide="x" class="w-5 h-5"></i></button>
        <div class="flex items-center gap-4 mb-6">
          ${
            item.logoUrl
              ? `<div class="w-14 h-14 rounded-2xl bg-white flex items-center justify-center p-2 shrink-0 shadow-lg overflow-hidden"><img src="${item.logoUrl}" alt="${esc(item.title)}" class="w-full h-full object-contain" referrerpolicy="no-referrer"></div>`
              : `<div class="w-14 h-14 rounded-2xl bg-soft-blue/10 border border-soft-blue/20 flex items-center justify-center text-soft-blue shrink-0"><i data-lucide="${item.icon}" class="w-7 h-7"></i></div>`
          }
          <div>
            <span class="text-[10px] md:text-xs text-soft-blue uppercase tracking-widest font-semibold block mb-0.5">${esc(item.area)}</span>
            <h3 class="text-xl md:text-2xl font-bold text-white leading-tight">${esc(item.title)}</h3>
          </div>
        </div>
        <div class="border-t border-white/5 pt-5 mb-6"><p class="text-sm md:text-base text-white/80 leading-relaxed">${esc(item.desc)}</p></div>
        <div class="mt-auto pt-5 border-t border-white/5 flex items-start gap-4">
          <div class="w-10 h-10 rounded-full bg-white/5 border border-white/5 flex items-center justify-center shrink-0"><i data-lucide="calendar" class="w-4 h-4 text-white/50"></i></div>
          <div>
            <span class="text-xs uppercase tracking-widest font-semibold text-white/40 block mb-0.5">Reconhecimento / Período</span>
            <p class="text-sm font-semibold text-soft-blue">${esc(item.badge)}</p>
          </div>
        </div>
      </div>`);
    if (window.lucide) window.lucide.createIcons();
  }

  /* =========================================================
     Seção 10 — Vídeo institucional (modal)
     ========================================================= */
  document.querySelectorAll("[data-video]").forEach((el) => {
    el.addEventListener("click", () => {
      const title = el.dataset.videoTitle;
      const url = el.dataset.video;
      const id = (url.match(/embed\/([^?&/]+)/) || [])[1] || "";
      const watchUrl = id ? "https://www.youtube.com/watch?v=" + id : url;
      openModal(`
        <div class="absolute inset-0 bg-navy-950/80 backdrop-blur-xl" data-backdrop></div>
        <div class="relative z-10 w-full max-w-5xl rounded-[2rem] bg-navy-900 border border-white/10 shadow-2xl overflow-hidden p-6 modal-anim">
          <div class="flex justify-between items-center mb-6">
            <div>
              <div class="text-sm uppercase tracking-widest text-santer-muted mb-2">Reproduzindo</div>
              <h2 class="text-2xl md:text-3xl font-bold">${esc(title)}</h2>
            </div>
            <button data-close class="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors">✕</button>
          </div>
          <div class="video-embed border border-white/10 shadow-inner">
            <iframe src="${url}" title="${esc(title)}" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
          </div>
          <div class="mt-4 text-center">
            <a href="${watchUrl}" target="_blank" rel="noopener" class="inline-flex items-center gap-2 text-sm text-soft-blue hover:text-white transition-colors">
              <i data-lucide="external-link" class="w-4 h-4"></i>
              Caso o vídeo não carregue, abra diretamente no YouTube
            </a>
          </div>
        </div>`);
      if (window.lucide) window.lucide.createIcons();
    });
  });

  /* =========================================================
     Seção 11 — Linha do tempo (scroll horizontal)
     ========================================================= */
  const tl = document.getElementById("timeline-scroll");
  if (tl) {
    document
      .querySelector("[data-tl-left]")
      ?.addEventListener("click", () =>
        tl.scrollBy({ left: -324, behavior: "smooth" })
      );
    document
      .querySelector("[data-tl-right]")
      ?.addEventListener("click", () =>
        tl.scrollBy({ left: 324, behavior: "smooth" })
      );
    tl.addEventListener(
      "wheel",
      (e) => {
        if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
          e.stopPropagation();
        } else {
          const down = e.deltaY > 0;
          const up = e.deltaY < 0;
          if (
            (down && tl.scrollLeft < tl.scrollWidth - tl.clientWidth) ||
            (up && tl.scrollLeft > 0)
          ) {
            e.stopPropagation();
            tl.scrollBy({ left: e.deltaY, behavior: "auto" });
          }
        }
      },
      { passive: false }
    );
  }

  /* =========================================================
     Seção 13 — Benefícios (cards + modal)
     ========================================================= */
  const benefits = [
    { icon: "stethoscope", title: "Plano de Saúde", subtitle: "LEVMED",
      details: [
        "A empresa custeia 100% da mensalidade do plano para o colaborador. O colaborador participa apenas com coparticipação em consultas, exames e procedimentos realizados.",
        "Após a inclusão pelo RH, o colaborador recebe acesso à carteirinha digital. O agendamento pode ser realizado pela rede credenciada ou aplicativo LEVMED.",
        "No app, o colaborador pode acessar carteirinha virtual, guia médico, agendamentos e resultados de exames."
      ], deadline: "Até 30 dias após admissão." },
    { icon: "smile", title: "Plano Odontológico", subtitle: "ODONTO JARAGUÁ",
      details: [
        "Benefício com desconto mensal de R$ 34,00 em folha.",
        "Após inclusão realizada pelo RH, o colaborador pode acessar a rede credenciada pelo aplicativo ou portal do beneficiário, apresentando a carteirinha digital no atendimento."
      ], deadline: "Até 30 dias após admissão." },
    { icon: "utensils", title: "Cartão iFood Benefícios", subtitle: "",
      details: [
        "Valor mensal de R$ 30,00 por dia útil, em média R$ 700,00 mensais, sem desconto em folha.",
        "O cartão é liberado após admissão e ativação. O saldo pode ser utilizado diretamente no aplicativo iFood, conforme categoria liberada pela empresa."
      ], deadline: "Disponível após ativação e fechamento da folha." },
    { icon: "pill", title: "Convênio Farmácia", subtitle: "FARMÁCIA SÃO JOÃO",
      details: [
        "Compras realizadas diretamente na farmácia, com desconto em folha.",
        "Para utilizar, o colaborador deve informar o CPF no caixa da farmácia conveniada. O valor utilizado será descontado posteriormente na folha de pagamento."
      ], deadline: "Liberação após cadastro realizado pelo RH." },
    { icon: "dumbbell", title: "Convênio Academia", subtitle: "",
      details: [
        "Benefício concedido conforme critérios de assiduidade.",
        "Academias parceiras: You Gym — Guaramirim/SC, Pro Shape — Barra Velha/SC e Ultra Academia — Guaramirim/SC.",
        "Para utilizar, o colaborador deve solicitar o termo de elegibilidade com o RH. Após aprovação, recebe as orientações de acesso e utilização da academia parceira."
      ], deadline: "Disponível após ativação e fechamento da folha." },
    { icon: "graduation-cap", title: "Auxílio Educação", subtitle: "",
      details: [
        "Subsídio de até 50% da mensalidade, mediante aprovação interna.",
        "O colaborador deve apresentar a ementa do curso para validação da diretoria, formalizar a solicitação via e-mail com evidência da aprovação do seu gestor direto, realizar o pagamento da mensalidade e, após apresentar boleto e comprovante de pagamento, o RH organiza o reembolso de até 50%, conforme aprovação.",
        "O benefício pode variar conforme aderência do curso ao desenvolvimento profissional."
      ], deadline: "Disponível após 90 dias de experiência, mediante solicitação, análise e aprovação da diretoria." }
  ];
  const benefitsGrid = document.getElementById("benefits-grid");
  if (benefitsGrid) {
    benefits.forEach((b) => {
      const card = document.createElement("article");
      card.className =
        "glass-card p-6 md:p-8 rounded-3xl flex flex-col justify-between items-start transition-all duration-300 hover:bg-white/10 hover:-translate-y-1 hover:shadow-lg hover:shadow-white/5 border border-white/10 group cursor-pointer w-full";
      card.innerHTML = `
        <div class="flex flex-col gap-4">
          <div class="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white shrink-0 group-hover:bg-white/10 transition-colors"><i data-lucide="${b.icon}" class="w-6 h-6 md:w-7 md:h-7"></i></div>
          <div>
            <h3 class="text-lg md:text-xl font-bold leading-tight">${esc(b.title)}</h3>
            ${b.subtitle ? `<p class="text-[10px] md:text-xs text-soft-blue uppercase tracking-widest mt-1.5 font-semibold">${esc(b.subtitle)}</p>` : ""}
          </div>
        </div>
        <div class="mt-8 flex items-center text-[10px] md:text-xs text-white/50 uppercase tracking-widest font-semibold group-hover:text-white transition-colors">Ver detalhes <i data-lucide="chevron-right" class="w-3 h-3 md:w-4 md:h-4 ml-1"></i></div>`;
      card.addEventListener("click", () => openBenefit(b));
      benefitsGrid.appendChild(card);
    });
  }
  function openBenefit(b) {
    openModal(`
      <div class="absolute inset-0 bg-[#0a0f1d]/80 backdrop-blur-md" data-backdrop></div>
      <div class="relative z-10 bg-[#111827] border border-white/10 p-6 md:p-8 md:pt-10 rounded-3xl max-w-lg w-full shadow-2xl max-h-[90vh] overflow-y-auto no-scrollbar flex flex-col modal-anim">
        <button data-close class="absolute top-4 right-4 p-2 bg-white/5 hover:bg-white/10 rounded-full text-white/70 hover:text-white transition-colors z-10"><i data-lucide="x" class="w-5 h-5"></i></button>
        <div class="flex items-center gap-4 mb-8 pr-8">
          <div class="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white shrink-0"><i data-lucide="${b.icon}" class="w-7 h-7"></i></div>
          <div>
            <h3 class="text-2xl font-bold text-white leading-tight">${esc(b.title)}</h3>
            ${b.subtitle ? `<p class="text-[10px] md:text-xs text-soft-blue uppercase tracking-widest mt-1.5 font-semibold">${esc(b.subtitle)}</p>` : ""}
          </div>
        </div>
        <div class="space-y-4 mb-8">${b.details.map((d) => `<p class="text-sm md:text-base text-white/80 leading-relaxed">${esc(d)}</p>`).join("")}</div>
        <div class="mt-auto pt-5 border-t border-white/10 flex items-start gap-4">
          <div class="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center shrink-0"><i data-lucide="clock" class="w-4 h-4 text-white/50"></i></div>
          <div>
            <span class="text-xs uppercase tracking-widest font-semibold text-white/40 block mb-1">Prazo estimado</span>
            <p class="text-sm font-medium text-white/90">${esc(b.deadline)}</p>
          </div>
        </div>
      </div>`);
    if (window.lucide) window.lucide.createIcons();
  }

  /* =========================================================
     Seção 14 — Ausências legais (toggle)
     ========================================================= */
  const absBtn = document.getElementById("absences-toggle");
  const absPanel = document.getElementById("absences-panel");
  if (absBtn && absPanel) {
    absBtn.addEventListener("click", () => {
      const open = absPanel.classList.toggle("hidden") === false;
      absBtn.querySelector("[data-abs-label]").textContent = open
        ? "Recolher ausências"
        : "Visualizar ausências permitidas";
      absBtn.querySelector("[data-lucide]").setAttribute(
        "data-lucide",
        open ? "chevron-up" : "chevron-down"
      );
      if (window.lucide) window.lucide.createIcons();
    });
  }

  /* =========================================================
     Seção 15 — O Futuro (sistemas por setor)
     ========================================================= */
  const categories = [
    { id: "comercial", name: "Comercial", icon: "trending-up", systems: [
      { name: "CV CRM", desc: "Gestão de leads, funil de vendas, relacionamento com clientes e acompanhamento de negociações comerciais." },
      { name: "RD Station Conversas", desc: "Atendimento ao cliente e acompanhamento das interações comerciais e suporte." },
      { name: "Z2A", desc: "Ferramenta de inteligência artificial e apoio à gestão comercial e análises estratégicas." },
      { name: "Power BI", desc: "Dashboard e análise de indicadores comerciais, performance de vendas e acompanhamento de resultados." }
    ]},
    { id: "marketing", name: "Marketing", icon: "megaphone", systems: [
      { name: "RD Station Marketing", desc: "Automação de marketing, campanhas digitais, nutrição de leads e estratégias de relacionamento." },
      { name: "Canva", desc: "Criação de materiais gráficos, apresentações e comunicação visual interna e externa." },
      { name: "CapCut", desc: "Edição de vídeos para campanhas, redes sociais e comunicação institucional." },
      { name: "Adobe", desc: "Ferramentas de design, edição e produção criativa de materiais institucionais." },
      { name: "Bitly", desc: "Gestão e encurtamento de links para campanhas e ações digitais." },
      { name: "Banlek", desc: "Apoio à gestão de processos digitais e atividades da área de marketing." },
      { name: "Mlabs", desc: "Planejamento, agendamento e acompanhamento de redes sociais." },
      { name: "BotConversa", desc: "Automação de comunicação e relacionamento com clientes em canais digitais." },
      { name: "ChatGPT Pro", desc: "Apoio na criação de conteúdos, produtividade e otimização de processos internos." }
    ]},
    { id: "engenharia", name: "Engenharia / Obras", icon: "hard-hat", systems: [
      { name: "Inmeta", desc: "Gestão de obras e assistência técnica com foco em acompanhamento operacional." },
      { name: "Prevision", desc: "Planejamento e controle de cronogramas, produtividade e gestão da engenharia." },
      { name: "Dalux", desc: "Gestão de projetos, documentação técnica e acompanhamento de obras." },
      { name: "Revit", desc: "Modelagem técnica e desenvolvimento de projetos de engenharia e arquitetura." },
      { name: "GestarCad", desc: "Gestão de documentação técnica e processos de projetos." },
      { name: "SketchUp", desc: "Modelagem 3D e visualização de projetos arquitetônicos e técnicos." }
    ]},
    { id: "financeiro", name: "Finanças & Controladoria", icon: "credit-card", systems: [
      { name: "Lever Pro", desc: "Controle financeiro, análise de indicadores e apoio à controladoria." },
      { name: "RD Station Conversas", desc: "Plataforma utilizada para centralizar o atendimento e o relacionamento com clientes, permitindo o gerenciamento das conversas, acompanhamento de solicitações e registro do histórico de interações, proporcionando um atendimento mais ágil e organizado." }
    ]},
    { id: "rh", name: "Recursos Humanos", icon: "users", systems: [
      { name: "Sênior (Rubi)", desc: "Sistema de gestão de folha de pagamento e administração de pessoal, utilizado para apoiar processos de fechamento de folha, cálculos trabalhistas, férias, 13º salário, rescisões, encargos sociais e demais rotinas de Departamento Pessoal. A ferramenta contribui para maior agilidade, precisão e conformidade com a legislação trabalhista, garantindo segurança das informações e integração entre empresa, RH e contabilidade." },
      { name: "Qulture", desc: "Gestão de desempenho, avaliações, feedbacks, PDI e desenvolvimento de pessoas." },
      { name: "Reloponto", desc: "Controle de ponto, jornada de trabalho e banco de horas." },
      { name: "Autodoc", desc: "Gestão documental e processos de administração de pessoal." }
    ]},
    { id: "legalizacao", name: "Legalização & Adm.", icon: "file-text", systems: [
      { name: "Mastertax", desc: "Emissão de certidões, legalizações e documentos fiscais e regulatórios." },
      { name: "Dalux", desc: "Plataforma utilizada para gestão de documentos, projetos e acompanhamento de processos relacionados à legalização dos empreendimentos, facilitando o acesso às informações e a colaboração entre as equipes envolvidas." }
    ]},
    { id: "suprimentos", name: "Suprimentos", icon: "shopping-cart", systems: [
      { name: "Construmarket", desc: "Gestão de compras e fornecedores." }
    ]},
    { id: "expansao", name: "Expansão", icon: "compass", systems: [
      { name: "Viabil", desc: "Estudos de viabilidade, análise de novos projetos e expansão territorial." },
      { name: "Google Earth", desc: "Análise geográfica, territorial e apoio na prospecção de novos empreendimentos." }
    ]},
    { id: "ti", name: "Tecnologia da Informação", icon: "terminal", systems: [
      { name: "GitHub Copilot", desc: "Apoio ao desenvolvimento, automação e produtividade da equipe de tecnologia." },
      { name: "GitHub", desc: "Plataforma utilizada para hospedagem, versionamento e gerenciamento de código-fonte, permitindo o desenvolvimento colaborativo, controle de versões, documentação de projetos e acompanhamento das entregas da equipe de TI." }
    ]},
    { id: "geral", name: "Sistemas Gerais", icon: "layers", systems: [
      { name: "Hinc", desc: "Sistema de gestão geral para apoio administrativo, operacional e acompanhamento interno.", url: "https://santer360.learning.rocks/contents/1679351?ref=pages&ref_detail=home" },
      { name: "Strato", desc: "Apoio a gestão de processos internos e controles administrativos." },
      { name: "Sispro", desc: "Sistema utilizado em rotinas operacionais e administrativas diversas." },
      { name: "Sienge", desc: "ERP da construção civil com integração financeira, administrativa e operacional." }
    ]}
  ];
  const catNav = document.getElementById("tools-cats");
  const catPanel = document.getElementById("tools-panel");
  if (catNav && catPanel) {
    let selectedCat = "comercial";
    categories.forEach((cat) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.dataset.cat = cat.id;
      btn.className =
        "tools-cat flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs md:text-sm font-medium transition-all duration-300 shrink-0 whitespace-nowrap text-left text-white/60 hover:text-white hover:bg-white/5 border border-transparent";
      btn.innerHTML = `<i data-lucide="${cat.icon}" class="w-4 h-4 shrink-0 text-white/40"></i><span class="truncate">${esc(cat.name)}</span>`;
      btn.addEventListener("click", () => selectCat(cat.id));
      catNav.appendChild(btn);
    });
    function selectCat(id) {
      selectedCat = id;
      catNav.querySelectorAll(".tools-cat").forEach((b) => {
        const on = b.dataset.cat === id;
        b.classList.toggle("bg-soft-blue/25", on);
        b.classList.toggle("text-white", on);
        b.classList.toggle("border-soft-blue/30", on);
        b.classList.toggle("shadow-md", on);
        b.classList.toggle("text-white/60", !on);
        b.classList.toggle("border-transparent", !on);
        const ic = b.querySelector("[data-lucide]");
        if (ic) {
          ic.classList.toggle("text-soft-blue", on);
          ic.classList.toggle("text-white/40", !on);
        }
      });
      const cat = categories.find((c) => c.id === id);
      const count = cat.systems.length;
      catPanel.innerHTML = `
        <div class="flex items-center justify-between mb-4 border-b border-white/5 pb-3">
          <div class="flex items-center gap-2"><i data-lucide="${cat.icon}" class="w-5 h-5 text-soft-blue"></i><h3 class="font-bold text-base md:text-lg text-white">${esc(cat.name)}</h3></div>
          <span class="text-xs text-white/40 font-mono">${count} ${count === 1 ? "sistema cadastrado" : "sistemas cadastrados"}</span>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          ${cat.systems.map((s) => {
            const tag = s.url ? "a" : "div";
            const attrs = s.url ? ` href="${esc(s.url)}" target="_blank" rel="noopener noreferrer"` : "";
            return `
            <${tag}${attrs} class="bg-navy-900/40 border border-white/10 p-4 rounded-2xl flex flex-col justify-between hover:border-white/20 hover:bg-navy-800/20 transition-all duration-300 group${s.url ? " cursor-pointer" : ""}">
              <div>
                <h4 class="font-bold text-white text-sm md:text-base mb-1.5 group-hover:text-soft-blue transition-colors duration-300 flex items-center justify-between gap-2"><span>${esc(s.name)}</span><i data-lucide="chevron-right" class="w-4 h-4 text-white/10 group-hover:text-soft-blue group-hover:translate-x-0.5 transition-all duration-300"></i></h4>
                <p class="text-xs md:text-sm text-white/70 leading-relaxed">${esc(s.desc)}</p>
              </div>
            </${tag}>`;
          }).join("")}
        </div>`;
      if (window.lucide) window.lucide.createIcons();
    }
    selectCat("comercial");
  }

  /* =========================================================
     Fechamento — botões
     ========================================================= */
  document
    .querySelector("[data-open-site]")
    ?.addEventListener("click", () =>
      window.open("https://santerempreendimentos.com.br", "_blank")
    );
  document
    .querySelector("[data-back-home]")
    ?.addEventListener("click", () => goToSection(0));

  /* Ícones iniciais */
  if (window.lucide) window.lucide.createIcons();

  window.addEventListener("resize", () => {
    // keep active section aligned after resize orientation change
    goToSection(activeIndex);
  });
})();
