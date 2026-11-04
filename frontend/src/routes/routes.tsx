import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Form } from "../components/Forms/Post/index.tsx";
import AuthForm from "../components/Forms/Auth/index.tsx";
import { Navbar } from "../components/Navbar/index.tsx";
import { Home } from "../pages/Home/index.tsx";

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/post"
          element={
            <main>
              <Form />
            </main>
          }
        />
        <Route path="/login" element={<AuthForm mode="login" />} />
        <Route path="/register" element={<AuthForm mode="register" />} />
      </Routes>
    </BrowserRouter>
  );
}
