import { useEffect, useRef } from "react";

const StatsBar = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const stats = [
    { num: "12", suffix: "+", label: "Años formando campeones" },
    { num: "400", suffix: "+", label: "Miembros activos" },
  ];

  return (
    <div ref={ref} className="reveal bg-secondary border-y border-primary/20 py-10 px-6 md:px-[60px]">
      <div className="grid grid-cols-2 md:grid-cols-2">
        {stats.map((stat, i) => (
          <div
            key={stat.label}
            className={`text-center py-5 px-5 ${i < stats.length - 1 ? "md:border-r md:border-primary/20" : ""}`}
          >
            <span className="font-display font-black text-[3.5rem] block mb-2 text-foreground">
              {stat.num}<span className="text-electric">{stat.suffix}</span>
            </span>
            <span className="block text-[0.8rem] tracking-[0.2em] uppercase text-grey">{stat.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatsBar;
