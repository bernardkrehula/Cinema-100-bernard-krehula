import "./index.css";
import Input from "#/components/ui/input";
import Btn from "#/components/ui/btn";
import React, { useState } from "react";
import { requestSignUp } from "#/api/requestSingUp";
import * as v from "valibot";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "#/context/AuthContext";
import { GenericError } from "#/utils/GenericError";

const SignUpForm = () => {
  const [inputValue, setInputValue] = useState<{
    email: string;
    password: string;
  }>({
    email: "",
    password: "",
  });
  const [disbaleBtn, setDisableBtn] = useState<boolean>(false);
  const [errorMessages, setErrorMessages] = useState<string | undefined>("");
  const { DemoLogin } = UserAuth();
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
      setErrorMessages("");
      setDisableBtn(false);
    }, 5000);
  };
  const LocalErrorValidator = () => {
    const LoginScheme = v.object({
      email: v.pipe(
        v.string("Your email must be a string."),
        v.nonEmpty("Please enter your email."),
        v.email("The email address is badly formatted."),
      ),
      password: v.pipe(
        v.string("Your password must be a string."),
        v.nonEmpty("Please enter your password."),
        v.minLength(8, "Your password must have 8 characters or more."),
      ),
    });
    const response = v.parse(LoginScheme, inputValue);
    return response;
  };

  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setDisableBtn(true);
    try {
      LocalErrorValidator();
      const result = await requestSignUp(inputValue);
      resetInputValue();
      if (result.success) return navigate("/homepage");
    } catch (error: unknown) {
      if (error instanceof v.ValiError) {
        console.log(error.message);
        setErrorMessages(error.message);
      } else if (error instanceof GenericError) {
        console.error("GenericError caught:", error.message);
        setErrorMessages("Something went wrong, please try again.");
      } else {
        console.error("Unknown error:", error);
      }
      disableSingUpBtn();
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
