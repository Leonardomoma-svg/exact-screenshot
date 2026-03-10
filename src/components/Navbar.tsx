import { useEffect, useState, useRef } from "react";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [activeId, setActiveId] = useState<string>("hero");
  const [mobileOpen, setMobileOpen] = useState(false);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  };

  const scrollToForm = () => {
    const el = document.getElementById("contacto-form") ?? document.getElementById("contacto");
    el?.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  };

  const links = [
    { label: "Clases", id: "clases" },
    { label: "Horarios", id: "horarios" },
    { label: "Equipo", id: "entrenadores" },
    { label: "Membresías", id: "membresias" },
    { label: "Aragón", id: "aragon" },
    { label: "Galería", id: "galeria" },
    { label: "Eventos", id: "eventos" },
    { label: "Contacto", id: "contacto" },
  ];

  useEffect(() => {
    const ids = ["hero", ...links.map((l) => l.id)];

    const computeActive = () => {
      const offset = 120;

      const positions = ids
        .map((id) => {
          const el = document.getElementById(id);
          if (!el) return null;
          const rect = el.getBoundingClientRect();
          return { id, top: rect.top };
        })
        .filter(Boolean) as { id: string; top: number }[];

      const eligible = positions
        .filter((p) => p.top <= offset)
        .sort((a, b) => b.top - a.top);

      const next = eligible[0]?.id ?? positions.sort((a, b) => a.top - b.top)[0]?.id;
      if (next) setActiveId(next);
    };

    const onScroll = () => {
      if (rafRef.current) return;
      rafRef.current = window.requestAnimationFrame(() => {
        rafRef.current = null;
        computeActive();
      });
    };

    computeActive();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (rafRef.current) window.cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    };
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between transition-all duration-300 ${
          scrolled
            ? "py-4 px-6 lg:px-[60px] bg-black/35 border-b border-white/10"
            : "py-6 px-6 lg:px-[60px] bg-transparent"
        } backdrop-blur-sm`}
      >
      <a
        href="#hero"
        onClick={(e) => { e.preventDefault(); scrollTo("hero"); }}
        className="font-display font-black text-[2rem] tracking-[0.12em] uppercase text-white no-underline"
      >
        <img
          src="/logo.png"
          alt="Corner"
          className="h-10 w-auto block origin-left scale-[4] -translate-x-10"
          draggable={false}
        />
      </a>

      <ul className="hidden lg:flex gap-7 list-none ml-10">
        {links.map((link) => (
          <li key={link.id}>
            <a
              href={`#${link.id}`}
              onClick={(e) => { e.preventDefault(); scrollTo(link.id); }}
              className={`font-display text-[0.85rem] tracking-[0.18em] uppercase no-underline relative transition-colors whitespace-nowrap after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:bg-electric after:transition-all after:duration-300 hover:after:w-full ${
                activeId === link.id
                  ? "font-black text-white after:w-full"
                  : "font-semibold text-white/80 hover:text-white after:w-0"
              }`}
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>

      <button
        type="button"
        onClick={() => setMobileOpen((v) => !v)}
        aria-label={mobileOpen ? "Cerrar menú" : "Abrir menú"}
        className="lg:hidden h-11 w-11 rounded-xl border border-white/15 bg-black/25 text-white flex items-center justify-center backdrop-blur-sm"
      >
        <span className="text-[1.35rem] leading-none">{mobileOpen ? "×" : "☰"}</span>
      </button>

      <a
        href="https://wa.me/528180836450"
        target="_blank"
        rel="noreferrer"
        aria-label="WhatsApp 81 8083 6450"
        className="hidden lg:inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366] border border-[#25D366] text-white shadow-[0_14px_40px_rgba(0,0,0,0.45)] hover:bg-[#1EBE5A] hover:border-[#1EBE5A] transition-colors"
      >
        <svg viewBox="0 0 32 32" className="h-6 w-6" fill="currentColor" aria-hidden="true">
          <path d="M19.11 17.25c-.27-.14-1.6-.79-1.85-.88-.25-.09-.43-.14-.61.14-.18.27-.7.88-.86 1.06-.16.18-.32.2-.59.07-.27-.14-1.14-.42-2.17-1.34-.8-.71-1.34-1.59-1.5-1.86-.16-.27-.02-.42.12-.56.12-.12.27-.32.41-.48.14-.16.18-.27.27-.45.09-.18.05-.34-.02-.48-.07-.14-.61-1.47-.84-2.01-.22-.53-.45-.46-.61-.47-.16-.01-.34-.01-.52-.01-.18 0-.48.07-.73.34-.25.27-.95.93-.95 2.26 0 1.33.98 2.62 1.12 2.8.14.18 1.93 2.95 4.67 4.13.65.28 1.16.45 1.55.58.65.21 1.25.18 1.72.11.52-.08 1.6-.65 1.82-1.28.23-.63.23-1.17.16-1.28-.07-.11-.25-.18-.52-.32z"/>
          <path d="M26.67 5.33C23.85 2.51 20.09 1 16.1 1 7.99 1 1.4 7.59 1.4 15.7c0 2.59.68 5.12 1.98 7.35L1 31l8.15-2.14c2.18 1.19 4.64 1.82 7.14 1.82h.01c8.11 0 14.7-6.59 14.7-14.7 0-3.99-1.55-7.75-4.33-10.65zM16.3 28.1h-.01c-2.19 0-4.34-.59-6.21-1.71l-.45-.27-4.83 1.27 1.29-4.71-.29-.48a12.35 12.35 0 0 1-1.9-6.5C3.9 8.98 9.33 3.55 16.1 3.55c3.28 0 6.36 1.28 8.68 3.6a12.19 12.19 0 0 1 3.59 8.65c0 6.77-5.42 12.3-12.07 12.3z"/>
        </svg>
      </a>

      <button
        onClick={scrollToForm}
        className="hidden lg:block font-display font-bold text-[0.85rem] tracking-[0.2em] uppercase bg-electric text-foreground border-none py-3 px-7 clip-skew-sm hover:bg-electric-hover hover:-translate-y-px transition-all mr-[-18px]"
      >
        Clase Gratis
      </button>
      </nav>

      {mobileOpen && (
        <div
          className="fixed inset-0 z-[60] lg:hidden bg-black/55"
          onClick={() => setMobileOpen(false)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="absolute top-[72px] left-4 right-4 rounded-2xl border border-white/10 bg-black/70 backdrop-blur-md overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 grid gap-2">
              {links.map((link) => (
                <button
                  key={link.id}
                  type="button"
                  onClick={() => scrollTo(link.id)}
                  className={`w-full text-left rounded-xl border px-4 py-3 font-display font-black tracking-[0.18em] uppercase text-[0.85rem] transition-colors ${
                    activeId === link.id
                      ? "bg-secondary border-electric text-white"
                      : "bg-black/25 border-white/10 text-white/85"
                  }`}
                >
                  {link.label}
                </button>
              ))}

              <a
                href="https://wa.me/528180836450"
                target="_blank"
                rel="noreferrer"
                className="mt-2 w-full text-left rounded-xl border px-4 py-3 font-display font-black tracking-[0.18em] uppercase text-[0.85rem] transition-colors bg-[#25D366] border-[#25D366] text-white"
              >
                WhatsApp
              </a>

              <button
                type="button"
                onClick={scrollToForm}
                className="w-full text-left rounded-xl border px-4 py-3 font-display font-black tracking-[0.18em] uppercase text-[0.85rem] transition-colors bg-electric border-electric text-foreground"
              >
                Clase Gratis
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
