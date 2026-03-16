import "./index.css";

type LogoType = {
    onClick: () => void;
}

const Logo = ({onClick}: LogoType) => {
  return (
    <div className="logo-content" onClick={onClick}>
      <img
        className="logo"
        src="https://cinema-100-nemanja-malesija.netlify.app/assets/logo-21d86a09.png"
      />
      <span>cinema 100</span>
    </div>
  );
};
export default Logo;
