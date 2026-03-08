import { useEffect, useMemo, useRef, useState } from "react";

interface ScheduleCell {
  coach?: string;
  tag?: "Niños";
}

const coachAccent: Record<string, { bar: string; bg: string; text: string }> = {
  Chava: {
    bar: "bg-[#2F7BFF]",
    bg: "from-[#2F7BFF]/20 via-secondary/85 to-secondary/70",
    text: "text-[#2F7BFF]",
  },
  Hugo: {
    bar: "bg-[#D6A84A]",
    bg: "from-[#D6A84A]/20 via-secondary/85 to-secondary/70",
    text: "text-[#D6A84A]",
  },
};

const scheduleData: { time: string; cells: (ScheduleCell | null)[] }[] = [
  {
    time: "6:00",
    cells: [
      { coach: "Chava" },
      { coach: "Chava" },
      { coach: "Chava" },
      { coach: "Chava" },
      { coach: "Chava" },
      null,
    ],
  },
  {
    time: "7:00",
    cells: [
      { coach: "Chava" },
      { coach: "Chava" },
      { coach: "Chava" },
      { coach: "Chava" },
      { coach: "Chava" },
      null,
    ],
  },
  {
    time: "10:00",
    cells: [
      null,
      null,
      null,
      null,
      null,
      { coach: "Hugo" },
    ],
  },
  {
    time: "11:00",
    cells: [
      null,
      null,
      null,
      null,
      null,
      { coach: "Hugo" },
    ],
  },
  {
    time: "12:00",
    cells: [null, null, null, null, null, { coach: "Hugo" }],
  },
  {
    time: "16:00",
    cells: [
      { coach: "Chava", tag: "Niños" },
      { coach: "Chava", tag: "Niños" },
      { coach: "Chava", tag: "Niños" },
      { coach: "Chava", tag: "Niños" },
      { coach: "Chava", tag: "Niños" },
      null,
    ],
  },
  {
    time: "17:00",
    cells: [
      { coach: "Chava", tag: "Niños" },
      { coach: "Chava", tag: "Niños" },
      { coach: "Chava", tag: "Niños" },
      { coach: "Chava", tag: "Niños" },
      { coach: "Chava", tag: "Niños" },
      null,
    ],
  },
  {
    time: "18:00",
    cells: [
      { coach: "Chava" },
      { coach: "Chava" },
      { coach: "Chava" },
      { coach: "Chava" },
      { coach: "Chava" },
      null,
    ],
  },
  {
    time: "19:00",
    cells: [
      { coach: "Hugo" },
      { coach: "Hugo" },
      { coach: "Hugo" },
      { coach: "Hugo" },
      { coach: "Hugo" },
      null,
    ],
  },
  {
    time: "20:00",
    cells: [
      { coach: "Hugo" },
      { coach: "Hugo" },
      { coach: "Hugo" },
      { coach: "Hugo" },
      { coach: "Hugo" },
      null,
    ],
  },
  {
    time: "21:00",
    cells: [
      { coach: "Hugo" },
      { coach: "Hugo" },
      { coach: "Hugo" },
      { coach: "Hugo" },
      { coach: "Hugo" },
      null,
    ],
  },
];

const days = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];

 type SelectedSlot = {
   dayIndex: number;
   time: string;
   coach?: string;
 };

 const parseTime = (time: string) => {
   const [h, m] = time.split(":").map((n) => Number(n));
   return { h: Number.isFinite(h) ? h : 0, m: Number.isFinite(m) ? m : 0 };
 };

 const nextOccurrence = (dayIndex: number, time: string, now = new Date()) => {
   const targetDow = dayIndex + 1; // Lun=1 ... Sáb=6 (JS: Dom=0)
   const todayDow = now.getDay();
   let diff = (targetDow - todayDow + 7) % 7;

   const { h, m } = parseTime(time);
   const candidate = new Date(now);
   candidate.setSeconds(0);
   candidate.setMilliseconds(0);
   candidate.setDate(now.getDate() + diff);
   candidate.setHours(h, m, 0, 0);

   if (diff === 0 && candidate.getTime() <= now.getTime()) {
     diff = 7;
     candidate.setDate(now.getDate() + diff);
   }

   return candidate;
 };

const ScheduleSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [selected, setSelected] = useState<SelectedSlot | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.1 }
    );
    ref.current?.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const selectedInfo = useMemo(() => {
    if (!selected) return null;
    const start = nextOccurrence(selected.dayIndex, selected.time);
    const end = new Date(start);
    end.setHours(end.getHours() + 1);

    const fmt = new Intl.DateTimeFormat("es-MX", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });

    return {
      start,
      end,
      startLabel: fmt.format(start),
      endLabel: fmt.format(end),
    };
  }, [selected]);

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
        <div className="grid font-display gap-2 min-w-[760px]" style={{ gridTemplateColumns: "100px repeat(6, 1fr)" }}>
          {/* Headers */}
          <div className="bg-transparent p-4" />
          {days.map((d) => (
            <div
              key={d}
              className="rounded-xl bg-secondary/70 border border-primary/10 px-4 py-3 font-black text-[0.78rem] tracking-[0.28em] uppercase text-center text-foreground/80 shadow-[0_10px_24px_rgba(0,0,0,0.22)]"
            >
              {d}
            </div>
          ))}

          {/* Rows */}
          {scheduleData.map((row) => (
            <div key={row.time} className="contents">
              <div className="rounded-xl bg-secondary/40 border border-primary/10 px-4 py-3 flex items-center justify-center shadow-[0_10px_22px_rgba(0,0,0,0.18)]">
                <div className="text-[0.85rem] text-foreground/85 font-black tracking-[0.18em]">
                  {row.time}
                </div>
              </div>
              {row.cells.map((cell, ci) => {
                const accent = cell?.coach ? coachAccent[cell.coach] : undefined;
                const isFilled = Boolean(cell);
                const isKids = cell?.tag === "Niños";

                return (
                  <div
                    key={`${row.time}-${ci}`}
                    className={
                      isFilled
                        ? `relative rounded-xl border border-primary/15 bg-secondary/70 p-3 shadow-[0_14px_34px_rgba(0,0,0,0.35)] transition-all hover:-translate-y-[1px] hover:shadow-[0_18px_46px_rgba(0,0,0,0.45)] ${
                            isKids ? "ring-1 ring-white/35" : ""
                          }`
                        : "rounded-xl border border-primary/10 bg-secondary/15 p-3 transition-colors hover:bg-secondary/25"
                    }
                    role={isFilled ? "button" : undefined}
                    tabIndex={isFilled ? 0 : -1}
                    onClick={
                      isFilled
                        ? () => setSelected({ dayIndex: ci, time: row.time, coach: cell?.coach })
                        : undefined
                    }
                    onKeyDown={
                      isFilled
                        ? (e) => {
                            if (e.key === "Enter" || e.key === " ") {
                              e.preventDefault();
                              setSelected({ dayIndex: ci, time: row.time, coach: cell?.coach });
                            }
                          }
                        : undefined
                    }
                  >
                    {isFilled && (
                      <>
                        <div className={`absolute left-0 top-0 bottom-0 w-[5px] rounded-l-xl ${accent?.bar ?? "bg-electric"}`} />
                        {isKids && (
                          <div className="absolute top-2 right-2 rounded-full bg-white/10 border border-white/15 px-2 py-1">
                            <div className="text-[0.65rem] tracking-[0.22em] uppercase text-foreground/85 font-black">
                              Niños
                            </div>
                          </div>
                        )}
                        <div className={`rounded-lg border border-primary/10 bg-gradient-to-br ${accent?.bg ?? "from-electric/20 via-secondary/85 to-secondary/70"} px-3 py-2`}
                        >
                          <div className="text-[0.7rem] tracking-[0.28em] uppercase text-foreground/70 font-bold">
                            Box
                          </div>
                          <div className={`mt-1 text-[0.95rem] font-black tracking-wide ${accent?.text ?? "text-electric"}`}>
                            {cell?.coach}
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {selected && selectedInfo && (
        <div
          className="fixed inset-0 z-[60] flex items-end md:items-center justify-center bg-black/55 px-4 py-6"
          onClick={() => setSelected(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="w-full max-w-[520px] rounded-2xl border border-primary/15 bg-secondary/95 shadow-[0_30px_90px_rgba(0,0,0,0.7)] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-5 py-4 border-b border-primary/10 flex items-center justify-between">
              <div>
                <div className="font-display font-black tracking-[0.22em] uppercase text-[0.75rem] text-foreground/70">
                  Horario seleccionado
                </div>
                <div className="mt-1 font-display font-black text-[1.25rem] text-foreground">
                  {days[selected.dayIndex]} · {selected.time}
                </div>
              </div>
              <button
                type="button"
                className="h-10 w-10 rounded-xl border border-primary/15 bg-secondary/70 text-foreground/80 hover:bg-secondary transition-colors"
                onClick={() => setSelected(null)}
                aria-label="Cerrar"
              >
                ×
              </button>
            </div>

            <div className="p-5">
              <div className="grid gap-3">
                <div className="rounded-xl border border-primary/10 bg-background/40 px-4 py-3">
                  <div className="text-[0.7rem] tracking-[0.28em] uppercase text-foreground/60 font-bold">Entrenador</div>
                  <div className="mt-1 font-display font-black text-[1.05rem] text-foreground">
                    {selected.coach ?? "-"}
                  </div>
                </div>
                <div className="rounded-xl border border-primary/10 bg-background/40 px-4 py-3">
                  <div className="text-[0.7rem] tracking-[0.28em] uppercase text-foreground/60 font-bold">Inicio</div>
                  <div className="mt-1 text-[0.95rem] text-foreground/90">{selectedInfo.startLabel}</div>
                </div>
                <div className="rounded-xl border border-primary/10 bg-background/40 px-4 py-3">
                  <div className="text-[0.7rem] tracking-[0.28em] uppercase text-foreground/60 font-bold">Fin</div>
                  <div className="mt-1 text-[0.95rem] text-foreground/90">{selectedInfo.endLabel}</div>
                </div>
                <div className="rounded-xl border border-primary/10 bg-background/40 px-4 py-3">
                  <div className="text-[0.7rem] tracking-[0.28em] uppercase text-foreground/60 font-bold">Duración</div>
                  <div className="mt-1 text-[0.95rem] text-foreground/90">1 hora</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default ScheduleSection;
