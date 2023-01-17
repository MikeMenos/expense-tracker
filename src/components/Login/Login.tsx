import Link from "next/link";
import {
  type FC,
  type SyntheticEvent,
  useState,
  type ChangeEvent,
  useEffect,
} from "react";
import Form from "../shared/Form";
import LoginForm from "./LoginForm";
import Button from "../shared/buttons/Button";
import { useRouter } from "next/router";
import { trpc } from "../../utils/trpc";

const Login: FC = () => {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [credentials, setCredentials] = useState<{
    email: string;
    password: string;
  }>({
    email: "",
    password: "",
  });

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target as HTMLInputElement;

    setCredentials((state) => ({ ...state, [name]: value }));
  };

  const { mutate: login, error } = trpc.auth.login.useMutation({
    onSuccess: () => {
      router.push("/");
    },
    onError: (data) => {
      setErrorMessage(data.message);
    },
  });

  useEffect(() => {
    if (errorMessage) {
      setTimeout(() => {
        setErrorMessage("");
      }, 3000);
    }
  }, [errorMessage]);

  const handleSubmit = async (
    e: SyntheticEvent,
    credentials: { email: string; password: string }
  ) => {
    e.preventDefault();

    login(credentials);
  };

  return (
    <div className="w-full gap-28 rounded-md bg-secondary px-10 py-10">
      <h1 className="mb-16 text-center">Expense Tracker</h1>
      <Form submitBtnVisible={false}>
        <p className="pb-1 text-sm text-red-600">{error && errorMessage}</p>
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
        onClick={(e) => handleSubmit(e, credentials)}
      >
        Log In
      </Button>
      <hr className="mx-auto mt-8 w-1/5 opacity-60" />
      <p className="mt-4 text-center text-sm opacity-60">
        Don&apos;t have an account? Click{" "}
        <span className="font-bold hover:underline">
          <Link href="/signup">here</Link>
        </span>{" "}
        to Sign Up
      </p>
    </div>
  );
};

export default Login;
