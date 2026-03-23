import Btn from "#/components/ui/btn";
import { useNavigate } from "react-router";
import "./index.css";
import { FaPowerOff } from "react-icons/fa6";
import Logo from "#/components/ui/logo";
import { requestSingOut } from "#/api/requestSignOut";

const NavBar = () => {
  const navigate = useNavigate();

  const handleSingOut = async() => {
    const result = await requestSingOut();
    if(result.succes) return navigate("/");
  }

  const navigateToHomepage = () => navigate('/homepage');

  return (
    <nav className="navbar">
      <Logo onClick={navigateToHomepage} variation="small"/>
      <span className="welcome-message">Welcome back, Guest</span>
      <div className="logout-option">
        <span>Log out</span>
        <Btn type="button" onClick={handleSingOut}>
          <FaPowerOff />
        </Btn>
      </div>
    </nav>
  );
};
export default NavBar;
