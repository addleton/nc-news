import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <h1>NC News</h1>
      <nav id='nav-bar'>
    <Link to='/'><button className="nav-button">Home</button></Link>
    <Link to='/articles?topic=coding'><button className="nav-button">Coding</button></Link>
    <Link to='/articles?topic=cooking'><button className="nav-button">Cooking</button></Link>
    <Link to='/articles?topic=football'><button className="nav-button">Football</button></Link>
    </nav>
    </header>
  );
};

export default Header;
