import { NavLink } from "react-router-dom";
import logo from "../../images/logo/6e06a82f-0f89-4bc7-8de6-476fe4e96936.jpg"
import { FaUser } from "react-icons/fa";
import { useEffect, useState } from "react";
const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    useEffect(() => {
      const handleScroll = () => {
        const offset = window.scrollY;
        if (offset > 100) {
          setScrolled(true);
        } else {
          setScrolled(false);
        }
      };
  
      window.addEventListener("scroll", handleScroll);
  
      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }, []);
    return (
        <div className={`fixed w-full z-50 bg-transparent transition-all duration-300 ${scrolled ? "bg-transparent backdrop-blur-lg shadow-md" : ""
        }`}>
        
        <div className="flex items-center justify-between h-20 pl-5 pr-5 border">
            <div>
            <NavLink to="/"><img src={logo} alt="" /></NavLink>
            </div>
            <div className="flex gap-5 text-lg font-bold">
                <div>
                    <NavLink to="/">HOME</NavLink>
                </div>
                <div>
                    <NavLink to="/reservation">RESERVATION</NavLink>
                </div>
                <div>
                    <NavLink to="/cars">CARS-INFO</NavLink>
                </div>
                <div className="uppercase">
                    <NavLink to="/chargesSummary">Charges-Summary</NavLink>
                </div>
            </div>

            <div className="text-2xl">
                <FaUser />
            </div>
        </div>
        </div>
    );
};

export default Navbar;