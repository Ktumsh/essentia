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
      <div className="flex-[0_0_auto] min-w-0 box-border">
        <span
          aria-hidden="true"
          className="pt-3 inline-flex box-border items-center size-4 text-bittersweet-400"
        >
          <StarIcon width="24" height="24" />
        </span>
      </div>
      <div className="flex-[1_1] min-w-0 pl-4 box-border">
        <span>
          {text}
          {children}
        </span>
      </div>
    </li>
  );
};

export default MoreSectionItem;
