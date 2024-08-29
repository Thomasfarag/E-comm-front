import React, { useEffect, useState } from "react";
import SideBar from "../Sidebar/SideBar";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function BrandsDash() {
  const [brand, setbrand] = useState([]);
  const [isloading, setisloading] = useState(false);
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  async function getbraegoires() {
    setisloading(true);
    let { data } = await axios.get(`http://localhost:4000/api/v1/brand`);
    setbrand(data.results);
    setisloading(false);
  }

  useEffect(() => {
    getbraegoires();
  }, []);

  const handleDelete = async (brandId) => {
    setisloading(true);
    const authToken = localStorage.getItem("userToken");
    if (!authToken) {
      toast.error('Token not found!', { duration: 2000 });
      return;
    }

    console.log("Auth Token:", authToken); // Debug: Log the token to ensure it's retrieved correctly


    try {
      const token = await fetchToken();
      await axios.delete(`http://localhost:4000/api/v1/brand/${brandId}`, {
        headers: {
          token: ` ${authToken}`,
        },
      });
      // Update brand state by filtering out the deleted brand
      setbrand(brand.filter((brand) => brand._id !== brandId));
    } catch (error) {
      console.error("Error deleting brand:", error);
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
       <button onClick={()=>handleNavigation('../../addbrand')} className="btn bg-main text-light">
              Add Brand Now
            </button>
      <div className="row">

        {isloading ? (
          <div className="text-center">
            <i className="fas fa-spinner fa-3x fa-spin text-main"></i>
          </div>
        ) : (
          <>
            {brand?.map((bra) => (
              <div key={bra._id} className="col-md-3">
                <div className="brand cursor-pointer px-2 py-3">
                  <img className="w-100 mb-2" height={400} src={bra?.logo} />
                  <div className="text-center">
                    <h3 className="text-main fw-bold font-sm">{bra?.name}</h3>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDelete(bra._id)}
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

export default BrandsDash;
