import React from 'react';
import { Link } from 'react-router-dom';
import "./Navbar.css";
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../config/firebase';

export const Navbar = () => {
  const [user] = useAuthState(auth);
  return (
    <nav className="navbar">
	  <Link to="/">Home</Link>
      <Link to="/explore">Explore</Link>
    {!user ? <Link to="/login">Login</Link>:
      <Link to="/createpost">Create Post</Link>}
    </nav>
  );
};


