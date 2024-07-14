import React, { createContext, useReducer } from "react";
import AuthReducer from "./AuthReducer";
//import { jwtDecode } from "jwt-decode";

// Initial state
const initialState = {
  user: null,
};

// Get More info on this
// if (localStorage.getItem("jwtToken")) {
//   const decodedToken = jwtDecode(localStorage.getItem("jwtToken"));
//   console.log("Decoding JWT Token", decodedToken);
//   if (decodedToken.exp * 1000 < Date.now()) {
//     localStorage.removeItem("jwtToken");
//   } else {
//     initialState.user = decodedToken;
//   }
// }

// Create context
export const AuthContext = createContext(initialState);

// Provider Component
export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, initialState);

  // Actions
  function login(userData) {
    console.log("AuthContext Login Invoked", userData);
    localStorage.setItem("jwtToken", userData.token);
    dispatch({
      type: "LOGIN_ACTION",
      payload: userData,
    });
  }

  function logout() {
    console.log("AuthContext Logout Invoked");
    localStorage.removeItem("jwtToken");
    dispatch({ type: "LOGOUT_ACTION" });
  }

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
