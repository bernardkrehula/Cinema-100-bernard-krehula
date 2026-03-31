import Btn from "#/components/ui/btn";
import { useNavigate } from "react-router-dom";
import "./index.css";
import { FaPowerOff } from "react-icons/fa6";
import Logo from "#/components/ui/logo";
import { requestSingOut } from "#/api/auth/requestSignOut";
import { useEffect, useState } from "react";

const NavBar = () => {
  const [isLoading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  const handleSingOut = async () => {
    const result = await requestSingOut();
    if (result.success) return navigate("/");
  };
  const navigateToHomepage = () => navigate("/homepage");

  useEffect(() => {
    const setLoadingLine = () => {
      setTimeout(() => {
        setLoading(false)
      }, 2000);
    };
    setLoadingLine();
  }, []);

  return (
    <nav className="navbar">
      {/* <div className="loading-line" style={{ width: isLoading ? "0" : "100%" }} /> */}
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
