import { useEffect, useMemo, useState } from "react";

type HeroMedia =
  | { type: "image"; src: string }
  | { type: "video"; src: string };

const Hero = () => {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const media = useMemo<HeroMedia[]>(
    () => [
      { type: "video", src: "/videosparring.mp4" },
      { type: "image", src: "/fotocorner.jpg" },
      { type: "image", src: "/466735289_18063462832823411_3009361582022820811_n.jpg" },
      { type: "image", src: "/j.jpg" },
    ],
    [],
  );

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (media.length <= 1) return;

    const id = window.setInterval(() => {
      setActiveIndex((i) => (i + 1) % media.length);
    }, 7500);

    return () => window.clearInterval(id);
  }, [media.length]);

  return (
    <section id="hero" className="min-h-screen relative flex items-start md:items-center overflow-hidden">
      {/* Background layers */}
      <div className="absolute inset-0">
        {media.map((m, i) => {
          if (m.type === "video") {
            return (
              <div
                key={m.src}
                className="absolute inset-0 transition-opacity duration-1000"
                style={{ opacity: i === activeIndex ? 1 : 0 }}
              >
                <video
                  className="h-full w-full object-contain md:object-cover bg-black"
                  src={m.src}
                  autoPlay
                  muted
                  loop
                  playsInline
                />
              </div>
            );
          }

          return (
            <div
              key={m.src}
              className="absolute inset-0 transition-opacity duration-1000"
              style={{ opacity: i === activeIndex ? 1 : 0 }}
            >
              <img
                src={m.src}
                alt=""
                className="h-full w-full object-contain md:object-cover bg-black"
                draggable={false}
                loading="lazy"
              />
            </div>
          );
        })}
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/55 to-black/20" />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 70% 50%, hsla(0, 0%, 0%, 0.45) 0%, transparent 70%), radial-gradient(ellipse 40% 80% at 20% 60%, hsla(214, 80%, 48%, 0.10) 0%, transparent 60%)",
        }}
      />
      {/* Ring lines grid */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(to right, hsla(214, 80%, 48%, 0.04) 1px, transparent 1px), linear-gradient(to bottom, hsla(214, 80%, 48%, 0.04) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />
      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-electric to-transparent" />

      {/* Content */}
      <div className="relative z-10 px-6 md:px-[60px] max-w-[900px] pt-6 md:pt-20">
        <p
          className="font-display font-semibold text-[0.8rem] tracking-[0.35em] uppercase text-electric mb-4 md:mb-6 opacity-0 animate-fade-up"
          style={{ animationDelay: "0.3s" }}
        >
          <span className="inline-block w-10 h-px bg-electric align-middle mr-3" />
          Academia de Boxeo — Monterrey, N.L.
        </p>

        <h1
          className="mt-10 md:mt-0 font-display font-black text-[clamp(3.3rem,9.8vw,5.6rem)] md:text-[clamp(4.1rem,10.8vw,9.5rem)] leading-[0.88] uppercase tracking-tight opacity-0 animate-fade-up"
          style={{ animationDelay: "0.5s" }}
        >
          Entra al
          <br />
          <span className="text-stroke block">Ring.</span>
          <span className="text-electric block italic">Domina.</span>
        </h1>

        <p
          className="text-base md:text-lg text-grey max-w-[460px] leading-relaxed mt-6 md:mt-8 mb-10 md:mb-12 opacity-0 animate-fade-up"
          style={{ animationDelay: "0.7s" }}
        >
          Entrenamiento de alto rendimiento para todos los niveles. Técnica, disciplina y la mentalidad de un campeón.
        </p>

        <div
          className="flex gap-5 items-center opacity-0 animate-fade-up"
          style={{ animationDelay: "0.9s" }}
        >
          <button
            onClick={() => scrollTo("contacto")}
            className="font-display font-bold text-[0.9rem] tracking-[0.2em] uppercase bg-electric text-foreground border-none py-[18px] px-11 clip-skew hover:bg-electric-hover hover:-translate-y-0.5 transition-all inline-block"
          >
            Empieza Ahora
          </button>
          <a
            href="#clases"
            onClick={(e) => { e.preventDefault(); scrollTo("clases"); }}
            className="font-display font-semibold text-[0.9rem] tracking-[0.2em] uppercase text-grey no-underline flex items-center gap-2.5 hover:text-foreground transition-colors group"
          >
            Ver Clases
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="group-hover:translate-x-1 transition-transform">
              <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>
      </div>

      {/* Hero stats */}
      <div
        className="absolute right-[60px] bottom-20 flex-col gap-8 hidden lg:flex opacity-0 animate-fade-in"
        style={{ animationDelay: "1.2s" }}
      >
        {[
          { num: "12", suffix: "+", label: "Años de experiencia" },
          { num: "400", suffix: "+", label: "Miembros activos" },
          { num: "38", suffix: "", label: "Campeones formados" },
        ].map((stat) => (
          <div key={stat.label} className="text-right">
            <div className="font-display font-black text-[2.8rem] leading-none text-foreground">
              {stat.num}<span className="text-electric">{stat.suffix}</span>
            </div>
            <div className="text-[0.75rem] tracking-[0.2em] uppercase text-grey">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-10 left-6 md:left-[60px] flex items-center gap-3 opacity-0 animate-fade-in"
        style={{ animationDelay: "1.4s" }}
      >
        <div className="w-px h-[50px] bg-gradient-to-b from-transparent to-dim animate-scroll-pulse" />
        <span className="font-display text-[0.7rem] tracking-[0.3em] uppercase text-dim" style={{ writingMode: "vertical-rl" }}>
          Scroll
        </span>
      </div>
    </section>
  );
};

export default Hero;
