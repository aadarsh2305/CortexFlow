import React, { useState, useEffect } from "react";
import { createUser, updateUser } from "../services/userService";
import { useNavigate } from "react-router-dom";

const AddUpdateUser = ({ editingUser, setEditingUser }) => {

  const navigate = useNavigate();
  const [user, setUser] = useState({
    empId: "",
    name: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    if (editingUser) {
      setUser(editingUser);
    } else {
      setUser({ empId: "", name: "", email: "", password: "" }); // Reset user when not editing
    }
  }, [editingUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingUser) { 
      await updateUser(user);
      alert("User updated successfully!");
    } else {
      await createUser(user);
      alert("User added successfully!");
    }
    // Reset the form and editingUser state and navigate to main users page
    setUser({ empId: "", name: "", email: "", password: "" });
    setEditingUser(null);
    navigate('/users');
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        className="bg-white p-8 rounded-lg shadow-md w-1/2"
        onSubmit={handleSubmit}
      >
        <h2 className="text-xl font-bold mb-4 text-gray-700 text-center">
          {editingUser ? "Update User" : "Add User"} {/* Adjusted the condition */}
        </h2>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold">Emp ID</label>
          <input
            type="text"
            name="empId"
            value={user.empId}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={!!editingUser} // Disable empId field when updating
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold">Name</label>
          <input
            type="text"
            name="name"
            value={user.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold">Email</label>
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold">Password</label>
          <input
            type="password"
            name="password"
            value={user.password}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
        >
          {editingUser ? "Update User" : "Add User"} {/* Adjusted the condition */}
        </button>
      </form>
    </div>
  );
};

export default AddUpdateUser;
