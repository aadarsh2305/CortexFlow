import React, { useState } from "react";
import { uploadExcel } from "../services/userService";
import { useNavigate } from "react-router-dom";

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleFileUpload = async () => {
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      await uploadExcel(formData);
      alert("File uploaded successfully");
      navigate('/users');
    }
  };

  return (
    <div className="mt-4">
      <input type="file" onChange={handleFileChange} />
      <button
        onClick={handleFileUpload}
        className="bg-green-500 text-white px-4 py-2 rounded mt-2"
      >
        Upload Excel
      </button>
    </div>
  );
};

export default FileUpload;
