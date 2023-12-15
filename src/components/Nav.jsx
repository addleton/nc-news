import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <nav id='nav-bar'>
    <Link to='/'><button className="nav-button">Home</button></Link>
    </nav>

  );
};

export default Nav;
