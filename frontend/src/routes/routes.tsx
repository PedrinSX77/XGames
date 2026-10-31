import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Form } from "../components/Forms/Post/index.tsx";
import { Feed } from "../components/Feed/index.tsx";
import AuthForm from "../components/Forms/Auth/index.tsx";

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <main>
              <Form />
              <Feed />
            </main>
          }
        />
        <Route path="/post" element={<Form />} />
        <Route path="/login" element={<AuthForm mode="login" />} />
        <Route path="/register" element={<AuthForm mode="register" />} />
      </Routes>
    </BrowserRouter>
  );
}
