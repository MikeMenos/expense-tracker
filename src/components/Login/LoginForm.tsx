import Input from "../shared/Input";
import { FC, SyntheticEvent } from "react";

interface PropsInterface {
  username: string;
  password: string;
  onInputChange: (e: SyntheticEvent) => void;
}

const LoginForm: FC<PropsInterface> = ({
  username,
  password,
  onInputChange,
}) => {
  return (
    <div className="flex flex-col gap-6">
      <Input
        type="email"
        name="username"
        placeholder="Email"
        value={username}
        onChange={onInputChange}
        className="border-b p-2 outline-none"
        autoComplete={"off"}
      />
      <Input
        type="password"
        name="password"
        placeholder="Password"
        value={password}
        onChange={onInputChange}
        className="border-b p-2 outline-none"
        autoComplete={"off"}
      />
    </div>
  );
};

export default LoginForm;
