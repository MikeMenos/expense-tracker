import Layout from "../components/shared/Layout";
import { NextPage } from "next";
import { useEffect } from "react";
import Router from "next/router";
import { useSession } from "next-auth/react";

const Settings: NextPage = () => {
  const { status } = useSession();

  useEffect(() => {
    if (status === "unauthenticated") Router.replace("/signin");
  }, [status]);

  if (status === "loading") return <div>Loading...</div>;
  if (status === "unauthenticated") return null;

  return (
    <Layout>
      <div>HELLO SETTINGS</div>
    </Layout>
  );
};

export default Settings;
