import { AuthProvider } from "./context/userContext";
import { AppRoutes } from "./routes/routes";

function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}

export default App;
