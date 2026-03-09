import { useEffect, useMemo, useRef, useState } from "react";
import { MessageCircle, X } from "lucide-react";
import { FAQ_ITEMS } from "@/content/faq";

type Msg = {
  id: string;
  from: "user" | "bot";
  text: string;
};

const DudasWidget = () => {
  const quickReplies = useMemo(() => FAQ_ITEMS, []);

  const scrollRef = useRef<HTMLDivElement>(null);
  const endRef = useRef<HTMLDivElement>(null);

  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([
    {
      id: "m0",
      from: "bot",
      text: "¡Hola! Soy el bot de Dudas. Elige una opción y te respondo al instante.",
    },
  ]);

  useEffect(() => {
    if (!open) return;
    window.setTimeout(() => {
      endRef.current?.scrollIntoView({ block: "end", behavior: "smooth" });
    }, 0);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    window.setTimeout(() => {
      endRef.current?.scrollIntoView({ block: "end", behavior: "smooth" });
    }, 0);
  }, [messages, open]);

  const pushMessage = (from: Msg["from"], text: string) => {
    setMessages((prev) => [
      ...prev,
      { id: `${Date.now()}-${Math.random()}`, from, text },
    ]);
  };

  const handleQuickReply = (label: string, answer: string) => {
    pushMessage("user", label);
    window.setTimeout(() => {
      pushMessage("bot", answer);
    }, 250);
  };

  return (
    <div className="fixed right-5 bottom-5 z-[60]">
      {open && (
        <div className="mb-3 w-[min(92vw,380px)] overflow-hidden rounded-2xl border border-white/10 bg-black/55 backdrop-blur-xl shadow-[0_20px_60px_rgba(0,0,0,0.45)]">
          <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
            <div className="flex items-center gap-2">
              <div className="h-9 w-9 rounded-full bg-electric/20 flex items-center justify-center">
                <MessageCircle className="h-5 w-5 text-white" />
              </div>
              <div className="leading-tight">
                <div className="font-display font-bold tracking-wide text-white">
                  Dudas
                </div>
                <div className="text-[0.75rem] text-white/70">
                  Respuestas rápidas (elige una)
                </div>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/5 hover:bg-white/10 transition-colors"
              aria-label="Cerrar"
            >
              <X className="h-5 w-5 text-white" />
            </button>
          </div>

          <div ref={scrollRef} className="max-h-[46vh] overflow-auto px-4 py-4 space-y-3">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex ${m.from === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-3 text-[0.9rem] leading-relaxed whitespace-pre-line ${
                    m.from === "user"
                      ? "bg-electric text-foreground"
                      : "bg-white/10 text-white"
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}
            <div ref={endRef} />
          </div>

          <div className="px-4 pb-4">
            <div className="grid grid-cols-2 gap-2">
              {quickReplies.map((q) => (
                <button
                  key={q.key}
                  type="button"
                  onClick={() => handleQuickReply(q.label, q.answer)}
                  className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-[0.8rem] font-display font-semibold tracking-wide uppercase text-white/90 hover:bg-white/10 transition-colors"
                >
                  {q.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="group inline-flex items-center gap-3 rounded-full bg-electric px-4 py-3 md:px-5 md:py-4 text-foreground shadow-[0_18px_50px_rgba(0,0,0,0.4)] hover:bg-electric-hover transition-colors"
        aria-label="Abrir dudas"
      >
        <span className="inline-flex h-9 w-9 md:h-10 md:w-10 items-center justify-center rounded-full bg-black/15">
          <MessageCircle className="h-5 w-5 md:h-6 md:w-6" />
        </span>
        <span className="hidden sm:inline font-display font-black tracking-[0.08em] uppercase">
          Dudas
        </span>
      </button>
    </div>
  );
};

export default DudasWidget;
