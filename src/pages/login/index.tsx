import Logo from "#/components/ui/logo";
import { useState } from "react";
import "./index.css";
import LoginForm from "#/components/auth/LoginForm";
import SignInForm from "#/components/auth/SignUpForm";

const Login = () => {
  const [hasAccount, setHasAccount] = useState<boolean>(true);

  return (
    <div className="login">
      <Logo variation="large" />
      {hasAccount ? <LoginForm setHasAccount={setHasAccount}/> : <SignInForm setHasAccount={setHasAccount}/>}
    </div>
  );
};
export default Login;
