import "./index.css";
import Input from "#/components/ui/input";
import Btn from "#/components/ui/btn";
import React, { useState } from "react";
import { requestLogIn } from "#/api/requestLogin";
import { useNavigate } from "react-router-dom";
import * as v from "valibot";
import { GenericError } from "#/utils/GenericError";
import { UserAuth } from "#/context/AuthContext";

const LoginForm = () => {
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

  const handleSingUpReddirection = () => navigate("/sign-up");

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
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setDisableBtn(true);
    try {
      LocalErrorValidator();
      const result = await requestLogIn(inputValue);
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
    <div className="login-content">
      <form className="login-window" onSubmit={handleLogin}>
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
        <h2 className="login-error-message">{errorMessages}</h2>
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
export default LoginForm;
