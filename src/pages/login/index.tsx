import Btn from "#/components/ui/btn";
import Input from "#/components/ui/input";
import Logo from "#/components/ui/logo";
import "./index.css";

const Login = () => {
  return (
    <div className="login">
      <Logo variation="large" />
      <div className="login-content">
        <div className="login-window">
          <h1 className="login-title">Log in</h1>
          <Input placeholder="Email" />
          <Input placeholder="Password" />
          <Btn type="button" variation="secondary" size="lg">
            Log in
          </Btn>
          <div className="login-questions">
            <div className="login-question-section">
              <span>Don't have account ?</span>
              <Btn type="button" variation="danger" size="md">Sign up</Btn>
            </div>
            <div className="login-question-section">
              <span>Or,</span>
              <Btn type="button" variation="danger" size="md">Log in as a guest</Btn>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Login;
