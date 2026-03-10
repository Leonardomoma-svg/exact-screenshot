import { useEffect, useMemo, useRef, useState } from "react";

const baseFeatures = [
  { text: "Clases ilimitadas", included: true },
  { text: "Acceso a área de bolsas", included: true },
  { text: "Vestuarios y lockers", included: true },
];

const MembershipsSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [annualType, setAnnualType] = useState<"estudiante" | "campeon">("estudiante");
  const [mobileView, setMobileView] = useState<"estudiante" | "campeon" | "anual">("campeon");

  const money = useMemo(
    () =>
      new Intl.NumberFormat("es-MX", {
        maximumFractionDigits: 0,
      }),
    [],
  );

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.1 }
    );
    ref.current?.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  const scrollToForm = () => {
    const el = document.getElementById("contacto-form") ?? document.getElementById("contacto");
    el?.scrollIntoView({ behavior: "smooth" });
  };

  const annualMonthly = annualType === "estudiante" ? 1000 : 1200;
  const annualTotal = Math.round(annualMonthly * 12 * 0.85);

  const plans = useMemo(
    () => [
      {
        id: "estudiante",
        name: "Estudiante",
        price: 1000,
        featured: false,
        note: "Descuento mostrando credencial de estudiante vigente.",
        features: baseFeatures,
      },
      {
        id: "campeon",
        name: "Campeón",
        price: 1200,
        featured: true,
        badge: "Más Popular",
        features: baseFeatures,
      },
    ],
    [],
  );

  return (
    <section id="membresias" className="bg-background py-[100px] px-6 md:px-[60px]" ref={ref}>
      <div className="reveal font-display font-semibold text-[0.75rem] tracking-[0.35em] uppercase text-electric mb-4 flex items-center gap-3">
        <span className="w-6 h-0.5 bg-electric" />
        Planes
      </div>
      <h2 className="reveal font-display font-black text-[clamp(2.5rem,5vw,4.5rem)] uppercase leading-[0.9] mb-[60px]">
        Membresías<br /><em className="italic text-stroke not-italic">sin pretextos</em>
      </h2>

      <div className="reveal md:hidden mb-10">
        <div className="grid grid-cols-3 gap-2 mb-4">
          <button
            type="button"
            onClick={() => setMobileView("estudiante")}
            className={`py-3 px-3 border clip-skew-sm font-display font-bold text-[0.7rem] tracking-[0.18em] uppercase transition-all ${
              mobileView === "estudiante"
                ? "bg-electric border-electric text-foreground"
                : "bg-transparent border-dim text-grey hover:bg-secondary hover:text-foreground"
            }`}
          >
            Estudiante
          </button>
          <button
            type="button"
            onClick={() => setMobileView("campeon")}
            className={`py-3 px-3 border clip-skew-sm font-display font-bold text-[0.7rem] tracking-[0.18em] uppercase transition-all ${
              mobileView === "campeon"
                ? "bg-electric border-electric text-foreground"
                : "bg-transparent border-dim text-grey hover:bg-secondary hover:text-foreground"
            }`}
          >
            Campeón
          </button>
          <button
            type="button"
            onClick={() => setMobileView("anual")}
            className={`py-3 px-3 border clip-skew-sm font-display font-bold text-[0.7rem] tracking-[0.18em] uppercase transition-all ${
              mobileView === "anual"
                ? "bg-electric border-electric text-foreground"
                : "bg-transparent border-dim text-grey hover:bg-secondary hover:text-foreground"
            }`}
          >
            Anual
          </button>
        </div>

        {mobileView !== "anual" && (
          <div
            className={`relative overflow-hidden p-[50px_30px] border-t-[3px] transition-all duration-300 ${
              plans.find((p) => p.id === mobileView)?.featured
                ? "bg-secondary border-t-electric"
                : "bg-navy-3 border-t-transparent"
            }`}
          >
            {plans
              .filter((p) => p.id === mobileView)
              .map((plan) => (
                <div key={plan.name}>
                  {plan.badge && (
                    <div className="absolute top-5 right-5 font-display font-bold text-[0.65rem] tracking-[0.2em] uppercase bg-electric text-foreground py-[5px] px-3.5 clip-skew-sm">
                      {plan.badge}
                    </div>
                  )}
                  <div className="font-display font-bold text-[0.8rem] tracking-[0.25em] uppercase text-grey mb-6">{plan.name}</div>
                  <div className="font-display font-black text-[4.2rem] leading-none text-foreground mb-1">
                    <sup className="text-[1.6rem] align-super text-grey">$</sup>{money.format(plan.price)}
                  </div>
                  <div className="text-[0.8rem] text-grey mb-9">/ mes · IVA incluido</div>
                  {plan.note && (
                    <div className="text-[0.85rem] text-grey mb-8 leading-relaxed">
                      {plan.note}
                    </div>
                  )}
                  <ul className="list-none mb-9">
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
                    onClick={scrollToForm}
                    className="font-display font-bold text-[0.85rem] tracking-[0.2em] uppercase w-full py-4 clip-skew-md transition-all bg-electric border border-electric text-foreground hover:bg-electric-hover"
                  >
                    Empezar
                  </button>
                </div>
              ))}
          </div>
        )}

        {mobileView === "anual" && (
          <div className="relative overflow-hidden p-[50px_30px] border-t-[3px] transition-all duration-300 bg-navy-3 border-t-transparent">
            <div className="absolute top-5 right-5 font-display font-black text-[0.7rem] tracking-[0.22em] uppercase bg-electric text-foreground py-[6px] px-4 clip-skew-sm shadow-[0_16px_40px_rgba(0,0,0,0.45)]">
              15% OFF
            </div>
            <div className="font-display font-bold text-[0.8rem] tracking-[0.25em] uppercase text-grey mb-6">Anualidad</div>
            <div className="font-display font-black text-[4.2rem] leading-none text-foreground mb-1">
              <sup className="text-[1.6rem] align-super text-grey">$</sup>{money.format(annualTotal)}
            </div>
            <div className="text-[0.85rem] text-grey mb-7">
              / año · <span className="text-electric font-display font-black tracking-[0.18em] uppercase">15% descuento</span> · IVA incluido
            </div>

            <div className="mb-8">
              <div className="text-[0.75rem] tracking-[0.25em] uppercase text-grey mb-3 font-display font-bold">
                Selecciona tu plan
              </div>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setAnnualType("estudiante")}
                  className={`py-3 px-4 border clip-skew-sm font-display font-bold text-[0.75rem] tracking-[0.2em] uppercase transition-all ${
                    annualType === "estudiante"
                      ? "bg-electric border-electric text-foreground"
                      : "bg-transparent border-dim text-grey hover:bg-secondary hover:text-foreground"
                  }`}
                >
                  Estudiante
                </button>
                <button
                  type="button"
                  onClick={() => setAnnualType("campeon")}
                  className={`py-3 px-4 border clip-skew-sm font-display font-bold text-[0.75rem] tracking-[0.2em] uppercase transition-all ${
                    annualType === "campeon"
                      ? "bg-electric border-electric text-foreground"
                      : "bg-transparent border-dim text-grey hover:bg-secondary hover:text-foreground"
                  }`}
                >
                  Campeón
                </button>
              </div>
              <div className="mt-4 text-[0.85rem] text-grey leading-relaxed">
                Calculado como <span className="text-foreground">${money.format(annualMonthly)} x 12</span> con <span className="text-electric font-bold">15% de descuento</span>.
              </div>
            </div>

            <ul className="list-none mb-9">
              {baseFeatures.map((f) => (
                <li
                  key={`annual-mobile-${f.text}`}
                  className="text-[0.9rem] py-2.5 border-b border-dim/30 flex items-center gap-2.5 text-foreground"
                >
                  <span className="text-electric font-bold">✓</span>
                  {f.text}
                </li>
              ))}
              <li className="text-[0.9rem] py-2.5 border-b border-dim/30 flex items-center gap-2.5 text-foreground">
                <span className="text-electric font-bold">✓</span>
                20% descuento en Aragón
              </li>
            </ul>

            <button
              onClick={scrollToForm}
              className="font-display font-bold text-[0.85rem] tracking-[0.2em] uppercase w-full py-4 clip-skew-md transition-all bg-electric border border-electric text-foreground hover:bg-electric-hover"
            >
              Empezar
            </button>
          </div>
        )}
      </div>

      <div className="hidden md:grid grid-cols-1 md:grid-cols-3 gap-0.5 mb-10">
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
              <sup className="text-[1.8rem] align-super text-grey">$</sup>{money.format(plan.price)}
            </div>
            <div className="text-[0.8rem] text-grey mb-9">/ mes · IVA incluido</div>
            {plan.note && (
              <div className="text-[0.85rem] text-grey mb-8 leading-relaxed">
                {plan.note}
              </div>
            )}
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
              onClick={scrollToForm}
              className="font-display font-bold text-[0.85rem] tracking-[0.2em] uppercase w-full py-4 clip-skew-md transition-all bg-electric border border-electric text-foreground hover:bg-electric-hover"
            >
              Empezar
            </button>
          </div>
        ))}

        <div className="reveal reveal-delay-3 relative overflow-hidden p-[50px_40px] border-t-[3px] transition-all duration-300 bg-navy-3 border-t-transparent hover:border-t-dim">
          <div className="absolute top-5 right-5 font-display font-black text-[0.7rem] tracking-[0.22em] uppercase bg-electric text-foreground py-[6px] px-4 clip-skew-sm shadow-[0_16px_40px_rgba(0,0,0,0.45)]">
            15% OFF
          </div>
          <div className="font-display font-bold text-[0.8rem] tracking-[0.25em] uppercase text-grey mb-6">Anualidad</div>
          <div className="font-display font-black text-[4.5rem] leading-none text-foreground mb-1">
            <sup className="text-[1.8rem] align-super text-grey">$</sup>{money.format(annualTotal)}
          </div>
          <div className="text-[0.85rem] text-grey mb-7">
            / año · <span className="text-electric font-display font-black tracking-[0.18em] uppercase">15% descuento</span> · IVA incluido
          </div>

          <div className="mb-8">
            <div className="text-[0.75rem] tracking-[0.25em] uppercase text-grey mb-3 font-display font-bold">
              Selecciona tu plan
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setAnnualType("estudiante")}
                className={`py-3 px-4 border clip-skew-sm font-display font-bold text-[0.75rem] tracking-[0.2em] uppercase transition-all ${
                  annualType === "estudiante"
                    ? "bg-electric border-electric text-foreground"
                    : "bg-transparent border-dim text-grey hover:bg-secondary hover:text-foreground"
                }`}
              >
                Estudiante
              </button>
              <button
                type="button"
                onClick={() => setAnnualType("campeon")}
                className={`py-3 px-4 border clip-skew-sm font-display font-bold text-[0.75rem] tracking-[0.2em] uppercase transition-all ${
                  annualType === "campeon"
                    ? "bg-electric border-electric text-foreground"
                    : "bg-transparent border-dim text-grey hover:bg-secondary hover:text-foreground"
                }`}
              >
                Campeón
              </button>
            </div>
            <div className="mt-4 text-[0.85rem] text-grey leading-relaxed">
              Calculado como <span className="text-foreground">${money.format(annualMonthly)} x 12</span> con <span className="text-electric font-bold">15% de descuento</span>.
            </div>
          </div>

          <ul className="list-none mb-11">
            {baseFeatures.map((f) => (
              <li
                key={`annual-${f.text}`}
                className="text-[0.9rem] py-2.5 border-b border-dim/30 flex items-center gap-2.5 text-foreground"
              >
                <span className="text-electric font-bold">✓</span>
                {f.text}
              </li>
            ))}
            <li className="text-[0.9rem] py-2.5 border-b border-dim/30 flex items-center gap-2.5 text-foreground">
              <span className="text-electric font-bold">✓</span>
              20% descuento en Aragón
            </li>
          </ul>

          <button
            onClick={scrollToForm}
            className="font-display font-bold text-[0.85rem] tracking-[0.2em] uppercase w-full py-4 clip-skew-md transition-all bg-electric border border-electric text-foreground hover:bg-electric-hover"
          >
            Empezar
          </button>
        </div>
      </div>

      <p className="reveal text-center text-grey text-[0.85rem]">
        Primera clase de prueba <strong className="text-foreground">completamente gratis</strong>. Sin compromiso.
        <a
          href="#contacto"
          onClick={(e) => { e.preventDefault(); scrollToForm(); }}
          className="text-electric no-underline ml-2"
        >
          Reservar →
        </a>
      </p>
    </section>
  );
};

export default MembershipsSection;
