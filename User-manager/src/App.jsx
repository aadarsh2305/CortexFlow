import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from './components/Navbar'
import Home from "./pages/Home";
import UserList from "./pages/UserList";
import AddUpdateUser from "./pages/AddUpdateUser";
import { useState } from "react";

function App() {
  const [editingUser, setEditingUser] = useState(null);

  return (
    <div className="App">
      <Router>
        <Navbar />
        <div className="container mx-auto mt-16">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/users" element={<UserList setEditingUser={setEditingUser}/>} />
            <Route path="/add-update-user" element={<AddUpdateUser editingUser={editingUser} setEditingUser={setEditingUser}/>} />
          </Routes>
        </div>
      </Router>
    </div>
  )
}

export default App
