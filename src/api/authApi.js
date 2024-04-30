import axios from "axios";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import "react-toastify/dist/ReactToastify.css";
import {
  loginRequest,
  loginSuccess,
  loginFailure,
  registerRequest,
  registerSuccess,
  registerFailure,
  logoutRequest,
  logoutSuccess,
  logoutFailure,
  loadUserSuccess,
  loadUserRequest,
  loadUserFailure,
} from "../redux/authSlice";
import { getStoriesByUser } from "./storyApi";

// axios.defaults.baseURL = import.meta.env.VITE_REACT_APP_BACKEND_URL;

// axios.defaults.withCredentials = true;

// console.log(axios.defaults.baseURL);

const backendUrl = import.meta.env.VITE_REACT_APP_BACKEND_URL;
console.log(backendUrl);
// ===================================== LOAD USER =====================================



export const loadUser = () => async (dispatch) => {
  try {
    dispatch(loadUserRequest());
    
    const username = JSON.parse(localStorage.getItem("username"));
    // const token = document.cookie.split(';').find(c => c.startsWith('token')).split('=')[1]; // Extract token value from cookie

    const { data } = await axios.get(`${backendUrl}/user/load/${username}`, {
      headers: { Authorization: Cookies.get("token") || localStorage.getItem("token")} ,
    });

    dispatch(loadUserSuccess(data));
  } catch (error) {
    console.log(error);
    dispatch(loadUserFailure());
    toast.error("Failed to load user data.");
  }
};
// ===================================== REGISTER ==================================

export const register = (values) => async (dispatch) => {
  try {
    dispatch(registerRequest());
    // const { data } = await axios.post(`${backendUrl}/user/register`, values, {
    // //   withCredentials: true,
    // });
    const { data } = await axios.post(`${backendUrl}/user/register`, values );
    console.log(data);
    dispatch(registerSuccess(data));
    localStorage.setItem("username", JSON.stringify(data.username));
    localStorage.setItem("token", JSON.stringify(data.token));
    localStorage.setItem("user", JSON.stringify(data.user));
    Cookies.set("token", data.token, { httpOnly: false, sameSite: "strict" ,secure: true});
    toast.success("Register Successful", {
      position: "bottom-left",
      autoClose: 2000,
    });
  } catch (error) {
    dispatch(registerFailure());
    console.log(error.response.data);
    toast.error(error.response.data);
  }
};

// ===================================== LOGIN =====================================

export const login = (values) => async (dispatch) => {
  try {
    dispatch(loginRequest());

    
    // const { data } = await axios.post(`${backendUrl}/user/login`, values, {
    //   withCredentials: true,
    // });
    const { data } = await axios.post(`${backendUrl}/user/login`, values);
    
    
    dispatch(loginSuccess(data));

    dispatch(getStoriesByUser(data.userId));
    localStorage.setItem("username", JSON.stringify(data.username));
    localStorage.setItem("token", JSON.stringify(data.token));
    localStorage.setItem("user", JSON.stringify(data.user));
    // set cookie
    Cookies.set("token", data.token, { httpOnly: false, sameSite: "strict" ,secure: true});
    

    toast.success("Login Successful", {
      position: "bottom-left",
      autoClose: 2000,
    });
  } catch (error) {
    dispatch(loginFailure());
    toast.error(error.response.data);
  }
};

// ===================================== LOGOUT =====================================

export const logout = () => async (dispatch) => {
  try {
    dispatch(logoutRequest());
    //await axios.post("/api/user/logout", { withCredentials: true });

    await axios.post(`${backendUrl}/user/logout`);
    dispatch(logoutSuccess());

    localStorage.removeItem("username");
    toast.success("Logout Successful", {
      position: "bottom-left",
      autoClose: 1000,
    });
  } catch (error) {
    dispatch(logoutFailure());
    toast.error(error.response.data);
  }
};

// import axios from "axios";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import {
//   loginRequest,
//   loginSuccess,
//   loginFailure,
//   registerRequest,
//   registerSuccess,
//   registerFailure,
//   logoutRequest,
//   logoutSuccess,
//   logoutFailure,
//   loadUserSuccess,
//   loadUserRequest,
//   loadUserFailure,
// } from "../redux/authSlice";
// // import { getStoriesByUser } from "../story/storyAPI";

// axios.defaults.baseURL = import.meta.env.VITE_REACT_APP_BACKEND_URL;

// axios.defaults.withCredentials = true;

// console.log(axios.defaults.baseURL);

// // ===================================== LOAD USER =====================================

// export const loadUser = () => async (dispatch) => {
//   const username = JSON.parse(localStorage.getItem("username"));
//   try {
//     dispatch(loadUserRequest());

//     const { data } = await axios.get(`/api/user/load/${username}`);

//     dispatch(loadUserSuccess(data));

//     // toast.success("User Loaded");
//   } catch (error) {
//     console.log(error);
//     dispatch(loadUserFailure());
//   }
// };

// // ===================================== REGISTER ==================================

// export const register = (values) => async (dispatch) => {
//   try {
//     dispatch(registerRequest());
//     const { data } = await axios.post("/api/user/register", values, {
//       withCredentials: true,
//     });
//     dispatch(registerSuccess(data));
//     localStorage.setItem("username", JSON.stringify(data.username));
//     toast.success("Register Successful", {
//       position: "bottom-left",
//       autoClose: 2000,
//     });
//   } catch (error) {
//     dispatch(registerFailure());
//     console.log(error.response.data);
//     toast.error(error.response.data);
//   }
// };

// // ===================================== LOGIN =====================================

// export const login = (values) => async (dispatch) => {
//   try {
//     dispatch(loginRequest());
//     const { data } = await axios.post("/user/login", values, {
//       withCredentials: true,
//     });

//     dispatch(loginSuccess(data));

//     dispatch(getStoriesByUser(data.userId));
//     localStorage.setItem("username", JSON.stringify(data.username));

//     toast.success("Login Successful", {
//       position: "bottom-left",
//       autoClose: 2000,
//     });
//   } catch (error) {
//     dispatch(loginFailure());
//     toast.error(error.response.data);
//   }
// };

// // ===================================== LOGOUT =====================================

// export const logout = () => async (dispatch) => {
//   try {
//     dispatch(logoutRequest());
//     await axios.post("/api/user/logout", { withCredentials: true });

//     dispatch(logoutSuccess());

//     localStorage.removeItem("username");
//     toast.success("Logout Successful", {
//       position: "bottom-left",
//       autoClose: 1000,
//     });
//   } catch (error) {
//     dispatch(logoutFailure());
//     toast.error(error.response.data);
//   }
// };

