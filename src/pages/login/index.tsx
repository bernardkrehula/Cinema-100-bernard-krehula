import Logo from "#/components/ui/logo";
import { useState } from "react";
import "./index.css";
import LoginForm from "#/components/auth/LoginForm";
import SignInForm from "#/components/auth/SignInForm";

const Login = () => {
  const [activeAcc, setActiveAcc] = useState<boolean>(false);

  return (
    <div className="login">
      <Logo variation="large" />
      {activeAcc ? <LoginForm setActiveAcc={setActiveAcc}/> : <SignInForm setActiveAcc={setActiveAcc}/>}
    </div>
  );
};
export default Login;
