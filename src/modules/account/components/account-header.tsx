const AccountHeader = ({ title }: { title: string }) => {
  return (
    <div className="px-6">
      <h1 className="py-4 text-2xl font-semibold leading-none tracking-tight dark:text-white sm:text-3xl md:pt-11">
        {title}
      </h1>
    </div>
  );
};

export default AccountHeader;
