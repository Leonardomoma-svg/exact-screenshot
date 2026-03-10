import { useEffect, useMemo, useRef, useState } from "react";

const AragonSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const gloveIntervalRef = useRef<number | null>(null);
  const gloveResumeTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.1 }
    );
    ref.current?.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  const gloveImages = useMemo(
    () => [
      "/04-RojoPlata-1.jpg",
      "/01-CafeDorado-1.jpg",
      "/02-Azul-1.jpg",
      "/03-Menta-1.jpg",
      "/05-Lila-1.jpg",
      "/06-FusciaAqua-1.jpg",
      "/07-VerdeBeige-1.jpg",
      "/08-CafeLeon-1.jpg",
      "/09-DoradoChava-1.jpg",
      "/10-Plateados-1.jpg",
      "/11-Tricolor-1.jpg",
      "/12-VerdeDorado-1.jpg",
      "/13-AzulChiki-1.jpg",
      "/15-RojoVerde-1.jpg",
      "/17_AzulLeon-1.jpg",
      "/19-Dordao-1.jpg",
      "/21-TricolorMX-1.jpg",
      "/23-Naranjas-1.jpg",
    ],
    [],
  );

  const maskImages = useMemo(
    () => [
      "/25-CaretaTurquesa-1.jpg",
    ],
    [],
  );

  const [activeGloveIndex, setActiveGloveIndex] = useState(0);
  const [displayGloveIndex, setDisplayGloveIndex] = useState(0);
  const [isGloveFading, setIsGloveFading] = useState(false);
  const [isGloveAutoPaused, setIsGloveAutoPaused] = useState(false);

  const [activeMaskIndex, setActiveMaskIndex] = useState(0);
  const [displayMaskIndex, setDisplayMaskIndex] = useState(0);
  const [isMaskFading, setIsMaskFading] = useState(false);

  useEffect(() => {
    if (gloveImages.length <= 1) return;

    if (isGloveAutoPaused) {
      if (gloveIntervalRef.current) window.clearInterval(gloveIntervalRef.current);
      gloveIntervalRef.current = null;
      return;
    }

    if (gloveIntervalRef.current) window.clearInterval(gloveIntervalRef.current);
    gloveIntervalRef.current = window.setInterval(() => {
      setActiveGloveIndex((i) => (i + 1) % gloveImages.length);
    }, 4500);

    return () => {
      if (gloveIntervalRef.current) window.clearInterval(gloveIntervalRef.current);
      gloveIntervalRef.current = null;
    };
  }, [gloveImages.length, isGloveAutoPaused]);

  useEffect(() => {
    if (maskImages.length <= 1) return;
    const id = window.setInterval(() => {
      setActiveMaskIndex((i) => (i + 1) % maskImages.length);
    }, 4500);
    return () => window.clearInterval(id);
  }, [maskImages.length]);

  useEffect(() => {
    if (displayGloveIndex === activeGloveIndex) return;
    setIsGloveFading(true);
    const t = window.setTimeout(() => {
      setDisplayGloveIndex(activeGloveIndex);
      setIsGloveFading(false);
    }, 300);
    return () => window.clearTimeout(t);
  }, [activeGloveIndex, displayGloveIndex]);

  useEffect(() => {
    if (displayMaskIndex === activeMaskIndex) return;
    setIsMaskFading(true);
    const t = window.setTimeout(() => {
      setDisplayMaskIndex(activeMaskIndex);
      setIsMaskFading(false);
    }, 300);
    return () => window.clearTimeout(t);
  }, [activeMaskIndex, displayMaskIndex]);

  const pauseGloveAuto = () => {
    setIsGloveAutoPaused(true);
    if (gloveResumeTimeoutRef.current) window.clearTimeout(gloveResumeTimeoutRef.current);
    gloveResumeTimeoutRef.current = window.setTimeout(() => {
      setIsGloveAutoPaused(false);
      gloveResumeTimeoutRef.current = null;
    }, 4000);
  };

  const prevGlove = () => {
    pauseGloveAuto();
    setActiveGloveIndex((i) => (i - 1 + gloveImages.length) % gloveImages.length);
  };
  const nextGlove = () => {
    pauseGloveAuto();
    setActiveGloveIndex((i) => (i + 1) % gloveImages.length);
  };

  const prevMask = () =>
    setActiveMaskIndex((i) => (i - 1 + maskImages.length) % maskImages.length);
  const nextMask = () =>
    setActiveMaskIndex((i) => (i + 1) % maskImages.length);

  const features = [
    { name: "Piel Premium", desc: "Cuero genuino de alta resistencia para máxima durabilidad." },
    { name: "Multi-capa", desc: "Sistema de espuma trilaminar para protección superior." },
    { name: "Diseño Corner", desc: "Ediciones exclusivas disponibles solo para miembros." },
    { name: "Tallas 10–16 oz", desc: "Para entrenamiento, sparring y competencia." },
  ];

  return (
    <section id="aragon" className="bg-navy-2 py-[100px] px-6 md:px-[60px] relative overflow-visible" ref={ref}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        {/* Visual */}
        <div className="reveal hidden lg:flex relative items-center justify-center">
          <div className="relative w-[520px] h-[520px] xl:w-[600px] xl:h-[600px] flex items-center justify-center">
            <div className="relative z-10 h-full flex flex-col">
              <div className="h-full flex flex-col">
                <div className="flex-1 flex items-center justify-center overflow-visible">
                  <div className="w-[280px] h-[220px] relative flex-shrink-0">
                    <img
                      src={gloveImages[displayGloveIndex]}
                      alt="Guantes Aragón"
                      className={`absolute inset-0 w-full h-full object-contain transition-opacity duration-300 ${
                        isGloveFading ? "opacity-0" : "opacity-100"
                      }`}
                      draggable={false}
                    />
                    {isGloveFading && (
                      <img
                        src={gloveImages[activeGloveIndex]}
                        alt="Guantes Aragón"
                        className="absolute inset-0 w-full h-full object-contain opacity-100"
                        draggable={false}
                      />
                    )}
                    <button
                      type="button"
                      onClick={prevGlove}
                      className="absolute left-0 top-1/2 -translate-y-1/2 h-12 w-12 -translate-x-2 rounded-full bg-white/20 border border-white/30 text-white shadow-[0_14px_40px_rgba(0,0,0,0.55)] hover:bg-white/30 transition-colors text-[2rem] leading-none"
                      aria-label="Modelo anterior"
                    >
                      ‹
                    </button>
                    <button
                      type="button"
                      onClick={nextGlove}
                      className="absolute right-0 top-1/2 -translate-y-1/2 h-12 w-12 translate-x-2 rounded-full bg-white/20 border border-white/30 text-white shadow-[0_14px_40px_rgba(0,0,0,0.55)] hover:bg-white/30 transition-colors text-[2rem] leading-none"
                      aria-label="Siguiente modelo"
                    >
                      ›
                    </button>
                    <div className="absolute bottom-[-40px] left-0 right-0 grid grid-flow-col grid-rows-2 justify-center gap-x-2 gap-y-2">
                      {gloveImages.map((_, i) => (
                        <button
                          key={i}
                          type="button"
                          onClick={() => {
                            pauseGloveAuto();
                            setActiveGloveIndex(i);
                          }}
                          className={`h-2.5 w-2.5 rounded-full transition-all duration-200 ${
                            i === activeGloveIndex
                              ? "bg-electric scale-[1.25]"
                              : "bg-white/25 hover:bg-white/65"
                          }`}
                          aria-label={`Ver guante ${i + 1}`}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex-1 flex items-center justify-center overflow-hidden">
                  <div className="w-[280px] h-[220px] relative flex-shrink-0">
                    <img
                      src={maskImages[displayMaskIndex]}
                      alt="Caretas Aragón"
                      className={`absolute inset-0 w-full h-full object-contain transition-opacity duration-300 ${
                        isMaskFading ? "opacity-0" : "opacity-100"
                      }`}
                      draggable={false}
                    />
                    {isMaskFading && (
                      <img
                        src={maskImages[activeMaskIndex]}
                        alt="Caretas Aragón"
                        className="absolute inset-0 w-full h-full object-contain opacity-100"
                        draggable={false}
                      />
                    )}
                    <button
                      type="button"
                      onClick={prevMask}
                      className="absolute left-0 top-1/2 -translate-y-1/2 h-12 w-12 -translate-x-2 rounded-full bg-white/20 border border-white/30 text-white shadow-[0_14px_40px_rgba(0,0,0,0.55)] hover:bg-white/30 transition-colors text-[2rem] leading-none"
                      aria-label="Modelo anterior"
                    >
                      ‹
                    </button>
                    <button
                      type="button"
                      onClick={nextMask}
                      className="absolute right-0 top-1/2 -translate-y-1/2 h-12 w-12 translate-x-2 rounded-full bg-white/20 border border-white/30 text-white shadow-[0_14px_40px_rgba(0,0,0,0.55)] hover:bg-white/30 transition-colors text-[2rem] leading-none"
                      aria-label="Siguiente modelo"
                    >
                      ›
                    </button>
                    <div className="absolute bottom-[-28px] left-0 right-0 flex justify-center gap-2">
                      {maskImages.map((_, i) => (
                        <button
                          key={i}
                          type="button"
                          onClick={() => setActiveMaskIndex(i)}
                          className={`h-2.5 w-2.5 rounded-full transition-all duration-200 ${
                            i === activeMaskIndex
                              ? "bg-electric scale-[1.25]"
                              : "bg-white/25 hover:bg-white/65"
                          }`}
                          aria-label={`Ver careta ${i + 1}`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div>
          <div className="reveal mb-1 grid grid-cols-1 sm:grid-cols-[1fr_auto] items-start sm:items-center gap-4">
            <div className="font-display font-semibold text-[0.75rem] tracking-[0.35em] uppercase text-electric flex items-center gap-3">
              <span className="w-6 h-0.5 bg-electric" />
              Marca Oficial
            </div>

            <img
              src="/Aragon-sinmarco-sinfondo.png"
              alt="Aragón"
              className="block w-[min(420px,92%)] sm:w-[420px] h-auto object-contain justify-self-start sm:justify-self-end"
              draggable={false}
            />
          </div>

          <div className="reveal lg:hidden mt-6 flex items-center justify-center">
            <div className="w-full max-w-[420px] flex flex-col items-center justify-center">
              <div className="relative w-full flex flex-col gap-10">
                <div className="relative w-full flex items-center justify-center">
                  <div className="w-[260px] h-[210px] relative flex-shrink-0">
                    <img
                      src={gloveImages[displayGloveIndex]}
                      alt="Guantes Aragón"
                      className={`absolute inset-0 w-full h-full object-contain transition-opacity duration-300 ${
                        isGloveFading ? "opacity-0" : "opacity-100"
                      }`}
                      draggable={false}
                    />
                    {isGloveFading && (
                      <img
                        src={gloveImages[activeGloveIndex]}
                        alt="Guantes Aragón"
                        className="absolute inset-0 w-full h-full object-contain opacity-100"
                        draggable={false}
                      />
                    )}
                    <button
                      type="button"
                      onClick={prevGlove}
                      className="absolute left-0 top-1/2 -translate-y-1/2 h-11 w-11 -translate-x-2 rounded-full bg-white/20 border border-white/30 text-white shadow-[0_14px_40px_rgba(0,0,0,0.55)] hover:bg-white/30 transition-colors text-[1.8rem] leading-none"
                      aria-label="Modelo anterior"
                    >
                      ‹
                    </button>
                    <button
                      type="button"
                      onClick={nextGlove}
                      className="absolute right-0 top-1/2 -translate-y-1/2 h-11 w-11 translate-x-2 rounded-full bg-white/20 border border-white/30 text-white shadow-[0_14px_40px_rgba(0,0,0,0.55)] hover:bg-white/30 transition-colors text-[1.8rem] leading-none"
                      aria-label="Siguiente modelo"
                    >
                      ›
                    </button>
                    <div className="absolute bottom-[-34px] left-0 right-0 grid grid-flow-col grid-rows-2 justify-center gap-x-2 gap-y-2">
                      {gloveImages.map((_, i) => (
                        <button
                          key={i}
                          type="button"
                          onClick={() => {
                            pauseGloveAuto();
                            setActiveGloveIndex(i);
                          }}
                          className={`h-2.5 w-2.5 rounded-full transition-all duration-200 ${
                            i === activeGloveIndex
                              ? "bg-electric scale-[1.25]"
                              : "bg-white/25 hover:bg-white/65"
                          }`}
                          aria-label={`Ver guante ${i + 1}`}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                <div className="relative w-full flex items-center justify-center">
                  <div className="w-[260px] h-[210px] relative flex-shrink-0">
                    <img
                      src={maskImages[displayMaskIndex]}
                      alt="Caretas Aragón"
                      className={`absolute inset-0 w-full h-full object-contain transition-opacity duration-300 ${
                        isMaskFading ? "opacity-0" : "opacity-100"
                      }`}
                      draggable={false}
                    />
                    {isMaskFading && (
                      <img
                        src={maskImages[activeMaskIndex]}
                        alt="Caretas Aragón"
                        className="absolute inset-0 w-full h-full object-contain opacity-100"
                        draggable={false}
                      />
                    )}
                    <button
                      type="button"
                      onClick={prevMask}
                      className="absolute left-0 top-1/2 -translate-y-1/2 h-11 w-11 -translate-x-2 rounded-full bg-white/20 border border-white/30 text-white shadow-[0_14px_40px_rgba(0,0,0,0.55)] hover:bg-white/30 transition-colors text-[1.8rem] leading-none"
                      aria-label="Modelo anterior"
                    >
                      ‹
                    </button>
                    <button
                      type="button"
                      onClick={nextMask}
                      className="absolute right-0 top-1/2 -translate-y-1/2 h-11 w-11 translate-x-2 rounded-full bg-white/20 border border-white/30 text-white shadow-[0_14px_40px_rgba(0,0,0,0.55)] hover:bg-white/30 transition-colors text-[1.8rem] leading-none"
                      aria-label="Siguiente modelo"
                    >
                      ›
                    </button>
                    <div className="absolute bottom-[-26px] left-0 right-0 flex justify-center gap-2">
                      {maskImages.map((_, i) => (
                        <button
                          key={i}
                          type="button"
                          onClick={() => setActiveMaskIndex(i)}
                          className={`h-2.5 w-2.5 rounded-full transition-all duration-200 ${
                            i === activeMaskIndex
                              ? "bg-electric scale-[1.25]"
                              : "bg-white/25 hover:bg-white/65"
                          }`}
                          aria-label={`Ver careta ${i + 1}`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <p className="reveal text-base text-grey leading-snug mb-6 mt-8 lg:mt-0">
            Aragón es la marca de guantes oficial de Corner. Diseñados y probados en nuestro gimnasio, cada par está construido para resistir los entrenamientos más intensos sin sacrificar protección ni comodidad.
          </p>
          <div className="reveal grid grid-cols-1 sm:grid-cols-2 gap-5 mb-11">
            {features.map((f) => (
              <div
                key={f.name}
                className={`bg-navy-3 p-5 border-l-[3px] border-l-electric ${
                  f.name === "Diseño Corner" || f.name === "Tallas 10–16 oz"
                    ? "hidden sm:block"
                    : ""
                }`}
              >
                <div className="font-display font-bold text-[0.85rem] uppercase tracking-wider mb-1.5">{f.name}</div>
                <div className="text-[0.8rem] text-grey">{f.desc}</div>
              </div>
            ))}
          </div>
          <button
            onClick={() => scrollTo("galeria-aragon")}
            className="reveal font-display font-bold text-[0.9rem] tracking-[0.2em] uppercase bg-electric text-foreground border-none py-[18px] px-11 clip-skew hover:bg-electric-hover hover:-translate-y-0.5 transition-all"
          >
            Ver Colección Aragón
          </button>
        </div>
      </div>
    </section>
  );
};

export default AragonSection;
