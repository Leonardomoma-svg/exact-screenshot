import { useEffect, useRef } from "react";
import galleryRing from "@/assets/gallery-ring.jpg";
import galleryBags from "@/assets/gallery-bags.jpg";
import galleryChampions from "@/assets/gallery-champions.jpg";
import galleryTraining from "@/assets/gallery-training.jpg";
import gallerySparring from "@/assets/gallery-sparring.jpg";

const items = [
  { img: galleryRing, label: "El Ring Principal", span: true },
  { img: galleryBags, label: "Área de Bolsas" },
  { img: galleryChampions, label: "Nuestros Campeones" },
  { img: galleryTraining, label: "Pad Work" },
  { img: gallerySparring, label: "Sesión de Sparring" },
];

const GallerySection = () => {
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
    <section id="galeria" className="bg-background py-[100px] px-0" ref={ref}>
      <div className="px-6 md:px-[60px] mb-[50px]">
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
            className={`overflow-hidden relative group ${i === 0 ? "md:row-span-2 col-span-2 md:col-span-1" : ""}`}
          >
            <img
              src={item.img}
              alt={item.label}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 filter grayscale contrast-[1.1] group-hover:grayscale-[30%]"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
              <span className="font-display font-bold text-base uppercase tracking-[0.15em]">{item.label}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default GallerySection;
