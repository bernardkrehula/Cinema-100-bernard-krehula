import "./index.css";
import Input from "#/components/ui/input";
import Btn from "#/components/ui/btn";
import React from "react";
import { useAuth } from "#/pages/auth/hooks/useAuth";
import LoadingSpinner from "#/components/ui/LoadingSpinner";
import { requestSignUp } from "#/api/auth/requestSingUp";
import * as v from "valibot";
import { useNavigate } from "react-router-dom";
import { requestDemoLogin } from "#/api/auth/requestDemoLogin";

const SingUpScheme = v.object({
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
const SignUpForm = () => {
  const navigate = useNavigate();
  const { error, isLoading, handleAuth } = useAuth(requestSignUp, SingUpScheme);
  const {
    error: demoError,
    isLoading: demoLoading,
    handleAuth: demoLogin,
  } = useAuth(requestDemoLogin);
  const handleLoginReddirection = () => navigate("/login");

  const handleSingUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");
    const credentials = { email, password };
    handleAuth(credentials);
  };
  const handleDemoLogin = () => demoLogin(null);

  return (
    <div className="sing-up-content">
      <form className="sing-up-window" name="sing-up" onSubmit={handleSingUp}>
        <h1 className="sing-up-title">Sign in</h1>
        <Input name="email" placeholder="Email" type="email" />
        <Input name="password" placeholder="Password" type="password" />
        <h2 className="sign-up-error-message">{error || demoError}</h2>
        <Btn type="submit" variation={`secondary`} size="lg">
          {isLoading || demoLoading ? <LoadingSpinner /> : "Log in"}
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
