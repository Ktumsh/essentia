import AerisLogo from "@/components/layout/aeris-logo";

const StockFooter = () => {
  return (
    <div className="bg-premium dark:border-accent border-t border-slate-100 bg-clip-text px-6 py-4 text-center text-xs font-semibold text-transparent">
      Generado por{" "}
      <AerisLogo
        src="/aeris-logo-fuchsia.svg"
        className="-mr-0.5 inline-block translate-y-[-3px] align-top"
      />
      eris
    </div>
  );
};

export default StockFooter;
