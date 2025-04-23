import StorageCard from "./storage-card";

const StorageDesktop = () => {
  return (
    <div className="flex w-full flex-col">
      <h3 className="text-foreground mb-2 ml-3 px-5 text-base font-semibold lg:px-0">
        Mi almacenamiento médico
      </h3>
      <article className="flex h-full flex-col">
        <StorageCard />
      </article>
    </div>
  );
};

export default StorageDesktop;
