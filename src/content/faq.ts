export type FaqItem = {
  key: string;
  label: string;
  answer: string;
};

export const FAQ_ITEMS: FaqItem[] = [
  {
    key: "precios",
    label: "Precios",
    answer:
      "Mensualidad:\n- Estudiante: $1000 MXN\n- Campeón: $1200 MXN\n\nIncluye:\n- Clases ilimitadas\n- Área de bolsas\n- Vestuarios + lockers",
  },
  {
    key: "ninos",
    label: "Niños",
    answer:
      "Sí hay clases para niños.\n\nPara darte horarios exactos, mándanos:\n- Edad\n- Nivel (nuevo / intermedio)\n- Disponibilidad\n\nY te agendamos una clase de prueba.",
  },
  {
    key: "anualidad",
    label: "Anualidad",
    answer:
      "Anualidad (15% OFF pagando el año completo):\n- Estudiante: $10,200 MXN/año (1000 x 12 con 15% desc.)\n- Campeón: $12,240 MXN/año (1200 x 12 con 15% desc.)\n\nExtra en anualidad: 20% de descuento en Aragón.",
  },
  {
    key: "ubicacion",
    label: "Ubicación",
    answer:
      "Av. Eugenio Garza Sada Sur 2622, Tecnológico, Monterrey, N.L.",
  },
  {
    key: "horarios",
    label: "Horarios",
    answer:
      "Lun–Vie: Chava 6:00am – 8:00am\nLun–Vie: Chava 4:00pm – 7:00pm\nLun–Vie: Hugo 7:00pm – 10:00pm\nSáb: Hugo 10:00am – 1:00pm",
  },
  {
    key: "coaches",
    label: "Coaches",
    answer:
      "- Chavita Rodríguez: Campeón profesional\n- Hugo: Coach (12 años de experiencia)",
  },
  {
    key: "contacto",
    label: "Contacto",
    answer:
      "WhatsApp:\n- +52 81 8083 6450",
  },
  {
    key: "clase_gratis",
    label: "Clase Gratis",
    answer:
      "Tu primer round es gratis.\n\nPara agendar:\n- Mándanos WhatsApp\n- Te damos horarios\n- Reservamos tu lugar",
  },
  {
    key: "que_llevar",
    label: "¿Qué llevar?",
    answer:
      "Ropa cómoda, agua y toalla. Si no tienes guantes, te orientamos para tu primer día. Llega 10 minutos antes para registrarte.",
  },
  {
    key: "nivel",
    label: "¿Necesito experiencia?",
    answer:
      "No. Hay clases para principiantes y avanzados. Te ayudamos a elegir la mejor opción según tu condición y objetivos.",
  },
];
