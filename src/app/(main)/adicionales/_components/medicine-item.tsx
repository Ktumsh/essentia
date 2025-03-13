const MedicineItem = ({
  name,
  description,
}: {
  name: string;
  description: string;
}) => (
  <li>
    <strong className="text-main dark:text-white">{name}:</strong> {description}
  </li>
);

export default MedicineItem;
