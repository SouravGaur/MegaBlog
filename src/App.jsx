import { useEffect, useState } from "react";
import confi from "./confi/confi";
import { useDispatch } from "react-redux";
import authService from "./appwrite/auth";
import { login, logout } from "./store/authSlice";
import { Footer, Header } from "./components/index";
function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService
      .getCurrentUSer()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }));
        } else {
          dispatch(logout());
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return !loading ? (
    <div className="min-h-screen flex flex-wrap content-between bg-gray-400 ">
      <div className="w-full block align-center content-center items-center text-center">
        <Header></Header>
        Todo outlet
        <Footer></Footer>
      </div>
      test
    </div>
  ) : null;
}

export default App;
