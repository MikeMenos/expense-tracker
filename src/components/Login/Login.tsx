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
    <div className="w-full gap-28 bg-white px-28">
      <h1 className="mb-16 text-center">Expense Tracker</h1>
      <Form onSubmit={handleSubmit}>
        <LoginForm
          username={credentials.username}
          password={credentials.password}
          onInputChange={onInputChange}
        />
      </Form>
    </div>
  );
};

export default Login;
