import Layout from "../components/shared/Layout";
import { type NextPage } from "next";
import { useEffect } from "react";
import Router from "next/router";
import { useSession } from "next-auth/react";
import Loader from "../components/shared/Loader";

const Settings: NextPage = () => {
  const { status } = useSession();

  useEffect(() => {
    if (status === "unauthenticated") Router.replace("/signin");
  }, [status]);

  if (status === "loading")
    return (
      <div className="flex h-screen w-full justify-center bg-main">
        <Loader />
      </div>
    );

  if (status === "unauthenticated") return null;

  return (
    <Layout>
      <div className="flex flex-col">
        <h1 className="mb-4">Settings</h1>
        <h3 className="mb-10 font-semibold text-purple">
          Review or change your personal settings
        </h3>
      </div>
    </Layout>
  );
};

export default Settings;
