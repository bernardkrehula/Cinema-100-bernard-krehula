import "./index.css";
import Input from "#/components/ui/input";
import Btn from "#/components/ui/btn";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "#/pages/auth/hooks/useAuth";
import LoadingSpinner from "#/components/ui/LoadingSpinner";
import { requestLogin } from "#/api/auth/requestLogin";
import * as v from "valibot";
import { requestDemoLogin } from "#/api/auth/requestDemoLogin";

export const LoginScheme = v.object({
  email: v.pipe(
    v.string("Your email must be a string."),
    v.nonEmpty("Please enter your email."),
    v.email("The email address is badly formatted."),
  ),
  password: v.pipe(
    v.string("Your password must be a string."),
    v.nonEmpty("Please enter your password."),
    v.minLength(6, "Your password must have 6 characters or more."),
  ),
});

const LoginForm = () => {
  const navigate = useNavigate();
  const { error, isLoading, handleAuth } = useAuth(requestLogin, LoginScheme);
  const {
    error: demoError,
    isLoading: demoLoading,
    handleAuth: demoLogin,
  } = useAuth(requestDemoLogin);
  const handleSingUpReddirection = () => navigate("/sign-up");

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");
    const credentials = { email, password };
    handleAuth(credentials);
  };
  const handleDemoLogin = () => demoLogin(null);

  return (
    <div className="login-content">
      <form className="login-window" onSubmit={handleLogin}>
        <h1 className="login-title">Log in</h1>
        <Input name="email" placeholder="Email" type="email" />
        <Input name="password" placeholder="Password" type="password" />
        <h2 className="login-error-message">{error || demoError}</h2>
        <Btn type="submit" variation={`secondary`} size="lg">
          {isLoading || demoLoading ? <LoadingSpinner /> : "Log in"}
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
