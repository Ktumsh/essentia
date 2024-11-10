const MedicineItem = ({
  name,
  description,
}: {
  name: string;
  description: string;
}) => (
  <li>
    <strong>{name}:</strong> {description}
  </li>
);

export default MedicineItem;
