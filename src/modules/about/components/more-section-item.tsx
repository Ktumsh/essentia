import { StarIcon } from "@/modules/icons/common";

const MoreSectionItem = ({
  text,
  children,
}: {
  text: string;
  children?: React.ReactNode;
}) => {
  return (
    <li className="flex text-start text-main">
      <div className="box-border min-w-0 flex-[0_0_auto]">
        <span
          aria-hidden="true"
          className="box-border inline-flex size-4 items-center pt-3 text-bittersweet-400"
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
