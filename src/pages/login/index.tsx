import Btn from "#/components/ui/btn";
import Input from "#/components/ui/input";
import Logo from "#/components/ui/logo";
import { useState } from "react";
import "./index.css";

const Login = () => {
  const [inputValue, setInputValue] = useState<{
    email: string;
    password: string;
  }>({
    email: "",
    password: "",
  });

  const handleInputs = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const name = e.target.name;
    setInputValue({ ...inputValue, [name]: value });
  };

  return (
    <div className="login">
      <Logo variation="large" />
      <div className="login-content">
        <form className="login-window">
          <h1 className="login-title">Log in</h1>
          <Input
            name="email"
            onChange={handleInputs}
            placeholder="Email"
            value={inputValue.email}
          />
          <Input
            name="password"
            onChange={handleInputs}
            placeholder="Password"
            value={inputValue.password}
          />
          <Btn type="button" variation="secondary" size="lg">
            Log in
          </Btn>
          <div className="login-questions">
            <div className="login-question-section">
              <span>Don't have account ?</span>
              <Btn type="button" variation="danger" size="md">
                Sign up
              </Btn>
            </div>
            <div className="login-question-section">
              <span>Or,</span>
              <Btn type="button" variation="danger" size="md">
                Log in as a guest
              </Btn>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
export default Login;
