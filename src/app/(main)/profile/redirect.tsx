import { getFirstNameAndLastName } from "@/utils/common";
import { auth } from "@@/auth";
import { GetServerSideProps } from "next";
import { redirect } from "next/navigation";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await auth(context);

  if (!session) {
    return redirect("/bienvenida");
  }

  const normalizeName = getFirstNameAndLastName(session?.user?.name);
  const username = session?.user?.username || normalizeName;

  return {
    redirect: {
      destination: `/profile/${encodeURIComponent(username)}`,
      permanent: false,
    },
  };
};

const RedirectPage = () => null;

export default RedirectPage;
