import React, { useEffect, useState } from "react";
import SideBar from "../Sidebar/SideBar";
import axios from "axios";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import jwtDecode from "jwt-decode";

export default function UserDash() {
  const [users, setusers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getusers();
  }, []);

  async function getusers() {
    setIsLoading(true);
    try {
      const token = await fetchToken();

      const { data } = await axios.get(`http://localhost:4000/api/v1/user`, {
        headers: {
          token: `${token}`,
        },
      });
      setusers(data.results);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setIsLoading(false);
    }
  }

  const handleDelete = async (userId) => {
    setIsLoading(true);
    try {
      const token = await fetchToken();
      const decodedToken = jwtDecode(token);
      const currentUserId = decodedToken.userId; // Assuming the JWT has the user ID in `userId` field
  
      if (currentUserId === userId) {
        toast.error("You cannot delete yourself!", { duration: 2000 });
        return;
      }
  
      await axios.delete(`http://localhost:4000/api/v1/user/${userId}`, {
        headers: {
          token: `${token}`,
        },
      });
  
      setusers(users.filter((user) => user._id !== userId));
      toast.success("User Deleted Successfully!", { duration: 2000 });
    } catch (error) {
      console.error("Error deleting user:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSetAdmin = async (userId) => {
    setIsLoading(true);
    try {
      const token = await fetchToken();
      await axios.put(
        `http://localhost:4000/api/v1/user/set-role-admin/${userId}`,
        {},
        {
          headers: {
            token: `${token}`,
          },
        }
      );
      // Update users state to reflect the new role
      setusers(users.map((user) => (user._id === userId ? { ...user, role: 'admin' } : user)));
      toast.success("User Role Updated to Admin!", { duration: 2000 });
    } catch (error) {
      console.error("Error setting user role:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchToken = async () => {
    const token = localStorage.getItem("userToken");
    if (!token) {
      throw new Error("No token found");
    }
    return token;
  };

  return (
    <div className="container">
      <h1>Users CRUD</h1>
      <table className="table table-active mx-auto border-1 w-100 text-center">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Role</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              <td>{user.role}</td>
              <td className="align-items-center">
                <button
                  className="btn btn-primary mx-2"
                  onClick={() => handleSetAdmin(user._id)}
                >
                  Set As Admin
                </button>
                {/* Conditionally render the delete button */}
                {user.role !== 'admin' && (
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(user._id)}
                  >
                    Delete
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
