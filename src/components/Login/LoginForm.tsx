import Input from "../shared/Input";
import { type FC, type SyntheticEvent } from "react";

interface PropsInterface {
  email: string;
  password: string;
  onInputChange: (e: SyntheticEvent) => void;
}

const LoginForm: FC<PropsInterface> = ({ email, password, onInputChange }) => {
  return (
    <div className="flex flex-col gap-6">
      <Input
        type="email"
        name="email"
        placeholder="Email"
        value={email}
        onChange={onInputChange}
        className="w-full rounded-md bg-main p-2 outline-none"
      />
      <Input
        type="password"
        name="password"
        placeholder="Password"
        value={password}
        onChange={onInputChange}
        className="w-full rounded-md bg-main p-2 outline-none"
      />
    </div>
  );
};

export default LoginForm;
