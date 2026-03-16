import Btn from "#/components/ui/btn";
import { useNavigate } from "react-router";
import "./index.css";
import { FaPowerOff } from "react-icons/fa6";
import Logo from "#/components/ui/logo";

const NavBar = () => {
  const navigate = useNavigate();

  const navigateToHomepage = () => navigate('/');

  return (
    <nav className="navbar">
      <Logo onClick={navigateToHomepage}/>
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
