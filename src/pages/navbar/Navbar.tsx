import {Link} from "react-router-dom"
import "./Navbar.css"

export const Navbar = () =>{
	return (
		<div className="navbar">
			<Link to="/">Home</Link>
			<Link to="/explore">Explore</Link>
			<Link to="/login">Login</Link>
		</div>
	)
}