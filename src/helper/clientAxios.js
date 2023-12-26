import axios from "axios";

const token = JSON.parse(sessionStorage.getItem("token")) || "";

const clienteAxios = axios.create({
  baseURL: `${import.meta.env.VITE_URL_BACK}/api`,
});

export const configHeaders = {
 headers:{
  "content-type": "application/json",
  "auth": `Bearer ${token}`
 }
};


export default clienteAxios;
