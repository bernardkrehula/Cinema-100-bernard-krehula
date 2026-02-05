import "./index.css";
import { FaPowerOff } from "react-icons/fa6";
import Btn from "../../ui/btn";

const NavBar = () => {
  return (
    <nav className="navbar">
      <div className="logo-content">
        <img
          className="logo"
          src="https://cinema-100-nemanja-malesija.netlify.app/assets/logo-21d86a09.png"
        />
        <span>cinema 100</span>
      </div>
      <span className="welcome-message">Welcome back, Guest</span>
      <div className="logout-option">
        <span>Log out</span>
        <Btn type="button">
          <FaPowerOff />
        </Btn>
      </div>
    </nav>
  );
};
export default NavBar;
