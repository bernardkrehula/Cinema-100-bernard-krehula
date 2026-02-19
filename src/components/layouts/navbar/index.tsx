import Btn from "#/components/ui/btn";
import { useNavigate } from "react-router";
import "./index.css";
import { FaPowerOff } from "react-icons/fa6";

const NavBar = () => {
  const navigate = useNavigate();

  const navigateToHomepage = () => navigate('/');

  return (
    <nav className="navbar">
      <div className="logo-content" onClick={navigateToHomepage}>
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
