import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { useNavigate } from "react-router-dom";

import { getCookie } from "typescript-cookie";
import { AppDispatch } from "../data/store";
import { fetchUser } from "../data/slice/user";

export default function FetchUser({ children }: { children: unknown }) {
  const dispatch = useDispatch<AppDispatch>();
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = getCookie("token");
        if (token) {
          await dispatch(fetchUser());
          navigate("/");
        }
        setShow(true);
      } catch (err) {
        setShow(true);
      }
    };
    checkAuth();
  }, [dispatch, navigate]);

  return show ? <>{children}</> : <></>;
}
