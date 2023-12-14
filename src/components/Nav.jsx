import Dropdown from "@mui/joy/Dropdown";
import IconButton from "@mui/joy/IconButton";
import Menu from "@mui/joy/Menu";
import MenuButton from "@mui/joy/MenuButton";
import MenuItem from "@mui/joy/MenuItem";
import MoreVert from "@mui/icons-material/MoreVert";
import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <nav id='nav-bar'>
    <Link to='/'><button className="nav-button">Home</button></Link>
    <Link to='/articles?topic=coding'><button className="nav-button">Coding</button></Link>
    <Link to='/articles?topic=cooking'><button className="nav-button">Cooking</button></Link>
    <Link to='/articles?topic=football'><button className="nav-button">Football</button></Link>
    </nav>

  );
};

export default Nav;
