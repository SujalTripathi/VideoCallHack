import axios from "axios";
import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { HttpStatusCode } from "axios";
import server from "../environment"; // should be like "http://localhost:8000"

export const AuthContext = createContext({});

const client = axios.create({
  baseURL: `${server}/api/v1/users`
});

export const AuthProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  const handleRegister = async (name, username, password) => {
    try {
      const response = await client.post("/register", {
        name,
        username,
        password
      });

      if (response.status === HttpStatusCode.Created) {
        return response.data.message;
      } else {
        throw new Error(response.data.message || "Registration failed");
      }
    } catch (err) {
      throw new Error(err.response?.data?.message || err.message);
    }
  };

  const handleLogin = async (username, password) => {
    try {
      const response = await client.post("/login", {
        username,
        password
      });

      const token = response.data.token;

      if (!token) throw new Error("No token received from server.");

      localStorage.setItem("token", token);
      return { token };
    } catch (err) {
      throw new Error(err.response?.data?.message || err.message);
    }
  };

  return (
    <AuthContext.Provider value={{ userData, setUserData, handleLogin, handleRegister }}>
      {children}
    </AuthContext.Provider>
  );
};
