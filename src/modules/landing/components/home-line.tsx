import Image from "next/image";

const HomeLine = () => {
  return (
    <div className="w-11 sm:w-[8.33333%] flex flex-col pointer-events-none relative">
      <div className="mx-auto">
        <div className="inline-block rounded-full p-[4.5px] border-2 border-bittersweet-400/30"></div>
      </div>
      <div className="w-[3px] h-[42%] sm:h-[58%] lg:h-1/2 mx-auto rounded-full bg-[linear-gradient(transparent,#fa8072_30%)]"></div>
      <div className="mx-auto my-4">
        <div className="relative inline-block">
          <Image
            className="inline-block w-5 align-text-bottom z-[1]"
            width={150}
            height={150}
            src="/surface-01.svg"
            alt=""
            aria-hidden="true"
          />
          <span
            id="circle-1"
            className="absolute left-[-11px] -top-px sm:-left-2 sm:-top-1 size-9 border-2 border-green-700/70 -radical-red-300 rounded-full"
          ></span>
          <span
            id="circle-2"
            className="absolute left-[-19px] top-[-9px] sm:-left-4 sm:top-[-12px] size-[52px] border-2 border-broom-600/70 -radical-red-300 rounded-full"
          ></span>
        </div>
      </div>
      <div
        id="line-1"
        className="mx-auto -mb-48 mt-1 z-20 w-[3px] h-[62%] sm:h-[46%] lg:h-[54%] bg-[linear-gradient(#fa8072,_#0096b5_80%,transparent)] rounded-full"
      ></div>
    </div>
  );
};

export default HomeLine;
