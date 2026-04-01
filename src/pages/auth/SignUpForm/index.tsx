import "./index.css";
import Input from "#/components/ui/input";
import Btn from "#/components/ui/btn";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "#/context/AuthContext";
import { useAuth } from "#/hooks/useAuth";

const SignUpForm = () => {
  const [inputValue, setInputValue] = useState<{
    email: string;
    password: string;
  }>({
    email: "",
    password: "",
  });
  const [disbaleBtn, setDisableBtn] = useState<boolean>(false);
  const { DemoLogin } = UserAuth();
  const { handleAuthentication, error } = useAuth();
  const navigate = useNavigate();

  const handleDemoLogin = () => DemoLogin(navigate);

  const handleInputs = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const name = e.target.name;
    setInputValue({ ...inputValue, [name]: value });
  };

  const handleLoginReddirection = () => navigate("/");

  const resetInputValue = () =>
    setInputValue((prev) => ({ ...prev, email: "", password: "" }));

  const disableSingUpBtn = () => {
    setTimeout(() => {
      setDisableBtn(false);
    }, 5000);
  };
  
  //Napraviti hook useAuth
  //Taj useAuth treba da ima state error data i moze loading
  //Treba da primi fetch funkciju primi login ili sing up
  //I vrati data error i loading
  
  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const name = e.currentTarget.name;
    setDisableBtn(true);
    handleAuthentication(inputValue, name);
    resetInputValue();
    disableSingUpBtn();
  };

  return (
    <div className="sing-up-content">
      <form className="sing-up-window" name="sing-up" onSubmit={handleSignIn}>
        <h1 className="sing-up-title">Sign in</h1>
        <Input
          name="email"
          onChange={handleInputs}
          placeholder="Enter new email"
          value={inputValue.email}
        />
        <Input
          type="password"
          name="password"
          onChange={handleInputs}
          placeholder="Enter new password"
          value={inputValue.password}
        />
        <h2 className="sign-up-error-message">{error}</h2>
        <Btn
          type="submit"
          variation={`secondary ${disbaleBtn ? "disabled" : "none"}`}
          size="lg"
          disabled={disbaleBtn}
        >
          Sign in
        </Btn>
        <div className="sing-up-questions">
          <div className="sing-up-question-section">
            <span>Already have account ?</span>
            <Btn
              type="button"
              onClick={handleLoginReddirection}
              variation="danger"
              size="md"
            >
              Log in
            </Btn>
          </div>
          <div className="sing-up-question-section">
            <span>Or,</span>
            <Btn
              type="button"
              onClick={handleDemoLogin}
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
export default SignUpForm;
