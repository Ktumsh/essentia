import Image from "next/image";

const ComingSoon = () => {
  return (
    <div className="flex flex-1 flex-col items-center justify-center p-5 space-y-4 text-base-color dark:text-base-color-dark">
      <Image
        width={353}
        height={339}
        priority
        alt="proximamente"
        aria-hidden="true"
        src="/extras/essentia-utils-01.png"
        className="h-40 drop-shadow-md w-auto"
      />
      <div className="inline-flex flex-col items-center">
        <h3 className="text-lg font-semibold">Próximamente...</h3>
        <p className="text-base-color-m dark:text-base-color-dark-m">
          Estamos trabajando para ti
        </p>
      </div>
    </div>
  );
};

export default ComingSoon;
