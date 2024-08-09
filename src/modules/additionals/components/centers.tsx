import GoogleMaps from "./google-maps";

export default function Centers() {
  return (
    <div className="relative w-full h-[500px] sm:h-[700px] px-5 bg-white/50 bg-bento-gradient dark:bg-none dark:bg-base-full-dark-50 border border-gray-100/50 dark:border-base-full-dark-50 backdrop-blur backdrop-saturate-150 shadow-md lg:rounded-xl">
      <div className="bg-noise bg-repeat bg-[length:100px] pointer-events-none absolute inset-0 opacity-5 lg:rounded-xl z-10"></div>
      <GoogleMaps />
    </div>
  );
}
