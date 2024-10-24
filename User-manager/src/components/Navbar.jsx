import React from "react";
import {Link} from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className="bg-blue-950 p-4 fixed top-0 left-0 w-full z-10">
      <div className="container mx-auto">
        <div className="flex justify-between">
          <Link to="/" className="text-white text-lg font-bold">Migration Data</Link>
          <div>
            <Link to="/users" className="text-white mx-4">Users</Link>
            <Link to="/add-update-user" className="text-white mx-4">Add User</Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
