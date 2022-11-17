import axios from "axios";

const BASE_URL = "http://localhost:3000/api/";


//const TOKEN =JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser? 
//JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser.accessToken :"none";
//const TOKEN=sessionStorage.getItem("accessToken")

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});


