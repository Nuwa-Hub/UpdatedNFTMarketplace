import axios from "axios";


const BASE_URL = "http://localhost:3000/api/";



//const TOKEN=sessionStorage.getItem("userToken")

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

// export const userRequest = axios.create({
//   baseURL: BASE_URL,
//   headers: { token: `${TOKEN}` },
// });