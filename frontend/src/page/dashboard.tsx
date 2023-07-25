import { removeCookie } from "typescript-cookie";
import UserAuth from "../components/auth";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../data/slice/user";

export default function DashboardPage() {
  const navigate = useNavigate();
  const user = useSelector(selectUser);

  const handleLogout = () => {
    removeCookie("token");
    navigate("/login");
  };

  return (
    <UserAuth>
      <div className="w-full flex flex-col h-screen">
        <div className="w-full p-4 bg-slate-500 flex flex-row items-center justify-between">
          <span className="text-white text-2xl">""</span>
          <button
            className="border-none outline-none px-4 py-2 rounded bg-red-600 text-white text-lg"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
        <div className="flex-1 flex flex-col items-center justify-center w-full">
          <span className="text-2xl font-semibold ">Hello World...</span>
        </div>
      </div>
    </UserAuth>
  );
}
