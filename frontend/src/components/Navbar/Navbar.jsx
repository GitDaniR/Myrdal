import { FaTableColumns, FaGear } from "react-icons/fa6";
import { Link } from "react-router-dom"

const Navbar = () => {
    return (
        <ul className="navbar">
            <li className="navbar-item">
                <FaTableColumns className="text-xl"/>
                <Link to="/dashboard">Dashboard</Link>
            </li>
            <li className="navbar-item">
                <FaGear className="text-xl"/>
                <Link to="/settings">Settings</Link>
            </li>
        </ul>
    );
};

export default Navbar;