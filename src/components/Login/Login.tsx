import Link from "next/link";
import { type FC, type SyntheticEvent, useState } from "react";
import Form from "../shared/Form";
import LoginForm from "./LoginForm";
import Button from "../shared/buttons/Button";
import { signIn } from "next-auth/react";

const Login: FC = () => {
  const [credentials, setCredentials] = useState<{
    email: string;
    password: string;
  }>({
    email: "",
    password: "",
  });

  const onInputChange = (e: SyntheticEvent) => {
    const { value, name } = e.target as HTMLInputElement;

    setCredentials((state) => ({ ...state, [name]: value }));
  };

  const handleSubmit = async (e: SyntheticEvent) => {
    // validate your userinfo
    e.preventDefault();

    const res = await signIn("credentials", {
      email: credentials.email,
      password: credentials.password,
      redirect: true,
    });

    console.log(res);
  };
  return (
    <div className="w-full gap-28 rounded-md bg-secondary px-10 py-10">
      <h1 className="mb-16 text-center">Expense Tracker</h1>
      <Form onSubmit={handleSubmit} submitBtnVisible={false}>
        <LoginForm
          email={credentials.email}
          password={credentials.password}
          onInputChange={onInputChange}
        />
      </Form>
      <Link href="/forgot-password" className="w-full">
        <p className="mt-6 text-right text-sm opacity-60 hover:underline">
          Forgot password?
        </p>
      </Link>
      <Button
        type="submit"
        className="mx-auto mt-12 flex w-2/4 justify-center rounded-md bg-purple px-4 py-1 text-lg font-bold transition-colors duration-300 hover:bg-purpleHover"
      >
        Log In
      </Button>
    </div>
  );
};

export default Login;
