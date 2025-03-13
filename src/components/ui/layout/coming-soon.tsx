import Image from "next/image";

const ComingSoon = () => {
  return (
    <div className="flex flex-1 flex-col items-center justify-center space-y-4 p-5 text-main dark:text-main-dark">
      <Image
        width={353}
        height={339}
        priority
        alt="proximamente"
        aria-hidden="true"
        src="/extras/essentia-utils-01.png"
        className="h-40 w-auto drop-shadow-md"
      />
      <div className="inline-flex flex-col items-center">
        <h3 className="text-lg font-semibold">Próximamente...</h3>
        <p className="text-main-m dark:text-main-dark-m">
          Estamos trabajando para ti
        </p>
      </div>
    </div>
  );
};

export default ComingSoon;
