"use client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Login from "@/app/login/page";
import Dashboard from "@/app/dashboard/page";
// import PrivateRoutes from '@/routes/PrivateRoutes';
import RegisterPage from "@/app/register/page";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/" element={<Dashboard />} />
        {/* <Route path="/" element={<PrivateRoutes />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
