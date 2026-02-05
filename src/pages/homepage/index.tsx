import "./index.css";
import { FaPowerOff } from "react-icons/fa6";

const Homepage = () => {
  return (
    <div className="homepage">
      <nav className="navbar">
        <div className="logo-content">
          <img
            className="logo"
            src="https://cinema-100-nemanja-malesija.netlify.app/assets/logo-21d86a09.png"
          />
          <span>cinema 100</span>
        </div>
        <span>Welcome back, Guest</span>
        <div className="logout-option">
          <span>Log out</span>
          <Btn type='button'>
            <FaPowerOff />
          </Btn>
        </div>
      </nav>
    </div>
  );
};
export default Homepage;
