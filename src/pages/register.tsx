import { type NextPage } from "next";
import { useSession } from "next-auth/react";
import { type FormEventHandler, useEffect, useState } from "react";
import { BsDiscord } from "react-icons/bs";
import Router, { useRouter } from "next/router";
import Head from "next/head";
import { useGetPageTitle } from "../hooks/useGetPageTitle";
import Loader from "../components/shared/Loader";
import SignUp from "../components/Register/Register";

const Register: NextPage = () => {
  const { status } = useSession();
  const router = useRouter();
  const { title } = useGetPageTitle(router.pathname);

  // const [userInfo, setUserInfo] = useState({ email: "", password: "" });

  useEffect(() => {
    if (status === "authenticated") Router.replace("/");
  }, [status]);

  if (status === "loading")
    return (
      <div className="flex h-screen w-full justify-center bg-main">
        <Loader />
      </div>
    );
  if (status === "authenticated") return null;

  return (
    <>
      <div className="flex h-screen items-center justify-center bg-main">
        <div className="flex w-[450px] flex-col items-center justify-center rounded-md bg-secondary py-10">
          <SignUp />
        </div>
      </div>
    </>
  );
};

export default Register;
