import { useEffect, useMemo, useRef, useState } from "react";

const EventsSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  const eventImages = useMemo(
    () => [
      "/jjj.jpg",
    ],
    [],
  );

  const fbReelUrl = "https://www.facebook.com/reel/1507497720297763";
  const fbEmbedSrc = `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(
    fbReelUrl,
  )}&show_text=0&autoplay=${isVideoPlaying ? 1 : 0}`;

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.1 }
    );
    ref.current?.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (eventImages.length <= 1) return;
    const id = window.setInterval(() => {
      setActiveImageIndex((i) => (i + 1) % eventImages.length);
    }, 3500);
    return () => window.clearInterval(id);
  }, [eventImages.length]);

  return (
    <section id="eventos" className="bg-background py-[70px] md:py-[100px] px-6 md:px-[60px]" ref={ref}>
      <div className="max-w-[1100px] mx-auto">
        <div className="reveal font-display font-semibold text-[0.75rem] tracking-[0.35em] uppercase text-electric mb-4 flex items-center gap-3">
          <span className="w-6 h-0.5 bg-electric" />
          Eventos
        </div>
        <h2 className="reveal font-display font-black text-[clamp(2.5rem,5vw,4.5rem)] uppercase leading-[0.9] mb-10">
          Box para Todos
          <br />
          <em className="italic text-stroke not-italic">vol.2</em>
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
          <div className="reveal bg-navy-2/40 border border-white/10 overflow-hidden flex items-center justify-center p-2 sm:p-3">
            <div className="relative w-full max-w-[380px] lg:max-w-[460px] aspect-[9/16]">
              <img
                src={eventImages[activeImageIndex]}
                alt="Box para Todos vol.2"
                className="absolute inset-0 w-full h-full object-cover bg-black"
                draggable={false}
                loading="lazy"
              />
            </div>
          </div>

          <div className="reveal bg-navy-2/40 border border-white/10 overflow-hidden flex items-center justify-center p-2 sm:p-3">
            <div className="relative w-full max-w-[380px] lg:max-w-[460px] aspect-[9/16]">
              {isVideoPlaying ? (
                <iframe
                  src={fbEmbedSrc}
                  title="Box para Todos vol.2"
                  className="absolute inset-0 w-full h-full bg-black"
                  allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                  allowFullScreen
                />
              ) : (
                <button
                  type="button"
                  onClick={() => setIsVideoPlaying(true)}
                  className="absolute inset-0 w-full h-full flex items-center justify-center"
                  aria-label="Reproducir video"
                >
                  <img
                    src={eventImages[0]}
                    alt="Preview video"
                    className="absolute inset-0 w-full h-full object-cover bg-black"
                    draggable={false}
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/30 hover:bg-black/40 transition-colors" />
                  <div className="relative h-16 w-16 rounded-full bg-white/15 border border-white/25 flex items-center justify-center text-white text-[2rem] leading-none">
                    ▶
                  </div>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventsSection;
