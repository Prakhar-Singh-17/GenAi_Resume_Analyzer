import { Route, Routes } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import { AuthContextProvider } from "./AuthContext/AuthContextProvider";
import ProtectedRoute from "./components/ProtectedRoute";
import GenerateReport from "./pages/GenerateReport";
import PreviousReports from "./pages/PreviousReports";
import Home from "./pages/Home";
import LottieCheck from "./pages/LottieCheck";
import ViewReport from "./pages/ViewReport";
import {ToastContainer} from "react-toastify"

function App() {
  return (
    <AuthContextProvider>
      <ToastContainer/>
      <Routes>
        <Route path="/login" element={<Login />}></Route>
        <Route path="lottie" element = {<LottieCheck/>}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        >
          <Route index element={<GenerateReport />} />
          <Route path="reports" element={<PreviousReports />} />
        </Route>
        <Route path="/report/:id" element = {<ProtectedRoute><ViewReport/></ProtectedRoute>}></Route>
      </Routes>
    </AuthContextProvider>
  );
}

export default App;
