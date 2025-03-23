const MedicineItem = ({
  name,
  description,
}: {
  name: string;
  description: string;
}) => (
  <li>
    <strong className="text-foreground">{name}:</strong> {description}
  </li>
);

export default MedicineItem;
