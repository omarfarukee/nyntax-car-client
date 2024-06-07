import { NavLink } from "react-router-dom";

const Navbar = () => {
    return (
        <div className="h-16 border">
           <NavLink to="/">Home.</NavLink>
        </div>
    );
};

export default Navbar;