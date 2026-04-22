import Btn from "#/components/ui/btn";
import { useNavigate } from "react-router-dom";
import "./index.css";
import { FaPowerOff } from "react-icons/fa6";
import Logo from "#/components/ui/logo";
import { requestSingOut } from "#/api/auth/requestSignOut";
import LoadingLine from "#/components/ui/LoadingLine";
import { useSession } from "#/hooks/useSession";

const NavBar = () => {
  const navigate = useNavigate();
  const { clearSession } = useSession();

  const handleSingOut = async () => {
    const result = await requestSingOut();
    if (result.success) navigate("/login");
    clearSession();
  };
  const navigateToHomepage = () => navigate("/homepage");

  return (
    <nav className="navbar">
      <LoadingLine/>
      <Logo onClick={navigateToHomepage} variation="small" />
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
