import React, { useEffect, useState } from "react";
import SideBar from "../Sidebar/SideBar";
import axios from "axios";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

function CategoryDash() {
  const [category, setcategory] = useState([]);
  const [isloading, setisloading] = useState(false);

  async function getcategoires() {
    setisloading(true);
    let { data } = await axios.get(`http://localhost:4000/api/v1/category`);
    setcategory(data.results);
    setisloading(false);
  }

  useEffect(() => {
    getcategoires();
  }, []);

  const handleDelete = async (categoryId) => {
    setisloading(true);
    const authToken = localStorage.getItem("userToken");
    if (!authToken) {
      toast.error('Token not found!', { duration: 2000 });
      return;
    }

    console.log("Auth Token:", authToken); // Debug: Log the token to ensure it's retrieved correctly


    try {
      const token = await fetchToken();
      await axios.delete(`http://localhost:4000/api/v1/category/${categoryId}`, {
        headers: {
          token: ` ${authToken}`,
        },
      });
      // Update category state by filtering out the deleted category
      setcategory(category.filter((category) => category._id !== categoryId));
    } catch (error) {
      console.error("Error deleting category:", error);
    } finally {
      setisloading(false);
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
    <>
       <Link to="../../addCategory" className="btn bg-main text-light">
              Add Category Now
            </Link>
      <div className="row">

        {isloading ? (
          <div className="text-center">
            <i className="fas fa-spinner fa-3x fa-spin text-main"></i>
          </div>
        ) : (
          <>
            {category?.map((cat) => (
              <div key={cat._id} className="col-md-3">
                <div className="category cursor-pointer px-2 py-3">
                  <img className="w-100 mb-2" height={400} src={cat?.image} />
                  <div className="text-center">
                    <h3 className="text-main fw-bold font-sm">{cat?.name}</h3>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDelete(cat._id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </>
  );
}

export default CategoryDash;
