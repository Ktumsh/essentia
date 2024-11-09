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
    <div className="mb-6 flex flex-col">
      <div>
        {title === "Más" ? (
          <div className="text-md mb-2 inline-block border-b border-transparent font-bold">
            {title}
          </div>
        ) : (
          <Link
            className="text-md mb-2 inline-block border-b border-transparent font-bold"
            href={href || "#"}
          >
            {title}
          </Link>
        )}
      </div>
      {links.map((link, index) => (
        <div key={index}>
          <Link
            className="inline-block border-b border-transparent text-sm hover:border-current dark:text-main-dark"
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
