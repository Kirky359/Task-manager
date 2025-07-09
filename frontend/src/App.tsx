import { SignUpUser } from "./pages/RegisterPage";
import { BrowserRouter, Link, Routes, Route } from "react-router-dom";
import { SignInUser } from "./pages/LoginPage";

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <div>
              <h1>Task Manager</h1>
              <SignUpUser />
              <p>
                Already registered? login ➡️ <Link to="/login">Login here</Link>
              </p>
            </div>
          }
        />
        <Route path="/login" element={<SignInUser />} />
      </Routes>
    </BrowserRouter>
  );
}
