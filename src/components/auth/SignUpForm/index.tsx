import "./index.css";
import Input from "#/components/ui/input";
import Btn from "#/components/ui/btn";
import { useState } from "react";
import { requestSignIn } from "#/api/requestSingIn";

type SignInFormType = {
  setHasAccount: (value: boolean) => void;
};

const SignUpForm = ({ setHasAccount }: SignInFormType) => {
  const [inputValue, setInputValue] = useState<{
    email: string;
    password: string;
  }>({
    email: "",
    password: "",
  });
  const [disbaleBtn, setDisableBtn] = useState<boolean>(false);
  const [errorMessages, setErrorMessages] = useState<string>("");

  const handleInputs = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const name = e.target.name;
    setInputValue({ ...inputValue, [name]: value });
  };

  const handleHasAccount = () => setHasAccount(true);

  const handleSignIn = async () => {
    if (inputValue.email && inputValue.password != "") {
      setDisableBtn(true);
      const request = await requestSignIn(inputValue);
      setInputValue((prev) => ({ ...prev, email: "", password: "" }));
      if (request) {
        setDisableBtn(false);
      }
      if(request.error) setErrorMessages(request.error.message);
    }
    setTimeout(() => {
      setErrorMessages("");
    },3000)
  };

  return (
    <div className="sing-up-content">
      <form className="sing-up-window">
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
          type="button"
          variation={`secondary ${disbaleBtn ? "disabled" : "none"}`}
          size="lg"
          onClick={handleSignIn}
          disabled={disbaleBtn}
        >
          Sign in
        </Btn>
        <div className="sing-up-questions">
          <div className="sing-up-question-section">
            <span>Already have account ?</span>
            <Btn
              type="button"
              onClick={handleHasAccount}
              variation="danger"
              size="md"
            >
              Log in
            </Btn>
          </div>
          <div className="sing-up-question-section">
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
export default SignUpForm;
