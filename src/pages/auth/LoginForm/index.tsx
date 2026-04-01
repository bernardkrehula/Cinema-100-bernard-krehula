import "./index.css";
import Input from "#/components/ui/input";
import Btn from "#/components/ui/btn";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "#/hooks/useAuth";

const LoginForm = () => {
  const [inputValue, setInputValue] = useState<{
    email: string;
    password: string;
  }>({
    email: "",
    password: "",
  });
  const [disbaleBtn, setDisableBtn] = useState<boolean>(false);
  const {handleAuthentication, DemoLogin, error} = useAuth();
  const navigate = useNavigate();

  const handleInputs = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const name = e.target.name;
    setInputValue({ ...inputValue, [name]: value });
  };

  const handleSingUpReddirection = () => navigate("/sign-up");

  const resetInputValue = () =>
    setInputValue((prev) => ({ ...prev, email: "", password: "" }));

  const disableSingUpBtn = () => {
    setTimeout(() => {
      setDisableBtn(false);
    }, 5000);
  };
  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const name = e.currentTarget.name;
    setDisableBtn(true);
    handleAuthentication(inputValue, name);
    resetInputValue();
    disableSingUpBtn();
  };
  return (
    <div className="login-content">
      <form className="login-window" name="login" onSubmit={handleLogin}>
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
          type="password"
          value={inputValue.password}
        />
        <h2 className="login-error-message">{error}</h2>
        <Btn
          type="submit"
          variation={`secondary ${disbaleBtn ? "disabled" : "none"}`}
          size="lg"
          disabled={disbaleBtn}
        >
          Log in
        </Btn>
        <div className="login-questions">
          <div className="login-question-section">
            <span>Don't have account ?</span>
            <Btn
              type="button"
              onClick={handleSingUpReddirection}
              variation="danger"
              size="md"
            >
              Sign up
            </Btn>
          </div>
          <div className="login-question-section">
            <span>Or,</span>
            <Btn
              type="button"
              onClick={DemoLogin}
              variation="danger"
              size="md"
            >
              Log in as a guest
            </Btn>
          </div>
        </div>
      </form>
    </div>
  );
};
export default LoginForm;
