import { useEffect, useRef } from "react";

interface ScheduleCell {
  name?: string;
  coach?: string;
  level?: "all" | "inter" | "adv" | "juvenil";
}

const scheduleData: { time: string; cells: (ScheduleCell | null)[] }[] = [
  {
    time: "7:00",
    cells: [
      { name: "Boxing Fit", coach: "Coach Ramírez", level: "all" },
      null,
      { name: "Boxing Fit", coach: "Coach Torres", level: "all" },
      null,
      { name: "Boxing Fit", coach: "Coach Ramírez", level: "all" },
      { name: "Fundamentos", coach: "Coach Medina", level: "all" },
    ],
  },
  {
    time: "10:00",
    cells: [
      { name: "Fundamentos", coach: "Coach Medina", level: "all" },
      { name: "Kids Boxing", coach: "Coach Flores", level: "juvenil" },
      { name: "Fundamentos", coach: "Coach Medina", level: "all" },
      { name: "Kids Boxing", coach: "Coach Flores", level: "juvenil" },
      { name: "Fundamentos", coach: "Coach Medina", level: "all" },
      { name: "Kids Boxing", coach: "Coach Flores", level: "juvenil" },
    ],
  },
  {
    time: "18:00",
    cells: [
      { name: "Sparring", coach: "Coach Vega", level: "inter" },
      { name: "Boxing Fit", coach: "Coach Torres", level: "all" },
      { name: "Acondic.", coach: "Coach Vega", level: "inter" },
      { name: "Boxing Fit", coach: "Coach Torres", level: "all" },
      { name: "Sparring", coach: "Coach Vega", level: "adv" },
      null,
    ],
  },
  {
    time: "20:00",
    cells: [
      { name: "Acondic.", coach: "Coach Ramírez", level: "all" },
      { name: "Técnica Avanz.", coach: "Coach Vega", level: "adv" },
      { name: "Acondic.", coach: "Coach Ramírez", level: "all" },
      { name: "Técnica Avanz.", coach: "Coach Vega", level: "adv" },
      { name: "Acondic.", coach: "Coach Ramírez", level: "all" },
      null,
    ],
  },
];

const levelStyles: Record<string, string> = {
  all: "bg-primary/20 text-electric",
  inter: "bg-gold/20 text-gold",
  adv: "bg-destructive/20 text-destructive",
  juvenil: "bg-primary/20 text-electric",
};

const levelLabels: Record<string, string> = {
  all: "Todos",
  inter: "Intermedio",
  adv: "Avanzado",
  juvenil: "Juvenil",
};

const days = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];

const ScheduleSection = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.1 }
    );
    ref.current?.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="horarios" className="bg-background py-[100px] px-6 md:px-[60px]" ref={ref}>
      <div className="reveal font-display font-semibold text-[0.75rem] tracking-[0.35em] uppercase text-electric mb-4 flex items-center gap-3">
        <span className="w-6 h-0.5 bg-electric" />
        Semana
      </div>
      <h2 className="reveal font-display font-black text-[clamp(2.5rem,5vw,4.5rem)] uppercase leading-[0.9] mb-[60px]">
        Horarios<br /><em className="italic text-stroke not-italic">semanales</em>
      </h2>

      <div className="reveal overflow-x-auto">
        <div className="grid font-display gap-0.5 min-w-[700px]" style={{ gridTemplateColumns: "auto repeat(6, 1fr)" }}>
          {/* Headers */}
          <div className="bg-transparent p-4" />
          {days.map((d) => (
            <div key={d} className="bg-secondary p-4 font-bold text-[0.8rem] tracking-[0.2em] uppercase text-center text-grey">
              {d}
            </div>
          ))}

          {/* Rows */}
          {scheduleData.map((row) => (
            <>
              <div key={`time-${row.time}`} className="px-5 text-[0.8rem] text-dim tracking-wider flex items-center whitespace-nowrap">
                {row.time}
              </div>
              {row.cells.map((cell, ci) => (
                <div
                  key={`${row.time}-${ci}`}
                  className={`min-h-[70px] p-2.5 transition-all ${
                    cell ? "bg-secondary/80 border-l-[3px] border-l-electric hover:bg-secondary" : "bg-navy-3 hover:bg-secondary"
                  }`}
                >
                  {cell && (
                    <>
                      <div className="font-bold text-[0.85rem] uppercase text-foreground mb-1">{cell.name}</div>
                      <div className="text-[0.7rem] text-grey">{cell.coach}</div>
                      <span className={`inline-block px-2 py-0.5 text-[0.6rem] tracking-[0.15em] uppercase font-bold mt-1 ${levelStyles[cell.level!]}`}>
                        {levelLabels[cell.level!]}
                      </span>
                    </>
                  )}
                </div>
              ))}
            </>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ScheduleSection;
