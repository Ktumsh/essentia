import StorageCard from "./storage-card";

const StorageMobile = () => {
  return (
    <section className="w-full md:hidden">
      <h2 className="font-merriweather mb-2 ml-3 px-8 text-xl font-semibold tracking-tight normal-case">
        Mi almacenamiento médico
      </h2>
      <section className="flex w-full flex-col px-6">
        <StorageCard />
      </section>
    </section>
  );
};

export default StorageMobile;
