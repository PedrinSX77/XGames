import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Form } from "../components/Form/index.tsx";
import { Feed } from "../components/Feed/index.tsx";
export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Feed />} />
        <Route path="/post" element={<Form />} />
      </Routes>
    </BrowserRouter>
  );
}
