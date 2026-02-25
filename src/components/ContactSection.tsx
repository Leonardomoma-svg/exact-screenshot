import { useState } from "react";

const ContactSection = () => {
  const [formData, setFormData] = useState({
    nombre: "", apellido: "", telefono: "", email: "", clase: "", experiencia: "Soy completamente nuevo", mensaje: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
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
              { label: "Dirección", value: "Av. Insurgentes 1450, Col. Centro\nMonterrey, N.L. 64000" },
              { label: "Horarios", value: "Lun–Vie: 7:00am – 10:00pm\nSáb: 8:00am – 2:00pm" },
              { label: "Teléfono", value: "+52 (81) 1234-5678" },
              { label: "Email", value: "info@cornerboxing.mx" },
            ].map((item) => (
              <div key={item.label} className="py-6 border-b border-dim/30">
                <div className="font-display font-semibold text-[0.7rem] tracking-[0.3em] uppercase text-electric mb-2">{item.label}</div>
                <div className="text-base text-foreground whitespace-pre-line">{item.value}</div>
              </div>
            ))}
          </div>

          <div className="flex gap-4">
            {["IG", "FB", "YT", "TK"].map((s) => (
              <a
                key={s}
                href="#"
                className="w-11 h-11 bg-secondary border border-primary/20 flex items-center justify-center no-underline text-grey font-display font-bold text-[0.7rem] tracking-wider clip-skew-sm hover:bg-electric hover:text-foreground hover:border-electric transition-all"
              >
                {s}
              </a>
            ))}
          </div>

          {/* Watermark */}
          <div className="absolute -bottom-5 -right-5 font-display font-black text-[10rem] text-primary/[0.04] leading-none select-none pointer-events-none">
            CORNER
          </div>
        </div>

        {/* Form */}
        <div className="bg-navy-2 p-[60px] md:p-[100px_60px]">
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
              <label className="block font-display font-semibold text-[0.7rem] tracking-[0.25em] uppercase text-grey mb-2">Clase de interés</label>
              <select
                value={formData.clase}
                onChange={(e) => setFormData({ ...formData, clase: e.target.value })}
                className="w-full bg-navy-3 border border-dim/40 border-b-dim text-foreground py-3.5 px-[18px] font-body text-[0.9rem] outline-none focus:border-electric focus:bg-secondary transition-all appearance-none"
              >
                <option value="" className="bg-navy-2">Selecciona una clase</option>
                <option className="bg-navy-2">Boxing Fundamentals</option>
                <option className="bg-navy-2">Boxing Fit</option>
                <option className="bg-navy-2">Sparring & Técnica</option>
                <option className="bg-navy-2">Acondicionamiento</option>
                <option className="bg-navy-2">Kids Boxing</option>
                <option className="bg-navy-2">Entrenamiento Privado</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block font-display font-semibold text-[0.7rem] tracking-[0.25em] uppercase text-grey mb-2">¿Tienes experiencia previa?</label>
              <select
                value={formData.experiencia}
                onChange={(e) => setFormData({ ...formData, experiencia: e.target.value })}
                className="w-full bg-navy-3 border border-dim/40 border-b-dim text-foreground py-3.5 px-[18px] font-body text-[0.9rem] outline-none focus:border-electric focus:bg-secondary transition-all appearance-none"
              >
                <option className="bg-navy-2">Soy completamente nuevo</option>
                <option className="bg-navy-2">Algo de experiencia</option>
                <option className="bg-navy-2">Intermedio</option>
                <option className="bg-navy-2">Avanzado / Competitivo</option>
              </select>
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
              className="mt-2 font-display font-bold text-[0.9rem] tracking-[0.2em] uppercase bg-electric text-foreground border-none py-[18px] px-[50px] clip-skew hover:bg-electric-hover hover:-translate-y-0.5 transition-all"
            >
              Reservar Clase Gratis →
            </button>
          </form>
        </div>
      </section>

      {/* Map Placeholder */}
      <div className="bg-background h-[300px] flex items-center justify-center border-t border-primary/15 relative overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "linear-gradient(hsla(214,80%,48%,0.06) 1px, transparent 1px), linear-gradient(90deg, hsla(214,80%,48%,0.06) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
        <div className="relative z-10 text-center">
          <div className="w-4 h-4 bg-electric rounded-full mx-auto mb-2 animate-pulse-ring" />
          <div className="font-display font-bold text-[0.8rem] tracking-[0.2em] uppercase text-grey">
            Corner Boxing Academy · Monterrey
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactSection;
