import { useEffect, useRef } from "react";

const coaches = [
  { initials: "CR", role: "Campeón profesional · 20 años boxeando", name: "Chavita Rodríguez", bio: "20 años boxeando y campeón profesional." },
  { initials: "HG", role: "Coach · 12 años de experiencia", name: "Hugo", bio: "12 años de experiencia." },
];

const CoachesSection = () => {
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
    <section id="entrenadores" className="bg-navy-2 py-[100px] px-6 md:px-[60px]" ref={ref}>
      <div className="reveal font-display font-semibold text-[0.75rem] tracking-[0.35em] uppercase text-electric mb-4 flex items-center gap-3">
        <span className="w-6 h-0.5 bg-electric" />
        El Equipo
      </div>
      <h2 className="reveal font-display font-black text-[clamp(2.5rem,5vw,4.5rem)] uppercase leading-[0.9] mb-[60px]">
        Entrenadores<br /><em className="italic text-stroke not-italic">de élite</em>
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-[30px]">
        {coaches.map((coach, i) => (
          <div
            key={coach.name}
            className={`reveal reveal-delay-${i + 1} relative overflow-hidden bg-navy-3 hover:-translate-y-1.5 transition-transform duration-300 group`}
          >
            <div className="w-full aspect-[3/4] bg-gradient-to-br from-secondary to-navy-3 flex items-center justify-center font-display text-[5rem] font-black text-primary/30">
              {coach.initials}
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-[30px] pt-10 bg-gradient-to-t from-background/[0.97] via-background/70 to-transparent">
              <div className="font-display font-semibold text-[0.75rem] tracking-[0.25em] uppercase text-electric mb-1.5">
                {coach.role}
              </div>
              <div className="font-display font-black text-[1.8rem] uppercase leading-none mb-1.5">
                {coach.name}
              </div>
              <div className="text-[0.85rem] text-grey leading-relaxed opacity-0 translate-y-2.5 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                {coach.bio}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CoachesSection;
