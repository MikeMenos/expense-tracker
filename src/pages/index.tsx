import { type NextPage } from "next";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import Router from "next/router";
import Layout from "../components/shared/Layout";

const Home: NextPage = () => {
  const { status } = useSession();

  useEffect(() => {
    if (status === "unauthenticated") Router.replace("/signin");
  }, [status]);

  if (status === "loading") return <div>Loading...</div>;

  if (status === "unauthenticated") return null;

  return (
    <>
      <Layout>
        <div>HELLO DASHBOARD</div>
      </Layout>
    </>
  );
};

export default Home;
