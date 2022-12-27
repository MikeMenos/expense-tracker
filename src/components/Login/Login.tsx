import Link from "next/link";
import { type FC, type SyntheticEvent, useState } from "react";
import Form from "../shared/Form";
import LoginForm from "./LoginForm";

const Login: FC = () => {
  const [credentials, setCredentials] = useState<{
    username: string;
    password: string;
  }>({
    username: "",
    password: "",
  });

  const onInputChange = (e: SyntheticEvent) => {
    const { value, name } = e.target as HTMLInputElement;

    setCredentials((state) => ({ ...state, [name]: value }));
  };

  const handleSubmit = () => {
    console.log("hello");
  };
  return (
    <div className="w-full gap-28 rounded-md bg-secondary px-10 py-10">
      <h1 className="mb-16 text-center">Expense Tracker</h1>
      <Form onSubmit={handleSubmit} submitBtnVisible={false}>
        <LoginForm
          username={credentials.username}
          password={credentials.password}
          onInputChange={onInputChange}
        />
      </Form>
      <Link href="/forgot-password" className="w-full">
        <p className="mt-6 text-right text-sm opacity-60 hover:underline">
          Forgot password?
        </p>
      </Link>
    </div>
  );
};

export default Login;
