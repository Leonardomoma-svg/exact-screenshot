import { useEffect, useRef } from "react";

const plans = [
  {
    name: "Contendiente",
    price: "599",
    featured: false,
    features: [
      { text: "4 clases grupales / semana", included: true },
      { text: "Acceso a área de bolsas", included: true },
      { text: "Vestuarios y lockers", included: true },
      { text: "Clases de Kids Boxing", included: false },
      { text: "Sesiones de sparring", included: false },
      { text: "Descuento en tienda Aragón", included: false },
    ],
  },
  {
    name: "Campeón",
    price: "899",
    featured: true,
    badge: "Más Popular",
    features: [
      { text: "Clases grupales ilimitadas", included: true },
      { text: "Acceso a área de bolsas", included: true },
      { text: "Vestuarios y lockers", included: true },
      { text: "Clases de Kids Boxing", included: true },
      { text: "Sesiones de sparring (2/sem)", included: true },
      { text: "10% descuento en Aragón", included: true },
    ],
  },
  {
    name: "Elite",
    price: "1,599",
    featured: false,
    features: [
      { text: "Todo del plan Campeón", included: true },
      { text: "2 sesiones privadas / mes", included: true },
      { text: "Plan de nutrición", included: true },
      { text: "Análisis de video técnico", included: true },
      { text: "Sparring ilimitado", included: true },
      { text: "20% descuento en Aragón", included: true },
    ],
  },
];

const MembershipsSection = () => {
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

  return (
    <section id="membresias" className="bg-background py-[100px] px-6 md:px-[60px]" ref={ref}>
      <div className="reveal font-display font-semibold text-[0.75rem] tracking-[0.35em] uppercase text-electric mb-4 flex items-center gap-3">
        <span className="w-6 h-0.5 bg-electric" />
        Planes
      </div>
      <h2 className="reveal font-display font-black text-[clamp(2.5rem,5vw,4.5rem)] uppercase leading-[0.9] mb-[60px]">
        Membresías<br /><em className="italic text-stroke not-italic">sin pretextos</em>
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-0.5 mb-10">
        {plans.map((plan, i) => (
          <div
            key={plan.name}
            className={`reveal reveal-delay-${i + 1} relative overflow-hidden p-[50px_40px] border-t-[3px] transition-all duration-300 ${
              plan.featured
                ? "bg-secondary border-t-electric"
                : "bg-navy-3 border-t-transparent hover:border-t-dim"
            }`}
          >
            {plan.badge && (
              <div className="absolute top-5 right-5 font-display font-bold text-[0.65rem] tracking-[0.2em] uppercase bg-electric text-foreground py-[5px] px-3.5 clip-skew-sm">
                {plan.badge}
              </div>
            )}
            <div className="font-display font-bold text-[0.8rem] tracking-[0.25em] uppercase text-grey mb-6">{plan.name}</div>
            <div className="font-display font-black text-[4.5rem] leading-none text-foreground mb-1">
              <sup className="text-[1.8rem] align-super text-grey">$</sup>{plan.price}
            </div>
            <div className="text-[0.8rem] text-grey mb-9">/ mes · IVA incluido</div>
            <ul className="list-none mb-11">
              {plan.features.map((f) => (
                <li
                  key={f.text}
                  className={`text-[0.9rem] py-2.5 border-b border-dim/30 flex items-center gap-2.5 ${
                    f.included ? "text-foreground" : "text-grey"
                  }`}
                >
                  <span className={f.included ? "text-electric font-bold" : "text-dim font-light"}>
                    {f.included ? "✓" : "—"}
                  </span>
                  {f.text}
                </li>
              ))}
            </ul>
            <button
              onClick={() => scrollTo("contacto")}
              className={`font-display font-bold text-[0.85rem] tracking-[0.2em] uppercase w-full py-4 clip-skew-md transition-all ${
                plan.featured
                  ? "bg-electric border border-electric text-foreground hover:bg-electric-hover"
                  : "bg-transparent border border-dim text-grey hover:bg-electric hover:border-electric hover:text-foreground"
              }`}
            >
              Empezar
            </button>
          </div>
        ))}
      </div>

      <p className="reveal text-center text-grey text-[0.85rem]">
        Primera clase de prueba <strong className="text-foreground">completamente gratis</strong>. Sin compromiso.
        <a
          href="#contacto"
          onClick={(e) => { e.preventDefault(); scrollTo("contacto"); }}
          className="text-electric no-underline ml-2"
        >
          Reservar →
        </a>
      </p>
    </section>
  );
};

export default MembershipsSection;
