import Logo from "#/components/ui/logo";
import { useState } from "react";
import "./index.css";
import LoginForm from "#/components/auth/LoginForm";
import SignInForm from "#/components/auth/SignUpForm";
import { useNavigate } from "react-router";
import { requestLogIn } from "#/api/requestLogin";

const Login = () => {
  const [hasAccount, setHasAccount] = useState<boolean>(true);

  const navigate = useNavigate();

  const handleDemoLogin = async () => {
    const inputValue = {
      email: "demo@demo.com",
      password: "demo1234",
    };
    const result = await requestLogIn(inputValue);
    if (result.success) return navigate("/homepage");
  };

  return (
    <div className="login">
      <Logo variation="large" />
      {hasAccount ? (
        <LoginForm
          setHasAccount={setHasAccount}
          handleDemoLogin={handleDemoLogin}
        />
      ) : (
        <SignInForm
          setHasAccount={setHasAccount}
          handleDemoLogin={handleDemoLogin}
        />
      )}
    </div>
  );
};
export default Login;
