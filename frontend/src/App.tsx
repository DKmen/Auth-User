import { BrowserRouter, Route, Routes } from "react-router-dom";
import DashboardPage from "./page/dashboard";
import LoginPage from "./page/login";
import SignupPage from "./page/signup";

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
