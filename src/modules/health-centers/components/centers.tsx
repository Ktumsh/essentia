import GoogleMaps from "./google-maps";

const Centers = () => {
  return (
    <div className="fixed flex w-full flex-col md:static md:mt-0">
      <div className="flex-1">
        <div className="mx-auto size-full max-w-full flex-1 bg-white text-main dark:bg-full-dark dark:text-main-dark md:min-h-full">
          <div className="relative size-full">
            <GoogleMaps />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Centers;
