import "./index.css";
import Input from "#/components/ui/input";
import Btn from "#/components/ui/btn";
import { useState } from "react";
import { requestLogIn } from "#/api/requestLogin";
import { useNavigate } from "react-router";

type LoginFormType = {
  setHasAccount: (value: boolean) => void;
};

const LoginForm = ({ setHasAccount }: LoginFormType) => {
  const [inputValue, setInputValue] = useState<{
    email: string;
    password: string;
  }>({
    email: "",
    password: "",
  });
  const [disbaleBtn, setDisableBtn] = useState<boolean>(false);
  const [errorMessages, setErrorMessages] = useState<string | undefined>("");
  const navigate = useNavigate();

  const handleInputs = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const name = e.target.name;
    setInputValue({ ...inputValue, [name]: value });
  };

  const handleHasAccount = () => setHasAccount(false);

  const resetInputValue = () =>
    setInputValue((prev) => ({ ...prev, email: "", password: "" }));

  const disableSingUpBtn = () => {
    setTimeout(() => {
      setErrorMessages("");
      setDisableBtn(false);
    }, 5000);
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputValue.email && inputValue.password === "") return null;
    setDisableBtn(true);
    const result = await requestLogIn(inputValue);
    resetInputValue();
    console.log(result);
    if (result.sucess) return navigate("/homepage");
    else {
      disableSingUpBtn();
      setErrorMessages(result.error?.message);
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
              onClick={handleHasAccount}
              variation="danger"
              size="md"
            >
              Sign up
            </Btn>
          </div>
          <div className="login-question-section">
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
export default LoginForm;
