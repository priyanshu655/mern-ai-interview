import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { BsRobot, BsCoin } from "react-icons/bs";
import { HiOutlineLogout } from "react-icons/hi";
import { FaUserAstronaut } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ServerUrl } from "../App";
import { setUserData } from "../redux/userSlice";
import AuthModel from "./AuthModel";

const Navbar = () => {
const { userData } = useSelector((state) => state.user);

const [showCreditPopup, setShowCreditPopup] = useState(false);
const [showUserPopup, setShowUserPopup] = useState(false);
const[showAuth,setShowAuth]=useState(false);

const navigate = useNavigate();
const dispatch = useDispatch();

const handleLogout = async () => {
try {
    setShowCreditPopup(false);
  setShowUserPopup(false);
await axios.get(`${ServerUrl}/api/auth/logout`, {
withCredentials: true,
});


  dispatch(setUserData(null));

  

  navigate("/");
} catch (error) {
  console.error(error);
}


};

return ( <div className="bg-[#f3f3f3] flex justify-center px-4 pt-6">
<motion.div
initial={{ opacity: 0, y: -40 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.3 }}
className="w-full max-w-6xl bg-white rounded-3xl shadow-sm border border-gray-200 px-4 md:px-8 py-4 flex justify-between items-center relative overflow-visible"
>
{/* Logo */}
<div
onClick={() => navigate("/")}
className="flex items-center gap-3 cursor-pointer"
> <div className="bg-black text-white p-2 rounded-lg"> <BsRobot size={18} /> </div>


      <h1 className="font-semibold hidden md:block text-lg">
        AscendraAI
      </h1>
    </div>

    {/* Right Section */}
    <div className="flex items-center gap-3 md:gap-6 relative">
      {/* Credits */}
      <div className="relative">
        <button
          onClick={() => {
            if(!userData){
                setShowAuth(true);
                return;
            }
            setShowCreditPopup(!showCreditPopup);
            setShowUserPopup(false);
          }}
          className="flex items-center gap-2 bg-gray-100 px-3 md:px-4 py-2 rounded-full text-sm md:text-base hover:bg-gray-200 transition cursor-pointer"
        >
          <BsCoin size={18} />
          {userData?.credits || 0}
        </button>

        {showCreditPopup && userData&&(
          <div className="absolute right-0 mt-3 w-64 bg-white shadow-xl border border-gray-200 rounded-xl p-5 z-50">
            <p className="text-sm text-gray-700">
              Need more credits to continue interviews?
            </p>

            <button
              onClick={() => {
                if(!userData){
                setShowAuth(true);
                return;
            }
                setShowCreditPopup(false);
                navigate("/pricing");
              }}
              className="w-full bg-black text-white py-2 mt-3 rounded-lg text-sm cursor-pointer hover:opacity-90"
            >
              Buy More Credits
            </button>
          </div>
        )}
      </div>

      {/* User Menu */}
      <div className="relative">
        <button
          onClick={() => {
            setShowUserPopup(!showUserPopup);
            setShowCreditPopup(false);
          }}
          className="w-10 h-10 bg-black text-white rounded-full flex items-center justify-center font-semibold cursor-pointer"
        >
          {userData?.name ? (
            userData.name?.slice(0, 1).toUpperCase()
          ) : (
            <FaUserAstronaut size={16} />
          )}
        </button>

        {showUserPopup && userData&&(
          <div className="absolute right-0 mt-3 w-56 bg-white shadow-xl border border-gray-200 rounded-xl p-4 z-50">
            <p className="text-blue-500 font-medium my-1 truncate">
              {userData?.name || "Guest User"}
            </p>

            <button
              onClick={() => {
                setShowUserPopup(false);
                navigate("/history");
              }}
              className="w-full text-left text-sm py-2 hover:text-black text-gray-600"
            >
              Interview History
            </button>

            <button
              onClick={handleLogout}
              className="w-full text-left text-sm py-2 flex items-center gap-2 text-red-500 hover:text-red-600"
            >
              <HiOutlineLogout size={16} />
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  </motion.div>

  {showAuth&& <AuthModel onClose={()=>setShowAuth(false)}/>}
</div>


);
};

export default Navbar;
