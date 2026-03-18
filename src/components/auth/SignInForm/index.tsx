import "./index.css";
import Input from "#/components/ui/input";
import Btn from "#/components/ui/btn";
import { useState } from "react";
import { requestSignIn } from "#/api/requestSingIn";

const SignInForm = () => {
  const [inputValue, setInputValue] = useState<{
    email: string;
    password: string;
  }>({
    email: "",
    password: "",
  });

  const handleInputs = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const name = e.target.name;
    setInputValue({ ...inputValue, [name]: value });
  };

  const handleLogin = () => requestSignIn(inputValue);
  return (
    <div className="sing-in-content">
      <form className="sing-in-window">
        <h1 className="sing-in-title">Sign in</h1>
        <Input
          name="email"
          onChange={handleInputs}
          placeholder="Enter new email"
          value={inputValue.email}
        />
        <Input
          name="password"
          onChange={handleInputs}
          placeholder="Enter new password"
          value={inputValue.password}
        />
        <Btn
          type="button"
          variation="secondary"
          size="lg"
          onClick={handleLogin}
        >
          Sign in
        </Btn>
        <div className="sing-in-questions">
          <div className="sing-in-question-section">
            <span>Already have account ?</span>
            <Btn type="button" variation="danger" size="md">
              Log in
            </Btn>
          </div>
          <div className="sing-in-question-section">
            <span>Or,</span>
            <Btn type="button" variation="danger" size="md">
              Log in as a guest
            </Btn>
          </div>
        </div>
      </form>
    </div>
  );
};
export default SignInForm;
