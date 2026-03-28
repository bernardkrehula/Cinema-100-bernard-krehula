import "./index.css";
import Input from "#/components/ui/input";
import Btn from "#/components/ui/btn";
import React, { useState } from "react";
import { requestSignUp } from "#/api/requestSingUp";
import { useNavigate } from "react-router";

type SignInFormType = {
  setHasAccount: (value: boolean) => void;
  handleDemoLogin: () => void;
};

const SignUpForm = ({ setHasAccount, handleDemoLogin }: SignInFormType) => {
  const [inputValue, setInputValue] = useState<{
    email: string;
    password: string;
  }>({
    email: "",
    password: "",
  });
  const [disbaleBtn, setDisableBtn] = useState<boolean>(false);
  const [errorMessages, setErrorMessages] = useState<string | undefined>("");
  const navigate = useNavigate();

  const handleInputs = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const name = e.target.name;
    setInputValue({ ...inputValue, [name]: value });
  };

  const handleHasAccount = () => setHasAccount(true);

  const resetInputValue = () =>
    setInputValue((prev) => ({ ...prev, email: "", password: "" }));

  const disableSingUpBtn = () => {
    setTimeout(() => {
      setErrorMessages("");
      setDisableBtn(false);
    }, 5000);
  };

  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputValue.email && inputValue.password === "") return null;

    setDisableBtn(true);
    const result = await requestSignUp(inputValue);
    resetInputValue();
    if (result.success) return navigate("/homepage");
    else {
      disableSingUpBtn();
      setErrorMessages(result.error?.message);
    }
  };

  return (
    <div className="sing-up-content">
      <form className="sing-up-window" onSubmit={handleSignIn}>
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
        <h2 className="sign-up-error-message">{errorMessages}</h2>
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
              onClick={handleHasAccount}
              variation="danger"
              size="md"
            >
              Log in
            </Btn>
          </div>
          <div className="sing-up-question-section">
            <span>Or,</span>
            <Btn type="button" onClick={handleDemoLogin} variation="danger" size="md">
              Log in as a guest
            </Btn>
          </div>
        </div>
      </form>
    </div>
  );
};
export default SignUpForm;
