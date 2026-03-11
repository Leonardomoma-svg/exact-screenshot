import { useEffect, useMemo, useRef, useState } from "react";

const GallerySection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [activeAragonIndex, setActiveAragonIndex] = useState(0);
  const [isAragonHovered, setIsAragonHovered] = useState(false);
  const [activeManopleoIndex, setActiveManopleoIndex] = useState<0 | 1>(0);
  const manopleoVideoRef = useRef<HTMLVideoElement | null>(null);
  const [isManopleoHovered, setIsManopleoHovered] = useState(false);
  const manopleoTimerRef = useRef<number | null>(null);
  const [canHover, setCanHover] = useState(false);

  const aragonActionImages = useMemo(
    () => [
      "/GuantesColgados.jpg",
      "/GuantesPuestos.jpg",
      "/IMG_0456.jpg",
      "/IMG_1038sin.jpg",
      "/IMG_0583.jpg",
      "/GuantesMix.jpg",
    ],
    [],
  );

  const aragonImage = useMemo(
    () => aragonActionImages[activeAragonIndex],
    [activeAragonIndex, aragonActionImages],
  );

  const items = [
    { label: "Aragón", span: true },
    { label: "Manopleo", span: true },
    { label: "Zona de costales" },
    { label: "Sparring" },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.1 }
    );
    ref.current?.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const mq = window.matchMedia?.("(hover: hover)");
    if (!mq) return;
    const update = () => setCanHover(Boolean(mq.matches));
    update();
    mq.addEventListener?.("change", update);
    return () => mq.removeEventListener?.("change", update);
  }, []);

  useEffect(() => {
    if (!isAragonHovered) return;
    if (aragonActionImages.length <= 1) return;
    const id = window.setInterval(() => {
      setActiveAragonIndex((i) => (i + 1) % aragonActionImages.length);
    }, 3500);
    return () => window.clearInterval(id);
  }, [aragonActionImages.length, isAragonHovered]);

  const effectiveHovered = canHover ? isManopleoHovered : true;

  useEffect(() => {
    if (manopleoTimerRef.current) {
      window.clearTimeout(manopleoTimerRef.current);
      manopleoTimerRef.current = null;
    }

    if (activeManopleoIndex === 0) {
      const v = manopleoVideoRef.current;
      if (v) {
        if (!effectiveHovered) {
          v.pause();
          v.currentTime = 0;
        } else {
          if (v.currentTime >= (v.duration || Number.POSITIVE_INFINITY) - 0.15) v.currentTime = 0;
          v.play().catch(() => null);
        }
      }

      if (effectiveHovered) {
        manopleoTimerRef.current = window.setTimeout(() => {
          setActiveManopleoIndex(1);
        }, 17000);
      }
    } else {
      if (effectiveHovered) {
        manopleoTimerRef.current = window.setTimeout(() => {
          setActiveManopleoIndex(0);
        }, 2200);
      }
    }

    return () => {
      if (manopleoTimerRef.current) {
        window.clearTimeout(manopleoTimerRef.current);
        manopleoTimerRef.current = null;
      }
    };
  }, [activeManopleoIndex, effectiveHovered]);

  useEffect(() => {
    if (activeManopleoIndex !== 0) return;
    const v = manopleoVideoRef.current;
    if (!v) return;
    v.currentTime = 0;
    if (effectiveHovered) v.play().catch(() => null);
  }, [activeManopleoIndex, effectiveHovered]);

  return (
    <section id="galeria" className="bg-background py-[70px] md:py-[100px] px-0" ref={ref}>
      <div className="px-6 md:px-[60px] mb-8 md:mb-[50px]">
        <div className="reveal font-display font-semibold text-[0.75rem] tracking-[0.35em] uppercase text-electric mb-4 flex items-center gap-3">
          <span className="w-6 h-0.5 bg-electric" />
          Galería
        </div>
        <h2 className="reveal font-display font-black text-[clamp(2.5rem,5vw,4.5rem)] uppercase leading-[0.9]">
          Vive el<br /><em className="italic text-stroke not-italic">ambiente</em>
        </h2>
      </div>

      <div className="reveal grid grid-cols-2 md:grid-cols-[2fr_1fr_1fr] md:grid-rows-[280px_280px] gap-[3px]">
        {items.map((item, i) => (
          <div
            key={item.label}
            id={i === 0 ? "galeria-aragon" : undefined}
            className={`overflow-hidden relative group ${
              i === 0
                ? "md:row-span-2 col-span-2 md:col-span-1"
                : i === 1
                  ? "md:row-span-2"
                  : ""
            }`}
            onMouseEnter={i === 0 ? () => setIsAragonHovered(true) : undefined}
            onMouseLeave={i === 0 ? () => setIsAragonHovered(false) : undefined}
            onClick={
              i === 0
                ? () => setActiveAragonIndex((v) => (v + 1) % aragonActionImages.length)
                : undefined
            }
          >
            {i === 0 ? (
              <img
                src={aragonImage}
                alt="Aragón"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 filter grayscale contrast-[1.1] group-hover:grayscale-[30%]"
                loading="lazy"
              />
            ) : i === 1 ? (
              <div
                className="absolute inset-0"
                onMouseEnter={() => setIsManopleoHovered(true)}
                onMouseLeave={() => setIsManopleoHovered(false)}
                onClick={() => {
                  if (activeManopleoIndex === 1) setActiveManopleoIndex(0);
                }}
              >
                {activeManopleoIndex === 0 ? (
                  <video
                    ref={manopleoVideoRef}
                    className="absolute inset-0 h-full w-full object-cover md:filter md:grayscale md:contrast-[1.1] md:group-hover:grayscale-0 transition-[filter] duration-300"
                    muted
                    loop
                    playsInline
                    preload="metadata"
                  >
                    <source src="/Video-Dany.MOV" />
                  </video>
                ) : (
                  <img
                    src="/IMG_0691.jpg"
                    alt="Manopleo"
                    className="absolute inset-0 h-full w-full object-cover md:filter md:grayscale md:contrast-[1.1] md:group-hover:grayscale-0 transition-[filter] duration-300"
                    loading="lazy"
                    draggable={false}
                  />
                )}
              </div>
            ) : (
              <div className="w-full h-full bg-white" />
            )}
            {i === 0 && (
              <div className="absolute left-4 top-4 md:hidden rounded-full bg-black/35 border border-white/10 px-3 py-1 backdrop-blur-sm">
                <div className="font-display font-black text-[0.65rem] tracking-[0.22em] uppercase text-white/90">
                  Toca para cambiar
                </div>
              </div>
            )}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
              <span className="font-display font-bold text-base uppercase tracking-[0.15em] text-foreground">{item.label}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default GallerySection;
