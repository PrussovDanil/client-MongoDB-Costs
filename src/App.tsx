import { Header } from "./components/Header/Header";
import { AuthPage } from "./components/AuthPage/AuthPage";
import { Navigate, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { $auth, setAuth, setUsername } from "./context/auth";
import { useStore } from "effector-react";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { CostsPage } from "./components/CostsPage/CostsPage";
import { useEffect } from "react";
import { getAuthDataLS, removeUser } from "./utils/auth";

function App() {
  const isLoggedIn = useStore($auth);

  useEffect(()=> {
    const auth = getAuthDataLS();

    if (!auth || !auth.access_token || !auth.refresh_token) {
      removeUser()
    }else{
      setAuth(true)
      setUsername(auth.username)
    }
  },[])

  return (
    <div className="App">
      <Header />
      <Router>
        <Routes>
          <Route path="/" element={isLoggedIn ? <Navigate to={'/costs'} /> : <AuthPage type="login" />} />
          <Route path="/registration" element={isLoggedIn ? <Navigate to={'/costs'} /> : <AuthPage type="sign up" />} />
          <Route path="/login" element={isLoggedIn ? <Navigate to={'/costs'} /> : <AuthPage type="login" />} />
          <Route path="/costs" element={isLoggedIn ? <CostsPage/> : <Navigate to={"/login"} />} />
        </Routes>
      </Router>
      <ToastContainer/>
    </div>
  );
}

export default App;
