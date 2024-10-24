import React, { useEffect, useState } from "react";
import { deleteUser, getUsers} from "../services/userService";
import { useNavigate } from "react-router-dom";
import CommentModal from "../components/CommentModal";

const UserList = ({setEditingUser}) => {
  const [users, setUsers] = useState([]);
  const [showCommentModal, setShowCommentModal] = useState(false);  // State to show/hide comment modal
  const [selectedUser, setSelectedUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const data = await getUsers();
    setUsers(data);
  };

  const handleDelete = async (id) => {
    await deleteUser(id);
    fetchUsers();
  };

  const handleUpdate = (user) => {
    setEditingUser(user); // Pass the selected user to AddUser component
    navigate("/add-update-user");
  };

  const handleComment = (user) =>{
    setSelectedUser(user);
    setShowCommentModal(true);
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold mb-4 text-center">User List</h2>
      <table className="table-auto w-full bg-white shadow-lg rounded-lg overflow-hidden">
        <thead className="bg-gray-200">
          <tr>
            <th className="px-6 py-3 text-left text-gray-600 font-semibold">
              EmpID
            </th>
            <th className="px-6 py-3 text-left text-gray-600 font-semibold">
              Name
            </th>
            <th className="px-6 py-3 text-left text-gray-600 font-semibold">
              Email
            </th>
            <th className="px-6 py-3 text-left text-gray-600 font-semibold">
              Comment
            </th>
            <th className="px-6 py-3 text-left text-gray-600 font-semibold">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr
              key={user.id}
              className="hover:bg-gray-100 transition duration-200"
            >
              <td className="border px-6 py-4">{user.empId}</td>
              <td className="border px-6 py-4">{user.name}</td>
              <td className="border px-6 py-4">{user.email}</td>
              <td className="border px-6 py-4">{user.comment}</td>
              <td className="border px-6 py-4 text-center">
                <button className="bg-yellow-500 text-white px-2 py-1 rounded mx-1 hover:bg-yellow-600 transition duration-200"
                        onClick={() => handleUpdate(user)}
                >
                    Update
                </button>
                <button
                  className="bg-red-500 text-white px-2 py-1 mx-1 rounded hover:bg-red-600 transition duration-200"
                  onClick={() => handleDelete(user.id)}
                >
                  Delete
                </button>
                <button className="bg-blue-500 text-white px-2 py-1 rounded mx-1 hover:bg-blue-600 transition duration-200"
                        onClick={() => handleComment(user)}
                >
                    Comment
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Render the Comment Modal */}
      {showCommentModal && (
        <CommentModal
          user={selectedUser}
          onClose={() => setShowCommentModal(false)}
          onSave={() => {
            setShowCommentModal(false);
            fetchUsers();
          }}
        />
      )}
    </div>
  );
};

export default UserList;
