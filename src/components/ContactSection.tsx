import { useMemo, useState } from "react";
import { Facebook, Instagram } from "lucide-react";

const ContactSection = () => {
  const formspreeEndpoint = useMemo(
    () => (import.meta as any).env?.VITE_FORMSPREE_ENDPOINT as string | undefined,
    [],
  );

  const [formData, setFormData] = useState({
    nombre: "", apellido: "", telefono: "", email: "", mensaje: "",
  });

  const [submitState, setSubmitState] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitState === "sending") return;

    setSubmitError(null);
    setSubmitState("sending");

    if (!formspreeEndpoint) {
      setSubmitError("Falta configurar el endpoint del formulario.");
      setSubmitState("error");
      return;
    }

    if (!formData.nombre.trim() || !formData.apellido.trim() || !formData.telefono.trim() || !formData.email.trim()) {
      setSubmitError("Por favor completa nombre, apellido, teléfono y email.");
      setSubmitState("error");
      return;
    }

    try {
      const res = await fetch(formspreeEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          nombre: formData.nombre,
          apellido: formData.apellido,
          telefono: formData.telefono,
          email: formData.email,
          mensaje: formData.mensaje,
        }),
      });

      if (!res.ok) {
        setSubmitError("No se pudo enviar. Intenta de nuevo en un momento.");
        setSubmitState("error");
        return;
      }

      setSubmitState("success");
      setFormData({ nombre: "", apellido: "", telefono: "", email: "", mensaje: "" });
    } catch {
      setSubmitError("No se pudo enviar. Revisa tu conexión e intenta de nuevo.");
      setSubmitState("error");
    }
  };

  return (
    <>
      <section id="contacto" className="grid grid-cols-1 lg:grid-cols-2 gap-0">
        {/* Info */}
        <div className="bg-navy-3 p-[60px] md:p-[100px_60px] relative overflow-hidden">
          <div className="font-display font-semibold text-[0.75rem] tracking-[0.35em] uppercase text-electric mb-4 flex items-center gap-3">
            <span className="w-6 h-0.5 bg-electric" />
            Encuéntranos
          </div>
          <h2 className="font-display font-black text-[clamp(2.5rem,5vw,4.5rem)] uppercase leading-[0.9] mb-[60px]">
            Tu primer<br /><em className="italic text-stroke not-italic">round</em><br />es gratis.
          </h2>

          <div className="mb-[50px]">
            {[
              {
                label: "Dirección",
                value:
                  "Av. Eugenio Garza Sada Sur 2622, Tecnológico, 64700 Monterrey, N.L, Monterrey, Mexico, 64700",
              },
              {
                label: "Horarios",
                value:
                  "Lun–Vie: Chava 6:00am – 8:00am\nLun–Vie: Chava 4:00pm – 7:00pm\nLun–Vie: Hugo 7:00pm – 10:00pm\nSáb: Hugo 10:00am – 1:00pm",
              },
              { label: "Teléfono", value: "+52 81 8083 6450" },
              { label: "Email", value: "info@cornerboxing.mx" },
            ].map((item) => (
              <div key={item.label} className="py-6 border-b border-dim/30">
                <div className="font-display font-semibold text-[0.7rem] tracking-[0.3em] uppercase text-electric mb-2">{item.label}</div>
                <div className="text-base text-foreground whitespace-pre-line">{item.value}</div>
              </div>
            ))}
          </div>

          <div className="font-display font-semibold text-[0.7rem] tracking-[0.3em] uppercase text-electric mb-3">
            Síguenos en nuestras redes
          </div>
          <div className="flex gap-4">
            <a
              href="https://www.instagram.com/cornerboxmty/"
              target="_blank"
              rel="noreferrer"
              className="w-11 h-11 bg-secondary border border-primary/20 flex items-center justify-center no-underline text-grey clip-skew-sm hover:bg-[#E1306C] hover:text-white hover:border-[#E1306C] transition-all"
              aria-label="Instagram"
            >
              <Instagram className="h-5 w-5" />
            </a>
            <a
              href="https://www.facebook.com/bluecornerboxmty"
              target="_blank"
              rel="noreferrer"
              className="w-11 h-11 bg-secondary border border-primary/20 flex items-center justify-center no-underline text-grey clip-skew-sm hover:bg-[#1877F2] hover:text-white hover:border-[#1877F2] transition-all"
              aria-label="Facebook"
            >
              <Facebook className="h-5 w-5" />
            </a>
            <a
              href="https://www.tiktok.com/@cornerboxingclub?_r=1&_t=ZS-94ZWEproyDH"
              target="_blank"
              rel="noreferrer"
              className="w-11 h-11 bg-secondary border border-primary/20 flex items-center justify-center no-underline text-grey clip-skew-sm hover:bg-black hover:text-white hover:border-black transition-all"
              aria-label="TikTok"
            >
              <svg
                viewBox="0 0 48 48"
                className="h-5 w-5"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M33.7 6c.6 5 4.2 9 9.1 9.8V21c-3.3 0-6.3-1.1-8.7-2.9v13.2c0 7-5.7 12.7-12.7 12.7S8.7 38.3 8.7 31.3c0-7 5.7-12.7 12.7-12.7.7 0 1.4.1 2.1.2v5.6c-.7-.2-1.4-.4-2.1-.4-3.9 0-7 3.1-7 7s3.1 7 7 7 7-3.1 7-7V6h5.3z" />
              </svg>
            </a>
          </div>

          {/* Watermark */}
          <div className="absolute -bottom-5 -right-5 font-display font-black text-[10rem] text-primary/[0.04] leading-none select-none pointer-events-none">
            CORNER
          </div>
        </div>

        {/* Form */}
        <div id="contacto-form" className="bg-navy-2 p-[60px] md:p-[100px_60px]">
          <div className="font-display font-semibold text-[0.75rem] tracking-[0.35em] uppercase text-electric mb-4 flex items-center gap-3">
            <span className="w-6 h-0.5 bg-electric" />
            Clase de Prueba
          </div>
          <h3 className="font-display font-black text-[2rem] uppercase mb-9">
            Reserva tu<br />clase gratis
          </h3>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block font-display font-semibold text-[0.7rem] tracking-[0.25em] uppercase text-grey mb-2">Nombre</label>
                <input
                  type="text"
                  placeholder="Tu nombre"
                  value={formData.nombre}
                  onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                  className="w-full bg-navy-3 border border-dim/40 border-b-dim text-foreground py-3.5 px-[18px] font-body text-[0.9rem] outline-none focus:border-electric focus:bg-secondary transition-all"
                />
              </div>
              <div>
                <label className="block font-display font-semibold text-[0.7rem] tracking-[0.25em] uppercase text-grey mb-2">Apellido</label>
                <input
                  type="text"
                  placeholder="Tu apellido"
                  value={formData.apellido}
                  onChange={(e) => setFormData({ ...formData, apellido: e.target.value })}
                  className="w-full bg-navy-3 border border-dim/40 border-b-dim text-foreground py-3.5 px-[18px] font-body text-[0.9rem] outline-none focus:border-electric focus:bg-secondary transition-all"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block font-display font-semibold text-[0.7rem] tracking-[0.25em] uppercase text-grey mb-2">Teléfono</label>
                <input
                  type="tel"
                  placeholder="+52 81 0000 0000"
                  value={formData.telefono}
                  onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                  className="w-full bg-navy-3 border border-dim/40 border-b-dim text-foreground py-3.5 px-[18px] font-body text-[0.9rem] outline-none focus:border-electric focus:bg-secondary transition-all"
                />
              </div>
              <div>
                <label className="block font-display font-semibold text-[0.7rem] tracking-[0.25em] uppercase text-grey mb-2">Email</label>
                <input
                  type="email"
                  placeholder="tu@correo.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-navy-3 border border-dim/40 border-b-dim text-foreground py-3.5 px-[18px] font-body text-[0.9rem] outline-none focus:border-electric focus:bg-secondary transition-all"
                />
              </div>
            </div>
            <div className="mb-4">
              <label className="block font-display font-semibold text-[0.7rem] tracking-[0.25em] uppercase text-grey mb-2">Mensaje (opcional)</label>
              <textarea
                placeholder="¿Algo que debamos saber antes de tu primera clase?"
                value={formData.mensaje}
                onChange={(e) => setFormData({ ...formData, mensaje: e.target.value })}
                className="w-full bg-navy-3 border border-dim/40 border-b-dim text-foreground py-3.5 px-[18px] font-body text-[0.9rem] outline-none focus:border-electric focus:bg-secondary transition-all resize-y min-h-[100px]"
              />
            </div>
            <button
              type="submit"
              className="mt-2 font-display font-bold text-[0.9rem] tracking-[0.2em] uppercase bg-electric text-foreground border-none py-[18px] px-[50px] clip-skew hover:bg-electric-hover hover:-translate-y-0.5 transition-all disabled:opacity-60 disabled:pointer-events-none"
              disabled={submitState === "sending"}
            >
              {submitState === "sending" ? "Enviando…" : "Reservar Clase Gratis →"}
            </button>

            {submitState === "success" && (
              <div className="mt-4 text-[0.9rem] text-electric">
                ¡Listo! Recibimos tu información.
              </div>
            )}
            {submitState === "error" && (
              <div className="mt-4 text-[0.9rem] text-red-400">
                {submitError ?? "Ocurrió un error al enviar."}
              </div>
            )}
          </form>
        </div>
      </section>

      <div className="bg-background border-t border-primary/15 flex justify-center px-6 md:px-[60px] py-10">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1958.3479052977393!2d-100.29205946139848!3d25.651015557609377!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8662bf6332063c8f%3A0x9710b5a6941b6d62!2sBlue%20Corner%20Boxing%20Club!5e0!3m2!1ses!2smx!4v1772625872046!5m2!1ses!2smx"
          className="w-full max-w-[640px] h-[380px] md:h-[450px]"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Ubicación en Google Maps"
        />
      </div>
    </>
  );
};

export default ContactSection;
