import { type NextPage } from "next";
import { signIn, useSession } from "next-auth/react";
import { useEffect } from "react";
import Login from "../components/Login/Login";
import Button from "../components/shared/buttons/Button";
import { BsDiscord } from "react-icons/bs";
import Router, { useRouter } from "next/router";
import Head from "next/head";
import { useGetPageTitle } from "../hooks/useGetPageTitle";
import Loader from "../components/shared/Loader";

const SignIn: NextPage = () => {
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
      <Head>
        <title>Expense Tracker | {title}</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/public/favicon.ico" />
      </Head>
      <div className="flex h-screen items-center justify-center bg-main">
        <div className="flex w-[450px] flex-col items-center justify-center rounded-md bg-secondary py-10">
          <Login />
          <Button
            className="flex items-center gap-4 rounded-xl bg-[#404EED] px-6 py-2 font-semibold text-white hover:bg-[#4752C4]"
            onClick={() => signIn("discord")}
            icon={<BsDiscord size={"1.5em"} />}
          >
            Sign In with Discord
          </Button>{" "}
        </div>
      </div>
    </>
  );
};

export default SignIn;
