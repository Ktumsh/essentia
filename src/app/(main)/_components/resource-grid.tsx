import { RESOURCE_DATA } from "@/consts/resources-data";

import ResourceItem from "./resource-item";

const ResourceGrid = () => {
  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
      {RESOURCE_DATA.map((item, index) => (
        <ResourceItem key={index} index={index} {...item} />
      ))}
    </div>
  );
};

export default ResourceGrid;
