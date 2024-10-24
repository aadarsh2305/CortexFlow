import React, { useState } from "react";
import { saveUserComment } from "../services/userService";

const CommentModal = ({ user, onClose, onSave }) => {
  const [comment, setComment] = useState("");

  const handleSave = async () => {
    if (comment.trim() === "") {
      alert("Comment cannot be empty!");
      return;
    }
    console.log("User object in CommentModal:", user.id);
    await saveUserComment(user.id, comment);
    alert("Comment saved successfully!");

    onSave();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-2xl mb-4">Add Comment for {user.name}</h3>
        <textarea
          className="w-full h-32 p-2 border rounded"
          placeholder="Write your comment here..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        ></textarea>
        <div className="flex justify-end mt-4 space-x-2">
          <button
            className="bg-red-500 text-white px-4 py-2 rounded"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="bg-green-500 text-white px-4 py-2 rounded"
            onClick={handleSave}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default CommentModal;
