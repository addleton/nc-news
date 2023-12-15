import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <h1>NC News</h1>
      <nav id='nav-bar'>
    <Link to='/'><button className="nav-button">Home</button></Link>
    </nav>
    </header>
  );
};

export default Header;
