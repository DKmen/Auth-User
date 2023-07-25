import React, { FormEvent, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../data/store";
import { loginUser } from "../data/slice/user";
import { Link, useNavigate } from "react-router-dom";
import FetchUser from "../components/fetchUser";
import { notification } from "antd";
import { NotificationPlacement } from "antd/es/notification/interface";

const Context = React.createContext({ name: "Default" });

export default function LoginPage() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [api, contextHolder] = notification.useNotification();
  const contextValue = useMemo(() => ({ name: "Ant Design" }), []);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const openNotification = (
    placement: NotificationPlacement,
    title: string,
    message: string
  ) => {
    api.info({
      message: `${title}`,
      description: (
        <Context.Consumer>{({ name }) => `${message}`}</Context.Consumer>
      ),
      placement,
    });
  };

  const handleSumbit = async () => {
    try {
      if (form.email !== "" && form.password !== "") {
        await dispatch(loginUser(form));
        console.log("---")
        navigate("/");
      } else {
        openNotification(
          "top",
          "Error Occure",
          "Please Provide valid email or password"
        );
      }
    } catch (err) {
      openNotification(
        "top",
        "Error Occure",
        "Some error is occure please try after some time"
      );
    }
  };

  return (
    <FetchUser>
      <Context.Provider value={contextValue}>
        {contextHolder}
        <div className="flex flex-col w-full h-screen items-center justify-center space-y-2">
          <div className="flex flex-col w-full m-1 max-w-xl">
            <span className="text-2xl font-semibold mb-6">Login User</span>
            <input
              type="text"
              value={form.email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setForm((val) => ({ ...val, email: e.target.value }))
              }
              placeholder="Enter Email Address"
              className="w-full border-solid border-2 border-black p-2 rounded text-lg mb-4"
            />
            <input
              type="password"
              value={form.password}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setForm((val) => ({ ...val, password: e.target.value }))
              }
              placeholder="Enter Password"
              className="w-full border-solid border-2 border-black p-2 rounded text-lg mb-4"
            />
            <button
              onClick={handleSumbit}
              className="text-xl px-4 py-2 rounded border-none outline-none bg-blue-600 text-white"
            >
              Login
            </button>
            <Link to="/signup" className="mt-6 text-blue-600">
              Create New User
            </Link>
          </div>
        </div>
      </Context.Provider>
    </FetchUser>
  );
}
