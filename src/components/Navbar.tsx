import { useEffect, useState, useRef } from "react";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const links = [
    { label: "Clases", id: "clases" },
    { label: "Horarios", id: "horarios" },
    { label: "Equipo", id: "entrenadores" },
    { label: "Membresías", id: "membresias" },
    { label: "Aragón", id: "aragon" },
    { label: "Galería", id: "galeria" },
    { label: "Contacto", id: "contacto" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between transition-all duration-300 ${
        scrolled
          ? "py-4 px-[60px] bg-background/[0.97] border-b border-primary/15"
          : "py-6 px-[60px] bg-gradient-to-b from-background/95 to-transparent"
      } backdrop-blur-sm`}
    >
      <a
        href="#hero"
        onClick={(e) => { e.preventDefault(); scrollTo("hero"); }}
        className="font-display font-black text-[2rem] tracking-[0.12em] uppercase text-foreground no-underline"
      >
        CORNER<span className="text-electric">.</span>
      </a>

      <ul className="hidden lg:flex gap-9 list-none">
        {links.map((link) => (
          <li key={link.id}>
            <a
              href={`#${link.id}`}
              onClick={(e) => { e.preventDefault(); scrollTo(link.id); }}
              className="font-display font-semibold text-[0.85rem] tracking-[0.2em] uppercase text-grey no-underline relative hover:text-foreground transition-colors after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-electric after:transition-all after:duration-300 hover:after:w-full"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>

      <button
        onClick={() => scrollTo("contacto")}
        className="hidden lg:block font-display font-bold text-[0.85rem] tracking-[0.2em] uppercase bg-electric text-foreground border-none py-3 px-7 clip-skew-sm hover:bg-electric-hover hover:-translate-y-px transition-all"
      >
        Clase Gratis
      </button>
    </nav>
  );
};

export default Navbar;
