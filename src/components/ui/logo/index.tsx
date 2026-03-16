import "./index.css";

type LogoType = {
    onClick?: () => void;
    variation?: string;
}

const Logo = ({onClick, variation}: LogoType) => {
  return (
    <div className={`logo-content ${variation}`} onClick={onClick}>
      <img
        className="logo"
        src="https://cinema-100-nemanja-malesija.netlify.app/assets/logo-21d86a09.png"
      />
      <span>cinema 100</span>
    </div>
  );
};
export default Logo;
