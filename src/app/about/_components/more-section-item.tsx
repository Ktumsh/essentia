import { StarIcon } from "@/components/ui/icons/common";

const MoreSectionItem = ({
  text,
  children,
}: {
  text: string;
  children?: React.ReactNode;
}) => {
  return (
    <li className="text-main flex text-start">
      <div className="box-border min-w-0 flex-[0_0_auto]">
        <span
          aria-hidden="true"
          className="text-bittersweet-400 box-border inline-flex size-4 items-center pt-3"
        >
          <StarIcon width="24" height="24" />
        </span>
      </div>
      <div className="box-border min-w-0 flex-[1_1] pl-4">
        <span>
          {text}
          {children}
        </span>
      </div>
    </li>
  );
};

export default MoreSectionItem;
