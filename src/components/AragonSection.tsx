import { useEffect, useRef } from "react";

const AragonSection = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.1 }
    );
    ref.current?.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  const features = [
    { name: "Piel Premium", desc: "Cuero genuino de alta resistencia para máxima durabilidad." },
    { name: "Multi-capa", desc: "Sistema de espuma trilaminar para protección superior." },
    { name: "Diseño Corner", desc: "Ediciones exclusivas disponibles solo para miembros." },
    { name: "Tallas 10–16 oz", desc: "Para entrenamiento, sparring y competencia." },
  ];

  return (
    <section id="aragon" className="bg-navy-2 py-[100px] px-6 md:px-[60px] relative overflow-hidden" ref={ref}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        {/* Visual */}
        <div className="reveal hidden lg:flex relative aspect-square items-center justify-center">
          <div className="w-[320px] h-[320px] rounded-full border border-primary/20 absolute animate-spin-slow">
            <span className="absolute top-1/2 -left-1 w-2 h-2 bg-electric rounded-full -translate-y-1/2" />
          </div>
          <div className="w-[240px] h-[240px] rounded-full border border-primary/15 absolute animate-spin-slow-reverse">
            <span className="absolute top-1/2 -left-1 w-2 h-2 bg-electric rounded-full -translate-y-1/2" />
          </div>
          <div className="w-[160px] h-[160px] bg-secondary border-2 border-accent flex items-center justify-center relative z-10 clip-skew-lg">
            <div className="font-display font-black text-[2rem] uppercase tracking-wider text-center leading-none">
              <span className="text-electric block text-[2.8rem]">ARAGÓN</span>
              GLOVES
            </div>
          </div>
        </div>

        {/* Content */}
        <div>
          <div className="reveal font-display font-semibold text-[0.75rem] tracking-[0.35em] uppercase text-electric mb-4 flex items-center gap-3">
            <span className="w-6 h-0.5 bg-electric" />
            Marca Oficial
          </div>
          <h2 className="reveal font-display font-black text-[clamp(2.5rem,5vw,4.5rem)] uppercase leading-[0.9] mb-6">
            Guantes<br /><em className="italic text-stroke not-italic">ARAGÓN</em>
          </h2>
          <p className="reveal text-base text-grey leading-relaxed mb-10">
            Aragón es la marca de guantes oficial de Corner. Diseñados y probados en nuestro gimnasio, cada par está construido para resistir los entrenamientos más intensos sin sacrificar protección ni comodidad.
          </p>
          <div className="reveal grid grid-cols-1 sm:grid-cols-2 gap-5 mb-11">
            {features.map((f) => (
              <div key={f.name} className="bg-navy-3 p-5 border-l-[3px] border-l-electric">
                <div className="font-display font-bold text-[0.85rem] uppercase tracking-wider mb-1.5">{f.name}</div>
                <div className="text-[0.8rem] text-grey">{f.desc}</div>
              </div>
            ))}
          </div>
          <button
            onClick={() => scrollTo("contacto")}
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
