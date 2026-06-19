import { createContext, useEffect, useState } from "react";
import { axios } from "../utilites/axiosConfig";
import { useNavigate } from "react-router";


export const AuthContext = createContext();
export function AuthContextProvider({ children }) {
  const [user, setUser] = useState("");
  const navigate = useNavigate();

  useEffect(()=>{
       axios.get("/user/profile")
       .then((res) => {
      if (res.status === 200) {
        setUser(res.data.user.username);
        navigate("/", {
          replace: true,
        });
      }
    });
  })

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}
