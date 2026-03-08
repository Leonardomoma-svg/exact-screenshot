const Footer = () => {
  return (
    <footer className="bg-[hsl(216,70%,3%)] py-[60px] px-6 md:px-[60px] flex flex-col md:flex-row items-center justify-between gap-5 border-t border-primary/10">
      <div className="font-display font-black text-[2.5rem] tracking-wider text-foreground">
        <img src="/logo.png" alt="Corner" className="h-24 w-auto block" draggable={false} />
      </div>
      <div className="font-display italic text-base text-dim tracking-wide text-center">
        "Todo campeón empezó siendo alguien que decidió no rendirse."
      </div>
      <div className="text-[0.75rem] text-dim tracking-wider">
        © 2025 Corner Boxing Academy · Monterrey, N.L.
      </div>
    </footer>
  );
};

export default Footer;
