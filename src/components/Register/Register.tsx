import { type FC, type SyntheticEvent, useState, useCallback } from "react";
import Form from "../shared/Form";
import Button from "../shared/buttons/Button";
import { useRouter } from "next/router";
import RegisterForm from "./RegisterForm";
import { trpc } from "../../utils/trpc";

const Register: FC = () => {
  const router = useRouter();

  const [credentials, setCredentials] = useState<{
    username: string;
    email: string;
    password: string;
  }>({
    username: "",
    email: "",
    password: "",
  });

  const { mutateAsync } = trpc.auth.signup.useMutation();

  const onInputChange = (e: SyntheticEvent) => {
    const { value, name } = e.target as HTMLInputElement;

    setCredentials((state) => ({ ...state, [name]: value }));
  };

  // const handleSubmit = useCallback(
  //   async (data: { username: string; email: string; password: string }) => {
  //     console.log("hello");
  //     try {
  //       const result = await mutateAsync(data);
  //       if (result.status === 201) {
  //         router.push("/");
  //       }
  //     } catch (err) {
  //       console.error(err);
  //     }
  //   },
  //   [mutateAsync, router]
  // );

  const handleSubmit = async (
    e: SyntheticEvent,
    data: { username: string; email: string; password: string }
  ) => {
    e.preventDefault();
    try {
      const result = await mutateAsync(data);
      if (result.status === 201) {
        router.push("/");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="w-full gap-28 rounded-md bg-secondary px-10 py-10">
      <h1 className="mb-16 text-center">Expense Tracker</h1>
      <form onSubmit={(e) => handleSubmit(e, credentials)}>
        <RegisterForm
          username={credentials.username}
          email={credentials.email}
          password={credentials.password}
          onInputChange={onInputChange}
        />
      </form>
      <Button
        type="submit"
        className="mx-auto mt-12 flex w-2/4 justify-center rounded-md bg-purple px-4 py-1 text-lg font-bold transition-colors duration-300 hover:bg-purpleHover"
      >
        Create Account
      </Button>
    </div>
  );
};

export default Register;
