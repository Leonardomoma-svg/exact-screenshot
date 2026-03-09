import { useEffect, useRef, useState } from "react";

const classes = [
  { num: "01", tag: "Fundamentos", name: "Boxing Fundamentals", desc: "Aprende los fundamentos del boxeo: guardia, footwork, jab, cross, hook y uppercut. La base de todo gran boxeador.", time: "60 min", level: "Todos los niveles" },
  { num: "02", tag: "Cardio", name: "Boxing Fit", desc: "Quema calorías con la intensidad del boxeo sin contacto. Circuitos, bag work y combinaciones explosivas al ritmo de la música.", time: "45 min", level: "Todos los niveles" },
  { num: "03", tag: "Técnica avanzada", name: "Sparring & Técnica", desc: "Para boxeadores intermedios y avanzados. Trabajo de pads, sparring controlado y análisis técnico con entrenadores especializados.", time: "90 min", level: "Intermedio / Avanzado" },
  { num: "04", tag: "Fuerza", name: "Acondicionamiento", desc: "Fuerza, potencia y resistencia diseñadas para el ring. Ejercicios funcionales, pliométricos y core específico para boxeadores.", time: "60 min", level: "Todos los niveles" },
  { num: "05", tag: "Juvenil", name: "Kids Boxing", desc: "Programa especializado para niños de 8 a 15 años. Disciplina, valores y confianza a través del boxeo en un ambiente seguro.", time: "50 min", level: "8–15 años" },
  { num: "06", tag: "Elite", name: "Entrenamiento Privado", desc: "Sesiones 1-a-1 con nuestros head coaches. Enfocado en objetivos específicos: competencia, pérdida de peso o desarrollo técnico.", time: "60 min", level: "Individual" },
];

const ClassesSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [mobileActive, setMobileActive] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.1 }
    );
    ref.current?.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="clases" className="bg-navy-2 py-[100px] px-6 md:px-[60px]" ref={ref}>
      <div className="reveal font-display font-semibold text-[0.75rem] tracking-[0.35em] uppercase text-electric mb-4 flex items-center gap-3">
        <span className="w-6 h-0.5 bg-electric" />
        Disciplinas
      </div>
      <h2 className="reveal font-display font-black text-[clamp(2.5rem,5vw,4.5rem)] uppercase leading-[0.9] mb-[60px]">
        Lo que <em className="italic text-stroke not-italic">hacemos</em><br />mejor
      </h2>

      <div className="reveal md:hidden">
        <div className="grid grid-cols-3 gap-2 pb-3">
          {classes.map((cls, i) => (
            <button
              key={cls.num}
              type="button"
              onClick={() => setMobileActive(i)}
              className={`shrink-0 rounded-xl border px-4 py-3 font-display font-black text-[0.72rem] tracking-[0.22em] uppercase transition-colors ${
                mobileActive === i
                  ? "bg-secondary border-electric text-foreground"
                  : "bg-navy-3 border-primary/10 text-grey"
              }`}
            >
              {cls.tag}
            </button>
          ))}
        </div>

        <div className="bg-navy-3 p-8 relative overflow-hidden border-b-[3px] border-electric">
          <div className="absolute top-5 right-[22px] font-display font-black text-[4.2rem] text-primary/10 leading-none">
            {classes[mobileActive].num}
          </div>
          <div className="font-display font-bold text-[0.7rem] tracking-[0.25em] uppercase text-electric mb-4">
            {classes[mobileActive].tag}
          </div>
          <div className="font-display font-black text-[1.6rem] uppercase mb-3 leading-none">
            {classes[mobileActive].name}
          </div>
          <div className="text-[0.9rem] text-grey leading-relaxed mb-7">
            {classes[mobileActive].desc}
          </div>
          <div className="flex flex-col gap-2 font-display text-[0.8rem] tracking-wider text-dim">
            <span className="flex items-center gap-1.5">⏱ {classes[mobileActive].time}</span>
            <span className="flex items-center gap-1.5">👥 {classes[mobileActive].level}</span>
          </div>
        </div>
      </div>

      <div className="hidden md:grid grid-cols-1 md:grid-cols-3 gap-0.5">
        {classes.map((cls, i) => (
          <div
            key={cls.num}
            className={`reveal reveal-delay-${(i % 3) + 1} bg-navy-3 p-10 relative overflow-hidden border-b-[3px] border-transparent hover:bg-secondary hover:border-b-electric hover:-translate-y-1 transition-all duration-300 group`}
          >
            <div className="absolute top-5 right-[30px] font-display font-black text-[5rem] text-primary/10 leading-none group-hover:text-primary/20 transition-colors">
              {cls.num}
            </div>
            <div className="font-display font-bold text-[0.7rem] tracking-[0.25em] uppercase text-electric mb-4">{cls.tag}</div>
            <div className="font-display font-black text-[1.8rem] uppercase mb-3 leading-none">{cls.name}</div>
            <div className="text-[0.9rem] text-grey leading-relaxed mb-7">{cls.desc}</div>
            <div className="flex gap-5 font-display text-[0.8rem] tracking-wider text-dim">
              <span className="flex items-center gap-1.5">⏱ {cls.time}</span>
              <span className="flex items-center gap-1.5">👥 {cls.level}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ClassesSection;
