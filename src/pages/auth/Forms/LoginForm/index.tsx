import "./index.css";
import Input from "#/components/ui/input";
import Btn from "#/components/ui/btn";
import React, { useContext, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "#/pages/auth/hooks/useAuth";
import LoadingSpinner from "#/components/ui/LoadingSpinner";
import { requestLogIn } from "#/api/auth/requestLogin";
import * as v from "valibot";
import type { CredentialsType } from "#/types/auth.types.ts/CredentialsType";

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
const login = async () => {};

const LoginForm = () => {
  const { data, error, isLoading } = useAuth(login, LoginScheme);
  const navigate = useNavigate();

  const handleSingUpReddirection = () => navigate("/sign-up");

  const resetInputValue = () => {};
  const handleLogin = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get('email');
    const password = formData.get('password');
    const credentials = {email, password};
    await requestLogIn(credentials)
  };
  /*  const DemoLogin = async () => {
    const inputValue = {
      email: "demo@demo.com",
      password: "demo1234",
    };
    const result = await requestLogIn(inputValue);
    if (result.success) return navigate("/homepage");
  };
 */
  return (
    <div className="login-content">
      <form className="login-window" onSubmit={handleLogin}>
        <h1 className="login-title">Log in</h1>
        <Input name="email" placeholder="Email" type="email" />
        <Input name="password" placeholder="Password" type="password" />
        <h2 className="login-error-message">{/* error */}</h2>
        <Btn type="submit" variation={`secondary`} size="lg">
          {/* isLoading ? <LoadingSpinner /> : "Log in" */}
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
              /* onClick={DemoLogin} */ variation="danger"
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
