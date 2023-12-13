import Dropdown from "@mui/joy/Dropdown";
import IconButton from "@mui/joy/IconButton";
import Menu from "@mui/joy/Menu";
import MenuButton from "@mui/joy/MenuButton";
import MenuItem from "@mui/joy/MenuItem";
import MoreVert from "@mui/icons-material/MoreVert";
import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <Dropdown>
      <MenuButton
        slots={{ root: IconButton }}
        slotProps={{ root: { variant: "outlined", color: "primary" } }}
      >
        <MoreVert />
      </MenuButton>
      <Menu>
        <Link to="/">
          <MenuItem>Home</MenuItem>
        </Link>
        <MenuItem></MenuItem>
        <MenuItem>Logout</MenuItem>
      </Menu>
    </Dropdown>
  );
};

export default Nav;
