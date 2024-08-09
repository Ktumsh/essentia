import Link from "next/link";

interface Props {
  href?: string;
  title: string;
  links: {
    text: string;
    href: string;
  }[];
}

const LinkList = ({ href, title, links }: Props) => {
  return (
    <div className="flex flex-col mb-6">
      <div>
        {title === "Más" ? (
          <div className="border-b inline-block border-transparent text-md mb-2 font-bold">
            {title}
          </div>
        ) : (
          <Link
            className="border-b inline-block border-transparent text-md mb-2 font-bold"
            href={href || "#"}
          >
            {title}
          </Link>
        )}
      </div>
      {links.map((link, index) => (
        <div key={index}>
          <Link
            className="border-b inline-block border-transparent text-sm hover:border-current dark:text-base-color-dark"
            href={link.href}
          >
            {link.text}
          </Link>
        </div>
      ))}
    </div>
  );
};

export default LinkList;
